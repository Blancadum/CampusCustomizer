import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LessonVideoPlayer, { LOCAL_VIDEO_MAP } from '../LessonVideoPlayer';
import PresentationCard from '../../../../common/PresentationCard';

const RESTRICTED_EMBED_IDS = new Set([
  'jzPhDD-aeF8',
  '_AgW-rLgFWw',
  '33Kj44N_3fU',
  '1F_8kI8n704',
  'L5y1z34Z0z4',
  'm7N3o7XpZpE',
  'vDp5n3qGNuQ'
]);

function LessonYouTubeEmbed({ embedUrl, title, href }) {
  const [isFullWidth, setIsFullWidth] = useState(false);

  return (
    <div 
      className="lesson-yt-container"
      style={{
        width: isFullWidth ? '100%' : '80%',
        margin: '1.6rem auto',
        maxWidth: '100%',
        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <div className="lesson-yt-header">
        <div className="lesson-yt-title">
          <span className="lesson-yt-dot">🔴</span>
          <span>{title}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={() => setIsFullWidth(!isFullWidth)}
            title={isFullWidth ? "Reducir a 80% de ancho" : "Ver en 100% de ancho"}
            style={{
              background: isFullWidth ? '#ef4444' : 'rgba(255,255,255,0.06)',
              color: isFullWidth ? '#fff' : 'var(--text-muted, #94a3b8)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '5px',
              padding: '0.15rem 0.5rem',
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              transition: 'all 0.15s ease'
            }}
          >
            <span>{isFullWidth ? '⤡ 80%' : '⤢ 100%'}</span>
          </button>
          <a 
            href={href} 
            target="_blank" 
            rel="noreferrer" 
            className="lesson-yt-link"
          >
            <span>Abrir en YouTube</span> <span>↗</span>
          </a>
        </div>
      </div>
      <div className="lesson-yt-iframe-wrap">
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          loading="lazy"
          className="lesson-yt-iframe"
        />
      </div>
    </div>
  );
}

function getYouTubeEmbedInfo(url) {
  if (!url || typeof url !== 'string') return null;
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|(?:embed|v)\/))([\w-]{11})/i);
  if (!ytMatch) return null;
  const videoId = ytMatch[1];
  let startSeconds = 0;
  const tMatch = url.match(/[?&]t=(\d+)s?/i);
  if (tMatch) startSeconds = parseInt(tMatch[1], 10);
  return {
    videoId,
    embedUrl: `https://www.youtube.com/embed/${videoId}?rel=0${startSeconds ? `&start=${startSeconds}` : ''}`,
    startSeconds,
    isRestricted: RESTRICTED_EMBED_IDS.has(videoId)
  };
}

export function MarkdownLinkRenderer({ href, children, ...props }) {
  const ytInfo = getYouTubeEmbedInfo(href);
  const childText = React.Children.toArray(children)
    .map(c => (typeof c === 'string' ? c : (c?.props?.children || '')))
    .join('');

  // 1. Enlace a YouTube (Timestamps, reproductor local o embebido)
  if (ytInfo) {
    const isTimestamp = /^\s*\[?\d{1,2}:\d{2}(?::\d{2})?\]?/.test(childText) || 
                        /^\s*minuto\s+\d+/i.test(childText);

    if (isTimestamp) {
      return (
        <a 
          href={href} 
          target="_blank" 
          rel="noreferrer"
          className="lesson-yt-timestamp"
          title={`Reproducir en YouTube: ${childText}`}
          {...props}
        >
          <span>⏱️</span>
          <span>{children}</span>
          <span className="lesson-yt-timestamp-arrow">↗</span>
        </a>
      );
    }

    const titleDisplay = childText && !childText.startsWith('http') 
      ? childText 
      : 'Vídeo Tutorial UPM / Accenture';

    if (ytInfo.isRestricted) {
      return (
        <LessonVideoPlayer 
          src={LOCAL_VIDEO_MAP[ytInfo.videoId]} 
          title={titleDisplay} 
          ytHref={href} 
          videoId={ytInfo.videoId} 
        />
      );
    }

    return (
      <LessonYouTubeEmbed
        embedUrl={ytInfo.embedUrl}
        title={titleDisplay}
        href={href}
      />
    );
  }

  // 2. Archivos de Vídeo Directos (.mp4, .webm, etc.)
  const isVideoFile = href && typeof href === 'string' && (href.endsWith('.mp4') || href.endsWith('.webm') || href.endsWith('.m4v'));
  if (isVideoFile) {
    return <LessonVideoPlayer src={href} title={childText || 'Vídeo de la lección'} />;
  }

  // 3. Archivos de Audio (.mp3, .wav, etc.)
  const isAudioFile = href && typeof href === 'string' && (href.endsWith('.mp3') || href.endsWith('.wav') || href.endsWith('.m4a') || href.endsWith('.ogg'));
  if (isAudioFile) {
    let cleanAudioSrc = href;
    if (cleanAudioSrc.includes('/public/')) {
      cleanAudioSrc = cleanAudioSrc.split('/public')[1];
    }
    return (
      <div className="lesson-audio-card">
        <div className="lesson-audio-title">
          <span className="lesson-audio-icon">🎙️</span>
          <span>{childText || 'Audio Explicativo · Arquitectura de 3 Capas'}</span>
        </div>
        <audio controls src={cleanAudioSrc} preload="metadata" className="lesson-audio-player" />
      </div>
    );
  }

  // 4. Presentaciones Interactivas Gamma
  const isGammaEmbed = href && typeof href === 'string' && href.includes('gamma.app');
  if (isGammaEmbed) {
    let embedSrc = href;
    if (!embedSrc.includes('/embed/')) {
      embedSrc = embedSrc.replace('gamma.app/docs/', 'gamma.app/embed/').replace('gamma.app/p/', 'gamma.app/embed/');
    }
    return (
      <PresentationCard 
        embedUrl={embedSrc}
        title={childText || 'Presentación Interactiva Gamma'}
        badge="Presentación Gamma"
        themeColor="var(--subject-color, #ec4899)"
        height="480px"
      />
    );
  }

  // 5. Enlaces internos de la SPA
  if (href && href.startsWith('/') && !href.startsWith('//')) {
    return (
      <Link to={href} {...props}>
        {children}
      </Link>
    );
  }

  // 6. Enlace HTML Convencional (externo o ancla)
  return (
    <a href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel={href?.startsWith('http') ? 'noreferrer' : undefined} {...props}>
      {children}
    </a>
  );
}
