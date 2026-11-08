import React from 'react';
import AccentureTopicItem from './AccentureTopicItem';

/**
 * AccentureModuleAccordion
 * Tarjeta desplegable para un módulo de vídeos con su cabecera y listado de temas.
 */
export default function AccentureModuleAccordion({
  module,
  isExpanded,
  onToggle,
  activeSlug,
  onTopicClick
}) {
  return (
    <div className="acc-module-card">
      <button
        type="button"
        onClick={onToggle}
        className={`acc-module-header ${isExpanded ? 'expanded' : ''}`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span>📂</span>
          <span>{module.short}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            {module.topics.length} temas
          </span>
          <span style={{ fontSize: '0.7rem', color: '#06b6d4' }}>
            {isExpanded ? '▼' : '▶'}
          </span>
        </div>
      </button>

      {isExpanded && (
        <div className="acc-module-topics-tray">
          {module.topics.map((topic) => (
            <AccentureTopicItem
              key={topic.id}
              topic={topic}
              isActive={activeSlug === topic.slug}
              onClick={onTopicClick}
              showSubtitle={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}
