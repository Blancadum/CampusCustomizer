import React from 'react';
import './LessonVideoPlayer.css';

/**
 * RestrictedVideoFallback
 * Pantalla de aviso con miniatura y enlace directo a YouTube cuando la inserción embebida está bloqueada.
 */
export default function RestrictedVideoFallback({
  src,
  title,
  ytHref,
  videoId,
  isFullWidth,
  onToggleFullWidth
}) {
  return (
    <div className={`lesson-video-card-container is-restricted ${isFullWidth ? 'w-100' : 'w-80'}`}>
      <div className="video-toolbar-header restricted">
        <div className="video-toolbar-title restricted">
          <span style={{ fontSize: '1.15rem' }}>🔴</span>
          <span>{title}</span>
        </div>
        <div className="video-toolbar-actions">
          {/* Toggle Ancho 80% / 100% */}
          <button
            type="button"
            onClick={onToggleFullWidth}
            title={isFullWidth ? 'Reducir a 80% de ancho' : 'Ver en 100% de ancho'}
            className={`video-ctrl-btn video-toggle-width-btn ${isFullWidth ? 'active-danger' : ''}`}
          >
            <span>{isFullWidth ? '⤡ 80%' : '⤢ 100%'}</span>
          </button>
          <span className="video-badge-restricted">
            🔒 Inserción restringida por YouTube
          </span>
        </div>
      </div>

      <div style={{
        position: 'relative',
        paddingBottom: '56.25%',
        height: 0,
        overflow: 'hidden',
        background: '#090d16'
      }}>
        {videoId && (
          <img 
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt={title}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.55) blur(2px)',
              transform: 'scale(1.05)'
            }}
          />
        )}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(15,23,42,0.4) 0%, rgba(10,15,30,0.85) 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          textAlign: 'center',
          zIndex: 2
        }}>
          {ytHref && (
            <a 
              href={ytHref} 
              target="_blank" 
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                color: '#ffffff',
                padding: '0.85rem 1.6rem',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '0.95rem',
                textDecoration: 'none',
                boxShadow: '0 6px 20px rgba(239, 68, 68, 0.45)',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span>Ver vídeo en YouTube</span>
              <span style={{ fontSize: '0.85rem' }}>↗</span>
            </a>
          )}

          <p style={{
            marginTop: '1rem',
            fontSize: '0.82rem',
            color: 'rgba(255,255,255,0.85)',
            maxWidth: '500px',
            lineHeight: 1.45,
            textShadow: '0 2px 4px rgba(0,0,0,0.8)'
          }}>
            {src ? (
              <span>
                💡 O coloca tu copia local en <code style={{ color: '#60a5fa', background: 'rgba(255,255,255,0.1)', padding: '0.1rem 0.35rem', borderRadius: '4px' }}>{src}</code> para reproducirlo directamente aquí en la web sin bloqueos.
              </span>
            ) : (
              'El autor ha restringido la inserción en webs externas. Ábrelo en YouTube con el botón superior.'
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
