import React from 'react';

const TABS = [
  { id: 'cronograma', label: '🗓️ Cronograma' },
  { id: 'evaluacion', label: '📊 Evaluación' },
  { id: 'tutoria', label: '👨‍🏫 Tutoría' },
  { id: 'ficha', label: '🏛️ Ficha' },
  { id: 'documentos', label: '📥 Docs' }
];

/**
 * IfcdAdminTabsNav
 * Barra de navegación entre las sub-pestañas administrativas.
 */
export default function IfcdAdminTabsNav({
  activeTab,
  onSelectTab
}) {
  return (
    <div style={{
      display: 'flex',
      gap: '0.25rem',
      padding: '0.6rem 0.8rem',
      background: 'var(--bg-subtle)',
      borderBottom: '1px solid var(--border-subtle)',
      overflowX: 'auto'
    }}>
      {TABS.map(tab => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onSelectTab(tab.id)}
          style={{
            flex: '1 0 auto',
            padding: '0.35rem 0.6rem',
            borderRadius: '6px',
            border: 'none',
            fontSize: '0.74rem',
            fontWeight: 700,
            cursor: 'pointer',
            background: activeTab === tab.id ? 'var(--bg-card)' : 'transparent',
            color: activeTab === tab.id ? '#ea580c' : 'var(--text-muted)',
            boxShadow: activeTab === tab.id ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
            transition: 'all 0.2s'
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
