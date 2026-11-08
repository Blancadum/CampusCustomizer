import React, { useState, useRef, useEffect, useCallback } from 'react';
import LocalVideoScreen from './videoplayer/LocalVideoScreen';
import RestrictedVideoFallback from './videoplayer/RestrictedVideoFallback';

export const LOCAL_VIDEO_MAP = {
  'jzPhDD-aeF8': '/fuentes/springboot/video2_protocolo_http.mp4',
  '33Kj44N_3fU': '/fuentes/springboot/Inyección de dependencias (DI)_JAVA_vs_springboot.mp4',
  '1F_8kI8n704': '/fuentes/springboot/cursos_desde_cero/02_intellij_spring_boot/01_ioc_di_clase_model_Repository.mp4',
  'L5y1z34Z0z4': '/fuentes/springboot/cursos_desde_cero/02_intellij_spring_boot/06_Component_autowired_annotation.mp4',
  'm7N3o7XpZpE': '/fuentes/springboot/cursos_desde_cero/02_intellij_spring_boot/02_Principios_inmutabilidad.mp4',
  'vDp5n3qGNuQ': '/fuentes/springboot/cursos_desde_cero/01_VScode_spring_boot/01_introduccion_spring.mp4'
};

/**
 * ============================================================================
 * @component   LessonVideoPlayer
 * @description Reproductor responsivo que prioriza archivos MP4 locales en HD
 *              con soporte para PiP, selector de velocidad y toggle 80%/100%.
 *              Si el vídeo es externo restringido, ofrece fallback con enlace.
 * ============================================================================
 */
export default function LessonVideoPlayer({ src, title, ytHref, videoId }) {
  const [hasError, setHasError] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isPiPActive, setIsPiPActive] = useState(false);
  const [supportsPiP, setSupportsPiP] = useState(false);
  const [isFullWidth, setIsFullWidth] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (typeof document !== 'undefined' && 'pictureInPictureEnabled' in document) {
      setSupportsPiP(document.pictureInPictureEnabled);
    }
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const onEnter = () => setIsPiPActive(true);
    const onLeave = () => setIsPiPActive(false);
    el.addEventListener('enterpictureinpicture', onEnter);
    el.addEventListener('leavepictureinpicture', onLeave);
    return () => {
      el.removeEventListener('enterpictureinpicture', onEnter);
      el.removeEventListener('leavepictureinpicture', onLeave);
    };
  }, []);

  const handleSpeedChange = useCallback((rate) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  }, []);

  const handleTogglePiP = useCallback(async () => {
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
        setIsPiPActive(false);
      } else if (videoRef.current) {
        await videoRef.current.requestPictureInPicture();
        setIsPiPActive(true);
      }
    } catch (err) {
      console.warn('PiP error:', err);
    }
  }, []);

  // 1. Si tiene archivo local configurado y no ha fallado la carga:
  if (src && !hasError) {
    return (
      <LocalVideoScreen
        src={src}
        title={title}
        ytHref={ytHref}
        isFullWidth={isFullWidth}
        onToggleFullWidth={() => setIsFullWidth(!isFullWidth)}
        playbackRate={playbackRate}
        onSpeedChange={handleSpeedChange}
        supportsPiP={supportsPiP}
        isPiPActive={isPiPActive}
        onTogglePiP={handleTogglePiP}
        videoRef={videoRef}
        onError={() => setHasError(true)}
      />
    );
  }

  // 2. Fallback si no hay local o aún no se ha colocado el archivo MP4:
  return (
    <RestrictedVideoFallback
      src={src}
      title={title}
      ytHref={ytHref}
      videoId={videoId}
      isFullWidth={isFullWidth}
      onToggleFullWidth={() => setIsFullWidth(!isFullWidth)}
    />
  );
}
