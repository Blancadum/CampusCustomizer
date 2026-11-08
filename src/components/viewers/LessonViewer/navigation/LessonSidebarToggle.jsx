import React from 'react';

/**
 * Botón flotante para plegar/desplegar el índice lateral sin molestar la lectura.
 */
export default function LessonSidebarToggle({
  isSidebarOpen,
  setIsSidebarOpen,
  isMobile
}) {
  return (
    <button 
      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      style={{
        position: 'fixed',
        top: '145px',
        left: isSidebarOpen ? (isMobile ? '300px' : 'clamp(300px, 25vw, 500px)') : '0px',
        zIndex: 1000,
        background: 'var(--bg-card)',
        color: 'var(--text-main)',
        border: '1px solid var(--border-subtle)',
        borderLeft: 'none',
        borderRadius: '0 8px 8px 0',
        width: '32px',
        height: '44px',
        fontSize: '0.9rem',
        boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        backdropFilter: 'blur(8px)',
        opacity: 0.9
      }}
      onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.color = 'var(--accent-purple)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.color = 'var(--text-main)'; }}
      title={isSidebarOpen ? 'Replegar menú lateral' : 'Desplegar menú lateral'}
      aria-label={isSidebarOpen ? 'Replegar menú lateral' : 'Desplegar menú lateral'}
    >
      <span>{isSidebarOpen ? '◀' : '▶'}</span>
    </button>
  );
}
