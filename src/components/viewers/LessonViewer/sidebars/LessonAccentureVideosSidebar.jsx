import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AccentureVideosHeader from './accenture/AccentureVideosHeader';
import AccentureVideosFullViewBanner from './accenture/AccentureVideosFullViewBanner';
import AccentureVideosSearchBox from './accenture/AccentureVideosSearchBox';
import AccentureVideosTopicList from './accenture/AccentureVideosTopicList';

/**
 * ============================================================================
 * @component   LessonAccentureVideosSidebar
 * @description Cajón lateral para consultar y saltar a los vídeos teóricos de
 *              Accenture contextualizados por tema y módulo.
 * ============================================================================
 */
export default function LessonAccentureVideosSidebar({
  isOpen,
  onToggle,
  activeSlug,
  onSelectSection,
  topOffset = '76px'
}) {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [openModule, setOpenModule] = useState('mod0');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/data/extra/accenture_videos_teoria.json')
      .then(res => res.json())
      .then(data => {
        setTopics(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error cargando vídeos de Accenture:', err);
        setLoading(false);
      });
  }, []);

  // Agrupar por módulo
  const groupedModules = useMemo(() => {
    return topics.reduce((acc, topic) => {
      const modId = topic.moduleId || 'mod0';
      if (!acc[modId]) {
        acc[modId] = {
          id: modId,
          title: topic.moduleTitle || 'Módulo',
          short: topic.moduleShort || 'Módulo',
          topics: []
        };
      }
      acc[modId].topics.push(topic);
      return acc;
    }, {});
  }, [topics]);

  const handleTopicClick = useCallback((slug) => {
    if (onSelectSection) {
      onSelectSection(slug);
    }
    const el = document.getElementById(slug);
    const isPetete = window.location.pathname.includes('/petete');
    if (el) {
      el.scrollIntoView({ behavior: 'auto' });
    } else if (isPetete) {
      navigate(`/petete#${slug}`);
    } else {
      navigate(`/java/springboot#${slug}`);
    }
    if (window.innerWidth <= 768 && onToggle) {
      onToggle();
    }
  }, [onSelectSection, navigate, onToggle]);

  const filteredTopics = useMemo(() => {
    if (!searchTerm.trim()) return null;
    const term = searchTerm.toLowerCase();
    return topics.filter(t => 
      t.title.toLowerCase().includes(term) ||
      (t.temaTitle && t.temaTitle.toLowerCase().includes(term))
    );
  }, [searchTerm, topics]);

  return (
    <aside
      style={{
        position: 'fixed',
        top: '126px',
        right: 0,
        bottom: 0,
        width: '340px',
        maxWidth: '88vw',
        background: 'var(--bg-card, #131b2e)',
        borderLeft: '1px solid var(--border-subtle)',
        boxShadow: isOpen ? '-8px 0 25px rgba(0,0,0,0.22)' : 'none',
        zIndex: isOpen ? 980 : 950,
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box'
      }}
    >
      {/* 1. Cabecera y botón pestaña lateral */}
      <AccentureVideosHeader
        isOpen={isOpen}
        onToggle={onToggle}
        topOffset={topOffset}
        topicsCount={topics.length}
      />

      <div style={{ padding: '1.2rem 1rem', display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box' }}>
        {/* 2. Banner de acceso al visor completo */}
        <AccentureVideosFullViewBanner onToggle={onToggle} />

        {/* 3. Buscador interactivo */}
        <AccentureVideosSearchBox
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <p style={{ margin: '0 0 0.6rem', fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.3' }}>
          Vídeos recomendados por Accenture / UPM para contextualizar las tutorías:
        </p>

        {/* 4. Lista de resultados o acordeón de módulos */}
        <AccentureVideosTopicList
          loading={loading}
          filteredTopics={filteredTopics}
          groupedModules={groupedModules}
          openModule={openModule}
          onToggleModule={(modId) => setOpenModule(openModule === modId ? null : modId)}
          activeSlug={activeSlug}
          onTopicClick={handleTopicClick}
        />

        {/* Pie de apoyo */}
        <div style={{ 
          marginTop: '0.65rem', 
          paddingTop: '0.65rem', 
          borderTop: '1px solid var(--border-subtle, rgba(255,255,255,0.06))',
          fontSize: '0.7rem',
          color: 'var(--text-muted)',
          textAlign: 'center'
        }}>
          Contenidos adaptados para VS Code & Java Spring Boot
        </div>
      </div>
    </aside>
  );
}
