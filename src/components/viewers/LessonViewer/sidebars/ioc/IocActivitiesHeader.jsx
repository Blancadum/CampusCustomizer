import React from 'react';

/**
 * IocActivitiesHeader
 * Cabecera del panel lateral de actividades: icono, título y badge de ponderación.
 */
export default function IocActivitiesHeader({
  themeColor,
  currentActivity
}) {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.1rem',
        paddingBottom: '0.75rem',
        borderBottom: '2px solid var(--border-subtle)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '1.3rem' }}>🎯</span>
        <span style={{ fontWeight: 800, fontSize: '1.08rem', color: 'var(--text-title)', letterSpacing: '-0.01em' }}>
          EAC Entregas · Actividades
        </span>
      </div>

      <span
        style={{
          fontSize: '0.78rem',
          background: `${themeColor}20`,
          color: themeColor,
          padding: '0.22rem 0.6rem',
          borderRadius: '6px',
          fontWeight: 800,
          border: `1px solid ${themeColor}40`,
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}
      >
        {currentActivity?.weight || 'AVALUACIÓ CONTINUADA'}
      </span>
    </header>
  );
}
