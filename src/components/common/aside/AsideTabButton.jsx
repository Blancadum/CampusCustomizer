import React from 'react';

/**
 * ============================================================================
 * @component AsideTabButton
 * @description Pestaña individual adherida al borde izquierdo del panel lateral.
 * ============================================================================
 */
export default function AsideTabButton({
  id,
  icon,
  label,
  title,
  isActive,
  accentColor = '#3b82f6',
  onClick
}) {
  return (
    <button
      type="button"
      className={`right-drawer-tab-btn ${isActive ? 'is-active' : ''}`}
      style={{
        '--drawer-accent': accentColor,
        borderRight: isActive ? 'none' : undefined
      }}
      onClick={() => onClick(id)}
      title={title || label}
      aria-label={title || label}
      aria-expanded={isActive}
    >
      <span className="right-drawer-tab-icon">
        {icon}
      </span>
      {label && (
        <span className="right-drawer-tab-label">
          {label}
        </span>
      )}
    </button>
  );
}
