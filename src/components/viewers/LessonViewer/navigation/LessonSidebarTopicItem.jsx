import React from 'react';
import LessonSidebarSubsections from './LessonSidebarSubsections';

/**
 * Elemento de tema/lección en el índice lateral con soporte para badges EAC y subsecciones anidadas.
 */
export default function LessonSidebarTopicItem({
  topic,
  isActive,
  activeSubSlug,
  onSelectTopic,
  scrollToSection,
  themeColor,
  isPetete,
  subsections
}) {
  const isTopicEac = /\beac\b|\beac\d+/i.test(topic.title) || Boolean(topic.isEac);
  const topicColor = isTopicEac ? '#ec4899' : (isActive ? themeColor : 'var(--text-main)');

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <button 
        data-sidebar-slug={topic.slug}
        onClick={() => {
          if (onSelectTopic) {
            onSelectTopic(topic.slug);
          } else {
            scrollToSection(topic.slug);
          }
        }}
        style={{
          padding: '0.6rem 0.8rem',
          textAlign: 'left',
          border: 'none',
          borderLeft: isActive ? `3px solid ${isTopicEac ? '#ec4899' : themeColor}` : '3px solid transparent',
          cursor: 'pointer',
          borderRadius: '4px',
          color: topicColor,
          background: isActive ? (isTopicEac ? 'rgba(236, 72, 153, 0.14)' : `${themeColor}1f`) : 'transparent', 
          fontWeight: isTopicEac ? '700' : '500',
          textShadow: isActive ? '0 0 0.35px currentColor' : 'none',
          transition: 'background 0.15s ease, border-color 0.15s ease, color 0.15s ease',
          fontSize: '0.93rem',
          lineHeight: '1.4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.4rem'
        }}
        onMouseEnter={(e) => {
          if (!isActive) e.currentTarget.style.background = isTopicEac ? 'rgba(236, 72, 153, 0.08)' : 'var(--bg-hover)';
        }}
        onMouseLeave={(e) => {
          if (!isActive) e.currentTarget.style.background = 'transparent';
        }}
      >
        <span>
          {(!topic.isOverview && topic.topicNum && !topic.topicNum.endsWith('.0')) ? `${topic.topicNum} - ` : ''}{topic.title}
        </span>
        {isTopicEac && (
          <span style={{ fontSize: '0.65rem', fontWeight: 800, padding: '0.1rem 0.35rem', borderRadius: '4px', background: 'rgba(236, 72, 153, 0.2)', color: '#ec4899', flexShrink: 0 }}>
            EAC
          </span>
        )}
      </button>

      {/* Subnivel siguiente al x.x. (x.x.x) para lectura durante el scroll en la lección */}
      {(isPetete || isActive || isTopicEac) && subsections.length > 0 && (
        <LessonSidebarSubsections
          subsections={subsections}
          activeSubSlug={activeSubSlug}
          scrollToSection={scrollToSection}
          themeColor={themeColor}
        />
      )}
    </div>
  );
}
