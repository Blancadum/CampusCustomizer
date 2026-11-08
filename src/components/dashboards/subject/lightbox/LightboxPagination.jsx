import React from 'react';

/**
 * LightboxPagination
 * Tira inferior de miniaturas/puntos interactivos de navegación directa.
 */
export default function LightboxPagination({
  gallery = [],
  currentIndex,
  onSelect
}) {
  if (!gallery.length) return null;

  return (
    <div className="lightbox-pagination" onClick={e => e.stopPropagation()}>
      {gallery.map((item, idx) => (
        <button
          key={item.num || idx}
          type="button"
          onClick={() => onSelect(idx)}
          className={`lightbox-dot ${idx === currentIndex ? 'is-active' : ''}`}
          title={`Ver Ejercicio ${item.num}: ${item.title}`}
          aria-label={`Ir al ejercicio ${item.num}`}
        />
      ))}
    </div>
  );
}
