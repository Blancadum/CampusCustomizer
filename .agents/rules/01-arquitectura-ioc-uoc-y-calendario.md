# Regla 01: Para qué es cada cosa + Paso a Paso del Calendario (.ics) y el To-Do

Cuando un compañero/a pregunte *"¿para qué sirve cada parte de la web?"* o *"¿cómo hago lo del calendario y el To-Do?"*, el agente debe explicárselo de la mano y ejecutar automáticamente estas reglas de Blanca.

---

## 1. 🧭 Mapa de MiCampus: ¿Para qué sirve cada pieza de la web?

1. **Portada (`Home.jsx`) y Tarjeta «📬 Próxima Entrega»:**
   - Te saluda según la hora del día y te muestra de un vistazo cuántos días quedan para tu entrega más urgente (`¡Hoy!`, `Mañana`, `En X días`).
2. **El "Chivato" Flotante (`📅 Calendario de Entregas / GlobalToDo.jsx`):**
   - Es la pestaña flotante con el icono `📅` y el número de entregas pendientes.
   - Al pasar el ratón o clicar se despliega por meses mostrando: **punto del color de la asignatura**, **nombre y tarea**, **fecha corta (`DD/MM`)**, **peso en la evaluación continua (`40%`, `35%`)** y **cuenta atrás en días (`12d`)**. Puedes tachar/ocultar las ya completadas o restaurarlas.
   - Se alimenta del archivo `public/data/tasks.json`.
3. **El Sistema de Calendarios `.ics` (`data/calendars/` + Botón `📅 Sincroniza` + `Sincronizar-Calendario-Mac.command`):**
   - Convierte todas tus asignaturas en un único calendario limpio y coloreado para el **Calendario de Mac / iPhone / Apple Watch (iCloud)** o **Google Calendar**.
   - **Dos archivos `.ics`:**
     - `calendario_miCampus.ics`: compilado por `scripts/calendars/build_hub_calendar.py` uniendo todos los `.ics` de `data/calendars/source/` sin duplicados y sin fechas basura.
     - `todo.ics`: regenerado en vivo por el micro-backend (`backend/server.js`) con alarmas (`VALARM` 2 días antes) **solo para las entregas en estado `pending`**. Cuando marcas una entrega como `Entregado` en la web, desaparece de `todo.ics` para que deje de pitarte en el móvil/Mac.
4. **Aula de Asignatura (`/ioc/<codigo>` y `/uoc/<codigo>`):**
   - Muestra el **Mini-Calendario mensual** de esa asignatura, el **Semáforo de EACs/PECs** (`pending` / `done`), el botón **`☁️ Guardar Copia Segura`** (que guarda tu PDF/ZIP en `public/uploads/` antes de subirlo al campus oficial) y el acceso directo al **Libro Digital** y al **Workbench Paso a Paso**.
5. **Libro Digital (`LessonViewer`):**
   - Tus apuntes convertidos en web interactiva con menú izquierdo de bloques/temas, índice derecho (TOC) por tema con sombreado en vivo al hacer scroll, barra de progreso de lectura arriba, buscador inteligente (con `@`) y bloques de código con botón de copiar.
6. **Workbench Paso a Paso de EAC / PEC (`DespEac2Workbench`):**
   - Página en **Modo Claro** para resolver cada entrega de principio a fin con comandos copiables (`💻 CLIENTE`, `🖥️ SERVIDOR`, `🌐 NAVEGADOR`), textos redactados para pegar en el PDF y **guiones de vídeo palabra por palabra**.

---

## 2. 📅 Paso a Paso: Cómo configurar «Lo del Calendario (.ics)» y el To-Do

### Paso 1 (Lo que hace el compañero en el Campus IOC / UOC):
1. Entra en el **Campus IOC (Moodle)** → ve a **Calendario** → baja hasta abajo y pulsa **«Exportar calendario»**.
2. Selecciona **«Todos los eventos»** y en periodo elige **«Este semestre / Personalizado»** → pulsa **«Exportar»** para descargar el archivo `.ics` (o descarga el `.ics` / Plan de Trabajo PDF de cada asignatura).
3. Guarda ese archivo `.ics` (o los PDFs de los Planes de Trabajo) dentro de la carpeta **`data/calendars/source/`** de este proyecto.

