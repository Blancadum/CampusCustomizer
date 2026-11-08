import React from 'react';

/**
 * AccentureVideosHeader
 * Botón flotante y cabecera del cajón de vídeos de Accenture.
 */
export default function AccentureVideosHeader({
  isOpen,
  onToggle,
  topOffset = '76px',
  topicsCount = 0
}) {
  return (
    <>
      {/* Botón Pestaña Lateral */}
      <button
        onClick={onToggle}
        style={{
          position: 'absolute',
          left: '-40px',
          top: topOffset,
          width: '40px',
          height: '46px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRight: 'none',
          borderRadius: '10px 0 0 10px',
          boxShadow: '-4px 2px 10px rgba(0,0,0,0.12)',
          color: 'var(--text-main)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.05rem',
          zIndex: 951,
          transition: 'all 0.2s ease',
          padding: 0
        }}
        title={isOpen ? 'Ocultar panel de vídeos' : 'Vídeos Recomendados Accenture · Marco Teórico'}
        aria-label={isOpen ? 'Ocultar panel de vídeos' : 'Vídeos Recomendados Accenture · Marco Teórico'}
      >
        <span>{isOpen ? '▶' : '🎬'}</span>
      </button>

      {/* Cabecera */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginBottom: '0.8rem', 
        paddingBottom: '0.65rem', 
        borderBottom: '1px solid var(--border-subtle, rgba(255,255,255,0.08))' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.98rem', color: 'var(--text-title)' }}>
          <span style={{ fontSize: '1.25rem' }}>🎬</span>
          <div>
            <div>Vídeos Accenture</div>
            <div style={{ fontSize: '0.72rem', color: '#06b6d4', fontWeight: 600 }}>Marco Teórico & Tutorías</div>
          </div>
        </div>
        <span style={{ 
          fontSize: '0.72rem', 
          background: 'rgba(6, 182, 212, 0.15)', 
          color: '#06b6d4', 
          padding: '0.2rem 0.5rem', 
          borderRadius: '6px', 
          fontWeight: 700 
        }}>
          {topicsCount} Temas
        </span>
      </div>
    </>
  );
}
