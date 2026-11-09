# 📜 Prompts Reales de Blanca — Cómo se construyó toda la Web de MiCampus

Este archivo recopila los **prompts reales que Blanca utilizó** paso a paso para diseñar, migrar, pulir y perfeccionar **MiCampus**, sus Libros Digitales interactivos, sus buscadores y sus guías de entregas.

> 💡 **Nota para compañeros de IOC y UOC:**
> No necesitas volver a escribir estos prompts desde cero porque **ya están convertidos en reglas automáticas dentro de `AGENTS.md` y `.agents/rules/`**. Cuando abras esta carpeta con tu IA, la IA ya sabe que debe responderte siguiendo todas estas directrices de Blanca automáticamente.

---

## 1. Prompts de Creación del Campus Hub, Agenda Escolar y Calendario `.ics`

### Prompt 1.1 — Limpieza y Personalización de los Calendarios `.ics` del Campus (El origen: `ics-customizer`)
> *"He exportado del campus los archivos `.ics` de mis asignaturas y sus Planes de Trabajo. Necesito que personalices los `.ics` de cada asignatura en `data/calendars/source/`:*
> *1. **Elimina todas las fechas en que salen/se publican los enunciados** ('Inicio EAC', 'Apertura', 'Publicación del enunciado'), porque solo meten ruido en el calendario.*
> *2. Deja únicamente las **fechas límite de entrega reales** ('Fin EAC1', 'Fin EAC2', 'Fin EAC3') indicando su porcentaje de la Evaluación Continua (`40% AC`, `30% AC`), las fechas de notas/soluciones, la PAF y los **bloques de estudio por Unidad (`U1`, `U2`, `U3`)** como eventos transparentes (`TRANSP:TRANSPARENT`) para que salgan como una barra superior sin ocupar horas.*
> *3. Ponle a **cada asignatura su propio color y su círculo de color en el título**: `🔵 ENT` (`#1E90FF`), `🟢 DESP` (`#34C759`), `🟣 DIG` (`#AF52DE`), `🟡 INTER` (`#F5A623`), `🟠 IPO` (`#FFA500`).*
> *4. Crea el script `build_hub_calendar.py` y el ejecutable `Sincronizar-Calendario-Mac.command` para unir todos los `.ics` sin duplicados e importarlos con alertas Push directamente en el Calendario de mi Mac y mi iPhone."*

### Prompt 1.2 — Migración y blindaje del diseño visual de la Agenda Escolar
> *"Quiero simplificar mi proyecto de agenda escolar al presente MiCampus. Adelante, no quiero perder estilos, que conste. Es mi agenda escolar, ¿ok? Me gustaría que dejaras por escrito un markdown para tus agentes, para que todos lean que lo único que quiero es migrar para mejorar pero no cambiar funcionalidades, ni tocar estilos. Implementa el relojito en directo, el saludo dinámico según la hora ('Buenos días', 'Buenas tardes', 'Buenas noches'), la tarjeta de 'Próxima Entrega' con cuenta atrás de días y el botón de sincronizar calendario `.ics`."*

### Prompt 1.2 — Tarjetas del Campus en la Home y botón de Archivar Cursos
> *"En la home de MiCampus haz tarjetas como la de IOC que tengan los botones principales para entrar a cada asignatura con su sigla, icono y color. Además, habría que crear un botón 📦 en la esquina superior derecha de cada tarjeta que permita archivar o desarchivar el curso desde la home con pestañas '🚀 Activos' y '📦 Archivados' guardando el estado en `localStorage`."*

### Prompt 1.3 — Micro-Backend para Guardar Entregas, Tachado To-Do y Calendario `.ics` Inteligente
> *"Crea un sistema integrado de entregas, To-Do flotante y calendarios `.ics`:*
> *1. En la página de cada asignatura, pon un botón '☁️ Guardar Copia Segura' para subir el archivo entregable a `public/uploads/` y un botón 'Marcar como entregado'.*
> *2. Crea un widget To-Do global que lea todas las entregas de los JSON de las asignaturas ordenadas por fecha: pendientes con casilla vacía, entregadas tachadas.*
> *3. Cada vez que una entrega pase de `pending` a `done`, recalcula la barra de progreso de la asignatura y regenera automáticamente el archivo `todo.ics` incluyendo solo las entregas pendientes con alarma 2 días antes (`VALARM`), para que al sincronizar con el Calendario del Mac se borren las ya entregadas."*

