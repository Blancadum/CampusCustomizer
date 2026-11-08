import React, { useState, useEffect, useMemo } from 'react';
import { IocActivitiesRepository } from '../../../../data/models/IocActivityModel';
import IocActivitiesHeader from './ioc/IocActivitiesHeader';
import IocActivitiesTabs from './ioc/IocActivitiesTabs';
import IocActivityCard from './ioc/IocActivityCard';
import IocActivitySpecialActions from './ioc/IocActivitySpecialActions';
import IocActivityRubric from './ioc/IocActivityRubric';
import './LessonIocActivitiesSidebar.css';

/**
 * ============================================================================
 * @component   LessonIocActivitiesSidebar
 * @description Panel lateral derecho de Actividades/EACs con buscador integrado,
 *              solapas superiores, resumen descriptivo y rúbrica de entrega.
 * ============================================================================
 */
export default function LessonIocActivitiesSidebar({
  isOpen: controlledIsOpen,
  onToggle: controlledOnToggle,
  gestionSource,
  subjectTitle = 'Actividades IOC',
  themeColor = '#3b82f6',
  onSelectSection,
  topOffset = '24px'
}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gestionData, setGestionData] = useState(null);
  const [selectedActivityId, setSelectedActivityId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const toggle = controlledOnToggle || (() => setInternalIsOpen(!internalIsOpen));

  useEffect(() => {
    if (!gestionSource) return;
    setLoading(true);
    fetch(gestionSource)
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar actividades de gestión');
        return res.json();
      })
      .then(data => {
        setGestionData(data);
        if (data.eacs && data.eacs.length > 0) {
          const defaultAct = data.eacs.find(a => a.status === 'pending') || data.eacs[0];
          setSelectedActivityId(defaultAct.id);
        }
      })
      .catch(err => {
        console.error('Error cargando actividades IOC:', err);
      })
      .finally(() => setLoading(false));
  }, [gestionSource]);

  const repository = useMemo(() => {
    return new IocActivitiesRepository(gestionData?.eacs || []);
  }, [gestionData]);

  const allActivities = repository.getAll();

  // Filtrado reactivo según búsqueda
  const activities = useMemo(() => {
    if (!searchTerm.trim()) return allActivities;
    const term = searchTerm.toLowerCase();
    return allActivities.filter(act => {
      const matchTitle = (act.title || '').toLowerCase().includes(term);
      const matchBadge = (act.shortBadge || '').toLowerCase().includes(term);
      const matchDesc = (act.description || '').toLowerCase().includes(term);
      const matchRubric = Array.isArray(act.checklist) && act.checklist.some(c => c.toLowerCase().includes(term));
      return matchTitle || matchBadge || matchDesc || matchRubric;
    });
  }, [allActivities, searchTerm]);

  const currentActivity = useMemo(() => {
    if (activities.length === 0) return null;
    return activities.find(a => a.id === selectedActivityId) || activities[0];
  }, [activities, selectedActivityId]);

  // Selección de solapa: actualiza vista y AUTOMÁTICAMENTE salta a la teoría
  const handleSelectActivity = (activity) => {
    if (!activity) return;
    setSelectedActivityId(activity.id);
    if (activity.hasTheorySlug() && onSelectSection) {
      onSelectSection(activity.theorySlug);
    }
  };

  return (
    <aside
      className={`ioc-activities-sidebar ${isOpen ? 'is-open' : ''}`}
      aria-label="Panel lateral de entregas y actividades EAC"
      aria-hidden={!isOpen}
    >
      {/* Botón Pestaña Adherido al Margen Izquierdo */}
      <button
        type="button"
        onClick={toggle}
        className="ioc-activities-tab-btn"
        style={{ top: topOffset, color: themeColor }}
        title={isOpen ? 'Cerrar panel de entregas' : 'Abrir Entregas y Actividades EAC'}
        aria-label="Alternar panel de entregas"
        aria-expanded={isOpen}
      >
        <span>{isOpen ? '✕' : '📝'}</span>
      </button>

      {/* Contenedor con Scroll de las Secciones */}
      <div className="ioc-activities-body">
        {/* Cabecera Principal */}
        <IocActivitiesHeader
          themeColor={themeColor}
          currentActivity={currentActivity}
        />

        {/* Buscador Integrado */}
        {allActivities.length > 1 && (
          <div className="ioc-search-wrapper">
            <span className="ioc-search-icon">🔍</span>
            <input
              type="text"
              className="ioc-search-input"
              placeholder="Buscar en entregas y criterios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Buscar en entregas"
            />
            {searchTerm && (
              <button
                type="button"
                className="ioc-search-clear"
                onClick={() => setSearchTerm('')}
                title="Limpiar búsqueda"
              >
                ✕
              </button>
            )}
          </div>
        )}

        {loading && (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
            Cargando entregas oficiales... ⏳
          </div>
        )}

        {!loading && activities.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            No se encontraron entregas con "<strong>{searchTerm}</strong>".
          </div>
        )}

        {!loading && activities.length > 0 && currentActivity && (
          <>
            {/* 1. Selector de Solapas de EAC */}
            <IocActivitiesTabs
              activities={activities}
              selectedActivityId={currentActivity.id}
              onSelectActivity={handleSelectActivity}
              themeColor={themeColor}
            />

            {/* 2. Tarjeta Resumen y Explicación de la EAC Activa */}
            <IocActivityCard
              currentActivity={currentActivity}
              themeColor={themeColor}
            />

            {/* Acceso a Teleprompter (DESP) o Ejemplo Resuelto (ENT) */}
            <IocActivitySpecialActions
              currentActivity={currentActivity}
              gestionSource={gestionSource}
              subjectTitle={subjectTitle}
              onSelectSection={onSelectSection}
            />

            {/* 3. Bloques de Ponderación y Criterios / Checklist */}
            <IocActivityRubric
              currentActivity={currentActivity}
              themeColor={themeColor}
            />
          </>
        )}
      </div>
    </aside>
  );
}
