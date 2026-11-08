import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCachedSearchIndex, fetchSearchIndex } from '../../utils/searchIndexService';

function HighlightedText({ text, query }) {
  if (!text) return null;
  const trimmed = query ? query.trim() : '';
  if (trimmed.length < 2) return <>{text}</>;

  const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = String(text).split(regex);

  return (
    <>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <mark key={index} className="search-highlight">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

const CATEGORIES = [
  { id: 'all', label: 'Todas', emoji: '🌐' },
  { id: 'accenture', label: 'Accenture', emoji: '☕' },
  { id: 'ioc', label: 'IOC · DAW', emoji: '🎓' },
  { id: 'ai', label: 'IA & GenAI', emoji: '🤖' },
  { id: 'php', label: 'SEPE · PHP', emoji: '🐘' },
  { id: 'glossary', label: 'Glosario', emoji: '📖' },
];

const QUICK_SEARCH_TAGS = ['Vídeos', 'Spring Boot', 'Java', 'BBDD', 'Glosario', 'EAC', 'JWT'];

function matchCategory(item, catId) {
  if (catId === 'all') return true;
  const url = (item.url || '').toLowerCase();
  const type = (item.type || '').toLowerCase();
  const title = (item.title || '').toLowerCase();
  const keywords = Array.isArray(item.keywords) ? item.keywords.join(' ').toLowerCase() : '';

  if (catId === 'accenture') {
    return (
      url.includes('/accenture') ||
      url.includes('/springboot') ||
      url.includes('/petete') ||
      url.includes('/quiz') ||
      type.includes('accenture') ||
      type.includes('spring') ||
      keywords.includes('accenture') ||
      keywords.includes('springboot')
    );
  }
  if (catId === 'ioc') {
    return (
      url.includes('/ioc') ||
      url.includes('/m0') ||
      url.includes('/desp') ||
      url.includes('/ipo2') ||
      url.includes('/eacs') ||
      type.includes('ioc') ||
      type.includes('daw') ||
      keywords.includes('ioc')
    );
  }
  if (catId === 'ai') {
    return (
      url.includes('/ia') ||
      url.includes('/spring-ai') ||
      type.includes('ia') ||
      type.includes('ai') ||
      keywords.includes('genai') ||
      keywords.includes('mcp') ||
      keywords.includes('inteligencia artificial')
    );
  }
  if (catId === 'php') {
    return (
      url.includes('/php') ||
      url.includes('/sepe') ||
      url.includes('/cursos') ||
      type.includes('php') ||
      keywords.includes('php')
    );
  }
  if (catId === 'glossary') {
    return type.includes('glosario') || type.includes('concepto') || url.includes('/glosario');
  }
  return true;
}

export default function SearchModal({ isOpen, onClose }) {
  const [searchData, setSearchData] = useState(() => getCachedSearchIndex());
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [results, setResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const saved = localStorage.getItem('micampus_recent_searches');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const inputRef = useRef(null);
  const itemRefs = useRef([]);
  const navigate = useNavigate();

  // 1. Carga optimizada con caché centralizado
  useEffect(() => {
    if (searchData.length === 0) {
      fetchSearchIndex().then((data) => setSearchData(data));
    }
  }, [searchData.length]);

  // 2. Control de foco y reseteo al abrir el modal
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedCategory('all');
      setResults([]);
      setActiveIndex(-1);
      setTimeout(() => inputRef.current?.focus(), 80);

      const handleGlobalKeyDown = (e) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
        }
      };
      window.addEventListener('keydown', handleGlobalKeyDown);
      return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }
  }, [isOpen, onClose]);

  // 3. Filtrar searchData por categoría activa
  const categoryScopedData = useMemo(() => {
    if (selectedCategory === 'all') return searchData;
    return searchData.filter((item) => matchCategory(item, selectedCategory));
  }, [searchData, selectedCategory]);

  // 4. Debounce y filtrado por relevancia
  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setResults([]);
      setActiveIndex(-1);
      return;
    }

    const timer = setTimeout(() => {
      const lowerQuery = trimmed.toLowerCase();
      const escapedQuery = lowerQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escapedQuery, 'i');

      const scored = [];

      for (let i = 0; i < categoryScopedData.length; i++) {
        const item = categoryScopedData[i];
        let score = 0;
        const titleLower = item.title ? item.title.toLowerCase() : '';
        const defLower = item.definition ? item.definition.toLowerCase() : '';

        // Coincidencia exacta o inicio en título
        if (titleLower === lowerQuery) score += 100;
        else if (titleLower.startsWith(lowerQuery)) score += 60;
        else if (regex.test(titleLower)) score += 40;

        // Coincidencia en definición
        if (defLower && regex.test(defLower)) score += 20;

        // Coincidencia en keywords
        if (Array.isArray(item.keywords)) {
          if (item.keywords.some((k) => k.toLowerCase() === lowerQuery)) score += 35;
          else if (item.keywords.some((k) => regex.test(k))) score += 15;
        }

        // Coincidencia en tipo de recurso
        if (item.type && regex.test(item.type)) score += 10;

        if (score > 0) {
          scored.push({ item, score });
        }
      }

      scored.sort((a, b) => b.score - a.score);
      const rankedResults = scored.map((s) => s.item);

      setResults(rankedResults);
      setActiveIndex(rankedResults.length > 0 ? 0 : -1);
    }, 150);

    return () => clearTimeout(timer);
  }, [query, categoryScopedData]);

  // 5. Auto-scroll para mantener el elemento seleccionado siempre a la vista
  useEffect(() => {
    if (activeIndex >= 0 && itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex].scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [activeIndex]);

  if (!isOpen) return null;

  const handleResultClick = (item) => {
    if (!item) return;

    // Guardar en búsquedas recientes
    try {
      const updated = [item, ...recentSearches.filter((r) => r.url !== item.url)].slice(0, 4);
      setRecentSearches(updated);
      localStorage.setItem('micampus_recent_searches', JSON.stringify(updated));
    } catch {}

    if (item.external) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    } else {
      navigate(item.url);
    }
    onClose();
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      // Alternar categoría con Tab
      const currentIdx = CATEGORIES.findIndex((c) => c.id === selectedCategory);
      const nextIdx = e.shiftKey
        ? (currentIdx > 0 ? currentIdx - 1 : CATEGORIES.length - 1)
        : (currentIdx < CATEGORIES.length - 1 ? currentIdx + 1 : 0);
      setSelectedCategory(CATEGORIES[nextIdx].id);
      return;
    }

    if (results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && results[activeIndex]) {
        handleResultClick(results[activeIndex]);
      } else if (results.length > 0) {
        handleResultClick(results[0]);
      }
    }
  };

  return (
    <div className="search-modal-backdrop" onClick={onClose}>
      <div className="search-modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Barra superior de Input */}
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Buscar conceptos, materias, glosario o campus... (Tab para filtrar)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
            className="search-input"
            aria-label="Buscar en el campus"
            autoComplete="off"
            spellCheck="false"
          />
          {query && (
            <button
              className="search-close-btn"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              title="Borrar texto"
              style={{ marginRight: '0.25rem' }}
            >
              ✕
            </button>
          )}
          <button className="search-close-btn" onClick={onClose} title="Cerrar modal (Esc)">
            ✕
          </button>
        </div>

        {/* Barra de Filtros por Asignatura / Campus */}
        <div 
          style={{ 
            display: 'flex', 
            gap: '0.4rem', 
            padding: '0.65rem 1.2rem', 
            background: 'var(--bg-card)', 
            borderBottom: '1px solid var(--border-subtle)', 
            overflowX: 'auto',
            alignItems: 'center'
          }}
        >
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginRight: '0.2rem' }}>
            Filtro:
          </span>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  inputRef.current?.focus();
                }}
                style={{
                  background: isSelected ? 'var(--accent-purple, #8b5cf6)' : 'var(--bg-subtle, rgba(255,255,255,0.05))',
                  color: isSelected ? '#ffffff' : 'var(--text-main)',
                  border: isSelected ? '1px solid var(--accent-purple, #8b5cf6)' : '1px solid var(--border-subtle)',
                  borderRadius: '20px',
                  padding: '0.28rem 0.65rem',
                  fontSize: '0.76rem',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  transition: 'all 0.15s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Sugerencias y búsquedas recientes cuando no hay texto */}
        {!query && (
          <div className="search-quick-hints">
            {recentSearches.length > 0 && (
              <div style={{ marginBottom: '0.8rem' }}>
                <span className="search-quick-hint-label">🕒 Búsquedas recientes:</span>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.4rem' }}>
                  {recentSearches.map((rec, i) => (
                    <button
                      key={rec.url || i}
                      type="button"
                      onClick={() => handleResultClick(rec)}
                      className="search-quick-tag-btn"
                      style={{ borderColor: 'rgba(139, 92, 246, 0.4)', background: 'rgba(139, 92, 246, 0.08)' }}
                    >
                      <span>⚡</span>
                      <span>{rec.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <span className="search-quick-hint-label">Sugerencias rápidas:</span>
            <div className="search-quick-tags">
              {QUICK_SEARCH_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className="search-quick-tag-btn"
                  onClick={() => {
                    setQuery(tag);
                    inputRef.current?.focus();
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Lista de resultados filtrados */}
        {query && (
          <div className="search-results">
            {results.length > 0 ? (
              <ul className="search-results-list" role="listbox">
                {results.map((item, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <li
                      key={item.id || index}
                      ref={(el) => (itemRefs.current[index] = el)}
                      role="option"
                      aria-selected={isActive}
                      className={`search-result-item ${isActive ? 'active' : ''}`}
                      onClick={() => handleResultClick(item)}
                      onMouseEnter={() => setActiveIndex(index)}
                    >
                      <div className="search-result-info">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                          <span className="search-result-title">
                            <HighlightedText text={item.title} query={query} />
                          </span>
                          <span className="search-result-type">{item.type}</span>
                        </div>
                        {item.definition && (
                          <p style={{ margin: '0.28rem 0 0', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                            <HighlightedText text={item.definition} query={query} />
                          </p>
                        )}
                      </div>
                      <span className="search-result-arrow">→</span>
                    </li>
                  );
                })}
              </ul>
            ) : query.trim().length < 2 ? (
              <div className="search-no-results">
                Escribe al menos 2 caracteres para buscar...
              </div>
            ) : (
              <div className="search-no-results">
                No se encontraron resultados para "{query}" en {CATEGORIES.find((c) => c.id === selectedCategory)?.label || 'esta categoría'}
              </div>
            )}
          </div>
        )}

        {/* Footer con atajos de teclado interactivos */}
        <div className="search-modal-footer">
          <div className="search-modal-shortcuts">
            <span className="search-shortcut-item">
              <kbd className="search-shortcut-badge">Tab</kbd>
              <span>Filtro</span>
            </span>
            <span className="search-shortcut-item">
              <kbd className="search-shortcut-badge">↑</kbd>
              <kbd className="search-shortcut-badge">↓</kbd>
              <span>Navegar</span>
            </span>
            <span className="search-shortcut-item">
              <kbd className="search-shortcut-badge">↵</kbd>
              <span>Abrir</span>
            </span>
            <span className="search-shortcut-item">
              <kbd className="search-shortcut-badge">Esc</kbd>
              <span>Cerrar</span>
            </span>
          </div>
          {results.length > 0 && (
            <span className="search-results-count">
              {results.length} {results.length === 1 ? 'resultado' : 'resultados'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
