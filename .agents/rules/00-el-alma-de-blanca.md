# Regla 00: El "Alma de Blanca" — Filosofía Pedagógica, Visual y de Código

Esta regla emula la forma exacta en que **Blanca** diseña, corrige y exige resultados a la IA. El agente debe aplicar estos criterios de oficio en cada respuesta, aunque el compañero/a que use el proyecto no los mencione en su prompt.

---

## 1. Psicología Cognitiva + Ingeniería de Software (Enfoque Visual y Directo)
- **Cero paja y cero muros de texto:** Ve directo al grano. Antes de soltar 200 líneas, estructura la información en pasos numerados, tablas comparativas y bloques accionables.
- **Explicar el "porqué" antes del "cómo":** Cuando enseñes arquitectura (ej. separación en 3 capas, inyección de dependencias, sesiones, transacciones ACID), justifica primero por qué facilita la vida al desarrollador (ej. *"si mañana cambiamos la capa de datos, no hay que reescribir la lógica de negocio"*) y apóyalo con una analogía humana.
- **Definiciones con palabra clave en negrita:** Al definir cualquier concepto o restricción (`PRIMARY KEY`, `NOT NULL`, `FOREIGN KEY`, `MPA vs SPA`), empieza siempre con el concepto en `<strong>negrita</strong>`, seguido de su explicación, una analogía cotidiana y un ejemplo práctico en código.

## 2. Reglas de Interfaz de Usuario (UI/UX) Aprendidas con Blanca
1. **Prohibido que los elementos parezcan botones si no son clicables:** No pongas píldoras con aspecto de enlace si no llevan a ningún sitio.
2. **Menú lateral izquierdo (Aside) estable:**
   - Debe tener un ancho suficiente para que al hacer `:hover` o ponerse en negrita el elemento activo **nunca haga salto de línea (efecto wrapper)**.
   - El icono del triángulo (`▸` / `▾`) sirve para desplegar o replegar los subapartados, pero **hacer clic sobre el texto del título debe llevar directamente al contenido**.
   - Elimina del menú lateral cualquier enlace redundante tipo *"Cuaderno principal"* cuando ya equivale al inicio/Home.
3. **Menú lateral derecho (TOC por Tema):**
   - Depende exclusivamente del **tema actual** (no del bloque entero).
   - A medida que el estudiante hace scroll en la página, el índice derecho sombrea en tiempo real el apartado que se está leyendo, sincronizado con la barra superior de progreso de lectura.
   - Al navegar desde el buscador o el menú hacia un tema o ancla, la página debe posicionarse limpiamente arriba (`scrollTop = 0`).
4. **Sin emojis en documentación formal de entregables GitHub:** En la interfaz del Campus sí se usan iconos visuales para escanear rápido, pero si el estudiante te pide redactar un `README.md` formal para entregar a un profesor en GitHub/GitLab, **no incluyas emojis** salvo que lo pida expresamente.
5. **Revisión de Código y Buenas Prácticas:**
   - Evita crear decenas de archivos innecesarios de una sola línea; centraliza rutas y constantes en archivos de configuración (`src/config/iocSubjects.js`).
   - En Markdown, deja siempre una línea en blanco después de cada encabezado (`#`, `##`, `###`) antes del siguiente párrafo.

