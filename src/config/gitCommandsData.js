/**
 * gitCommandsData.js
 * Base de datos de entregas oficiales para actividades de Spring Boot (Accenture)
 * y chuletas de comandos Git para el drawer lateral de lecciones.
 */

export const ACCENTURE_ACTIVITIES = [
  {
    num: 1,
    slug: '1-uso-de-ioc',
    title: 'Actividad 1 · Uso de IoC',
    type: 'folder', // Carpeta en rama SPRING-BOOT
    branch: 'SPRING-BOOT',
    folderTemplate: 'Spring Boot - Uso de IoC - {NAME}',
    zipTemplate: 'Spring Boot - Uso de IoC - {NAME}.zip',
    commitMsg: 'feat(act1): entrega uso IoC Spring con XML',
    l2eId: '8537',
    l2eUrl: 'https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8537',
    notesFile: null
  },
  {
    num: 2,
    slug: '2-uso-de-iod',
    title: 'Actividad 2 · Uso de IoD',
    type: 'folder',
    branch: 'SPRING-BOOT',
    folderTemplate: 'Spring Boot - Uso de IoD - {NAME}',
    zipTemplate: 'Spring Boot - Uso de IoD - {NAME}.zip',
    commitMsg: 'feat(act2): inyeccion dependencias IoD y properties',
    l2eId: '8539',
    l2eUrl: 'https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8539',
    notesFile: null
  },
  {
    num: 3,
    slug: '3-uso-java-annotations',
    title: 'Actividad 3 · Java Annotations',
    type: 'folder',
    branch: 'SPRING-BOOT',
    folderTemplate: 'Spring Boot - Uso de Java Annotations - {NAME}',
    zipTemplate: 'Spring Boot - Uso de Java Annotations - {NAME}.zip',
    commitMsg: 'feat(act3): configuracion Java Annotations pura',
    l2eId: '8539',
    l2eUrl: 'https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8539',
    notesFile: null
  },
  {
    num: 4,
    slug: '4-distintas-configuraciones',
    title: 'Actividad 4 · Distintas Configuraciones',
    type: 'folder',
    branch: 'SPRING-BOOT',
    folderTemplate: 'Spring Boot – Config en Spring - {NAME}',
    zipTemplate: 'Spring Boot - Config en Spring - {NAME}.zip',
    commitMsg: 'feat(act4): comparativa configuraciones XML y JavaConfig',
    l2eId: '8540',
    l2eUrl: 'https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8540',
    notesFile: null
  },
  {
    num: 5,
    slug: '5-preparacion-del-entorno',
    title: 'Actividad 5 · Preparación del Entorno',
    type: 'branch', // Rama específica con PR a main-spring-boot
    originBranch: 'main-spring-boot',
    branch: '00-preparacion-del-entorno',
    folderTemplate: 'taskmanager (raíz del proyecto)',
    zipTemplate: 'Spring Boot – Preparación del entorno - {NAME}.zip',
    commitMsg: 'feat(entorno): inicializacion taskmanager con notas',
    l2eId: '8541',
    l2eUrl: 'https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8541',
    notesFile: 'notas/NOTAS-00-preparacion-del-entorno.md'
  },
  {
    num: 6,
    slug: '6-creacion-del-controller',
    title: 'Actividad 6 · Creación del Controller REST',
    type: 'branch',
    originBranch: 'main-spring-boot',
    branch: '01-creacion-del-controller',
    prTitle: 'Spring Boot – Creación del Controller',
    folderTemplate: 'taskmanager (raíz del proyecto)',
    zipTemplate: 'Spring Boot – Creación del Controller - {NAME}.zip',
    commitMsg: 'feat(controller): implementacion TaskController CRUD en memoria',
    l2eId: '8542',
    l2eUrl: 'https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8542',
    notesFile: 'notas/NOTAS-01-creacion-del-controller.md'
  },
  {
    num: 7,
    slug: '7-creacion-capa-servicio',
    title: 'Actividad 7 · Creación de la Capa de Servicio',
    type: 'branch',
    originBranch: 'main-spring-boot',
    branch: '02-creacion-de-la-capa-de-servicio',
    prTitle: 'Spring Boot – Creación de la Capa de Servicio',
    folderTemplate: 'taskmanager (raíz del proyecto)',
    zipTemplate: 'Spring Boot – Creación de la Capa de Servicio - {NAME}.zip',
    commitMsg: 'feat(service): desacoplamiento y logica de negocio en TaskService y TaskServiceImpl',
    l2eId: '8543',
    l2eUrl: 'https://l2eportal-lms.cclearning.accenture.com',
    notesFile: 'notas/NOTAS-02-creacion-de-la-capa-de-servicio.md'
  },
  {
    num: 8,
    slug: '8-creacion-capa-entidades-relaciones',
    title: 'Actividad 8 · Entidades y Relaciones JPA',
    type: 'branch',
    originBranch: 'main-spring-boot',
    branch: '03-creacion-de-la-capa-de-entidades-y-sus-relaciones',
    prTitle: 'Spring Boot – Introducción a JPA y modelado de entidades',
    folderTemplate: 'taskmanager (raíz del proyecto)',
    zipTemplate: 'Spring Boot – Introducción a JPA y modelado de entidades - {NAME}.zip',
    commitMsg: 'feat(jpa): mapeo de entidad Task, enums y conexion MySQL con ddl-auto=validate',
    l2eId: '8544',
    l2eUrl: 'https://l2eportal-lms.cclearning.accenture.com',
    notesFile: 'notas/NOTAS-03-creacion-de-la-capa-de-entidades-y-sus-relaciones.md'
  },
  {
    num: 9,
    slug: '9-uso-spring-data-jpa',
    title: 'Actividad 9 · Uso de Spring Data JPA',
    type: 'branch',
    originBranch: 'main-spring-boot',
    branch: '04-uso-de-spring-data-jpa',
    prTitle: 'Spring Boot – Uso de Spring Data JPA',
    folderTemplate: 'taskmanager (raíz del proyecto)',
    zipTemplate: 'Spring Boot – Uso de Spring Data JPA - {NAME}.zip',
    commitMsg: 'feat(data-jpa): integracion TaskRepository JpaRepository, relaciones y paginacion',
    l2eId: '8545',
    l2eUrl: 'https://l2eportal-lms.cclearning.accenture.com',
    notesFile: 'notas/NOTAS-04-uso-de-spring-data-jpa.md'
  },
  {
    num: 10,
    slug: '10-creacion-de-los-dtos',
    title: 'Actividad 10 · Creación de los DTO\'s',
    type: 'branch',
    originBranch: 'main-spring-boot',
    branch: '05-creacion-de-los-dtos',
    prTitle: 'Spring Boot – Creación de los DTO\'s',
    folderTemplate: 'taskmanager (raíz del proyecto)',
    zipTemplate: 'Spring Boot – Creación de los DTO\'s - {NAME}.zip',
    commitMsg: 'feat(dto): blindaje de API con TaskRequestDTO, TaskResponseDTO y PagedResponseDTO',
    l2eId: '8546',
    l2eUrl: 'https://l2eportal-lms.cclearning.accenture.com',
    notesFile: 'notas/NOTAS-05-creacion-de-los-dtos.md'
  },
  {
    num: 11,
    slug: '11-uso-de-validaciones',
    title: 'Actividad 11 · Uso de Validaciones',
    type: 'branch',
    originBranch: 'main-spring-boot',
    branch: '06-uso-de-validaciones',
    prTitle: 'Spring Boot – Uso de Validaciones',
    folderTemplate: 'taskmanager (raíz del proyecto)',
    zipTemplate: 'Spring Boot – Uso de Validaciones - {NAME}.zip',
    commitMsg: 'feat(validations): validacion declarativa con @Valid y Bean Validation',
    l2eId: '8547',
    l2eUrl: 'https://l2eportal-lms.cclearning.accenture.com',
    notesFile: 'notas/NOTAS-06-uso-de-validaciones.md'
  },
  {
    num: 12,
    slug: '12-manejo-de-errores',
    title: 'Actividad 12 · Manejo Global de Errores',
    type: 'branch',
    originBranch: 'main-spring-boot',
    branch: '07-manejo-de-errores',
    prTitle: 'Spring Boot – Manejo global de errores',
    folderTemplate: 'taskmanager (raíz del proyecto)',
    zipTemplate: 'Spring Boot – Manejo global de errores - {NAME}.zip',
    commitMsg: 'feat(error-handling): centralizacion con @RestControllerAdvice y ErrorResponse',
    l2eId: '8548',
    l2eUrl: 'https://l2eportal-lms.cclearning.accenture.com',
    notesFile: 'notas/NOTAS-07-manejo-de-errores.md'
  },
  {
    num: 13,
    slug: '13-creacion-documentacion-api',
    title: 'Actividad 13 · Creación de la Documentación de la API',
    type: 'branch',
    originBranch: 'main-spring-boot',
    branch: '08-creacion-de-la-documentacion-de-la-api',
    prTitle: 'Spring Boot – Creación de la documentación de la API',
    folderTemplate: 'taskmanager (raíz del proyecto)',
    zipTemplate: 'Spring Boot – Creación de la documentación de la API - {NAME}.zip',
    commitMsg: 'feat(openapi): springdoc-openapi, @OpenAPIDefinition, @Tag, @Operation y Swagger UI',
    l2eId: '8549',
    l2eUrl: 'https://l2eportal-lms.cclearning.accenture.com',
    notesFile: 'notas/NOTAS-08-creacion-de-la-documentacion-de-la-api.md'
  },
  {
    num: 14,
    slug: '14-pruebas-en-aplicaciones-spring-boot',
    title: 'Actividad 14 · Pruebas en Aplicaciones Spring Boot',
    type: 'branch',
    originBranch: 'main-spring-boot',
    branch: '09-pruebas-en-aplicaciones-spring-boot',
    prTitle: 'Spring Boot – Pruebas en Aplicaciones Spring Boot',
    folderTemplate: 'taskmanager (raíz del proyecto)',
    zipTemplate: 'Spring Boot – Pruebas en Aplicaciones Spring Boot - {NAME}.zip',
    commitMsg: 'feat(testing): tests unitarios JUnit 5/Mockito, @DataJpaTest, @WebMvcTest y @SpringBootTest',
    l2eId: '8550',
    l2eUrl: 'https://l2eportal-lms.cclearning.accenture.com',
    notesFile: 'notas/NOTAS-09-pruebas-en-aplicaciones-spring-boot.md'
  }
];

