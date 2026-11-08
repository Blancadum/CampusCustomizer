import React from 'react';

/**
 * IfcdDocumentosTab
 * Descargas de documentación oficial (PDF Guía Didáctica, Glosario, etc.).
 */
export default function IfcdDocumentosTab({ documentos = [] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
        Documentación oficial del curso guardada en <code>/documents/ifcd0177-java/</code>:
      </div>

      {documentos.map((doc, idx) => (
        <a
          key={idx}
          href={doc.archivo}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.85rem',
            borderRadius: '10px',
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border-subtle)',
            textDecoration: 'none',
            color: 'var(--text-title)',
            transition: 'all 0.2s'
          }}
        >
          <span style={{ fontSize: '1.5rem' }}>{doc.icono}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 700 }}>{doc.nombre}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Tamaño: {doc.tamano}</div>
          </div>
          <span style={{ fontSize: '0.8rem', color: '#ea580c', fontWeight: 800 }}>⬇️</span>
        </a>
      ))}
    </div>
  );
}
