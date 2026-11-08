import React from 'react';

/**
 * IfcdCronogramaTab
 * Cronograma oficial con hitos por módulo y salto interactivo a la teoría.
 */
export default function IfcdCronogramaTab({
  cronograma = [],
  onSelectSection,
  onClose
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div style={{
        padding: '0.65rem 0.8rem',
        background: 'rgba(234, 88, 12, 0.08)',
        borderRadius: '8px',
        borderLeft: '3px solid #ea580c',
        fontSize: '0.78rem',
        color: 'var(--text-main)',
        lineHeight: 1.4
      }}>
        <strong>Ritmo Sugerido:</strong> 2 horas diarias de estudio. Pulsa en cualquier módulo para saltar a sus lecciones teóricas.
      </div>

      {cronograma.map((item, idx) => (
        <div
          key={idx}
          style={{
            padding: '0.85rem',
            borderRadius: '10px',
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.35rem'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#ea580c', textTransform: 'uppercase' }}>
              {item.modulo}
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              {item.fechas}
            </span>
          </div>

          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-title)' }}>
            {item.titulo}
          </div>

          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', lineHeight: 1.35 }}>
            {item.hitos}
          </div>

          {item.targetSlug && (
            <button
              type="button"
              onClick={() => {
                if (onSelectSection) onSelectSection(item.targetSlug);
                if (onClose) onClose();
              }}
              style={{
                marginTop: '0.35rem',
                alignSelf: 'flex-start',
                padding: '0.25rem 0.55rem',
                borderRadius: '5px',
                background: 'rgba(234, 88, 12, 0.12)',
                border: '1px solid rgba(234, 88, 12, 0.3)',
                color: '#ea580c',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              📖 Ver temas del módulo ➔
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
