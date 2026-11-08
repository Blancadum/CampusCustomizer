import React from 'react';
import { Link } from 'react-router-dom';

export default function BreadcrumbNav({ title, items, externalLink }) {
  const breadcrumbItems = items || [
    { label: 'Campus', to: '/' },
    { label: title || 'Apuntes', isCurrent: true }
  ];

  return (
    <nav 
      aria-label="Ruta de navegación"
      style={{ 
        position: 'sticky',
        top: '76px', // Altura aproximada del header principal
        zIndex: 90,
        width: '100%', 
        height: '50px', 
        background: 'var(--bg-input)', 
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '0 1.5rem',
        fontSize: '0.9rem',
        color: 'var(--text-muted)',
        gap: '0.5rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {breadcrumbItems.map((item, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && <span>/</span>}
            {item.to && !item.isCurrent ? (
              <Link to={item.to} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
                {item.label}
              </Link>
            ) : (
              <strong style={{ color: 'var(--text-main)' }}>{item.label}</strong>
            )}
          </React.Fragment>
        ))}
      </div>

      {externalLink && (
        <a
          href={externalLink.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 0.75rem',
            borderRadius: '6px',
            background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.15), rgba(249, 115, 22, 0.2))',
            border: '1px solid rgba(234, 88, 12, 0.35)',
            color: '#ea580c',
            textDecoration: 'none',
            fontSize: '0.8rem',
            fontWeight: 700,
            whiteSpace: 'nowrap',
            transition: 'all 0.2s ease',
            flexShrink: 0
          }}
          title={externalLink.title || externalLink.label}
        >
          <span>{externalLink.label}</span> <span>↗</span>
        </a>
      )}
    </nav>
  );
}
