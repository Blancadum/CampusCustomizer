import React, { useState, useRef, useEffect, useMemo } from 'react';
import PodcastPostItNotes from './PodcastPostItNotes';
import PodcastPlayerControls from './PodcastPlayerControls';
import PodcastMediaScreen from './PodcastMediaScreen';

/**
 * Reproductor Multimedia versátil para Podcasts (Audio) y Vídeo-Lecciones.
 * Detecta automáticamente si el archivo es vídeo (.mp4, .webm, .mov) o audio (.mp3, .m4a, .wav).
 * Soporta selector de pestaña si el tema incluye tanto vídeo como podcast.
 */
export default function PodcastPlayerCard({ 
  audioUrl = '',
  podcastUrl = '',
  videoUrl = '',
  mediaList = [],
  title = '',
  podcastTitle = '',
  videoTitle = '',
  duration = '',
  notes = null,
  promptText = '',
  themeColor = 'var(--accent-blue, #2563eb)'
}) {
  const isVideoFormat = (url) => /\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(url || '');

  const effAudioUrl = audioUrl || podcastUrl;
  const effTitle = title || podcastTitle || videoTitle;
  const effPrompt = promptText || notes;
  const iconBg = (themeColor && themeColor.startsWith('#')) ? `${themeColor}20` : 'rgba(37, 99, 235, 0.15)';

  // Generar lista de medios unificada
  const items = useMemo(() => {
    if (mediaList && mediaList.length > 0) return mediaList;
    const list = [];
    if (videoUrl) {
      list.push({
        type: 'video',
        url: videoUrl,
        title: videoTitle || effTitle || 'Vídeo Lección'
      });
    }
    if (effAudioUrl) {
      const isVid = isVideoFormat(effAudioUrl);
      list.push({
        type: isVid ? 'video' : 'audio',
        url: effAudioUrl,
        title: podcastTitle || effTitle || (isVid ? 'Vídeo Lección' : 'Podcast de Audio')
      });
    }
    return list;
  }, [mediaList, videoUrl, effAudioUrl, effTitle, videoTitle, podcastTitle]);

  const [activeIndex, setActiveIndex] = useState(() => {
    if (typeof window !== 'undefined') {
      const v = new URLSearchParams(window.location.search).get('video');
      const parsed = parseInt(v, 10);
      if (!isNaN(parsed) && parsed >= 0) return parsed;
    }
    return 0;
  });
  const [isVideoFullWidth, setIsVideoFullWidth] = useState(false);
  const activeMedia = items[activeIndex] || items[0] || null;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const v = new URLSearchParams(window.location.search).get('video');
      const parsed = parseInt(v, 10);
      if (!isNaN(parsed) && parsed >= 0 && parsed < items.length) {
        setActiveIndex(parsed);
      }
    }
  }, [items.length]);

  const [playbackRate, setPlaybackRate] = useState(1);
  const [hasError, setHasError] = useState(false);
  const [isPiPActive, setIsPiPActive] = useState(false);
  const [supportsPiP, setSupportsPiP] = useState(false);
  const mediaRef = useRef(null);

  useEffect(() => {
    if (typeof document !== 'undefined' && 'pictureInPictureEnabled' in document) {
      setSupportsPiP(document.pictureInPictureEnabled);
    }
  }, []);

  useEffect(() => {
    setHasError(false);
    if (mediaRef.current) {
      mediaRef.current.playbackRate = playbackRate;
    }
  }, [activeIndex, activeMedia, playbackRate]);

  useEffect(() => {
    const el = mediaRef.current;
    if (!el) return;
    const onEnter = () => setIsPiPActive(true);
    const onLeave = () => setIsPiPActive(false);
    el.addEventListener('enterpictureinpicture', onEnter);
    el.addEventListener('leavepictureinpicture', onLeave);
    return () => {
      el.removeEventListener('enterpictureinpicture', onEnter);
      el.removeEventListener('leavepictureinpicture', onLeave);
    };
  }, [activeMedia]);

  const handleSpeedChange = (rate) => {
    setPlaybackRate(rate);
    if (mediaRef.current) {
      mediaRef.current.playbackRate = rate;
    }
  };

  const handleTogglePiP = async () => {
    const el = mediaRef.current;
    if (!el) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else if (document.pictureInPictureEnabled && el.requestPictureInPicture) {
        await el.requestPictureInPicture();
      }
    } catch (err) {
      console.warn('PiP error:', err);
    }
  };

  if (!activeMedia && !effPrompt) return null;

  const isCurrentVideo = activeMedia && (activeMedia.type === 'video' || (activeMedia.type !== 'audio' && isVideoFormat(activeMedia.url)));

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem',
      margin: '1.8rem 0 2.2rem 0'
    }}>
      {/* 1. Tarjeta Reproductora de Podcast / Vídeo */}
      {activeMedia && (
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          padding: '1.25rem 1.5rem',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decoración lateral de color */}
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '5px',
            background: themeColor
          }} />

          {/* Cabecera con selector de medios, velocidad y PiP */}
          <PodcastPlayerControls
            activeMedia={activeMedia}
            items={items}
            activeIndex={activeIndex}
            onSelectIndex={setActiveIndex}
            isCurrentVideo={isCurrentVideo}
            themeColor={themeColor}
            iconBg={iconBg}
            playbackRate={playbackRate}
            onSpeedChange={handleSpeedChange}
            supportsPiP={supportsPiP}
            isPiPActive={isPiPActive}
            onTogglePiP={handleTogglePiP}
            isVideoFullWidth={isVideoFullWidth}
            onToggleFullWidth={() => setIsVideoFullWidth(!isVideoFullWidth)}
            isVideoFormat={isVideoFormat}
          />

          {/* Reproductor de Vídeo o Audio con Pie de enlace */}
          <PodcastMediaScreen
            activeMedia={activeMedia}
            isCurrentVideo={isCurrentVideo}
            isVideoFullWidth={isVideoFullWidth}
            mediaRef={mediaRef}
            hasError={hasError}
            onError={() => setHasError(true)}
            onLoadedData={() => setHasError(false)}
            themeColor={themeColor}
          />
        </div>
      )}

      {/* 2. Hoja de Cuaderno de Notas (Post-it / Libreta en Amarillo Pastel) */}
      <PodcastPostItNotes promptText={effPrompt} />
    </div>
  );
}
