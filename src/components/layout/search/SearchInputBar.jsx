import React from 'react';

/**
 * Barra de entrada visible en la cabecera con icono, input, borrado y badge de atajo.
 */
export default function SearchInputBar({
  inputRef,
  query,
  isOpen,
  isMac,
  onQueryChange,
  onClearQuery,
  onFocus,
  onKeyDown,
  onEnsureIndexLoaded,
  searchIcon
}) {
  return (
    <div 
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'var(--bg-card)',
        border: isOpen ? '1px solid var(--accent-purple, #8b5cf6)' : '1px solid var(--border-subtle)',
        boxShadow: isOpen ? '0 0 0 3px rgba(139, 92, 246, 0.18)' : '0 1px 3px rgba(0,0,0,0.04)',
        borderRadius: '9999px',
        padding: '0.4rem 0.8rem',
        height: '38px',
        boxSizing: 'border-box',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'text'
      }}
      onMouseEnter={onEnsureIndexLoaded}
      onClick={() => {
        onEnsureIndexLoaded();
        inputRef.current?.focus();
        onFocus();
      }}
    >
      <img 
        src={searchIcon} 
        alt="" 
        aria-hidden="true" 
        style={{ width: '16px', height: '16px', objectFit: 'contain', opacity: 0.75, flexShrink: 0 }} 
      />
      
      <input 
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => {
          onEnsureIndexLoaded();
          onQueryChange(e.target.value);
        }}
        onFocus={() => {
          onEnsureIndexLoaded();
          onFocus();
        }}
        onKeyDown={onKeyDown}
        placeholder="Buscar lecciones, conceptos, EACs..."
        aria-label="Buscar en todo el Campus"
        style={{
          flex: 1,
          background: 'transparent',
          border: 'none',
          outline: 'none',
          color: 'var(--text-main)',
          fontSize: '0.86rem',
          fontWeight: 500,
          padding: 0,
          minWidth: 0
        }}
      />

      {query ? (
        <button 
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClearQuery();
            inputRef.current?.focus();
          }}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-dim)',
            fontSize: '0.85rem',
            cursor: 'pointer',
            padding: '0 0.2rem',
            display: 'flex',
            alignItems: 'center',
            lineHeight: 1
          }}
          title="Borrar texto"
        >
          ✕
        </button>
      ) : (
        <kbd 
          style={{
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '6px',
            padding: '0.15rem 0.4rem',
            fontSize: '0.68rem',
            fontWeight: 700,
            color: 'var(--text-muted)',
            fontFamily: 'inherit',
            letterSpacing: '0.5px',
            userSelect: 'none',
            whiteSpace: 'nowrap'
          }}
          title={`Atajo de teclado: ${isMac ? 'Comando + K' : 'Control + K'}`}
        >
          {isMac ? '⌘K' : 'Ctrl K'}
        </kbd>
      )}
    </div>
  );
}
