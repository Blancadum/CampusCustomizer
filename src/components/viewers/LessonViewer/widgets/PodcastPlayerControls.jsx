import React from 'react';

/**
 * PodcastPlayerControls
 * Cabecera y controles de la tarjeta de reproducción: selector de medios (vídeo/audio),
 * selector de velocidad (1x, 1.25x, 1.5x, 2x), botón PiP y botón toggle de ancho 80%/100%.
 */
export default function PodcastPlayerControls({
  activeMedia,
  items = [],
  activeIndex,
  onSelectIndex,
  isCurrentVideo,
  themeColor,
  iconBg,
  playbackRate,
  onSpeedChange,
  supportsPiP,
  isPiPActive,
  onTogglePiP,
  isVideoFullWidth,
  onToggleFullWidth,
  isVideoFormat
}) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.8rem' }}>
      {/* Título e icono del medio activo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '12px',
          background: iconBg,
          color: themeColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
        }}>
          {isCurrentVideo ? '🎬' : '🎙️'}
        </div>
        <div>
          <div className="accent-ink" style={{
            '--accent': themeColor,
            fontSize: '0.74rem',
            textTransform: 'uppercase',
            fontWeight: 800,
            color: themeColor,
            letterSpacing: '0.5px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}>
            <span>{activeMedia.badge || (isCurrentVideo ? 'Vídeo Lección' : 'Podcast de Audio')}</span>
            <span style={{ color: 'var(--text-dim)' }}>•</span>
            <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Contenido Multimedia</span>
          </div>
          <h4 style={{
            margin: '0.2rem 0 0',
            fontSize: '1.05rem',
            fontWeight: 800,
            color: 'var(--text-title)'
          }}>
            {activeMedia.title || 'Reproducción del tema'}
          </h4>
        </div>
      </div>

      {/* Pestañas y Controles de velocidad / PiP / Ancho */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
        {items.length > 1 && (
          <div style={{ display: 'flex', gap: '0.3rem', background: 'var(--bg-primary)', padding: '0.25rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
            {items.map((item, idx) => {
              const isVid = item.type === 'video' || (isVideoFormat && isVideoFormat(item.url));
              const isSel = idx === activeIndex;
              const tabText = item.label || item.tabLabel || (isVid ? '🎬 Vídeo' : '🎙️ Audio');
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSelectIndex(idx)}
                  aria-pressed={isSel}
                  className="accent-toggle"
                  style={{
                    '--accent': themeColor,
                    background: isSel ? themeColor : 'none',
                    color: isSel ? '#fff' : 'var(--text-muted)',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.25rem 0.65rem',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span>{tabText}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Selector de velocidad */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginRight: '0.1rem' }}>Velocidad:</span>
          {[1, 1.25, 1.5, 2].map((rate) => (
            <button
              key={rate}
              type="button"
              onClick={() => onSpeedChange(rate)}
              aria-pressed={playbackRate === rate}
              className="accent-toggle"
              style={{
                '--accent': themeColor,
                background: playbackRate === rate ? themeColor : 'var(--bg-input)',
                color: playbackRate === rate ? '#fff' : 'var(--text-muted)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '6px',
                padding: '0.2rem 0.45rem',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {rate}x
            </button>
          ))}
        </div>

        {/* Botón PiP para vídeo */}
        {isCurrentVideo && supportsPiP && (
          <button
            type="button"
            onClick={onTogglePiP}
            title={isPiPActive ? "Salir de pantalla flotante (PiP)" : "Ver en pantalla flotante (PiP)"}
            aria-pressed={isPiPActive}
            className="accent-toggle"
            style={{
              '--accent': themeColor,
              background: isPiPActive ? themeColor : 'var(--bg-input)',
              color: isPiPActive ? '#fff' : 'var(--text-muted)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '6px',
              padding: '0.2rem 0.55rem',
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              transition: 'all 0.15s ease'
            }}
          >
            <span>📺</span>
            <span>{isPiPActive ? 'En PiP' : 'PiP'}</span>
          </button>
        )}

        {/* Botón Toggle Ancho 80% / 100% para vídeo */}
        {isCurrentVideo && (
          <button
            type="button"
            onClick={onToggleFullWidth}
            title={isVideoFullWidth ? "Reducir a 80% de ancho" : "Ver en 100% de ancho"}
            aria-pressed={isVideoFullWidth}
            className="accent-toggle"
            style={{
              '--accent': themeColor,
              background: isVideoFullWidth ? themeColor : 'var(--bg-input)',
              color: isVideoFullWidth ? '#fff' : 'var(--text-muted)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '6px',
              padding: '0.2rem 0.55rem',
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              transition: 'all 0.15s ease'
            }}
          >
            <span>{isVideoFullWidth ? '⤡ 80%' : '⤢ 100%'}</span>
          </button>
        )}
      </div>
    </div>
  );
}
