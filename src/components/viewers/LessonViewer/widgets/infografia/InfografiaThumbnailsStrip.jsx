import React from 'react';

/**
 * InfografiaThumbnailsStrip
 * Tira horizontal deslizante con las miniaturas de todas las láminas.
 */
export default function InfografiaThumbnailsStrip({
  total,
  currentSlide,
  getSlideUrl,
  onSelectSlide,
  themeColor
}) {
  return (
    <div style={{
      padding: '0.8rem 1rem',
      background: 'var(--bg-subtle, #f8fafc)',
      borderTop: '1px solid var(--border-subtle, #e2e8f0)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.6rem',
      overflowX: 'auto',
      scrollbarWidth: 'thin'
    }}>
      {Array.from({ length: total }).map((_, idx) => (
        <button
          key={idx}
          type="button"
          onClick={() => onSelectSlide(idx)}
          style={{
            flexShrink: 0,
            width: '64px',
            height: '42px',
            borderRadius: '6px',
            border: idx === currentSlide ? `2px solid ${themeColor}` : '2px solid transparent',
            opacity: idx === currentSlide ? 1 : 0.65,
            padding: 0,
            overflow: 'hidden',
            cursor: 'pointer',
            background: '#090d16',
            transition: 'all 0.15s ease'
          }}
        >
          <img 
            src={getSlideUrl(idx)} 
            alt={`Miniatura ${idx + 1}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </button>
      ))}
    </div>
  );
}
