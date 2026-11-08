/**
 * Configuración centralizada de las asignaturas de IOC y UOC (Plantilla Limpia)
 * Cada compañero puede renombrar las asignaturas o pedirle a la IA que añada las suyas.
 */

export const IOC_SUBJECTS = [
  {
    code: 'asig-1',
    campus: 'ioc',
    title: 'Asignatura IOC 1 (Ejemplo con Libro y EAC)',
    shortTitle: 'Asignatura 1',
    color: '#2563eb',
    icon: '🛠️',
    gestion: '/data/ioc/gestion/asig-1.json',
    lecciones: '/data/ioc/lecciones/asig-1.json',
    lessonPrefix: 'lecciones-asig-1',
    aliases: ['asig-1', 'asig1'],
    repoName: 'ioc-asignatura-1',
    devkitItems: [
      {
        title: 'Guía Paso a Paso EAC (Workbench Interactivo)',
        description: 'Recorrido directo con comandos copiables, textos listos para el PDF y guiones hablados para los vídeos.',
        type: 'link',
        link: '/ioc/asig-1/eac1'
      },
      {
        title: 'Tema 1: Fundamentos y Arquitectura',
        description: 'Ejemplo de lección con analogías del mundo real, bloques de código copiables y TOC dinámico.',
        type: 'guide',
        slug: '1-1-fundamentos-y-arquitectura'
      }
    ]
  },
  {
    code: 'asig-2',
    campus: 'ioc',
    title: 'Asignatura IOC 2 (Plantilla Limpia)',
    shortTitle: 'Asignatura 2',
    color: '#16a34a',
    icon: '🚀',
    gestion: '/data/ioc/gestion/asig-2.json',
    lecciones: '/data/ioc/lecciones/asig-2.json',
    lessonPrefix: 'lecciones-asig-2',
    aliases: ['asig-2', 'asig2'],
    repoName: 'ioc-asignatura-2',
    devkitItems: [
      {
        title: 'Tema 1: Introducción al Módulo',
        description: 'Plantilla base lista para rellenar con tus apuntes o PDFs de la asignatura.',
        type: 'guide',
        slug: '1-1-introduccion'
      }
    ]
  },
  {
    code: 'asig-3',
    campus: 'ioc',
    title: 'Asignatura IOC 3 (Plantilla Limpia)',
    shortTitle: 'Asignatura 3',
    color: '#eab308',
    icon: '🎨',
    gestion: '/data/ioc/gestion/asig-3.json',
    lecciones: '/data/ioc/lecciones/asig-3.json',
    lessonPrefix: 'lecciones-asig-3',
    aliases: ['asig-3', 'asig3'],
    repoName: 'ioc-asignatura-3',
    devkitItems: []
  }
];

export const UOC_SUBJECTS = [
  {
    code: 'uoc-1',
    campus: 'uoc',
    title: 'Asignatura UOC 1 (Ejemplo con PEC y Apuntes)',
    shortTitle: 'UOC Asignatura 1',
    color: '#7c3aed',
    icon: '🏛️',
    gestion: '/data/uoc/gestion/uoc-1.json',
    lecciones: '/data/uoc/lecciones/uoc-1.json',
    lessonPrefix: 'lecciones-uoc-1',
    aliases: ['uoc-1', 'uoc1'],
    repoName: 'uoc-asignatura-1',
    devkitItems: [
      {
        title: 'Guía Paso a Paso PEC 1 (Workbench Interactivo)',
        description: 'Plantilla paso a paso para resolver tu PEC de la UOC con textos para memoria y guion de vídeo.',
        type: 'link',
        link: '/uoc/uoc-1/pec1'
      },
      {
        title: 'Reto 1: Conceptos Clave de la PEC',
        description: 'Ejemplo de libro digital estructurado para estudiar los módulos de la UOC.',
        type: 'guide',
        slug: '1-1-conceptos-clave-pec'
      }
    ]
  },
  {
    code: 'uoc-2',
    campus: 'uoc',
    title: 'Asignatura UOC 2 (Plantilla Limpia)',
    shortTitle: 'UOC Asignatura 2',
    color: '#ec4899',
    icon: '💡',
    gestion: '/data/uoc/gestion/uoc-2.json',
    lecciones: '/data/uoc/lecciones/uoc-2.json',
    lessonPrefix: 'lecciones-uoc-2',
    aliases: ['uoc-2', 'uoc2'],
    repoName: 'uoc-asignatura-2',
    devkitItems: []
  }
];

export const ALL_SUBJECTS = [...IOC_SUBJECTS, ...UOC_SUBJECTS];

export const getIocSubjectByCode = (codeOrAlias) => {
  if (!codeOrAlias) return null;
  const norm = String(codeOrAlias).toLowerCase().trim();
  return ALL_SUBJECTS.find(s =>
    s.code === norm ||
    s.aliases.includes(norm) ||
    s.lessonPrefix === norm ||
    s.title.toLowerCase().includes(norm)
  ) || null;
};
