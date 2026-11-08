import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Panel para los modos Teoría (Spring Boot) o Actividades (Bootcamp Accenture).
 */
export default function TheoryActivitiesPanel({
  isTheoryMode,
  items,
  activityStatus
}) {
  return (
    <>
      {/* Acceso directo a la miniweb del Framework: Spring Boot Initializr & FAQ */}
      <Link
        to="/springboot/primeros-pasos"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          padding: '0.65rem 0.8rem',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.16) 0%, rgba(14, 165, 233, 0.12) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.35)',
          textDecoration: 'none',
          color: 'var(--text-title)',
          marginBottom: '0.85rem',
          transition: 'all 0.2s ease',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}
        title="Abrir miniweb: Spring Boot Initializr & Fundamentos"
      >
        <div style={{ 
          width: '30px', 
          height: '30px', 
          borderRadius: '8px', 
          background: 'rgba(16, 185, 129, 0.2)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          fontSize: '1.1rem'
        }}>
          🌱
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#10b981' }}>
            Spring Initializr & FAQ
          </span>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            Primeros pasos & Fundamentos Java
          </span>
        </div>
        <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 'bold' }}>➔</span>
      </Link>

      {/* Acceso a Vídeos Recomendados Accenture (Marco Contextual Teórico) */}
      <Link
        to="/accenture/videos"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          padding: '0.65rem 0.8rem',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.16) 0%, rgba(2, 132, 199, 0.12) 100%)',
          border: '1px solid rgba(6, 182, 212, 0.35)',
          textDecoration: 'none',
          color: 'var(--text-title)',
          marginBottom: '0.85rem',
          transition: 'all 0.2s ease',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}
        title="Abrir sección de vídeos teóricos recomendados por Accenture"
      >
        <div style={{ 
          width: '30px', 
          height: '30px', 
          borderRadius: '8px', 
          background: 'rgba(6, 182, 212, 0.2)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          fontSize: '1.1rem'
        }}>
          🎬
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#06b6d4' }}>
            Vídeos Accenture & Tutorías
          </span>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            Marco teórico UPM: Módulos 0, 1 y 2
          </span>
        </div>
        <span style={{ fontSize: '0.75rem', color: '#06b6d4', fontWeight: 'bold' }}>➔</span>
      </Link>

      <p style={{ margin: '0 0 0.8rem', fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
        {isTheoryMode 
          ? 'Consulta rápida de conceptos teóricos:' 
          : `Acceso directo a las ${items.length} actividades del bootcamp:`}
      </p>

      {/* Lista scrollable */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.4rem', paddingRight: '0.2rem' }}>
        {isTheoryMode ? (
          // Items de teoría
          items.map((topic, idx) => (
            <Link
              key={topic.id || idx}
              to={`/java/springboot#${topic.slug}`}
              onClick={() => {
                const el = document.getElementById(topic.slug);
                if (el) el.scrollIntoView({ behavior: 'auto' });
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 0.65rem',
                borderRadius: '8px',
                textDecoration: 'none',
                background: 'var(--bg-hover)',
                color: 'var(--text-main)',
                fontSize: '0.82rem',
                transition: 'all 0.15s ease'
              }}
            >
              <span style={{ fontWeight: 'bold', color: '#0ea5e9', fontSize: '0.75rem', minWidth: '18px' }}>
                {idx + 1}.
              </span>
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {topic.title}
              </span>
            </Link>
          ))
        ) : (
          // Items de actividades
          items.map((act) => {
            const status = activityStatus[act.id] || (act.status === 'proximamente' ? 'Próx.' : 'Pend.');
            const isDone = status === 'Entregada';

            return (
              <Link
                key={act.id}
                to={`/accenture/actividades/${act.slug}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.55rem 0.65rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  background: 'var(--bg-hover)',
                  border: isDone ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid transparent',
                  color: 'var(--text-main)',
                  fontSize: '0.82rem',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflow: 'hidden' }}>
                  <span style={{ 
                    fontWeight: 'bold', 
                    color: isDone ? '#10b981' : '#8b5cf6',
                    fontSize: '0.75rem', 
                    minWidth: '18px' 
                  }}>
                    {act.numero}.
                  </span>
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {act.shortTitle ? act.shortTitle.replace(/^[0-9]+\.\s*/, '') : act.title}
                  </span>
                </div>

                <span style={{ 
                  fontSize: '0.68rem', 
                  padding: '0.15rem 0.4rem', 
                  borderRadius: '4px', 
                  background: isDone ? 'rgba(16, 185, 129, 0.15)' : 'rgba(148, 163, 184, 0.15)',
                  color: isDone ? '#10b981' : 'var(--text-muted)',
                  fontWeight: 'bold',
                  flexShrink: 0
                }}>
                  {status}
                </span>
              </Link>
            );
          })
        )}
      </div>

      {/* Enlace al otro curso */}
      <div style={{ marginTop: '0.8rem', paddingTop: '0.8rem', borderTop: '1px solid var(--border-subtle)' }}>
        <Link
          to={isTheoryMode ? '/java/springboot' : '/accenture/actividades'}
          className="theme-btn"
          style={{
            display: 'block',
            textAlign: 'center',
            textDecoration: 'none',
            padding: '0.5rem',
            fontSize: '0.82rem',
            fontWeight: 'bold'
          }}
        >
          {isTheoryMode ? 'Ver Guía Teórica Completa →' : 'Ver Todas las Actividades →'}
        </Link>
      </div>
    </>
  );
}
