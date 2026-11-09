# CFGS Desarrollo de Aplicaciones Web (DAW)
## 0615 – Diseño de Interfaces Web
### Unidades 3 y 4: Elementos multimedia en la web. Contenidos interactivos para la web.

---

# ENUNCIADO EAC 2 (Curso 2026-27 / 1er semestre)

## Presentación y Resultados de Aprendizaje
Este ejercicio de evaluación continua (EAC) se corresponde con los contenidos trabajados en las Unidades 3 y 4: *Elementos multimedia en la web y contenidos interactivos para la web*.

### Resultados de aprendizaje:
1. Prepara archivos multimedia para la web, analizando sus características y manejando herramientas específicas.
2. Integra contenido multimedia en documentos web valorando su aportación y seleccionando adecuadamente los elementos interactivos.

---

## Criterios de Evaluación
* Reconocimiento de licencias y derechos de autor en el uso de material multimedia.
* Identificación de formatos de imagen, audio y vídeo a utilizar.
* Empleo de herramientas para el tratamiento digital de imagen, audio y vídeo.
* Realización de animaciones a partir de imágenes fijas.
* Importación y exportación de multimedia en diversos formatos según su finalidad.
* Aplicación de la guía de estilo.
* Identificación de configuración de navegadores web para soportar multimedia e interactividad.
* Uso de herramientas gráficas para contenido multimedia interactivo.
* Adición de elementos multimedia e interactividad en documentos web.
* Comprobación en diferentes navegadores.

---

## Forma y Fecha de Entrega
* **Fecha límite de entrega:** **26/11/2026** a las **23:55h**.
* **Publicación de soluciones y calificaciones:** **11/12/2026**.
* **Nombre del archivo comprimido:** `DAW_0615_EAC2_Cognom1_InicialDelCognom2.zip` (sin acentos, ej: `DAW_0615_EAC2_Garcia_M.zip`).
* **Contenido del .zip:** El documento de resolución en formato `.odt` debidamente cumplimentado y la carpeta con todos los archivos necesarios para ejecutar la web.

---

## 📝 Actividades del Enunciado (Puntuación Total: 10 Puntos)

### Actividad 1 – Logos, imágenes e iconografía (2 puntos)
En la EAC1 creamos la web de una tienda online de material escolar (**Papelería Ratolí**). Ahora es el momento de darle contenido multimedia e interactividad:

1. **Logotipo (0,5 puntos):**
   * Diseña con **GIMP** un logotipo para la web. Exporta en formato adecuado (PNG transparente o SVG) y agrégalo en la cabecera de `index.html` (al lado o encima del menú).
   * Utiliza capas, sombras o filtros en GIMP y describe las propiedades empleadas.
2. **Optimización de imágenes de productos (1 punto):**
   * Crea una nueva página en el portal: `imatges.html` (dentro de un nuevo menú desplegable llamado `EAC2`).
   * Selecciona dos imágenes de productos en alta resolución y edítalas con GIMP/Photoshop ajustando dimensiones y resolución (72 dpi).
   * Optimiza el peso sin comprometer la calidad exportando a formato óptimo (WebP o JPEG progresivo). Renombra y etiqueta con palabras clave SEO y describe las acciones tomadas y la reducción de peso conseguida.
3. **Iconos del menú principal (0,5 puntos):**
   * Añade iconos de **FontAwesome** (`https://fontawesome.com/icons`) en cada elemento del menú principal de navegación.

---

### Actividad 2 – Integración de audio en la web (1 punto)
1. **Audio y mezcla en Audacity (0,5 puntos):**
   * Graba con tu voz una locución de máximo 10 segundos explicando las diferencias entre los formatos **AVI** y **MP4**.
   * Descarga una pista musical libre de derechos (Creative Commons) y en **Audacity** realiza la mezcla de fondo (atenuando la música para que se entienda la voz).
   * Guarda el proyecto Audacity como `projecte.aup3` y exporta la mezcla como `MP4vsAVImix.mp3`.
   * Convierte el archivo a formato libre `.ogg` mediante **ffmpeg** (`ffmpeg -i MP4vsAVImix.mp3 -c:a libvorbis MP4vsAVImix.ogg`).
2. **Reproductor de audio con JavaScript (0,5 puntos):**
   * Crea la página `audio.html` con un titular.
   * Inserta la etiqueta `<audio>` sin los controles por defecto.
   * Diseña 4 botones interactivos con JavaScript: **Play audio**, **Pause audio**, **Volume DOWN** y **Volume UP**.

---

### Actividad 3 – Integración de vídeo en la web (1 punto)
1. **Vídeo-tutorial de jQuery UI (30-40 segundos):**
   * Graba con un software de captura de pantalla (**OBS Studio**, Screencastify o similar) un vídeo de 30-40 segundos explicando cómo utilizar un widget de **jQuery UI** (por ejemplo: Datepicker, Accordion o Tabs).
   * Muestra tu imagen en cámara web al inicio (3 segundos) y sigue un guion claro: ventana de jQuery UI, explorador de archivos con las librerías, editor de código con el HTML/CSS/JS y navegador mostrando el resultado.
2. **Incrustación del vídeo:**
   * Crea la página `video.html` e incrusta el vídeo tutorial con la etiqueta nativa `<video>` y sus controladores.

---

### Actividad 4 – Transiciones, animaciones y gráficas (4 puntos)
1. **Transición CSS (1 punto):**
   * Crea la página `transicions.html` y añade el enlace en el menú `EAC2`.
   * Crea el titular **"Promocions de la setmana"**: debe aparecer automáticamente con animación y cambiar de tamaño suavemente al pasar el ratón por encima (hover).
   * Añade dos productos en promoción con imagen y descripción que aparezcan con un efecto dinámico de movimiento.
2. **Gráfica de datos con D3.js (1,5 puntos):**
   * Crea la página `grafica.html` enlazada en el menú.
   * Utiliza la librería **D3.js** (`https://d3js.org/`) para representar la cuota de mercado de navegadores en Europa (2025):
     * Google Chrome: 62.66%
     * Safari: 17.80%
     * Edge: 6.66%
     * Firefox: 4.61%
     * Samsung Internet: 3.45%
     * Opera: 2.17%
   * Puedes elegir entre gráfico de barras, pastel o donut.
3. **Galería animada con Anime.js (1,5 puntos):**
   * Crea la página `galeria.html`.
   * Utiliza la librería **Anime.js** para construir una galería o carrusel animado de novedades de productos con botones para avanzar o retroceder.

---

### Actividad 5 – Librerías de interfaz de usuario: Angular-Material (2 puntos)
* Crea la página `contacte.html`.
* Implementa un formulario de contacto interactivo utilizando **Angular** y componentes de **Material Design**.
* Campos requeridos:
  * **Nombre** (obligatorio)
  * **Correo electrónico** (obligatorio y validación de formato)
  * **Teléfono**
  * **Mensaje**
* Debe incluir **validación de campos en tiempo real** y mostrar mensajes de error visuales si los campos requeridos no son válidos.
