import React from 'react';
import { ACCENTURE_ACTIVITIES } from '../../../../../config/gitCommandsData';

export default function GithubAccentureTab({
  selectedActNum,
  onSelectActNum,
  currentAct,
  resolvedFolder,
  resolvedZip,
  copiedId,
  onCopy,
}) {
  const generateScript = () => {
    if (!currentAct) return '';
    if (currentAct.type === 'folder') {
      return `# 1. Situarse en la rama de entrega SPRING-BOOT y traer últimos cambios
git checkout SPRING-BOOT
git pull origin SPRING-BOOT

# 2. Agregar la carpeta con el nombre oficial requerido
git add "${resolvedFolder}"

# 3. Confirmar cambios con commit semántico
git commit -m "${currentAct.commitMsg}"

# 4. Subir al repositorio remoto
git push origin SPRING-BOOT

# 5. [Opcional] Generar ZIP limpio para subir a L2E (sin carpeta target/ ni .git)
mvn clean
zip -r "${resolvedZip}" "${resolvedFolder}" -x "*/target/*" "*/.git/*" "*/.DS_Store"`;
    } else {
      return `# 1. Partir siempre de la rama base actualizada
git checkout ${currentAct.originBranch}
git pull origin ${currentAct.originBranch}

# 2. Crear y cambiar a la rama de trabajo de la actividad
git checkout -b ${currentAct.branch}

# 3. Crear fichero de notas obligatorio si aún no existe
mkdir -p notas
touch "${currentAct.notesFile}"

# 4. Añadir cambios y realizar el commit oficial
git add .
git commit -m "${currentAct.commitMsg}"

# 5. Subir la nueva rama a GitHub
git push -u origin ${currentAct.branch}

# 6. Abrir Pull Request (PR) en la web de GitHub:
#    Base: ${currentAct.originBranch}  <---  Compare: ${currentAct.branch}
#    Título: "${currentAct.prTitle || currentAct.title}"

# 7. Empaquetar proyecto limpio en ZIP para plataforma L2E
mvn clean
zip -r "${resolvedZip}" . -x "target/*" ".git/*" ".DS_Store"`;
    }
  };

  return (
    <>
      {/* Selector de Actividad */}
      <div>
        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
          SELECCIONA LA ACTIVIDAD:
        </label>
        <select
          value={selectedActNum}
          onChange={(e) => onSelectActNum(Number(e.target.value))}
          style={{
            width: '100%',
            padding: '0.55rem 0.8rem',
            borderRadius: '8px',
            border: '1px solid var(--border-subtle)',
            background: 'var(--bg-card)',
            color: 'var(--text-main)',
            fontWeight: 600,
            fontSize: '0.88rem',
            cursor: 'pointer',
          }}
        >
          {ACCENTURE_ACTIVITIES.map((act) => (
            <option key={act.num} value={act.num}>
              {act.title} ({act.type === 'folder' ? `Rama ${act.branch}` : `PR ${act.branch}`})
            </option>
          ))}
        </select>
      </div>

      {/* Ficha Resumen de la Entrega */}
      {currentAct && (
        <div
          style={{
            background: 'rgba(139, 92, 246, 0.06)',
            border: '1px solid rgba(139, 92, 246, 0.25)',
            borderRadius: '10px',
            padding: '0.9rem',
            fontSize: '0.82rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.45rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 700, color: '#8b5cf6' }}>
              {currentAct.type === 'folder' ? '📁 Entrega por Carpeta en Rama' : '🌿 Entrega por Rama + Pull Request'}
            </span>
            <span style={{ fontSize: '0.72rem', background: '#8b5cf6', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>
              Actividad {currentAct.num}
            </span>
          </div>

          <div>
            <strong>Rama Git:</strong>{' '}
            <code style={{ background: 'var(--bg-card)', padding: '2px 5px', borderRadius: '4px', color: '#8b5cf6' }}>
              {currentAct.branch}
            </code>
          </div>

          <div>
            <strong>Carpeta requerida:</strong>
            <br />
            <code style={{ background: 'var(--bg-card)', padding: '2px 5px', borderRadius: '4px', wordBreak: 'break-all' }}>
              {resolvedFolder}
            </code>
          </div>

          <div>
            <strong>Nombre ZIP L2E:</strong>
            <br />
            <code style={{ background: 'var(--bg-card)', padding: '2px 5px', borderRadius: '4px', wordBreak: 'break-all' }}>
              {resolvedZip}
            </code>
          </div>

          {currentAct.notesFile && (
            <div>
              <strong>Notas obligatorias:</strong>
              <br />
              <code style={{ background: 'var(--bg-card)', padding: '2px 5px', borderRadius: '4px', color: '#10b981' }}>
                {currentAct.notesFile}
              </code>
            </div>
          )}

          <div style={{ marginTop: '0.2rem' }}>
            <a
              href={currentAct.l2eUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                color: '#8b5cf6',
                textDecoration: 'none',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              🔗 Abrir tarea en L2E Portal (ID: {currentAct.l2eId}) ↗
            </a>
          </div>
        </div>
      )}

      {/* Acciones Rápidas de Copiado de Comandos */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.4rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            TERMINAL BASH (COPIAR Y PEGAR):
          </span>
          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
            {currentAct.type === 'branch' && (
              <button
                type="button"
                onClick={() => onCopy(`git checkout -b ${currentAct.branch}`, 'copy_branch')}
                style={{
                  background: copiedId === 'copy_branch' ? '#10b981' : 'var(--bg-subtle, rgba(255,255,255,0.06))',
                  color: copiedId === 'copy_branch' ? '#fff' : 'var(--text-main)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '5px',
                  padding: '3px 7px',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                title="Copiar comando para crear y cambiar a la rama"
              >
                {copiedId === 'copy_branch' ? '✓ Rama' : '🌿 Rama'}
              </button>
            )}
            <button
              type="button"
              onClick={() => onCopy(`git commit -m "${currentAct.commitMsg}"`, 'copy_commit')}
              style={{
                background: copiedId === 'copy_commit' ? '#10b981' : 'var(--bg-subtle, rgba(255,255,255,0.06))',
                color: copiedId === 'copy_commit' ? '#fff' : 'var(--text-main)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '5px',
                padding: '3px 7px',
                fontSize: '0.72rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              title="Copiar mensaje de commit oficial"
            >
              {copiedId === 'copy_commit' ? '✓ Commit' : '💬 Commit'}
            </button>
            <button
              type="button"
              onClick={() => onCopy(generateScript(), 'accenture_full')}
              style={{
                background: copiedId === 'accenture_full' ? '#10b981' : '#8b5cf6',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                padding: '3px 9px',
                fontSize: '0.74rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.15s ease',
              }}
              title="Copiar todo el flujo de comandos de principio a fin"
            >
              {copiedId === 'accenture_full' ? '✓ ¡Todo!' : '📋 Copiar Todo'}
            </button>
          </div>
        </div>

        <pre
          style={{
            background: '#1e1e2e',
            color: '#cdd6f4',
            padding: '1rem',
            borderRadius: '10px',
            fontSize: '0.78rem',
            lineHeight: '1.5',
            overflowX: 'auto',
            border: '1px solid rgba(255,255,255,0.08)',
            margin: 0,
            whiteSpace: 'pre-wrap',
            fontFamily: 'monospace',
          }}
        >
          {generateScript()}
        </pre>
      </div>

      {/* Aviso de Buenas Prácticas */}
      <div
        style={{
          fontSize: '0.76rem',
          color: 'var(--text-muted)',
          background: 'var(--bg-subtle, rgba(0,0,0,0.02))',
          padding: '0.75rem',
          borderRadius: '8px',
          border: '1px solid var(--border-subtle)',
          lineHeight: '1.4',
        }}
      >
        💡 <strong>Regla de oro:</strong> Ejecuta siempre <code>mvn clean</code> antes de generar el archivo ZIP para no incluir los binarios compilados de <code>target/</code>.
      </div>
    </>
  );
}
