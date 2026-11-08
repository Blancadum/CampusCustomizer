/**
 * Datos estructurados para la pestaña de resolución de problemas en Spring Boot.
 */

export const SHORTCUTS_DATA = [
  { action: 'Ejecutar aplicación', mac: 'Ctrl + R', win: 'Shift + F10', desc: 'Arranca la clase @SpringBootApplication seleccionada' },
  { action: 'Depurar (Debug)', mac: 'Ctrl + D', win: 'Shift + F9', desc: 'Arranque en modo depuración con breakpoints' },
  { action: 'Buscar Clase', mac: 'Cmd + O', win: 'Ctrl + N', desc: 'Salto directo a cualquier clase Java por nombre' },
  { action: 'Buscar Archivo', mac: 'Cmd + Shift + O', win: 'Ctrl + Shift + N', desc: 'Encuentra pom.xml, application.properties o SQL' },
  { action: 'Buscar en Todo', mac: 'Cmd + Shift + F', win: 'Ctrl + Shift + F', desc: 'Búsqueda global de texto o anotaciones' },
  { action: 'Formatear Código', mac: 'Cmd + Opt + L', win: 'Ctrl + Alt + L', desc: 'Aplica sangría e indentación estándar limpia' },
  { action: 'Organizar Imports', mac: 'Cmd + Opt + O', win: 'Ctrl + Alt + O', desc: 'Elimina imports no usados y reordena paquetes' },
  { action: 'Generar Código', mac: 'Cmd + N', win: 'Alt + Insert', desc: 'Crea constructores, equals/hashCode y toString' },
  { action: 'Renombrar Símbolo', mac: 'Shift + F6', win: 'Shift + F6', desc: 'Refactoriza clases o variables en todo el proyecto' },
  { action: 'Autocompletado', mac: 'Ctrl + Space', win: 'Ctrl + Space', desc: 'Sugerencias de Spring, clases y anotaciones' }
];

export const CHECKLIST_ITEMS = [
  { id: 'jdk', label: 'Java 17 o 21 LTS instalado (`java -version` responde correctamente)' },
  { id: 'javahome', label: 'Variable `JAVA_HOME` configurada y apuntando al JDK 17+' },
  { id: 'ide', label: 'IntelliJ IDEA Community instalado y con Annotation Processors activo para Lombok' },
  { id: 'maven', label: 'Maven funcional (mediante wrapper `./mvnw` o instalación global `mvn -v`)' },
  { id: 'git', label: 'Git instalado y con identidad configurada (`git config user.name / user.email`)' },
  { id: 'bootRun', label: 'Proyecto generado en start.spring.io y arrancado con éxito en puerto 8080' },
  { id: 'helloTest', label: 'Controlador de prueba `/api/saludo` devuelve respuesta JSON en navegador o Postman' }
];
