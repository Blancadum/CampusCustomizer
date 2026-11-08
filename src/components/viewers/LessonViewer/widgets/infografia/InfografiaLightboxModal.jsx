import React from 'react';

/**
 * InfografiaLightboxModal
 * Modal en pantalla completa para examinar las láminas en alta resolución con zoom y navegación flotante.
 */
export default function InfografiaLightboxModal({
  isOpen,
  onClose,
  infografia,
  currentSlide,
  total,
  slideUrl,
  onPrev,
  onNext
}) {
  if (!isOpen) return null;

  return (
    <div 
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(5, 8, 15, 0.92)',
        backdropFilter: 'blur(8px)',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}
    >
      {/* Barra superior de controles del Lightbox */}
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'absolute',
          top: '16px',
          left: '20px',
          right: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#ffffff'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>
            {infografia.title || 'Arquitectura Web en Localhost'}
          </span>
          <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.2rem 0.6rem', borderRadius: '5px', fontSize: '0.82rem', fontWeight: 800 }}>
            {currentSlide + 1} de {total}
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          style={{
            background: 'rgba(255,255,255,0.15)',
            border: 'none',
            color: '#ffffff',
            borderRadius: '8px',
            padding: '0.5rem 1rem',
            fontSize: '1.2rem',
            fontWeight: 900,
            cursor: 'pointer'
          }}
        >
          ✕ Cerrar
        </button>
      </div>

      {/* Imagen ampliada */}
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          maxWidth: '92vw',
          maxHeight: '85vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <img 
          src={slideUrl} 
          alt={`Lámina ${currentSlide + 1}`}
          style={{
            maxWidth: '100%',
            maxHeight: '85vh',
            objectFit: 'contain',
            borderRadius: '8px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
          }}
        />

        {/* Flechas de navegación en Fullscreen */}
        <button
          type="button"
          onClick={onPrev}
          style={{
            position: 'fixed',
            left: '24px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            color: '#ffffff',
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            fontSize: '2rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ‹
        </button>

        <button
          type="button"
          onClick={onNext}
          style={{
            position: 'fixed',
            right: '24px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            color: '#ffffff',
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            fontSize: '2rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ›
        </button>
      </div>
    </div>
  );
}
