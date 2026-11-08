import React, { useEffect } from 'react';
import LightboxHeader from './lightbox/LightboxHeader.jsx';
import LightboxNavButton from './lightbox/LightboxNavButton.jsx';
import LightboxMainImage from './lightbox/LightboxMainImage.jsx';
import LightboxPagination from './lightbox/LightboxPagination.jsx';

/**
 * SubjectLightboxModal
 * Visor interactivo a pantalla completa para diagramas y soluciones de ejercicios EAC.
 * Incluye navegación por teclado (Esc, Flecha Izquierda, Flecha Derecha),
 * controles anterior/siguiente, zoom-out al hacer clic y tira de miniaturas inferior.
 */
export default function SubjectLightboxModal({
  gallery = [],
  currentIndex,
  onClose,
  onIndexChange
}) {
  const isOpen = currentIndex !== null && Boolean(gallery[currentIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onIndexChange((currentIndex + 1) % gallery.length);
      } else if (e.key === 'ArrowLeft') {
        onIndexChange((currentIndex - 1 + gallery.length) % gallery.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, gallery.length, onClose, onIndexChange]);

  if (!isOpen) return null;

  const currentItem = gallery[currentIndex];

  const handlePrev = (e) => {
    e.stopPropagation();
    onIndexChange((currentIndex - 1 + gallery.length) % gallery.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    onIndexChange((currentIndex + 1) % gallery.length);
  };

  return (
    <div 
      className="lightbox-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Visor de imagen: ${currentItem.title}`}
    >
      {/* Barra superior de controles */}
      <LightboxHeader
        currentItem={currentItem}
        currentIndex={currentIndex}
        total={gallery.length}
        onClose={onClose}
      />

      {/* Botón Flecha Izquierda (Anterior) */}
      <LightboxNavButton
        direction="prev"
        onClick={handlePrev}
      />

      {/* Imagen Principal Ampliada */}
      <LightboxMainImage
        item={currentItem}
        onClose={onClose}
      />

      {/* Botón Flecha Derecha (Siguiente) */}
      <LightboxNavButton
        direction="next"
        onClick={handleNext}
      />

      {/* Paginación / Tira de miniaturas inferior */}
      <LightboxPagination
        gallery={gallery}
        currentIndex={currentIndex}
        onSelect={onIndexChange}
      />
    </div>
  );
}
