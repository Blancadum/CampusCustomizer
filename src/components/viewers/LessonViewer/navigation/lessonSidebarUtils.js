/**
 * Utilidades para estructuración de árbol y extracción de subsecciones en LessonSidebar.
 */

import { slugify } from '../../../../utils/text';

export function groupTopicsByModuleAndTema(topics) {
  return topics.reduce((acc, t) => {
    const module = t.moduleTitle || 'Temas Generales';
    if (!acc[module]) acc[module] = {};

    let group = 'default';
    if (t.isOverview || t.title === 'Introducción a la Unidad') {
      group = 'default';
    } else if (t.temaTitle && t.temaTitle.trim() !== '') {
      let rawTitle = t.temaTitle.trim();
      const cleanModule = (t.moduleTitle || '').replace(/^(Bloque|Tema|Unidad)\s+\d+:\s*/i, '').trim().toLowerCase();
      const cleanRaw = rawTitle.replace(/^(Bloque|Tema|Unidad)\s+\d+:\s*/i, '').trim().toLowerCase();

      if (cleanRaw === cleanModule || cleanRaw === 'introducción' || cleanRaw === 'orientación' || (cleanRaw && cleanModule.includes(cleanRaw))) {
        group = 'default';
      } else {
        if (/^Tema\s+\d+:\s*/i.test(rawTitle)) {
          rawTitle = rawTitle.replace(/^Tema\s+\d+:\s*/i, '');
        } else if (/^Bloque\s+\d+:\s*/i.test(rawTitle)) {
          rawTitle = rawTitle.replace(/^Bloque\s+\d+:\s*/i, '');
        }
        group = rawTitle || 'default';
      }
    }

    if (!acc[module][group]) acc[module][group] = [];
    acc[module][group].push(t);
    return acc;
  }, {});
}

export function extractSubsections(topic) {
  if (topic.subsections && topic.subsections.length > 0) {
    return topic.subsections;
  }
  if (!topic.contentMd) return [];

  const res = [];
  const lines = topic.contentMd.split('\n');
  for (const l of lines) {
    const m = l.match(/^(?:###|##)\s+([0-9]+(?:\.[0-9]+)*\.?\s+.*|\bEAC\b.*)/i);
    if (m) {
      const raw = m[1].replace(/[*_#]/g, '').trim();
      const isEac = /\beac\b|\beac\d+/i.test(raw);
      const slug = slugify(raw);
      res.push({ id: slug, slug, title: raw, isEac });
    }
  }
  return res;
}
