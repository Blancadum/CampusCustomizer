import React, { useState, useCallback } from 'react';
import LessonLightboxModal from './widgets/LessonLightboxModal';
import useLessonMarkdownComponents from './widgets/useLessonMarkdownComponents';
import { getDisplayTitle, cleanMarkdownHeadingDuplication } from './content/lessonContentUtils';
import LessonSingleTopicView from './content/LessonSingleTopicView';
import LessonContinuousScrollView from './content/LessonContinuousScrollView';

/**
 * ============================================================================
 * @component   LessonContent
 * @description Orquestador principal del contenido pedagógico de las lecciones.
 *              Soporta tanto modo de lección individual (singleTopicView) como
 *              scroll continuo secuencial por bloques y unidades temáticas.
 * ============================================================================
 */
export default function LessonContent({ 
  topics, 
  activeSlug, 
  activeSubSlug,
  onSelectTopic: _onSelectTopic,
  onSelectSubSection,
  themeColor = 'var(--accent-blue)', 
  title,
  singleTopicView = true,
  isAccentureActivities: _isAccentureActivities = false,
  isTutorChatOpen = false
}) {
  const [lightboxImg, setLightboxImg] = useState(null);
  const [lightboxZoom, setLightboxZoom] = useState(1);

  const handleOpenLightbox = useCallback((imgData) => {
    setLightboxImg(imgData);
    setLightboxZoom(1.2);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setLightboxImg(null);
  }, []);

  const markdownComponents = useLessonMarkdownComponents({
    onOpenLightbox: handleOpenLightbox
  });

  // Modo de lección individual (sin scroll masivo entre todas las actividades)
  if (singleTopicView) {
    const activeTopic = topics.find((t) => t.slug === activeSlug) || topics[0];
    if (!activeTopic) return null;

    const displayTitle = getDisplayTitle(activeTopic);
    const cleanedMd = cleanMarkdownHeadingDuplication(activeTopic.contentMd, activeTopic, false);

    return (
      <main 
        className={`lesson-content ${isTutorChatOpen ? 'tutor-chat-active' : ''}`}
        style={{ 
          flex: 1, 
          minWidth: 0, 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          paddingTop: '2rem',
          paddingBottom: '2.5rem',
          paddingLeft: '1.25rem',
          paddingRight: isTutorChatOpen ? '460px' : '2.5rem',
          boxSizing: 'border-box',
          transition: 'padding-right 0.22s ease'
        }}
      >
        <LessonSingleTopicView
          activeTopic={activeTopic}
          title={title}
          themeColor={themeColor}
          activeSubSlug={activeSubSlug}
          onSelectSubSection={onSelectSubSection}
          markdownComponents={markdownComponents}
          cleanedMd={cleanedMd}
          displayTitle={displayTitle}
        />
        <LessonLightboxModal 
          image={lightboxImg}
          zoom={lightboxZoom}
          setZoom={setLightboxZoom}
          onClose={handleCloseLightbox}
        />
      </main>
    );
  }

  // Modo scroll continuo (para materias que lo requieran como Entornos e IOC)
  return (
    <main 
      className={`lesson-content ${isTutorChatOpen ? 'tutor-chat-active' : ''}`}
      style={{ 
        flex: 1, 
        minWidth: 0, 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingTop: '2rem',
        paddingBottom: '2.5rem',
        paddingLeft: '1.25rem',
        paddingRight: isTutorChatOpen ? '460px' : '2.5rem',
        boxSizing: 'border-box',
        transition: 'padding-right 0.22s ease'
      }}
    >
      <LessonContinuousScrollView
        topics={topics}
        title={title}
        themeColor={themeColor}
        activeSubSlug={activeSubSlug}
        onSelectSubSection={onSelectSubSection}
        markdownComponents={markdownComponents}
      />
      <LessonLightboxModal 
        image={lightboxImg}
        zoom={lightboxZoom}
        setZoom={setLightboxZoom}
        onClose={handleCloseLightbox}
      />
    </main>
  );
}
