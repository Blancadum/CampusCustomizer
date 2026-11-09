import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import hljs, { enhanceCodeBlockComments } from '../../../utils/highlight';
import { slugify } from '../../../utils/text';

export default function useCourseContent(dataSource, isSingleView = false) {
  const { slug: routeSlug } = useParams();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSlug, setActiveSlug] = useState('');
  const [activeSubSlug, setActiveSubSlug] = useState('');

  const scrollToSection = React.useCallback((slug) => {
    if (!slug) return;
    
    // Si el slug pertenece a una subsección, mantener activo el tema padre
    const cleanSlug = String(slug).replace(/^#/, '');
    const parentTopic = topics.find(t => 
      t.slug === cleanSlug || (t.subsections && t.subsections.some(s => (s.slug === cleanSlug || s.id === cleanSlug)))
    );

    if (parentTopic) {
      setActiveSlug(parentTopic.slug);
      const isSub = parentTopic.subsections && parentTopic.subsections.some(s => (s.slug === cleanSlug || s.id === cleanSlug));
      if (isSub) {
        setActiveSubSlug(cleanSlug);
      } else {
        setActiveSubSlug('');
      }
    } else if (/^(bloque|b|u)\d+/i.test(cleanSlug)) {
      const num = cleanSlug.replace(/\D/g, '');
      const blockTopic = topics.find(t => t.moduleId === `u${num}` || (t.moduleShort && t.moduleShort.includes(num)));
      if (blockTopic) {
        setActiveSlug(blockTopic.slug);
      }
    } else if (topics.length > 0 && topics.some(t => t.slug === cleanSlug)) {
      setActiveSlug(cleanSlug);
    }

    if (isSingleView) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    const performScroll = () => {
      // 1. Si es el primer tema del curso, siempre ir al inicio absoluto (top: 0)
      if (topics.length > 0 && cleanSlug === topics[0].slug) {
        window.scrollTo({ top: 0, behavior: 'auto' });
        return true;
      }

      let section = document.getElementById(cleanSlug);
      if (!section) {
        section = document.querySelector(`[data-topic-id="${cleanSlug}"]`);
      }
      if (!section && cleanSlug.startsWith('u') && cleanSlug.includes('overview')) {
        const altSlug = cleanSlug.replace(/^u(\d+)-overview$/, 'intro-u$1');
        section = document.getElementById(altSlug);
      }
      if (!section && cleanSlug.startsWith('intro-u')) {
        const altSlug = cleanSlug.replace(/^intro-u(\d+)$/, 'u$1-overview');
        section = document.getElementById(altSlug);
      }
      if (!section && (cleanSlug.startsWith('bloque') || cleanSlug.startsWith('b'))) {
        const num = cleanSlug.replace(/\D/g, '');
        section = document.getElementById(`bloque${num}`) || 
                  document.getElementById(`u${num}`) || 
                  document.getElementById(`intro-bloque${num}`) ||
                  document.getElementById(`intro-u${num}`) ||
                  document.getElementById(`module-intro-bloque${num}`) ||
                  document.getElementById(`module-intro-u${num}`);
      }
      if (!section && cleanSlug.startsWith('2-6-')) {
        section = document.getElementById('2-6-resolver-un-enunciado-de-clases-paso-a-paso') ||
                  document.querySelector('.folder-archive-container');
      }

      // 2. Si el tema inicia un módulo (tiene un encabezado module- encima), el objetivo es el encabezado del módulo para que no se oculte
      const moduleHeader = document.getElementById(`module-${cleanSlug}`);
      const targetElement = moduleHeader || section;

      if (targetElement) {
        // Header sticky (76px) + Breadcrumbs sticky (50px) = 126px; dejamos 24px de margen = 150px
        const yOffset = -150;
        const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: Math.max(0, y), behavior: 'auto' });
        return true;
      }
      return false;
    };

    if (!performScroll()) {
      setTimeout(() => {
        if (!performScroll()) {
          requestAnimationFrame(() => performScroll());
        }
      }, 80);
    }
  }, [topics, isSingleView]);

  useEffect(() => {
    setLoading(true);
    fetch(dataSource, { cache: 'no-cache' })
      .then(res => {
        if (!res.ok) throw new Error('No se pudo cargar el contenido');
        return res.json();
      })
      .then(data => {
        setTopics(data);
        const hashTarget = window.location.hash ? window.location.hash.replace(/^#/, '') : null;
        const hasExplicitSlug = routeSlug && data.some(t => t.slug === routeSlug);
        
        let initialSlug = '';
        if (hasExplicitSlug) {
          initialSlug = routeSlug;
        } else if (hashTarget) {
          const matching = data.find(t => 
            t.slug === hashTarget || 
            (t.subsections && t.subsections.some(s => (s.slug === hashTarget || s.id === hashTarget)))
          );
          if (matching) {
            initialSlug = matching.slug;
          } else if (/^(bloque|b|u)\d+/i.test(hashTarget)) {
            const num = hashTarget.replace(/\D/g, '');
            const blockTopic = data.find(t => t.moduleId === `u${num}` || (t.moduleShort && t.moduleShort.includes(num)));
            initialSlug = blockTopic ? blockTopic.slug : (data[0]?.slug || '');
          } else {
            initialSlug = data[0]?.slug || '';
          }
        } else {
          initialSlug = data[0]?.slug || '';
        }

        if (initialSlug) {
          setActiveSlug(initialSlug);
        }

        if (hashTarget && !isSingleView) {
          setTimeout(() => {
            scrollToSection(hashTarget);
          }, 120);
        } else {
          window.scrollTo({ top: 0, behavior: 'auto' });
        }
        setError(null);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [dataSource]);

  // Si cambia la URL con un nuevo :slug
  useEffect(() => {
    if (!loading && topics.length > 0 && routeSlug && routeSlug !== activeSlug) {
      if (topics.some(t => t.slug === routeSlug)) {
        if (isSingleView) {
          setActiveSlug(routeSlug);
          window.scrollTo({ top: 0, behavior: 'auto' });
        } else {
          scrollToSection(routeSlug);
        }
      }
    }
  }, [routeSlug, loading, topics, isSingleView]);

  // Listener reactivo a cambios de ancla en la URL (ej. selector de bloques en la landing)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash ? window.location.hash.replace(/^#/, '') : '';
      if (hash) {
        scrollToSection(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [topics, isSingleView]);

  // Aplicar highlight.js después de renderizar el contenido (solo para bloques que no se hayan procesado ya sincrónicamente)
  useEffect(() => {
    if (!loading && topics.length > 0) {
      document.querySelectorAll('pre code:not(.hljs)').forEach((block) => {
        hljs.highlightElement(block);
        if (typeof enhanceCodeBlockComments === 'function') {
          enhanceCodeBlockComments(block);
        }
      });
    }
  }, [loading, topics, activeSlug]);

  // ScrollSpy logic (solo en vista apilada/continua) con soporte para subniveles x.x.x
  useEffect(() => {
    if (isSingleView || loading || topics.length === 0) return;

    const handleScroll = () => {
      let currentTopic = '';
      let currentSub = '';
      
      for (const t of topics) {
        const section = document.getElementById(t.slug);
        if (section) {
          const rect = section.getBoundingClientRect();
          // Offset para compensar header (76px) + breadcrumbs (50px)
          if (rect.top <= 170) {
            currentTopic = section.id;
          }
        }

        // Detección de subniveles al pasar por el enunciado
        const subList = (t.subsections && t.subsections.length > 0)
          ? t.subsections
          : (() => {
              if (!t.contentMd) return [];
              const res = [];
              const lines = t.contentMd.split('\n');
              for (const l of lines) {
                const m = l.match(/^(?:###|##)\s+([0-9]+(?:\.[0-9]+)*\.?\s+.*|\bEAC\b.*)/i);
                if (m) {
                  const raw = m[1].replace(/[*_#]/g, '').trim();
                  const slug = slugify(raw);
                  res.push({ id: slug, slug });
                }
              }
              return res;
            })();

        if (subList.length > 0) {
          for (const sub of subList) {
            const subId = sub.slug || sub.id;
            const subEl = document.getElementById(subId);
            if (subEl) {
              const subRect = subEl.getBoundingClientRect();
              if (subRect.top <= 180) {
                currentSub = subId;
              }
            }
          }
        }
      }
      
      if (currentTopic && currentTopic !== activeSlug) {
        setActiveSlug(currentTopic);
        const currentPath = window.location.pathname;
        const matchingTopic = topics.find(t => currentPath.endsWith(`/${t.slug}`));
        if (matchingTopic) {
          const basePath = currentPath.substring(0, currentPath.lastIndexOf('/'));
          window.history.replaceState(null, '', `${basePath}/${currentTopic}`);
        }
      }

      if (currentSub !== activeSubSlug) {
        setActiveSubSlug(currentSub);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSingleView, loading, topics, activeSlug, activeSubSlug]);

  return { topics, loading, error, activeSlug, setActiveSlug, activeSubSlug, setActiveSubSlug, scrollToSection };
}
