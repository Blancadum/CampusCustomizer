import React from 'react';

/**
 * Componente: EacUnitSelector
 * Responsabilidad única (SRP): Renderizar la barra de selección de entregas (EAC1, EAC2, EAC3).
 */
export default function EacUnitSelector({ 
  moduleIds = [], 
  selectedModuleId, 
  activeKitColor,
  onSelect 
}) {
  return (
    <nav 
      aria-label="Selector de EACs"
      style={{
        display: 'flex',
        gap: '0.45rem',
        background: 'var(--bg-input)',
        padding: '0.35rem',
        borderRadius: '10px',
        marginBottom: '1.3rem',
        border: '1px solid var(--border-subtle)'
      }}
    >
      {moduleIds.map(moduleId => {
        const isSelected = selectedModuleId === moduleId;
        const eacLabel = moduleId.replace('u', 'EAC').toUpperCase();

        return (
          <button
            key={moduleId}
            type="button"
            onClick={() => onSelect(moduleId)}
            style={{
              flex: 1,
              background: isSelected ? 'var(--bg-card)' : 'transparent',
              color: isSelected ? activeKitColor : 'var(--text-muted)',
              border: isSelected ? '1px solid var(--border-subtle)' : 'none',
              borderRadius: '7px',
              padding: '0.45rem 0.3rem',
              fontSize: '0.86rem',
              fontWeight: isSelected ? 800 : 600,
              cursor: 'pointer',
              boxShadow: isSelected ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.15s ease',
              textAlign: 'center'
            }}
          >
            {eacLabel}
          </button>
        );
      })}
    </nav>
  );
}
