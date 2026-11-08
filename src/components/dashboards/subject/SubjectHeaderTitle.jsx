import React from 'react';

/**
 * Componente que renderiza la fila de encabezado y título de la asignatura
 * con su icono, título adaptable (desktop/tablet) y subtítulo institucional.
 * 
 * Props:
 * - data: { icon, title } (opcional si se pasan props individuales)
 * - icon: string (emoji o icono)
 * - title: string (nombre completo de la asignatura)
 * - subtitle: string (opcional)
 * - themeColor: string (opcional, por defecto 'var(--subject-color)')
 */
export default function SubjectHeaderTitle({
  data,
  icon,
  title,
  subtitle = 'Campus Oficial IOC · Módulo Profesional',
  themeColor = 'var(--subject-color)'
}) {
  const finalIcon = icon || data?.icon || '📚';
  const finalTitle = title || data?.title || 'Asignatura';
  const shortTitle = finalTitle.split(' ')[0];

  return (
    <div 
      className="title-row" 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '1.5rem', 
        marginBottom: '2rem' 
      }}
    >
      <div 
        className="title-icon" 
        style={{ 
          fontSize: '3rem', 
          background: themeColor, 
          width: '80px', 
          height: '80px', 
          minWidth: '80px', 
          flexShrink: 0, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          borderRadius: '50%' 
        }}
      >
        {finalIcon}
      </div>
      <div>
        <h1 style={{ margin: 0, fontSize: '2.8rem', color: 'var(--text-title)', fontWeight: '800' }}>
          <span className="desktop-title">{finalTitle}</span>
          <span className="tablet-title" style={{ display: 'none' }}>{shortTitle}</span>
        </h1>
        {subtitle && (
          <p style={{ margin: '0.4rem 0 0', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
