import React from 'react';
import LocalVideoToolbar from './LocalVideoToolbar';
import './LessonVideoPlayer.css';

/**
 * LocalVideoScreen
 * Reproductor de vídeo local HD optimizado con layout responsivo y controles desacoplados.
 */
export default function LocalVideoScreen({
  src,
  title,
  ytHref,
  isFullWidth,
  onToggleFullWidth,
  playbackRate,
  onSpeedChange,
  supportsPiP,
  isPiPActive,
  onTogglePiP,
  videoRef,
  onError
}) {
  return (
    <div className={`lesson-video-card-container is-local ${isFullWidth ? 'w-100' : 'w-80'}`}>
      <LocalVideoToolbar
        title={title}
        ytHref={ytHref}
        isFullWidth={isFullWidth}
        onToggleFullWidth={onToggleFullWidth}
        playbackRate={playbackRate}
        onSpeedChange={onSpeedChange}
        supportsPiP={supportsPiP}
        isPiPActive={isPiPActive}
        onTogglePiP={onTogglePiP}
      />

      <div className="video-media-stage">
        <video 
          ref={videoRef}
          src={src} 
          controls 
          preload="metadata"
          onError={onError}
          className={`video-media-element ${isFullWidth ? 'h-full' : 'h-contained'}`}
        />
      </div>
    </div>
  );
}
