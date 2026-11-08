import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import useCourseContent from './useCourseContent';
import useLessonSubjectConfig from './useLessonSubjectConfig';
import BreadcrumbNav from './navigation/BreadcrumbNav';
import LessonSidebar from './navigation/LessonSidebar';
import LessonContent from './LessonContent';
import LessonRightDrawersCluster from './sidebars/LessonRightDrawersCluster';

export default function LessonViewer({ 
  dataSource, 
  gestionSource,
  subjectCode,
  title, 
  themeColor = 'var(--accent-blue)',
  breadcrumbItems,
  externalLink,
  singleTopicView = false, // Scroll infinito continuo por defecto para un estudio fluido y sin interrupciones
  initialRightDrawer = null
}) {
  const navigate = useNavigate();
  
  // Detección modularizada de fuentes y configuraciones de la materia
  const subjectConfig = useLessonSubjectConfig(dataSource, gestionSource, subjectCode);
  const { isPetete, isActivitiesSpringBoot, isVideosSpringBoot, isIfcd0177, isSepePhp } = subjectConfig;

  // Vista unitaria solo si se especifica explícitamente por prop
  const isSingleView = singleTopicView;

  const { 
    topics, 
    loading, 
    error, 
    activeSlug, 
    setActiveSlug, 
    activeSubSlug, 
    setActiveSubSlug, 
    scrollToSection 
  } = useCourseContent(dataSource, isSingleView);
  
  const currentTopic = topics?.find(t => t.slug === activeSlug);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(isPetete ? true : window.innerWidth > 768);
  
  // Estado para coordinar los paneles laterales derechos
  const [activeRightDrawer, setActiveRightDrawer] = useState(initialRightDrawer);

  // Estado coordinado para el chat del tutor de PHP (Split-screen)
  const [isTutorChatOpen, setIsTutorChatOpen] = useState(() => {
    try {
      return sessionStorage.getItem('sepe_tutor_chat_open') === 'true';
    } catch {
      return false;
    }
  });

  const handleSelectTopic = (slug) => {
    setActiveSlug(slug);
    if (isSingleView) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      const currentPath = window.location.pathname;
      if (isActivitiesSpringBoot) {
        navigate(`/accenture/actividades/${slug}`);
      } else if (isVideosSpringBoot) {
        navigate(`/accenture/videos/${slug}`);
      } else {
        const matchingTopic = topics.find(t => currentPath.endsWith(`/${t.slug}`));
        if (matchingTopic) {
          const basePath = currentPath.substring(0, currentPath.lastIndexOf('/'));
          navigate(`${basePath}/${slug}`);
        } else {
          const cleanBase = currentPath.endsWith('/') ? currentPath.slice(0, -1) : currentPath;
          navigate(`${cleanBase}/${slug}`);
        }
      }
    } else {
      // Salto instantáneo sin efecto rodante / animación de scroll
      scrollToSection(slug);

      // Sincronizar URL de forma limpia en el historial del navegador sin concatenaciones
      const currentPath = window.location.pathname;
      let cleanBasePath = currentPath;
      const iocMatch = currentPath.match(/^(\/ioc\/[^\/]+\/[^\/]+)/);
      if (iocMatch) {
        cleanBasePath = iocMatch[1];
      } else {
        const parts = currentPath.split('/').filter(Boolean);
        if (topics.some(t => t.slug === parts[parts.length - 1] || t.id === parts[parts.length - 1])) {
          cleanBasePath = '/' + parts.slice(0, parts.length - 1).join('/');
        } else {
          cleanBasePath = '/' + parts.join('/');
        }
      }
      cleanBasePath = cleanBasePath.replace(/\/+$/, '');
      window.history.replaceState(null, '', `${cleanBasePath}/${slug}`);
    }

    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  // Control responsive del sidebar
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile && !isPetete) {
        setIsSidebarOpen(false);
      } else if (!mobile) {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isPetete]);

  if (loading) {
    return (
      <div className="app-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h2>Cargando contenido... 🚀</h2>
      </div>
    );
  }

  if (error || topics.length === 0) {
    return (
      <div className="app-container" style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Oops! 💥</h2>
        <p>{error || 'No hay contenido disponible.'}</p>
        <button onClick={() => navigate('/')} className="theme-btn" style={{ marginTop: '1rem' }}>Volver a Home</button>
      </div>
    );
  }

  return (
    <>
      <BreadcrumbNav 
        title={title} 
        items={breadcrumbItems} 
        externalLink={
          externalLink || (isIfcd0177 ? {
            label: '🌐 Campus Virtual Enclave',
            href: 'https://campusvirtual.enclaveformacion.com/login/index.php#section-2',
            title: 'Acceso directo al Campus Virtual oficial de Enclave Formación (SEPE)'
          } : null)
        }
      />
      
      <div 
        className="mini-campus-layout" 
        style={{ 
          display: 'flex', 
          width: '100%',
          minHeight: 'calc(100vh - 126px)', 
          position: 'relative',
          overflowX: 'clip' 
        }}
      >
        <LessonSidebar 
          topics={topics}
          activeSlug={activeSlug}
          activeSubSlug={activeSubSlug}
          scrollToSection={scrollToSection}
          onSelectTopic={handleSelectTopic}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          isMobile={isMobile}
          title={title}
          themeColor={themeColor}
          isPetete={isPetete}
        />
        
        <LessonContent 
          topics={topics} 
          activeSlug={activeSlug}
          activeSubSlug={activeSubSlug}
          onSelectTopic={handleSelectTopic}
          onSelectSubSection={setActiveSubSlug}
          themeColor={themeColor} 
          title={title}
          singleTopicView={isSingleView}
          isAccentureActivities={isActivitiesSpringBoot}
          isTutorChatOpen={isSepePhp && isTutorChatOpen}
        />

        {/* Panel lateral derecho modularizado con carga diferida */}
        <LessonRightDrawersCluster
          activeRightDrawer={activeRightDrawer}
          setActiveRightDrawer={setActiveRightDrawer}
          isMobile={isMobile}
          subjectConfig={subjectConfig}
          currentTopic={currentTopic}
          activeSlug={activeSlug}
          title={title}
          themeColor={themeColor}
          onSelectTopic={handleSelectTopic}
        />
      </div>
    </>
  );
}