### Paso 2 (Lo que el Agente de IA DEBE hacer automáticamente con los `.ics` y `tasks.json`):
Cuando el compañero deje sus `.ics` o Planes de Trabajo en `data/calendars/source/` y pida configurar su calendario y su To-Do, **el agente aplicará estas 5 reglas obligatorias de Blanca**:

1. **🗑️ ELIMINAR las fechas en que salen/se abren los enunciados (Cero Ruido):**
   - **Borra todos los eventos de apertura o publicación de enunciados** (`Inicio EAC1`, `Inici EAC`, `Publicación del enunciado`, `Apertura del Quiz`, `Inici PEC`).
   - *Motivo:* Esas fechas llenan el calendario de avisos falsos y confunden haciéndote creer que tienes una entrega ese día.
   - **Qué SÍ se deja en el `.ics`:**
     - **Fechas límite de entrega reales (`Fin EAC1`, `Fin PEC1`, `Fin Quiz`)** indicando en la descripción su porcentaje de la AC (`40% AC`, `30% AC`).
     - **Fechas de exámenes / PAF** y **fechas de publicación de notas/soluciones**.
     - **Bloques de estudio por Unidad (`U1`, `U2`, `U3`)** configurados como eventos de día completo con `TRANSP:TRANSPARENT` y `X-MICROSOFT-CDO-BUSYSTATUS:FREE` (para que aparezcan como una banda superior informativa en el calendario sin bloquear tus horas del día).

2. **🎨 Asignar UN COLOR y UN CÍRCULO EMOJI distinto a cada asignatura:**
   Usa siempre esta paleta fija para que cada asignatura se reconozca en 1 segundo tanto en el calendario como en el To-Do:
   - **Asignatura 1:** `🔵` Azul (`#3b82f6` / `COLOR:#1E90FF`) → Ej: `SUMMARY:🔵 ENT · Fin EAC1`
   - **Asignatura 2:** `🟢` Verde (`#22c55e` / `COLOR:#34C759`) → Ej: `SUMMARY:🟢 DESP · Fin EAC1`
   - **Asignatura 3:** `🟣` Morado (`#af52de` / `COLOR:#AF52DE`) → Ej: `SUMMARY:🟣 DIG · Fin Quiz EAC1`
   - **Asignatura 4:** `🟡` Amarillo (`#eab308` / `COLOR:#F5A623`) → Ej: `SUMMARY:🟡 INT · Fin EAC1`
   - **Asignatura 5:** `🟠` Naranja (`#ea580c` / `COLOR:#FFA500`) → Ej: `SUMMARY:🟠 IPO · Fin EAF1`
   - **Asignatura 6 (Extra/UOC):** `🔴` Rojo/Rosa (`#ec4899` / `COLOR:#FF2D55`)

3. **📋 Sincronizar el To-Do Flotante (`public/data/tasks.json`) y los JSON de gestión (`public/data/ioc/gestion/` y `public/data/uoc/gestion/`):**
   Cada entrega final (`Fin EAC` / `Fin PEC` / `Examen`) debe añadirse a `public/data/tasks.json` con esta estructura exacta para que funcione el desplegable flotante `GlobalToDo` y la tarjeta de portada:
   ```json
   {
     "id": "ent_eac2",
     "course": "ent",
     "task": "EAC 2",
     "color": "#3b82f6",
     "badge": "🔵 IOC · ent",
     "date": "2026-11-17",
     "weight": "30%",
     "link": "/ioc/ent",
     "tooltip": "Entornos de Desarrollo · Entrega EAC 2 (30% AC)",
     "done": false
   }
   ```

4. **⚠️ Detectar y avisar de coincidencias de fechas (Colisiones):**
   - Revisa todas las fechas de entrega y, si dos o más entregas caen el mismo día o en días consecutivos, avisa inmediatamente al compañero en el chat:
     `⚠️ ¡Atención! Coincidencia el DD/MM: tienes 2 entregas el mismo día (Asignatura A y Asignatura B).`

5. **🔄 Compilar el Calendario Unificado (`calendario_miCampus.ics`):**
   - Ejecuta `python3 scripts/calendars/build_hub_calendar.py` para generar `public/data/calendars/exports/calendario_miCampus.ics`.
   - Recuérdale al compañero que puede descargarlo desde el botón **`📅 Sincroniza`** de arriba a la izquierda en la web o haciendo doble clic en **`Sincronizar-Calendario-Mac.command`** si usa Mac.
