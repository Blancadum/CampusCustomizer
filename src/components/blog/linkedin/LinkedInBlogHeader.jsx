import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Cabecera editorial del artículo de blog con breadcrumbs, badges y botones de acción.
 */
export default function LinkedInBlogHeader({
  copiedPrompt,
  onCopyPrompt
}) {
  return (
    <>
      {/* NAVEGACIÓN Y BREADCRUMB */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Inicio</Link>
        <span>/</span>
        <Link to="/ioc/ipo2" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>IOC · IPO2</Link>
        <span>/</span>
        <span style={{ color: '#ea580c', fontWeight: 600 }}>Blog: SEO en LinkedIn & Filtros de IA</span>
      </nav>

      {/* HEADER EDITORIAL DEL ARTÍCULO */}
      <header style={{ 
        background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.1) 0%, rgba(147, 51, 234, 0.08) 100%)', 
        border: '1px solid rgba(234, 88, 12, 0.25)', 
        borderRadius: '20px', 
        padding: '2.5rem', 
        marginBottom: '2.5rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.06)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <span style={{ 
            background: 'linear-gradient(135deg, #ea580c, #f97316)', 
            color: '#fff', 
            padding: '0.25rem 0.75rem', 
            borderRadius: '999px', 
            fontSize: '0.75rem', 
            fontWeight: 700 
          }}>
            💼 IPO2 · ESPECIAL EMPLEABILIDAD
          </span>
          <span style={{ 
            background: 'rgba(147, 51, 234, 0.15)', 
            color: '#9333ea', 
            padding: '0.25rem 0.75rem', 
            borderRadius: '999px', 
            fontSize: '0.75rem', 
            fontWeight: 600 
          }}>
            🤖 ALGORITMOS & ATS
          </span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            ⏱️ 7 min de lectura · Orientación Laboral 4.0
          </span>
        </div>

        <h1 style={{ 
          fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', 
          lineHeight: '1.25', 
          color: 'var(--text-title)', 
          margin: '0 0 1rem', 
          fontWeight: 800 
        }}>
          Desmontando el Proceso de Selección: SEO en LinkedIn, Filtros de IA y la Marca Personal que Abre Puertas
        </h1>

        <p style={{ 
          fontSize: '1.15rem', 
          lineHeight: '1.65', 
          color: 'var(--text-main)', 
          margin: '0 0 1.5rem', 
          maxWidth: '850px' 
        }}>
          El puente entre la formación y el mercado laboral ha cambiado para siempre. Ya no enviamos currículums a personas: primero nos enfrentamos a algoritmos implacables. Aprende a superar al <em>portero digital</em> de los ATS, a optimizar tu presencia en LinkedIn y a explotar las habilidades que la IA nunca podrá replicar.
        </p>

        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
          <Link 
            to="/ioc/ipo2/lecciones-ipo2/seo-linkedin-filtros-ia-ats" 
            className="theme-btn" 
            style={{ 
              background: 'linear-gradient(135deg, #ea580c 0%, #f97316 100%)', 
              color: '#fff', 
              textDecoration: 'none', 
              padding: '0.65rem 1.25rem', 
              fontWeight: 600, 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.4rem', 
              borderRadius: '8px' 
            }}
          >
            <span>📖 Abrir en el Libro Digital de IPO2</span>
            <span>➔</span>
          </Link>
          <button 
            type="button" 
            onClick={onCopyPrompt}
            style={{ 
              background: 'var(--bg-card)', 
              border: '1px solid var(--border-subtle)', 
              color: 'var(--text-title)', 
              padding: '0.65rem 1.25rem', 
              borderRadius: '8px', 
              cursor: 'pointer', 
              fontWeight: 600, 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.4rem' 
            }}
          >
            <span>{copiedPrompt ? '✅ Prompt Copiado' : '📋 Copiar Prompt ATS para IA'}</span>
          </button>
        </div>
      </header>
    </>
  );
}
