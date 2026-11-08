import React, { useState, useEffect, useCallback } from 'react';
import InfografiaHeader from './infografia/InfografiaHeader';
import InfografiaSlideViewport from './infografia/InfografiaSlideViewport';
import InfografiaThumbnailsStrip from './infografia/InfografiaThumbnailsStrip';
import InfografiaLightboxModal from './infografia/InfografiaLightboxModal';

/**
 * ============================================================================
 * @component   InfografiaCarousel
 * @description Visor interactivo de infografías en láminas WebP para lecciones
 *              teóricas. Incluye navegación secuencial, miniaturas, modo
 *              pantalla completa (Lightbox) y descarga del PDF original.
 * ============================================================================
 */
export default function InfografiaCarousel({ 
  infografia, 
  themeColor = 'var(--accent-blue, #0284c7)' 
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const total = infografia?.totalSlides || 0;
  const prefix = infografia?.slidePrefix || 'Arquitectura_Web_en_Localhost_';
  const baseDir = infografia?.baseDir || '/fuentes/ioc/desp/infografia/Arquitectura_Web_en_Localhost_webp';

  const getSlideUrl = useCallback((index) => {
    const num = String(index + 1).padStart(5, '0');
    return `${baseDir}/${prefix}${num}.webp`;
  }, [baseDir, prefix]);

  const handlePrev = useCallback((e) => {
    if (e) e.stopPropagation();
    if (total <= 0) return;
    setCurrentSlide(prev => (prev > 0 ? prev - 1 : total - 1));
  }, [total]);

  const handleNext = useCallback((e) => {
    if (e) e.stopPropagation();
    if (total <= 0) return;
    setCurrentSlide(prev => (prev < total - 1 ? prev + 1 : 0));
  }, [total]);

  // Atajos de teclado para navegación cuando el modal o visor está abierto
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isFullscreen) {
        if (e.key === 'ArrowLeft') handlePrev();
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'Escape') setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, handlePrev, handleNext]);

  if (!infografia || !infografia.totalSlides) return null;

  const currentSlideUrl = getSlideUrl(currentSlide);

  return (
    <section 
      className="infografia-carousel"
      style={{
        margin: '2.5rem 0',
        background: 'var(--bg-card, #ffffff)',
        border: '2px solid var(--border-subtle, #cbd5e1)',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-md, 0 4px 18px rgba(0,0,0,0.06))'
      }}
    >
      {/* 1. Cabecera con título, descripción y botones de acción */}
      <InfografiaHeader
        infografia={infografia}
        themeColor={themeColor}
        onOpenFullscreen={() => setIsFullscreen(true)}
      />

      {/* 2. Visor Principal de la Lámina con flechas y contador flotante */}
      <InfografiaSlideViewport
        slideUrl={currentSlideUrl}
        currentSlide={currentSlide}
        total={total}
        onPrev={handlePrev}
        onNext={handleNext}
        onOpenFullscreen={() => setIsFullscreen(true)}
      />

      {/* 3. Tira Inferior de Miniaturas */}
      <InfografiaThumbnailsStrip
        total={total}
        currentSlide={currentSlide}
        getSlideUrl={getSlideUrl}
        onSelectSlide={setCurrentSlide}
        themeColor={themeColor}
      />

      {/* 4. Modal a Pantalla Completa (Lightbox) */}
      <InfografiaLightboxModal
        isOpen={isFullscreen}
        onClose={() => setIsFullscreen(false)}
        infografia={infografia}
        currentSlide={currentSlide}
        total={total}
        slideUrl={currentSlideUrl}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
}
