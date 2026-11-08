# CampusCustomizer (IOC & UOC) — Guía Paso a Paso y Sistema de Agentes

**Autora:** Blanca de Uña ([@Blancadum](https://github.com/Blancadum)) · **Contacto:** [blancadum@gmail.com](mailto:blancadum@gmail.com)

Plantilla limpia y lista para usar de **MiCampus (`CampusCustomizer`)**, creada por **Blanca de Uña** para compañeros y compañeras del **IOC (Institut Obert de Catalunya)** y de la **UOC (Universitat Oberta de Catalunya)**.

---

## Índice de esta Guía

1. [¿Por qué no necesitas saber escribir Prompts? (El «Emulador de Blanca»)](#1-por-qué-no-necesitas-saber-escribir-prompts-el-emulador-de-blanca)
2. [Paso a Paso para Desplegar y Ver la Web en Local (Desde Cero)](#2-paso-a-paso-para-desplegar-y-ver-la-web-en-local-desde-cero)
3. [Mapa de MiCampus: ¿Para qué sirve cada parte de la web?](#3-mapa-de-micampus-para-qué-sirve-cada-parte-de-la-web)
4. [Estructura de Carpetas del Proyecto (IOC y UOC separados)](#4-estructura-de-carpetas-del-proyecto-ioc-y-uoc-separados)
5. [Los 5 Flujos Paso a Paso para alimentar tu Campus con la IA](#5-los-5-flujos-paso-a-paso-para-alimentar-tu-campus-con-la-ia)
   - [Flujo 1: «Lo del Calendario (.ics)», Colores por Asignatura y el To-Do](#flujo-1-lo-del-calendario-ics-colores-por-asignatura-y-el-to-do)
   - [Flujo 2: Pasar los PDFs de Teoría del Campus al Libro Digital (JSON)](#flujo-2-pasar-los-pdfs-de-teoría-del-campus-al-libro-digital-json)
   - [Flujo 3: Resolver una EAC (IOC) o PEC (UOC) Paso a Paso + Guion de Vídeo](#flujo-3-resolver-una-eac-ioc-o-pec-uoc-paso-a-paso--guion-de-vídeo)
   - [Flujo 4: Añadir Podcasts (Audiolecciones) con Google NotebookLM](#flujo-4-añadir-podcasts-audiolecciones-con-google-notebooklm)
   - [Flujo 5: Guardar Copia Segura en la Bóveda y Tachar la Entrega](#flujo-5-guardar-copia-segura-en-la-bóveda-y-tachar-la-entrega)
6. [Prompts Originales de Blanca y Prompts Rápidos de 1 Clic](#6-prompts-originales-de-blanca-y-prompts-rápidos-de-1-clic)

---

## 1. ¿Por qué no necesitas saber escribir Prompts? (El «Emulador de Blanca»)

Este repositorio lleva configurados en la raíz el archivo **[`AGENTS.md`](AGENTS.md)** y la carpeta **[`.agents/`](.agents/)** que actúan como un **«Emulador de Blanca»**:

- Cuando abres esta carpeta con un editor con IA (**Antigravity**, **Cursor**, **Windsurf**, **VS Code con GitHub Copilot** o **Claude Code**), **la IA lee automáticamente `AGENTS.md` y `.agents/rules/` antes de responderte**.
- No tienes que explicarle cómo quieres los estilos, ni cómo estructurar los apuntes, ni cómo hacer el paso a paso de una entrega. La IA ya tiene todas las reglas cargadas de fábrica:
  1. **Te habla paso a paso y sin tecnicismos intimidantes:** te dice en cada comando dónde pegarlo (`CLIENTE`, `SERVIDOR` o `NAVEGADOR`), qué hace y qué captura debes pegar en tu documento.
  2. **Limpia tu calendario `.ics`:** borra las fechas en que salen los enunciados, asigna un color a cada asignatura y actualiza tu lista de tareas (`tasks.json`).
  3. **Convierte tus PDFs de teoría en un Libro Digital JSON:** en castellano, con conceptos clave por bloque, definiciones con la palabra clave en **negrita**, **analogías de la vida real** antes del código, ejemplos prácticos con botón de copiar y actualización automática del diccionario/buscador.
  4. **Convierte cualquier enunciado de EAC/PEC en una Guía Paso a Paso en Modo Claro:** con comandos copiables, textos listos para pegar en el PDF y **guiones de vídeo palabra por palabra** (qué mostrar en pantalla y qué decir).
  5. **Respeta tu autoría en Git:** tiene prohibido añadir `Co-authored-by` o firmas de IA en tus commits.

---

## 2. Paso a Paso para Desplegar y Ver la Web en Local (Desde Cero)

Sigue estos pasos en orden para abrir la web en tu ordenador (**Mac, Windows o Linux**):

### Paso 0: Requisitos previos (solo la primera vez)
Necesitas tener instalados **Node.js (versión 18 o superior)** y **Git**.
Comprueba si ya los tienes abriendo tu Terminal y ejecutando:
```bash
node -v
npm -v
git --version
```
- **Si no tienes Node.js:**
  - **En Mac (con Homebrew):** `brew install node` *(o descárgalo desde [nodejs.org](https://nodejs.org/))*
  - **En Windows:** Descarga el instalador LTS desde [nodejs.org](https://nodejs.org/)
  - **En Ubuntu / Linux:** `sudo apt update && sudo apt install -y nodejs npm`

### Paso 1: Clonar el repositorio y abrirlo en tu Editor con IA
1. Abre la Terminal de tu ordenador y clona el repositorio:
   ```bash
   cd ~/Desktop
   git clone https://github.com/Blancadum/campuscustomizer.git
   cd campuscustomizer
   ```
2. Abre la carpeta **`campuscustomizer`** en **Antigravity**, **Cursor**, **VS Code** o **Windsurf** (*File → Open Folder...*).
3. Abre la terminal integrada del editor (`Ctrl + ñ` o `Cmd + J`).

### Paso 2: Instalar las dependencias (solo la primera vez)
En la terminal integrada, ejecuta:
```bash
# 1. Instalar las librerías del Frontend (React + Vite)
npm install

# 2. Instalar las librerías del Micro-Backend (para guardar entregas y regenerar todo.ics)
cd backend && npm install && cd ..
```

### Paso 3: Arrancar la Web en Local (`http://localhost:5173`)
En la terminal integrada, ejecuta:
```bash
npm run dev
```
Abre tu navegador y entra en: **http://localhost:5173**

### Paso 4: Arrancar el Micro-Backend Local (`http://localhost:3001`)
Abre una **segunda pestaña de terminal** en tu editor (icono `+`) y ejecuta:
```bash
npm run api
```
Esto activa el motor local en `http://localhost:3001` para que funcionen los botones **«Guardar Copia Segura»** y **«Marcar como entregado»**.

### Comandos útiles y Solución de Problemas
- **Apagar el servidor:** Pulsa `Ctrl + C` en la terminal donde esté corriendo.
- **Comprobar que el proyecto compila sin errores:** `npm run build`
- **Liberar los puertos `5173` o `3001` si sale `Address already in use` (Mac/Linux):**
  ```bash
  lsof -ti:5173,3001 | xargs kill -9
  ```

---

## 3. Mapa de MiCampus: ¿Para qué sirve cada parte de la web?

| Componente | Para qué sirve | Archivo que lo controla |
| :--- | :--- | :--- |
| **Portada y «Próxima Entrega»** | Saludo dinámico según la hora, botón `Cambiar nombre` para poner el tuyo y cálculo automático de cuántos días faltan para tu entrega más urgente. | `public/data/tasks.json` |
| **Chivato Flotante (`Calendario de Entregas`)** | Pestaña lateral desplegable que agrupa tus entregas pendientes por mes con el punto del color de cada asignatura, fecha (`DD/MM`), peso (`40%`) y cuenta atrás (`12d`). | `public/data/tasks.json` |
| **Botón `Sincroniza` y `Sincronizar-Calendario-Mac.command`** | Descarga o envía directamente a la app **Calendario de tu Mac / iPhone / Google Calendar** todas tus entregas limpias y coloreadas, con alarmas 2 días antes. | `data/calendars/source/*.ics` y `public/data/calendars/exports/` |
| **Aula de Asignatura (`/ioc/<cod>` o `/uoc/<cod>`)** | Muestra el calendario mensual de la asignatura, el semáforo de EACs/PECs, el botón **`Guardar Copia Segura`** y el botón **`Marcar como entregado`** (que recalcula tu barra de progreso y apaga la alarma en `todo.ics`). | `public/data/ioc/gestion/<cod>.json` (o `uoc/gestion/`) |
| **Libro Digital Interactivo** | Tus PDFs de teoría convertidos en una web en castellano con menú izquierdo de bloques/temas, índice derecho (TOC) por tema que se sombrea al hacer scroll, barra de progreso de lectura arriba, analogías y código con botón de copiar. | `public/data/ioc/lecciones/<cod>.json` (o `uoc/lecciones/`) |
| **Buscador / Diccionario Inteligente** | Buscador en la cabecera (funciona con y sin tildes y desindexa preposiciones). Si escribes **`@`**, despliega todas las anotaciones y herramientas clave. | `public/data/search_index.json` |
| **Workbench Paso a Paso de EAC / PEC** | Página en **Modo Claro** con 3 pestañas: **`Paso a Paso`** (comandos copiables separados por máquina), **`Guiones de los Vídeos`** (qué mostrar y qué decir palabra por palabra) y **`Textos para el PDF`**. | `src/components/dashboards/eac2/` + `public/eacs/` |

---

## 4. Estructura de Carpetas del Proyecto (IOC y UOC separados)

```text
campuscustomizer/
├── AGENTS.md                        # Directivas automáticas ("El Emulador de Blanca")
├── README.md                        # Esta guía completa paso a paso
├── Sincronizar-Calendario-Mac.command # Doble clic en Mac para inyectar el calendario en Apple Calendar
├── .agents/
│   ├── rules/                       # Reglas de UI/UX, calendario, PDFs a JSON, buscador y EACs/PECs
│   └── prompts/                     # Todos los prompts originales de Blanca + Prompts rápidos
├── data/
│   └── calendars/
│       ├── source/                  # Deja aquí los .ics exportados del campus y Planes de Trabajo
│       └── exports/                 # Calendarios .ics limpios generados automáticamente
├── public/
│   ├── data/
│   │   ├── tasks.json               # Lista de entregas para la Portada y el To-Do flotante
│   │   ├── search_index.json        # Índice del diccionario/buscador inteligente
│   │   ├── ioc/                     # CARPETA DE ASIGNATURAS IOC (gestion/ y lecciones/)
│   │   └── uoc/                     # CARPETA APARTE DE ASIGNATURAS UOC (gestion/ y lecciones/)
│   ├── eacs/
│   │   ├── ioc/                     # Deja aquí los PDFs y ODTs de los enunciados de tus EACs (IOC)
│   │   └── uoc/                     # Deja aquí los PDFs y ODTs de los enunciados de tus PECs (UOC)
│   ├── fuentes/
│   │   ├── ioc/                     # Deja aquí los PDFs de teoría de tus asignaturas IOC
│   │   └── uoc/                     # Deja aquí los PDFs de teoría de tus asignaturas UOC
│   └── uploads/                     # Bóveda local donde se guardan tus copias de seguridad
├── scripts/
│   └── calendars/
│       └── build_hub_calendar.py    # Script que limpia el ruido y une todos los .ics
├── src/
│   ├── config/iocSubjects.js        # Configuración central de asignaturas de IOC y UOC
│   └── components/                  # Componentes React de la plataforma
└── backend/
    └── server.js                    # Micro-backend Express (puerto 3001)
```

---

## 5. Los 5 Flujos Paso a Paso para alimentar tu Campus con la IA

### Flujo 1: «Lo del Calendario (.ics)», Colores por Asignatura y el To-Do

En el campus oficial del IOC/UOC los calendarios mezclan las fechas en que se publican los enunciados con las fechas reales de entrega y salen todos del mismo color. Para configurarlo limpio:

1. **Exporta el `.ics` desde el Campus IOC / UOC:**
   - Entra en **Calendario** en el campus → baja hasta abajo y pulsa **«Exportar calendario»** → marca **«Todos los eventos»** y **«Este semestre»** → descárgalo.
   - Descarga también el PDF del **Plan de Trabajo (Pla de treball)** de cada asignatura (donde sale el porcentaje `%` de cada EAC/PEC).
2. **Guárdalos en `data/calendars/source/`** dentro de este proyecto.
3. **Dile a la IA en el chat:**
   > *"He metido mis calendarios y planes de trabajo en `data/calendars/source/`. Configúrame mis asignaturas siguiendo la Regla 01: elimina las fechas en que salen los enunciados, pon cada asignatura de un color con su círculo emoji, rellena `tasks.json` y compila el calendario `.ics`."*
4. **¿Qué hará la IA automáticamente?**
   - **Eliminará las fechas de publicación de enunciados** (`Inicio EAC`, `Inici PEC`, `Apertura`) dejando **solo las fechas límite reales de entrega (`Fin EAC/PEC`)**, notas, exámenes/PAF y los bloques de estudio por Unidad (`U1`, `U2`, `U3`) como franjas transparentes (`TRANSP:TRANSPARENT`).
   - Asignará a cada asignatura un color único y su círculo (`🔵`, `🟢`, `🟣`, `🟡`, `🟠`).
   - Actualizará `src/config/iocSubjects.js`, los JSON de `gestion/` y `public/data/tasks.json`, avisándote si dos entregas coinciden el mismo día.
   - Compilará `calendario_miCampus.ics` para que lo importes desde el botón **`Sincroniza`** de la web o con doble clic en **`Sincronizar-Calendario-Mac.command`**.

---

### Flujo 2: Pasar los PDFs de Teoría del Campus al Libro Digital (JSON)

1. **Descarga todos los PDFs de teoría** de tu asignatura (Unidad 1, Unidad 2, Unidad 3...).
2. **Mételos en su carpeta:**
   - Si es del IOC: en **`public/fuentes/ioc/<codigo-asignatura>/`**.
   - Si es de la UOC: en **`public/fuentes/uoc/<codigo-asignatura>/`**.
3. **Dile a la IA en el chat:**
   > *"He metido los PDFs de teoría de mi asignatura en `public/fuentes/...`. Conviértemelos al JSON del Libro Digital (`lecciones/<codigo>.json`) y actualiza el buscador `search_index.json`."*
4. **¿Qué hará la IA automáticamente (según [`.agents/rules/02-libro-digital-toc-y-buscador.md`](.agents/rules/02-libro-digital-toc-y-buscador.md))?**
   - Leerá todos los PDFs, los traducirá al **castellano** y generará `public/data/ioc/lecciones/<codigo>.json` (o `uoc/lecciones/`).
   - Maquetará cada bloque y tema sin referencias a semanas/tutorías, con **Conceptos Clave** al inicio del bloque, definiciones con la palabra clave en **negrita**, **analogías de la vida real** antes del código, un **ejemplo práctico de modelización** como hilo conductor y bloques de código con botón de copiar.
   - Añadirá todos los términos y siglas al diccionario inteligente `public/data/search_index.json`.

---

### Flujo 3: Resolver una EAC (IOC) o PEC (UOC) Paso a Paso + Guion de Vídeo

1. **Descarga el enunciado de la entrega** (`.pdf` y `.odt`/`.docx` editable) y mételo en **`public/eacs/ioc/<codigo>/`** (o **`public/eacs/uoc/<codigo>/`**).
2. **Dile a la IA en el chat:**
   > *"He añadido el enunciado de mi entrega en `public/eacs/...`. Hazme la guía paso a paso en modo claro, los textos para pegar en el PDF y el guion de los vídeos."*
3. **¿Qué hará la IA automáticamente (según [`.agents/rules/03-workbench-eacs-pecs-y-guiones-video.md`](.agents/rules/03-workbench-eacs-pecs-y-guiones-video.md))?**
   - Creará tu Workbench interactivo en **Modo Claro** y un archivo Markdown paso a paso con 3 pestañas:
     - **Paso a Paso (`0` a `N`):** todos los comandos listos para copiar separados en `CLIENTE`, `SERVIDOR` y `NAVEGADOR`, más qué capturas hacer en cada apartado.
     - **Guiones de los Vídeos:** cuántos vídeos pide el enunciado, qué mostrar en pantalla en cada bloque y **qué decir palabra por palabra**.
     - **Textos para el PDF:** todas las respuestas teóricas redactadas en castellano listas para copiar con un clic y pegar en tu `.odt`.

---

### Flujo 4: Añadir Podcasts (Audiolecciones) con Google NotebookLM

1. Al crear el Libro Digital en el Flujo 2, la IA incluye en cada tema un `"podcastPrompt"`.
2. Sube los PDFs de la unidad a **[Google NotebookLM](https://notebooklm.google.com/)** y pega ese prompt en *Audio Overview*.
3. Descarga el audio `.mp3`, guárdalo en `public/fuentes/ioc/<codigo>/podcasts/` y dile a la IA que lo enlace en el tema para escucharlo desde el reproductor integrado en la lección.

---

### Flujo 5: Guardar Copia Segura en la Bóveda y Tachar la Entrega

1. Con el micro-backend encendido (`npm run api`), entra en el aula de tu asignatura en `http://localhost:5173/ioc/<codigo>`.
2. Pulsa **`Guardar Copia Segura`** en la tarjeta de la EAC/PEC para archivar tu `.pdf` final en `public/uploads/`.
3. Pulsa **`Marcar como entregado`**: la tarjeta pasará a verde, subirá tu porcentaje de progreso y la entrega se eliminará de `todo.ics` para apagar sus alarmas en el calendario.

---

## 6. Prompts Originales de Blanca y Prompts Rápidos de 1 Clic

- **[`.agents/prompts/01_PROMPTS_REALES_DE_BLANCA.md`](.agents/prompts/01_PROMPTS_REALES_DE_BLANCA.md)**: Recopilación completa de los prompts originales que Blanca utilizó para diseñar toda la plataforma.
- **[`.agents/prompts/02_PROMPTS_RAPIDOS_COPIAR_Y_PEGAR.md`](.agents/prompts/02_PROMPTS_RAPIDOS_COPIAR_Y_PEGAR.md)**: Los 4 mensajes cortos listos para copiar y pegar en el chat de tu IA.

---

## 7. Autoría y Contacto

Proyecto original ideado, diseñado y desarrollado por **Blanca de Uña**:
- **GitHub:** [@Blancadum](https://github.com/Blancadum)
- **Email:** [blancadum@gmail.com](mailto:blancadum@gmail.com)

