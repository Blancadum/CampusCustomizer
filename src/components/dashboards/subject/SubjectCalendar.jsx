import React, { useState, useMemo } from 'react';

export default function SubjectCalendar({
  events = [],
  eacs = [],
  showMobileCalendar,
  setShowMobileCalendar
}) {
  const [calendarDate, setCalendarDate] = useState(() => new Date());

  const handlePrevMonth = () => {
    setCalendarDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCalendarDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const calendarInfo = useMemo(() => {
    const today = new Date();
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
    const currentDay = isCurrentMonth ? today.getDate() : null;
    const monthLong = calendarDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' });
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const startOffset = firstDay === 0 ? 6 : firstDay - 1;
    return { year, month, currentDay, monthLong, daysInMonth, startOffset };
  }, [calendarDate]);

  const { year, month, startOffset, daysInMonth, currentDay, monthLong } = calendarInfo;

  // Mapa de eventos agrupados por número de día
  const dayEventsMap = useMemo(() => {
    const map = {};

    if (Array.isArray(events)) {
      events.forEach(evt => {
        if (!evt.date) return;
        const parts = evt.date.split('-').map(Number);
        if (parts.length === 3 && parts[0] === year && (parts[1] - 1) === month) {
          const dayNum = parts[2];
          map[dayNum] = map[dayNum] || [];
          map[dayNum].push(evt);
        }
      });
    }

    if (Array.isArray(eacs)) {
      eacs.forEach(eac => {
        if (eac.dueDate) {
          const parts = eac.dueDate.split('-').map(Number);
          if (parts.length === 3 && parts[0] === year && (parts[1] - 1) === month) {
            const dayNum = parts[2];
            map[dayNum] = map[dayNum] || [];
            if (!map[dayNum].some(e => e.type === 'entrega')) {
              map[dayNum].push({ type: 'entrega', title: eac.title, time: '23:55' });
            }
          }
        }
        if (eac.publishDate) {
          const parts = eac.publishDate.split('-').map(Number);
          if (parts.length === 3 && parts[0] === year && (parts[1] - 1) === month) {
            const dayNum = parts[2];
            map[dayNum] = map[dayNum] || [];
            if (!map[dayNum].some(e => e.type === 'inicio_eac')) {
              map[dayNum].push({ type: 'inicio_eac', title: `Enunciado: ${eac.title}`, time: '00:00' });
            }
          }
        }
      });
    }

    return map;
  }, [events, eacs, year, month]);

  // Generación de celdas
  const cells = [];
  for (let i = 0; i < startOffset; i++) {
    cells.push(<div key={`empty-${i}`} className="calendar-empty-cell" />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = day === currentDay;
    const dayEvents = dayEventsMap[day] || [];
    const hasEntrega = dayEvents.some(e => e.type === 'entrega');
    const hasInicio = dayEvents.some(e => e.type === 'inicio_eac');
    const hasLeccion = dayEvents.some(e => e.type === 'leccion');
    const hasNotas = dayEvents.some(e => e.type === 'notas');

    let tooltip = undefined;
    if (dayEvents.length > 0) {
      tooltip = dayEvents.map(e => {
        const icon = e.type === 'entrega' ? '🚨 Entrega' :
                     e.type === 'inicio_eac' ? '🚀 Inicio Tarea' :
                     e.type === 'leccion' ? '📖 Apertura Lección' :
                     e.type === 'notas' ? '📊 Notas' : '📌';
        return `${icon}: ${e.title} (${e.time || ''})`.trim();
      }).join('\n');
    } else if (isToday) {
      tooltip = 'Hoy';
    }

    let cellClass = 'calendar-day-cell';
    if (hasEntrega) {
      cellClass += ' is-entrega';
    } else if (hasInicio && hasLeccion) {
      cellClass += ' is-inicio-leccion';
    } else if (hasInicio) {
      cellClass += ' is-inicio';
    } else if (hasLeccion) {
      cellClass += ' is-leccion';
    } else if (hasNotas) {
      cellClass += ' is-notas';
    } else if (isToday) {
      cellClass += ' is-today';
    }

    cells.push(
      <div 
        key={day} 
        title={tooltip} 
        className={cellClass}
        style={{ cursor: dayEvents.length > 0 ? 'help' : 'default' }}
      >
        {day}
      </div>
    );
  }

  // Rellenar exactamente hasta 42 celdas (6 semanas de 7 días) para estabilidad de layout
  while (cells.length < 42) {
    cells.push(
      <div 
        key={`empty-trailing-${cells.length}`} 
        className="calendar-empty-cell trailing" 
      />
    );
  }

  return (
    <div className={`desktop-calendar ${showMobileCalendar ? 'modal-active' : ''}`}>
      {showMobileCalendar && (
        <button 
          className="calendar-close-btn"
          onClick={() => setShowMobileCalendar(false)} 
          aria-label="Cerrar calendario"
        >
          ✖
        </button>
      )}

      {/* Cabecera interactiva con navegación de mes */}
      <div className="calendar-header-nav">
        <button
          type="button"
          onClick={handlePrevMonth}
          title="Mes anterior"
          aria-label="Mes anterior"
          className="calendar-nav-btn"
        >
          ◀
        </button>

        <div className="calendar-month-title">
          📅 {monthLong}
        </div>

        <button
          type="button"
          onClick={handleNextMonth}
          title="Mes siguiente"
          aria-label="Mes siguiente"
          className="calendar-nav-btn"
        >
          ▶
        </button>
      </div>

      {/* Días de la semana y celdas */}
      <div className="calendar-grid">
        {['L','M','X','J','V','S','D'].map(d => (
          <div key={d} className="calendar-weekday-header">{d}</div>
        ))}
        {cells}
      </div>

      {/* Leyenda visual del calendario */}
      <div className="calendar-legend">
        <span className="legend-item" title="Vencimiento límite para entregar la actividad">
          <span className="legend-dot is-entrega"></span>
          <span className="legend-label">Entrega</span>
        </span>
        <span className="legend-item" title="Publicación de enunciado o inicio de plazo">
          <span className="legend-dot is-inicio"></span>
          <span className="legend-label">Inicio EAC</span>
        </span>
        <span className="legend-item" title="Apertura de nuevos temas o lecciones">
          <span className="legend-dot is-leccion"></span>
          <span className="legend-label">Lección</span>
        </span>
      </div>
    </div>
  );
}
