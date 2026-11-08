import React, { useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { formatNotebookMarkdown } from '../../../../utils/notebookFormatter';

/**
 * ============================================================================
 * @component ActivitySolutionsAccordion
 * @description Sección de resolución técnica integrada directamente bajo el enunciado
 *              (sin modales), ofreciendo:
 *              1. Código de respuesta oficial en Java / Configuración.
 *              2. Memoria técnica completa de lo que se ha hecho (README de la actividad).
 *              3. Dificultades técnicas encontradas, errores de versiones y soluciones.
 *              4. Respuestas a preguntas de reflexión y plantilla de entrega L2E.
 * ============================================================================
 */
export default function ActivitySolutionsAccordion({ 
  solucionCodigo, 
  readmeDoc,
  queSeHaHechoDoc,
  dificultadesDoc,
  activeSlug, 
  actividadTitle,
  numero,
  notebookData,
  markdownComponents,
  themeColor = '#8b5cf6'
}) {
  // Tabs disponibles: 'codigo' | 'memoria' | 'dificultades' | 'reflexiones'
  const [activeTab, setActiveTab] = useState('codigo');
  const [viewMode, setViewMode] = useState('tabs'); // 'tabs' | 'continuous'
  const [copiedKey, setCopiedKey] = useState(null);

  // Determinar qué contenido está presente
  const hasCodigo = Boolean(solucionCodigo && solucionCodigo.trim());
  const hasMemoria = Boolean((readmeDoc || queSeHaHechoDoc) && (readmeDoc || queSeHaHechoDoc).trim());
  const hasDificultades = Boolean(dificultadesDoc && dificultadesDoc.trim());
  const hasReflexiones = Boolean(notebookData);

  // Si no hay ningún dato de solución/documentación, no renderizar nada
  if (!hasCodigo && !hasMemoria && !hasDificultades && !hasReflexiones) {
    return null;
  }

  // Texto de la memoria: preferir readmeDoc completo si está disponible
  const memoriaContent = readmeDoc || queSeHaHechoDoc || '';

  // Lista de secciones del bloc de notas si existe
  const sectionsList = notebookData ? (notebookData.secciones || [
    notebookData.paso1 && { ...notebookData.paso1, icono: '💬', color: 'var(--accent-blue, #38bdf8)' },
    notebookData.paso4 && { ...notebookData.paso4, icono: '🧠', color: '#f59e0b' },
    notebookData.reflexion && { ...notebookData.reflexion, icono: '🎯', color: '#10b981' }
  ].filter(Boolean)) : [];

  const handleCopy = (text, key) => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2200);
    });
  };

  const handleCopyNotebook = () => {
    if (!notebookData) return;
    const md = formatNotebookMarkdown(notebookData);
    handleCopy(md, 'reflexiones');
  };

  // Pestañas activables
  const tabs = [
    hasCodigo && {
      id: 'codigo',
      label: 'Código de Respuesta',
      icon: '💻',
      badge: 'Solución Java',
      color: '#10b981',
      bgActive: 'rgba(16, 185, 129, 0.12)',
      borderActive: '#10b981'
    },
    hasMemoria && {
      id: 'memoria',
      label: 'Qué se ha hecho (README)',
      icon: '📖',
      badge: 'Memoria Técnica',
      color: themeColor || '#8b5cf6',
      bgActive: 'rgba(139, 92, 246, 0.12)',
      borderActive: themeColor || '#8b5cf6'
    },
    hasDificultades && {
      id: 'dificultades',
      label: 'Dificultades & Retos',
      icon: '⚠️',
      badge: 'Incidencias Resueltas',
      color: '#f59e0b',
      bgActive: 'rgba(245, 158, 11, 0.12)',
      borderActive: '#f59e0b'
    },
    hasReflexiones && {
      id: 'reflexiones',
      label: 'Reflexiones L2E',
      icon: '📓',
      badge: 'Entrega & PR',
      color: '#0284c7',
      bgActive: 'rgba(2, 132, 199, 0.12)',
      borderActive: '#0284c7'
    }
  ].filter(Boolean);

  // Si la pestaña actual no existe en las disponibles, fallback a la primera
  const currentTabObj = tabs.find(t => t.id === activeTab) || tabs[0] || {};
  const effectiveTab = currentTabObj.id || 'codigo';

  return (
    <section 
      className="activity-solutions-section" 
      style={{ 
        marginTop: '3.5rem', 
        paddingTop: '2.5rem', 
        borderTop: '2px dashed var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        width: '100%'
      }}
    >
      {/* 1. Cabecera principal de la sección de resolución técnica */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        padding: '1.2rem 1.4rem',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '14px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.6rem',
            border: '1px solid rgba(16, 185, 129, 0.3)'
          }}>
            🎯
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <h2 style={{ margin: 0, fontSize: '1.3rem', color: 'var(--text-title)', fontWeight: 800 }}>
                Resolución Técnica & Memoria {numero ? `(Actividad ${numero})` : ''}
              </h2>
              <span style={{
                fontSize: '0.75rem',
                padding: '0.2rem 0.55rem',
                borderRadius: '6px',
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#10b981',
                fontWeight: 700
              }}>
                Verificada en Local
              </span>
            </div>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              Código de respuesta oficial, memoria de arquitectura, dificultades superadas y respuestas de entrega.
            </p>
          </div>
        </div>

        {/* Acciones de modo de vista y copia */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setViewMode(viewMode === 'tabs' ? 'continuous' : 'tabs')}
            className="theme-btn"
            style={{
              background: 'var(--bg-main)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              padding: '0.45rem 0.85rem',
              fontSize: '0.82rem',
              color: 'var(--text-title)',
              cursor: 'pointer',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.2s'
            }}
            title={viewMode === 'tabs' ? 'Cambiar a vista de lectura continua' : 'Cambiar a vista con selector de pestañas'}
          >
            <span>{viewMode === 'tabs' ? '📜 Ver Todo Continuo' : '📑 Modo Pestañas'}</span>
          </button>
        </div>
      </div>

      {/* 2. Selector Segmentado de Pestañas (Modo Tabs) */}
      {viewMode === 'tabs' && (
        <div 
          className="solutions-tabs-bar" 
          style={{
            display: 'flex',
            gap: '0.6rem',
            overflowX: 'auto',
            paddingBottom: '0.4rem',
            borderBottom: '1px solid var(--border-subtle)'
          }}
        >
          {tabs.map(tab => {
            const isSelected = effectiveTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  padding: '0.7rem 1.15rem',
                  borderRadius: '10px',
                  border: isSelected ? `2px solid ${tab.borderActive}` : '1px solid var(--border-subtle)',
                  background: isSelected ? tab.bgActive : 'var(--bg-card)',
                  color: isSelected ? 'var(--text-title)' : 'var(--text-muted)',
                  fontSize: '0.92rem',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: isSelected ? 'var(--shadow-sm)' : 'none'
                }}
              >
                <span style={{ fontSize: '1.15rem' }}>{tab.icon}</span>
                <span>{tab.label}</span>
                <span style={{
                  fontSize: '0.72rem',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '6px',
                  background: isSelected ? tab.borderActive : 'var(--border-subtle)',
                  color: isSelected ? '#ffffff' : 'var(--text-muted)',
                  fontWeight: 700
                }}>
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* 3. CONTENIDO: BLOQUE 1 - CÓDIGO DE RESPUESTA JAVA */}
      {(viewMode === 'continuous' || effectiveTab === 'codigo') && hasCodigo && (
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.4rem',
            background: 'rgba(16, 185, 129, 0.05)',
            borderBottom: '1px solid var(--border-subtle)',
            flexWrap: 'wrap',
            gap: '0.8rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span style={{ fontSize: '1.3rem' }}>💻</span>
              <div>
                <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-title)' }}>
                  Código de Respuesta Oficial a la Actividad
                </span>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Clases, controladores, servicios, DTOs y configuración de Spring Boot
                </div>
              </div>
            </div>

            <button
              onClick={() => handleCopy(solucionCodigo, 'codigo')}
              className="theme-btn"
              style={{
                padding: '0.42rem 0.95rem',
                fontSize: '0.82rem',
                fontWeight: 700,
                borderRadius: '8px',
                background: copiedKey === 'codigo' ? '#10b981' : 'var(--bg-main)',
                color: copiedKey === 'codigo' ? '#ffffff' : 'var(--text-title)',
                border: '1px solid var(--border-subtle)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <span>{copiedKey === 'codigo' ? '✅' : '📋'}</span>
              <span>{copiedKey === 'codigo' ? '¡Código Copiado!' : 'Copiar Solución'}</span>
            </button>
          </div>

          <div style={{ padding: '1.6rem', background: 'var(--bg-main)', lineHeight: '1.7', fontSize: '0.98rem' }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={markdownComponents}>
              {solucionCodigo}
            </ReactMarkdown>
          </div>
        </div>
      )}

      {/* 4. CONTENIDO: BLOQUE 2 - QUÉ SE HA HECHO (MEMORIA README) */}
      {(viewMode === 'continuous' || effectiveTab === 'memoria') && hasMemoria && (
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.4rem',
            background: 'rgba(139, 92, 246, 0.05)',
            borderBottom: '1px solid var(--border-subtle)',
            flexWrap: 'wrap',
            gap: '0.8rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span style={{ fontSize: '1.3rem' }}>📖</span>
              <div>
                <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-title)' }}>
                  Memoria Técnica: Lo que se ha hecho (README)
                </span>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Objetivos, contratos de endpoints, arquitectura, diagramas Mermaid y estructura del proyecto
                </div>
              </div>
            </div>

            <button
              onClick={() => handleCopy(memoriaContent, 'memoria')}
              className="theme-btn"
              style={{
                padding: '0.42rem 0.95rem',
                fontSize: '0.82rem',
                fontWeight: 700,
                borderRadius: '8px',
                background: copiedKey === 'memoria' ? '#10b981' : 'var(--bg-main)',
                color: copiedKey === 'memoria' ? '#ffffff' : 'var(--text-title)',
                border: '1px solid var(--border-subtle)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <span>{copiedKey === 'memoria' ? '✅' : '📋'}</span>
              <span>{copiedKey === 'memoria' ? '¡Memoria Copiada!' : 'Copiar Memoria README'}</span>
            </button>
          </div>

          <div style={{ padding: '1.6rem', background: 'var(--bg-main)', lineHeight: '1.7', fontSize: '0.98rem' }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={markdownComponents}>
              {memoriaContent}
            </ReactMarkdown>
          </div>
        </div>
      )}

      {/* 5. CONTENIDO: BLOQUE 3 - DIFICULTADES TÉCNICAS Y SOLUCIONES */}
      {(viewMode === 'continuous' || effectiveTab === 'dificultades') && hasDificultades && (
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid rgba(245, 158, 11, 0.35)',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.4rem',
            background: 'rgba(245, 158, 11, 0.08)',
            borderBottom: '1px solid rgba(245, 158, 11, 0.25)',
            flexWrap: 'wrap',
            gap: '0.8rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span style={{ fontSize: '1.3rem' }}>⚠️</span>
              <div>
                <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-title)' }}>
                  Dificultades Técnicas Encontradas & Solución
                </span>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Errores de versiones, depuración en Postman, IDEs y soluciones aplicadas
                </div>
              </div>
            </div>

            <button
              onClick={() => handleCopy(dificultadesDoc, 'dificultades')}
              className="theme-btn"
              style={{
                padding: '0.42rem 0.95rem',
                fontSize: '0.82rem',
                fontWeight: 700,
                borderRadius: '8px',
                background: copiedKey === 'dificultades' ? '#10b981' : 'var(--bg-main)',
                color: copiedKey === 'dificultades' ? '#ffffff' : 'var(--text-title)',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <span>{copiedKey === 'dificultades' ? '✅' : '📋'}</span>
              <span>{copiedKey === 'dificultades' ? '¡Dificultades Copiadas!' : 'Copiar Dificultades'}</span>
            </button>
          </div>

          <div style={{
            padding: '1rem 1.4rem',
            background: 'rgba(245, 158, 11, 0.04)',
            borderBottom: '1px solid var(--border-subtle)',
            fontSize: '0.88rem',
            color: 'var(--text-muted)'
          }}>
            💡 <strong>Registro de resolución real de problemas:</strong> Esta sección recopila los retos técnicos específicos experimentados durante la codificación y configuración (conflictos JDK/Maven, anotaciones de Spring, Docker en Apple Silicon y pruebas con Postman).
          </div>

          <div style={{ padding: '1.6rem', background: 'var(--bg-main)', lineHeight: '1.7', fontSize: '0.98rem' }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={markdownComponents}>
              {dificultadesDoc}
            </ReactMarkdown>
          </div>
        </div>
      )}

      {/* 6. CONTENIDO: BLOQUE 4 - BLOC DE NOTAS Y REFLEXIONES (L2E / PR) */}
      {(viewMode === 'continuous' || effectiveTab === 'reflexiones') && hasReflexiones && (
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.4rem',
            background: 'rgba(2, 132, 199, 0.05)',
            borderBottom: '1px solid var(--border-subtle)',
            flexWrap: 'wrap',
            gap: '0.8rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span style={{ fontSize: '1.3rem' }}>📓</span>
              <div>
                <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-title)' }}>
                  {notebookData.tituloDoc || 'Solución a las Preguntas de Reflexión y Decisión Técnica'}
                </span>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Respuestas argumentadas, preguntas Ask y plantilla lista para la entrega
                </div>
              </div>
            </div>

            <button
              onClick={handleCopyNotebook}
              className="theme-btn"
              style={{
                padding: '0.42rem 0.95rem',
                fontSize: '0.82rem',
                fontWeight: 700,
                borderRadius: '8px',
                background: copiedKey === 'reflexiones' ? '#10b981' : 'var(--accent-purple, #8b5cf6)',
                color: '#ffffff',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <span>{copiedKey === 'reflexiones' ? '✅' : '📋'}</span>
              <span>{copiedKey === 'reflexiones' ? '¡Plantilla Copiada!' : 'Copiar Plantilla Markdown'}</span>
            </button>
          </div>

          <div style={{
            padding: '1.5rem',
            background: 'var(--bg-main)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.4rem'
          }}>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              📄 Fichero de entrega: <strong style={{ color: 'var(--text-title)' }}>{notebookData.ficheroNotas || `notas/${activeSlug}.md`}</strong>
            </div>

            {sectionsList.map((sec, sIdx) => (
              <div key={sIdx}>
                <h4 style={{ 
                  margin: '0 0 0.8rem', 
                  fontSize: '0.92rem', 
                  color: sec.color || 'var(--accent-blue)', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.5px' 
                }}>
                  {sec.icono || '📌'} {sec.titulo}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {sec.items && sec.items.map((it, idx) => (
                    <div key={idx} style={{ background: 'var(--bg-card)', padding: '0.9rem 1.1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-title)', marginBottom: '0.4rem', fontSize: '0.9rem' }}>
                        {it.pregunta}
                      </div>
                      {it.respuesta && (
                        <div style={{ 
                          color: 'var(--text-main)', 
                          fontSize: '0.88rem', 
                          lineHeight: 1.5, 
                          borderLeft: `2px solid ${sec.color || 'var(--border-subtle)'}`, 
                          paddingLeft: '0.6rem' 
                        }}>
                          {it.respuesta}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
