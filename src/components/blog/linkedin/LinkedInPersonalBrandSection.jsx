import React from 'react';

/**
 * Secciones 4, 5 y 6: Marca Personal, Competencias del SEPE y el Modelo de las 3 Cs.
 */
export default function LinkedInPersonalBrandSection() {
  return (
    <>
      {/* SECCIÓN 4: MARCA PERSONAL VS CV */}
      <article style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
          <span style={{ fontSize: '1.6rem' }}>🚀</span>
          <h2 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--text-title)' }}>
            4. Marca Personal: El Tráiler Dinámico de tu Futuro
          </h2>
        </div>
        <p style={{ lineHeight: '1.7', color: 'var(--text-main)', fontSize: '1rem' }}>
          La diferencia entre un currículum convencional y la marca personal es conceptualmente demoledora:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginTop: '1.25rem' }}>
          <div style={{ padding: '1.5rem', background: 'var(--bg-hover)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📸</div>
            <h3 style={{ margin: '0 0 0.5rem', color: 'var(--text-title)', fontSize: '1.1rem' }}>El Currículum Tradicional</h3>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              Es una simple foto estática de tu pasado. Describe de dónde vienes, qué estudiaste y qué hiciste. Solo se activa si tú tomas la iniciativa de enviarlo a un buzón.
            </p>
          </div>

          <div style={{ padding: '1.5rem', background: 'rgba(147, 51, 234, 0.08)', borderRadius: '12px', border: '1px solid rgba(147, 51, 234, 0.3)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎬</div>
            <h3 style={{ margin: '0 0 0.5rem', color: '#9333ea', fontSize: '1.1rem' }}>La Marca Personal</h3>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
              Es el tráiler dinámico de tu película profesional. Es una promesa viva de qué valor serás capaz de aportar mañana. Atrae oportunidades de forma pasiva (*inbound*) las 24 horas del día.
            </p>
          </div>
        </div>
      </article>

      {/* SECCIÓN 5: HARD SKILLS VS SOFT SKILLS (DATOS DEL SEPE) */}
      <article style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
          <span style={{ fontSize: '1.6rem' }}>📊</span>
          <h2 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--text-title)' }}>
            5. Hard Skills vs. Soft Skills: El Diagnóstico Oficial del SEPE
          </h2>
        </div>
        <p style={{ lineHeight: '1.7', color: 'var(--text-main)', fontSize: '1rem' }}>
          Existe un mantra imprescindible que debes interiorizar antes de tu próxima entrevista:
        </p>

        <blockquote style={{ 
          margin: '1.25rem 0', 
          padding: '1.25rem', 
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(147, 51, 234, 0.08) 100%)', 
          borderLeft: '4px solid #3b82f6', 
          borderRadius: '6px', 
          fontSize: '1.1rem', 
          fontWeight: 600, 
          color: 'var(--text-title)',
          lineHeight: '1.6'
        }}>
          "Las habilidades técnicas (hard skills) te abren la puerta de la entrevista. Pero son tus habilidades personales (soft skills) las que realmente te consiguen el puesto, la promoción y consolidan tu carrera profesional."
        </blockquote>

        <p style={{ lineHeight: '1.7', color: 'var(--text-main)', fontSize: '1rem' }}>
          Según el informe oficial del <strong>Servicio Público de Empleo Estatal (SEPE)</strong>, casi el 50% de las competencias decisivas en la selección final no son técnicas, sino sociales y comunicativas. Las tres competencias estrella son:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ padding: '1rem', background: 'var(--bg-hover)', borderRadius: '10px', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>⚡</div>
            <div style={{ fontWeight: 'bold', color: 'var(--text-title)', marginBottom: '0.2rem' }}>Proactividad</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Anticiparse a fallos, no esperar órdenes pasivas y proponer soluciones.</div>
          </div>
          <div style={{ padding: '1rem', background: 'var(--bg-hover)', borderRadius: '10px', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>🤝</div>
            <div style={{ fontWeight: 'bold', color: 'var(--text-title)', marginBottom: '0.2rem' }}>Trabajo en Equipo</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Compartir conocimientos en Git/Jira y priorizar la meta común.</div>
          </div>
          <div style={{ padding: '1rem', background: 'var(--bg-hover)', borderRadius: '10px', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>🛡️</div>
            <div style={{ fontWeight: 'bold', color: 'var(--text-title)', marginBottom: '0.2rem' }}>Compromiso</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Rigor técnico, responsabilidad en plazos y calidad de entregas.</div>
          </div>
        </div>
      </article>

      {/* SECCIÓN 6: EL MODELO DE LAS 3 Cs & IA */}
      <article style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
          <span style={{ fontSize: '1.6rem' }}>💎</span>
          <h2 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--text-title)' }}>
            6. El Modelo de las 3 Cs y la Complementariedad con la IA
          </h2>
        </div>
        <p style={{ lineHeight: '1.7', color: 'var(--text-main)', fontSize: '1rem' }}>
          Para triunfar en equipos multidisciplinares, quédate con el <strong>Modelo de las 3 Cs</strong>:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', margin: '1.5rem 0' }}>
          <div style={{ padding: '1.25rem', background: 'rgba(234, 88, 12, 0.06)', borderRadius: '10px', border: '1px solid rgba(234, 88, 12, 0.2)' }}>
            <div style={{ fontWeight: 'bold', color: '#ea580c', marginBottom: '0.4rem' }}>1. Comunicación Abierta</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
              Honestidad técnica, capacidad de pedir ayuda sin miedo ante bloqueos y retroalimentación transparente.
            </div>
          </div>
          <div style={{ padding: '1.25rem', background: 'rgba(147, 51, 234, 0.06)', borderRadius: '10px', border: '1px solid rgba(147, 51, 234, 0.2)' }}>
            <div style={{ fontWeight: 'bold', color: '#9333ea', marginBottom: '0.4rem' }}>2. Colaboración Real</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
              Alinear esfuerzos como un solo bloque. Si un compañero tropieza con un bug, el equipo entero responde.
            </div>
          </div>
          <div style={{ padding: '1.25rem', background: 'rgba(16, 185, 129, 0.06)', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <div style={{ fontWeight: 'bold', color: '#10b981', marginBottom: '0.4rem' }}>3. Compromiso Indestructible</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
              Cumplimiento ético de acuerdos y excelencia en cada commit, prueba unitaria o despliegue.
            </div>
          </div>
        </div>

        <div style={{ 
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', 
          color: '#f8fafc', 
          padding: '1.75rem', 
          borderRadius: '12px', 
          marginTop: '1.5rem' 
        }}>
          <h3 style={{ margin: '0 0 0.6rem', color: '#38bdf8', fontSize: '1.15rem' }}>
            💡 La Pregunta Definitiva: No competir contra la IA, complementarla
          </h3>
          <p style={{ margin: 0, lineHeight: '1.65', fontSize: '0.95rem', color: '#cbd5e1' }}>
            En un entorno donde la inteligencia artificial escribe código estándar a velocidad de la luz y los ATS filtran candidatos en microsegundos, tus cualidades profundamente humanas —<strong>la creatividad, la empatía, el pensamiento crítico y el liderazgo ético</strong>— son tu activo más valioso.
            <br /><br />
            La pregunta para diseñar tu futuro ya no es <em>"¿qué pide el mercado?"</em>, sino: <strong>¿cuál de estas competencias clave comenzarás a entrenar hoy mismo?</strong>
          </p>
        </div>
      </article>
    </>
  );
}
