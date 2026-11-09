import React from 'react';
import { Link } from 'react-router-dom';
import CardArchiveButton from './CardArchiveButton.jsx';
import { IOC_SUBJECTS } from '../../../config/iocSubjects.js';

export default function IocDawRetoCard({ isArchived, onToggleArchive }) {
  return (
    <article className={`campus-card card-ioc ${isArchived ? 'card-is-archived' : ''}`}>
      <CardArchiveButton
        isArchived={isArchived}
        onToggle={onToggleArchive}
        cardTitle="Campus IOC DAW"
      />
      <div>
        <div className="campus-card-header">
          <div
            className="campus-card-icon"
            style={{
              background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
              color: '#fff',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)'
            }}
          >
            🎓
          </div>
          <div className="campus-card-titles" style={{ flex: 1 }}>
            <h3>Campus IOC DAW</h3>
            <span className="campus-institution">Institut Obert de Catalunya · Desarrollo Web</span>
          </div>
        </div>
        <p className="campus-card-desc">
          Incluye las asignaturas de <strong>Despliegue (DESP)</strong>, <strong>Interfaces Web (INT)</strong>, <strong>Empleabilidad I (IPO1)</strong> y <strong>Digitalización (DIGI)</strong>, además de plantillas limpias para añadir tus demás módulos.
        </p>
      </div>

      <div className="campus-card-actions ioc-card-actions">
        <div className="ioc-subjects-column">
          {IOC_SUBJECTS.map((sub) => (
            <Link
              key={sub.code}
              to={`/ioc/${sub.code}`}
              className="btn-ioc-subject-row"
              style={{ borderLeftColor: sub.color }}
              title={sub.title}
            >
              <span className="btn-ioc-icon">{sub.icon}</span>
              <div className="btn-ioc-info">
                <span className="btn-ioc-sigla" style={{ color: sub.color }}>
                  {sub.sigla || sub.code.toUpperCase()}
                </span>
                <span className="btn-ioc-title">{sub.title}</span>
              </div>
              <span className="btn-ioc-arrow">➔</span>
            </Link>
          ))}
          <Link
            to="/blog/seo-linkedin-filtros-ia"
            className="btn-ioc-subject-row"
            style={{ borderLeftColor: '#ea580c', background: 'rgba(234, 88, 12, 0.08)' }}
            title="Artículo de Blog: SEO en LinkedIn & Filtros de IA"
          >
            <span className="btn-ioc-icon">📰</span>
            <div className="btn-ioc-info">
              <span className="btn-ioc-sigla" style={{ color: '#ea580c' }}>BLOG</span>
              <span className="btn-ioc-title">SEO LinkedIn & Filtros IA</span>
            </div>
            <span className="btn-ioc-arrow">➔</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
