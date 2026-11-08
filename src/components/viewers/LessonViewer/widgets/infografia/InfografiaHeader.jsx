import React from 'react';

/**
 * InfografiaHeader
 * Barra superior de la infografía: icono, badge, título, descripción, enlace a PDF y botón de ampliar.
 */
export default function InfografiaHeader({
  infografia,
  themeColor,
  onOpenFullscreen
}) {
  return (
    <div style={{
      padding: '1.2rem 1.6rem',
      background: 'var(--bg-subtle, #f8fafc)',
      borderBottom: '2px solid var(--border-subtle, #e2e8f0)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '0.8rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
        <span style={{ fontSize: '1.4rem' }}>📊</span>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{
              background: themeColor,
              color: '#ffffff',
              padding: '0.15rem 0.55rem',
              borderRadius: '5px',
              fontSize: '0.74rem',
              fontWeight: 900,
              letterSpacing: '0.5px'
            }}>
              INFOGRAFÍA
            </span>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-title, #0f172a)' }}>
              {infografia.title || 'Arquitectura Web en Localhost'}
            </h3>
          </div>
          {infografia.description && (
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.88rem', color: 'var(--text-muted, #64748b)', fontWeight: 500 }}>
              {infografia.description}
            </p>
          )}
        </div>
      </div>

      {/* Acciones: Descargar PDF y Pantalla Completa */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        {infografia.pdfUrl && (
          <a
            href={infografia.pdfUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.9rem',
              borderRadius: '8px',
              background: 'var(--bg-card, #ffffff)',
              border: '1.5px solid var(--border-subtle, #cbd5e1)',
              color: 'var(--text-main, #334155)',
              fontSize: '0.84rem',
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <span>📥</span>
            <span>Descargar PDF</span>
          </a>
        )}

        <button
          type="button"
          onClick={onOpenFullscreen}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.45rem 0.9rem',
            borderRadius: '8px',
            background: themeColor,
            border: 'none',
            color: '#ffffff',
            fontSize: '0.84rem',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}
        >
          <span>🔍</span>
          <span>Ampliar</span>
        </button>
      </div>
    </div>
  );
}
