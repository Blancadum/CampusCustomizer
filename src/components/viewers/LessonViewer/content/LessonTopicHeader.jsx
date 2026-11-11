import React from 'react';

/**
 * Cabecera contextual moderna con badges de materia, unidad, tema y el H1 principal.
 */
export default function LessonTopicHeader({
  title,
  activeTopic,
  displayTitle,
  themeColor
}) {
  return (
    <header style={{ marginBottom: '1.8rem' }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.6rem', 
        flexWrap: 'wrap',
        marginBottom: '0.9rem'
      }}>
        {/* Badge Asignatura */}
        <span style={{ 
          background: 'var(--bg-card)', 
          border: '1px solid var(--border-subtle)', 
          color: 'var(--text-muted)',
          padding: '0.2rem 0.6rem', 
          borderRadius: '6px', 
          fontSize: '0.78rem', 
          fontWeight: 600,
          letterSpacing: '0.5px',
          textTransform: 'uppercase'
        }}>
          {title}
        </span>

        {/* Badge Unidad */}
        {activeTopic.moduleShort && (
          <span className="lesson-topic-tag" style={{ 
            background: `${themeColor}15`, 
            border: `1px solid ${themeColor}35`, 
            color: themeColor,
            padding: '0.2rem 0.6rem', 
            borderRadius: '6px', 
            fontSize: '0.78rem', 
            fontWeight: 700 
          }}>
            {activeTopic.moduleShort}
          </span>
        )}

        {/* Bloque temático */}
        {activeTopic.temaTitle && activeTopic.temaTitle !== 'Introducción' && (
          <span style={{ 
            fontSize: '0.85rem', 
            color: 'var(--text-muted)', 
            fontWeight: 500,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}>
            <span style={{ opacity: 0.5 }}>•</span>
            <span>{activeTopic.temaTitle}</span>
          </span>
        )}
      </div>

      {/* H1 Principal Único */}
      <h1 style={{ 
        fontSize: '2.2rem', 
        fontWeight: 800,
        color: 'var(--text-title)', 
        margin: '0 0 1rem', 
        lineHeight: 1.25,
        letterSpacing: '-0.02em',
        borderBottom: '2px solid var(--border-subtle)',
        paddingBottom: '1rem'
      }}>
        {displayTitle}
      </h1>
    </header>
  );
}
