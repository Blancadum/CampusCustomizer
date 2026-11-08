import React, { useState, useEffect } from 'react';
import LessonRightSidebarTrigger from './right/LessonRightSidebarTrigger';
import LessonRightSidebarHeader from './right/LessonRightSidebarHeader';
import TutoriasPanel from './right/TutoriasPanel';
import TheoryActivitiesPanel from './right/TheoryActivitiesPanel';

/**
 * ============================================================================
 * @component   LessonRightSidebar
 * @description Panel lateral retráctil para el visor de lecciones con soporte
 *              para tres modos: Tutorías de Isra, Temario Teórico Spring Boot
 *              y Retos Prácticos de Accenture.
 * ============================================================================
 */
export default function LessonRightSidebar({ 
  mode = 'activities', // 'activities' | 'theory' | 'tutorias'
  dataSource,
  title,
  icon,
  badgeText,
  isOpen: controlledIsOpen,
  onToggle: controlledOnToggle,
  topOffset = '20px'
}) {
  const [items, setItems] = useState([]);
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [tutoriasSubTab, setTutoriasSubTab] = useState('calendario'); // 'calendario' | 'cronograma'
  const [activityStatus] = useState(() => {
    try {
      const saved = localStorage.getItem('accenture_activities_status');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const toggle = controlledOnToggle || (() => setInternalIsOpen(!internalIsOpen));

  const isTheoryMode = mode === 'theory';
  const isTutoriasMode = mode === 'tutorias';

  useEffect(() => {
    let endpoint = dataSource;
    if (!endpoint) {
      if (isTutoriasMode) endpoint = '/data/extra/plan_tutorias.json';
      else if (isTheoryMode) endpoint = '/data/extra/springboot_guia.json';
      else endpoint = '/data/extra/accenture_actividades.json';
    }

    fetch(endpoint)
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar datos del panel');
        return res.json();
      })
      .then((data) => setItems(data))
      .catch((err) => console.error('Error cargando panel lateral:', err));
  }, [isTheoryMode, isTutoriasMode, dataSource]);

  if (!items || items.length === 0) return null;

  const tabIcon = icon || (isTutoriasMode ? '📅' : isTheoryMode ? '🧠' : '🛠️');
  const tabTitle = title || (isTutoriasMode ? 'Plan de Tutorías' : isTheoryMode ? 'Ver Temario Teórico' : 'Ver Retos Prácticos');

  return (
    <aside 
      style={{
        position: 'fixed',
        top: '126px',
        right: 0,
        bottom: 0,
        width: isTutoriasMode ? '380px' : '320px',
        maxWidth: '88vw',
        background: 'var(--bg-card)',
        borderLeft: '1px solid var(--border-subtle)',
        boxShadow: isOpen ? '-8px 0 25px rgba(0,0,0,0.22)' : 'none',
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
        zIndex: isOpen ? 980 : 950,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Botón pestaña adherido al borde izquierdo del panel */}
      <LessonRightSidebarTrigger
        isOpen={isOpen}
        onToggle={toggle}
        topOffset={topOffset}
        tabTitle={tabTitle}
        tabIcon={tabIcon}
      />

      <div style={{ padding: '1.2rem 1rem', display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box' }}>
        {/* Cabecera del panel */}
        <LessonRightSidebarHeader
          tabIcon={tabIcon}
          title={title}
          isTutoriasMode={isTutoriasMode}
          isTheoryMode={isTheoryMode}
          badgeText={badgeText}
          itemsCount={items.length}
        />

        {isTutoriasMode ? (
          <TutoriasPanel
            items={items}
            tutoriasSubTab={tutoriasSubTab}
            onSelectSubTab={setTutoriasSubTab}
          />
        ) : (
          <TheoryActivitiesPanel
            isTheoryMode={isTheoryMode}
            items={items}
            activityStatus={activityStatus}
          />
        )}
      </div>
    </aside>
  );
}