---

## 2. Prompts de Diseño del Libro Digital, Menús Laterales (Aside + TOC) y Rutas Limpias

### Prompt 2.1 — Aprovechamiento del ancho en pantallas grandes y Modo Claro/Oscuro
> *"Me encanta, solo te voy a pedir un favor: ¿podrías ampliar la parte central donde está el contenido (quitando padding lateral izquierdo y derecho), así aprovechamos mejor el espacio del ancho en pantallas grandes como la mía que es donde trabajaré principalmente? Añade también un botón para modo oscuro o diurno asegurándote de que todas las etiquetas y cajas se vean bien en plantilla clara."*

### Prompt 2.2 — Menú Lateral Izquierdo (Contexto) + TOC Dinámico Derecho por Tema (Scroll-Spy)
> *"Quiero que te asegures de que el menú aside de la izquierda quede como siempre dando contexto, y el de la derecha dependa de cada tema (uno por tema, no por bloque), que sirva para navegar entre los apartados de ese tema. A medida que vaya avanzando y se haga scroll en la página, quiero que vaya sombreándose también la parte del índice del aside que sirva como referencia para ver por dónde voy, y que se mueva la barrita de progreso de lectura."*

### Prompt 2.3 — Detalle de UX en el Menú Lateral (Sin salto de línea y separar triángulo de texto)
> *"En el menú hago hover y se pone negrita, con el consiguiente efecto wrapper (salto de línea); ¿podrías hacer el ancho del menú un pelín más grande para que esto no pase en ninguno de los dispositivos? Además, deja el icono del triángulo para replegar y desplegar el contenido en el menú, pero si se clica encima de la parte de letras, que me lleve al título del contenido clicado con top margin 0. Elimina 'Cuaderno principal' del menú izquierdo porque ya se carga con el inicio de la web."*

### Prompt 2.4 — Limpieza de Títulos, Numeración y URLs Amigables
> *"Dos puntualizaciones:*
> *1. Quita todas las menciones a 'Tutoría/s' o 'Semana/s'. No necesito eso, necesito que organices bien el contenido, me da igual el tiempo.*
> *2. Al inicio del nombre del Bloque hay un número ('3. Bloque 2: ...'). Elimínalo. No queda bien, simplemente 'Bloque 2: ...'. Enumera mejor los apartados, que sea algo seguido: `1.`, `1.1`, `1.2`.*
> *3. En las URLs no quiero que se muestre `.php` ni `.html`, ni las palabras 'tema' ni 'bloque', sino slugs limpios con el nombre clave del módulo y del tema."*

### Prompt 2.5 — Estética Humana (No "Cajas de IA") y Estabilidad de Tarjetas
> *"Me gustaría que el diseño no fuera tan IA: quiero un aspecto más humano y limpio. Trabájate los estilos de las tarjetas para que, si van a aumentar dos líneas en algún sitio, no se mueva ni se descuadre todo el bloque. Si unas etiquetas no son enlaces, no deben tener forma de botones."*

---

## 3. Prompts de Pedagogía: Conceptos Clave, Negritas, Analogías y Modelización

### Prompt 3.1 — Conceptos Clave por Bloque y Negrita en cada Definición
> *"Quiero que hagas un pequeño apartado de conceptos al principio de cada bloque listando los términos clave que se van a ver. Añade una introducción explicativa sin mucha morralla en cada tema. Cuando definas algo, pon siempre la palabra clave en negrita al principio, por ejemplo: 'El **modelo Entidad-Relación** es una forma de representar conceptualmente una base de datos antes de implementarla'."*

### Prompt 3.2 — Analogías de la Vida Real y Ejemplo de Modelización como Hilo Conductor
> *"Necesito más contenido en los temas con ejemplos de la vida real y en código de cómo sería en cada caso. Explica cada concepto o restricción (`PRIMARY KEY`, `NOT NULL`, `UNIQUE`, `DEFAULT`, `CHECK`, `FOREIGN KEY`) con una analogía cotidiana y un ejemplo práctico. Echo en falta un ejemplo de modelización para toda la teoría: desarrolla un ejemplo de puesta en práctica y adáptalo a cada apartado teórico manteniendo un flujo fluido, acompañándolo de fragmentos de código con espacio y botón para copiar texto."*

