import React from 'react';
import AsideTabButton from './AsideTabButton.jsx';
import '../../../assets/css/components/RightDrawerShell.css';

/**
 * ============================================================================
 * @component RightDrawerShell
 * @description Contenedor unificado para paneles laterales derechos con pestañas.
 *              Proporciona riel de botones flotantes (tab rail), overlay,
 *              cabecera parametrizable y zona scrolleable de contenido.
 * ============================================================================
 */
export default function RightDrawerShell({
  tabs = [],
  activeTab = null,
  onToggleTab,
  onClose,
  accentColor = '#3b82f6',
  topOffset = '76px',
  badge = 'CAMPUS',
  subjectTitle = '',
  children
}) {
  const isOpen = Boolean(activeTab);
  const currentTab = tabs.find(t => t.id === activeTab) || null;

  const headerTitle = currentTab?.title || (currentTab ? `${currentTab.icon || ''} ${currentTab.label || ''}` : '');
  const headerSubtitle = currentTab?.subtitle || subjectTitle;

  return (
    <>
      {/* Overlay de desenfoque al abrir */}
      {isOpen && (
        <div 
          className="right-drawer-overlay"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Contenedor del Drawer */}
      <aside
        className={`right-drawer-panel ${isOpen ? 'is-open' : ''}`}
        style={{
          '--drawer-top': topOffset,
          '--drawer-accent': accentColor
        }}
        aria-label="Panel lateral derecho"
        aria-hidden={!isOpen}
      >
        {/* Riel de pestañas flotantes adheridas al borde izquierdo */}
        <div className="right-drawer-tab-rail">
          {tabs.map(tab => (
            <AsideTabButton
              key={tab.id}
              id={tab.id}
              icon={tab.icon}
              label={tab.label}
              title={tab.title || tab.label}
              isActive={activeTab === tab.id}
              accentColor={accentColor}
              onClick={onToggleTab}
            />
          ))}
        </div>

        {/* Cabecera del panel abierto */}
        {isOpen && (
          <div className="right-drawer-header">
            <div className="right-drawer-header-left">
              {badge && (
                <span className="right-drawer-badge" style={{ color: accentColor, background: `${accentColor}22` }}>
                  {badge}
                </span>
              )}
              <div className="right-drawer-title-group">
                <h3 className="right-drawer-title">
                  {headerTitle}
                </h3>
                {headerSubtitle && (
                  <p className="right-drawer-subtitle">
                    {headerSubtitle}
                  </p>
                )}
              </div>
            </div>

            <button
              type="button"
              className="right-drawer-close-btn"
              onClick={onClose}
              title="Cerrar panel lateral"
              aria-label="Cerrar panel lateral"
            >
              ✕
            </button>
          </div>
        )}

        {/* Cuerpo scrolleable del panel */}
        {isOpen && (
          <div className="right-drawer-body">
            {currentTab?.render ? currentTab.render() : children}
          </div>
        )}
      </aside>
    </>
  );
}
