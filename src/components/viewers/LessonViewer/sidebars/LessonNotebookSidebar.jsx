import React, { useState } from 'react';
import { formatNotebookMarkdown } from '../../../../utils/notebookFormatter';
import './LessonNotebookSidebar.css';

export default function LessonNotebookSidebar({ 
  isOpen, 
  onToggle, 
  activeSlug, 
  activityTitle,
  notebookData,
  topOffset = '76px'
}) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('doc'); // 'doc' | 'raw'

  // Si no se pasan datos específicos de notas, generamos una plantilla base universal
  const docData = notebookData || {
    actividadNumero: activeSlug ? activeSlug.replace(/[^0-9]/g, '') : '',
    ficheroNotas: `notas/NOTAS-${activeSlug || 'ejercicio'}.md`,
    rama: activeSlug || 'main',
    prTitulo: `${activityTitle || 'Entrega'}`,
    tituloDoc: `Documento de Notas: ${activityTitle || activeSlug}`,
    modulo: 'Apuntes y Registro de Trabajo',
    secciones: [
      {
        titulo: 'Registro de Decisiones Técnicas',
        icono: '📝',
        color: 'var(--accent-blue)',
        items: [
          {
            pregunta: 'Decisiones de diseño y arquitectura tomadas:',
            respuesta: 'Registra aquí las razones técnicas de la estructura implementada y cualquier consulta realizada.'
          }
        ]
      }
    ]
  };

  const markdownContent = formatNotebookMarkdown(docData);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  const handleDownload = () => {
    const filename = (docData.ficheroNotas || `NOTAS-${activeSlug || 'ejercicio'}.md`).split('/').pop();
    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Normalizar secciones para renderizado 100% data-driven
  const sectionsList = docData.secciones || [
    docData.paso1 && { ...docData.paso1, icono: '💬', color: 'var(--accent-blue)' },
    docData.paso4 && { ...docData.paso4, icono: '🧠', color: '#f59e0b' },
    docData.reflexion && { ...docData.reflexion, icono: '🎯', color: '#10b981' }
  ].filter(Boolean);

  return (
    <aside
      className={`notebook-sidebar ${isOpen ? 'is-open' : ''}`}
      aria-label="Panel de notas y cuaderno de trabajo"
      aria-hidden={!isOpen}
    >
      {/* Pestaña Notebook adherida a la izquierda del panel */}
      <button
        onClick={onToggle}
        className="notebook-sidebar-tab-trigger"
        style={{ top: topOffset }}
        title={isOpen ? 'Ocultar cuaderno' : '📓 Cuaderno de Notas y Reflexión'}
        aria-label={isOpen ? 'Ocultar cuaderno' : '📓 Cuaderno de Notas y Reflexión'}
      >
        <span>{isOpen ? '▶' : '📓'}</span>
      </button>

      {/* Cabecera del Panel Cuaderno */}
      <div className="notebook-sidebar-header">
        <div className="notebook-sidebar-header-left">
          <span style={{ fontSize: '1.2rem' }}>📓</span>
          <div>
            <h3 className="notebook-sidebar-title">
              Cuaderno de Reflexión
            </h3>
            <span className="notebook-sidebar-subtitle">
              {docData.modulo || 'Registro de Trabajo'}
            </span>
          </div>
        </div>

        {/* Acciones de la cabecera */}
        <div className="notebook-sidebar-actions">
          <button
            onClick={() => setActiveTab(activeTab === 'doc' ? 'raw' : 'doc')}
            className="notebook-action-btn-secondary"
            title="Alternar vista Documento / Código Markdown"
          >
            {activeTab === 'doc' ? 'Ver .md' : 'Ver Doc'}
          </button>

          <button
            onClick={handleDownload}
            className="notebook-action-btn-secondary"
            title="Descargar archivo Markdown (.md)"
            aria-label="Descargar archivo Markdown"
          >
            📥 .md
          </button>

          <button
            onClick={handleCopy}
            className={`notebook-action-btn-primary ${copied ? 'is-copied' : ''}`}
            aria-label={copied ? 'Plantilla copiada al portapapeles' : 'Copiar plantilla completa'}
          >
            {copied ? '✅ ¡Copiado!' : '📋 Copiar'}
          </button>
        </div>
      </div>

      {/* Metadatos del Documento de Notas */}
      <div className="notebook-sidebar-meta">
        <div className="notebook-meta-file">
          <span>📄</span>
          <code className="notebook-meta-code">
            {docData.ficheroNotas || `notas/${activeSlug}.md`}
          </code>
        </div>
        {docData.rama && (
          <div className="notebook-meta-branch">
            Rama: <strong style={{ color: 'var(--text-title)' }}>{docData.rama}</strong>
          </div>
        )}
      </div>

      {/* Contenido en formato Documento (Doc Reader) */}
      <div className="notebook-sidebar-body">
        {activeTab === 'raw' ? (
          /* Vista Markdown Crudo listo para seleccionar */
          <div className="notebook-raw-container">
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Contenido exacto para tu archivo <code>{docData.ficheroNotas}</code>:
            </div>
            <pre className="notebook-raw-pre">
              <code>{markdownContent}</code>
            </pre>
          </div>
        ) : (
          /* Vista Doc Formateada tipo Cuaderno Oficial */
          <>
            {/* Tarjeta de Encabezado de Documento */}
            <div className="notebook-hero-card">
              <h4 className="notebook-hero-title">
                {docData.tituloDoc}
              </h4>
              <p className="notebook-hero-desc">
                Plantilla requerida para la entrega técnica y Pull Request{docData.rama ? <> hacia <code>{docData.rama}</code></> : ''}.
              </p>
            </div>

            {/* SECCIONES DINÁMICAS DATA-DRIVEN */}
            {sectionsList.map((sec, sIdx) => (
              <section key={sIdx} className="notebook-section">
                <div 
                  className="notebook-section-header"
                  style={{ color: sec.color || 'var(--accent-blue)' }}
                >
                  <span>{sec.icono || '📌'}</span>
                  <span>{sec.titulo}</span>
                </div>
                {sec.items && sec.items.map((it, idx) => (
                  <div 
                    key={idx}
                    className="notebook-item-card"
                  >
                    <div className="notebook-item-question">
                      {it.pregunta}
                    </div>
                    {it.respuesta && (
                      <div 
                        className="notebook-item-answer"
                        style={{ borderLeft: `2px solid ${sec.color || 'var(--border-subtle)'}` }}
                      >
                        {it.respuesta}
                      </div>
                    )}
                  </div>
                ))}
              </section>
            ))}

            {/* Footer con recordatorio de entrega */}
            <div className="notebook-footer-hint">
              💡 Usa el botón <strong>Copiar</strong> o <strong>Descargar .md</strong> para guardar esta plantilla completa en tu carpeta <code>notas/</code>.
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
