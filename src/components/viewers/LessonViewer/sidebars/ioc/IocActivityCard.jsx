import React from 'react';

/**
 * IocActivityCard
 * Tarjeta resumen y descripción de la EAC activa con fecha límite destacada.
 */
export default function IocActivityCard({
  currentActivity,
  themeColor
}) {
  if (!currentActivity) return null;

  return (
    <div
      className="ioc-activity-card"
      style={{
        border: `1px solid ${themeColor}35`,
        borderLeft: `5px solid ${themeColor}`
      }}
    >
      <div className="ioc-activity-card-header">
        <h4 className="ioc-activity-card-title">
          {currentActivity.title}
        </h4>
        <span className="ioc-activity-due-badge">
          ⏳ {currentActivity.formattedDueDate}
        </span>
      </div>
      <p className="ioc-activity-desc">
        {currentActivity.description || currentActivity.title}
      </p>
    </div>
  );
}
