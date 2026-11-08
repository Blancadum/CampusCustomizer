import React, { useMemo } from 'react';
import CodeBlockWithCopy from './CodeBlockWithCopy';
import { renderH2, renderH3, renderH4 } from './markdown/MarkdownHeadingRenderer';
import { MarkdownImageRenderer } from './markdown/MarkdownImageRenderer';
import { MarkdownLinkRenderer } from './markdown/MarkdownLinkRenderer';

/**
 * useLessonMarkdownComponents
 * Proveedor de componentes semánticos y enriquecidos para renderizar contenido Markdown.
 */
export default function useLessonMarkdownComponents({ onOpenLightbox }) {
  return useMemo(() => ({
    pre: ({ node, ...props }) => <CodeBlockWithCopy {...props} />,

    h2: renderH2,
    h3: renderH3,
    h4: renderH4,

    table: ({ node, children, ...props }) => (
      <div className="petete-table-wrapper">
        <table className="petete-table" {...props}>
          {children}
        </table>
      </div>
    ),

    th: ({ node, children, ...props }) => (
      <th className="petete-th" {...props}>
        {children}
      </th>
    ),

    td: ({ node, children, ...props }) => (
      <td className="petete-td" {...props}>
        {children}
      </td>
    ),

    p: ({ node, children, ...props }) => {
      // Si el texto empieza con etiquetas tipo [!NOTE], [!TIP], etc., limpiarlas para integrarlo como texto normal
      const cleanChild = (child) => {
        if (typeof child === 'string') {
          return child.replace(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION|INFO)\]\s*/i, '');
        }
        return child;
      };

      const sanitizedChildren = React.Children.map(children, cleanChild);
      return (
        <div className="lesson-p" {...props}>
          {sanitizedChildren}
        </div>
      );
    },

    blockquote: ({ node, children, ...props }) => (
      <blockquote className="lesson-callout" {...props}>
        {children}
      </blockquote>
    ),

    details: ({ node, children, ...props }) => (
      <details className="petete-accordion" {...props}>
        {children}
      </details>
    ),

    summary: ({ node, children, ...props }) => (
      <summary className="petete-summary" {...props}>
        {children}
      </summary>
    ),

    a: ({ node, ...props }) => <MarkdownLinkRenderer {...props} />,

    img: ({ node, ...props }) => <MarkdownImageRenderer onOpenLightbox={onOpenLightbox} {...props} />
  }), [onOpenLightbox]);
}
