import React from 'react';

/**
 * Componente: EacHeaderCard
 * Responsabilidad única (SRP): Renderizar la tarjeta informativa de la EAC seleccionada.
 */
export default function EacHeaderCard({ kit, onNavigateToSection }) {
  if (!kit) return null;

  return (
    <div style={{
      background: 'var(--bg-hover)',
      border: `1px solid ${kit.color}35`,
      borderLeft: `5px solid ${kit.color}`,
      borderRadius: '10px',
      padding: '1rem 1.15rem',
      marginBottom: '1.4rem',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
        <h4 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-title)', lineHeight: '1.3' }}>
          {kit.eacTitle}
        </h4>
        <span style={{ 
          fontSize: '0.78rem', 
          color: '#d97706', 
          fontWeight: 800, 
          whiteSpace: 'nowrap',
          background: 'rgba(245, 158, 11, 0.12)',
          padding: '0.2rem 0.5rem',
          borderRadius: '5px',
          border: '1px solid rgba(245, 158, 11, 0.3)'
        }}>
          ⏳ {kit.dueDate}
        </span>
      </div>
      <p style={{ margin: '0.55rem 0 0', fontSize: '0.86rem', color: 'var(--text-main)', lineHeight: '1.45', fontWeight: 500 }}>
        {kit.summary}
      </p>
    </div>
  );
}
