import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import java from 'highlight.js/lib/languages/java';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import json from 'highlight.js/lib/languages/json';
import bash from 'highlight.js/lib/languages/bash';
import sql from 'highlight.js/lib/languages/sql';
import python from 'highlight.js/lib/languages/python';
import dockerfile from 'highlight.js/lib/languages/dockerfile';
import yaml from 'highlight.js/lib/languages/yaml';
import markdown from 'highlight.js/lib/languages/markdown';
import 'highlight.js/styles/night-owl.css';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('js', javascript);
hljs.registerLanguage('java', java);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('css', css);
hljs.registerLanguage('json', json);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('sh', bash);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('python', python);
hljs.registerLanguage('dockerfile', dockerfile);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('markdown', markdown);

/**
 * Transforma comentarios Javadoc/bloques con explicaciones y diagramas ASCII
 * para aplicar una paleta de colores de terminal vibrante y legible (cian, oro, esmeralda, naranja)
 * en lugar de gris apagado monótono.
 */
export function enhanceCommentHtml(rawHtml) {
  if (!rawHtml || typeof rawHtml !== 'string') return rawHtml;

  const lines = rawHtml.split('\n');
  const processed = lines.map(rawLine => {
    const line = rawLine.replace(/\r$/, '');
    let prefix = '';
    let content = line;

    // Detectar asterisco o barra de comentario al inicio
    const prefixMatch = line.match(/^(\s*\*\s?|\s*\/\*\*\s?|\s*\/\/\s?)(.*)$/);
    if (prefixMatch) {
      prefix = `<span style="color: #475569; user-select: none;">${prefixMatch[1]}</span>`;
      content = prefixMatch[2];
    }

    const trimmed = content.trim();

    // 1. Líneas de separación ASCII (ej. ════════ o ────────) en gris sutil
    if (/^[═─\-_=~]{3,}$/.test(trimmed)) {
      return prefix + `<span style="color: #64748b; font-weight: normal; opacity: 0.85;">${content}</span>`;
    }

    // 2. Encabezados de sección y títulos destacados
    const isTitle = (
      /^\[[A-ZÁÉÍÓÚÑ0-9\s—:?¿()/-]+\]/.test(trimmed) ||
      /^¿[A-ZÁÉÍÓÚÑ0-9\s—:?¿()/-]+\?$/.test(trimmed) ||
      (/^[A-ZÁÉÍÓÚÑ0-9\s—:?¿()/-]{4,}:?$/.test(trimmed) && 
        !trimmed.includes('INTERFACE') && 
        !trimmed.includes('CLASS') && 
        !trimmed.includes('IMPORT') && 
        !trimmed.includes('PACKAGE'))
    );
    if (isTitle) {
      return prefix + `<span style="color: #fde047; font-weight: 700; text-shadow: 0 0 10px rgba(253, 224, 71, 0.25);">${content}</span>`;
    }

    // 3. Avisos / notas con emojis
    if (/^(⚠️|💡|📦|🔥|✅|❌|🎯)/.test(trimmed)) {
      return prefix + `<span style="color: #fb923c; font-weight: 600;">${content}</span>`;
    }

    // 4. Transformaciones inline dentro del contenido
    let out = content;

    // Separadores horizontales secundarios (ej. // ── Subsección ────────) en gris sutil
    out = out.replace(/([═─]{2,})/g, '<span style="color: #64748b; font-weight: normal; opacity: 0.85;">$1</span>');

    // Bordes y esquinas de cajas de diagramas ASCII (cian eléctrico)
    out = out.replace(/([┌┐└┘├┤│┬┴┼]+)/g, '<span style="color: #38bdf8; font-weight: bold;">$1</span>');

    // Flechas de flujo (naranja brillante)
    out = out.replace(/([→←↑↓↔]+)/g, '<span style="color: #fb923c; font-weight: bold;">$1</span>');

    // Palabras clave de arquitectura / capas (verde esmeralda)
    out = out.replace(/\b(DOMINIO|Puerto de entrada|Puerto de salida|Adaptadores primarios|Adaptadores secundarios|Presentación|Negocio|Datos|Hexagonal|Service|Controller|Repository)\b/g, '<span style="color: #4ade80; font-weight: 700;">$1</span>');

    // Palabras clave Java dentro de comentarios (púrpura lavanda)
    out = out.replace(/\b(interface|class|void|return|String|Long|Integer|Double|public|private|new|implements|extends)\b/g, '<span style="color: #c084fc; font-weight: 600;">$1</span>');

    return prefix + out;
  });

  return processed.join('\n');
}

export function enhanceCodeBlockComments(el) {
  if (!el) return;
  const comments = el.querySelectorAll('.hljs-comment');
  comments.forEach(c => {
    if (c.getAttribute('data-enhanced') === 'true') return;
    c.innerHTML = enhanceCommentHtml(c.innerHTML);
    c.setAttribute('data-enhanced', 'true');
    c.style.color = '#e2e8f0';
    c.style.fontStyle = 'normal';
    c.style.lineHeight = '1.55';
  });
}

// Plugin global para ejecutar el realce automáticamente en cualquier llamada a hljs.highlightElement
hljs.addPlugin({
  'after:highlightElement': ({ el }) => {
    enhanceCodeBlockComments(el);
  }
});

export default hljs;
