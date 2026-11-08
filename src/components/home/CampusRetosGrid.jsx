import React, { useState, useMemo } from 'react';
import IocDawRetoCard from './cards/IocDawRetoCard.jsx';
import UocRetoCard from './cards/UocRetoCard.jsx';

const RETOS_LIST = [
  { id: 'ioc', title: 'Campus IOC (CFGS)', Component: IocDawRetoCard },
  { id: 'uoc', title: 'Campus UOC (Grado / Máster)', Component: UocRetoCard },
];

const STORAGE_KEY = 'micampus_archived_cards';

export default function CampusRetosGrid() {
  const [archivedIds, setArchivedIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeTab, setActiveTab] = useState('active');

  const handleToggleArchive = (id) => {
    setArchivedIds((prev) => {
      const isCurrentlyArchived = prev.includes(id);
      const next = isCurrentlyArchived ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleRestoreAll = () => {
    setArchivedIds([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setActiveTab('active');
  };

  const activeCards = useMemo(
    () => RETOS_LIST.filter((item) => !archivedIds.includes(item.id)),
    [archivedIds]
  );

  const archivedCards = useMemo(
    () => RETOS_LIST.filter((item) => archivedIds.includes(item.id)),
    [archivedIds]
  );

  const cardsToRender = activeTab === 'active' ? activeCards : archivedCards;

  return (
    <section className="campus-section">
      <div
        className="section-heading"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <h2 style={{ margin: 0 }}>📚 Mis Campus (IOC & UOC)</h2>
          <span
            style={{
              fontSize: '0.8rem',
              background: 'var(--bg-subtle, rgba(100, 116, 139, 0.08))',
              color: 'var(--text-muted, #64748b)',
              padding: '0.22rem 0.7rem',
              borderRadius: '12px',
              border: '1px solid var(--border-subtle, rgba(0, 0, 0, 0.08))',
              fontWeight: 600,
            }}
          >
            {activeCards.length} activos {archivedCards.length > 0 && `· ${archivedCards.length} archivados`}
          </span>
        </div>

        <div
          className="retos-filter-tabs"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: 'var(--bg-subtle, #f1f5f9)',
            border: '1px solid var(--border-subtle, #e2e8f0)',
            borderRadius: '12px',
            padding: '4px',
            gap: '4px',
          }}
        >
          <button
            type="button"
            className={`retos-tab-btn ${activeTab === 'active' ? 'active' : ''}`}
            onClick={() => setActiveTab('active')}
            style={{
              border: activeTab === 'active' ? '1px solid rgba(0,0,0,0.08)' : '1px solid transparent',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.42rem 0.9rem',
              fontSize: '0.82rem',
              fontWeight: 700,
              borderRadius: '9px',
              cursor: 'pointer',
              background: activeTab === 'active' ? 'var(--bg-card, #ffffff)' : 'transparent',
              color: activeTab === 'active' ? 'var(--text-title, #0f172a)' : 'var(--text-muted, #64748b)',
            }}
          >
            <span>🚀 Activos ({activeCards.length})</span>
          </button>

          <button
            type="button"
            className={`retos-tab-btn ${activeTab === 'archived' ? 'active' : ''}`}
            onClick={() => setActiveTab('archived')}
            style={{
              border: activeTab === 'archived' ? '1px solid rgba(0,0,0,0.08)' : '1px solid transparent',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.42rem 0.9rem',
              fontSize: '0.82rem',
              fontWeight: 700,
              borderRadius: '9px',
              cursor: 'pointer',
              background: activeTab === 'archived' ? 'var(--bg-card, #ffffff)' : 'transparent',
              color: activeTab === 'archived' ? 'var(--text-title, #0f172a)' : 'var(--text-muted, #64748b)',
            }}
          >
            <span>📦 Archivados ({archivedCards.length})</span>
          </button>

          {archivedCards.length > 0 && activeTab === 'archived' && (
            <button
              type="button"
              onClick={handleRestoreAll}
              style={{
                marginLeft: '0.4rem',
                padding: '0.42rem 0.8rem',
                fontSize: '0.78rem',
                fontWeight: 700,
                color: '#16a34a',
                background: 'rgba(34, 197, 94, 0.12)',
                border: '1px solid rgba(34, 197, 94, 0.35)',
                borderRadius: '9px',
                cursor: 'pointer',
              }}
            >
              Restaurar todos
            </button>
          )}
        </div>
      </div>

      {cardsToRender.length > 0 ? (
        <div className="campus-grid">
          {cardsToRender.map(({ id, Component }) => (
            <Component
              key={id}
              isArchived={archivedIds.includes(id)}
              onToggleArchive={() => handleToggleArchive(id)}
            />
          ))}
        </div>
      ) : (
        <div
          style={{
            padding: '2.5rem',
            textAlign: 'center',
            background: 'var(--bg-card)',
            border: '1px dashed var(--border-subtle)',
            borderRadius: '16px',
            color: 'var(--text-muted)',
          }}
        >
          <p>No hay campus en esta vista.</p>
        </div>
      )}
    </section>
  );
}
