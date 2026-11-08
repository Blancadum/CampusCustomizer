import React from 'react';
import { Link } from 'react-router-dom';

/**
 * AccentureVideosFullViewBanner
 * Enlace directo en forma de tarjeta para ir a la sección completa de vídeos en el visor.
 */
export default function AccentureVideosFullViewBanner({ onToggle }) {
  return (
    <Link
      to="/accenture/videos"
      onClick={() => {
        if (window.innerWidth <= 768 && onToggle) onToggle();
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.65rem',
        padding: '0.65rem 0.8rem',
        borderRadius: '10px',
        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.16) 0%, rgba(2, 132, 199, 0.12) 100%)',
        border: '1px solid rgba(6, 182, 212, 0.35)',
        textDecoration: 'none',
        color: 'var(--text-title)',
        marginBottom: '0.75rem',
        transition: 'all 0.2s ease',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
      }}
      title="Abrir la sección completa de vídeos en el visor de lección"
    >
      <div style={{
        width: '32px',
        height: '32px',
        borderRadius: '8px',
        background: 'rgba(6, 182, 212, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.1rem'
      }}>
        📺
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#06b6d4' }}>
          Ver Visor de Vídeos Teóricos
        </span>
        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          Módulos 0, 1 y 2 con timestamps y código
        </span>
      </div>
      <span style={{ fontSize: '0.8rem', color: '#06b6d4', fontWeight: 'bold' }}>➔</span>
    </Link>
  );
}
