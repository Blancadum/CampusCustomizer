import React from 'react';
import AsideCodeSnippet from '../../common/aside/AsideCodeSnippet.jsx';

/**
 * ============================================================================
 * @component AsideGitTab
 * @description Pestaña de Git & Terminal con comandos paso a paso y copia interactiva.
 * ============================================================================
 */
export default function AsideGitTab({
  subjectConfig,
  themeColor = '#3b82f6'
}) {
  const repoName = subjectConfig?.repoName || `ioc-${subjectConfig?.code || 'asignatura'}`;
  const code = subjectConfig?.code || 'act';

  const gitSteps = [
    {
      num: '1',
      title: 'Crear o saltar a la rama de trabajo',
      desc: 'Mantén la rama main limpia y trabaja en una rama de feature o entrega:',
      cmd: `git checkout -b entrega-${code}-eac1`
    },
    {
      num: '2',
      title: 'Verificar el estado del árbol de trabajo',
      desc: 'Asegúrate de qué archivos han sido modificados o agregados:',
      cmd: 'git status'
    },
    {
      num: '3',
      title: 'Preparar cambios en el área de staging',
      desc: 'Añade los archivos o la carpeta de tu entrega:',
      cmd: 'git add .'
    },
    {
      num: '4',
      title: 'Crear commit con convención semántica',
      desc: 'Registra un mensaje claro y descriptivo del trabajo realizado:',
      cmd: `git commit -m "feat(${code}): resolucion y entrega de la practica oficial"`
    },
    {
      num: '5',
      title: 'Publicar la rama en el repositorio remoto',
      desc: 'Sube tus cambios vinculando el upstream a GitHub:',
      cmd: `git push -u origin entrega-${code}-eac1`
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Banner de repositorio */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(147, 51, 234, 0.12) 100%)',
        border: '1px solid rgba(59, 130, 246, 0.25)',
        borderRadius: '10px',
        padding: '0.85rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.75rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
          <span style={{ fontSize: '1.2rem' }}>🐙</span>
          <div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Repositorio Oficial
            </span>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-title)' }}>
              {repoName}
            </div>
          </div>
        </div>

        <span style={{
          fontSize: '0.7rem',
          fontWeight: 700,
          background: 'rgba(16, 185, 129, 0.15)',
          color: '#10b981',
          padding: '0.2rem 0.5rem',
          borderRadius: '999px'
        }}>
          main ✓
        </span>
      </div>

      <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.45' }}>
        Flujo de comandos Git recomendado para versiones seguras y controladas de tus prácticas:
      </p>

      {/* Pasos de comandos */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {gitSteps.map(step => (
          <div key={step.num} className="right-drawer-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: `${themeColor}25`,
                color: themeColor,
                fontSize: '0.72rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {step.num}
              </span>
              <h5 style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-title)', fontWeight: 700 }}>
                {step.title}
              </h5>
            </div>

            <p style={{ margin: '0.1rem 0 0.3rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {step.desc}
            </p>

            <AsideCodeSnippet
              command={step.cmd}
              accentColor={themeColor}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