export const GIT_CHEATSHEET_ITEMS = [
  {
    title: 'Ver estado del repositorio',
    cmd: 'git status -s',
    desc: 'Muestra los ficheros modificados, nuevos o preparados en formato compacto.'
  },
  {
    title: 'Ver diferencias exactas',
    cmd: 'git diff',
    desc: 'Compara cambios de tu código antes de añadirlos al staging.'
  },
  {
    title: 'Crear rama y cambiar a ella',
    cmd: 'git checkout -b feature/nueva-funcionalidad',
    desc: 'Crea una nueva rama de desarrollo y te posiciona en ella.'
  },
  {
    title: 'Guardar cambios en el cajón temporal (Stash)',
    cmd: 'git stash push -m "trabajo-en-progreso"\n# Para recuperarlo luego:\ngit stash pop',
    desc: 'Guarda temporalmente modificaciones sin hacer commit para cambiar de rama limpio.'
  },
  {
    title: 'Deshacer último commit manteniendo el código',
    cmd: 'git reset --soft HEAD~1',
    desc: 'Devuelve los archivos a staging para corregir el mensaje o añadir algo olvidado.'
  },
  {
    title: 'Limpiar archivos y compilados no rastreados',
    cmd: 'git clean -fd',
    desc: 'Borra ficheros y carpetas generados que no estén en seguimiento.'
  },
  {
    title: 'Comprobar URLs remotas de GitHub',
    cmd: 'git remote -v',
    desc: 'Verifica hacia qué repositorio de GitHub apunta fetch y push.'
  }
];
