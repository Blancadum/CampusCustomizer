# 🎨 Guía de Prompting para Desarrollo de Interfaces Web (`INT` - 0615): Cómo elaborar la asignatura y tus EACs con la IA

En **Diseño de Interfaces Web (`INT` - 0615)** del IOC, cada entrega (`EAC 1`, `EAC 2` y `EAC 3`) es acumulativa: diseñas y maquetas tu propia web comercial (con tu propia guía de estilos, paleta cromática, tipografía, estructura HTML/CSS, multimedia e interactividad) y la vas ampliando bloque a bloque.

Por eso, en **CampusCustomizer** tienes **el Libro Digital de teoría, el Plan de Trabajo en PDF y los enunciados oficiales**, pero **sin las entregas personales hechas**, junto con esta guía de prompting para que tú y la IA vayáis elaborando toda la asignatura y tus entregas con tu propio diseño 100% original.

---

## 📂 1. Material Oficial ya incluido en tu Campus

- 📖 **Libro Digital Interactivo (`/ioc/int/lecciones-int`):** `public/data/ioc/lecciones/interfaces.json` (con los 3 bloques: *Bloque 1: Usabilidad y UX*, *Bloque 2: Multimedia, Flexbox/Grid y Contenidos Interactivos*, *Bloque 3: Accesibilidad WCAG 2.2 AA*).
- 📄 **Plan de Trabajo Oficial (PDF):** `/fuentes/ioc/int/pt_interfaces.pdf`
- 📄 **Enunciado Oficial EAC 2 (Catalán y Español):**
  - `/eacs/int/INT_EAC2_Enunciat.odt` *(Plantilla oficial editable para entregar)*
  - `/eacs/int/INT_EAC2_Enunciat.md` *(Enunciado íntegro en catalán)*
  - `/eacs/int/INT_EAC2_Enunciado_ES.md` *(Enunciado traducido al castellano)*

---

## 🤖 2. Prompts Paso a Paso para ir elaborando la asignatura con la IA

Copia y pega en el chat de tu asistente de IA el prompt que necesites en cada momento del curso:

---

### 📚 PROMPT 1: Alimentar y ampliar el Libro Digital con nuevos PDFs de las Unidades (U1 a U6)

Cuando descargues del campus del IOC los PDFs de teoría de una unidad (ej. *Unitat 1, Unitat 2, Unitat 3, Unitat 4, Unitat 5 o Unitat 6*), mételos en **`public/fuentes/ioc/int/`** y dile a la IA:

```text
Hola. He metido los PDFs de teoría de Desarrollo de Interfaces Web (INT) en `public/fuentes/ioc/int/`.
Siguiendo la Regla 02 (`.agents/rules/02-libro-digital-toc-y-buscador.md`), lee los PDFs y amplía el Libro Digital en `public/data/ioc/lecciones/interfaces.json` en castellano:
- Estructura cada tema con Conceptos Clave al inicio, definiciones con la palabra clave en negrita, analogías visuales antes del código y bloques de código HTML/CSS/JS con botón de copiar.
- Genera diagramas SVG limpios para explicar los conceptos visuales (box model, Flexbox, Grid, heurísticas de Nielsen, formatos multimedia, pautas WCAG P.O.U.R.).
- Actualiza el diccionario inteligente `public/data/search_index.json` con todos los nuevos términos.
```

---

### ✏️ PROMPT 2: Elaborar tu `EAC 1` desde cero (Wireframes, Arquitectura, Guía de Estilos y Maquetación HTML5/CSS3)

Si quieres hacer (o rehacer) tu proyecto base de la **EAC 1** con tu propio estilo visual para no coincidir con ningún compañero:

```text
Hola. Quiero elaborar mi entrega EAC 1 de Desarrollo de Interfaces Web (INT) con un diseño 100% propio y original.
He dejado el enunciado de la EAC 1 en `public/eacs/int/`.
Mis preferencias para mi proyecto web son:
1. Mi nombre y apellidos (para el nombre del entregable `DAW_0615_EAC1_Apellido1_A`): [Tu Nombre y Apellidos]
2. Estilo visual y paleta de colores que me gusta: [Ej: Estilo minimalista nórdico en azul marino y menta / Estilo moderno cálido en terracota y crema / Estilo tech en violeta e índigo]
3. Tipografías que prefiero: [Ej: Inter + Playfair Display / Poppins + Roboto / Montserrat + Open Sans]

Ayúdame paso a paso a crear en una carpeta limpia `public/eacs/int/mi_eac1/`:
1) Los bocetos Wireframes Mobile-First y Desktop en SVG/HTML listos para exportar a PNG.
2) El diagrama de Arquitectura de la Información e Interlinking con Mermaid.
3) Mi Guía de Estilos (`guia_de_estilos.html` + `tokens.css`) con mi paleta, tipografías, botones y tarjetas.
4) La maquetación semántica HTML5 (`index.html`, `productes.html`, `estils.css`) con CSS Flexbox/Grid, microinteracciones CSS y diseño responsive.
5) Los textos redactados y justificados para pegar en mi memoria `.odt` / `.pdf`.
```

