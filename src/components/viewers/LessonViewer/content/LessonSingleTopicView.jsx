import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import ActivitySolutionsAccordion from '../widgets/ActivitySolutionsAccordion';
import ActivityProjectStructureCard from '../widgets/ActivityProjectStructureCard';
import PodcastPlayerCard from '../widgets/PodcastPlayerCard';
import InfografiaCarousel from '../widgets/InfografiaCarousel';
import FolderArchiveTabs from '../../../common/FolderArchiveTabs';
import PresentationCard from '../../../common/PresentationCard';
import LessonTopicHeader from './LessonTopicHeader';
import LessonTopicMetadataCard from './LessonTopicMetadataCard';
import PeteteItinerarioPostIt from '../widgets/PeteteItinerarioPostIt';
import { Link } from 'react-router-dom';

/**
 * Vista de lección individual (single topic) con presentación, medios y acordeón de soluciones.
 */
export default function LessonSingleTopicView({
  activeTopic,
  title,
  themeColor,
  activeSubSlug,
  onSelectSubSection,
  markdownComponents,
  cleanedMd,
  displayTitle
}) {
  if (!activeTopic) return null;

  return (
    <article style={{ width: '100%', maxWidth: '940px' }}>
      {/* Cabecera contextual moderna con Badges y H1 */}
      <LessonTopicHeader
        title={title}
        activeTopic={activeTopic}
        displayTitle={displayTitle}
        themeColor={themeColor}
      />

      {/* Tarjeta de metadatos de entrega (Bootcamp Reto, Proyecto, L2E) */}
      <LessonTopicMetadataCard activeTopic={activeTopic} />

      {/* Tarjeta Visual de Estructura de Carpetas y Archivos */}
      <ActivityProjectStructureCard activeTopic={activeTopic} themeColor={themeColor} />

      {/* Reproductor de Podcast / Vídeo y Cuaderno de Notas si el tema lo incluye */}
      {(activeTopic.audioUrl || activeTopic.videoUrl || activeTopic.mediaList || activeTopic.podcastPrompt) && (
        <PodcastPlayerCard 
          audioUrl={activeTopic.audioUrl}
          videoUrl={activeTopic.videoUrl}
          mediaList={activeTopic.mediaList}
          title={activeTopic.podcastTitle || activeTopic.videoTitle || `Media: ${activeTopic.title}`}
          promptText={activeTopic.podcastPrompt}
          themeColor={themeColor}
        />
      )}

      {/* Presentación Interactiva Gamma si el tema la incluye directamente */}
      {activeTopic.presentationUrl && (
        <PresentationCard 
          embedUrl={activeTopic.presentationUrl}
          title={activeTopic.presentationTitle || 'Presentación Ejecutiva Interactiva'}
          badge="Presentación Gamma"
          themeColor={themeColor}
          height="480px"
        />
      )}

      {/* Cuerpo Markdown Limpio y Sin Encabezados Duplicados */}
      <div className="topic-body" style={{ lineHeight: '1.7', color: 'var(--text-main)', fontSize: '1.02rem' }}>
        {(activeTopic.id === 'petete-bienvenida' || activeTopic.slug === 'bienvenida') && (
          <PeteteItinerarioPostIt />
        )}
        {cleanedMd ? (
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={markdownComponents}>
            {cleanedMd}
          </ReactMarkdown>
        ) : activeTopic.contentHtml ? (
          <div dangerouslySetInnerHTML={{ __html: activeTopic.contentHtml }} />
        ) : null}
      </div>

      {/* Banner de acceso a la Arena de Tests y Juegos */}
      {(activeTopic.id === 'petete-bienvenida' || activeTopic.slug === 'bienvenida') && (
        <section className="petete-quiz-banner" style={{
          marginTop: '2.5rem',
          padding: '1.8rem 2rem',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(14, 165, 233, 0.08) 100%), var(--bg-card, #ffffff)',
          border: '1.5px solid rgba(16, 185, 129, 0.35)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.04)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', minWidth: '280px', flex: '1 1 300px' }}>
              <span style={{ fontSize: '2.4rem' }}>🎮</span>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-title, #0f172a)', fontWeight: 800 }}>
                  Arena de Tests & Juegos Interactivos
                </h3>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.9rem', color: 'var(--text-muted, #64748b)', lineHeight: 1.5 }}>
                  Hemos apartado los juegos a una sección dedicada: 99 preguntas oficiales de las 14 tutorías, desafíos contrarreloj, flashcards 3D y encuesta de dominio.
                </p>
              </div>
            </div>
            <Link 
              to="/quiz" 
              className="theme-btn"
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#ffffff',
                textDecoration: 'none',
                padding: '0.75rem 1.4rem',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '0.95rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)'
              }}
            >
              <span>Entrar a la Arena de Tests & Juegos</span> ➔
            </Link>
          </div>
        </section>
      )}

      {/* Carpeta Archivadora de Ejemplos Prácticos (si el tema la define) */}
      {activeTopic.folderArchive && (
        <FolderArchiveTabs 
          tabs={activeTopic.folderArchive.tabs}
          activeTabId={activeSubSlug}
          onTabChange={(tabId) => {
            if (onSelectSubSection) onSelectSubSection(tabId);
          }}
          folderTitle={activeTopic.folderArchive.folderTitle}
          folderIcon={activeTopic.folderArchive.folderIcon}
          themeColor={themeColor}
          markdownComponents={markdownComponents}
        />
      )}

      {/* Infografía Interactiva en láminas WebP si el tema la incluye */}
      {activeTopic.infografia && (
        <InfografiaCarousel 
          infografia={activeTopic.infografia}
          themeColor={themeColor}
        />
      )}

      {/* Componente interactivo para desplegar soluciones de código, memoria técnica (README), dificultades y notas */}
      {(activeTopic.solucionDoc || activeTopic.readmeDoc || activeTopic.dificultadesDoc || activeTopic.notebook) && (
        <ActivitySolutionsAccordion 
          solucionCodigo={activeTopic.solucionDoc}
          readmeDoc={activeTopic.readmeDoc}
          queSeHaHechoDoc={activeTopic.queSeHaHechoDoc}
          dificultadesDoc={activeTopic.dificultadesDoc}
          activeSlug={activeTopic.slug}
          actividadTitle={activeTopic.title}
          numero={activeTopic.numero}
          notebookData={activeTopic.notebook}
          markdownComponents={markdownComponents}
          themeColor={themeColor}
        />
      )}
    </article>
  );
}
