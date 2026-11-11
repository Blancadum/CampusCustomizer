import React, { useState } from 'react';

/**
 * Componente reutilizable para embeber presentaciones interactivas (Gamma, Slides, etc.)
 * 
 * Props:
 * - presentation: { title, embedUrl, badge, description }
 * - embedUrl: string (opcional si se pasa presentation)
 * - title: string (opcional si se pasa presentation)
 * - badge: string (opcional)
 * - themeColor: string (color de acento)
 * - height: number | string (altura por defecto, ej: '480px')
 */
export default function PresentationCard({
  presentation,
  embedUrl,
  title,
  badge,
  themeColor = 'var(--subject-color, #ec4899)',
  height = '480px'
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const activePresentation = presentation || {
    embedUrl,
    title: title || 'Presentación Ejecutiva Interactiva',
    badge: badge || 'Presentación Gamma'
  };

  const finalEmbedUrl = activePresentation.embedUrl || embedUrl;
  const finalTitle = activePresentation.title || title || 'Presentación Ejecutiva Interactiva';
  const finalBadge = activePresentation.badge || badge || 'Presentación Gamma';
  const finalDescription = activePresentation.description || null;

  if (!finalEmbedUrl) return null;

  // Enlace directo para abrir fuera del iframe
  const externalUrl = finalEmbedUrl.includes('/embed/') 
    ? finalEmbedUrl.replace('/embed/', '/docs/') 
    : finalEmbedUrl;

  return (
    <section 
      className="presentation-card-container"
      style={{
        background: 'var(--bg-hover, rgba(255, 255, 255, 0.03))',
        border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.1))',
        borderRadius: '16px',
        padding: '1.25rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        boxShadow: '0 6px 22px rgba(0, 0, 0, 0.12)',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      {/* Barra superior de título y controles */}
      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.5rem' }}>📊</span>
          <div>
            <h4 style={{ margin: 0, fontSize: '1.08rem', color: 'var(--text-title, #f8fafc)', fontWeight: 800 }}>
              {finalTitle}
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.15rem' }}>
              <span 
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: themeColor,
                  background: 'rgba(236, 72, 153, 0.12)',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '4px'
                }}
              >
                {finalBadge}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted, #94a3b8)' }}>
                • Diapositivas Interactivas
              </span>
            </div>
          </div>
        </div>

        {/* Acciones del encabezado */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Botón para alternar altura expandida */}
          <button
            type="button"
            onClick={() => setIsExpanded(prev => !prev)}
            title={isExpanded ? "Reducir tamaño" : "Ampliar visor en página"}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.45rem 0.75rem',
              borderRadius: '8px',
              background: 'transparent',
              color: 'var(--text-main, #cbd5e1)',
              border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.15))',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <span>{isExpanded ? '⤢ Reducir' : '⤢ Expandir'}</span>
          </button>

          {/* Enlace externo */}
          <a
            href={externalUrl}
            target="_blank"
            rel="noreferrer"
            className="accent-fill"
            style={{
              '--accent': themeColor,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.95rem',
              borderRadius: '8px',
              background: themeColor,
              color: '#ffffff',
              fontSize: '0.82rem',
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
              transition: 'transform 0.15s ease'
            }}
          >
            <span>Abrir en Gamma</span> <span>↗</span>
          </a>
        </div>
      </div>

      {finalDescription && (
        <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted, #94a3b8)', lineHeight: 1.5 }}>
          {finalDescription}
        </p>
      )}

      {/* Contenedor del Iframe responsive */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '100%',
          height: isExpanded ? '720px' : height,
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.15))',
          background: '#0b0f19',
          boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)',
          transition: 'height 0.3s ease-in-out'
        }}
      >
        <iframe
          src={finalEmbedUrl}
          style={{ width: '100%', height: '100%', border: 0 }}
          allow="fullscreen"
          title={finalTitle}
          loading="lazy"
        />
      </div>
    </section>
  );
}
