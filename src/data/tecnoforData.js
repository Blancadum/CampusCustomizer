/**
 * tecnoforData.js
 * Datos estructurados oficiales del itinerario formativo de TecnoFor:
 * "Introducción al Desarrollo de Software y Agentes IA · Agentic Software Developer"
 * Subvencionado por el SEPE / Fundae.
 */

export const TECNOFOR_COURSE_DATA = {
  id: 'tecnofor-agentic',
  title: 'Introducción al Desarrollo de Software y Agentes IA',
  diplomaTitle: 'Agentic Software Developer',
  institution: 'TecnoFor · Formación 100% Subvencionada SEPE',
  dossierPdfUrl: '/documents/tecnofor/TecnoFor-dossier-itinerario-gratuito-agentic-sofwtare-developer.pdf',
  edition: '1ª Edición Oficial',
  dates: {
    start: '2026-11-03',
    end: '2027-01-26',
    display: '3 de noviembre de 2026 – 26 de enero de 2027',
    schedule: 'Lunes a jueves por la tarde (3 horas lectivas / día)',
    hoursPerDay: '3h/día',
    totalHours: '120h lectivas + 10h especialización agéntica'
  },
  modality: {
    type: 'Aula Virtual en Directo + Grabaciones',
    description: 'Sesiones interactivas en directo con instructores acreditados, laboratorios guiados en la nube, vídeos bajo demanda y masterclasses exclusivas.'
  },
  certifications: {
    sepe: [
      { code: 'IFCD0062', name: 'Fundamentos de Programación en Python', hours: '50h' },
      { code: 'IFCD006PO', name: 'Aplicaciones Java (Backend & POO)', hours: '30h' },
      { code: 'IFCD053PO', name: 'Desarrollo Web con Angular (Frontend SPA)', hours: '30h' }
    ],
    titulacionPropia: {
      name: 'Diploma Agentic Software Developer',
      issuer: 'TecnoFor',
      requirement: 'Superación de los 3 módulos troncales + Especialización SDD (Spec Driven Development)'
    },
    internationalCert: {
      name: 'PCAP™ · Certified Associate in Python Programming',
      issuer: 'Python Institute',
      alignment: 'El Bloque 1 de Python deja al alumno 100% preparado para este examen internacional.'
    }
  },
  philosophy: {
    quote: 'La IA agéntica no sustituye a la programación, la redirige. Un agente que escribe, revisa o despliega código solo es tan bueno como el criterio de quien lo dirige.',
    explanation: 'Ese criterio se construye entendiendo cómo funciona un sistema por dentro: cómo se representan los datos (Python), cómo se procesa la lógica de negocio (Java) y cómo se muestra al usuario (Angular). Por eso no empezamos por los agentes: primero dominas las capas de ingeniería de software, y solo entonces diriges a los agentes sin delegar lo que no comprendes.'
  },
  courses: [
    {
      id: 'python',
      sigla: 'PYTHON',
      num: '01',
      badge: 'EL DATO',
      color: '#10b981',
      bgGradient: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)',
      title: 'El Dato: Python & Programación Estructurada',
      sepeCode: 'IFCD0062',
      sepeTitle: 'Fundamentos de Programación en Python',
      hours: '50 horas',
      modulesCount: '5 módulos',
      certAlignment: 'Preparación para certificación internacional PCAP™ (Python Institute)',
      summary: 'Fundamentos de programación, procesamiento y estructuración de datos, colecciones avanzadas y salto a la programación orientada a objetos.',
      modules: [
        {
          num: 1,
          title: 'Introducción a Python y a la programación',
          hours: '15h',
          desc: 'Configuración del entorno de desarrollo y primeras líneas de código. Diferencia entre lenguajes compilados e interpretados, tipos de datos primitivos, variables, operadores aritméticos/lógicos, formateo y captura de entrada del usuario.'
        },
        {
          num: 2,
          title: 'Elementos y operaciones de programación',
          hours: '10h',
          desc: 'Control de flujo mediante condicionales (if, elif, else) y estructuras repetitivas (bucles while y for). Combinación de condiciones lógicas y trabajo con colecciones secuenciales: listas y matrices multidimensionales.'
        },
        {
          num: 3,
          title: 'Funciones, tuplas, diccionarios y procesamiento de datos',
          hours: '10h',
          desc: 'Modularización con funciones reutilizables, paso de argumentos por valor y referencia, y ámbito de variables (scope). Organización de información no estructurada con tuplas inmutables y diccionarios clave-valor.'
        },
        {
          num: 4,
          title: 'Módulos, paquetes, métodos y excepciones',
          hours: '8h',
          desc: 'Estructuración modular de código para escalar proyectos. Importación de módulos y namespaces, manejo robusto de excepciones (try, except, finally, raise) y métodos avanzados de cadenas de texto y listas.'
        },
        {
          num: 5,
          title: 'Introducción a la programación orientada a objetos',
          hours: '7h',
          desc: 'Salto a la arquitectura orientada a objetos: definición de clases, constructores, atributos y métodos encapsulados. Creación e instanciación de objetos, persistencia y manipulación de archivos. Cierre y simulacro de certificación PCAP™.'
        }
      ]
    },
    {
      id: 'java',
      sigla: 'JAVA',
      num: '02',
      badge: 'EL BACKEND',
      color: '#ea580c',
      bgGradient: 'linear-gradient(135deg, #c2410c 0%, #ea580c 50%, #f97316 100%)',
      title: 'El Backend: Java & Programación Orientada a Objetos',
      sepeCode: 'IFCD006PO',
      sepeTitle: 'Aplicaciones Java (Backend & POO)',
      hours: '30 horas',
      modulesCount: '2 módulos',
      certAlignment: 'Especialidad oficial SEPE del área de desarrollo backend empresarial',
      summary: 'Construcción de la lógica de negocio backend mediante Java tipado y robusto, con IDEs profesionales y patrones avanzados de POO.',
      modules: [
        {
          num: 1,
          title: 'Fundamentos de Java y Entornos de Desarrollo',
          hours: '15h',
          desc: 'Instalación y configuración de IDEs profesionales (Eclipse, IntelliJ IDEA o NetBeans). Arquitectura de la máquina virtual de Java (JVM y Bytecode), estructura de proyectos, compilación, tipos estrictos y primeros programas ejecutables.'
        },
        {
          num: 2,
          title: 'Programación Orientada a Objetos en Java',
          hours: '15h',
          desc: 'Diseño avanzado de clases y objetos. Implementación de los cuatro pilares de la POO: encapsulamiento, abstracción, herencia con superclases y polimorfismo dinámico. Gestión de excepciones comprobadas y no comprobadas.'
        }
      ]
    },
    {
      id: 'angular',
      sigla: 'ANGULAR',
      num: '03',
      badge: 'EL FRONTEND',
      color: '#e11d48',
      bgGradient: 'linear-gradient(135deg, #be123c 0%, #e11d48 50%, #f43f5e 100%)',
      title: 'El Frontend: Angular & Aplicaciones Web SPA',
      sepeCode: 'IFCD053PO',
      sepeTitle: 'Desarrollo de Aplicaciones Web con Angular',
      hours: '30 horas',
      modulesCount: '1 módulo intensivo',
      certAlignment: 'Especialidad oficial SEPE para desarrollo Frontend moderno',
      summary: 'Desarrollo de interfaces de usuario modernas, arquitectura de componentes, reactividad con RxJS, enrutamiento y consumo de APIs REST.',
      modules: [
        {
          num: 1,
          title: 'Arquitectura, estado e integración en Angular',
          hours: '30h',
          desc: 'Estructura modular y Standalone Components. Comunicación entre componentes (@Input, @Output), inyección de dependencias, gestión de estado con servicios y Observables reactivos (RxJS). Configuración de rutas (Router), formularios reactivos, conexión HTTP con APIs backend, testing unitario, depuración y optimización de rendimiento en producción.'
        }
      ]
    },
    {
      id: 'agentes',
      sigla: 'AGENTES',
      num: '04',
      badge: 'IA & AGENTES',
      color: '#8b5cf6',
      bgGradient: 'linear-gradient(135deg, #4338ca 0%, #6366f1 50%, #8b5cf6 100%)',
      title: 'IA Agéntica & Spec Driven Development (SDD)',
      sepeCode: 'TECNFOR-SDD',
      sepeTitle: 'Especialización Exclusiva TecnoFor · Agentic Developer',
      hours: '10h+ dedicación',
      modulesCount: '2 Hitos de Desbloqueo',
      certAlignment: 'Diploma Profesional Agentic Software Developer (TecnoFor)',
      summary: 'Dirección, supervisión y orquestación de agentes de IA mediante especificaciones técnicas estructuradas y el GitHub Spec Kit.',
      highlights: [
        '21 vídeos teóricos del curso SDD',
        '3 laboratorios prácticos guiados',
        '2 masterclasses exclusivas en directo',
        'Dominio de GitHub Spec Kit y CLI'
      ],
      sddPhases: [
        { step: 1, name: 'Especificar', desc: 'Marcar principios técnicos, intención, restricciones y arquitectura antes de que el agente escriba código.' },
        { step: 2, name: 'Planificar', desc: 'Desglosar el trabajo en tareas atómicas con dependencias y criterios de aceptación verificables.' },
        { step: 3, name: 'Implementar', desc: 'Delegar la ejecución al agente en un entorno acotado con TDD (Test-Driven Development).' },
        { step: 4, name: 'Validar', desc: 'Supervisión humana: contrastar con pruebas unitarias y evidencias externas. El agente ejecutor jamás se autoaprueba.' }
      ],
      modules: [
        {
          num: 1,
          title: 'Vibe Coding y sus desafíos',
          desc: 'Identificar los riesgos de programar sin especificaciones: pérdida de contexto en proyectos grandes y espiral interminable de depuración. Por qué un prototipo visual generado al vuelo no es software de producción.'
        },
        {
          num: 2,
          title: 'Introducción al Spec Driven Development (SDD)',
          desc: 'Definición formal de intención y restricciones. Cómo los planes y los documentos de especificación mantienen el contexto vivo tanto en proyectos creados desde cero como en bases de código legadas.'
        },
        {
          num: 3,
          title: 'Trabajo práctico con GitHub Spec Kit',
          desc: 'Constitución del proyecto, CLI de agentes y control de versiones con Git. Definición de requisitos, aclaraciones, decisiones arquitectónicas, especificación de tareas atómicas y ciclo TDD guiado.'
        },
        {
          num: 4,
          title: 'Personalización de Spec Kit para tu equipo',
          desc: 'Adaptación del flujo de trabajo con extensiones personalizadas, presets y directivas de configuración ajustadas a los principios de seguridad y arquitectura del proyecto.'
        }
      ]
    }
  ]
};

