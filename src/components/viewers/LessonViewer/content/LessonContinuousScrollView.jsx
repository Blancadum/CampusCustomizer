import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import ActivityProjectStructureCard from '../widgets/ActivityProjectStructureCard';
import PodcastPlayerCard from '../widgets/PodcastPlayerCard';
import InfografiaCarousel from '../widgets/InfografiaCarousel';
import FolderArchiveTabs from '../../../common/FolderArchiveTabs';
import PeteteItinerarioPostIt from '../widgets/PeteteItinerarioPostIt';
import { cleanMarkdownHeadingDuplication, getCleanTemaLabel } from './lessonContentUtils';
import { Link } from 'react-router-dom';

/**
 * Modo scroll continuo (para materias que lo requieran como Entornos e IOC).
 */
export default function LessonContinuousScrollView({
  topics,
  title,
  themeColor,
  activeSubSlug,
  onSelectSubSection,
  markdownComponents
}) {
  return (
    <div style={{ width: '100%', maxWidth: '960px' }}>
      {topics.map((topic, index) => {
        const isFirstInModule = index === 0 || topics[index - 1].moduleTitle !== topic.moduleTitle;
        const isFirstInTema = index === 0 || topics[index - 1].temaTitle !== topic.temaTitle;

        const { temaNumber, cleanTemaName, temaLabel } = getCleanTemaLabel(topic);
        const cleanedMd = cleanMarkdownHeadingDuplication(topic.contentMd, topic, true);
        const isUnitIntro = topic.isOverview || (topic.temaTitle === 'Introducción' && isFirstInModule);

        return (
          <React.Fragment key={topic.slug}>
            {/* Encabezado Principal de Unidad */}
            {isFirstInModule && topic.moduleTitle && (
              <>
                {/* Anclajes canónicos para navegación por bloques/unidades (#bloque1, #u1, etc.) */}
                {topic.moduleId && (
                  <span id={topic.moduleId} style={{ display: 'block', position: 'relative', top: '-140px', visibility: 'hidden', height: 0, margin: 0, padding: 0 }} />
                )}
                {topic.moduleShort && (
                  <span id={topic.moduleShort.toLowerCase().replace(/\s+/g, '')} style={{ display: 'block', position: 'relative', top: '-140px', visibility: 'hidden', height: 0, margin: 0, padding: 0 }} />
                )}
                {/* Alias semánticos universales bloque1/bloque2/bloque3 para materias IOC */}
                {(topic.moduleId === 'u1' || (topic.moduleShort && topic.moduleShort.includes('1'))) && (
                  <span id="bloque1" style={{ display: 'block', position: 'relative', top: '-140px', visibility: 'hidden', height: 0, margin: 0, padding: 0 }} />
                )}
                {(topic.moduleId === 'u2' || (topic.moduleShort && topic.moduleShort.includes('2'))) && (
                  <span id="bloque2" style={{ display: 'block', position: 'relative', top: '-140px', visibility: 'hidden', height: 0, margin: 0, padding: 0 }} />
                )}
                {(topic.moduleId === 'u3' || (topic.moduleShort && topic.moduleShort.includes('3'))) && (
                  <span id="bloque3" style={{ display: 'block', position: 'relative', top: '-140px', visibility: 'hidden', height: 0, margin: 0, padding: 0 }} />
                )}
                <header 
                  id={`module-${topic.slug}`} 
                  style={{ 
                    marginTop: index === 0 ? '0.5rem' : '5rem', 
                    marginBottom: '2.5rem',
                    paddingBottom: '1.2rem',
                    borderBottom: '3px solid var(--border-subtle)',
                    scrollMarginTop: '140px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem', flexWrap: 'wrap' }}>
                    <span style={{ 
                      background: 'var(--bg-card)', 
                      border: '1px solid var(--border-subtle)', 
                      color: 'var(--text-muted)',
                      padding: '0.2rem 0.6rem', 
                      borderRadius: '6px', 
                      fontSize: '0.78rem', 
                      fontWeight: 600,
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase'
                    }}>
                      {title}
                    </span>
                    {topic.moduleShort && (
                      <span style={{ 
                        background: `${themeColor}15`, 
                        border: `1px solid ${themeColor}35`, 
                        color: themeColor, 
                        fontWeight: 700, 
                        fontSize: '0.78rem', 
                        padding: '0.2rem 0.6rem', 
                        borderRadius: '6px'
                      }}>
                        {topic.moduleShort}
                      </span>
                    )}
                  </div>
                  <h1 style={{ 
                    fontSize: '2.2rem', 
                    fontWeight: 800, 
                    color: 'var(--text-title)', 
                    margin: 0, 
                    lineHeight: 1.25,
                    letterSpacing: '-0.02em'
                  }}>
                    {topic.moduleTitle}
                  </h1>
                </header>
              </>
            )}
            
            {/* Encabezado de Bloque / Tema */}
            {isFirstInTema && !isUnitIntro && topic.temaTitle && (() => {
              const cleanModule = (topic.moduleTitle || '').replace(/^(Bloque|Tema|Unidad)\s+\d+:\s*/i, '').trim().toLowerCase();
              const cleanTemaLower = cleanTemaName.trim().toLowerCase();
              return cleanTemaLower !== cleanModule && cleanTemaLower !== 'introducción' && cleanTemaLower !== 'orientación';
            })() && (
              <div 
                id={`tema-content-${temaNumber}`} 
                style={{ 
                  marginTop: isFirstInModule ? '1.5rem' : '3.8rem', 
                  marginBottom: '1.8rem',
                  paddingBottom: '0.6rem',
                  borderBottom: '2px solid var(--border-subtle)',
                  scrollMarginTop: '140px'
                }}
              >
                <h2 style={{ 
                  fontSize: '1.55rem', 
                  fontWeight: 700, 
                  color: 'var(--text-title)', 
                  margin: 0,
                  letterSpacing: '-0.01em'
                }}>
                  {temaLabel}
                </h2>
              </div>
            )}
            
            {/* Lección / Apartado Individual */}
            <section 
              id={topic.slug} 
              data-topic-id={topic.id}
              style={{ 
                marginTop: '1.8rem', 
                marginBottom: '2.8rem',
                scrollMarginTop: '140px' 
              }}
            >
              {topic.id && topic.id !== topic.slug && (
                <span id={topic.id} style={{ display: 'block', position: 'relative', top: '-140px', visibility: 'hidden', height: 0, margin: 0, padding: 0 }} />
              )}
              <header style={{ display: 'flex', alignItems: 'center', marginBottom: '1.2rem' }}>
                <h3 style={{ margin: 0, fontSize: 'inherit', fontWeight: 'inherit', lineHeight: 1 }}>
                  <span 
                    className="lesson-topic-tag"
                    style={{ 
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      background: `${themeColor}15`, 
                      border: `1px solid ${themeColor}35`, 
                      color: themeColor, 
                      fontWeight: 700, 
                      fontSize: '0.85rem', 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '6px',
                      letterSpacing: '0.2px'
                    }}
                  >
                    {topic.topicNum && !topic.isOverview ? `${topic.topicNum}. ${topic.title}` : topic.title}
                  </span>
                </h3>
              </header>
              
              {/* Estructura del Proyecto si la lección es un reto o actividad */}
              <ActivityProjectStructureCard activeTopic={topic} themeColor={themeColor} />

              {/* Reproductor de Podcast / Vídeo y Cuaderno de Notas si el tema lo incluye */}
              {(topic.audioUrl || topic.videoUrl || topic.mediaList || topic.podcastPrompt) && (
                <PodcastPlayerCard 
                  audioUrl={topic.audioUrl}
                  videoUrl={topic.videoUrl}
                  mediaList={topic.mediaList}
                  title={topic.podcastTitle || topic.videoTitle || `Media: ${topic.title}`}
                  promptText={topic.podcastPrompt}
                  themeColor={themeColor}
                />
              )}

              <div 
                className="topic-body" 
                style={{ lineHeight: '1.7', color: 'var(--text-main)', fontSize: '1.02rem' }}
              >
                {(topic.id === 'petete-bienvenida' || topic.slug === 'bienvenida') && (
                  <PeteteItinerarioPostIt />
                )}
                {cleanedMd ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={markdownComponents}>
                    {cleanedMd}
                  </ReactMarkdown>
                ) : topic.contentHtml ? (
                  <div dangerouslySetInnerHTML={{ __html: topic.contentHtml }} />
                ) : null}
              </div>

              {/* Banner de acceso a la Arena de Tests y Juegos */}
              {(topic.id === 'petete-bienvenida' || topic.slug === 'bienvenida') && (
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

              {/* Carpeta Archivadora de Ejemplos Prácticos (en modo continuo) */}
              {topic.folderArchive && (
                <FolderArchiveTabs 
                  tabs={topic.folderArchive.tabs}
                  activeTabId={activeSubSlug}
                  onTabChange={(tabId) => {
                    if (onSelectSubSection) onSelectSubSection(tabId);
                  }}
                  folderTitle={topic.folderArchive.folderTitle}
                  folderIcon={topic.folderArchive.folderIcon}
                  themeColor={themeColor}
                  markdownComponents={markdownComponents}
                />
              )}

              {/* Infografía Interactiva en láminas WebP en modo continuo */}
              {topic.infografia && (
                <InfografiaCarousel 
                  infografia={topic.infografia}
                  themeColor={themeColor}
                />
              )}
              
              {/* Separador sutil entre apartados */}
              <div style={{ 
                height: '1px', 
                background: 'var(--border-subtle)', 
                margin: '2.5rem 0 1rem', 
                opacity: 0.5 
              }} />

              {/* Divisor con icono al final de cada unidad */}
              {(index < topics.length - 1 && topics[index + 1].moduleTitle !== topic.moduleTitle) && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  margin: '4rem 0 3.5rem 0'
                }}>
                  <div style={{ flex: 1, height: '2px', background: 'var(--border-subtle)' }} />
                  <div style={{ padding: '0 1.5rem', fontSize: '1.8rem', opacity: 0.85 }}>🚀</div>
                  <div style={{ flex: 1, height: '2px', background: 'var(--border-subtle)' }} />
                </div>
              )}
            </section>
          </React.Fragment>
        );
      })}
    </div>
  );
}
