import React, { useState } from 'react';
import { SEPE_PHP_PROJECTS } from '../../../../data/sepePhpProjectsData';
import './LessonPhpProjectsSidebar.css';

/**
 * ============================================================================
 * @component   LessonPhpProjectsSidebar
 * @description Panel lateral deslizante con los 4 Proyectos Prácticos Oficiales
 *              del certificado SEPE MF0492_3:
 *              1. Agenda de Contactos (UF1844)
 *              2. Mascota Virtual Tamagotchi (UF1844)
 *              3. Biblioteca Municipal (UF1845)
 *              4. API REST & Rutas Amigables .htaccess (UF1846)
 * ============================================================================
 */
export default function LessonPhpProjectsSidebar({
  isOpen,
  onToggle,
  onSelectTopic,
  topOffset = '20px'
}) {
  const [activeProjectId, setActiveProjectId] = useState('agenda');
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const currentProject = SEPE_PHP_PROJECTS.find(p => p.id === activeProjectId) || SEPE_PHP_PROJECTS[0];
  const currentFile = currentProject.files[activeFileIndex] || currentProject.files[0];

  const handleCopyCode = () => {
    if (!currentFile?.code) return;
    navigator.clipboard.writeText(currentFile.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleGoToTopic = (slug) => {
    if (onSelectTopic && slug) {
      onSelectTopic(slug);
    }
    if (onToggle) {
      onToggle();
    }
  };

  const handleSelectProject = (projectId) => {
    setActiveProjectId(projectId);
    setActiveFileIndex(0);
  };

  return (
    <aside
      className={`php-projects-sidebar ${isOpen ? 'is-open' : ''}`}
      style={{ '--php-tab-top': topOffset }}
      aria-label="Panel de Proyectos Prácticos SEPE PHP"
      aria-hidden={!isOpen}
    >
      {/* Pestaña flotante lateral pegada a la izquierda del drawer */}
      <button
        type="button"
        className="php-projects-toggle-tab"
        onClick={onToggle}
        title={isOpen ? 'Cerrar panel de proyectos' : 'Abrir Proyectos Prácticos del Aula'}
        aria-expanded={isOpen}
      >
        <span className="php-projects-tab-icon">🛠️</span>
        <span className="php-projects-tab-text">PROYECTOS AULA</span>
      </button>

      {/* Cabecera */}
      <header className="php-projects-header">
        <div className="php-projects-header-titles">
          <h3>
            <span>💻</span> Proyectos Prácticos del Aula
          </h3>
          <p>4 Talleres de Código Oficiales · MF0492_3 Servidor Web</p>
        </div>
        <button
          type="button"
          className="php-projects-close-btn"
          onClick={onToggle}
          title="Cerrar panel"
        >
          ✕
        </button>
      </header>

      {/* Barra de Recursos y Documentación Unificada del Corpus PHP */}
      <div className="php-corpus-quickbar">
        <a 
          href="/documents/php/TEMARIO_COMPLETO_EXAMEN_MF0492_3.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
          className="php-quickbar-link php-quickbar-pdf"
          title="Descargar o leer el Temario Completo Oficial de Examen (PDF 4.1MB)"
        >
          <span>📑</span>
          <span>Temario PDF</span>
          <span className="php-link-arrow">↗</span>
        </a>
        <button
          type="button"
          className="php-quickbar-link php-quickbar-chuleta"
          onClick={() => handleGoToTopic('chuleta-intensiva-examen')}
          title="Abrir Chuleta con las 20 trampas de examen"
        >
          <span>⚡</span>
          <span>20 Trampas</span>
        </button>
        <button
          type="button"
          className="php-quickbar-link php-quickbar-python"
          onClick={() => handleGoToTopic('comparativa-php-python')}
          title="Abrir Comparativa PHP vs Python"
        >
          <span>🐍🐘</span>
          <span>PHP vs Python</span>
        </button>
      </div>

      {/* Navegación por pestañas entre los 4 proyectos */}
      <nav className="php-projects-nav">
        {SEPE_PHP_PROJECTS.map((proj) => {
          const isActive = proj.id === activeProjectId;
          return (
            <button
              key={proj.id}
              type="button"
              className={`php-projects-nav-btn ${isActive ? 'is-active' : ''}`}
              onClick={() => handleSelectProject(proj.id)}
            >
              <span>{proj.icon}</span>
              <span>{proj.title}</span>
            </button>
          );
        })}
      </nav>

      {/* Contenido interactivo con scroll */}
      <div className="php-projects-content">
        {/* Banner principal del proyecto */}
        <div className="php-project-hero">
          <div className="php-project-badges">
            <span className="php-badge php-badge-uf">{currentProject.uf}</span>
            <span className="php-badge php-badge-hours">⏱️ {currentProject.hours}</span>
            <span className="php-badge php-badge-level">🎯 {currentProject.level}</span>
          </div>

          <h3 className="php-project-title">
            {currentProject.icon} {currentProject.title}
          </h3>
          <div className="php-project-subtitle">{currentProject.subtitle}</div>
          <p className="php-project-desc">{currentProject.summary}</p>
        </div>

        {/* Competencias y Objetivos */}
        <section className="php-project-section">
          <h4>
            <span>🎯</span> Competencias Clave del Proyecto
          </h4>
          <ul className="php-project-list">
            {currentProject.objectives.map((obj, i) => (
              <li key={i}>{obj}</li>
            ))}
          </ul>
        </section>

        {/* Arquitectura de persistencia */}
        <section className="php-project-section">
          <h4>
            <span>🏗️</span> Arquitectura y Persistencia
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.84rem' }}>
            <div>
              <strong style={{ color: 'var(--text-title)' }}>Patrón:</strong> {currentProject.architecture.pattern}
            </div>
            {currentProject.architecture.storage && (
              <div>
                <strong style={{ color: 'var(--text-title)' }}>Almacenamiento:</strong> {currentProject.architecture.storage}
              </div>
            )}
            {currentProject.architecture.database && (
              <div>
                <strong style={{ color: 'var(--text-title)' }}>Base de Datos:</strong> {currentProject.architecture.database}
              </div>
            )}
            {currentProject.architecture.transport && (
              <div>
                <strong style={{ color: 'var(--text-title)' }}>Protocolo:</strong> {currentProject.architecture.transport}
              </div>
            )}
            <div>
              <strong style={{ color: 'var(--text-title)' }}>Punto de Entrada:</strong> <code>{currentProject.architecture.entryPoint}</code>
            </div>
          </div>
        </section>

        {/* Explorador de Código Fuente */}
        <section className="php-code-explorer">
          {/* Tabs de ficheros */}
          <div className="php-code-tabs">
            {currentProject.files.map((file, idx) => (
              <button
                key={file.name}
                type="button"
                className={`php-code-tab-btn ${idx === activeFileIndex ? 'is-active' : ''}`}
                onClick={() => setActiveFileIndex(idx)}
              >
                📄 {file.name}
              </button>
            ))}
          </div>

          {/* Barra de descripción y copiar */}
          <div className="php-code-actions-bar">
            <span>{currentFile?.desc || 'Código fuente oficial'}</span>
            <button
              type="button"
              className="php-code-copy-btn"
              onClick={handleCopyCode}
            >
              {copied ? '✅ ¡Copiado!' : '📋 Copiar Código'}
            </button>
          </div>

          {/* Preformateado del código */}
          <pre className="php-code-snippet">
            <code>{currentFile?.code}</code>
          </pre>
        </section>
      </div>

      {/* Pie de acciones rápidas */}
      <footer className="php-projects-footer">
        <button
          type="button"
          className="php-btn-goto-topic"
          onClick={() => handleGoToTopic(currentProject.slug)}
        >
          <span>📖 Ver Lección Detallada en el Temario</span> ➔
        </button>
      </footer>
    </aside>
  );
}

