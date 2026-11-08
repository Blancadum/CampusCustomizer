import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

/**
 * ============================================================================
 * @component AsideLessonsTab
 * @description Pestaña de Lecciones del libro digital con buscador y módulos.
 * ============================================================================
 */
export default function AsideLessonsTab({
  lessons = [],
  loading = false,
  subjectConfig,
  themeColor = '#3b82f6',
  onSelectLesson = null
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLessons = useMemo(() => {
    if (!searchQuery.trim()) return lessons;
    const q = searchQuery.toLowerCase().trim();
    return lessons.filter(l => 
      (l.title && l.title.toLowerCase().includes(q)) ||
      (l.topicNum && String(l.topicNum).toLowerCase().includes(q)) ||
      (l.moduleTitle && l.moduleTitle.toLowerCase().includes(q)) ||
      (l.temaTitle && l.temaTitle.toLowerCase().includes(q))
    );
  }, [lessons, searchQuery]);

  const groupedLessons = useMemo(() => {
    const groups = {};
    filteredLessons.forEach(lesson => {
      const mod = lesson.moduleTitle || lesson.temaTitle || 'Temario General';
      if (!groups[mod]) {
        groups[mod] = [];
      }
      groups[mod].push(lesson);
    });
    return groups;
  }, [filteredLessons]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)' }}>
        Cargando temario del libro digital... 📖
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Barra de búsqueda */}
      <div className="right-drawer-search-box">
        <span className="right-drawer-search-icon">🔍</span>
        <input 
          type="text"
          className="right-drawer-search-input"
          placeholder="Buscar tema, concepto o lección..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
        <span>{filteredLessons.length} lecciones disponibles</span>
        {subjectConfig && (
          <Link
            to={`/ioc/${subjectConfig.code}/${subjectConfig.lessonPrefix}`}
            style={{ color: themeColor, fontWeight: 700, textDecoration: 'none' }}
          >
            Abrir libro completo →
          </Link>
        )}
      </div>

      {/* Lista agrupada */}
      {Object.keys(groupedLessons).length > 0 ? (
        Object.entries(groupedLessons).map(([moduleTitle, items]) => (
          <div key={moduleTitle} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <h4 style={{ 
              margin: '0.35rem 0 0.15rem', 
              fontSize: '0.8rem', 
              color: 'var(--text-muted)', 
              fontWeight: 800, 
              textTransform: 'uppercase', 
              letterSpacing: '0.5px' 
            }}>
              {moduleTitle}
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {items.map(lesson => {
                const lessonUrl = `/ioc/${subjectConfig?.code}/${subjectConfig?.lessonPrefix}/${lesson.slug}`;
                return (
                  <Link
                    key={lesson.slug}
                    to={lessonUrl}
                    onClick={(e) => {
                      if (onSelectLesson) {
                        e.preventDefault();
                        onSelectLesson(lesson.slug);
                      }
                    }}
                    className="right-drawer-card"
                    style={{
                      padding: '0.75rem 0.9rem',
                      textDecoration: 'none',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.75rem'
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', minWidth: 0, flex: 1 }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-title)' }}>
                        {lesson.topicNum ? `${lesson.topicNum}. ` : ''}{lesson.title}
                      </span>
                      {lesson.duration && (
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          ⏱️ {lesson.duration}
                        </span>
                      )}
                    </div>
                    <span style={{ color: themeColor, fontSize: '0.85rem' }}>➔</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))
      ) : (
        <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)' }}>
          No se encontraron temas coincidentes con "{searchQuery}".
        </div>
      )}
    </div>
  );
}
