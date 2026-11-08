import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AsideChecklist from '../../common/aside/AsideChecklist.jsx';

/**
 * ============================================================================
 * @component AsideEacsTab
 * @description Pestaña de Entregas y Actividades Oficiales (EACs / EAFs).
 * ============================================================================
 */
export default function AsideEacsTab({
  eacs = [],
  subjectConfig,
  themeColor = '#3b82f6'
}) {
  const [selectedEacId, setSelectedEacId] = useState(() => {
    if (!eacs || eacs.length === 0) return null;
    const pending = eacs.find(e => e.status === 'pending') || eacs[0];
    return pending.id;
  });

  useEffect(() => {
    if (eacs && eacs.length > 0 && !selectedEacId) {
      const pending = eacs.find(e => e.status === 'pending') || eacs[0];
      setSelectedEacId(pending.id);
    }
  }, [eacs, selectedEacId]);

  if (!eacs || eacs.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)' }}>
        No hay actividades oficiales registradas para esta asignatura.
      </div>
    );
  }

  const currentEac = eacs.find(e => e.id === selectedEacId) || eacs[0];

  const daysUntilDue = (() => {
    if (!currentEac?.dueDate) return null;
    const diff = new Date(currentEac.dueDate) - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  })();

  const statusLabel = currentEac.status === 'done' 
    ? '✅ Entregada' 
    : currentEac.status === 'pending' 
      ? '⏳ En curso' 
      : '🔒 Bloqueada';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
      {/* Selector de actividades (pills horizontales) */}
      <div className="right-drawer-pills">
        {eacs.map(eac => (
          <button
            key={eac.id}
            type="button"
            className={`right-drawer-pill-btn ${selectedEacId === eac.id ? 'is-active' : ''}`}
            style={{
              '--drawer-accent': themeColor
            }}
            onClick={() => setSelectedEacId(eac.id)}
          >
            {eac.id.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Tarjeta principal de la actividad */}
      <div className="right-drawer-card is-active" style={{ '--drawer-accent': themeColor }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
          <div>
            <h4 style={{ margin: 0, fontSize: '0.98rem', color: 'var(--text-title)', fontWeight: 700 }}>
              {currentEac.title}
            </h4>
            {currentEac.weight && (
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                Ponderación: {currentEac.weight}
              </span>
            )}
          </div>
          <span style={{ 
            fontSize: '0.72rem', 
            fontWeight: 700, 
            padding: '0.2rem 0.5rem', 
            borderRadius: '999px',
            background: currentEac.status === 'done' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(234, 179, 8, 0.15)',
            color: currentEac.status === 'done' ? '#10b981' : '#eab308'
          }}>
            {statusLabel}
          </span>
        </div>

        {/* Cuenta atrás y fecha límite */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          padding: '0.55rem 0.75rem', 
          borderRadius: '8px', 
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid var(--border-subtle)',
          fontSize: '0.8rem'
        }}>
          <span style={{ color: 'var(--text-muted)' }}>
            📅 {currentEac.dueDate ? `Límite: ${currentEac.dueDate}` : 'Fecha por determinar'}
          </span>
          {daysUntilDue !== null && (
            <span style={{ 
              fontWeight: 700, 
              color: daysUntilDue <= 3 ? '#ef4444' : daysUntilDue <= 7 ? '#f59e0b' : '#10b981' 
            }}>
              {daysUntilDue > 0 ? `Quedan ${daysUntilDue} días` : daysUntilDue === 0 ? '¡Hoy es la entrega!' : 'Plazo finalizado'}
            </span>
          )}
        </div>

        {/* Descripción de la actividad */}
        {currentEac.description && (
          <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
            {currentEac.description}
          </p>
        )}

        {/* Checklist interactivo persistido en localStorage */}
        {currentEac.checklist && (
          <AsideChecklist 
            items={currentEac.checklist}
            storageKey={`ioc_${subjectConfig?.code}_${currentEac.id}_checklist`}
            accentColor={themeColor}
            title="Criterios de Evaluación y Entregables"
          />
        )}

        {/* Botones de acción */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
          {currentEac.theorySlug && subjectConfig && (
            <Link
              to={`/ioc/${subjectConfig.code}/${subjectConfig.lessonPrefix}/${currentEac.theorySlug}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                background: `${themeColor}22`,
                color: themeColor,
                border: `1px solid ${themeColor}55`,
                padding: '0.65rem 1rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '0.85rem'
              }}
            >
              <span>📖 Ir a la Teoría de la {currentEac.id.toUpperCase()}</span>
              <span>→</span>
            </Link>
          )}

          <a
            href="https://ioc.xtec.cat/campus/my/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              background: 'transparent',
              color: 'var(--text-muted)',
              border: '1px dashed var(--border-subtle)',
              padding: '0.6rem 1rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '0.82rem'
            }}
          >
            <span>Subir entrega al Campus Oficial IOC</span>
            <span>↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
