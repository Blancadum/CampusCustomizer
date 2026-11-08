import React, { useState } from 'react';

/**
 * CardArchiveButton
 * Botón sutil en la esquina superior derecha para archivar o restaurar
 * retos/cursos directamente desde la Home de MiCampus.
 */
export default function CardArchiveButton({ isArchived, onToggle, cardTitle = 'este reto' }) {
  const [isHovered, setIsHovered] = useState(false);

  if (!onToggle) return null;

  const buttonStyle = {
    position: 'absolute',
    top: '1.15rem',
    right: '1.15rem',
    zIndex: 10,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.38rem',
    padding: '0.35rem 0.72rem',
    fontSize: '0.75rem',
    fontFamily: 'inherit',
    fontWeight: 700,
    borderRadius: '8px',
    appearance: 'none',
    WebkitAppearance: 'none',
    outline: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    ...(isArchived
      ? {
          background: isHovered ? 'rgba(34, 197, 94, 0.22)' : 'rgba(34, 197, 94, 0.12)',
          border: '1px solid rgba(34, 197, 94, 0.45)',
          color: '#16a34a',
          transform: isHovered ? 'translateY(-1px)' : 'none',
        }
      : {
          background: isHovered ? 'rgba(245, 158, 11, 0.14)' : 'rgba(100, 116, 139, 0.08)',
          border: isHovered ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid var(--border-subtle, rgba(0, 0, 0, 0.1))',
          color: isHovered ? '#d97706' : 'var(--text-muted, #64748b)',
          transform: isHovered ? 'translateY(-1px)' : 'none',
        }),
  };

  return (
    <button
      type="button"
      className={`btn-card-archive ${isArchived ? 'is-archived' : ''}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={isArchived ? `Restaurar ${cardTitle} a la vista principal` : `Archivar ${cardTitle}`}
      aria-label={isArchived ? `Restaurar ${cardTitle}` : `Archivar ${cardTitle}`}
      style={buttonStyle}
    >
      <span style={{ fontSize: '0.85rem', lineHeight: 1 }}>{isArchived ? '📤' : '📦'}</span>
      <span>{isArchived ? 'Restaurar' : 'Archivar'}</span>
    </button>
  );
}
