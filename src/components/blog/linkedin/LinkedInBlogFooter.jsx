import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Pie de página con enlaces de retorno al campus y al temario oficial de IPO2.
 */
export default function LinkedInBlogFooter() {
  return (
    <footer style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
      <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
        <span>←</span> <span>Volver a la Home</span>
      </Link>
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <Link to="/ioc/ipo2" className="theme-btn" style={{ textDecoration: 'none' }}>
          💼 Ver Landing IPO2
        </Link>
        <Link to="/ioc/ipo2/lecciones-ipo2/seo-linkedin-filtros-ia-ats" className="theme-btn" style={{ background: '#ea580c', color: '#fff', textDecoration: 'none' }}>
          📖 Temario Oficial IPO2 →
        </Link>
      </div>
    </footer>
  );
}
