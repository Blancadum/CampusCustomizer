import React from 'react';

/**
 * LightboxHeader
 * Barra superior de controles del visor con metadatos del ejercicio y botón de cierre.
 */
export default function LightboxHeader({
  currentItem,
  currentIndex,
  total,
  onClose
}) {
  if (!currentItem) return null;

  return (
    <div className="lightbox-header" onClick={e => e.stopPropagation()}>
      <div className="lightbox-info">
        <span className="lightbox-badge">
          Ejercicio {currentItem.num}
        </span>
        <span className="lightbox-title">
          {currentItem.title}
        </span>
        <span className="lightbox-counter">
          ({currentIndex + 1} de {total})
        </span>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="lightbox-close-btn"
        title="Cerrar visor (Esc)"
        aria-label="Cerrar visor"
      >
        ✕
      </button>
    </div>
  );
}
