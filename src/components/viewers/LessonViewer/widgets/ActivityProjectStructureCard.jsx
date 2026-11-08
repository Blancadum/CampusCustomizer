import React, { useState } from 'react';
import { resolveProjectStructure, DEFAULT_ACTIVITY_STRUCTURES } from '../../../../config/activityStructures';

export { DEFAULT_ACTIVITY_STRUCTURES, resolveProjectStructure };

export default function ActivityProjectStructureCard({ activeTopic, themeColor = '#8b5cf6' }) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  if (!activeTopic) return null;

  const structure = resolveProjectStructure(activeTopic);
  if (!structure) return null;

  const projectName = activeTopic.proyecto || (structure.startsWith('JavaSpring') ? structure.split('/')[0] : 'taskmanager');

  const handleCopy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(structure.trim()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  return (
    <div 
      className="activity-project-structure-card"
      style={{
        margin: '0 0 2.2rem 0',
        borderRadius: '12px',
        border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.12))',
        background: 'var(--bg-card, #131b2e)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm, 0 4px 14px rgba(0, 0, 0, 0.15))',
        transition: 'border-color 0.2s ease'
      }}
    >
      {/* Barra de cabecera interactiva */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.85rem 1.25rem',
          background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.12) 0%, rgba(59, 130, 246, 0.05) 100%)',
          borderBottom: isExpanded ? '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))' : 'none',
          cursor: 'pointer',
          userSelect: 'none',
          flexWrap: 'wrap',
          gap: '0.8rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <span style={{ fontSize: '1.25rem' }}>📁</span>
          <span style={{ fontWeight: 700, fontSize: '0.94rem', color: 'var(--text-title)' }}>
            Estructura del Proyecto y Paquetes
          </span>
          {projectName && (
            <code style={{
              fontSize: '0.76rem',
              padding: '0.15rem 0.55rem',
              borderRadius: '6px',
              background: 'rgba(139, 92, 246, 0.16)',
              color: '#a78bfa',
              border: '1px solid rgba(139, 92, 246, 0.35)',
              fontWeight: 700,
              fontFamily: 'var(--font-mono, monospace)'
            }}>
              {projectName}
            </code>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <button
            type="button"
            onClick={handleCopy}
            title="Copiar árbol de carpetas al portapapeles"
            style={{
              padding: '0.35rem 0.8rem',
              borderRadius: '6px',
              background: copied ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.06)',
              border: copied ? '1px solid #10b981' : '1px solid var(--border-subtle, rgba(255,255,255,0.15))',
              color: copied ? '#10b981' : 'var(--text-main)',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              transition: 'all 0.2s ease'
            }}
          >
            <span>{copied ? '✓' : '📋'}</span>
            <span>{copied ? '¡Copiado!' : 'Copiar Árbol'}</span>
          </button>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '0.2rem' }}>
            {isExpanded ? '▲ Plegar' : '▼ Ver Estructura'}
          </span>
        </div>
      </div>

      {/* Árbol de archivos y carpetas */}
      {isExpanded && (
        <div style={{ position: 'relative' }}>
          <pre style={{
            margin: 0,
            padding: '1.2rem 1.4rem',
            background: '#0d1117',
            color: '#e6edf3',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.86rem',
            lineHeight: '1.65',
            overflowX: 'auto',
            letterSpacing: '0.01em'
          }}>
            <code>{structure.trim()}</code>
          </pre>
          <div style={{
            padding: '0.55rem 1.25rem',
            background: 'rgba(0, 0, 0, 0.25)',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span>💡 Crea exactamente esta jerarquía de directorios y nombres de archivo en tu espacio de trabajo.</span>
          </div>
        </div>
      )}
    </div>
  );
}
