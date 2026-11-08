import React from 'react';

const GITIGNORE_CONTENT = `cat << 'EOF' > .gitignore
*.class
bin/
target/
.metadata/
.settings/
.classpath
.project
.DS_Store
EOF
git add .gitignore
git commit -m "chore: anadir .gitignore oficial para entorno Java"`;

export default function GithubIocEacTab({ copiedId, onCopy }) {
  return (
    <>
      <div
        style={{
          background: 'rgba(9, 105, 218, 0.06)',
          border: '1px solid rgba(9, 105, 218, 0.25)',
          borderRadius: '10px',
          padding: '0.85rem',
          fontSize: '0.82rem',
          lineHeight: '1.45',
        }}
      >
        <strong style={{ color: '#0969da' }}>🎓 Protocolo Evaluativo EAC:</strong>
        <p style={{ margin: '0.4rem 0 0', color: 'var(--text-main)' }}>
          En las EACs de Entornos y Programación de IOC se evalúa el historial de Git, ramas separadas, resolución de conflictos y el grafo generado con <code>git log --graph</code>.
        </p>
      </div>

      {/* Paso 1: Inicialización & Remoto */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-title)' }}>
            1. Inicializar Repositorio & Vincular Remoto
          </span>
          <button
            onClick={() =>
              onCopy(
                'git init\ngit branch -M main\ngit remote add origin https://github.com/TU_USUARIO/TU_REPO_EAC.git',
                'eac_step1'
              )
            }
            style={{
              background: copiedId === 'eac_step1' ? '#10b981' : 'var(--bg-subtle, #333)',
              color: copiedId === 'eac_step1' ? '#fff' : 'var(--text-main)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '4px',
              padding: '2px 7px',
              fontSize: '0.72rem',
              cursor: 'pointer',
            }}
          >
            {copiedId === 'eac_step1' ? '✓ Copiado' : 'Copiar'}
          </button>
        </div>
        <pre style={{ background: '#1e1e2e', color: '#cdd6f4', padding: '0.75rem', borderRadius: '8px', fontSize: '0.76rem', margin: 0, overflowX: 'auto' }}>
{`git init
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPO_EAC.git`}
        </pre>
      </div>

      {/* Paso 2: .gitignore Limpio */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-title)' }}>
            2. .gitignore Limpio (¡Requisito indispensable!)
          </span>
          <button
            onClick={() => onCopy(GITIGNORE_CONTENT, 'eac_gitignore')}
            style={{
              background: copiedId === 'eac_gitignore' ? '#10b981' : 'var(--bg-subtle, #333)',
              color: copiedId === 'eac_gitignore' ? '#fff' : 'var(--text-main)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '4px',
              padding: '2px 7px',
              fontSize: '0.72rem',
              cursor: 'pointer',
            }}
          >
            {copiedId === 'eac_gitignore' ? '✓ Copiado' : 'Copiar'}
          </button>
        </div>
        <pre style={{ background: '#1e1e2e', color: '#cdd6f4', padding: '0.75rem', borderRadius: '8px', fontSize: '0.76rem', margin: 0, overflowX: 'auto' }}>
{GITIGNORE_CONTENT}
        </pre>
      </div>

      {/* Paso 3: Grafo Visual Obligatorio */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-title)' }}>
            3. Captura del Grafo para la Memoria PDF
          </span>
          <button
            onClick={() => onCopy('git log --oneline --graph --decorate --all', 'eac_graph')}
            style={{
              background: copiedId === 'eac_graph' ? '#10b981' : 'var(--bg-subtle, #333)',
              color: copiedId === 'eac_graph' ? '#fff' : 'var(--text-main)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '4px',
              padding: '2px 7px',
              fontSize: '0.72rem',
              cursor: 'pointer',
            }}
          >
            {copiedId === 'eac_graph' ? '✓ Copiado' : 'Copiar'}
          </button>
        </div>
        <pre style={{ background: '#1e1e2e', color: '#cdd6f4', padding: '0.75rem', borderRadius: '8px', fontSize: '0.76rem', margin: 0, overflowX: 'auto' }}>
{`git log --oneline --graph --decorate --all`}
        </pre>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
          📸 Este es el comando exacto para capturar el historial de fusiones en la documentación.
        </span>
      </div>

      {/* Paso 4: Tag de Entrega Definitiva */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-title)' }}>
            4. Etiquetado y Entrega Final (Tag)
          </span>
          <button
            onClick={() =>
              onCopy(
                'git tag -a v1.0-entrega-eac -m "Entrega definitiva evaluable EAC"\ngit push origin main --tags',
                'eac_tag'
              )
            }
            style={{
              background: copiedId === 'eac_tag' ? '#10b981' : 'var(--bg-subtle, #333)',
              color: copiedId === 'eac_tag' ? '#fff' : 'var(--text-main)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '4px',
              padding: '2px 7px',
              fontSize: '0.72rem',
              cursor: 'pointer',
            }}
          >
            {copiedId === 'eac_tag' ? '✓ Copiado' : 'Copiar'}
          </button>
        </div>
        <pre style={{ background: '#1e1e2e', color: '#cdd6f4', padding: '0.75rem', borderRadius: '8px', fontSize: '0.76rem', margin: 0, overflowX: 'auto' }}>
{`git tag -a v1.0-entrega-eac -m "Entrega definitiva evaluable EAC"
git push origin main --tags`}
        </pre>
      </div>
    </>
  );
}
