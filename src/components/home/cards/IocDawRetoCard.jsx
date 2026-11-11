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
        cardTitle="Campus IOC"
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
            <h3>Campus IOC (CFGS)</h3>
            <span className="campus-institution">Institut Obert de Catalunya · Asignaturas Limpias</span>
          </div>
        </div>
        <p className="campus-card-desc">
          Espacio para tus módulos del IOC (`public/data/ioc/` y `public/eacs/ioc/`). Incluye calendario de EACs, Libro Digital interactivo y Workbench paso a paso.
        </p>
      </div>

      <div className="campus-card-actions ioc-card-actions">
        <div className="ioc-subjects-column">
          {IOC_SUBJECTS.map((sub, idx) => (
            <Link
              key={sub.code}
              to={`/ioc/${sub.code}`}
              className="btn-ioc-subject-row btn-ioc-ent"
              style={{ borderLeftColor: sub.color }}
              title={sub.title}
            >
              <span className="btn-ioc-icon">{sub.icon}</span>
              <div className="btn-ioc-info">
                <span className="btn-ioc-sigla" style={{ color: sub.color, '--sigla-color': sub.color }}>
                  {`IOC ${idx + 1}`}
                </span>
                <span className="btn-ioc-title">{sub.title}</span>
              </div>
              <span className="btn-ioc-arrow">➔</span>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
