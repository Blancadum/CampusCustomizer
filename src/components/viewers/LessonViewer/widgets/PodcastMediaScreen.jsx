import React from 'react';

/**
 * PodcastMediaScreen
 * Contenedor visual del elemento <video> o <audio> con gestión de estados de error,
 * proporción responsiva y enlace de descarga del recurso.
 */
export default function PodcastMediaScreen({
  activeMedia,
  isCurrentVideo,
  isVideoFullWidth,
  mediaRef,
  hasError,
  onError,
  onLoadedData,
  themeColor
}) {
  if (!activeMedia) return null;

  return (
    <>
      {/* Reproductor de Vídeo o Audio */}
      {isCurrentVideo ? (
        <div 
          className="lesson-video-card-container"
          style={{
            position: 'relative',
            width: isVideoFullWidth ? '100%' : '80%',
            margin: '0 auto',
            transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            borderRadius: '10px',
            overflow: 'hidden',
            background: '#000',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)'
          }}
        >
          <video
            ref={mediaRef}
            controls
            src={activeMedia.url}
            onError={onError}
            onLoadedData={onLoadedData}
            style={{
              width: '100%',
              maxHeight: isVideoFullWidth ? '580px' : '460px',
              display: 'block',
              outline: 'none',
              transition: 'max-height 0.3s ease'
            }}
          />
        </div>
      ) : (
        <audio
          ref={mediaRef}
          controls
          src={activeMedia.url}
          onError={onError}
          onLoadedData={onLoadedData}
          style={{
            width: '100%',
            height: '44px',
            borderRadius: '8px',
            outline: 'none'
          }}
        />
      )}

      {/* Pie de estado y descarga */}
      {hasError ? (
        <div style={{
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          background: 'var(--bg-input)',
          padding: '0.5rem 0.85rem',
          borderRadius: '8px',
          border: '1px dashed var(--border-subtle)'
        }}>
          <span>💡</span>
          <span>
            Archivo no disponible en <code style={{ color: themeColor, fontWeight: 600 }}>{activeMedia.url}</code>.
          </span>
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
          <span>📍 <code>{activeMedia.url}</code></span>
          <a
            href={activeMedia.url}
            target="_blank"
            rel="noreferrer"
            download
            className="accent-ink"
            style={{ '--accent': themeColor, color: themeColor, textDecoration: 'none', fontWeight: 600 }}
          >
            Descargar archivo ↗
          </a>
        </div>
      )}
    </>
  );
}
