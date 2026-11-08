import React, { useState, useEffect } from 'react';

/**
 * ============================================================================
 * @component AsideChecklist
 * @description Lista de verificación interactiva sincronizada con localStorage.
 * ============================================================================
 */
export default function AsideChecklist({
  items = [],
  storageKey,
  accentColor = '#3b82f6',
  title = 'Criterios de Entrega'
}) {
  const [checkedState, setCheckedState] = useState(() => {
    if (!storageKey) return {};
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    if (!storageKey) return;
    try {
      const saved = localStorage.getItem(storageKey);
      setCheckedState(saved ? JSON.parse(saved) : {});
    } catch {
      setCheckedState({});
    }
  }, [storageKey]);

  const handleToggle = (index) => {
    setCheckedState(prev => {
      const next = { ...prev, [index]: !prev[index] };
      if (storageKey) {
        try {
          localStorage.setItem(storageKey, JSON.stringify(next));
        } catch (e) {
          console.error('Error guardando checklist en localStorage:', e);
        }
      }
      return next;
    });
  };

  if (!items || items.length === 0) return null;

  const completedCount = items.filter((_, idx) => Boolean(checkedState[idx])).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', '--drawer-accent': accentColor }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.15rem' }}>
        <h5 style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-title)', fontWeight: 700 }}>
          {title}
        </h5>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>
          {completedCount} / {items.length} completados
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        {items.map((item, idx) => {
          const isDone = Boolean(checkedState[idx]);
          return (
            <label
              key={idx}
              className={`right-drawer-checklist-item ${isDone ? 'is-done' : ''}`}
            >
              <input
                type="checkbox"
                checked={isDone}
                onChange={() => handleToggle(idx)}
              />
              <span>{item}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