### Prompt 3.3 — Imágenes Envueltas en Texto (Flexbox), Esquemas al 100% y Flechas en Móvil
> *"Reduce un poco el tamaño de las imágenes ilustrativas y ponlas con el texto rodeando tipo flexbox. Para los diagramas grandes de errores o arquitectura, hazlos en estilo claro y con ancho 100% de la web. Y un detallito en los diagramas de flujo (`1. Diseño ➔ 2. Exposición ➔ 3. Lógica`): en móvil la flecha debe ir hacia abajo (`↓`) porque se muestra al 100% de la pantalla de arriba a abajo."*

---

## 4. Prompts del Buscador / Diccionario Inteligente con `@`

### Prompt 4.1 — Lógica Completa del Buscador / Diccionario
> *"Recupera toda la lógica que trabajamos detrás del diccionario/buscador:*
> *1. De normal no muestres resultados antes de escribir nada; tienen que estar ocultos hasta que se introduzcan pistas en el input.*
> *2. 'de' (preposición) no debería indexarse: desindexa todas las preposiciones y artículos, solo deberían contar la palabra principal o la secundaria dentro del mismo concepto.*
> *3. Debe incluirse con y sin acentos, mayúsculas y minúsculas (debugging del texto), e indexar siglas técnicas (`DAO`, `POO`, `CRUD`, etc.).*
> *4. La EXCEPCIÓN es que cuando se pone `@` debe generar un desplegable con todas las anotaciones o comandos posibles indexados con `@`, enlazando directamente al contenido.*
> *5. Si en la página de inicio ya hay un buscador principal en pantalla, oculta el del header solo en inicio para no duplicarlo."*

---

## 5. Prompts de Práctica Interactiva: Proyectos, Playgrounds y Tarjetas de Léxico

### Prompt 5.1 — Sección de Proyectos con Dificultad Creciente y Filtros
> *"Añade un bloque de Proyectos con un listado presentado según un filtro con checkboxes y desplegables para personalizar la experiencia, y que al clicar se abra una página hija que sea la landing del proyecto con el paso a paso de lo que hay que hacer. Empieza con proyectos muy básicos con pocos archivos y ve aumentando la dificultad, indicando en cada tarjeta qué tecnologías se usan."*

### Prompt 5.2 — Playground de Casos del Mundo Real y Tarjetas de Vocabulario
> *"Quiero una sección para practicar a partir de ejemplos del mundo real (misiones): debe abrirse una página para cada ejemplo explicando la situación, la organización de las tablas y cómo se relacionan entre sí, para después generar un espacio de prácticas sobre ese mismo caso. Además, haz un bloque con tarjetas por unidad para repasar léxico con transición simple (sin efecto de volteo 3D que maree)."*

---

## 6. Prompts para Resolver EACs (IOC) y PECs (UOC) Paso a Paso + Guiones de Vídeo

### Prompt 6.1 — Guía Inmediata Paso a Paso en Modo Claro (Sin Teleprompter)
> *"He añadido la EAC/PEC en `public/eacs/`. Necesito que deseches cualquier parte de teleprompter (limpia todo eso), necesito algo más inmediato y fácil de seguir:*
> *- Ponlo todo en **castellano** (manteniendo solo los nombres literales que exija el enunciado).*
> *- Asegúrate de que lo pueda hacer con mi **Mac** y ponlo en **modo claro**.*
> *- Hazme el paso a paso completo indicando qué ejecutar en el Cliente, en el Servidor y en el Navegador, con botones para copiar cada comando y los textos listos para pegar en el PDF."*

### Prompt 6.2 — Guion de Vídeos (Cuántos son, qué debe salir y qué decir exactamente)
> *"¿Cuántos vídeos tengo que hacer y qué debe salir en los vídeos según el enunciado? Hazme un guion para cada vídeo incluyendo lo que tengo que mostrar en pantalla y exactamente lo que tengo que decir. Y dime paso a paso qué tengo que hacer con la EAC para empezar desde el principio."*
