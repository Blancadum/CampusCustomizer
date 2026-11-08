import React from 'react';

/**
 * InfografiaSlideViewport
 * Visor principal de la lámina actual: imagen centrada, flechas flotantes y contador de lámina.
 */
export default function InfografiaSlideViewport({
  slideUrl,
  currentSlide,
  total,
  onPrev,
  onNext,
  onOpenFullscreen
}) {
  return (
    <div 
      style={{
        position: 'relative',
        background: '#090d16',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '440px',
        maxHeight: '620px',
        overflow: 'hidden'
      }}
    >
      <img 
        src={slideUrl} 
        alt={`Lámina ${currentSlide + 1} de ${total}`}
        style={{
          maxWidth: '100%',
          maxHeight: '620px',
          objectFit: 'contain',
          display: 'block',
          cursor: 'zoom-in',
          transition: 'transform 0.2s ease'
        }}
        onClick={onOpenFullscreen}
      />

      {/* Flecha Anterior Flotante */}
      <button
        type="button"
        onClick={onPrev}
        title="Lámina anterior (Flecha Izquierda)"
        style={{
          position: 'absolute',
          left: '14px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(15, 23, 42, 0.75)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: '#ffffff',
          borderRadius: '50%',
          width: '44px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.3rem',
          cursor: 'pointer',
          backdropFilter: 'blur(4px)',
          transition: 'all 0.15s ease'
        }}
      >
        ‹
      </button>

      {/* Flecha Siguiente Flotante */}
      <button
        type="button"
        onClick={onNext}
        title="Lámina siguiente (Flecha Derecha)"
        style={{
          position: 'absolute',
          right: '14px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(15, 23, 42, 0.75)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: '#ffffff',
          borderRadius: '50%',
          width: '44px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.3rem',
          cursor: 'pointer',
          backdropFilter: 'blur(4px)',
          transition: 'all 0.15s ease'
        }}
      >
        ›
      </button>

      {/* Contador Flotante */}
      <div style={{
        position: 'absolute',
        bottom: '12px',
        right: '16px',
        background: 'rgba(15, 23, 42, 0.85)',
        color: '#ffffff',
        padding: '0.25rem 0.7rem',
        borderRadius: '6px',
        fontSize: '0.8rem',
        fontWeight: 800,
        backdropFilter: 'blur(4px)'
      }}>
        Lámina {currentSlide + 1} / {total}
      </div>
    </div>
  );
}
