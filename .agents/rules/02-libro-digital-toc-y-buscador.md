# Regla 02: Ingesta de PDFs Teóricos a JSON (`lecciones/*.json`), TOC Dinámico y Diccionario (`search_index.json`)

Esta regla define cómo el agente debe transformar los **PDFs de teoría del campus (IOC o UOC)** que el estudiante deposite en `public/fuentes/` en el **Libro Digital interactivo en formato JSON** y en el **Diccionario inteligente**.

---

## 1. 📚 Flujo Paso a Paso: De los PDFs del Campus al Libro Digital (`lecciones/<codigo>.json`)

### Lo que hace el estudiante:
1. Descarga del campus oficial todos los **PDFs de teoría** de la asignatura (por ejemplo, `U1_Tema1.pdf`, `U1_Tema2.pdf`, `U2_Tema1.pdf`...) y el **Plan de Trabajo PDF**.
2. Los guarda dentro de **`public/fuentes/ioc/<codigo>/`** (si es del IOC) o **`public/fuentes/uoc/<codigo>/`** (si es de la UOC).
3. Le dice a la IA: *"He metido los PDFs de la asignatura en `public/fuentes/...`, conviértelos en el Libro Digital JSON"*.

### Lo que el Agente de IA DEBE hacer automáticamente:
1. **Leer todos los PDFs** de esa carpeta y extraer su estructura completa sin dejarse ningún apartado técnico.
2. **Traducir todo el contenido al castellano** (si los PDFs originales están en catalán o inglés), manteniendo intactos únicamente los comandos de terminal, nombres de funciones, rutas o identificadores obligatorios.
3. **Aplicar la pedagogía de Blanca en cada tema (`contentMd`):**
   - Quitar cualquier referencia a *"Semana 1"*, *"Tutoría"*, *"Quincena"*.
   - Al inicio de cada Bloque/Unidad, crear una página de introducción (`"isOverview": true`) con:
     - **Conceptos Clave del Bloque**
     - **Tabla del Calendario de Entregas (EACs/PECs)**
     - **Tabla de Resultados de Aprendizaje (RA / Competencias)**
   - En cada tema (`"topicNum": "1.1"`, `"1.2"`, etc.):
     - Empezar cada definición poniendo el **término clave en negrita** (`**Concepto**`).
     - Incluir una **analogía de la vida real** dentro de una alerta `> [!NOTE]` o `> [!TIP]` antes de mostrar la sintaxis técnica.
     - Desarrollar un **ejemplo práctico de modelización** como hilo conductor con bloques de código comentados y listos para copiar.
4. **Generar el archivo JSON en `public/data/ioc/lecciones/<codigo>.json` (o `public/data/uoc/lecciones/<codigo>.json`) siguiendo ESTRICTAMENTE este esquema que lee `LessonViewer.jsx`:**

```json
[
  {
    "id": "u1-overview",
    "moduleId": "u1",
    "moduleShort": "Bloque 1",
    "moduleTitle": "Bloque 1: Nombre de la Unidad 1 (sin número delante de Bloque)",
    "topicNum": null,
    "title": "Introducción y Conceptos Clave del Bloque",
    "slug": "intro-bloque1",
    "badge": "SIGLA",
    "isOverview": true,
    "temaTitle": "Introducción",
    "audioUrl": "/fuentes/ioc/codigo/podcasts/intro-bloque1.mp3",
    "podcastTitle": "Podcast: Resumen del Bloque 1",
    "podcastPrompt": "Hazme un podcast dinámico explicando los conceptos clave del Bloque 1...",
    "contentMd": "Texto en Markdown con **Conceptos Clave**, tablas de entregas y RAs..."
  },
  {
    "id": "u1-tema-1-1",
    "moduleId": "u1",
    "moduleShort": "Bloque 1",
    "moduleTitle": "Bloque 1: Nombre de la Unidad 1",
    "topicNum": "1.1",
    "title": "Título del Apartado 1.1",
    "slug": "slug-limpio-sin-palabra-tema-ni-bloque",
    "badge": "SIGLA",
    "temaTitle": "Tema 1: Nombre del Tema",
    "contentMd": "### 1.1 Definición\n\nEl **concepto principal** es...\n\n> [!NOTE]\n> **Analogía de la vida real:** ...\n\n```bash\n# Código comentado listo para copiar\n```"
  }
]
```

---

## 2. 🔍 Actualización Automática del Diccionario / Buscador (`public/data/search_index.json`)

Cada vez que el agente convierta PDFs a `lecciones/<codigo>.json`, **también debe extraer todos los conceptos técnicos, siglas y anotaciones** y añadirlos a `public/data/search_index.json` cumpliendo la lógica del buscador de Blanca:
1. **Oculto por defecto:** El buscador no muestra resultados hasta que el usuario escribe en el input.
2. **Sin preposiciones:** No indexar preposiciones ni artículos (*"de"*, *"la"*, *"el"*, *"en"*, *"con"*, *"para"*) en `keywords`; solo palabras principales, secundarias y siglas (`DAO`, `POO`, `CRUD`, `DNS`, `HTTP`, `SQL`).
3. **Insensible a acentos y mayúsculas/minúsculas.**
4. **Disparador especial `@`:** Indexar las anotaciones, comandos clave o herramientas con `@` al inicio en `keywords` (ej. `"@eac"`, `"@pec"`, `"@Autowired"`, `"@VirtualHost"`) para que al escribir `@` en el buscador se desplieguen todas automáticamente.
5. **Esquema de cada entrada en `public/data/search_index.json`:**
```json
{
  "id": "codigo-1-1",
  "title": "1.1 Título del Tema o Concepto",
  "category": "IOC · Nombre Asignatura",
  "badge": "SIGLA",
  "url": "/ioc/codigo/lecciones-codigo/slug-limpio",
  "keywords": ["palabra1", "palabra2", "sigla", "@anotacion"],
  "summary": "Definición directa en una frase clara."
}
```
