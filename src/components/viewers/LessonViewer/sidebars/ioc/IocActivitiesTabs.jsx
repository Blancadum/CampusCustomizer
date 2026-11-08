import React from 'react';

/**
 * IocActivitiesTabs
 * Selector de solapas superiores para alternar entre EAC1, EAC2, EAC3...
 */
export default function IocActivitiesTabs({
  activities = [],
  selectedActivityId,
  onSelectActivity,
  themeColor
}) {
  return (
    <nav aria-label="Selector de EACs" className="ioc-tabs-nav">
      {activities.map(act => {
        const isSelected = selectedActivityId === act.id;
        const tabLabel = act.shortBadge ? act.shortBadge.replace(/\s+/g, '') : act.title;

        return (
          <button
            key={act.id}
            type="button"
            onClick={() => onSelectActivity(act)}
            className={`ioc-tab-btn ${isSelected ? 'is-active' : ''}`}
            style={{ color: isSelected ? themeColor : undefined }}
            title={`Seleccionar ${tabLabel} y saltar a su teoría`}
            aria-selected={isSelected}
            role="tab"
          >
            {tabLabel}
          </button>
        );
      })}
    </nav>
  );
}
