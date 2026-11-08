/**
 * ============================================================================
 * @module activityStructures
 * @description Árboles canónicos de paquetes y directorios Maven para retos
 *              y actividades prácticas de Spring Boot & Accenture Bootcamp.
 * ============================================================================
 */

export const DEFAULT_ACTIVITY_STRUCTURES = {
  '1-uso-de-ioc': `JavaSpringIoC/
├── pom.xml
└── src/
    └── main/
        ├── java/
        │   └── com/
        │       └── accenture/
        │           ├── main/
        │           │   └── Main.java             # Arranque y llamada a IoC
        │           └── model/
        │               └── Grupo.java            # Modelo POJO de Grupo Musical
        └── resources/
            └── applicationContext.xml            # Definición del Bean en el contenedor`,

  '2-uso-de-iod': `JavaSpringIoD/
├── pom.xml
└── src/
    └── main/
        ├── java/
        │   └── com/
        │       └── accenture/
        │           ├── main/
        │           │   └── Main.java             # Arranque y ejecución
        │           └── model/
        │               ├── Componente.java       # Integrante musical
        │               └── Grupo.java            # Grupo con lista inyectada
        └── resources/
            ├── applicationContext.xml            # Inyección de dependencias XML
            └── datosGrupo.properties             # Fichero externo de propiedades`,

  '3-uso-java-annotations': `JavaSpringConfigClaseJava/
├── pom.xml
└── src/
    └── main/
        ├── java/
        │   └── com/
        │       └── accenture/
        │           ├── config/
        │           │   └── GruposConfig.java     # @Configuration, @Bean, @PropertySource
        │           ├── main/
        │           │   └── Main.java             # AnnotationConfigApplicationContext
        │           └── model/
        │               ├── Componente.java       # POJO de integrante
        │               └── Grupo.java            # POJO de grupo musical
        └── resources/
            └── datosGrupo.properties             # Fichero de propiedades`,

  '4-distintas-configuraciones': `JavaSpringEventosMusicales/
├── pom.xml
└── src/
    └── main/
        ├── java/
        │   └── com/
        │       └── accenture/
        │           ├── config/
        │           │   └── SpringConfig.java     # Configuración Java moderna
        │           ├── main/
        │           │   └── Main.java             # Demostración de las 3 opciones
        │           ├── model/
        │           │   └── Evento.java           # Modelo de evento
        │           └── services/
        │               ├── GestionEventos.java   # Interfaz del servicio
        │               └── GestionEventosImpl.java
        └── resources/
            ├── applicationContextXML.xml         # Opción 1: XML puro
            └── applicationContext.xml            # Opción 2: Mixto (XML + Component-Scan)`,

  '5-preparacion-del-entorno': `taskmanager/
├── pom.xml                                       # Dependencias: Web, Lombok, DevTools
├── notas/
│   └── NOTAS-00-preparacion-del-entorno.md       # Preguntas Ask y reflexiones
└── src/
    └── main/
        ├── java/
        │   └── com/
        │       └── accenture/
        │           └── taskmanager/
        │               └── TaskmanagerApplication.java  # @SpringBootApplication
        └── resources/
            └── application.properties            # server.port=8080`,

  '6-creacion-del-controller': `taskmanager/
├── pom.xml
├── notas/
│   ├── NOTAS-00-preparacion-del-entorno.md
│   └── NOTAS-01-creacion-del-controller.md
└── src/
    └── main/
        └── java/
            └── com/
                └── accenture/
                    └── taskmanager/
                        ├── TaskmanagerApplication.java
                        ├── controller/
                        │   └── TaskController.java      # @RestController (/api/v1/tasks)
                        └── model/
                            └── Task.java                # Modelo POJO de Tarea`,

  '7-creacion-de-la-capa-de-servicio': `taskmanager/
├── pom.xml
├── notas/
│   └── NOTAS-02-creacion-de-la-capa-de-servicio.md
└── src/
    └── main/
        └── java/
            └── com/
                └── accenture/
                    └── taskmanager/
                        ├── controller/
                        │   └── TaskController.java      # Solo delega en TaskService
                        ├── model/
                        │   └── Task.java
                        └── service/
                            ├── TaskService.java         # Interfaz de negocio (DIP)
                            └── impl/
                                └── TaskServiceImpl.java # Implementación @Service`,

  '8-introduccion-jpa-entidades': `taskmanager/
├── pom.xml                                       # Dependencias JPA & Driver DB
├── notas/
│   └── NOTAS-03-creacion-de-la-capa-de-entidades-y-sus-relaciones.md
└── src/
    └── main/
        ├── java/
        │   └── com/
        │       └── accenture/
        │           └── taskmanager/
        │               └── model/
        │                   ├── Category.java            # @Entity @OneToMany
        │                   ├── Tag.java                 # @Entity @ManyToMany
        │                   └── Task.java                # @Entity @ManyToOne @ManyToMany
        └── resources/
            ├── application.properties                   # Conexión DB (MySQL / H2)
            └── schema.sql                               # Script de base de datos`,

  '9-uso-de-spring-data-jpa': `taskmanager/
├── pom.xml
├── notas/
│   └── NOTAS-04-uso-de-spring-data-jpa.md
└── src/
    └── main/
        └── java/
            └── com/
                └── accenture/
                    └── taskmanager/
                        ├── repository/
                        │   ├── CategoryRepository.java  # JpaRepository<Category, Long>
                        │   ├── TagRepository.java       # JpaRepository<Tag, Long>
                        │   └── TaskRepository.java      # JpaRepository con queries derivadas
                        └── service/impl/
                            └── TaskServiceImpl.java     # Usa TaskRepository para persistencia`,

  '10-creacion-de-los-dtos': `taskmanager/
├── pom.xml
├── notas/
│   └── NOTAS-05-creacion-de-los-dtos.md
└── src/
    └── main/
        └── java/
            └── com/
                └── accenture/
                    └── taskmanager/
                        ├── dto/
                        │   ├── CategoryRequestDTO.java
                        │   ├── CategoryResponseDTO.java
                        │   ├── PagedResponseDTO.java    # DTO genérico de paginación
                        │   ├── TaskRequestDTO.java
                        │   └── TaskResponseDTO.java
                        ├── mapper/
                        │   ├── CategoryMapper.java      # Entity <-> DTO
                        │   └── TaskMapper.java
                        ├── controller/                  # Trabaja con DTOs
                        └── service/                     # Orquesta mappers y repos`,

  '11-uso-de-validaciones': `taskmanager/
├── pom.xml                                       # Dependencia: spring-boot-starter-validation
├── notas/
│   └── NOTAS-06-uso-de-validaciones.md
└── src/
    └── main/
        └── java/
            └── com/
                └── accenture/
                    └── taskmanager/
                        ├── controller/
                        │   └── TaskController.java      # @Valid en parámetros @RequestBody
                        └── dto/
                            └── TaskRequestDTO.java      # @NotBlank, @Size, @NotNull`,

  '12-manejo-global-de-errores': `taskmanager/
├── pom.xml
├── notas/
│   └── NOTAS-07-manejo-de-errores.md
└── src/
    └── main/
        └── java/
            └── com/
                └── accenture/
                    └── taskmanager/
                        ├── dto/
                        │   └── ErrorResponse.java       # DTO estándar de error
                        └── exception/
                            ├── GlobalExceptionHandler.java  # @RestControllerAdvice
                            └── TaskNotFoundException.java   # Excepción de negocio`,

  '13-documentacion-api-swagger': `taskmanager/
├── pom.xml                                       # Dependencia: springdoc-openapi-starter-webmvc-ui
├── notas/
│   └── NOTAS-08-creacion-de-la-documentacion-de-la-api.md
├── capturas/
│   └── Captura-08-creacion-de-la-documentacion-de-la-api-swagger-1.png
└── src/
    └── main/
        └── java/
            └── com/
                └── accenture/
                    └── taskmanager/
                        ├── config/
                        │   └── OpenApiConfig.java       # @OpenAPIDefinition
                        ├── controller/                  # Anotados con @Tag y @Operation
                        └── dto/                         # Anotados con @Schema`
};

export function resolveProjectStructure(activeTopic) {
  if (!activeTopic) return null;

  // 1. Si está definido explícitamente en el JSON
  if (activeTopic.projectStructure) {
    return activeTopic.projectStructure;
  }

  // 2. Si coincide con el mapa maestro por slug
  if (activeTopic.slug && DEFAULT_ACTIVITY_STRUCTURES[activeTopic.slug]) {
    return DEFAULT_ACTIVITY_STRUCTURES[activeTopic.slug];
  }

  // 3. Si en solucionDoc hay un bloque ```text ... ``` con el árbol de carpetas
  if (activeTopic.solucionDoc) {
    const match = activeTopic.solucionDoc.match(/```text\s*([\s\S]*?(?:├──|└──)[\s\S]*?)```/);
    if (match && match[1]) {
      return match[1].trim();
    }
  }

  return null;
}
