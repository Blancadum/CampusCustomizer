import React from 'react';

/**
 * Componente: EacChecklist
 * Responsabilidad única (SRP): Renderizar la lista de verificación interactiva previa a la entrega.
 */
export default function EacChecklist({ checklist = [], accentColor = '#3b82f6' }) {
  if (!checklist || checklist.length === 0) return null;

  return (
    <section style={{ marginBottom: '0.75rem' }}>
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
        <span>✅</span>
        <span>Checklist de Verificación</span>
      </header>

      <div style={{
        background: 'var(--bg-input)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '10px',
        padding: '0.8rem 0.95rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.55rem'
      }}>
        {checklist.map((item, cIdx) => (
          <label 
            key={cIdx} 
            style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: '0.65rem', 
              fontSize: '0.84rem', 
              color: 'var(--text-main)', 
              cursor: 'pointer', 
              lineHeight: '1.4', 
              fontWeight: 500 
            }}
          >
            <input 
              type="checkbox" 
              style={{ 
                marginTop: '0.2rem', 
                accentColor: accentColor, 
                transform: 'scale(1.15)' 
              }} 
            />
            <span>{item}</span>
          </label>
        ))}
      </div>
    </section>
  );
}
