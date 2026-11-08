import React from 'react';

/**
 * AccentureVideosSearchBox
 * Campo de búsqueda interactivo por conceptos y descripción del bloque.
 */
export default function AccentureVideosSearchBox({
  searchTerm,
  onSearchChange
}) {
  return (
    <div style={{ marginBottom: '0.75rem' }}>
      <input
        type="text"
        placeholder="Buscar por concepto (IoC, HTTP, JPA...)"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{
          width: '100%',
          padding: '0.45rem 0.65rem',
          borderRadius: '6px',
          border: '1px solid var(--border-subtle, rgba(255,255,255,0.1))',
          background: 'var(--bg-main, #0b1120)',
          color: 'var(--text-main, #f1f5f9)',
          fontSize: '0.78rem',
          outline: 'none',
          boxSizing: 'border-box'
        }}
      />
    </div>
  );
}
