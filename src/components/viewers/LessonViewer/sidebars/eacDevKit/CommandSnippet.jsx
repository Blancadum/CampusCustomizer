import React, { useState } from 'react';

/**
 * Componente: CommandSnippet
 * Responsabilidad única (SRP): Renderizar un bloque de comando de terminal con botón de copia
 * y contraste garantizado (fondo oscuro sólido #090d16).
 */
export default function CommandSnippet({ label, cmd, desc }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      background: 'var(--bg-input)',
      border: '1px solid var(--border-subtle)',
      borderRadius: '10px',
      padding: '0.9rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.55rem'
    }}>
      {/* Título del comando */}
      <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-title)' }}>
        {label}
      </div>
      
      {/* Caja de terminal con contraste alto independiente del tema del sistema */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#090d16',
        border: '1px solid #1e293b',
        borderRadius: '8px',
        padding: '0.55rem 0.75rem',
        gap: '0.65rem',
        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)'
      }}>
        <code style={{
          fontSize: '0.88rem',
          color: '#38bdf8',
          fontWeight: 600,
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          scrollbarWidth: 'none',
          lineHeight: '1.4'
        }}>
          {cmd}
        </code>

        <button
          type="button"
          onClick={handleCopy}
          style={{
            background: copied ? '#16a34a' : '#1e293b',
            color: copied ? '#ffffff' : '#f1f5f9',
            border: copied ? '1px solid #22c55e' : '1px solid #334155',
            borderRadius: '6px',
            padding: '0.35rem 0.65rem',
            fontSize: '0.78rem',
            cursor: 'pointer',
            flexShrink: 0,
            fontWeight: 700,
            boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
            transition: 'all 0.15s ease'
          }}
          title="Copiar comando al portapapeles"
        >
          {copied ? '✓ Copiado' : 'Copiar'}
        </button>
      </div>

      {/* Descripción técnica */}
      {desc && (
        <div style={{ fontSize: '0.82rem', color: 'var(--text-main)', lineHeight: '1.4', fontWeight: 500 }}>
          {desc}
        </div>
      )}
    </div>
  );
}