---

### 🎬 PROMPT 3: Elaborar tu `EAC 2` Paso a Paso (Multimedia, Audio JS, Vídeo jQuery UI, D3.js, Anime.js y Angular Material)

El enunciado de la **EAC 2** ya está incluido en `public/eacs/int/INT_EAC2_Enunciado_ES.md`. Para que la IA adapte todas las actividades a **tu propio proyecto web** y te cree incluso una vista paso a paso en la web:

```text
Hola. Vamos a hacer mi EAC 2 de Desarrollo de Interfaces Web leyendo `public/eacs/int/INT_EAC2_Enunciado_ES.md` y partiendo de los archivos de mi web de la EAC 1.
Mis datos son:
- Mi nombre y apellidos (para el ZIP `DAW_0615_EAC2_Apellido1_A.zip`): [Tu Nombre y Apellidos]
- Paleta y estilo de mi tienda web: [Indica tus colores o la carpeta donde tienes tu EAC 1]
- Widget de jQuery UI que prefiero para el vídeo de 30-40s: [Ej: Datepicker / Accordion / Tabs / Dialog]
- Tipo de gráfica D3.js que prefiero para la cuota de navegadores: [Ej: Gráfico de barras animado / Gráfico Donut / Gráfico de pastel]

Quiero que vayamos actividad por actividad (Actividad 1 a Actividad 5) y me generes en `public/eacs/int/mi_eac2/`:
1) Actividad 1 (2 pts): Guía rápida para mi logo en GIMP + página `imatges.html` con comparativa de optimización WebP + menú principal con iconos FontAwesome.
2) Actividad 2 (1 pt): Guion exacto de 10 segundos sobre AVI vs MP4 para grabar en Audacity + comando `ffmpeg` para pasar a `.ogg` + código completo de `audio.html` con mi reproductor personalizado en JavaScript (Play, Pause, Vol+, Vol-).
3) Actividad 3 (1 pt): Código funcional de `video.html` con el widget de jQuery UI + Guion hablado palabra por palabra (30-40 segundos) indicando qué mostrar en pantalla en cada segundo para grabarlo con OBS.
4) Actividad 4 (4 pts): Código completo y adaptado a mis colores de `transicions.html` (animación CSS + hover), `grafica.html` (gráfica interactiva D3.js con los datos de navegadores 2025) y `galeria.html` (carrusel animado con Anime.js).
5) Actividad 5 (2 pts): Formulario de contacto reactivo con Angular y Material Design (`contacte.html` / componente TS/HTML/CSS) con validaciones en tiempo real.
6) Todos los textos explicativos y técnicos listos para copiar y pegar en mi documento `INT_EAC2_Enunciat.odt`.
```

---

### ♿ PROMPT 4: Elaborar tu `EAC 3` (Accesibilidad WCAG 2.2 Nivel AA, WAI-ARIA y Auditoría P.O.U.R.)

Cuando se publique el enunciado de la **EAC 3** (Unidades 5 y 6):

```text
Hola. He dejado el enunciado de la EAC 3 de Interfaces en `public/eacs/int/`.
Lee el enunciado y el Bloque 3 de `public/data/ioc/lecciones/interfaces.json` (Accesibilidad WCAG 2.2 nivel AA, principios P.O.U.R. y WAI-ARIA).
Revisa el código HTML/CSS/JS de mi web y ayúdame paso a paso a:
1) Auditar y corregir los ratios de contraste cromático (mínimo 4.5:1 en texto normal y 3:1 en texto grande).
2) Añadir los atributos semánticos WAI-ARIA (`role`, `aria-label`, `aria-expanded`, `aria-live`), textos alternativos `alt` descriptivos y subtítulos/transcripciones en multimedia (`<track>`).
3) Garantizar la navegación 100% por teclado (`tabindex`, `:focus-visible`, enlaces "Saltar al contenido principal").
4) Redactar el informe de auditoría de accesibilidad para mi documento de entrega `.odt` / `.pdf`.
```

