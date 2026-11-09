import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import searchIcon from '../../assets/img/icons/search.webp';
import { getCachedSearchIndex, fetchSearchIndex } from '../../utils/searchIndexService';
import { matchesSearch } from '../../utils/search';
import SearchInputBar from './search/SearchInputBar';
import SearchDropdown from './search/SearchDropdown';
import { getBadgeStyle } from './search/searchBadgeStyles';

export default function HeaderSearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchData, setSearchData] = useState(() => getCachedSearchIndex());
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMac, setIsMac] = useState(true);

  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const resultsListRef = useRef(null);
  const navigate = useNavigate();

  // Lazy loading inteligente del índice de búsqueda al interactuar
  const ensureIndexLoaded = () => {
    if (searchData.length === 0) {
      fetchSearchIndex().then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setSearchData(data);
        }
      });
    }
  };

  // Detección de sistema operativo para mostrar ⌘K o Ctrl+K
  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      setIsMac(/Mac|iPod|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
    }
  }, []);

  // Atajos globales: Cmd+K / Ctrl+K y '/' para enfocar el buscador
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      const targetTag = (e.target.tagName || '').toLowerCase();
      const isInputActive = targetTag === 'input' || targetTag === 'textarea' || e.target.isContentEditable;

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        ensureIndexLoaded();
        inputRef.current?.focus();
        setIsOpen(true);
      } else if (e.key === '/' && !isInputActive) {
        e.preventDefault();
        ensureIndexLoaded();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [searchData.length]);

  // Cierre al hacer click fuera del componente
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtrado reactivo optimizado
  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];

    return searchData.filter((item) => {
      // 1. Filtro por categoría seleccionada
      if (activeCategory !== 'all') {
        const itemType = (item.type || '').toLowerCase();
        if (activeCategory === 'video' && !itemType.includes('vídeo') && !itemType.includes('video')) return false;
        if (activeCategory === 'leccion' && !itemType.includes('lección') && !itemType.includes('leccion')) return false;
        if (activeCategory === 'eac' && !itemType.includes('eac') && !itemType.includes('actividad')) return false;
        if (activeCategory === 'glosario' && !itemType.includes('glosario')) return false;
        if (activeCategory === 'campus' && !itemType.includes('campus') && !itemType.includes('portal') && !itemType.includes('materia')) return false;
      }

      // 2. Coincidencia por texto (sin distinguir mayúsculas ni tildes)
      return matchesSearch(item, query);
    }).slice(0, 40);
  }, [query, searchData, activeCategory]);

  // Reset del cursor al cambiar la query o la categoría
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, activeCategory]);

  const scrollItemIntoView = (index) => {
    if (!resultsListRef.current) return;
    const items = resultsListRef.current.querySelectorAll('.header-search-result-row');
    if (items[index]) {
      items[index].scrollIntoView({ block: 'nearest' });
    }
  };

  const handleSelectItem = (item) => {
    setIsOpen(false);
    setQuery('');
    if (item.external || (item.url && item.url.startsWith('http'))) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    } else {
      navigate(item.url);
    }
  };

  // Manejo de teclado (flechas y enter) dentro del buscador
  const handleInputKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      inputRef.current?.blur();
      return;
    }

    if (!isOpen || filteredResults.length === 0) {
      if (e.key === 'ArrowDown' && query) {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIdx = (selectedIndex + 1) % filteredResults.length;
      setSelectedIndex(nextIdx);
      scrollItemIntoView(nextIdx);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIdx = (selectedIndex - 1 + filteredResults.length) % filteredResults.length;
      setSelectedIndex(prevIdx);
      scrollItemIntoView(prevIdx);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selectedItem = filteredResults[selectedIndex];
      if (selectedItem) {
        handleSelectItem(selectedItem);
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      className="header-search-container"
    >
      {/* 1. Barra de entrada visible en la cabecera */}
      <SearchInputBar
        inputRef={inputRef}
        query={query}
        isOpen={isOpen}
        isMac={isMac}
        onQueryChange={(val) => {
          setQuery(val);
          if (!isOpen) setIsOpen(true);
        }}
        onClearQuery={() => setQuery('')}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleInputKeyDown}
        onEnsureIndexLoaded={ensureIndexLoaded}
        searchIcon={searchIcon}
      />

      {/* 2. Popover desplegable flotante de resultados en tiempo real */}
      <SearchDropdown
        isOpen={isOpen}
        query={query}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        resultsListRef={resultsListRef}
        filteredResults={filteredResults}
        selectedIndex={selectedIndex}
        onSelectIndex={setSelectedIndex}
        onSelectItem={handleSelectItem}
        getBadgeStyle={getBadgeStyle}
      />
    </div>
  );
}
