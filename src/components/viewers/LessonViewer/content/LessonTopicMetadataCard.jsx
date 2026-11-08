import React from 'react';

/**
 * Tarjeta de metadatos de entrega para retos prácticos (Accenture, L2E, fechas de entrega).
 */
export default function LessonTopicMetadataCard({ activeTopic }) {
  if (!activeTopic.proyecto && !activeTopic.l2eUrl) return null;

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: '12px',
      padding: '1.2rem 1.5rem',
      marginBottom: '2.2rem',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '1rem',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div>
        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>
          Accenture Bootcamp · Reto Práctico Oficial
        </div>
        <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-title)', marginTop: '0.25rem' }}>
          📦 Proyecto: <code style={{ color: 'var(--c-blue)', background: 'rgba(56,189,248,0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>{activeTopic.proyecto || 'taskmanager'}</code>
          {activeTopic.category && (
            <span style={{ marginLeft: '0.8rem', fontSize: '0.85rem', fontWeight: 'normal', color: 'var(--text-muted)' }}>
              | Categoría: <strong>{activeTopic.category}</strong>
            </span>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', border: '1px solid #f59e0b', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600 }}>
          ⏳ Cierre: {activeTopic.dueDate || '3 Nov 2026 (23:59)'}
        </span>
        {activeTopic.l2eUrl && (
          <a 
            href={activeTopic.l2eUrl} 
            target="_blank" 
            rel="noreferrer" 
            style={{ 
              background: 'var(--accent-purple, #8b5cf6)', 
              color: '#fff', 
              textDecoration: 'none', 
              padding: '0.45rem 1rem', 
              borderRadius: '6px', 
              fontSize: '0.85rem', 
              fontWeight: 600, 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.4rem' 
            }}
          >
            📤 Entregar en L2E ↗
          </a>
        )}
      </div>
    </div>
  );
}
