import React, { useState } from 'react';

/**
 * ============================================================================
 * @component AsideCodeSnippet
 * @description Snippet de terminal/código reutilizable con botón interactivo de copia.
 * ============================================================================
 */
export default function AsideCodeSnippet({
  command,
  label,
  accentColor = '#3b82f6'
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="right-drawer-code-box" style={{ '--drawer-accent': accentColor }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', minWidth: 0, flex: 1 }}>
        {label && (
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            {label}
          </span>
        )}
        <code className="right-drawer-code-text">
          <span style={{ color: 'var(--text-muted)', marginRight: '0.4rem', userSelect: 'none' }}>$</span>
          {command}
        </code>
      </div>

      <button
        type="button"
        className={`right-drawer-copy-btn ${copied ? 'is-copied' : ''}`}
        onClick={handleCopy}
        title="Copiar comando al portapapeles"
      >
        <span>{copied ? '✓' : '📋'}</span>
        <span>{copied ? 'Copiado' : 'Copiar'}</span>
      </button>
    </div>
  );
}
