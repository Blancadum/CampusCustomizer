/**
 * Configuración centralizada de las asignaturas de IOC y UOC en CampusCustomizer.
 * Incluye las asignaturas completas de Despliegue (DESP) e Itinerario de Empleabilidad II (IPO2),
 * además de plantillas limpias para añadir más módulos de IOC o UOC.
 */

export const IOC_SUBJECTS = [
  {
    code: 'desp',
    campus: 'ioc',
    sigla: 'DESP',
    title: 'Despliegue de Aplicaciones Web',
    shortTitle: 'Despliegue',
    color: '#22c55e',
    icon: '🚀',
    gestion: '/data/ioc/gestion/desp.json',
    lecciones: '/data/ioc/lecciones/despliegue.json',
    lessonPrefix: 'lecciones-desp',
    aliases: ['des', 'desp', 'despliegue'],
    repoName: 'ioc-despliegue-aplicaciones-web',
    devkitItems: [
      {
        title: 'Guía Paso a Paso EAC 2 (Git, LAMP & Tomcat)',
        description: 'Recorrido directo de los apartados 0 al 14 (a-bg) con comandos copiables, textos para el PDF y guiones de los 2 vídeos.',
        type: 'link',
        link: '/desp/eac2'
      },
      {
        title: 'Servidores Web Apache2 & VirtualHosts',
        description: 'Configuración en /etc/apache2/sites-available, puertos 80/443 y directiva DocumentRoot.',
        type: 'guide',
        slug: 'intro-bloque1'
      },
      {
        title: 'Servidor FTP Seguro & Permisos Linux',
        description: 'Gestión de grupos (comercials, auditors), permisos octales y servicios systemctl.',
        type: 'guide',
        slug: 'servidores-ftp'
      },
      {
        title: 'Labs Prácticos BBDD MySQL (LabEx)',
        description: 'Laboratorio cloud gratuito interactivo para practicar SQL, esquemas relacionales y administración de MySQL.',
        type: 'lab',
        link: 'https://labex.io/free-labs/mysql'
      }
    ]
  },
  {
    code: 'ipo1',
    campus: 'ioc',
    sigla: 'IPO1',
    title: 'Itinerario Personal para la Empleabilidad I',
    shortTitle: 'IPO 1',
    color: '#ea580c',
    icon: '💼',
    gestion: '/data/ioc/gestion/ipo1.json',
    lecciones: '/data/ioc/lecciones/ipo1_curso.json',
    lessonPrefix: 'lecciones-ipo1',
    aliases: ['ipo', 'ipo1', 'fol'],
    repoName: 'ioc-itinerario-empleabilidad-1',
    devkitItems: [
      {
        title: 'Derecho Laboral y Convenio Colectivo',
        description: 'Estatuto de los Trabajadores, derechos y deberes laborales en el sector IT y modalidades contractuales.',
        type: 'guide',
        slug: 'marco-laboral'
      },
      {
        title: 'Estructura Salarial y Nóminas',
        description: 'Cálculo de bases de cotización por contingencias comunes, retenciones IRPF y líquido a percibir.',
        type: 'guide',
        slug: 'nominas-seguridad-social'
      },
      {
        title: 'Prevención de Riesgos Laborales (PRL)',
        description: 'Salud ergonómica para desarrolladores frente a pantallas (PVD) y prevención de riesgos laborales.',
        type: 'guide',
        slug: 'salud-laboral-prl'
      }
    ]
  },
  {
    code: 'digi',
    campus: 'ioc',
    sigla: 'DIGI',
    title: 'Digitalización Aplicada',
    shortTitle: 'Digitalización',
    color: '#ec4899',
    icon: '💡',
    gestion: '/data/ioc/gestion/digi.json',
    lecciones: '/data/ioc/lecciones/digitalizacion.json',
    lessonPrefix: 'lecciones-digi',
    aliases: ['dig', 'digi', 'digitalizacion'],
    repoName: 'ioc-digitalizacion-aplicada',
    devkitItems: [
      {
        title: 'Las 5 V del Big Data y Ciclo de Vida del Dato',
        description: 'Volumen, Velocidad, Variedad, Veracidad y Valor + pipelines ETL en Data Lakes y Data Warehouses.',
        type: 'guide',
        slug: 'intro-bloque2'
      },
      {
        title: 'Industria 4.0, Sistemas Ciberfísicos (CPS) y THD',
        description: 'Fábricas inteligentes, Cloud vs Edge Computing, Gemelos Digitales y norma IEC 62443.',
        type: 'guide',
        slug: 'intro-bloque1'
      },
      {
        title: 'Guía de Prompting para preparar los Quizzes de DIGI',
        description: 'Prompts listos para hacer simulacros tipo test y contrastar preguntas con el Libro Digital.',
        type: 'link',
        link: '/eacs/digi/README_PROMPTING_QUIZ_DIGI.md'
      }
    ]
  },
  {
    code: 'int',
    campus: 'ioc',
    sigla: 'INT',
    title: 'Desarrollo de Interfaces Web',
    shortTitle: 'Interfaces',
    color: '#eab308',
    icon: '🎨',
    gestion: '/data/ioc/gestion/int.json',
    lecciones: '/data/ioc/lecciones/interfaces.json',
    lessonPrefix: 'lecciones-int',
    aliases: ['int', 'interfaces', 'diw'],
    repoName: 'ioc-desarrollo-interfaces-web',
    devkitItems: [
      {
        title: 'Guía de Prompting Interfaces (EAC 1, EAC 2, EAC 3 y Teoría)',
        description: 'Prompts para ampliar el Libro Digital y crear tu propio diseño y código en las EACs de Interfaces.',
        type: 'link',
        link: '/eacs/int/README_PROMPTING_INTERFACES.md'
      },
      {
        title: 'Usabilidad & Heurísticas de Jakob Nielsen',
        description: 'Las 10 heurísticas universales de UX, modelo mental del usuario y diseño Mobile-First.',
        type: 'guide',
        slug: 'intro-bloque1'
      },
      {
        title: 'Maquetación Avanzada: CSS Flexbox, Grid y Multimedia',
        description: 'Layouts bidimensionales, optimización WebP, audio/vídeo HTML5, D3.js, Anime.js y Angular Material.',
        type: 'guide',
        slug: 'intro-bloque2'
      },
      {
        title: 'Accesibilidad Web WCAG 2.2 (Nivel AA) y WAI-ARIA',
        description: 'Principios P.O.U.R., contraste mínimo 4.5:1, roles ARIA y navegación completa por teclado.',
        type: 'guide',
        slug: 'intro-bloque3'
      }
    ]
  },
  {
    code: 'asig-1',
    campus: 'ioc',
    sigla: 'PLANTILLA',
    title: 'Asignatura IOC (Plantilla Limpia)',
    shortTitle: 'Asignatura IOC',
    color: '#2563eb',
    icon: '🛠️',
    gestion: '/data/ioc/gestion/asig-1.json',
    lecciones: '/data/ioc/lecciones/asig-1.json',
    lessonPrefix: 'lecciones-asig-1',
    aliases: ['asig-1', 'asig1'],
    repoName: 'ioc-asignatura-1',
    devkitItems: [
      {
        title: 'Tema 1: Fundamentos y Arquitectura',
        description: 'Ejemplo de lección limpia con analogías del mundo real, bloques de código copiables y TOC dinámico.',
        type: 'guide',
        slug: '1-1-fundamentos-y-arquitectura'
      }
    ]
  }
];

export const UOC_SUBJECTS = [
  {
    code: 'uoc-1',
    campus: 'uoc',
    sigla: 'UOC 1',
    title: 'Asignatura UOC 1 (Plantilla Limpia con PEC)',
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
    sigla: 'UOC 2',
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
