import React from 'react';

/**
 * IfcdFichaTab
 * Ficha técnica oficial del certificado (código SEPE, horas, centro, sede y acceso).
 */
export default function IfcdFichaTab({ curso }) {
  if (!curso) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      <div style={{
        padding: '0.85rem',
        borderRadius: '10px',
        background: 'var(--bg-subtle)',
        border: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.55rem',
        fontSize: '0.78rem'
      }}>
        <div><strong>📜 Código SEPE:</strong> {curso.codigo} ({curso.numeroExpediente})</div>
        <div><strong>🏫 Centro:</strong> {curso.centro} (CIF: {curso.cif})</div>
        <div><strong>📍 Sede:</strong> {curso.sedePrincipal}</div>
        <div><strong>⏱️ Duración:</strong> {curso.duracionHoras} horas</div>
        <div><strong>🗓️ Periodo:</strong> {curso.fechaInicio} al {curso.fechaFin}</div>
        <div><strong>🎓 Modalidad:</strong> {curso.modalidad}</div>
      </div>

      <a
        href={curso.campusVirtualUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          padding: '0.75rem',
          borderRadius: '8px',
          background: 'linear-gradient(135deg, #ea580c, #f97316)',
          color: '#fff',
          textDecoration: 'none',
          fontWeight: 700,
          fontSize: '0.82rem'
        }}
      >
        <span>Acceder al Campus de Enclave</span> ➔
      </a>
    </div>
  );
}
