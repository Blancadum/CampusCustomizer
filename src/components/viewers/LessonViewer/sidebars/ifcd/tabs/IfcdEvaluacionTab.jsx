import React from 'react';

/**
 * IfcdEvaluacionTab
 * Criterios de superación para diploma y ponderación porcentual de instrumentos evaluativos.
 */
export default function IfcdEvaluacionTab({ evaluacion }) {
  if (!evaluacion) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
      <div style={{ padding: '0.85rem', borderRadius: '10px', background: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)' }}>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', color: 'var(--text-title)' }}>
          🏆 Criterios para Obtener el Diploma
        </h4>
        <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.75rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
          {evaluacion.criteriosSuperacion?.map((c, i) => (
            <li key={i} style={{ marginBottom: '0.25rem' }}>{c}</li>
          ))}
        </ul>
      </div>

      <h4 style={{ margin: '0', fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800 }}>
        Ponderación de Instrumentos
      </h4>

      {evaluacion.instrumentos?.map((inst, idx) => (
        <div
          key={idx}
          style={{
            padding: '0.75rem',
            borderRadius: '8px',
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-title)' }}>
              {inst.nombre}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              {inst.descripcion}
            </div>
          </div>
          <span style={{
            padding: '0.2rem 0.5rem',
            borderRadius: '999px',
            fontSize: '0.72rem',
            fontWeight: 800,
            background: inst.peso.includes('70%') ? 'rgba(234, 88, 12, 0.2)' : 'rgba(0,0,0,0.06)',
            color: inst.peso.includes('70%') ? '#ea580c' : 'var(--text-main)',
            whiteSpace: 'nowrap'
          }}>
            {inst.peso}
          </span>
        </div>
      ))}
    </div>
  );
}
