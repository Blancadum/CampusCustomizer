import React from 'react';
import { Link } from 'react-router-dom';

/**
 * ============================================================================
 * @component AsideDevKitTab
 * @description Pestaña de DevKit, Guías y Herramientas específicas de la materia.
 * ============================================================================
 */
export default function AsideDevKitTab({
  devkitItems = [],
  subjectConfig,
  themeColor = '#3b82f6'
}) {
  if (!devkitItems || devkitItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)' }}>
        No hay herramientas DevKit registradas para esta materia.
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
      <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: '1.45' }}>
        Recursos, plantillas técnicas y guías de desarrollo optimizadas para <strong>{subjectConfig?.title || 'la asignatura'}</strong>:
      </p>

      {devkitItems.map((item, idx) => (
        <div key={idx} className="right-drawer-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
            <h5 style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-title)', fontWeight: 700 }}>
              {item.title}
            </h5>
            <span style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              padding: '0.15rem 0.45rem',
              borderRadius: '4px',
              background: `${themeColor}22`,
              color: themeColor,
              textTransform: 'uppercase'
            }}>
              {item.type || 'GUÍA'}
            </span>
          </div>

          <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.45' }}>
            {item.description}
          </p>

          <div style={{ marginTop: '0.25rem' }}>
            {item.link ? (
              item.link.startsWith('http') ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.82rem',
                    color: themeColor,
                    fontWeight: 700,
                    textDecoration: 'none'
                  }}
                >
                  <span>Abrir recurso externo</span>
                  <span>↗</span>
                </a>
              ) : (
                <Link
                  to={item.link}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.82rem',
                    color: themeColor,
                    fontWeight: 700,
                    textDecoration: 'none'
                  }}
                >
                  <span>Abrir recurso</span>
                  <span>→</span>
                </Link>
              )
            ) : item.slug && subjectConfig ? (
              <Link
                to={`/ioc/${subjectConfig.code}/${subjectConfig.lessonPrefix}/${item.slug}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.82rem',
                  color: themeColor,
                  fontWeight: 700,
                  textDecoration: 'none'
                }}
              >
                <span>Ver lección relacionada</span>
                <span>→</span>
              </Link>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
