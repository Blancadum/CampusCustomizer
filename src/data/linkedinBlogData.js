/**
 * Datos estructurados para el artículo de SEO en LinkedIn, Filtros ATS y Marca Personal.
 */

export const ATS_PROMPT_TEXT = `Actúa como un reclutador técnico senior y un sistema ATS (Applicant Tracking System) de última generación.
A continuación te proporciono:
1) La oferta de trabajo objetivo.
2) Mi perfil profesional actual / CV.

Por favor:
1. Extrae las 15 palabras clave principales (hard skills, tecnologías, frameworks y certificaciones) que el ATS buscará.
2. Calcula mi compatibilidad estimada (Match Score de 0 a 100%).
3. Identifica qué términos críticos me faltan para superar el umbral del 85%.
4. Redáctame una propuesta de sección 'Experiencia' y 'Acerca de' optimizada para LinkedIn donde estas keywords se integren de forma natural, asertiva y sin relleno artificial.`;

export const CHECKLIST_ITEMS = [
  { key: 'headline', label: 'Titular con Stack Técnico y Rol (Ej: Full-Stack Developer | Java · Spring Boot · React)', category: 'SEO LinkedIn' },
  { key: 'about', label: 'Sección "Acerca de" con gancho, elevator pitch y tecnologías estructuradas con viñetas', category: 'SEO LinkedIn' },
  { key: 'skills', label: 'Las 3 habilidades principales fijadas en el top (Java, Spring Framework, REST)', category: 'SEO LinkedIn' },
  { key: 'cvFormat', label: 'CV en formato ATS-Friendly: 1 columna, sin tablas complejas ni iconos gráficos que rompan el parser', category: 'Filtros ATS' },
  { key: 'githubLinks', label: 'Enlaces directos y verificables a repositorios en GitHub y demos activas', category: 'Marca Personal' },
  { key: 'recommendations', label: 'Al menos 2 recomendaciones cruzadas de compañeros, mentores o profesores de IOC/Accenture', category: 'Autoridad' }
];
