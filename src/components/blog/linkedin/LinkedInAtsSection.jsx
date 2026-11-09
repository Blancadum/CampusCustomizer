import React from 'react';

/**
 * Secciones 1 y 2: El Nuevo Paradigma y la comparativa de filtros ATS.
 */
export default function LinkedInAtsSection() {
  return (
    <>
      {/* SECCIÓN 1: EL NUEVO PARADIGMA */}
      <article style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
          <span style={{ fontSize: '1.6rem' }}>🎯</span>
          <h2 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--text-title)' }}>
            1. El Nuevo Paradigma: De la Cantidad Masiva a la Precisión Láser
          </h2>
        </div>
        <p style={{ lineHeight: '1.7', color: 'var(--text-main)', fontSize: '1rem' }}>
          La época romántica de imprimir cientos de currículums en papel o enviar el mismo documento PDF a cuarenta ofertas distintas está muerta y enterrada. Aquello era un juego de volumen; hoy el mercado laboral es <strong>un juego de pura estrategia algorítmica</strong>.
        </p>
        <div style={{ 
          background: 'rgba(234, 88, 12, 0.08)', 
          borderLeft: '4px solid #ea580c', 
          padding: '1rem 1.25rem', 
          borderRadius: '4px', 
          margin: '1.25rem 0',
          fontStyle: 'italic',
          color: 'var(--text-main)'
        }}>
          "Cada candidatura que envías debe ser diseñada como un tiro de precisión láser: concebida primero para satisfacer a una máquina, y solo si la superas, llegará a los ojos de un ser humano."
        </div>
      </article>

      {/* SECCIÓN 2: LA FORTALEZA DIGITAL (ATS) */}
      <article style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
          <span style={{ fontSize: '1.6rem' }}>🤖</span>
          <h2 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--text-title)' }}>
            2. La Fortaleza Digital: Los ATS como "Porteros de Discoteca"
          </h2>
        </div>
        <p style={{ lineHeight: '1.7', color: 'var(--text-main)', fontSize: '1rem' }}>
          Un <strong>ATS (*Applicant Tracking System*)</strong> es un software de cribaje que actúa como el portero implacable de una discoteca digital. No tiene intuición, no empatiza con tus ganas de aprender y no busca al candidato con mayor vocación. <strong>Busca únicamente la coincidencia estricta de palabras clave (*keyword matching*) con la oferta de trabajo.</strong>
        </p>

        {/* Comparativa Visual ATS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
          <div style={{ padding: '1.25rem', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '10px' }}>
            <div style={{ fontWeight: 'bold', color: '#ef4444', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span>❌ Lo que el ATS descarta al instante</span>
            </div>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
              <li>Currículums con plantillas gráficas complejas o texto dentro de imágenes.</li>
              <li>Tablas anidadas y columnas múltiples que desordenan el parser.</li>
              <li>Falta de los términos exactos solicitados (ej: pedir "Spring Boot" y poner solo "Java").</li>
              <li>CVs genéricos sin adaptar a las tecnologías de la oferta.</li>
            </ul>
          </div>

          <div style={{ padding: '1.25rem', background: 'rgba(34, 197, 94, 0.08)', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: '10px' }}>
            <div style={{ fontWeight: 'bold', color: '#22c55e', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span>✅ Lo que maximiza tu "Match Score"</span>
            </div>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
              <li>Keywords técnicas repetidas de forma natural en habilidades y proyectos.</li>
              <li>Documentos con encabezados canónicos (Experiencia, Proyectos, Habilidades).</li>
              <li>Verbos de acción cuantificados (Desarrollado, Desplegado, Reducido un 20%).</li>
              <li>Formato PDF o DOCX limpio, mono-columna y texto seleccionable.</li>
            </ul>
          </div>
        </div>
      </article>
    </>
  );
}
