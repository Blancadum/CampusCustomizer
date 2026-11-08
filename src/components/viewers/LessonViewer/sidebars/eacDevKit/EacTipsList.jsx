import React from 'react';

/**
 * Componente: EacTipsList
 * Responsabilidad única (SRP): Renderizar consejos técnicos y reglas conceptuales clave.
 */
export default function EacTipsList({ tips = [] }) {
  if (!tips || tips.length === 0) return null;

  return (
    <section style={{ marginBottom: '1.5rem' }}>
      <header style={{
        fontSize: '0.86rem',
        textTransform: 'uppercase',
        fontWeight: 800,
        color: 'var(--text-title)',
        letterSpacing: '0.6px',
        marginBottom: '0.65rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem'
      }}>
        <span>💡</span>
        <span>Reglas & Tips Clave</span>
      </header>

      <ul style={{
        margin: 0,
        paddingLeft: '1.2rem',
        fontSize: '0.85rem',
        color: 'var(--text-main)',
        lineHeight: '1.55',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        fontWeight: 500
      }}>
        {tips.map((tip, tIdx) => (
          <li key={tIdx}>{tip}</li>
        ))}
      </ul>
    </section>
  );
}
