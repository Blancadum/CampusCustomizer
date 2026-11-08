// src/agents/launcher.js
// Lanzador central para el agente Coach y el puente de Telegram

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '../..');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🚀 Iniciando ecosistema de Agentes miCampus...');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

const processes = [];

function startProcess(name, scriptPath) {
  console.log(`[Launcher] Iniciando ${name} (${scriptPath})...`);
  const proc = spawn('node', [scriptPath], {
    cwd: ROOT,
    stdio: 'inherit',
    env: process.env
  });

  proc.on('exit', (code, signal) => {
    console.log(`[Launcher] ⚠️ ${name} finalizó con código ${code} / señal ${signal}`);
  });

  processes.push(proc);
  return proc;
}

// 1. Lanzar Coach Agent
startProcess('Coach Agent', path.join(__dirname, 'coach/index.js'));

// 2. Lanzar CodeSensei Agent
startProcess('CodeSensei Agent', path.join(__dirname, 'code/index.js'));

// 3. Lanzar Telegram Bridge
startProcess('Telegram Bridge', path.join(ROOT, 'src/telegram/bridge.js'));

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n[Launcher] Deteniendo todos los agentes...');
  processes.forEach(p => p.kill('SIGINT'));
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n[Launcher] Deteniendo todos los agentes...');
  processes.forEach(p => p.kill('SIGTERM'));
  process.exit(0);
});
