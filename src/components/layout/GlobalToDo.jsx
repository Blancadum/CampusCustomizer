import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './GlobalToDo.css';

export default function GlobalToDo() {
  const location = useLocation();
  const [tasks, setTasks] = useState(() => {
    try {
      const cached = sessionStorage.getItem('micampus_tasks_cache');
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);
  const [removedTasks, setRemovedTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('micampus_removed_tasks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  
  useEffect(() => {
    fetch('/data/tasks.json')
      .then(res => res.json())
      .then(data => {
        setTasks(data);
        try {
          sessionStorage.setItem('micampus_tasks_cache', JSON.stringify(data));
        } catch {}
      })
      .catch(() => {});
  }, []);

  const removeTask = (id) => {
    const newRemoved = [...removedTasks, id];
    setRemovedTasks(newRemoved);
    localStorage.setItem('micampus_removed_tasks', JSON.stringify(newRemoved));
  };

  const restoreTasks = () => {
    setRemovedTasks([]);
    localStorage.removeItem('micampus_removed_tasks');
  };

  // Filtrar y calcular días restantes memoizado
  const validTasks = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return tasks
      .map(t => {
        const d = new Date(t.date);
        const diffTime = d - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return { ...t, d, diffDays };
      })
      .filter(t => t.diffDays >= 0 && !removedTasks.includes(t.id) && !t.done)
      .sort((a, b) => a.d - b.d);
  }, [tasks, removedTasks]);

  // Agrupar por mes memoizado
  const grouped = useMemo(() => {
    return validTasks.reduce((acc, t) => {
      const month = t.d.toLocaleString('es-ES', { month: 'long', year: 'numeric' });
      if (!acc[month]) acc[month] = [];
      acc[month].push(t);
      return acc;
    }, {});
  }, [validTasks]);

  // Cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // No renderizar en el visor de lecciones, tutorías, actividades o cursos para evitar solapamientos con el menú lateral
  const isLessonLikeView = 
    location.pathname.includes('/tutorias') ||
    location.pathname.includes('/actividades') ||
    location.pathname.includes('/springboot') ||
    location.pathname.includes('/petete') ||
    location.pathname.includes('/lesson') ||
    location.pathname.includes('/topic');
  if (isLessonLikeView) return null;

  if (validTasks.length === 0 && removedTasks.length === 0) return null;

  return (
    <div 
      className={`global-todo-container ${isOpen ? 'is-open' : ''}`}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Icon Tab */}
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        className="global-todo-tab"
        title={isOpen ? "Cerrar calendario de entregas" : "Abrir calendario de entregas"}
        aria-label={isOpen ? "Cerrar calendario de entregas" : "Abrir calendario de entregas"}
        aria-expanded={isOpen}
      >
        <span className="global-todo-tab-icon">📅</span>
        <span className="global-todo-tab-count">{validTasks.length}</span>
      </button>

      {/* Expanded Menu */}
      <div 
        className={`global-todo-drawer ${isOpen ? 'is-open' : ''}`}
        aria-hidden={!isOpen}
      >
        <div className="global-todo-content">
          <div className="global-todo-header">
            <span className="global-todo-title">
              <span>📅</span> Calendario de Entregas
            </span>
            <div className="global-todo-header-actions">
              <span className="global-todo-badge">{validTasks.length} pendientes</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="global-todo-close-btn"
                title="Cerrar panel"
                aria-label="Cerrar panel"
              >
                ✕
              </button>
            </div>
          </div>
          
          {Object.entries(grouped).map(([month, monthTasks]) => (
            <div key={month} className="global-todo-month-group">
              <div className="global-todo-month-label">
                {month}
              </div>
              
              <div className="global-todo-tasks-list">
                {monthTasks.map(t => (
                  <div key={t.id} className="global-todo-task-row">
                    <div className="global-todo-task-info">
                      <span 
                        className="global-todo-task-dot" 
                        style={{ backgroundColor: t.color || 'var(--accent-purple)' }} 
                      />
                      <Link 
                        to={t.link} 
                        title={t.tooltip || t.task}
                        className="global-todo-task-link"
                      >
                        <strong>{t.course}</strong> · {t.task}
                      </Link>
                    </div>

                    <div className="global-todo-task-date">
                      {t.d.getDate().toString().padStart(2, '0')}/{(t.d.getMonth()+1).toString().padStart(2, '0')}
                    </div>

                    <div className="global-todo-task-weight">
                      {t.weight}
                    </div>
                    
                    <div className={`global-todo-task-days ${t.diffDays <= 7 ? 'urgent' : 'normal'}`}>
                      {t.diffDays}d
                    </div>

                    <button 
                      onClick={() => removeTask(t.id)}
                      title="Marcar como completado"
                      aria-label={`Completar tarea ${t.task}`}
                      className="global-todo-delete-btn"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {removedTasks.length > 0 && (
            <div className="global-todo-footer">
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {removedTasks.length} completadas
              </span>
              <button
                type="button"
                onClick={restoreTasks}
                className="global-todo-restore-btn"
              >
                Restaurar todas
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
