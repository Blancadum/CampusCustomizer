# ⚡ Prompts Rápidos de 1 Clic (Para Compañeros de IOC y UOC)

Aunque la IA ya lee automáticamente las reglas de `AGENTS.md`, aquí tienes **4 mensajes cortísimos** listos para copiar y pegar en el chat de tu IA (Antigravity, Cursor, Windsurf, Copilot o Claude Code) según lo que quieras hacer hoy:

---

## 1️⃣ Para hacer «Lo del Calendario (.ics)», Colores por Asignatura y el To-Do Flotante
1. En el Campus del IOC/UOC exporta tu calendario en archivo **`.ics`** (o descarga los PDFs del Plan de Trabajo de tus asignaturas) y mételos en la carpeta **`data/calendars/source/`**.
2. Copia y pega esto en el chat de la IA:
```text
Hola, he metido mis calendarios .ics (o Planes de Trabajo) en data/calendars/source/.
Configúrame el calendario y el To-Do siguiendo la Regla 01 de AGENTS.md:
1. Elimina todas las fechas en que salen/se publican los enunciados ("Inicio EAC/PEC", "Apertura") para dejar solo las fechas reales de entrega ("Fin EAC/PEC"), exámenes/PAF, notas y los bloques de estudio por unidad (TRANSP:TRANSPARENT).
2. Asigna a cada asignatura un color único y su círculo emoji (🔵, 🟢, 🟣, 🟡, 🟠) tanto en los .ics como en la web.
3. Actualiza src/config/iocSubjects.js, los JSON de public/data/ioc/gestion/ (o uoc/gestion/) y el To-Do flotante en public/data/tasks.json, avisándome si dos entregas caen el mismo día.
4. Ejecuta python3 scripts/calendars/build_hub_calendar.py para dejar listo calendario_miCampus.ics.
```

---

## 2️⃣ Para que te haga la Guía Paso a Paso + Guion de Vídeo de una EAC (IOC) o PEC (UOC)
1. Mete el PDF/ODT del enunciado dentro de `public/eacs/ioc/<tu-asignatura>/` (o `public/eacs/uoc/<tu-asignatura>/`).
2. Copia y pega esto en el chat de la IA:
```text
He añadido el enunciado de mi entrega en public/eacs/. Léelo entero y créame la guía paso a paso inmediata en modo claro (como DespEac2Workbench.jsx y un archivo Markdown paso a paso), todo en castellano, adaptado a mi sistema operativo, con comandos copiables, los textos listos para pegar en el PDF y el guion palabra por palabra de los vídeos que pida el enunciado.
```

---

## 3️⃣ Para convertir los PDFs/Apuntes de una asignatura en un Libro Digital interactivo
1. Mete los PDFs o apuntes de teoría dentro de `public/fuentes/ioc/` (o `public/fuentes/uoc/`).
2. Copia y pega esto en el chat de la IA:
```text
Lee los apuntes que he dejado en public/fuentes/ y genera el Libro Digital completo de la asignatura en public/data/ioc/lecciones/ (o uoc/lecciones/) siguiendo las reglas de AGENTS.md: sin menciones a semanas/tutorías, con conceptos clave al inicio de cada bloque, definiciones en negrita, analogías de la vida real antes del código, ejemplos prácticos con botón de copiar y actualización del diccionario search_index.json.
```

---

## 4️⃣ Para empezar a hacer una entrega ahora mismo guiado por la IA
Copia y pega esto en el chat de la IA:
```text
Dime paso a paso qué tengo que hacer con esta EAC/PEC para empezar ahora mismo desde el Apartado 1, sin abrumarme, e indícame qué capturas tengo que ir pegando en el documento de entrega.
```

---

## 5️⃣ Para nutrir IPO 1 (FOL) con tu Plan de Trabajo y apuntes oficiales
1. Mete tu PDF de Plan de Trabajo y tus apuntes en `public/fuentes/ioc/ipo1/`.
2. Copia y pega esto en el chat de la IA (ver guía completa en `.agents/prompts/03_COMO_NUTRIR_TU_ASIGNATURA_IPO1.md`):
```text
He puesto mis archivos de IPO 1 en public/fuentes/ioc/ipo1/. Extrae el calendario oficial del Plan de Trabajo (fechas reales de entrega y PAF sin inventar horas), actualiza public/data/ioc/gestion/ipo1.json, public/data/tasks.json, compila el calendario .ics y genera el Libro Digital en public/data/ioc/lecciones/ipo1_curso.json.
```


