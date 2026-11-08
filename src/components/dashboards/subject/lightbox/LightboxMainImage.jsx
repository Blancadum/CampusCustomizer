import React from 'react';

/**
 * LightboxMainImage
 * Contenedor de la imagen principal ampliada con opción de clic para cerrar.
 */
export default function LightboxMainImage({
  item,
  onClose
}) {
  if (!item) return null;

  return (
    <div 
      className="lightbox-main-container"
      onClick={onClose}
      title="Clic en la imagen para volver"
    >
      <img 
        src={item.img} 
        alt={item.title}
        className="lightbox-main-img"
        decoding="async"
      />
    </div>
  );
}
