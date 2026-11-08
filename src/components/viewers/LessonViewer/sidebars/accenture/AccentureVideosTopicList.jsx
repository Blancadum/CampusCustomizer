import React from 'react';
import AccentureTopicItem from './AccentureTopicItem';
import AccentureModuleAccordion from './AccentureModuleAccordion';
import './AccentureVideosSidebar.css';

/**
 * AccentureVideosTopicList
 * Lista de temas con scroll vertical, resultados de búsqueda y acordeón de módulos optimizados.
 */
export default function AccentureVideosTopicList({
  loading,
  filteredTopics,
  groupedModules = {},
  openModule,
  onToggleModule,
  activeSlug,
  onTopicClick
}) {
  return (
    <div className="acc-topic-list-container">
      {loading ? (
        <div className="acc-topic-loading">
          Cargando módulos de vídeo...
        </div>
      ) : filteredTopics ? (
        /* Resultados de búsqueda directos */
        filteredTopics.map((topic) => (
          <AccentureTopicItem
            key={topic.id}
            topic={topic}
            isActive={activeSlug === topic.slug}
            onClick={onTopicClick}
            showSubtitle={true}
          />
        ))
      ) : (
        /* Acordeón agrupado por Módulos */
        Object.values(groupedModules).map((mod) => (
          <AccentureModuleAccordion
            key={mod.id}
            module={mod}
            isExpanded={openModule === mod.id}
            onToggle={() => onToggleModule(mod.id)}
            activeSlug={activeSlug}
            onTopicClick={onTopicClick}
          />
        ))
      )}
    </div>
  );
}
