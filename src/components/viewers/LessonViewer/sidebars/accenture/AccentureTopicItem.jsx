import React from 'react';

/**
 * AccentureTopicItem
 * Botón interactivo para un tema de vídeo individual, optimizado y reutilizable.
 */
export default function AccentureTopicItem({
  topic,
  isActive,
  onClick,
  showSubtitle = false
}) {
  return (
    <button
      type="button"
      onClick={() => onClick(topic.slug)}
      className={`acc-topic-item ${isActive ? 'active' : ''}`}
    >
      <span className={`acc-topic-badge-num ${isActive ? 'active' : ''}`}>
        {topic.topicNum}
      </span>
      <div className="acc-topic-info">
        <div className={`acc-topic-title ${isActive ? 'active' : ''}`}>
          {topic.title}
        </div>
        {showSubtitle && topic.moduleShort && (
          <div className="acc-topic-subtitle">
            {topic.moduleShort} · {topic.temaTitle}
          </div>
        )}
      </div>
    </button>
  );
}
