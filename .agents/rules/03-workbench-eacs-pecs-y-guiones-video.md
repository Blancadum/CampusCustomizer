# Regla 03: Cómo Transformar un Enunciado EAC (IOC) o PEC (UOC) en un Workbench Paso a Paso

Cuando el usuario deposite un enunciado oficial (`.pdf`, `.odt` o `.docx`) en `public/eacs/ioc/<asignatura>/` o `public/eacs/uoc/<asignatura>/` y pida ayuda con la entrega:

## 1. Prohibido el Teleprompter Complejo -> Guía Inmediata en Modo Claro
- No construyas sistemas de teleprompter oscuros ni reproductores complicados.
- Construye una guía **inmediata, limpia y en Modo Claro (`#f8fafc` / `#ffffff`)** siguiendo la arquitectura de `src/components/dashboards/eac2/DespEac2Workbench.jsx` y `DespEac2Workbench.css`.

## 2. Estructura Obligatoria de la Guía Paso a Paso
1. **Banner Resumen Superior (Las 4 Cajas):**
   - Resume de un vistazo cada Parte de la entrega indicando cuántos puntos vale, si lleva **capturas en el PDF**, si lleva **texto obligatorio** y si lleva **vídeo**.
2. **Configurador Dinámico de Variables (IP del Servidor, Usuario o Apellido):**
   - Incluye un input superior para que al escribir la IP de la máquina virtual o el apellido del estudiante se actualicen en vivo todos los comandos de la página.
3. **Recorrido Directo de Apartados (`0` al `N`, respetando letras oficiales `a)`, `b)`, `c)`...):**
   - Cada paso debe llevar su etiqueta de color:
     - `💻 CLIENTE` (Terminal del Mac / PC o VM Cliente)
     - `🖥️ SERVIDOR` (Terminal de Ubuntu Server / Docker)
     - `🌐 NAVEGADOR CLIENTE` (URL exacta a abrir)
   - Botón `📋 Copiar` en cada comando.
   - Si el estudiante usa **Mac (Apple Silicon M1/M2/M3/M4/M5)**, incluye los comandos compatibles con macOS (`brew`, `perl -pi -e` en lugar de `sed -i`, red puente en UTM/Parallels).
   - Caja verde `✍️ Copiar texto para el PDF` con la respuesta teórica ya redactada en castellano para pegar directamente en el documento `.odt` / `.pdf`.
   - Caja ámbar `📌 Qué debes incluir en el documento PDF en este apartado` detallando exactamente qué debe verse en la captura (ej. `usuario@equipo` visible en terminal).
4. **Pestaña `🎥 Guiones de los Vídeos`:**
   - Indica con total claridad **cuántos vídeos hay que hacer** en toda la entrega.
   - Para cada vídeo, genera una tabla o tarjetas con:
     - **Escena / Bloque y duración en segundos**
     - **🖥️ En pantalla:** qué ventana, comando o pestaña enseñar exactamente.
     - **🎙️ Lo que dices (Guion hablado palabra por palabra):** redactado en primera persona, natural y cubriendo el 100% de los puntos de la rúbrica.
5. **Pestaña `📄 Textos para el PDF`:**
   - Todos los textos explicativos juntos y listos para copiar con un clic al documento de entrega.

---

## 3. Protocolo para IPO 1 (`/ioc/ipo1` - Itinerari Personal per a l'Ocupabilitat I)

El estudiante cursa **IPO 1 (antiguo FOL)**, no IPO 2. La asignatura se nutre directamente con los materiales oficiales del estudiante:
1. El estudiante coloca sus documentos oficiales en `public/fuentes/ioc/ipo1/` (Plan de Trabajo en PDF, apuntes y enunciados).
2. Sigue el prompt de `.agents/prompts/03_COMO_NUTRIR_TU_ASIGNATURA_IPO1.md`:
   - Extraer fechas reales de entrega y PAF sin inventar horas de examen.
   - Generar el temario pedagógico estructurado (Marco laboral, nóminas, Seguridad Social, PRL).
   - Crear las guías paso a paso de las actividades que publique el profesorado.



