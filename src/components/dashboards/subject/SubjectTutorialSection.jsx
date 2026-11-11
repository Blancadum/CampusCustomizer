import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import PresentationCard from '../../common/PresentationCard.jsx';

/**
 * SubjectTutorialSection
 * Sección detallada "Tutorial: Paso a Paso" para la EAC seleccionada.
 * Incluye enlaces de descarga (.odt, .zip), checklist de criterios oficiales,
 * presentación Gamma interactiva (PresentationCard) y cuadrícula de soluciones
 * con diagramas clicables para ampliar en el Lightbox.
 */
export default function SubjectTutorialSection({
  showTutorial,
  onClose,
  eacs = [],
  activeEacId,
  subjectId,
  presentation,
  activeEacGallery = [],
  onOpenLightbox
}) {
  const [finderOpened, setFinderOpened] = useState(false);
  const fileInputRef = useRef(null);

  // Estado persistente de checklist de entregables / archivos
  const [checkedDeliverables, setCheckedDeliverables] = useState(() => {
    try {
      const saved = localStorage.getItem('micampus_checked_deliverables');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  // Estado persistente de copias de seguridad subidas por el usuario
  const [backupCopies, setBackupCopies] = useState(() => {
    try {
      const saved = localStorage.getItem('micampus_backup_copies');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  // Modal emergente cuando se completan TODAS las actividades de toda la EAC
  const [completedModalEac, setCompletedModalEac] = useState(null);

  const handleToggleDeliverable = (eac, exIdOrTitle, dIdx) => {
    const key = `${eac.id}_${exIdOrTitle}_${dIdx}`;
    setCheckedDeliverables(prev => {
      const isNowChecked = !prev[key];
      const next = { ...prev, [key]: isNowChecked };
      try {
        localStorage.setItem('micampus_checked_deliverables', JSON.stringify(next));
      } catch (e) {}

      // Solo si el usuario acaba de MARCAR una casilla como completada:
      if (isNowChecked) {
        // Obtener todos los entregables de TODAS las actividades de esta EAC:
        const allEacDeliverables = [];
        (eac.exercises || []).forEach(exercise => {
          if (Array.isArray(exercise.deliverables)) {
            const exerciseKey = exercise.id || exercise.title;
            exercise.deliverables.forEach((_, idx) => {
              allEacDeliverables.push(`${eac.id}_${exerciseKey}_${idx}`);
            });
          }
        });

        // Comprobar si TODOS los entregables de la EAC entera están ya completados
        const isEntireEacDone = allEacDeliverables.length > 0 && allEacDeliverables.every(k => (k === key ? true : !!next[k]));

        if (isEntireEacDone) {
          // 🎉 ¡TODA LA EAC COMPLETADA! Mostrar mensaje emergente
          setCompletedModalEac({
            eacId: eac.id,
            title: eac.title,
            totalItems: allEacDeliverables.length
          });
        }
      }
      return next;
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file || !completedModalEac) return;

    const copyInfo = {
      name: file.name,
      size: (file.size / 1024).toFixed(1) + ' KB',
      timestamp: new Date().toLocaleString(),
      eacTitle: completedModalEac.title
    };

    const eacKey = completedModalEac.eacId;
    setBackupCopies(prev => {
      const next = { ...prev, [eacKey]: copyInfo };
      try {
        localStorage.setItem('micampus_backup_copies', JSON.stringify(next));
      } catch (err) {}
      return next;
    });
  };

  const handleRemoveBackup = (eacKey) => {
    setBackupCopies(prev => {
      const next = { ...prev };
      delete next[eacKey];
      try {
        localStorage.setItem('micampus_backup_copies', JSON.stringify(next));
      } catch (err) {}
      return next;
    });
  };

  if (!showTutorial) return null;

  const currentEacs = eacs.filter(eac => eac.id === activeEacId);

  return (
    <section 
      id="paso-a-paso-section" 
      style={{ 
        marginTop: '4rem', 
        background: 'var(--bg-card)', 
        padding: '2rem', 
        borderRadius: 'var(--radius-xl)', 
        border: '1px solid var(--border-subtle)' 
      }}
    >
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start', 
        borderBottom: '2px solid var(--border-subtle)', 
        paddingBottom: '0.5rem', 
        marginBottom: '1.5rem' 
      }}>
        <h2 style={{ color: 'var(--text-title)', margin: 0 }}>
          Tutorial: Paso a Paso
        </h2>
        <button 
          type="button"
          onClick={onClose}
          style={{ 
            background: 'transparent', 
            border: 'none', 
            fontSize: '1.5rem', 
            cursor: 'pointer', 
            color: 'var(--text-muted)' 
          }}
          title="Cerrar tutorial"
          aria-label="Cerrar tutorial"
        >
          ✖
        </button>
      </div>
      
      <div style={{ marginTop: '1rem' }}>
        {currentEacs.map(eac => (
          <div key={eac.id} id={eac.id} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Encabezado y acciones de descarga */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              flexWrap: 'wrap', 
              gap: '1rem',
              background: 'var(--bg-hover)', 
              padding: '1.25rem 1.5rem', 
              borderRadius: '12px', 
              borderLeft: '5px solid var(--subject-color)' 
            }}>
              {(() => {
                const allEacDeliverables = [];
                (eac.exercises || []).forEach(exercise => {
                  if (Array.isArray(exercise.deliverables)) {
                    const exerciseKey = exercise.id || exercise.title;
                    exercise.deliverables.forEach((_, idx) => {
                      allEacDeliverables.push(`${eac.id}_${exerciseKey}_${idx}`);
                    });
                  }
                });
                const totalEacCount = allEacDeliverables.length;
                const checkedEacCount = allEacDeliverables.filter(k => !!checkedDeliverables[k]).length;
                const isEac100 = totalEacCount > 0 && checkedEacCount === totalEacCount;
                const eacBackup = backupCopies[eac.id];

                return (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                      <h3 style={{ margin: 0, color: 'var(--text-title)', fontSize: '1.3rem' }}>
                        {eac.title}
                      </h3>
                      {totalEacCount > 0 && (
                        <span style={{
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          padding: '0.2rem 0.65rem',
                          borderRadius: '20px',
                          background: isEac100 ? 'var(--dm-tint-green, #dcfce7)' : 'rgba(37, 99, 235, 0.1)',
                          color: isEac100 ? 'var(--dm-text-green, #15803d)' : 'var(--dm-text-blue, #2563eb)',
                          border: isEac100 ? '1px solid var(--dm-border-green, #86efac)' : '1px solid rgba(37, 99, 235, 0.25)'
                        }}>
                          {isEac100 ? '🎉 EAC 100% Completada' : `Progreso EAC: ${checkedEacCount}/${totalEacCount} partes`}
                        </span>
                      )}
                      {eacBackup && (
                        <button
                          type="button"
                          onClick={() => setCompletedModalEac({
                            eacId: eac.id,
                            title: eac.title,
                            totalItems: totalEacCount
                          })}
                          style={{
                            fontSize: '0.76rem',
                            color: 'var(--dm-text-green, #15803d)',
                            fontWeight: 700,
                            background: 'var(--dm-tint-green, #dcfce7)',
                            border: '1px solid var(--dm-border-green, #86efac)',
                            borderRadius: '12px',
                            padding: '0.15rem 0.55rem',
                            cursor: 'pointer'
                          }}
                          title="Ver o reemplazar copia de seguridad final"
                        >
                          💾 Copia final: {eacBackup.name}
                        </button>
                      )}
                    </div>
                    <p style={{ margin: '0.4rem 0 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      {eac.description}
                    </p>
                  </div>
                );
              })()}

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => {
                    const targetFolder = eac.folderPath || (subjectId ? `/Users/blanca/Micampus/public/eacs/${subjectId}/${(eac.id || 'eac2').toUpperCase()}` : '/Users/blanca/Micampus/public/eacs/ent/EAC2');
                    fetch(`/api/open-folder?path=${encodeURIComponent(targetFolder)}`);
                    setFinderOpened(true);
                    setTimeout(() => setFinderOpened(false), 3500);
                  }}
                  className="theme-btn"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.55rem 1rem',
                    fontSize: '0.85rem',
                    borderRadius: '8px',
                    background: finderOpened ? 'var(--dm-tint-green, #dcfce7)' : 'var(--dm-surface-soft, #f8fafc)',
                    color: finderOpened ? 'var(--dm-text-green, #15803d)' : 'var(--dm-text-strong, #0f172a)',
                    border: finderOpened ? '1px solid var(--dm-border-green, #86efac)' : '1px solid var(--dm-border, #cbd5e1)',
                    cursor: 'pointer',
                    fontWeight: 700,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                    transition: 'all 0.2s ease'
                  }}
                  title="Abrir carpeta de resultados en el Finder de macOS"
                >
                  {finderOpened ? '✅ ¡Abierta en Finder!' : '📂 Carpeta de Resultados (Finder)'}
                </button>
                {eac.enunciatUrl && (
                  <a
                    href={eac.enunciatUrl}
                    download
                    className="theme-btn"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.55rem 1rem',
                      fontSize: '0.85rem',
                      borderRadius: '8px',
                      background: 'transparent',
                      color: 'var(--text-main)',
                      border: '1px solid var(--border-subtle)',
                      textDecoration: 'none',
                      fontWeight: 600
                    }}
                  >
                    📄 Descargar Enunciado (.odt)
                  </a>
                )}
                {eac.downloadUrl && (
                  <a
                    href={eac.downloadUrl}
                    download
                    className="theme-btn"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.55rem 1rem',
                      fontSize: '0.85rem',
                      borderRadius: '8px',
                      background: 'var(--dm-subject-fill, var(--subject-color))',
                      color: 'var(--dm-on-accent, #ffffff)',
                      textDecoration: 'none',
                      fontWeight: 700,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.18)'
                    }}
                  >
                    📦 Descargar Entrega (.zip)
                  </a>
                )}
              </div>
            </div>

            {/* Checklist oficial */}
            {Array.isArray(eac.checklist) && eac.checklist.length > 0 && (
              <div style={{
                background: 'rgba(59, 130, 246, 0.05)',
                border: '1px solid rgba(59, 130, 246, 0.15)',
                borderRadius: '10px',
                padding: '1rem 1.25rem'
              }}>
                <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.92rem', color: 'var(--subject-text, var(--subject-color))', fontWeight: 700 }}>
                  📋 Criterios y Entregables Clave:
                </h4>
                <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--text-main)', fontSize: '0.88rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {eac.checklist.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Presentación Interactiva Gamma (si la materia o la entrega la incluye) */}
            {(eac.presentation || presentation) && (
              <PresentationCard 
                presentation={eac.presentation || presentation}
                themeColor="var(--subject-color)"
                height="460px"
              />
            )}

            {/* Desglose de Ejercicios Resueltos con Diagramas */}
            {Array.isArray(eac.exercicis) && eac.exercicis.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.6rem' }}>
                  <h4 style={{ margin: 0, fontSize: '1.15rem', color: 'var(--text-title)', fontWeight: 800 }}>
                    📐 Soluciones Visuales y Diagramas de la Entrega ({eac.exercicis.length} Ejercicios)
                  </h4>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Puntuación total: 10 / 10
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.75rem' }}>
                  {eac.exercicis.map(ex => (
                    <div 
                      key={ex.num}
                      style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: '0 4px 14px rgba(0,0,0,0.06)'
                      }}
                    >
                      <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-hover)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                          <span style={{ 
                            fontSize: '0.75rem', 
                            fontWeight: 800, 
                            textTransform: 'uppercase', 
                            color: 'var(--subject-text, var(--subject-color))',
                            background: 'rgba(59, 130, 246, 0.12)',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '4px'
                          }}>
                            {ex.label ? ex.label : (typeof ex.num === 'number' && ex.num >= 10 ? `Activitat ${ex.num}` : `Ejercicio ${ex.num}`)}
                          </span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                            {ex.points}
                          </span>
                        </div>
                        <h5 style={{ margin: 0, fontSize: '0.98rem', color: 'var(--text-title)', fontWeight: 700 }}>
                          {ex.title}
                        </h5>
                      </div>

                      <div style={{ padding: '1rem 1.25rem', fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                        {ex.desc}
                      </div>

                      {Array.isArray(ex.questions) && ex.questions.length > 0 && (
                        <div style={{ padding: '0 1.25rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                            <strong style={{ fontSize: '0.88rem', color: 'var(--text-title)' }}>
                              📝 Desglossament de les 10 preguntes oficials ({ex.questions.length}):
                            </strong>
                            <Link 
                              to="/ent/eac2"
                              style={{
                                fontSize: '0.82rem',
                                color: 'var(--dm-text-blue, #2563eb)',
                                fontWeight: 700,
                                textDecoration: 'none',
                                background: 'var(--dm-tint-blue, #eff6ff)',
                                padding: '0.3rem 0.65rem',
                                borderRadius: '6px',
                                border: '1px solid var(--dm-border-blue, #bfdbfe)'
                              }}
                            >
                              Obrir Test Interactiu al Workbench →
                            </Link>
                          </div>
                          {ex.questions.map(q => (
                            <details key={q.num} style={{ background: 'var(--bg-primary, #f8fafc)', border: '1px solid var(--border-subtle, #e2e8f0)', borderRadius: '8px', padding: '0.65rem 0.85rem' }}>
                              <summary style={{ cursor: 'pointer', fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-title)' }}>
                                <span style={{ color: 'var(--dm-text-blue, #2563eb)', marginRight: '0.4rem' }}>{q.num}.</span>
                                {q.q}
                              </summary>
                              <div style={{ marginTop: '0.6rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.83rem' }}>
                                {q.options.map((opt, oIdx) => {
                                  const isCorrect = oIdx === q.correct;
                                  return (
                                    <div key={oIdx} style={{
                                      padding: '0.4rem 0.7rem',
                                      borderRadius: '5px',
                                      background: isCorrect ? 'var(--dm-tint-green, #ecfdf5)' : 'transparent',
                                      color: isCorrect ? '#065f46' : 'var(--text-main)',
                                      fontWeight: isCorrect ? 700 : 400,
                                      border: isCorrect ? '1px solid #a7f3d0' : '1px solid transparent'
                                    }}>
                                      <span style={{ marginRight: '0.4rem', fontWeight: 800 }}>[{String.fromCharCode(65 + oIdx)}]</span>
                                      {opt} {isCorrect && '✓ (Correcta)'}
                                    </div>
                                  );
                                })}
                                {q.explanation && (
                                  <div style={{ marginTop: '0.4rem', fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic', background: 'rgba(59, 130, 246, 0.05)', padding: '0.4rem 0.6rem', borderRadius: '4px' }}>
                                    💡 <strong>Justificació:</strong> {q.explanation}
                                  </div>
                                )}
                              </div>
                            </details>
                          ))}
                        </div>
                      )}

                      {ex.img && (
                        <div style={{ 
                          background: 'var(--dm-surface, #ffffff)', 
                          borderTop: '1px solid var(--border-subtle)', 
                          borderBottom: '1px solid var(--border-subtle)',
                          padding: '0.75rem',
                          textAlign: 'center'
                        }}>
                          <div 
                            onClick={() => {
                              const gIdx = activeEacGallery.findIndex(item => item.num === ex.num);
                              onOpenLightbox(gIdx >= 0 ? gIdx : 0);
                            }}
                            title="Clic para ampliar imagen y explorar galería"
                            style={{
                              display: 'inline-block',
                              position: 'relative',
                              cursor: 'zoom-in',
                              width: '100%'
                            }}
                          >
                            <img 
                              src={ex.img} 
                              alt={ex.title} 
                              loading="lazy"
                              decoding="async"
                              style={{ 
                                maxWidth: '100%', 
                                maxHeight: '260px', 
                                objectFit: 'contain', 
                                borderRadius: '6px', 
                                transition: 'transform 0.2s ease, filter 0.2s ease'
                              }} 
                              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; }}
                              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                            />
                            <span style={{
                              position: 'absolute',
                              right: '10px',
                              bottom: '10px',
                              background: 'rgba(0,0,0,0.65)',
                              color: '#ffffff',
                              fontSize: '0.75rem',
                              padding: '0.2rem 0.55rem',
                              borderRadius: '20px',
                              backdropFilter: 'blur(3px)',
                              pointerEvents: 'none'
                            }}>
                              🔍 Ampliar
                            </span>
                          </div>
                        </div>
                      )}

                      {Array.isArray(ex.steps) && ex.steps.length > 0 && (
                        <div style={{ padding: '0 1.25rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                          <strong style={{ fontSize: '0.85rem', color: 'var(--text-title)' }}>
                            🛠️ Guía de Realización Paso a Paso:
                          </strong>
                          {ex.steps.map((st, sIdx) => (
                            <details key={sIdx} style={{ background: 'var(--bg-primary, #f8fafc)', border: '1px solid var(--border-subtle, #e2e8f0)', borderRadius: '8px', padding: '0.6rem 0.85rem' }}>
                              <summary style={{ cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-title)' }}>
                                <span style={{ color: 'var(--dm-text-blue, #2563eb)', marginRight: '0.4rem' }}>Paso {sIdx + 1}:</span> {st.title}
                              </summary>
                              <div style={{ marginTop: '0.5rem', fontSize: '0.82rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                                {st.desc}
                                {st.code && (
                                  <pre style={{ background: 'var(--dm-surface-muted, #f1f5f9)', color: 'var(--dm-text-strong, #0f172a)', border: '1px solid var(--dm-border, #cbd5e1)', padding: '0.6rem 0.8rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 600, overflowX: 'auto', margin: '0.5rem 0 0 0' }}>
                                    {st.code}
                                  </pre>
                                )}
                              </div>
                            </details>
                          ))}
                        </div>
                      )}

                      {(ex.downloadZip || ex.downloadSource) && (
                        <div style={{ padding: '0 1.25rem 0.85rem', display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                          {ex.downloadZip && (
                            <a
                              href={ex.downloadZip}
                              download
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.35rem',
                                padding: '0.45rem 0.8rem',
                                borderRadius: '6px',
                                background: '#2563eb',
                                color: '#ffffff',
                                textDecoration: 'none',
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                boxShadow: '0 2px 6px rgba(37, 99, 235, 0.25)'
                              }}
                            >
                              📦 Descarregar {ex.downloadZip.split('/').pop()}
                            </a>
                          )}
                          {ex.downloadSource && (
                            <a
                              href={ex.downloadSource}
                              download
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.35rem',
                                padding: '0.45rem 0.8rem',
                                borderRadius: '6px',
                                background: 'var(--dm-surface-muted, #f1f5f9)',
                                color: 'var(--dm-text, #334155)',
                                textDecoration: 'none',
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                border: '1px solid var(--dm-border, #cbd5e1)'
                              }}
                            >
                              📄 Descarregar Codi Font Java
                            </a>
                          )}
                        </div>
                      )}

                      {Array.isArray(ex.deliverables) && (
                        <div style={{
                          padding: '0.85rem 1.25rem',
                          marginTop: 'auto',
                          background: 'var(--bg-hover)',
                          fontSize: '0.82rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.65rem',
                          borderTop: '1px solid var(--border-subtle)'
                        }}>
                          {(() => {
                            const exIdKey = ex.id || ex.title;
                            const totalCount = ex.deliverables.length;
                            const checkedCount = ex.deliverables.filter((_, idx) => !!checkedDeliverables[`${eac.id}_${exIdKey}_${idx}`]).length;
                            const isAllDone = totalCount > 0 && checkedCount === totalCount;
                            const backup = backupCopies[`${eac.id}_${exIdKey}`];

                            return (
                              <>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                                  <span style={{ fontWeight: 700, color: 'var(--text-title)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                    <span>☑️</span> Partes a entregar / Archivos ({checkedCount}/{totalCount}):
                                  </span>

                                  {isAllDone && (
                                    <span style={{
                                      fontSize: '0.74rem',
                                      fontWeight: 700,
                                      padding: '0.18rem 0.55rem',
                                      borderRadius: '12px',
                                      background: 'var(--dm-tint-green, #dcfce7)',
                                      color: 'var(--dm-text-green, #15803d)',
                                      border: '1px solid var(--dm-border-green, #86efac)'
                                    }}>
                                      ✓ Actividad completada
                                    </span>
                                  )}
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                                  {ex.deliverables.map((del, dIdx) => {
                                    const itemKey = `${eac.id}_${exIdKey}_${dIdx}`;
                                    const isChecked = !!checkedDeliverables[itemKey];

                                    return (
                                      <label
                                        key={dIdx}
                                        onClick={(e) => e.stopPropagation()}
                                        style={{
                                          display: 'flex',
                                          alignItems: 'flex-start',
                                          gap: '0.65rem',
                                          padding: '0.5rem 0.75rem',
                                          borderRadius: '6px',
                                          background: isChecked ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-card)',
                                          border: isChecked ? '1px solid rgba(16, 185, 129, 0.45)' : '1px solid var(--border-subtle)',
                                          cursor: 'pointer',
                                          transition: 'all 0.18s ease',
                                          userSelect: 'none'
                                        }}
                                      >
                                        <input
                                          type="checkbox"
                                          checked={isChecked}
                                          onChange={() => handleToggleDeliverable(eac, exIdKey, dIdx)}
                                          style={{
                                            marginTop: '0.15rem',
                                            accentColor: '#10b981',
                                            cursor: 'pointer',
                                            width: '16px',
                                            height: '16px'
                                          }}
                                        />
                                        <span style={{
                                          flex: 1,
                                          color: isChecked ? 'var(--text-muted)' : 'var(--text-title)',
                                          textDecoration: isChecked ? 'line-through' : 'none',
                                          lineHeight: 1.4,
                                          fontSize: '0.8rem'
                                        }}>
                                          {del}
                                        </span>
                                        {isChecked && (
                                          <span style={{
                                            fontSize: '0.68rem',
                                            fontWeight: 700,
                                            color: '#059669',
                                            background: 'rgba(16, 185, 129, 0.15)',
                                            padding: '0.12rem 0.4rem',
                                            borderRadius: '10px'
                                          }}>
                                            ✓ Hecho
                                          </span>
                                        )}
                                      </label>
                                    );
                                  })}
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ background: 'var(--bg-hover)', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid var(--subject-color)' }}>
                <em>Esperando enunciados para generar el paso a paso...</em>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* MODAL EMERGENTE: Petición de copia de seguridad SOLO cuando se completan TODAS las actividades de la EAC */}
      {completedModalEac && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999,
          padding: '1.25rem'
        }}>
          <div style={{
            background: 'var(--bg-card, #ffffff)',
            border: '1px solid var(--border-subtle, #e2e8f0)',
            borderRadius: '16px',
            maxWidth: '520px',
            width: '100%',
            padding: '2rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            position: 'relative'
          }}>
            {/* Botón cerrar X */}
            <button
              type="button"
              onClick={() => setCompletedModalEac(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'transparent',
                border: 'none',
                fontSize: '1.4rem',
                cursor: 'pointer',
                color: 'var(--text-muted)'
              }}
              title="Cerrar"
            >
              ✖
            </button>

            {/* Cabecera */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: 'var(--dm-tint-green, #dcfce7)',
                color: 'var(--dm-text-green, #16a34a)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                flexShrink: 0
              }}>
                🎓
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-title)' }}>
                  ¡Toda la {completedModalEac.title} completada!
                </h3>
                <p style={{ margin: '0.2rem 0 0', fontSize: '0.85rem', color: 'var(--dm-text-green, #16a34a)', fontWeight: 600 }}>
                  Has marcado el 100% de las actividades y archivos requeridos.
                </p>
              </div>
            </div>

            {/* Mensaje principal */}
            <div style={{
              background: 'var(--bg-hover)',
              padding: '1rem 1.25rem',
              borderRadius: '10px',
              borderLeft: '4px solid #10b981',
              fontSize: '0.88rem',
              color: 'var(--text-main)',
              lineHeight: 1.5
            }}>
              <strong style={{ color: 'var(--text-title)', display: 'block', marginBottom: '0.35rem' }}>
                📦 Sube tu copia de seguridad final:
              </strong>
              ¡Enhorabuena! Has completado todas las partes de esta EAC. Por favor, sube aquí una copia de seguridad de tu documento final (<code>.odt</code>, <code>.zip</code>...) antes de entregar en Moodle para tener tu trabajo protegido.
            </div>

            {/* Zona de subida de archivos */}
            <div style={{
              border: '2px dashed var(--border-subtle, #cbd5e1)',
              borderRadius: '12px',
              padding: '1.5rem',
              textAlign: 'center',
              background: 'var(--bg-primary, #f8fafc)'
            }}>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />

              {backupCopies[completedModalEac.eacId] ? (
                <div>
                  <div style={{ fontSize: '1.8rem', marginBottom: '0.4rem' }}>✅</div>
                  <div style={{ fontWeight: 700, color: 'var(--text-title)', fontSize: '0.95rem' }}>
                    {backupCopies[completedModalEac.eacId].name}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                    Tamaño: {backupCopies[completedModalEac.eacId].size} · Guardado: {backupCopies[completedModalEac.eacId].timestamp}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', marginTop: '1rem' }}>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      style={{
                        fontSize: '0.8rem',
                        padding: '0.45rem 0.9rem',
                        background: 'var(--dm-surface-muted, #f1f5f9)',
                        color: 'var(--dm-text, #334155)',
                        border: '1px solid var(--dm-border, #cbd5e1)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: 600
                      }}
                    >
                      🔄 Reemplazar copia
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveBackup(completedModalEac.eacId)}
                      style={{
                        fontSize: '0.8rem',
                        padding: '0.45rem 0.8rem',
                        background: 'var(--dm-tint-red, #fee2e2)',
                        color: 'var(--dm-text-red, #b91c1c)',
                        border: '1px solid var(--dm-border-red, #fca5a5)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: 600
                      }}
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: '2.2rem', marginBottom: '0.4rem' }}>📁</div>
                  <p style={{ margin: '0 0 1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Selecciona tu memoria final (<code>DA2_M0487_EAC2_DeUna_M.odt</code> o <code>.zip</code>)
                  </p>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      background: '#10b981',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.65rem 1.35rem',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                      transition: 'transform 0.15s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    📤 Seleccionar y subir copia definitiva
                  </button>
                </div>
              )}
            </div>

            {/* Botón de cierre */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setCompletedModalEac(null)}
                style={{
                  background: '#2563eb',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.6rem 1.4rem',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer'
                }}
              >
                ¡Listo, entendido!
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

