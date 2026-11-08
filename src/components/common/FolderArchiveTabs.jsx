import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

/**
 * ============================================================================
 * @component   FolderArchiveTabs
 * @description Componente reutilizable con estética de carpeta archivadora
 *              (dossier técnico con pestañas superiores).
 *              Permite alternar entre múltiples documentos o ejemplos prácticos
 *              con soporte para pestañas destacadas (EAC / PAF en rosa fucsia),
 *              renderizado de Markdown completo y sincronización de estado.
 * ============================================================================
 */
export default function FolderArchiveTabs({
  tabs = [],
  activeTabId,
  onTabChange,
  folderTitle = 'Carpeta de Ejemplos Prácticos',
  folderIcon = '📁',
  themeColor = '#3b82f6',
  markdownComponents
}) {
  const [internalActiveId, setInternalActiveId] = useState(
    activeTabId || (tabs.length > 0 ? (tabs[0].id || tabs[0].slug) : '')
  );

  // Sincronización con prop externa (ej. si el usuario clica en el índice lateral)
  useEffect(() => {
    if (activeTabId && activeTabId !== internalActiveId) {
      const exists = tabs.some(t => (t.id || t.slug) === activeTabId);
      if (exists) {
        setInternalActiveId(activeTabId);
      }
    }
  }, [activeTabId, tabs]);

  const currentTab = tabs.find(t => (t.id || t.slug) === internalActiveId) || tabs[0] || null;

  const handleSelectTab = (tab) => {
    const tabId = tab.id || tab.slug;
    setInternalActiveId(tabId);
    if (onTabChange) {
      onTabChange(tabId, tab);
    }
  };

  if (!tabs || tabs.length === 0) return null;

  return (
    <div 
      className="folder-archive-container"
      style={{
        marginTop: '2rem',
        marginBottom: '2.5rem',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      {/* 1. Lomo / Pestañas de la Carpeta Archivadora */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: '0.35rem',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          paddingLeft: '0.4rem',
          paddingRight: '0.4rem',
          position: 'relative',
          zIndex: 2,
          marginBottom: '-1px'
        }}
      >
        {tabs.map((tab, idx) => {
          const tabId = tab.id || tab.slug;
          const isActive = (currentTab && (currentTab.id || currentTab.slug) === tabId);
          const isEac = Boolean(tab.isEac) || /eac/i.test(tab.title || tab.label);

          // Color de pestaña: Si es EAC va en Rosa Fucsia (#ec4899)
          const activeBorderColor = isEac ? '#ec4899' : themeColor;
          const activeTextColor = isEac ? '#ec4899' : 'var(--text-title)';
          const tabBg = isActive 
            ? 'var(--bg-card)' 
            : (isEac ? 'rgba(236, 72, 153, 0.08)' : 'var(--bg-input)');

          return (
            <button
              key={tabId || idx}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => handleSelectTab(tab)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.65rem 1.1rem',
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
                border: isActive 
                  ? `2px solid ${activeBorderColor}` 
                  : `1px solid var(--border-subtle)`,
                borderBottom: isActive ? '2px solid var(--bg-card)' : '1px solid var(--border-subtle)',
                background: tabBg,
                color: isActive ? activeTextColor : (isEac ? '#ec4899' : 'var(--text-muted)'),
                fontWeight: isActive ? 700 : 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.18s ease',
                boxShadow: isActive ? '0 -3px 10px rgba(0,0,0,0.06)' : 'none',
                flexShrink: 0,
                position: 'relative',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = isEac ? '#ec4899' : 'var(--text-main)';
                  e.currentTarget.style.background = isEac ? 'rgba(236, 72, 153, 0.12)' : 'var(--bg-hover)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = isEac ? '#ec4899' : 'var(--text-muted)';
                  e.currentTarget.style.background = tabBg;
                }
              }}
            >
              {/* Icono de la pestaña */}
              <span style={{ fontSize: '1rem' }}>
                {tab.icon || (isEac ? '🎯' : (idx === 0 ? '🚲' : '🚗'))}
              </span>

              {/* Título de la pestaña */}
              <span>{tab.label || tab.title}</span>

              {/* Badge visual (ej. EAC / PAF) */}
              {isEac && (
                <span 
                  style={{
                    fontSize: '0.62rem',
                    fontWeight: 800,
                    background: '#ec4899',
                    color: '#ffffff',
                    padding: '0.12rem 0.45rem',
                    borderRadius: '999px',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    marginLeft: '0.15rem'
                  }}
                >
                  EAC
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 2. Cuerpo Contenedor de la Carpeta (Dossier) */}
      <div 
        style={{
          background: 'var(--bg-card)',
          border: currentTab?.isEac 
            ? '2px solid rgba(236, 72, 153, 0.4)' 
            : '2px solid var(--border-subtle)',
          borderRadius: '12px',
          borderTopLeftRadius: tabs[0] && (tabs[0].id || tabs[0].slug) === (currentTab?.id || currentTab?.slug) ? '0px' : '12px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
          position: 'relative',
          zIndex: 1,
          padding: '1.8rem 2rem',
          boxSizing: 'border-box'
        }}
      >
        {/* Encabezado interior de la pestaña actual */}
        {currentTab && (
          <header 
            id={currentTab.id || currentTab.slug}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.8rem',
              paddingBottom: '1.1rem',
              marginBottom: '1.4rem',
              borderBottom: currentTab.isEac 
                ? '2px solid rgba(236, 72, 153, 0.25)' 
                : '2px solid var(--border-subtle)',
              scrollMarginTop: '160px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span 
                style={{
                  fontSize: '1.4rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  background: currentTab.isEac ? 'rgba(236, 72, 153, 0.12)' : `${themeColor}15`
                }}
              >
                {currentTab.icon || (currentTab.isEac ? '🎯' : folderIcon)}
              </span>
              <div>
                <h3 
                  style={{
                    margin: 0,
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: currentTab.isEac ? '#ec4899' : 'var(--text-title)',
                    lineHeight: '1.25'
                  }}
                >
                  {currentTab.title}
                </h3>
                {currentTab.subtitle && (
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    {currentTab.subtitle}
                  </p>
                )}
              </div>
            </div>

            {/* Píldora de estado / categoría */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {currentTab.isEac ? (
                <span 
                  style={{
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    background: 'rgba(236, 72, 153, 0.15)',
                    color: '#ec4899',
                    border: '1px solid #ec4899',
                    padding: '0.25rem 0.7rem',
                    borderRadius: '999px',
                    letterSpacing: '0.5px'
                  }}
                >
                  ★ Entrega Oficial Evaluada (EAC 1)
                </span>
              ) : (
                <span 
                  style={{
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    background: 'var(--bg-input)',
                    color: 'var(--text-muted)',
                    border: '1px solid var(--border-subtle)',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '6px'
                  }}
                >
                  Ejemplo Práctico de Aprendizaje
                </span>
              )}
            </div>
          </header>
        )}

        {/* Contenido de la solapa seleccionada */}
        <div 
          className="folder-archive-body topic-body"
          style={{
            lineHeight: '1.7',
            color: 'var(--text-main)',
            fontSize: '1.02rem'
          }}
        >
          {currentTab?.contentMd ? (
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]} 
              rehypePlugins={[rehypeRaw]}
              components={markdownComponents}
            >
              {currentTab.contentMd}
            </ReactMarkdown>
          ) : currentTab?.renderCustom ? (
            currentTab.renderCustom()
          ) : null}
        </div>
      </div>
    </div>
  );
}
