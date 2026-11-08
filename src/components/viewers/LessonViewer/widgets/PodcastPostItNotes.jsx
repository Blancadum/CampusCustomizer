import React, { useState } from 'react';

export default function PodcastPostItNotes({ promptText }) {
  const [isPromptExpanded, setIsPromptExpanded] = useState(false);
  const [isEditingPrompt, setIsEditingPrompt] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [copied, setCopied] = useState(false);

  if (!promptText) return null;

  const currentText = customPrompt || promptText;

  const handleCopy = (e) => {
    e.stopPropagation();
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(currentText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div style={{
      position: 'relative',
      background: 'linear-gradient(180deg, #fef9c3 0%, #fef08a 100%)',
      color: '#713f12',
      border: '1px solid #fde047',
      borderRadius: '12px',
      padding: isPromptExpanded ? '1.4rem 1.6rem 1.4rem 1.8rem' : '0.85rem 1.25rem',
      boxShadow: '0 4px 14px rgba(234, 179, 8, 0.18), 0 2px 5px rgba(0,0,0,0.06)',
      transform: 'rotate(-0.3deg)',
      transition: 'all 0.25s ease'
    }}>
      {/* Cinta adhesiva decorativa */}
      <div style={{
        position: 'absolute',
        top: '-10px',
        left: '50%',
        transform: 'translateX(-50%) rotate(1deg)',
        width: '90px',
        height: '22px',
        background: 'rgba(255, 255, 255, 0.75)',
        border: '1px solid rgba(253, 224, 71, 0.4)',
        borderRadius: '2px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        pointerEvents: 'none'
      }} />

      {/* Cabecera interactiva para desplegar / plegar */}
      <div 
        onClick={() => setIsPromptExpanded(!isPromptExpanded)}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: isPromptExpanded ? '1px dashed rgba(161, 98, 7, 0.35)' : 'none',
          paddingBottom: isPromptExpanded ? '0.65rem' : '0',
          cursor: 'pointer',
          userSelect: 'none'
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontWeight: 800,
          fontSize: '0.88rem',
          color: '#854d0e',
          letterSpacing: '0.2px'
        }}>
          <span>📝</span>
          <span>Pauta & Prompt del Podcast</span>
          <span style={{
            fontSize: '0.74rem',
            fontWeight: 600,
            color: '#a16207',
            background: 'rgba(254, 240, 138, 0.9)',
            padding: '0.15rem 0.55rem',
            borderRadius: '12px',
            border: '1px solid rgba(202, 138, 4, 0.3)'
          }}>
            {isPromptExpanded ? '▲ Plegar' : '▼ Desplegar para afinar / ver'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={handleCopy}
            style={{
              background: copied ? '#15803d' : '#854d0e',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              padding: '0.28rem 0.65rem',
              fontSize: '0.76rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
              transition: 'all 0.15s ease'
            }}
            title="Copiar prompt para usarlo en NotebookLM o ChatGPT"
          >
            {copied ? '✓ Copiado' : '📋 Copiar prompt'}
          </button>
        </div>
      </div>

      {/* Contenido desplegable con opción de afinar */}
      {isPromptExpanded && (
        <div style={{ marginTop: '0.85rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.5rem',
            fontSize: '0.78rem',
            color: '#a16207',
            fontWeight: 600
          }}>
            <span>💡 Puedes afinar o personalizar el prompt directamente aquí antes de copiarlo:</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsEditingPrompt(!isEditingPrompt);
              }}
              style={{
                background: 'transparent',
                border: '1px solid rgba(161, 98, 7, 0.4)',
                color: '#854d0e',
                borderRadius: '4px',
                padding: '0.15rem 0.45rem',
                fontSize: '0.72rem',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              {isEditingPrompt ? '👁️ Vista lectura' : '✏️ Editar / Afinar'}
            </button>
          </div>

          {isEditingPrompt ? (
            <textarea
              value={customPrompt || promptText}
              onChange={(e) => setCustomPrompt(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              rows={8}
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.85)',
                border: '1px solid #eab308',
                borderRadius: '8px',
                padding: '0.75rem',
                fontSize: '0.88rem',
                color: '#713f12',
                fontFamily: 'inherit',
                lineHeight: '1.6',
                resize: 'vertical',
                boxSizing: 'border-box'
              }}
            />
          ) : (
            <div style={{
              fontSize: '0.88rem',
              lineHeight: '1.65',
              color: '#713f12',
              fontWeight: 500,
              whiteSpace: 'pre-wrap',
              background: 'rgba(255, 255, 255, 0.35)',
              padding: '0.75rem 0.9rem',
              borderRadius: '8px',
              border: '1px solid rgba(234, 179, 8, 0.25)'
            }}>
              {currentText}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
