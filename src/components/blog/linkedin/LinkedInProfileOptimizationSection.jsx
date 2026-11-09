import React from 'react';
import { CHECKLIST_ITEMS } from '../../../data/linkedinBlogData';

/**
 * Sección 3: Estrategia de SEO en LinkedIn y Checklist interactiva con persistencia.
 */
export default function LinkedInProfileOptimizationSection({
  checklist,
  onToggleCheck,
  completedChecks,
  progressPercent
}) {
  return (
    <article style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
        <span style={{ fontSize: '1.6rem' }}>🔍</span>
        <h2 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--text-title)' }}>
          3. Estrategia de SEO en LinkedIn: Haz que los Reclutadores te Encuentren
        </h2>
      </div>
      <p style={{ lineHeight: '1.7', color: 'var(--text-main)', fontSize: '1rem' }}>
        LinkedIn es fundamentalmente una base de datos indexada. Los reclutadores de empresas como Accenture o consultoras TIC no buscan perfiles al azar: aplican búsquedas booleanas (ej: <code>"Java" AND "Spring Boot" AND ("Docker" OR "REST")</code>). Si esas palabras no están en tus zonas calientes, eres invisible.
      </p>

      {/* CHECKLIST INTERACTIVA */}
      <div style={{ marginTop: '1.5rem', background: 'var(--bg-hover)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ fontWeight: 'bold', color: 'var(--text-title)', fontSize: '1.05rem' }}>
            📋 Checklist Interactiva de Optimización de Perfil
          </span>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: progressPercent === 100 ? '#22c55e' : '#ea580c' }}>
            {completedChecks} de {CHECKLIST_ITEMS.length} completadas ({progressPercent}%)
          </span>
        </div>

        <div style={{ background: 'var(--border-subtle)', height: '6px', borderRadius: '3px', overflow: 'hidden', marginBottom: '1.25rem' }}>
          <div style={{ background: 'linear-gradient(90deg, #ea580c, #9333ea)', height: '100%', width: `${progressPercent}%`, transition: 'width 0.3s ease' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {CHECKLIST_ITEMS.map((item) => (
            <label 
              key={item.key} 
              style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: '0.75rem', 
                cursor: 'pointer', 
                padding: '0.6rem 0.8rem', 
                borderRadius: '8px', 
                background: checklist[item.key] ? 'rgba(34, 197, 94, 0.08)' : 'var(--bg-card)', 
                border: '1px solid',
                borderColor: checklist[item.key] ? 'rgba(34, 197, 94, 0.3)' : 'var(--border-subtle)',
                transition: 'all 0.2s ease'
              }}
            >
              <input 
                type="checkbox" 
                checked={Boolean(checklist[item.key])} 
                onChange={() => onToggleCheck(item.key)}
                style={{ marginTop: '0.2rem', accentColor: '#ea580c', width: '16px', height: '16px', cursor: 'pointer' }}
              />
              <div style={{ flex: 1 }}>
                <span style={{ 
                  fontSize: '0.9rem', 
                  color: checklist[item.key] ? 'var(--text-main)' : 'var(--text-title)', 
                  fontWeight: checklist[item.key] ? 500 : 600,
                  textDecoration: checklist[item.key] ? 'line-through' : 'none' 
                }}>
                  {item.label}
                </span>
                <span style={{ display: 'inline-block', marginLeft: '0.5rem', fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: '4px', background: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                  {item.category}
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>
    </article>
  );
}
