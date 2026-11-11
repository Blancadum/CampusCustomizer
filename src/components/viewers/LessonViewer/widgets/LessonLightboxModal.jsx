import React, { useEffect } from 'react';

export default function LessonLightboxModal({ 
  image, 
  zoom = 1, 
  setZoom, 
  onClose 
}) {
  useEffect(() => {
    if (!image) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [image, onClose]);

  if (!image) return null;

  const handleZoomIn = (e) => {
    e.stopPropagation();
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = (e) => {
    e.stopPropagation();
    setZoom(prev => Math.max(prev - 0.25, 0.6));
  };

  const handleResetZoom = (e) => {
    e.stopPropagation();
    setZoom(1);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        background: 'rgba(10, 15, 28, 0.94)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
      onClick={onClose}
    >
      {/* Barra superior de controles del visor */}
      <div 
        style={{
          width: '100%',
          padding: '0.85rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(15, 23, 42, 0.98)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          gap: '1rem',
          zIndex: 2,
          boxSizing: 'border-box'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
          <span style={{ fontSize: '1.25rem' }}>🖼️</span>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#f8fafc', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {image.alt || 'Diagrama Técnico'}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
              Haz clic en el diagrama para hacer zoom o arrastra para mover
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0 }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            background: 'rgba(255, 255, 255, 0.08)', 
            borderRadius: '8px', 
            border: '1px solid rgba(255, 255, 255, 0.12)',
            padding: '0.15rem'
          }}>
            <button 
              onClick={handleZoomOut}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: '#ffffff', 
                width: '32px', 
                height: '32px', 
                cursor: 'pointer',
                fontSize: '1.1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '6px'
              }}
              title="Reducir zoom"
            >
              −
            </button>
            <button 
              onClick={handleResetZoom}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: '#93c5fd', 
                padding: '0 0.5rem', 
                height: '32px', 
                cursor: 'pointer',
                fontSize: '0.78rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center'
              }}
              title="Restablecer zoom al 100%"
            >
              {Math.round(zoom * 100)}%
            </button>
            <button 
              onClick={handleZoomIn}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: '#ffffff', 
                width: '32px', 
                height: '32px', 
                cursor: 'pointer',
                fontSize: '1.1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '6px'
              }}
              title="Aumentar zoom"
            >
              +
            </button>
          </div>

          <a 
            href={image.src} 
            target="_blank" 
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.45rem 0.85rem',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#e2e8f0',
              textDecoration: 'none',
              fontSize: '0.8rem',
              fontWeight: 600
            }}
            title="Abrir imagen original directamente en una pestaña nueva"
          >
            <span>Abrir pestaña</span>
            <span>↗</span>
          </a>

          <button 
            onClick={onClose}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              padding: '0.45rem 0.95rem',
              borderRadius: '8px',
              background: '#ef4444',
              border: 'none',
              color: '#ffffff',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(239, 68, 68, 0.4)'
            }}
            title="Cerrar visor (Esc)"
          >
            <span>✕</span>
            <span>Cerrar</span>
          </button>
        </div>
      </div>

      {/* Contenedor con scroll para explorar la imagen en alta definición */}
      <div 
        style={{
          flex: 1,
          width: '100%',
          overflow: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2.5rem',
          boxSizing: 'border-box'
        }}
        onClick={onClose}
      >
        <div 
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'center center',
            transition: 'transform 0.15s ease-out',
            maxWidth: zoom <= 1 ? '92vw' : 'none',
            maxHeight: zoom <= 1 ? '82vh' : 'none',
            background: 'var(--dm-surface, #ffffff)',
            borderRadius: '14px',
            padding: '1.2rem',
            boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
            cursor: zoom >= 1.5 ? 'zoom-out' : 'zoom-in'
          }}
          onClick={(e) => {
            e.stopPropagation();
            setZoom(prev => prev >= 1.6 ? 1 : prev + 0.35);
          }}
        >
          <img 
            src={image.src} 
            alt={image.alt} 
            style={{
              display: 'block',
              maxWidth: '100%',
              maxHeight: zoom <= 1 ? '75vh' : 'none',
              width: zoom > 1 ? 'auto' : '100%',
              height: 'auto',
              borderRadius: '8px'
            }}
          />
        </div>
      </div>
    </div>
  );
}
