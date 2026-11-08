import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import defaultTeacherPhotos from '../../../config/teacherPhotos.js';

export default function SubjectHeaderControls({
  data,
  teacherPhotos = defaultTeacherPhotos,
  activeBloque,
  setActiveBloque,
  activeEacId,
  setActiveEacId,
  onOpenMobileCalendar
}) {
  const navigate = useNavigate();
  const todayDay = new Date().getDate();

  return (
    <div className="controls-row">
      {/* PROFESORES */}
      {data.teachers && data.teachers.length > 0 && (
        <div className="teachers-container">
          {data.teachers.map((teacher, idx) => (
            <a 
              key={idx}
              href={teacher.mailLink} 
              target="_blank" 
              rel="noopener noreferrer"
              title={`Enviar mensaje a ${teacher.name}`}
              className="teacher-avatar-card"
            >
              <img 
                src={teacherPhotos[teacher.photoKey]} 
                alt={`Profesor/a ${teacher.name}`} 
                className="teacher-avatar-img"
                loading="lazy"
                decoding="async"
              />
              <span className="teacher-avatar-name">
                {teacher.name}
              </span>
            </a>
          ))}
        </div>
      )}

      {/* PROGRESO GENERAL */}
      <div className="progress-col">
        <div className="progress-label">
          Progreso General
        </div>
        <div className="progress-track">
          <div 
            className="progress-fill"
            style={{ width: `${data.progress}%` }}
          />
        </div>
        <div className="progress-percentage">
          {data.progress}%
        </div>
      </div>

      {/* BOTÓN MÓVIL PARA VER CALENDARIO */}
      <button 
        type="button"
        className="mobile-calendar-btn"
        onClick={onOpenMobileCalendar}
        aria-label="Abrir calendario del mes"
      >
        📅 {todayDay}
      </button>

      {/* BOTONES DE ACCIÓN: LIBRO, ACTIVIDADES, BLOQUES */}
      <div className="action-buttons-group">
        <Link 
          to={data.theoryRoute ? `${data.theoryRoute}#${activeBloque}` : `/ioc/${data.id}/lecciones-${data.id}/#${activeBloque}`} 
          className="header-btn header-btn-book"
        >
          📖 Libro
        </Link>

        {/* SELECTOR ACTIVIDADES */}
        <select 
          className="header-btn header-btn-select"
          value={activeEacId} 
          onChange={(e) => setActiveEacId(e.target.value)}
        >
          <option value="" disabled>ACTIVIDADES</option>
          {data.eacs && data.eacs.map(eac => (
            <option key={eac.id} value={eac.id}>{eac.title.split(':')[0]}</option>
          ))}
        </select>

        {/* SELECTOR BLOQUES */}
        <select
          className="header-btn header-btn-select"
          value={activeBloque}
          onChange={(e) => {
            setActiveBloque(e.target.value);
            const baseRoute = data.theoryRoute || `/ioc/${data.id}/lecciones-${data.id}/`;
            navigate(`${baseRoute}#${e.target.value}`);
          }}
        >
          {(data.blocks || [
            { id: 'bloque1', label: 'BLOQUE 1' },
            { id: 'bloque2', label: 'BLOQUE 2' },
            { id: 'bloque3', label: 'BLOQUE 3' }
          ]).map(b => (
            <option key={b.id} value={b.id}>{b.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
