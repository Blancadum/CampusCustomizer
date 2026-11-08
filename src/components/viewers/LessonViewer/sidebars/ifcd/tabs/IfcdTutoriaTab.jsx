import React from 'react';

/**
 * IfcdTutoriaTab
 * Ficha de tutoría con datos del tutor (Javier García Lobo), horario, soporte y contacto.
 */
export default function IfcdTutoriaTab({ tutor }) {
  if (!tutor) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      <div style={{
        padding: '1rem',
        borderRadius: '12px',
        background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.12) 0%, rgba(249, 115, 22, 0.05) 100%)',
        border: '1px solid rgba(234, 88, 12, 0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.8rem'
      }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          background: '#ea580c',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.2rem',
          fontWeight: 800
        }}>
          JG
        </div>
        <div>
          <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-title)' }}>
            {tutor.nombre}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#ea580c', fontWeight: 600 }}>
            Tutor Oficial de la Especialidad
          </div>
        </div>
      </div>

      <div style={{
        padding: '0.85rem',
        borderRadius: '10px',
        background: 'var(--bg-subtle)',
        border: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        fontSize: '0.78rem'
      }}>
        <div><strong>⏰ Horario Tutoría:</strong> {tutor.horario}</div>
        <div><strong>⏳ Plazo de Respuesta:</strong> {tutor.plazoRespuesta}</div>
        <div><strong>🚫 Días no lectivos:</strong> {tutor.diasNoLectivos}</div>
        <div>
          <strong>📞 Teléfono Gratuito:</strong>{' '}
          <a href={`tel:${tutor.telefonoSoporte?.replace(/\s+/g, '')}`} style={{ color: '#ea580c', fontWeight: 700 }}>
            {tutor.telefonoSoporte}
          </a> ({tutor.horarioTelefono})
        </div>
        <div>
          <strong>📧 Soporte Técnico:</strong>{' '}
          <a href={`mailto:${tutor.emailSoporte}`} style={{ color: '#ea580c' }}>
            {tutor.emailSoporte}
          </a>
        </div>
      </div>
    </div>
  );
}
