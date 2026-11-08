import React from 'react';

/**
 * Fila individual de resultado en el dropdown de búsqueda con resaltado y badge temático.
 */
export default function SearchResultItem({
  item,
  isHighlighted,
  onSelect,
  onMouseEnter,
  badgeStyle
}) {
  return (
    <li 
      className="header-search-result-row"
      onClick={() => onSelect(item)}
      onMouseEnter={onMouseEnter}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.75rem',
        padding: '0.65rem 1rem',
        cursor: 'pointer',
        background: isHighlighted ? 'rgba(139, 92, 246, 0.08)' : 'transparent',
        borderLeft: isHighlighted ? '3px solid var(--accent-purple, #8b5cf6)' : '3px solid transparent',
        transition: 'background 0.12s ease'
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.2rem' }}>
          <span 
            style={{
              fontSize: '0.9rem',
              fontWeight: 700,
              color: isHighlighted ? 'var(--accent-purple, #8b5cf6)' : 'var(--text-title)',
              lineHeight: 1.3
            }}
          >
            {item.title}
          </span>
          <span 
            style={{
              fontSize: '0.68rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              padding: '0.12rem 0.45rem',
              borderRadius: '6px',
              background: badgeStyle.bg,
              color: badgeStyle.color,
              border: `1px solid ${badgeStyle.border}`,
              letterSpacing: '0.4px'
            }}
          >
            {item.type}
          </span>
        </div>

        {item.definition && (
          <p 
            style={{
              margin: 0,
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              lineHeight: 1.35,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {item.definition}
          </p>
        )}
      </div>

      <span 
        style={{
          fontSize: '0.9rem',
          color: isHighlighted ? 'var(--accent-purple)' : 'var(--text-dim)',
          transform: isHighlighted ? 'translateX(3px)' : 'none',
          transition: 'transform 0.15s ease',
          flexShrink: 0
        }}
      >
        →
      </span>
    </li>
  );
}
