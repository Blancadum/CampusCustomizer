// Configuración de herramientas, comandos Homebrew y checklists para las EACs de Entornos de Desarrollo
export const EAC_DEV_KITS = {
  u1: {
    eacId: 'eac1',
    moduleId: 'u1',
    unitTitle: 'Unidad 1: Modelado UML y Herramientas CASE',
    eacTitle: 'EAC 1 · Modelado Orientado a Objetos (Papyrus)',
    dueDate: '20 Octubre 2026',
    badge: 'UML & Papyrus',
    color: '#3b82f6',
    startSlug: 'intro-u1',
    summary: 'Modelado visual orientado a objetos, diagramas estructurales y de comportamiento con Eclipse y Papyrus.',
    installCommands: [
      {
        label: 'Java JDK 17 LTS (Requisito previo)',
        cmd: 'brew install openjdk@17 && sudo ln -sfn /opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-17.jdk',
        desc: 'Necesario para ejecutar Eclipse y herramientas de modelado de forma nativa en macOS.'
      },
      {
        label: 'Eclipse Modeling Tools (Incluye Papyrus)',
        cmd: 'brew install --cask eclipse-modeling',
        desc: 'Descarga directamente la versión oficial con Papyrus integrado para Apple Silicon (ARM64).'
      }
    ],
    shortcuts: [
      { key: 'File → New → Other... → Papyrus', label: 'Nuevo proyecto Papyrus (.di)' },
      { key: 'File → Save As Image File...', label: 'Exportar diagrama en PNG para la memoria' },
      { key: 'Window → Show View → Properties', label: 'Recuperar paleta de atributos y visibilidades' }
    ],
    tips: [
      'Un archivo .di por ejercicio: no acumules prácticas inconexas en el mismo modelo para evitar validaciones cruzadas lentas.',
      'Composición (rombo negro): si el contenedor muere, las partes mueren (Bicicleta ⯈ Cuadro).',
      'Agregación (rombo blanco): las partes pueden existir de forma independiente (Bicicleta ⯀ Ruedas de repuesto).',
      'Ingeniería directa: genera esqueletos Java con clic derecho → Designer → Generate code.'
    ],
    checklist: [
      'Clases con visibilidades (+, -, #) y tipos de datos primitivos o de objeto.',
      'Multiplicidades en ambos extremos de cada asociación (1, 0..1, 1..*).',
      'Comportamiento: diagrama de casos de uso con <<include>> o <<extend>> correctos.',
      'Diagrama de secuencia con líneas de vida y orden numérico de mensajes.',
      'Capturas nítidas exportadas en PNG y adjuntadas en la plantilla oficial.'
    ]
  },

  u2: {
    eacId: 'eac2',
    moduleId: 'u2',
    unitTitle: 'Unidad 2: IDEs, Interfaces Swing y Spring Boot',
    eacTitle: 'EAC 2 · Interfaces de Escritorio y Web (Swing & Spring)',
    dueDate: '17 Noviembre 2026',
    badge: 'Swing & Spring Boot',
    color: '#10b981',
    startSlug: 'intro-u2',
    summary: 'Construcción de interfaces gráficas con WindowBuilder (Swing), empaquetado y primera aplicación Spring Boot.',
    installCommands: [
      {
        label: 'Apache Maven (Gestor de dependencias)',
        cmd: 'brew install maven',
        desc: 'Para compilar proyectos Spring Boot y gestionar el ciclo de vida del software.'
      },
      {
        label: 'WindowBuilder en Eclipse (Conector Swing)',
        cmd: 'Help → Install New Software... → Añadir https://download.eclipse.org/windowbuilder/updates/release/latest',
        desc: 'Diseñador visual drag-and-drop para formularios JFrame y componentes gráficos.'
      }
    ],
    shortcuts: [
      { key: 'File → New → Other... → WindowBuilder → Swing', label: 'Nuevo JFrame / JPanel' },
      { key: 'mvn clean package', label: 'Generar archivo JAR ejecutable' },
      { key: 'java -jar target/app.jar', label: 'Ejecutar aplicación compilada desde terminal' }
    ],
    tips: [
      'Separar lógica y vista: nunca mezcles cálculos de negocio dentro de los ActionListeners de Swing.',
      'Tomcat en puerto 8080: si el puerto está ocupado, cámbialo en application.properties con server.port=8081.',
      'Usa el asistente de IA con criterio: verifica cada sugerencia antes de incorporarla al controlador.'
    ],
    checklist: [
      'Formulario Swing funcional con componentes visuales bien alineados.',
      'Manejo de eventos: escuchadores (ActionListeners) para botones y validaciones.',
      'Empaquetado correcto en archivo .jar con manifiesto de clase principal.',
      'Proyecto Spring Boot con controlador REST básico y formulario funcionando en localhost:8080.'
    ]
  },

  u3: {
    eacId: 'eac3',
    moduleId: 'u3',
    unitTitle: 'Unidad 3: Pruebas Unitarias, Refactorización y Git',
    eacTitle: 'EAC 3 · JUnit 5, Calidad y Control de Versiones',
    dueDate: '10 Diciembre 2026',
    badge: 'JUnit 5 & Git',
    color: '#8b5cf6',
    startSlug: 'intro-u3',
    summary: 'Diseño de casos de prueba con JUnit 5, depuración con breakpoints, documentación Javadoc y ramas Git.',
    installCommands: [
      {
        label: 'Git (Control de versiones)',
        cmd: 'brew install git',
        desc: 'Instala la última versión de Git optimizada para la terminal de macOS.'
      },
      {
        label: 'SonarQube CLI (Opcional - Análisis de calidad)',
        cmd: 'brew install --cask sonarqube-cli',
        desc: 'Herramienta de análisis estático de código para auditar code smells y deuda técnica.'
      }
    ],
    shortcuts: [
      { key: 'File → New → Other... → Java → JUnit Test Case', label: 'Crear caso de prueba JUnit 5' },
      { key: 'Run As → JUnit Test', label: 'Ejecutar suite de tests en Eclipse' },
      { key: 'Project → Generate Javadoc...', label: 'Generar web de documentación HTML' }
    ],
    tips: [
      'Clases de equivalencia: prueba al menos un valor válido, un valor fuera de rango y los valores límite exactos.',
      'Refactorización con red de seguridad: ejecuta los tests ANTES de tocar el código y DESPUÉS de cada cambio.',
      'Git limpio: revisa siempre git status y mantén un .gitignore que excluya .class, /bin y /target.'
    ],
    checklist: [
      'Batería de pruebas JUnit 5 con asserts descriptivos (assertEquals, assertThrows).',
      'Cobertura de casos límite y manejo de excepciones esperadas.',
      'Comentarios Javadoc completos en clases, métodos, parámetros (@param) y retornos (@return).',
      'Historial de Git con commits claros y resolución limpia de conflictos en ramas.'
    ]
  }
};
