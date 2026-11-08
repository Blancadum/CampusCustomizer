// src/agents/coach/index.js
import { connect, StringCodec } from 'nats';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Project root path (micampus-spa)
const ROOT_DIR = path.resolve(__dirname, '../../../');
const SPA_DIR = path.resolve(__dirname, '../../..');

const NATS_URL = process.env.NATS_URL || 'nats://127.0.0.1:4222';
const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://127.0.0.1:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'qwen2.5-coder:7b';

// Helper to load JSON safely
function loadJson(relativePath) {
  try {
    const fullPath = path.resolve(SPA_DIR, relativePath);
    if (fs.existsSync(fullPath)) {
      return JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
    }
  } catch (err) {
    console.warn(`[Coach] Warning: Could not read ${relativePath}:`, err.message);
  }
  return null;
}

// Load Soul (Persona)
function loadSoul() {
  const soulPath = path.join(__dirname, 'soul.txt');
  if (fs.existsSync(soulPath)) {
    return fs.readFileSync(soulPath, 'utf-8').trim();
  }
  return 'You are SenseiBot, a supportive and motivating academic mentor for miCampus students.';
}

// Search relevant lessons/topics in search_index.json
function findRelevantTopics(query, searchIndex, limit = 5) {
  if (!Array.isArray(searchIndex) || !query) return [];
  const q = query.toLowerCase();
  const words = q.split(/\s+/).filter(w => w.length > 2);

  return searchIndex
    .map(item => {
      let score = 0;
      const title = (item.title || '').toLowerCase();
      const type = (item.type || '').toLowerCase();
      const keywords = Array.isArray(item.keywords) ? item.keywords.join(' ').toLowerCase() : '';

      words.forEach(w => {
        if (title.includes(w)) score += 5;
        if (keywords.includes(w)) score += 3;
        if (type.includes(w)) score += 2;
      });

      return { item, score };
    })
    .filter(res => res.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(res => res.item);
}

// Helper: Formato de fecha corto DD/MM (sin año)
function formatShortDate(isoDate) {
  if (!isoDate) return '';
  const parts = isoDate.split('-');
  return `${parts[2]}/${parts[1]}`;
}

// Helper: Calcular días restantes
function calculateDaysLeft(isoDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [y, m, d] = isoDate.split('-').map(Number);
  const target = new Date(y, m - 1, d);
  const diffDays = Math.round((target - today) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return '¡HOY!';
  if (diffDays === 1) return 'MAÑANA';
  if (diffDays < 0) return 'ya pasada';
  return `en ${diffDays} días`;
}

// Query Ollama local LLM
async function queryOllama(systemPrompt, userPrompt) {
  const payload = {
    model: OLLAMA_MODEL,
    system: systemPrompt,
    prompt: userPrompt,
    stream: false,
    options: {
      temperature: 0.3,
      top_p: 0.85,
      num_predict: 450,
    }
  };

  const response = await fetch(`${OLLAMA_HOST}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Ollama HTTP ${response.status}: ${await response.text()}`);
  }

  const data = await response.json();
  return (data.response || '').trim();
}

async function main() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🚀 Iniciando Agente SenseiBot (miCampus)...');
  console.log(`📡 NATS Server:  ${NATS_URL}`);
  console.log(`🧠 Ollama Model: ${OLLAMA_MODEL} en ${OLLAMA_HOST}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  // Load context datasets
  const soul = loadSoul();
  const tasks = loadJson('public/data/tasks.json') || [];
  const searchIndex = loadJson('public/data/search_index.json') || [];

  console.log(`📦 Contexto cargado: ${tasks.length} entregas, ${searchIndex.length} temas indexados.`);

  // Connect to NATS
  let nc;
  try {
    nc = await connect({ servers: NATS_URL });
    console.log(`✅ Conectado exitosamente a NATS [${NATS_URL}]`);
  } catch (err) {
    console.error('❌ Error fatal al conectar a NATS:', err.message);
    process.exit(1);
  }

  const sc = StringCodec();

  // Handler for user questions
  async function handleCoachQuery(userQuery) {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    // Filter upcoming tasks
    const upcomingTasks = tasks
      .filter(t => t.date >= todayStr)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    // Detect coincidences on the same date
    const dateGroups = {};
    upcomingTasks.forEach(t => {
      dateGroups[t.date] = dateGroups[t.date] || [];
      dateGroups[t.date].push(t);
    });

    const collisionAlerts = Object.entries(dateGroups)
      .filter(([_, list]) => list.length > 1)
      .map(([date, list]) => {
        const shortDate = formatShortDate(date);
        const subjects = list.map(item => `${item.badge || item.course}: ${item.task}`).join(' y ');
        return `⚠️ ¡Atención! El ${shortDate} coinciden ${list.length} entregas: ${subjects}`;
      });

    // Formatted list of tasks for prompt
    const formattedTaskList = upcomingTasks.map(t => {
      const shortDate = formatShortDate(t.date);
      const daysLeft = calculateDaysLeft(t.date);
      const weightStr = t.weight ? `${t.weight} · ` : '';
      return `• ${t.badge || t.course}: ${t.task}: ${weightStr}Fin ${shortDate} — ${daysLeft}`;
    }).join('\n');

    // Find relevant topics from search index
    const relevantTopics = findRelevantTopics(userQuery, searchIndex, 4);

    // Build system prompt with live context
    const contextInfo = `
[DATOS DEL CAMPUS ACTUALIZADOS]
Fecha de hoy: ${formatShortDate(todayStr)}

LISTA DE PRÓXIMAS ENTREGAS (Usa este formato exacto de emoji, nombre, día/mes y días restantes):
${formattedTaskList}

ALERTAS DE COINCIDENCIAS DETECTADAS:
${collisionAlerts.length > 0 ? collisionAlerts.join('\n') : 'No hay entregas coincidentes en el mismo día.'}

${relevantTopics.length > 0 ? `Temas y lecciones relevantes en miCampus:\n` + relevantTopics.map(top => `- ${top.title} -> URL: ${top.url}`).join('\n') : ''}
`;

    const fullSystemPrompt = `${soul}\n\n${contextInfo}\n
Instrucciones obligatorias:
- NUNCA pongas el año en las fechas. Muestra exclusivamente día y mes en formato (DD/MM).
- Usa los emojis de colores de cada materia (🟢, 🟣, 🟡, 🟠, etc.) que aparecen en la lista.
- Si el usuario pregunta por entregas o fechas, sé conciso y directo, sin saludos largos. Si detectas coincidencias, incluye la alerta ⚠️ de forma destacada.
- Concluye siempre con una recomendación de estudio breve y práctica con 💡.`;

    try {
      const reply = await queryOllama(fullSystemPrompt, userQuery);
      return reply;
    } catch (llmErr) {
      console.error('[Coach] Error llamando a Ollama:', llmErr.message);
      const nextTask = upcomingTasks[0];
      return `¡Hola! Soy SenseiBot 💪.\nTu próxima entrega es **${nextTask ? `${nextTask.badge || nextTask.course}: ${nextTask.task} (${formatShortDate(nextTask.date)})` : 'ninguna próxima registrada'}**.\n(Nota: Ollama no respondió a tiempo: ${llmErr.message})`;
    }
  }

  // Subscribe to coach.request with a queue group so multiple instances load-balance automatically
  const requestSub = nc.subscribe('coach.request', { queue: 'coach-workers' });
  console.log('👂 Escuchando peticiones en tema NATS: "coach.request" (grupo: coach-workers)');

  (async () => {
    for await (const msg of requestSub) {
      const query = sc.decode(msg.data).trim();
      console.log(`\n📩 [coach.request] Consulta recibida: "${query}"`);

      try {
        const replyText = await handleCoachQuery(query);
        console.log(`📤 [coach.request] Enviando respuesta (${replyText.length} caracteres)`);

        if (msg.reply) {
          msg.respond(sc.encode(replyText));
        } else {
          // Si no enviaron inbox de respuesta, publicamos en coach.reply
          nc.publish('coach.reply', sc.encode(replyText));
        }
      } catch (err) {
        console.error('Error procesando consulta:', err);
        if (msg.reply) {
          msg.respond(sc.encode(`❌ Ocurrió un error al procesar tu consulta: ${err.message}`));
        }
      }
    }
  })();

  // Subscribe to coach.ask (Publicación abierta)
  const askSub = nc.subscribe('coach.ask');
  console.log('👂 Escuchando consultas abiertas en: "coach.ask"');
  (async () => {
    for await (const msg of askSub) {
      const query = sc.decode(msg.data).trim();
      console.log(`\n📩 [coach.ask] Consulta recibida: "${query}"`);
      const reply = await handleCoachQuery(query);
      nc.publish('coach.answer', sc.encode(reply));
    }
  })();

  // Periodic reminder emitter (verifica próximas entregas en 48 horas)
  async function checkUpcomingDeadlines() {
    const today = new Date();
    const in48Hours = new Date(today.getTime() + 48 * 60 * 60 * 1000);
    const todayStr = today.toISOString().split('T')[0];
    const limitStr = in48Hours.toISOString().split('T')[0];

    const urgentTasks = tasks.filter(t => t.date >= todayStr && t.date <= limitStr);
    if (urgentTasks.length > 0) {
      const reminderMsg = `🔔 ¡Recordatorio de SenseiBot!\nTienes entregas próximas en las siguientes 48h:\n` +
        urgentTasks.map(t => `• ${t.badge || t.course}: ${t.task} para el ${t.date}`).join('\n') +
        `\n¡Tú puedes con ello! Dale un repaso hoy 💪`;

      nc.publish('coach.reminder', sc.encode(reminderMsg));
      console.log('🔔 [Coach] Recordatorio publicado en "coach.reminder"');
    }
  }

  // Check once at startup
  checkUpcomingDeadlines();

  // Keep process alive and handle cleanup
  const shutdown = async () => {
    console.log('\n🛑 Cerrando Agente SenseiBot...');
    await nc.drain();
    process.exit(0);
  };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

  console.log('✨ Agente SenseiBot listo y en espera de consultas.');
}

main().catch(err => {
  console.error('Fatal crash en Agente Coach:', err);
  process.exit(1);
});
