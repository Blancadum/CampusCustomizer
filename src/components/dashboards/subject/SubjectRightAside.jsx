import React, { useState, useMemo, useCallback } from 'react';
import RightDrawerShell from '../../common/aside/RightDrawerShell.jsx';
import AsideEacsTab from '../subject-aside/AsideEacsTab.jsx';
import AsideDevKitTab from '../subject-aside/AsideDevKitTab.jsx';
import AsideGitTab from '../subject-aside/AsideGitTab.jsx';
import AsideLessonsTab from '../subject-aside/AsideLessonsTab.jsx';

/**
 * ============================================================================
 * @component SubjectRightAside
 * @description Panel lateral unificado con riel de pestañas (Tab Rail)
 *              para las aulas de asignaturas IOC (IPO2, ENT, DESP, DIGI, INT).
 *              Integra Entregas (EACs), DevKit, Comandos Git y Temario.
 * ============================================================================
 */
export default function SubjectRightAside({
  subjectConfig,
  gestionData,
  themeColor = '#3b82f6',
  topOffset = '76px',
  onSelectLesson = null
}) {
  const [activeTab, setActiveTab] = useState(null); // 'eacs' | 'devkit' | 'git' | 'lessons' | null

  const toggleTab = useCallback((tabName) => {
    setActiveTab(prev => (prev === tabName ? null : tabName));
  }, []);

  const closeDrawer = useCallback(() => {
    setActiveTab(null);
  }, []);

  // Definición declarativa y memoizada de las pestañas del Drawer
  const tabs = useMemo(() => {
    if (!subjectConfig) return [];

    const tabList = [
      {
        id: 'eacs',
        icon: '📋',
        title: '📋 Entregas Oficiales y Actividades (EACs)',
        subtitle: subjectConfig.title,
        render: () => (
          <AsideEacsTab
            eacs={gestionData?.eacs || []}
            subjectConfig={subjectConfig}
            themeColor={themeColor}
          />
        )
      },
      {
        id: 'devkit',
        icon: '🛠️',
        title: '🛠️ DevKit, Recursos & Guías Prácticas',
        subtitle: subjectConfig.title,
        render: () => (
          <AsideDevKitTab
            devkitItems={subjectConfig.devkitItems || []}
            subjectConfig={subjectConfig}
            themeColor={themeColor}
          />
        )
      },
      {
        id: 'git',
        icon: '💻',
        title: '💻 Comandos Git & Flujo de Entrega',
        subtitle: `Repositorio: ${subjectConfig.repoName || subjectConfig.code}`,
        render: () => (
          <AsideGitTab
            subjectConfig={subjectConfig}
            themeColor={themeColor}
          />
        )
      }
    ];

    // Pestaña de lecciones opcional si hay lecciones configuradas
    if (subjectConfig.lessons && subjectConfig.lessons.length > 0) {
      tabList.push({
        id: 'lessons',
        icon: '📖',
        title: '📖 Índice y Temario de Lecciones',
        subtitle: subjectConfig.title,
        render: () => (
          <AsideLessonsTab
            lessons={subjectConfig.lessons}
            subjectConfig={subjectConfig}
            themeColor={themeColor}
            onSelectLesson={onSelectLesson}
          />
        )
      });
    }

    return tabList;
  }, [subjectConfig, gestionData, themeColor, onSelectLesson]);

  if (!subjectConfig) return null;

  return (
    <RightDrawerShell
      tabs={tabs}
      activeTab={activeTab}
      onToggleTab={toggleTab}
      onClose={closeDrawer}
      accentColor={themeColor}
      topOffset={topOffset}
      badge={subjectConfig.code?.toUpperCase()}
      subjectTitle={subjectConfig.title}
    />
  );
}
