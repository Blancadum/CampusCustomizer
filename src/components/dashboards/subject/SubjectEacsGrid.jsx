import React from 'react';
import { Link } from 'react-router-dom';

/**
 * SubjectEacsGrid
 * Cuadrícula de tarjetas de actividades de evaluación continua (EAC / EAF).
 * Muestra el estado (Bloqueada, Pendiente, Entregada, Evaluada), fechas límite,
 * botón para abrir el paso a paso, subida de archivos y marcado de entrega.
 */
export default function SubjectEacsGrid({
  eacs = [],
  activeEacId,
  subjectId,
  uploading,
  onSelectTutorial,
  onFileUpload,
  onMarkAsDone
}) {
  const [finderOpened, setFinderOpened] = React.useState(false);

  const formatDate = (ds) => {
    if (!ds) return '';
    const parts = ds.split('-');
    if (parts.length === 3) return `${parts[2]}/${parts[1]}`;
    return ds;
  };

  return (
    <section className={`activities-section ${activeEacId ? 'has-active' : ''}`}>
      <h2 style={{ 
        color: 'var(--text-title)', 
        borderBottom: '2px solid var(--border-subtle)', 
        paddingBottom: '0.5rem', 
        marginBottom: '1.5rem' 
      }}>
        🎯 Actividades de Evaluación Continua (EAC / EAF)
      </h2>

      <div className="cards-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {eacs.map(eac => {
          let statusColor = 'var(--text-muted)';
          let statusText = 'Bloqueado';
          let icon = '🔒';

          if (eac.nota !== null && eac.nota !== undefined) {
            statusColor = '#8b5cf6';
            statusText = 'Evaluada';
            icon = '🎓';
          } else if (eac.status === 'done') {
            statusColor = '#10b981';
            statusText = 'Entregada';
            icon = '✅';
          } else if (eac.status === 'pending') {
            statusColor = '#f59e0b';
            statusText = 'Pendiente';
            icon = '⏳';
          }

          const isActive = eac.id === activeEacId;

          return (
            <article 
              key={eac.id} 
              id={`card-${eac.id}`}
              className={isActive ? 'is-active' : ''} 
              style={{ 
                background: 'var(--bg-card)', 
                border: '1px solid var(--border-subtle)', 
                borderRadius: 'var(--radius-lg)', 
                padding: '1.5rem', 
                display: 'flex', 
                flexDirection: 'column', 
                opacity: (!isActive && activeEacId) ? 0.6 : 1, 
                transition: 'opacity 0.3s' 
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.2rem', lineHeight: 1.4 }}>
                  {eac.title.split(':')[0]}
                </h3>
                <div style={{ fontSize: '1.5rem' }}>{icon}</div>
              </div>
              
              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Estado:</span>
                  <span style={{ color: statusColor, fontWeight: 'bold' }}>{statusText}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Fecha Límite:</span>
                  <span style={{ color: 'var(--text-main)', fontWeight: 'bold' }}>{formatDate(eac.dueDate)}</span>
                </div>

                <button 
                  type="button"
                  onClick={() => onSelectTutorial(eac.id)}
                  style={{ 
                    display: 'block', 
                    width: '100%',
                    textAlign: 'center', 
                    background: 'transparent', 
                    color: 'var(--text-main)', 
                    border: '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    padding: '0.6rem', 
                    borderRadius: '6px',
                    marginTop: '0.5rem', 
                    fontSize: '0.9rem' 
                  }}
                >
                  Tutorial
                </button>

                {subjectId === 'desp' && eac.id === 'eac2' && (
                  <>
                    <Link
                      to="/desp/eac2"
                      style={{
                        display: 'block',
                        width: '100%',
                        boxSizing: 'border-box',
                        textAlign: 'center',
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        color: '#ffffff',
                        textDecoration: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.6rem',
                        borderRadius: '6px',
                        marginTop: '0.5rem',
                        fontSize: '0.88rem',
                        fontWeight: 700,
                        boxShadow: '0 2px 8px rgba(34, 197, 94, 0.25)'
                      }}
                    >
                      🚀 Guía Paso a Paso EAC 2 (Git, LAMP & Tomcat)
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        fetch('/api/open-folder?path=/Users/blanca/Micampus/public/eacs/desp/DAW_0614_EAC2_Enunciat_2627S1');
                        setFinderOpened(true);
                        setTimeout(() => setFinderOpened(false), 3500);
                      }}
                      style={{
                        display: 'block',
                        width: '100%',
                        boxSizing: 'border-box',
                        textAlign: 'center',
                        background: finderOpened ? '#dcfce7' : '#f1f5f9',
                        color: finderOpened ? '#15803d' : '#1e293b',
                        border: finderOpened ? '1px solid #86efac' : '1px solid #cbd5e1',
                        cursor: 'pointer',
                        padding: '0.5rem',
                        borderRadius: '6px',
                        marginTop: '0.4rem',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {finderOpened ? '✅ ¡Abierta en Finder!' : '📂 Abrir Carpeta Enunciado EAC 2 en Finder'}
                    </button>
                  </>
                )}

                {subjectId === 'ent' && eac.id === 'eac2' && (
                  <Link
                    to="/ent/eac2"
                    style={{
                      display: 'block',
                      width: '100%',
                      boxSizing: 'border-box',
                      textAlign: 'center',
                      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                      color: '#ffffff',
                      textDecoration: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '0.6rem',
                      borderRadius: '6px',
                      marginTop: '0.5rem',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      boxShadow: '0 2px 8px rgba(59, 130, 246, 0.25)'
                    }}
                  >
                    🛠️ Workbench EAC 2 (Swing, Spring & Copilot)
                  </Link>
                )}

                {subjectId === 'ent' && eac.id === 'eac2' && (
                  <button
                    type="button"
                    onClick={() => {
                      fetch('/api/open-folder?path=/Users/blanca/Micampus/public/eacs/ent/EAC2');
                      setFinderOpened(true);
                      setTimeout(() => setFinderOpened(false), 3500);
                    }}
                    style={{
                      display: 'block',
                      width: '100%',
                      boxSizing: 'border-box',
                      textAlign: 'center',
                      background: finderOpened ? '#dcfce7' : '#f1f5f9',
                      color: finderOpened ? '#15803d' : '#1e293b',
                      border: finderOpened ? '1px solid #86efac' : '1px solid #cbd5e1',
                      cursor: 'pointer',
                      padding: '0.5rem',
                      borderRadius: '6px',
                      marginTop: '0.4rem',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {finderOpened ? '✅ ¡Abierta en Finder!' : '📂 Abrir Carpeta de Resultados en Finder'}
                  </button>
                )}
                {eac.status === 'pending' && (
                  <div style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'nowrap' }}>
                    <label style={{ 
                      flex: 1, 
                      cursor: 'pointer', 
                      background: 'transparent', 
                      color: 'var(--text-main)', 
                      border: '1px solid var(--border-subtle)', 
                      borderRadius: '6px', 
                      padding: '0.6rem', 
                      textAlign: 'center', 
                      fontSize: '0.9rem', 
                      transition: 'all 0.2s', 
                      whiteSpace: 'nowrap' 
                    }}>
                      {uploading === eac.id ? 'Subiendo...' : 'Subir'}
                      <input 
                        type="file" 
                        style={{ display: 'none' }} 
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            onFileUpload(eac.id, e.target.files[0]);
                          }
                        }} 
                        disabled={uploading === eac.id} 
                      />
                    </label>

                    <button 
                      type="button"
                      onClick={() => onMarkAsDone(eac.id)}
                      style={{ 
                        flex: 1, 
                        background: 'transparent', 
                        color: 'var(--text-main)', 
                        border: '1px solid var(--border-subtle)', 
                        borderRadius: '6px', 
                        padding: '0.6rem', 
                        cursor: 'pointer', 
                        fontSize: '0.9rem', 
                        whiteSpace: 'nowrap', 
                        textAlign: 'center' 
                      }}
                    >
                      Done
                    </button>
                  </div>
                )}

                {eac.nota !== null && eac.nota !== undefined && (
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    fontSize: '0.9rem', 
                    marginTop: '0.5rem', 
                    paddingTop: '0.5rem', 
                    borderTop: '1px dashed var(--border-subtle)' 
                  }}>
                    <span style={{ color: 'var(--text-muted)' }}>Nota obtenida:</span>
                    <span style={{ color: eac.nota >= 5 ? '#10b981' : '#f43f5e', fontWeight: 'bold', fontSize: '1.1rem' }}>
                      {eac.nota}
                    </span>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
