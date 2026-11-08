import { useState, useEffect, useMemo } from 'react';
import { getIocSubjectByCode } from '../../../config/iocSubjects';

/**
 * Hook para inferir la configuración y fuentes de gestión de una asignatura
 * a partir de dataSource, subjectCode y flags de curso.
 */
export default function useLessonSubjectConfig(dataSource, gestionSource, subjectCode) {
  const isPetete = typeof dataSource === 'string' && dataSource.includes('petete');
  const isTheorySpringBoot = typeof dataSource === 'string' && (dataSource.includes('springboot_guia') || isPetete);
  const isActivitiesSpringBoot = typeof dataSource === 'string' && (dataSource.includes('actividades') || dataSource.includes('accenture_actividades'));
  const isVideosSpringBoot = typeof dataSource === 'string' && (dataSource.includes('accenture_videos') || dataSource.includes('videos_accenture'));
  const isTutoriasCodigo = typeof dataSource === 'string' && dataSource.includes('tutorias_codigo');
  const isIfcd0177 = (typeof dataSource === 'string' && dataSource.includes('ifcd0177')) || subjectCode === 'ifcd0177';
  const isEntornos = (subjectCode === 'ent' || (typeof dataSource === 'string' && !dataSource.includes('accenture') && (dataSource.includes('entornos') || dataSource.includes('/ent.') || dataSource.includes('/ent/'))));
  const isSepePhp = (typeof dataSource === 'string' && (dataSource.includes('php_sql_course') || dataSource.includes('/php/'))) || subjectCode === 'sepe_php' || subjectCode === 'php';

  // Detección automática o explícita del archivo de gestión para materias de IOC
  const effectiveGestionSource = useMemo(() => {
    if (gestionSource) return gestionSource;
    if (typeof dataSource === 'string') {
      if (dataSource.includes('accenture') || dataSource.includes('springboot') || isPetete) return null;
      if (dataSource.includes('entornos') || dataSource.includes('/ent/') || dataSource.includes('/ent.')) return '/data/ioc/gestion/ent.json';
      if (dataSource.includes('despliegue') || dataSource.includes('/desp/') || dataSource.includes('/desp.')) return '/data/ioc/gestion/desp.json';
      if (dataSource.includes('digitalizacion') || dataSource.includes('/digi/') || dataSource.includes('/digi.')) return '/data/ioc/gestion/digi.json';
      if (dataSource.includes('interfaces') || dataSource.includes('/int/') || dataSource.includes('/int.')) return '/data/ioc/gestion/int.json';
      if (dataSource.includes('ipo2') || dataSource.includes('/ipo2/') || dataSource.includes('/ipo2.')) return '/data/ioc/gestion/ipo2.json';
    }
    return null;
  }, [gestionSource, dataSource, isPetete]);

  // Detección de configuración de la materia IOC
  const resolvedSubjectConfig = useMemo(() => {
    if (subjectCode) {
      const match = getIocSubjectByCode(subjectCode);
      if (match) return match;
    }
    if (effectiveGestionSource) {
      const filename = effectiveGestionSource.split('/').pop().replace('.json', '');
      const match = getIocSubjectByCode(filename);
      if (match) return match;
    }
    return null;
  }, [subjectCode, effectiveGestionSource]);

  const [iocGestionData, setIocGestionData] = useState(null);

  useEffect(() => {
    if (!resolvedSubjectConfig?.gestion) return;
    let cancelled = false;
    fetch(resolvedSubjectConfig.gestion)
      .then(res => res.ok ? res.json() : null)
      .then(json => {
        if (!cancelled && json) setIocGestionData(json);
      })
      .catch(err => console.error('Error cargando gestionData en LessonViewer:', err));
    return () => { cancelled = true; };
  }, [resolvedSubjectConfig?.gestion]);

  const isIocSubject = Boolean(resolvedSubjectConfig) && !isActivitiesSpringBoot && !isTheorySpringBoot && !isVideosSpringBoot && !isTutoriasCodigo;

  return {
    isPetete,
    isTheorySpringBoot,
    isActivitiesSpringBoot,
    isVideosSpringBoot,
    isTutoriasCodigo,
    isIfcd0177,
    isEntornos,
    isSepePhp,
    effectiveGestionSource,
    resolvedSubjectConfig,
    iocGestionData,
    isIocSubject
  };
}
