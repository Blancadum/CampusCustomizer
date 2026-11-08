import React from 'react';

const PLAYBACK_RATES = [1, 1.25, 1.5, 2];

/**
 * LocalVideoToolbar
 * Barra de herramientas superior para vídeos locales: selector de ancho, velocidad, PiP y enlaces.
 */
export default function LocalVideoToolbar({
  title,
  ytHref,
  isFullWidth,
  onToggleFullWidth,
  playbackRate,
  onSpeedChange,
  supportsPiP,
  isPiPActive,
  onTogglePiP
}) {
  return (
    <div className="video-toolbar-header local">
      <div className="video-toolbar-title local">
        <span style={{ fontSize: '1.15rem' }}>📹</span>
        <span>{title}</span>
      </div>

      <div className="video-toolbar-actions">
        {/* Toggle Ancho 80% / 100% */}
        <button
          type="button"
          onClick={onToggleFullWidth}
          className={`video-ctrl-btn video-toggle-width-btn ${isFullWidth ? 'active' : ''}`}
          title={isFullWidth ? 'Reducir a 80% de ancho' : 'Ver en 100% de ancho'}
        >
          <span>{isFullWidth ? '⤡ 80%' : '⤢ 100%'}</span>
        </button>

        {/* Selector de velocidad */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
          {PLAYBACK_RATES.map((rate) => (
            <button
              key={rate}
              type="button"
              onClick={() => onSpeedChange(rate)}
              className={`video-ctrl-btn video-speed-btn ${playbackRate === rate ? 'active' : ''}`}
            >
              {rate}x
            </button>
          ))}
        </div>

        {/* PiP */}
        {supportsPiP && (
          <button
            type="button"
            onClick={onTogglePiP}
            className={`video-ctrl-btn video-pip-btn ${isPiPActive ? 'active' : ''}`}
            title={isPiPActive ? 'Salir de PiP' : 'Ver en pantalla flotante'}
          >
            <span>📺</span>
            <span>{isPiPActive ? 'En PiP' : 'PiP'}</span>
          </button>
        )}

        <span className="video-badge-hd">
          ✨ Vídeo Local MP4 · HD
        </span>

        {ytHref && (
          <a 
            href={ytHref} 
            target="_blank" 
            rel="noreferrer"
            className="video-yt-link"
          >
            <span>YouTube</span> <span>↗</span>
          </a>
        )}
      </div>
    </div>
  );
}
