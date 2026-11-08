import React from 'react';
import { CATEGORY_FILTERS } from './searchBadgeStyles';
import SearchResultItem from './SearchResultItem';

/**
 * Popover desplegable flotante con filtros por categoría, lista de resultados,
 * estado vacío y pie de atajos rápidos.
 */
export default function SearchDropdown({
  isOpen,
  query,
  activeCategory,
  onSelectCategory,
  resultsListRef,
  filteredResults,
  selectedIndex,
  onSelectIndex,
  onSelectItem,
  getBadgeStyle
}) {
  if (!isOpen || query.trim().length === 0) return null;

  return (
    <div 
      style={{
        position: 'absolute',
        top: 'calc(100% + 8px)',
        left: 0,
        right: 0,
        minWidth: '380px',
        maxWidth: '600px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '14px',
        boxShadow: '0 14px 40px rgba(0, 0, 0, 0.22), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        zIndex: 9999,
        overflow: 'hidden',
        animation: 'fadeInDown 0.15s ease-out'
      }}
    >
      {/* Barra de Filtro de Categorías */}
      <div 
        style={{
          display: 'flex',
          gap: '0.35rem',
          padding: '0.6rem 0.8rem',
          borderBottom: '1px solid var(--border-subtle)',
          background: 'var(--bg-primary)',
          overflowX: 'auto',
          scrollbarWidth: 'none'
        }}
      >
        {CATEGORY_FILTERS.map(cat => {
          const isSelected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              style={{
                background: isSelected ? 'var(--accent-purple, #8b5cf6)' : 'transparent',
                color: isSelected ? '#ffffff' : 'var(--text-muted)',
                border: isSelected ? '1px solid var(--accent-purple)' : '1px solid var(--border-subtle)',
                borderRadius: '20px',
                padding: '0.2rem 0.6rem',
                fontSize: '0.72rem',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Lista de Resultados */}
      <div 
        ref={resultsListRef}
        style={{
          maxHeight: '380px',
          overflowY: 'auto',
          padding: '0.4rem 0'
        }}
      >
        {filteredResults.length > 0 ? (
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {filteredResults.map((item, idx) => (
              <SearchResultItem
                key={item.id}
                item={item}
                idx={idx}
                isHighlighted={idx === selectedIndex}
                onSelect={onSelectItem}
                onMouseEnter={() => onSelectIndex(idx)}
                badgeStyle={getBadgeStyle(item.type)}
              />
            ))}
          </ul>
        ) : (
          <div 
            style={{
              padding: '2.5rem 1.5rem',
              textAlign: 'center',
              color: 'var(--text-muted)',
              fontSize: '0.88rem'
            }}
          >
            <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>🔍</div>
            <p style={{ margin: '0 0 0.3rem', fontWeight: 600 }}>No se encontraron resultados</p>
            <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-dim)' }}>
              Intenta buscar por conceptos ("UML", "Docker"), temas ("Tema 1", "EAC1") o materias.
            </p>
          </div>
        )}
      </div>

      {/* Pie de navegación rápida */}
      <div 
        style={{
          padding: '0.4rem 0.8rem',
          background: 'var(--bg-primary)',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.7rem',
          color: 'var(--text-dim)'
        }}
      >
        <span>{filteredResults.length} resultados encontrados</span>
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <span><kbd>↑</kbd><kbd>↓</kbd> Navegar</span>
          <span><kbd>↵</kbd> Abrir</span>
          <span><kbd>ESC</kbd> Cerrar</span>
        </div>
      </div>
    </div>
  );
}
