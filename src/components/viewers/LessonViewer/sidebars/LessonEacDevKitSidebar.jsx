import React, { useState, useEffect, useMemo } from 'react';
import { EAC_DEV_KITS } from '../../../../data/eacDevKitData';
import { EacKitRepository } from '../../../../data/models/EacKitModel';
import EacUnitSelector from './eacDevKit/EacUnitSelector';
import EacHeaderCard from './eacDevKit/EacHeaderCard';
import CommandSnippet from './eacDevKit/CommandSnippet';
import EclipseShortcutsList from './eacDevKit/EclipseShortcutsList';
import EacTipsList from './eacDevKit/EacTipsList';
import EacChecklist from './eacDevKit/EacChecklist';

/**
 * ============================================================================
 * @component   LessonEacDevKitSidebar
 * @description Orquestador del panel lateral de herramientas EAC (DevKit).
 *              Sigue los principios SOLID (Single Responsibility, OCP) y Clean Code,
 *              delegando la persistencia y reglas de dominio a EacKitRepository / EacDevKit
 *              y la presentación visual a componentes desacoplados.
 * ============================================================================
 */
export default function LessonEacDevKitSidebar({ 
  isOpen: controlledIsOpen,
  onToggle: controlledOnToggle,
  activeModuleId = 'u1',
  onSelectSection,
  topOffset = '20px'
}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(activeModuleId || 'u1');

  // Repositorio instanciado una sola vez siguiendo el patrón Repository (OOP)
  const repository = useMemo(() => new EacKitRepository(EAC_DEV_KITS), []);
  const moduleIds = useMemo(() => repository.getModuleIds(), [repository]);

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const toggle = controlledOnToggle || (() => setInternalIsOpen(!internalIsOpen));

  // Sincronización reactiva con la unidad activa en el libro digital
  useEffect(() => {
    if (activeModuleId) {
      setSelectedUnit(activeModuleId);
    }
  }, [activeModuleId]);

  // Selección de EAC con navegación automática al inicio de la teoría
  const handleSelectUnit = (moduleId) => {
    setSelectedUnit(moduleId);
    const targetKit = repository.findByModuleId(moduleId);
    if (targetKit && targetKit.startSlug && onSelectSection) {
      onSelectSection(targetKit.startSlug);
    }
  };

  // Entidad de dominio activa
  const currentKit = repository.findByModuleId(selectedUnit);

  return (
    <aside 
      aria-label="Panel de herramientas y comandos EAC"
      style={{
        position: 'fixed',
        top: '126px',
        right: 0,
        bottom: 0,
        width: '400px',
        maxWidth: '90vw',
        background: 'var(--bg-card)',
        borderLeft: '1px solid var(--border-subtle)',
        boxShadow: isOpen ? '-8px 0 28px rgba(0,0,0,0.25)' : 'none',
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
        zIndex: isOpen ? 980 : 950,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Botón Pestaña Adherido al Margen Izquierdo */}
      <button
        type="button"
        onClick={toggle}
        style={{
          position: 'absolute',
          left: '-40px',
          top: topOffset,
          width: '40px',
          height: '46px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRight: 'none',
          borderRadius: '10px 0 0 10px',
          boxShadow: '-4px 2px 10px rgba(0,0,0,0.15)',
          color: 'var(--text-main)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.15rem',
          zIndex: 951,
          transition: 'all 0.2s ease',
          padding: 0
        }}
        title={isOpen ? 'Cerrar kit de herramientas EAC' : 'Abrir EAC DevKit (Comandos Mac & Herramientas)'}
        aria-label="Alternar panel EAC DevKit"
      >
        <span>{isOpen ? '✕' : '⚡'}</span>
      </button>

      {/* Contenedor con Scroll de las Secciones Modulares */}
      <div style={{
        padding: '1.4rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        boxSizing: 'border-box',
        overflowY: 'auto'
      }}>
        {/* Cabecera Principal */}
        <header style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.1rem',
          paddingBottom: '0.75rem',
          borderBottom: '2px solid var(--border-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.3rem' }}>⚡</span>
            <span style={{ fontWeight: 800, fontSize: '1.08rem', color: 'var(--text-title)', letterSpacing: '-0.01em' }}>
              EAC DevKit · Herramientas
            </span>
          </div>
          <span style={{
            fontSize: '0.78rem',
            background: `${currentKit.color}20`,
            color: currentKit.color,
            padding: '0.22rem 0.6rem',
            borderRadius: '6px',
            fontWeight: 800,
            border: `1px solid ${currentKit.color}40`,
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            {currentKit.badge}
          </span>
        </header>

        {/* 1. Selector de Unidad/EAC con Solapas que saltan automáticamente a la teoría */}
        <EacUnitSelector
          moduleIds={moduleIds}
          selectedModuleId={selectedUnit}
          activeKitColor={currentKit.color}
          onSelect={handleSelectUnit}
        />

        {/* 2. Tarjeta Resumen y Explicación de la EAC Activa */}
        <EacHeaderCard kit={currentKit} onNavigateToSection={handleSelectUnit} />

        {/* 3. Bloque de Comandos Homebrew (Terminal de Alto Contraste) */}
        {currentKit.hasInstallCommands() && (
          <section style={{ marginBottom: '1.5rem' }}>
            <div style={{
              fontSize: '0.86rem',
              textTransform: 'uppercase',
              fontWeight: 800,
              color: 'var(--text-title)',
              letterSpacing: '0.6px',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}>
              <span>🍺</span>
              <span>Comandos Homebrew (Mac M-Series)</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {currentKit.installCommands.map((item, idx) => (
                <CommandSnippet
                  key={idx}
                  label={item.label}
                  cmd={item.cmd}
                  desc={item.desc}
                />
              ))}
            </div>
          </section>
        )}

        {/* 4. Rutas y Atajos de Eclipse */}
        <EclipseShortcutsList 
          shortcuts={currentKit.shortcuts} 
          accentColor={currentKit.color} 
        />

        {/* 5. Reglas & Consejos Clave */}
        <EacTipsList tips={currentKit.tips} />

        {/* 6. Checklist de Verificación para la Entrega */}
        <EacChecklist 
          checklist={currentKit.checklist} 
          accentColor={currentKit.color} 
        />
      </div>
    </aside>
  );
}
