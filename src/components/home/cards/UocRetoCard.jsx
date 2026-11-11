import React from 'react';
import { Link } from 'react-router-dom';
import CardArchiveButton from './CardArchiveButton.jsx';
import { UOC_SUBJECTS } from '../../../config/iocSubjects.js';

export default function UocRetoCard({ isArchived, onToggleArchive }) {
  return (
    <article className={`campus-card card-ioc ${isArchived ? 'card-is-archived' : ''}`}>
      <CardArchiveButton
        isArchived={isArchived}
        onToggle={onToggleArchive}
        cardTitle="Campus UOC"
      />
      <div>
        <div className="campus-card-header">
          <div
            className="campus-card-icon"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #9333ea)',
              color: '#fff',
              boxShadow: '0 4px 14px rgba(124, 58, 237, 0.3)'
            }}
          >
            🏛️
          </div>
          <div className="campus-card-titles" style={{ flex: 1 }}>
            <h3>Campus UOC (Grado / Máster)</h3>
            <span className="campus-institution">Universitat Oberta de Catalunya · Carpeta Independiente</span>
          </div>
        </div>
        <p className="campus-card-desc">
          Carpeta independiente para asignaturas y PECs de la UOC (`public/data/uoc/` y `public/eacs/uoc/`), con seguimiento de entregas, apuntes y guías paso a paso.
        </p>
      </div>

      <div className="campus-card-actions ioc-card-actions">
        <div className="ioc-subjects-column">
          {UOC_SUBJECTS.map((sub, idx) => (
            <Link
              key={sub.code}
              to={`/uoc/${sub.code}`}
              className="btn-ioc-subject-row"
              style={{ borderLeftColor: sub.color }}
              title={sub.title}
            >
              <span className="btn-ioc-icon">{sub.icon}</span>
              <div className="btn-ioc-info">
                <span className="btn-ioc-sigla" style={{ color: sub.color, '--sigla-color': sub.color }}>
                  {`UOC ${idx + 1}`}
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

