import { useState, useEffect } from 'react';

// Configuración de reuniones y contactos de Accenture
export const ACCENTURE_CONFIG = {
  contacts: {
    pmo: {
      name: 'Ivón (PMO)',
      email: 'programatufuturo@accenture.com'
    },
    tutor: {
      name: 'Isra',
      email: 'israel.b.rodriguez@accenture.com'
    }
  },
  meeting: {
    title: 'Orientación Laboral: Crear marca',
    dateTime: '21 de Octubre',
    teamsUrl: 'https://teams.microsoft.com/meet/23578874121195?p=hzPmYVGEgCl4QeTMZM',
    teamsId: '235 788 741 211 95',
    passcode: 'u5L7Hx9d'
  },
  meetings: [
    {
      id: 'acc_marca',
      title: 'Orientación Laboral: Crear marca',
      dateTime: '21 de Octubre',
      teamsUrl: 'https://teams.microsoft.com/meet/23578874121195?p=hzPmYVGEgCl4QeTMZM',
      teamsId: '235 788 741 211 95',
      passcode: 'u5L7Hx9d'
    },
    {
      id: 'acc_presentacion',
      title: 'Presentación de Proyecto',
      dateTime: '16 de Noviembre',
      teamsUrl: 'https://teams.microsoft.com/meet/27980786524665?p=TOaS8Fsl3dMslsgXpP',
      teamsId: '279 807 865 246 65',
      passcode: 'AV9Tg7VD'
    }
  ],
  activitiesSource: '/data/extra/accenture_actividades.json',
  courseActivitiesSource: '/data/extra/accenture_actividades_curso.json',
  defaultActivitiesCount: 13
};

let cachedActivitiesCount = null;
let fetchPromise = null;

export function getAccentureActivitiesCount() {
  if (cachedActivitiesCount !== null) return Promise.resolve(cachedActivitiesCount);
  if (!fetchPromise) {
    fetchPromise = fetch(ACCENTURE_CONFIG.activitiesSource)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          cachedActivitiesCount = data.length;
          return data.length;
        }
        return ACCENTURE_CONFIG.defaultActivitiesCount;
      })
      .catch(() => ACCENTURE_CONFIG.defaultActivitiesCount);
  }
  return fetchPromise;
}

/**
 * Hook reutilizable para obtener el total dinámico de actividades de Accenture
 * sin tener números hardcodeados en los componentes.
 */
export function useAccentureActivitiesCount() {
  const [count, setCount] = useState(() => cachedActivitiesCount || ACCENTURE_CONFIG.defaultActivitiesCount);

  useEffect(() => {
    let isMounted = true;
    getAccentureActivitiesCount().then(c => {
      if (isMounted) setCount(c);
    });
    return () => { isMounted = false; };
  }, []);

  return count;
}

