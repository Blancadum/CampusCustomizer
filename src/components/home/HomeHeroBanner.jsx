import React from 'react';
import { IOC_SUBJECTS, UOC_SUBJECTS } from '../../config/iocSubjects.js';

export default function HomeHeroBanner({
  userName = 'Compañero/a',
  onRenameUser,
  tasksCount = 0,
  nextTask = null,
}) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return 'Buenos días';
    if (hour >= 12 && hour < 20) return 'Buenas tardes';
    return 'Buenas noches';
  };

  const getUrgencyBadge = (days) => {
    if (typeof days !== 'number' || isNaN(days)) return null;
    if (days === 0) return { text: '¡Hoy!', className: 'pill-rose' };
    if (days === 1) return { text: 'Mañana', className: 'pill-orange' };
    if (days <= 3) return { text: `En ${days} días`, className: 'pill-gold' };
    return { text: `En ${days} días`, className: 'pill-green' };
  };

  const urgency = nextTask ? getUrgencyBadge(nextTask.daysRemaining) : null;

  return (
    <section className="hero-banner">
      <div className="hero-content">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <h2 className="hero-title" id="heroGreetingTitle" style={{ margin: 0 }}>
            <span id="heroGreetingTime">{getGreeting()}</span>,{' '}
            <span className="gradient-text">{userName}</span>
          </h2>
          {onRenameUser && (
            <button
              type="button"
              onClick={onRenameUser}
              title="Personalizar tu nombre en la agenda"
              style={{
                fontSize: '0.78rem',
                fontWeight: 600,
                padding: '0.25rem 0.65rem',
                borderRadius: '8px',
                border: '1px solid var(--border-subtle, #cbd5e1)',
                background: 'var(--bg-card, #ffffff)',
                color: 'var(--text-muted, #475569)',
                cursor: 'pointer'
              }}
            >
              ✏️ Cambiar nombre
            </button>
          )}
        </div>
        <p className="hero-subtitle">
          Agenda académica interactiva para <strong>IOC</strong> y <strong>UOC</strong>. Organiza tus asignaturas, estudia con el Libro Digital con TOC dinámico, resuelve tus EACs/PECs paso a paso y sincroniza tus entregas con tu calendario (<code>.ics</code>).
        </p>

        <div className="hero-stats-grid">
          <div className="hero-stat-card">
            <div className="stat-icon-wrap">🎓</div>
            <div>
              <div className="stat-val">{IOC_SUBJECTS.length}</div>
              <div className="stat-label">Materias IOC</div>
            </div>
          </div>

          <div className="hero-stat-card">
            <div className="stat-icon-wrap">🏛️</div>
            <div>
              <div className="stat-val">{UOC_SUBJECTS.length}</div>
              <div className="stat-label">Materias UOC</div>
            </div>
          </div>

          <div className="hero-stat-card">
            <div className="stat-icon-wrap">📅</div>
            <div>
              <div className="stat-val">{tasksCount > 0 ? tasksCount : '0'}</div>
              <div className="stat-label">Entregas Activas</div>
            </div>
          </div>

          <div className="hero-stat-card hero-stat-next" id="nextDeliveryCard">
            <div className="stat-icon-wrap">📬</div>
            <div>
              <div
                className="stat-val"
                id="nextDeliveryDate"
                style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}
              >
                <span>{nextTask ? (nextTask.formattedDate || '--') : '--'}</span>
                {urgency && (
                  <span
                    className={`pill-badge ${urgency.className}`}
                    style={{ fontSize: '0.7rem', padding: '0.12rem 0.45rem', fontWeight: 700 }}
                  >
                    {urgency.text}
                  </span>
                )}
              </div>
              <div
                className="stat-label"
                id="nextDeliveryLabel"
                style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.2rem', flexWrap: 'wrap' }}
              >
                {nextTask ? (
                  <>
                    <span className="pill-badge pill-green" id="nextDeliveryBadge">
                      {nextTask.badge}
                    </span>
                    <span id="nextDeliveryTask" style={{ fontWeight: 600, color: 'var(--text-title)' }}>
                      {nextTask.task || nextTask.course}
                    </span>
                  </>
                ) : (
                  <span style={{ color: 'var(--text-secondary)' }}>Sin entregas pendientes</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
