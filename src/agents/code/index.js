// src/agents/code/index.js
// Agente Especialista en Programación & Spring Boot (CodeSensei)

import { connect, StringCodec } from 'nats';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '../../..');

const NATS_URL = process.env.NATS_URL || 'nats://127.0.0.1:4222';
const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://127.0.0.1:11434';
const OLLAMA_MODEL = process.env.CODE_MODEL || 'qwen2.5-coder:7b';

// Helper: Cargar archivo JSON con seguridad
function loadJson(relPath) {
  const fullPath = path.resolve(ROOT, relPath);
  try {
    if (fs.existsSync(fullPath)) {
      const raw = fs.readFileSync(fullPath, 'utf8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error(`[CodeSensei] Error leyendo ${relPath}:`, err.message);
  }
  return null;
}

// Cargar soul prompt
function loadSoul() {
  const soulPath = path.join(__dirname, 'soul.txt');
  if (fs.existsSync(soulPath)) {
    return fs.readFileSync(soulPath, 'utf8');
  }
  return 'You are CodeSensei, the patient coding tutor for miCampus.';
}

// Búsqueda inteligente de apuntes de Spring Boot (puro JS sin dependencias externas)
function findSpringDocSnippets(query, springDocs, limit = 2) {
  if (!springDocs || !Array.isArray(springDocs) || !query) return [];

  const q = query.toLowerCase();
  const words = q.split(/\s+/).filter(w => w.length > 2);
  if (words.length === 0) return [];

  return springDocs
    .map(item => {
      let score = 0;
      const title = (item.title || '').toLowerCase();
      const moduleTitle = (item.moduleTitle || '').toLowerCase();
      const temaTitle = (item.temaTitle || '').toLowerCase();
      const slug = (item.slug || '').toLowerCase();
      const content = (item.contentMd || '').toLowerCase();

      words.forEach(w => {
        if (title.includes(w)) score += 8;
        if (slug.includes(w)) score += 6;
        if (temaTitle.includes(w)) score += 4;
        if (moduleTitle.includes(w)) score += 3;
        if (content.includes(w)) score += 1;
      });

      return { item, score };
    })
    .filter(res => res.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(res => {
      const item = res.item;
      const excerpt = (item.contentMd || '')
        .replace(/!\[.*?\]\(.*?\)/g, '')
        .replace(/<.*?>/g, '')
        .slice(0, 600)
        .trim();

      return {
        title: item.title,
        module: item.moduleTitle || '',
        topicNum: item.topicNum || '',
        excerpt
      };
    });
}

// Inferencia con Ollama Local
async function queryOllama(systemPrompt, userPrompt) {
  const payload = {
    model: OLLAMA_MODEL,
    system: systemPrompt,
    prompt: userPrompt,
    stream: false,
    options: {
      temperature: 0.25,
      top_p: 0.85,
      num_predict: 500
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
  console.log('💻 Iniciando Agente CodeSensei (Programación)...');
  console.log(`📡 NATS Server:  ${NATS_URL}`);
  console.log(`🧠 Ollama Model: ${OLLAMA_MODEL} en ${OLLAMA_HOST}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  const soul = loadSoul();
  const springDocs = loadJson('public/data/extra/springboot_guia.json') || [];
  const searchIndex = loadJson('public/data/search_index.json') || [];

  console.log(`📦 Contexto técnico cargado: ${springDocs.length} temas de Spring Boot.`);

  let nc;
  try {
    nc = await connect({ servers: NATS_URL });
    console.log(`✅ CodeSensei conectado a NATS [${NATS_URL}]`);
  } catch (err) {
    console.error('❌ Error conectando CodeSensei a NATS:', err.message);
    process.exit(1);
  }

  const sc = StringCodec();

  // Handler de consultas técnicas de programación
  async function handleCodeQuery(userQuery) {
    const relevantDocs = findSpringDocSnippets(userQuery, springDocs, 2);

    let contextText = '';
    if (relevantDocs.length > 0) {
      contextText = `\n[APUNTES Y GUÍAS DE MICAMPUS RELEVANTES]\n` +
        relevantDocs.map(d => `### ${d.title} (Módulo: ${d.module})\n${d.excerpt}...\n`).join('\n');
    }

    const fullSystemPrompt = `${soul}\n${contextText}\n
Instrucciones:
- Responde siempre en español.
- Comienza con una breve analogía o intuición clara antes de soltar código.
- Ofrece código limpio, conciso y comentado en las líneas clave.
- Si detectas un error o bug, explica la causa raíz y la solución recomendada.
- Concluye con un consejo práctico de estudio o prueba con 💡.`;

    try {
      return await queryOllama(fullSystemPrompt, userQuery);
    } catch (llmErr) {
      console.error('[CodeSensei] Error en Ollama:', llmErr.message);
      return `⚠️ Hola Blanca, no pude conectar con el modelo local de código (${OLLAMA_MODEL}): ${llmErr.message}`;
    }
  }

  // Suscribirse al canal code.request con queue group
  const sub = nc.subscribe('code.request', { queue: 'code-workers' });
  console.log('👂 Escuchando en NATS: "code.request" (grupo: code-workers)');

  (async () => {
    for await (const msg of sub) {
      try {
        const queryText = sc.decode(msg.data);
        console.log(`[CodeSensei] 📥 Nueva consulta de código: "${queryText.slice(0, 60)}..."`);
        const reply = await handleCodeQuery(queryText);
        if (msg.reply) {
          msg.respond(sc.encode(reply));
        }
      } catch (err) {
        console.error('[CodeSensei] Error procesando mensaje:', err.message);
        if (msg.reply) {
          msg.respond(sc.encode('Hubo un error procesando tu duda de código.'));
        }
      }
    }
  })();
}

main().catch(err => {
  console.error('[CodeSensei] Error fatal:', err);
  process.exit(1);
});
