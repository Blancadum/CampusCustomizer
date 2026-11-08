import React from 'react';

/**
 * Componente: EclipseShortcutsList
 * Responsabilidad única (SRP): Renderizar la lista de rutas clave y menús en Eclipse.
 */
export default function EclipseShortcutsList({ shortcuts = [], accentColor = '#3b82f6' }) {
  if (!shortcuts || shortcuts.length === 0) return null;

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
        <span>🧭</span>
        <span>Rutas Clave en Eclipse</span>
      </header>

      <div style={{
        background: 'var(--bg-hover)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '10px',
        padding: '0.75rem 0.95rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.6rem'
      }}>
        {shortcuts.map((sc, sIdx) => (
          <div key={sIdx} style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
            <code style={{ color: accentColor, fontWeight: 800, fontSize: '0.86rem' }}>
              {sc.key}
            </code>
            <span style={{ color: 'var(--text-main)', fontSize: '0.82rem', fontWeight: 500 }}>
              ↳ {sc.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
