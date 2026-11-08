import React from 'react';

/**
 * LightboxNavButton
 * Botón de navegación direccional (anterior o siguiente) para el visor modal.
 */
export default function LightboxNavButton({
  direction = 'next',
  onClick
}) {
  const isPrev = direction === 'prev';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`lightbox-nav-btn ${isPrev ? 'lightbox-prev-btn' : 'lightbox-next-btn'}`}
      title={isPrev ? 'Actividad anterior (Flecha Izquierda)' : 'Siguiente actividad (Flecha Derecha)'}
      aria-label={isPrev ? 'Actividad anterior' : 'Siguiente actividad'}
    >
      {isPrev ? '‹' : '›'}
    </button>
  );
}
