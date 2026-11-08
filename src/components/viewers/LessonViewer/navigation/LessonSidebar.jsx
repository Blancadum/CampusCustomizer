import React, { useEffect, useRef, useMemo } from 'react';
import LessonSidebarToggle from './LessonSidebarToggle';
import LessonSidebarTopicItem from './LessonSidebarTopicItem';
import { groupTopicsByModuleAndTema, extractSubsections } from './lessonSidebarUtils';

/**
 * ============================================================================
 * @component   LessonSidebar
 * @description Menú de navegación lateral con índice de contenidos scrollspy,
 *              agrupación jerárquica por módulos y temas, y subsecciones interactivas.
 * ============================================================================
 */
export default function LessonSidebar({ 
  topics, 
  activeSlug, 
  activeSubSlug, 
  scrollToSection, 
  onSelectTopic,
  isSidebarOpen, 
  setIsSidebarOpen, 
  isMobile, 
  title,
  themeColor = 'var(--accent-blue)',
  isPetete = false
}) {
  const sidebarRef = useRef(null);

  // Auto-scroll del aside izquierdo para situar el contenido o subenunciado activo a la vista
  useEffect(() => {
    if (isPetete) return;
    const targetSlug = activeSubSlug || activeSlug;
    if (!targetSlug || !isSidebarOpen) return;

    const timer = setTimeout(() => {
      if (!sidebarRef.current) return;
      const activeElement = sidebarRef.current.querySelector(`[data-sidebar-slug="${targetSlug}"]`);
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: 'auto',
          block: 'nearest'
        });
      }
    }, 60);

    return () => clearTimeout(timer);
  }, [activeSlug, activeSubSlug, isSidebarOpen, isPetete]);

  // Agrupación memoizada de temas por módulo y bloque temático
  const groupedModules = useMemo(() => groupTopicsByModuleAndTema(topics), [topics]);

  return (
    <>
      {/* Botón flotante para plegar/desplegar el índice lateral */}
      <LessonSidebarToggle
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isMobile={isMobile}
      />

      {/* SIDEBAR DE SCROLLSPY */}
      <aside 
        ref={sidebarRef} 
        className="lesson-sidebar" 
        style={{ 
          width: isSidebarOpen ? 'clamp(350px, 28vw, 540px)' : '0px', 
          opacity: isSidebarOpen ? 1 : 0,
          overflowY: isSidebarOpen ? 'auto' : 'hidden',
          overflowX: 'hidden',
          transition: 'width 0.3s ease, opacity 0.3s ease, padding 0.3s ease',
          flexShrink: 0, 
          background: 'var(--bg-card)', 
          borderRight: isSidebarOpen ? '1px solid var(--border-subtle)' : 'none', 
          padding: isSidebarOpen ? '1.5rem' : '0',
          position: 'sticky',
          top: '126px', // Header principal (76px) + Breadcrumb nav (50px)
          height: 'calc(100vh - 126px)'
        }}
      >
        <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem' }}>
          {title || 'Índice de Contenidos'}
        </h3>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {Object.entries(groupedModules).map(([moduleTitle, moduleGroups], mIdx) => {
            const firstGroupTopics = Object.values(moduleGroups)[0];
            const moduleFirstSlug = firstGroupTopics && firstGroupTopics.length > 0 ? firstGroupTopics[0].slug : null;

            return (
              <div key={mIdx} style={{ marginBottom: '1.2rem' }}>
                <button 
                  onClick={() => {
                    if (moduleFirstSlug) {
                      if (onSelectTopic) {
                        onSelectTopic(moduleFirstSlug);
                      }
                      const section = document.getElementById(`module-${moduleFirstSlug}`);
                      if (section) {
                        const y = section.getBoundingClientRect().top + window.scrollY - 150;
                        window.scrollTo({ top: Math.max(0, y), behavior: 'auto' });
                      }
                    }
                  }}
                  style={{ 
                    fontSize: '0.85rem', 
                    fontWeight: 'bold', 
                    color: 'var(--text-muted)', 
                    marginBottom: '0.6rem', 
                    textTransform: 'uppercase',
                    padding: '0 0.5rem',
                    background: 'transparent',
                    border: 'none',
                    cursor: moduleFirstSlug ? 'pointer' : 'default',
                    textAlign: 'left',
                    transition: 'color 0.2s',
                    width: '100%'
                  }}
                  onMouseEnter={(e) => {
                    if (moduleFirstSlug) e.currentTarget.style.color = themeColor;
                  }}
                  onMouseLeave={(e) => {
                    if (moduleFirstSlug) e.currentTarget.style.color = 'var(--text-muted)';
                  }}
                >
                  {moduleTitle}
                </button>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginLeft: '0.5rem' }}>
                  {(() => {
                    const groupEntries = Object.entries(moduleGroups);
                    const allGroupsAreSingle = groupEntries.length > 1 && groupEntries.every(([_, list]) => list.length === 1);

                    return groupEntries.map(([groupName, groupTopics], gIdx) => {
                      let temaNumForScroll = '';
                      if (groupTopics.length > 0 && groupTopics[0].topicNum) {
                        const parts = String(groupTopics[0].topicNum).split('.');
                        if (parts.length >= 1 && !isNaN(parts[0])) {
                          temaNumForScroll = parts[0];
                        }
                      }
                      
                      const isTemaActive = groupTopics.some((t) => t.slug === activeSlug);
                      const showGroupHeading = groupName !== 'default' && !allGroupsAreSingle && groupEntries.length > 1;
                      
                      return (
                        <div key={gIdx} style={{ display: 'flex', flexDirection: 'column' }}>
                          {showGroupHeading && (
                            <button 
                              onClick={() => {
                                if (groupTopics.length > 0) {
                                  if (onSelectTopic) {
                                    onSelectTopic(groupTopics[0].slug);
                                  } else if (temaNumForScroll) {
                                    const section = document.getElementById(`tema-content-${temaNumForScroll}`);
                                    if (section) {
                                      const y = section.getBoundingClientRect().top + window.scrollY - 150;
                                      window.scrollTo({ top: Math.max(0, y), behavior: 'auto' });
                                    }
                                  }
                                }
                              }}
                              style={{ 
                                fontSize: '0.95rem', 
                                fontWeight: '700', 
                                color: isTemaActive ? themeColor : 'var(--text-main)', 
                                textDecoration: isTemaActive ? 'underline' : 'none',
                                padding: '0.3rem 0.5rem',
                                marginBottom: '0.2rem',
                                textAlign: 'left',
                                background: 'transparent',
                                border: 'none',
                                cursor: temaNumForScroll ? 'pointer' : 'default',
                                transition: 'color 0.2s'
                              }}
                              onMouseEnter={(e) => {
                                if (temaNumForScroll && !isTemaActive) e.currentTarget.style.color = themeColor;
                              }}
                              onMouseLeave={(e) => {
                                if (temaNumForScroll && !isTemaActive) e.currentTarget.style.color = 'var(--text-main)';
                              }}
                            >
                              {groupName}
                            </button>
                          )}

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', marginLeft: showGroupHeading ? '0.5rem' : '0' }}>
                            {groupTopics.map((t) => {
                              const isActive = t.slug === activeSlug;
                              const subsections = extractSubsections(t);

                              return (
                                <LessonSidebarTopicItem
                                  key={t.slug}
                                  topic={t}
                                  isActive={isActive}
                                  activeSubSlug={activeSubSlug}
                                  onSelectTopic={onSelectTopic}
                                  scrollToSection={scrollToSection}
                                  themeColor={themeColor}
                                  isPetete={isPetete}
                                  subsections={subsections}
                                />
                              );
                            })}
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
