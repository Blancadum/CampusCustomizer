import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Panel para el modo Tutorías: acceso al código en vivo de 10 tutorías,
 * selector de sub-pestañas (semanal vs cronograma vídeos) y tabla de contenidos.
 */
export default function TutoriasPanel({
  items,
  tutoriasSubTab,
  onSelectSubTab
}) {
  return (
    <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingRight: '0.2rem' }}>
      {/* Acceso directo al Visor de Código de las Tutorías */}
      <Link
        to="/accenture/tutorias-codigo"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          padding: '0.65rem 0.8rem',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.16) 0%, rgba(14, 165, 233, 0.12) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.35)',
          textDecoration: 'none',
          color: 'var(--text-title)',
          transition: 'all 0.2s ease',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}
        title="Abrir Visor Completo de Código de las Tutorías de Isra"
      >
        <div style={{ 
          width: '30px', 
          height: '30px', 
          borderRadius: '8px', 
          background: 'rgba(16, 185, 129, 0.2)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          fontSize: '1.1rem'
        }}>
          💻
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#10b981' }}>
            Código en Vivo (10 Tutorías)
          </span>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            141 clases Java y proyectos de Isra
          </span>
        </div>
        <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 'bold' }}>➔</span>
      </Link>

      <div style={{ 
        display: 'flex', 
        gap: '0.35rem', 
        background: 'var(--bg-hover)', 
        padding: '0.25rem', 
        borderRadius: '8px',
        border: '1px solid var(--border-subtle)'
      }}>
        <button
          type="button"
          onClick={() => onSelectSubTab('calendario')}
          style={{
            flex: 1,
            padding: '0.4rem 0.5rem',
            borderRadius: '6px',
            border: 'none',
            fontSize: '0.75rem',
            fontWeight: 700,
            cursor: 'pointer',
            background: tutoriasSubTab === 'calendario' ? 'var(--bg-card)' : 'transparent',
            color: tutoriasSubTab === 'calendario' ? '#8b5cf6' : 'var(--text-muted)',
            boxShadow: tutoriasSubTab === 'calendario' ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
            transition: 'all 0.15s ease'
          }}
        >
          📅 Semanal (Mar / Jue)
        </button>
        <button
          type="button"
          onClick={() => onSelectSubTab('cronograma')}
          style={{
            flex: 1,
            padding: '0.4rem 0.5rem',
            borderRadius: '6px',
            border: 'none',
            fontSize: '0.75rem',
            fontWeight: 700,
            cursor: 'pointer',
            background: tutoriasSubTab === 'cronograma' ? 'var(--bg-card)' : 'transparent',
            color: tutoriasSubTab === 'cronograma' ? '#8b5cf6' : 'var(--text-muted)',
            boxShadow: tutoriasSubTab === 'cronograma' ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
            transition: 'all 0.15s ease'
          }}
        >
          🎬 Cronograma Vídeos
        </button>
      </div>

      <style>{`
        .tutorias-aside-table table {
          width: 100%;
          border-collapse: collapse;
          margin: 0.4rem 0 1rem;
          font-size: 0.74rem;
          border: 1px solid var(--border-subtle);
          border-radius: 6px;
          overflow: hidden;
        }
        .tutorias-aside-table th {
          background: var(--bg-hover);
          color: var(--text-title);
          padding: 0.45rem 0.5rem;
          text-align: left;
          font-weight: 700;
          border-bottom: 2px solid var(--border-subtle);
        }
        .tutorias-aside-table td {
          padding: 0.45rem 0.5rem;
          border-bottom: 1px solid var(--border-subtle);
          color: var(--text-main);
        }
        .tutorias-aside-table tr:hover td {
          background: var(--bg-hover);
        }
        .tutorias-aside-table blockquote {
          margin: 0.4rem 0 0.8rem;
          padding: 0.5rem 0.7rem;
          background: rgba(139, 92, 246, 0.08);
          border-left: 3px solid #8b5cf6;
          border-radius: 4px;
          font-size: 0.72rem;
          color: var(--text-muted);
          line-height: 1.4;
        }
      `}</style>

      <div 
        className="tutorias-aside-table"
        style={{ overflowX: 'auto', flex: 1 }}
        dangerouslySetInnerHTML={{
          __html: (() => {
            const rawHtml = items[0]?.contentHtml || '';
            const parts = rawHtml.split('<hr />');
            if (tutoriasSubTab === 'calendario') {
              return parts[0] || rawHtml;
            }
            return parts[1] || rawHtml;
          })()
        }}
      />
    </div>
  );
}
