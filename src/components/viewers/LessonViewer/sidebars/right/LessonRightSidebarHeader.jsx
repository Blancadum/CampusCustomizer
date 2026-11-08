import React from 'react';

/**
 * Cabecera del panel lateral derecho con icono, título y badge informativo.
 */
export default function LessonRightSidebarHeader({
  tabIcon,
  title,
  isTutoriasMode,
  isTheoryMode,
  badgeText,
  itemsCount
}) {
  const displayTitle = title || (isTutoriasMode ? 'Plan de Tutorías' : isTheoryMode ? 'Teoría Spring Boot' : 'Retos Prácticos');
  const displayBadge = badgeText || (isTutoriasMode ? 'Spring Boot' : isTheoryMode ? `${itemsCount} Temas` : `${itemsCount} Actividades`);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem', paddingBottom: '0.6rem', borderBottom: '1px solid var(--border-subtle)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--text-title)' }}>
        <span>{tabIcon}</span>
        <span>{displayTitle}</span>
      </div>
      <span style={{ 
        fontSize: '0.74rem', 
        background: isTutoriasMode ? 'rgba(234, 179, 8, 0.15)' : isTheoryMode ? 'rgba(14, 165, 233, 0.15)' : 'rgba(139, 92, 246, 0.15)', 
        color: isTutoriasMode ? '#d97706' : isTheoryMode ? '#0ea5e9' : '#8b5cf6', 
        padding: '0.15rem 0.45rem', 
        borderRadius: '4px', 
        fontWeight: 'bold' 
      }}>
        {displayBadge}
      </span>
    </div>
  );
}
