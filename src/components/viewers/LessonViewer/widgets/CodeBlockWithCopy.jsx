import React, { useState, useMemo, Children } from 'react';
import hljs, { enhanceCommentHtml } from '../../../../utils/highlight';

export default function CodeBlockWithCopy({ children, ...props }) {
  const [copied, setCopied] = useState(false);

  // Extraer texto plano para la función de copia
  const extractText = (node) => {
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return String(node);
    if (!node) return '';
    if (Array.isArray(node)) return node.map(extractText).join('');
    if (node.props && node.props.children) return extractText(node.props.children);
    return '';
  };

  const rawCode = extractText(children).trim();

  // Detectar lenguaje y si se trata de un prompt para LLM / Copilot
  const codeChild = Children.toArray(children)[0];
  const className = (codeChild && codeChild.props && codeChild.props.className) || '';
  const langMatch = className.match(/language-(\w+)/);
  const lang = langMatch ? langMatch[1] : '';

  const isPrompt = 
    lang === 'markdown' || 
    lang === 'prompt' || 
    rawCode.includes('Never invent or assume') || 
    rawCode.includes('copilot') || 
    rawCode.includes('Actúa como un') ||
    rawCode.includes('You are a') ||
    rawCode.includes('System Prompt');

  // Resaltado síncrono memoizado: elimina de raíz el parpadeo de colores (FOUC)
  const highlightedHtml = useMemo(() => {
    if (!rawCode) return '';
    try {
      const language = lang && hljs.getLanguage(lang) ? lang : (lang === 'js' ? 'javascript' : (hljs.getLanguage('java') ? 'java' : ''));
      let result = '';
      if (language) {
        result = hljs.highlight(rawCode, { language, ignoreIllegals: true }).value;
      } else {
        result = hljs.highlightAuto(rawCode).value;
      }

      // Aplicar formateo estético de comentarios Javadoc/terminal
      if (typeof enhanceCommentHtml === 'function') {
        result = result.replace(/<span class="hljs-comment">([\s\S]*?)<\/span>/g, (_match, p1) => {
          return `<span class="hljs-comment" data-enhanced="true">${enhanceCommentHtml(p1)}</span>`;
        });
      }
      return result;
    } catch {
      return '';
    }
  }, [rawCode, lang]);

  const handleCopy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!rawCode) return;
    navigator.clipboard.writeText(rawCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  return (
    <div style={{
      position: 'relative',
      margin: '1.6rem 0',
      borderRadius: '12px',
      overflow: 'hidden',
      border: isPrompt ? '1px solid rgba(56, 189, 248, 0.45)' : '1px solid rgba(255, 255, 255, 0.12)',
      boxShadow: isPrompt ? '0 8px 24px rgba(56, 189, 248, 0.16)' : '0 8px 24px rgba(0, 0, 0, 0.35)',
      background: '#011627'
    }}>
      {/* Cabecera interactiva con botón de copia destacado */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.65rem 1.1rem',
        background: isPrompt 
          ? 'linear-gradient(90deg, rgba(56, 189, 248, 0.22) 0%, rgba(99, 102, 241, 0.12) 100%)' 
          : 'rgba(255, 255, 255, 0.04)',
        borderBottom: isPrompt ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
        gap: '0.75rem',
        userSelect: 'none'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '0.84rem', fontWeight: 700, color: isPrompt ? '#38bdf8' : 'var(--text-muted)' }}>
          <span style={{ fontSize: '1.1rem' }}>{isPrompt ? '🤖' : '💻'}</span>
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {isPrompt ? 'Prompt de Sistema · Copilot / LLM' : (lang || 'Código')}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.4rem 0.95rem',
            borderRadius: '6px',
            fontSize: '0.82rem',
            fontWeight: 700,
            cursor: 'pointer',
            border: isPrompt 
              ? (copied ? '1px solid #22c55e' : '1px solid rgba(56, 189, 248, 0.6)')
              : (copied ? '1px solid #22c55e' : '1px solid rgba(255, 255, 255, 0.22)'),
            background: copied 
              ? 'rgba(34, 197, 94, 0.25)' 
              : (isPrompt ? 'rgba(56, 189, 248, 0.22)' : 'rgba(255, 255, 255, 0.08)'),
            color: copied ? '#4ade80' : (isPrompt ? '#38bdf8' : '#e2e8f0'),
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: copied ? '0 0 14px rgba(34, 197, 94, 0.45)' : 'none'
          }}
          title={copied ? '¡Copiado con éxito!' : (isPrompt ? 'Copiar todo el prompt al portapapeles' : 'Copiar código')}
        >
          <span>{copied ? '✅' : '📋'}</span>
          <span>{copied ? '¡Copiado al portapapeles!' : (isPrompt ? 'Copiar Prompt' : 'Copiar Código')}</span>
        </button>
      </div>

      {/* Bloque pre con código ya coloreado de inmediato (sin esperar al useEffect) */}
      <pre 
        style={{
          margin: 0,
          padding: '1.25rem 1.4rem',
          overflowX: 'auto',
          background: 'transparent',
          border: 'none',
          borderRadius: 0,
          boxShadow: 'none',
          lineHeight: '1.6'
        }}
        {...props}
      >
        {highlightedHtml ? (
          <code 
            className={`hljs ${className}`}
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        ) : (
          children
        )}
      </pre>
    </div>
  );
}
