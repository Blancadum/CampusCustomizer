import React from 'react';

/**
 * Normaliza y resuelve las rutas de imágenes relativas o migra PNG a SVG
 */
function normalizeImageSrc(src) {
  let cleanSrc = src || '';
  if (cleanSrc.startsWith('../../img/')) {
    cleanSrc = cleanSrc.replace('../../img/', '/fuentes/springboot/img/');
  } else if (cleanSrc.startsWith('../img/')) {
    cleanSrc = cleanSrc.replace('../img/', '/fuentes/springboot/img/');
  } else if (cleanSrc.startsWith('/img/spring-ai/')) {
    cleanSrc = cleanSrc.replace('/img/spring-ai/', '/fuentes/ia/img/spring-ai/');
  } else if (cleanSrc.startsWith('/img/')) {
    cleanSrc = cleanSrc.replace('/img/', '/fuentes/springboot/img/');
  } else if (cleanSrc.startsWith('img/')) {
    cleanSrc = '/fuentes/springboot/' + cleanSrc;
  }

  if (cleanSrc.includes('/modulo0/maven_lombok_herramientas.png')) {
    cleanSrc = '/fuentes/springboot/img/modulo0/maven_lombok_herramientas.svg';
  } else if (cleanSrc.includes('/modulo0/arquitectura_capas_spring_jakarta.png')) {
    cleanSrc = '/fuentes/springboot/img/modulo0/arquitectura_capas_spring_jakarta.svg';
  } else if (cleanSrc.includes('/modulo0/evolucion_jakarta_ee.png')) {
    cleanSrc = '/fuentes/springboot/img/modulo0/evolucion_jakarta_ee.svg';
  }

  return cleanSrc;
}

export function MarkdownImageRenderer({ src, alt, onOpenLightbox, ...props }) {
  const cleanSrc = normalizeImageSrc(src);
  const isSvg = cleanSrc.endsWith('.svg');

  return (
    <figure className="lesson-figure">
      <div 
        className="lesson-img-container"
        onClick={() => {
          if (onOpenLightbox) {
            onOpenLightbox({ src: cleanSrc, alt: alt || 'Diagrama técnico' });
          }
        }}
        title="Haz clic para ampliar en pantalla completa y leer cómodamente"
      >
        <img 
          className="lesson-image"
          src={cleanSrc} 
          alt={alt || 'Diagrama técnico'} 
          loading="lazy"
          onError={(e) => {
            e.target.style.display = 'none';
            const parent = e.target.parentElement;
            if (parent && !parent.querySelector('.img-pending-badge')) {
              const badge = document.createElement('div');
              badge.className = 'img-pending-badge';
              badge.style.cssText = 'padding: 0.8rem 1rem; border-radius: 8px; border: 1px dashed var(--border-subtle); background: var(--bg-card); font-size: 0.82rem; color: var(--text-muted); display: inline-flex; align-items: center; gap: 0.5rem;';
              badge.innerHTML = `<span>🖼️</span> <span>[Diagrama técnico: ${alt || 'Esquema pendiente de imagen'}]</span>`;
              parent.appendChild(badge);
            }
          }}
          {...props} 
        />
        <div className="lesson-img-footer">
          <span className="lesson-img-hint">
            <span className="lesson-img-icon">🔍</span>
            <span>Haz clic en la imagen para ampliar a pantalla completa</span>
          </span>
          <span className={`lesson-img-badge ${isSvg ? 'lesson-img-badge--svg' : 'lesson-img-badge--default'}`}>
            {isSvg ? 'Vector SVG HD' : 'Ampliar HD'}
          </span>
        </div>
      </div>
      {alt && (
        <figcaption className="lesson-figcaption">
          {alt}
        </figcaption>
      )}
    </figure>
  );
}
