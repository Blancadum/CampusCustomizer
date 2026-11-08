import React from 'react';

/**
 * IocActivityRubric
 * Bloques de ponderación en la evaluación continua (AC) y lista de criterios/objetivos a cumplir.
 */
export default function IocActivityRubric({
  currentActivity,
  themeColor
}) {
  if (!currentActivity) return null;

  return (
    <>
      {/* Bloque de Ponderación e Impacto Académico */}
      <section style={{ marginBottom: '1.4rem' }}>
        <div
          style={{
            fontSize: '0.86rem',
            textTransform: 'uppercase',
            fontWeight: 800,
            color: 'var(--text-title)',
            letterSpacing: '0.6px',
            marginBottom: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}
        >
          <span>⚖️</span>
          <span>Ponderación y Calificación (AC)</span>
        </div>

        <div
          style={{
            background: 'var(--bg-hover)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '10px',
            padding: '0.95rem 1.05rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-title)' }}>
              Ponderación en la Evaluación Continua
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              {currentActivity.isPending() ? 'Estado: Pendiente de entrega' : 'Estado: Bloqueado temporalmente'}
            </div>
          </div>

          <span
            style={{
              fontSize: '0.92rem',
              fontWeight: 800,
              color: themeColor,
              background: `${themeColor}15`,
              padding: '0.3rem 0.65rem',
              borderRadius: '7px',
              border: `1px solid ${themeColor}35`
            }}
          >
            {currentActivity.weight || 'Evaluable'}
          </span>
        </div>
      </section>

      {/* Bloque de Requisitos y Checklist de Entrega */}
      {Array.isArray(currentActivity.checklist) && currentActivity.checklist.length > 0 && (
        <section style={{ marginBottom: '1.2rem' }}>
          <div
            style={{
              fontSize: '0.86rem',
              textTransform: 'uppercase',
              fontWeight: 800,
              color: 'var(--text-title)',
              letterSpacing: '0.6px',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <span>📋</span>
            <span>Criterios y Objetivos a Cumplir</span>
          </div>

          <div
            style={{
              background: 'var(--bg-hover)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '10px',
              padding: '0.9rem 1rem'
            }}
          >
            <ul style={{ margin: 0, paddingLeft: '1.15rem', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {currentActivity.checklist.map((item, idx) => (
                <li
                  key={idx}
                  style={{
                    fontSize: '0.84rem',
                    color: 'var(--text-main)',
                    lineHeight: '1.4',
                    fontWeight: 500
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
