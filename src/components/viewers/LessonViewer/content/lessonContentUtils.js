/**
 * Utilidades para cálculo de títulos y limpieza de duplicados en el visor de lecciones.
 */

export function getDisplayTitle(activeTopic) {
  if (!activeTopic) return '';
  if (activeTopic.title === 'Introducción a la Unidad' && activeTopic.moduleTitle) {
    return activeTopic.moduleTitle;
  }
  if (activeTopic.title === 'Introducción' && activeTopic.temaTitle) {
    const cleanTema = activeTopic.temaTitle.replace(/^Tema \d+:\s*/, '');
    return activeTopic.topicNum ? `${activeTopic.topicNum} · Introducción: ${cleanTema}` : `Introducción: ${cleanTema}`;
  }
  if (activeTopic.topicNum) {
    return `${activeTopic.topicNum} · ${activeTopic.title}`;
  }
  return activeTopic.title || '';
}

export function cleanMarkdownHeadingDuplication(contentMd, topic, isContinuous = false) {
  let cleanedMd = contentMd ? contentMd.trim() : '';
  if (!cleanedMd) return '';

  const lines = cleanedMd.split('\n');
  if (lines.length > 0) {
    const firstLine = lines[0].trim();
    if (/^#{1,4}\s+/.test(firstLine)) {
      const headingText = firstLine.replace(/^#{1,4}\s+/, '').replace(/[*_#]/g, '').trim().toLowerCase();
      const topicText = (topic?.title || '').replace(/[*_#]/g, '').trim().toLowerCase();

      const isRepeated =
        headingText.includes(topicText) ||
        topicText.includes(headingText) ||
        (isContinuous && topic?.topicNum && headingText.startsWith(String(topic.topicNum).toLowerCase())) ||
        headingText.startsWith('unidad') ||
        headingText.startsWith('bloque') ||
        (isContinuous && headingText.startsWith('tema'));

      if (isRepeated) {
        lines.shift();
        while (lines.length > 0 && lines[0].trim() === '') {
          lines.shift();
        }
        cleanedMd = lines.join('\n');
      }
    }
  }

  // Desanidar enlaces a vídeos embebidos dentro de encabezados ####
  if (cleanedMd) {
    cleanedMd = cleanedMd.replace(
      /^#{1,6}\s*(🎬\s*V[ÍI]DEO\s*[\d\w\.\-]+)(?:\s*—|\s*[-–:])?\s*\[(.*?)\]\((https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)[^\)]+)\)/gmi,
      '\n\n[$1 · $2]($3)\n\n'
    );
  }

  // Integrar contenidos con nomenclatura de llamada ([!NOTE], [!TIP], etc.) como contenido natural
  cleanedMd = integrateCalloutsToContent(cleanedMd);

  return cleanedMd;
}

/**
 * Acopla contenidos con nomenclatura [!NOTE], [!TIP], [!IMPORTANT], etc.
 * directamente al flujo natural de lectura de la página web, eliminando
 * el anidamiento forzado de callouts y los tokens de sintaxis.
 */
export function integrateCalloutsToContent(md) {
  if (!md) return '';
  const lines = md.split('\n');
  const result = [];
  let inCallout = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Detectar inicio de callout tipo GitHub/Obsidian: > [!NOTE], > [!TIP], etc.
    if (/^>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION|INFO)\]/i.test(trimmed)) {
      inCallout = true;
      continue;
    }

    if (inCallout) {
      if (trimmed.startsWith('>')) {
        // Desanidar eliminando el prefijo de cita '>' y espacio inicial
        result.push(line.replace(/^\s*>\s?/, ''));
        continue;
      } else if (trimmed === '') {
        // Mirar hacia adelante: si la siguiente línea también tiene cita, mantener salto de párrafo
        let nextHasQuote = false;
        for (let j = i + 1; j < lines.length; j++) {
          const nextTrimmed = lines[j].trim();
          if (nextTrimmed === '') continue;
          if (nextTrimmed.startsWith('>')) nextHasQuote = true;
          break;
        }
        if (nextHasQuote) {
          result.push('');
          continue;
        } else {
          inCallout = false;
          result.push('');
          continue;
        }
      } else {
        inCallout = false;
        result.push(line);
        continue;
      }
    }

    // Limpiar cualquier token suelto [!NOTE], [!TIP], etc. que no esté en bloque de cita
    const cleanedLine = line.replace(/\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION|INFO)\]\s*/gi, '');
    result.push(cleanedLine);
  }

  return result.join('\n');
}

export function getCleanTemaLabel(topic) {
  let temaNumber = '';
  if (topic.topicNum) {
    const parts = String(topic.topicNum).split('.');
    if (parts.length >= 1 && !isNaN(parts[0])) {
      temaNumber = parts[0];
    }
  }

  let cleanTemaName = topic.temaTitle || '';
  if (/^Tema\s+\d+:\s*/i.test(cleanTemaName)) {
    cleanTemaName = cleanTemaName.replace(/^Tema\s+\d+:\s*/i, '');
  } else if (/^Bloque\s+\d+:\s*/i.test(cleanTemaName)) {
    cleanTemaName = cleanTemaName.replace(/^Bloque\s+\d+:\s*/i, '');
  }

  const temaLabel = temaNumber && cleanTemaName !== 'Introducción' 
    ? `Tema ${temaNumber}: ${cleanTemaName}` 
    : (cleanTemaName || 'Introducción');

  return { temaNumber, cleanTemaName, temaLabel };
}
