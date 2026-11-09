# 💼 Cómo Cargar tu Asignatura de IPO 1 (Itinerari Personal per a l'Ocupabilitat I)

> 💡 **Nota de Blanca para Josep:**
> En este repositorio ya te he dejado listas y configuradas **Despliegue (DESP)**, **Digitalización (DIGI)** e **Interfaces Web (INT)** con sus calendarios limpios, tareas y temas.
> Como tú estás cursando **IPO 1 (antiguo FOL)** y no IPO 2, te he dejado el espacio de IPO 1 completamente preparado y limpio para que seas tú quien meta tus propios documentos del aula (sin fechas falsas ni eventos inventados).
> Solo tienes que seguir estos 2 pasos:

---

## 📂 Paso 1: Mete tus archivos en la carpeta de IPO 1
Abre la carpeta del proyecto y entra en:
📁 **`public/fuentes/ioc/ipo1/`**

Arrastra y suelta ahí:
1. 📄 **Tu Plan de Trabajo en PDF** (ejemplo: `pt_ipo1.pdf` descargado de tu aula de Moodle en el IOC).
2. 📚 **Tus apuntes o PDFs de teoría** (Derecho laboral, contratos, nóminas, Seguridad Social, PRL).
3. 📝 **Enunciados de entregas** (si ya tienes publicada alguna EAC o EAF en `.pdf` o `.odt`).

---

## 💬 Paso 2: Copia y pega este prompt a la IA

Abre el chat de la IA en tu editor (Antigravity, Cursor, Windsurf, Copilot o Claude Code), copia el bloque siguiente tal cual y dale al Enter:

```text
Hola, acabo de meter mis archivos oficiales de IPO 1 en public/fuentes/ioc/ipo1/.
Configúrame la asignatura de forma 100% fiel a mis documentos oficiales y sin inventar ningún dato:

1. 📅 CALENDARIO Y TAREAS (Plan de Trabajo Oficial):
   - Extrae de mi PDF de Plan de Trabajo la tabla oficial de fechas: inicio, entrega límite (23:55), soluciones y calificaciones de cada EAC/EAF.
   - Extrae las fechas oficiales de examen presencial (PAF 1 y PAF 2). NO te inventes las horas de las PAF: si el PDF dice que la hora se publicará en el Tauler de Tutoria, déjalas como evento de día completo indicando "Pendiente de publicación en Tauler de Tutoria" junto con la duración oficial (ej. 1h 50m).
   - Genera el archivo data/calendars/source/IPO1.ics con el color naranja (#ea580c), actualiza public/data/ioc/gestion/ipo1.json, añade las entregas pendientes al To-Do flotante (public/data/tasks.json) y compila el calendario unificado ejecutando: python3 scripts/calendars/build_hub_calendar.py.

2. 📖 LIBRO DIGITAL INTERACTIVO (Teoría y Apuntes):
   - Lee los PDFs/apuntes de teoría que he dejado en la carpeta y redacta el temario completo en public/data/ioc/lecciones/ipo1_curso.json.
   - Aplica el estándar pedagógico de Blanca (AGENTS.md):
     * Cero referencias temporales ("Semana 1", "Tutoría 2"). Organizado en Bloques limpios (Bloque 1: Marco Laboral, Bloque 2: Nóminas y Seguridad Social, Bloque 3: PRL y Ergonomía).
     * Caja de "Conceptos Clave" al inicio de cada Bloque.
     * Negrita al inicio de cada definición técnica.
     * Analogía cotidiana antes de cualquier fórmula o artículo de ley.
     * Ejemplos prácticos comentados (ej. cálculo paso a paso de una nómina real con devengos, bases de cotización y retención de IRPF).
   - Actualiza el índice del buscador global en public/data/search_index.json.
```

---

## 📋 ¿Qué pasará automáticamente tras pegar el prompt?
1. **Tu calendario interactivo** (`/ioc/ipo1`) mostrará las fechas reales de entrega y PAF de tu curso.
2. **Tu botón superior `📅 Sincroniza`** descargará el `.ics` unificado con tus 4 asignaturas para tu Mac o móvil.
3. **Tu Libro Digital de IPO 1** quedará disponible en la web para estudiar con buscador predictivo y tabla de contenidos (TOC).

