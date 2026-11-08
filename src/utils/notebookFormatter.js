/**
 * Genera el documento Markdown final a partir de cualquier objeto de datos de cuaderno/notas (data-driven).
 * Soporta secciones personalizadas (titulo, items con pregunta/respuesta), metadatos (fichero, rama, pr, modulo),
 * y checklist de verificación.
 */
export function formatNotebookMarkdown(docData) {
  if (!docData) return '';

  let md = `# ${docData.tituloDoc || 'Notas de la Tarea'}\n\n`;
  if (docData.ficheroNotas) {
    md += `> **Fichero oficial:** \`${docData.ficheroNotas}\`  \n`;
  }
  if (docData.rama || docData.prTitulo) {
    md += `> **Rama:** \`${docData.rama || 'main'}\` ➔ **PR:** \`${docData.prTitulo || 'Pull Request'}\`  \n`;
  }
  if (docData.modulo) {
    md += `> **Módulo:** ${docData.modulo}  \n`;
  }
  md += `\n---\n\n`;

  // Soporte tanto para lista de secciones genéricas (secciones: [...])
  // como para secciones nombradas (paso1, paso4, reflexion, etc.)
  if (Array.isArray(docData.secciones)) {
    docData.secciones.forEach((sec) => {
      if (!sec) return;
      md += `## ${sec.titulo || 'Sección'}\n\n`;
      if (Array.isArray(sec.items)) {
        sec.items.forEach((item, idx) => {
          md += `### ${idx + 1}. ${item.pregunta || ''}\n\n`;
          if (item.respuesta) {
            md += `* **Respuesta:**\n${item.respuesta}\n\n`;
          }
        });
      }
      md += `---\n\n`;
    });
  } else {
    ['paso1', 'paso2', 'paso3', 'paso4', 'reflexion'].forEach((key) => {
      const sec = docData[key];
      if (sec && sec.items) {
        md += `## ${sec.titulo || 'Sección'}\n\n`;
        sec.items.forEach((item, idx) => {
          md += `### ${idx + 1}. ${item.pregunta || ''}\n\n`;
          if (item.respuesta) {
            md += `* **Respuesta:**\n${item.respuesta}\n\n`;
          }
        });
        md += `---\n\n`;
      }
    });
  }

  // Checklist de verificación
  const checklist = docData.checklist || (docData.ficheroNotas ? [
    `Fichero \`${docData.ficheroNotas}\` creado en la carpeta correspondiente.`,
    `Documentación y comentarios técnicos completados.`,
    `Pruebas o evidencias de ejecución verificadas.`,
    `Pull Request preparado hacia la rama principal.`
  ] : []);

  if (checklist.length > 0) {
    md += `## Checklist de Entrega y Verificación\n\n`;
    checklist.forEach((check) => {
      md += `- [x] ${check}\n`;
    });
  }

  return md;
}
