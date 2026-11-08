import React from 'react';

/**
 * IfcdAdminHeader
 * Cabecera del panel administrativo IFCD0177: botón flotante, título SEPE y acceso directo al campus virtual.
 */
export default function IfcdAdminHeader({
  isOpen,
  onToggle,
  topOffset = '24px',
  campusVirtualUrl
}) {
  return (
    <>
      {/* Botón Pestaña Externa Flotante */}
      <button
        type="button"
        onClick={onToggle}
        title={isOpen ? 'Cerrar información administrativa' : 'Abrir Guía Didáctica y Gestión Oficial'}
        aria-label={isOpen ? 'Cerrar información administrativa' : 'Abrir Guía Didáctica y Gestión Oficial'}
        className="ifcd-admin-tab-btn"
        style={{ top: topOffset }}
      >
        🏛️
      </button>

      {/* Cabecera del Panel */}
      <div className="ifcd-admin-header">
        <div className="ifcd-admin-header-left">
          <span style={{ fontSize: '1.4rem' }}>🏛️</span>
          <div>
            <h3 className="ifcd-admin-title">
              Gestión & Guía Didáctica
            </h3>
            <span className="ifcd-admin-subtitle">
              SEPE · IFCD0177 (100h)
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onToggle}
          className="ifcd-admin-close-btn"
          title="Cerrar panel"
          aria-label="Cerrar panel"
        >
          ✕
        </button>
      </div>

      {/* Acceso Rápido al Aula Virtual Oficial */}
      {campusVirtualUrl && (
        <div className="ifcd-campus-banner">
          <div className="ifcd-campus-label">
            <span>🌐</span> <span>Campus Virtual:</span>
          </div>
          <a
            href={campusVirtualUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ifcd-campus-link"
          >
            <span>Acceder</span> <span>↗</span>
          </a>
        </div>
      )}
    </>
  );
}
