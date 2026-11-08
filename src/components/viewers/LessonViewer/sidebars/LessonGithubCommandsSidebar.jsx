import React, { useState, useEffect, useMemo } from 'react';
import { ACCENTURE_ACTIVITIES } from '../../../../config/gitCommandsData';
import GithubAccentureTab from './github/GithubAccentureTab';
import GithubIocEacTab from './github/GithubIocEacTab';
import GithubCheatsheetTab from './github/GithubCheatsheetTab';

/**
 * Ícono oficial de GitHub en formato SVG
 */
const GithubIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

export default function LessonGithubCommandsSidebar({
  isOpen: controlledIsOpen,
  onToggle: controlledOnToggle,
  activeSlug,
  topOffset = '128px',
}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('accenture'); // 'accenture' | 'ioc_eac' | 'cheatsheet'
  const [studentName, setStudentName] = useState(() => {
    return localStorage.getItem('student_git_name') || 'Blanca de Uña';
  });
  const [selectedActNum, setSelectedActNum] = useState(() => {
    if (activeSlug) {
      const match = ACCENTURE_ACTIVITIES.find(
        (a) => a.slug === activeSlug || activeSlug.includes(a.slug)
      );
      if (match) return match.num;
    }
    return 1;
  });
  const [copiedId, setCopiedId] = useState(null);

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const toggle = controlledOnToggle || (() => setInternalIsOpen(!internalIsOpen));

  // Guardar nombre en localStorage
  const handleNameChange = (e) => {
    const val = e.target.value;
    setStudentName(val);
    localStorage.setItem('student_git_name', val);
  };

  // Sincronizar actividad seleccionada automáticamente con el slug activo de la pantalla
  useEffect(() => {
    if (activeSlug) {
      const match = ACCENTURE_ACTIVITIES.find(
        (a) => a.slug === activeSlug || activeSlug.includes(a.slug)
      );
      if (match) {
        setSelectedActNum((prev) => (prev !== match.num ? match.num : prev));
      }
    }
  }, [activeSlug]);

  const currentAct = useMemo(() => {
    return (
      ACCENTURE_ACTIVITIES.find((a) => a.num === selectedActNum) ||
      ACCENTURE_ACTIVITIES[0]
    );
  }, [selectedActNum]);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const safeName = studentName.trim() || 'Blanca de Uña';
  const resolvedFolder = currentAct.folderTemplate.replace('{NAME}', safeName);
  const resolvedZip = currentAct.zipTemplate.replace('{NAME}', safeName);

  return (
    <aside
      aria-label="Panel lateral de comandos Git y GitHub para entregas"
      style={{
        position: 'fixed',
        top: '126px',
        right: 0,
        bottom: 0,
        width: '450px',
        maxWidth: 'calc(100vw - 42px)',
        background: 'var(--bg-card)',
        borderLeft: '1px solid var(--border-subtle)',
        boxShadow: isOpen ? '-8px 0 30px rgba(0,0,0,0.3)' : 'none',
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
        zIndex: isOpen ? 980 : 950,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Botón Pestaña Adherido al Margen Izquierdo con Ícono de GitHub */}
      <button
        type="button"
        onClick={toggle}
        style={{
          position: 'absolute',
          left: '-40px',
          top: topOffset,
          width: '40px',
          height: '46px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRight: 'none',
          borderRadius: '10px 0 0 10px',
          boxShadow: '-4px 2px 10px rgba(0,0,0,0.15)',
          color: isOpen ? '#8b5cf6' : 'var(--text-main)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.15rem',
          zIndex: 951,
          transition: 'all 0.2s ease',
          padding: 0,
        }}
        title={isOpen ? 'Ocultar comandos Git/GitHub' : '🐙 Comandos Git & GitHub para entregas EAC'}
        aria-label={isOpen ? 'Ocultar comandos Git/GitHub' : 'Comandos Git & GitHub para entregas EAC'}
      >
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {isOpen ? '▶' : <GithubIcon size={19} color="var(--text-main)" />}
        </span>
      </button>

      {/* Header del Drawer */}
      <div
        style={{
          padding: '1rem 1.2rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--bg-card)',
          gap: '0.6rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'rgba(139, 92, 246, 0.15)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#8b5cf6',
            }}
          >
            <GithubIcon size={18} color="#8b5cf6" />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-title)' }}>
              Git & GitHub · Comandos EAC
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Guía oficial para subir actividades y entregas
            </span>
          </div>
        </div>

        <button
          onClick={toggle}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            fontSize: '1.2rem',
            cursor: 'pointer',
            padding: '4px 8px',
            borderRadius: '6px',
          }}
          title="Cerrar panel"
        >
          ✕
        </button>
      </div>

      {/* Selector de Nombre del Alumno para Autocompletado */}
      <div
        style={{
          padding: '0.75rem 1.2rem',
          background: 'var(--bg-subtle, rgba(0,0,0,0.03))',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          fontSize: '0.82rem',
        }}
      >
        <span style={{ whiteSpace: 'nowrap', fontWeight: 600, color: 'var(--text-main)' }}>
          👤 Tu Nombre:
        </span>
        <input
          type="text"
          value={studentName}
          onChange={handleNameChange}
          placeholder="Nombre Apellido"
          style={{
            flex: 1,
            padding: '0.35rem 0.6rem',
            borderRadius: '6px',
            border: '1px solid var(--border-subtle)',
            background: 'var(--bg-card)',
            color: 'var(--text-main)',
            fontSize: '0.82rem',
            outline: 'none',
          }}
          title="Se sustituirá automáticamente en todos los comandos generados"
        />
      </div>

      {/* Selector de Pestañas Principales */}
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid var(--border-subtle)',
          background: 'var(--bg-card)',
        }}
      >
        <button
          onClick={() => setActiveTab('accenture')}
          style={{
            flex: 1,
            padding: '0.65rem 0.4rem',
            border: 'none',
            borderBottom: activeTab === 'accenture' ? '2px solid #8b5cf6' : '2px solid transparent',
            background: 'transparent',
            color: activeTab === 'accenture' ? '#8b5cf6' : 'var(--text-muted)',
            fontWeight: activeTab === 'accenture' ? 700 : 500,
            fontSize: '0.82rem',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          📦 Spring Boot
        </button>
        <button
          onClick={() => setActiveTab('ioc_eac')}
          style={{
            flex: 1,
            padding: '0.65rem 0.4rem',
            border: 'none',
            borderBottom: activeTab === 'ioc_eac' ? '2px solid #0969da' : '2px solid transparent',
            background: 'transparent',
            color: activeTab === 'ioc_eac' ? '#0969da' : 'var(--text-muted)',
            fontWeight: activeTab === 'ioc_eac' ? 700 : 500,
            fontSize: '0.82rem',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          🎓 EACs IOC (DAW)
        </button>
        <button
          onClick={() => setActiveTab('cheatsheet')}
          style={{
            flex: 1,
            padding: '0.65rem 0.4rem',
            border: 'none',
            borderBottom: activeTab === 'cheatsheet' ? '2px solid #10b981' : '2px solid transparent',
            background: 'transparent',
            color: activeTab === 'cheatsheet' ? '#10b981' : 'var(--text-muted)',
            fontWeight: activeTab === 'cheatsheet' ? 700 : 500,
            fontSize: '0.82rem',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          ⚡ Chuleta Git
        </button>
      </div>

      {/* Contenido Scrolleable */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.2rem',
        }}
      >
        {activeTab === 'accenture' && (
          <GithubAccentureTab
            selectedActNum={selectedActNum}
            onSelectActNum={setSelectedActNum}
            currentAct={currentAct}
            resolvedFolder={resolvedFolder}
            resolvedZip={resolvedZip}
            copiedId={copiedId}
            onCopy={copyToClipboard}
          />
        )}

        {activeTab === 'ioc_eac' && (
          <GithubIocEacTab copiedId={copiedId} onCopy={copyToClipboard} />
        )}

        {activeTab === 'cheatsheet' && (
          <GithubCheatsheetTab copiedId={copiedId} onCopy={copyToClipboard} />
        )}
      </div>
    </aside>
  );
}
