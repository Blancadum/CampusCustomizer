import React from 'react';

/**
 * Botón pestaña adherido al borde izquierdo del panel lateral derecho.
 */
export default function LessonRightSidebarTrigger({
  isOpen,
  onToggle,
  topOffset = '20px',
  tabTitle,
  tabIcon
}) {
  return (
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
      title={isOpen ? 'Ocultar panel lateral' : tabTitle}
      aria-label={isOpen ? 'Ocultar panel lateral' : tabTitle}
    >
      <span>{isOpen ? '▶' : tabIcon}</span>
    </button>
  );
}
