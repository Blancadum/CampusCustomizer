import React, { useState, useEffect, useMemo } from 'react';
import IfcdAdminHeader from './ifcd/IfcdAdminHeader';
import IfcdAdminTabsNav from './ifcd/IfcdAdminTabsNav';
import IfcdCronogramaTab from './ifcd/tabs/IfcdCronogramaTab';
import IfcdEvaluacionTab from './ifcd/tabs/IfcdEvaluacionTab';
import IfcdTutoriaTab from './ifcd/tabs/IfcdTutoriaTab';
import IfcdFichaTab from './ifcd/tabs/IfcdFichaTab';
import IfcdDocumentosTab from './ifcd/tabs/IfcdDocumentosTab';
import './LessonIfcdAdminSidebar.css';

/**
 * ============================================================================
 * @component   LessonIfcdAdminSidebar
 * @description Panel lateral derecho con la Información Administrativa oficial
 *              de la especialidad IFCD0177 (Enclave Formación / SEPE).
 *              Estructurado de forma modular con pestañas para cronograma,
 *              evaluación, tutoría, ficha técnica, documentación y buscador.
 * ============================================================================
 */
export default function LessonIfcdAdminSidebar({
  isOpen: controlledIsOpen,
  onToggle: controlledOnToggle,
  onSelectSection,
  topOffset = '24px'
}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('cronograma'); // 'ficha' | 'tutoria' | 'evaluacion' | 'cronograma' | 'documentos'
  const [adminData, setAdminData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const toggle = controlledOnToggle || (() => setInternalIsOpen(!internalIsOpen));

  useEffect(() => {
    fetch('/data/extra/ifcd0177_gestion.json')
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar datos administrativos');
        return res.json();
      })
      .then(data => setAdminData(data))
      .catch(err => console.error('Error cargando ifcd0177_gestion.json:', err));
  }, []);

  const { curso, tutor, evaluacion, cronograma, documentos } = adminData || {};

  // Filtrado reactivo de cronograma según búsqueda
  const filteredCronograma = useMemo(() => {
    if (!cronograma || !searchTerm.trim()) return cronograma || [];
    const term = searchTerm.toLowerCase();
    return cronograma.filter(item => 
      (item.modulo || '').toLowerCase().includes(term) ||
      (item.titulo || '').toLowerCase().includes(term) ||
      (item.fechas || '').toLowerCase().includes(term) ||
      (item.hitos || '').toLowerCase().includes(term)
    );
  }, [cronograma, searchTerm]);

  // Filtrado reactivo de documentos según búsqueda
  const filteredDocumentos = useMemo(() => {
    if (!documentos || !searchTerm.trim()) return documentos || [];
    const term = searchTerm.toLowerCase();
    return documentos.filter(doc => 
      (doc.nombre || '').toLowerCase().includes(term) ||
      (doc.archivo || '').toLowerCase().includes(term)
    );
  }, [documentos, searchTerm]);

  if (!adminData) return null;

  return (
    <aside
      className={`ifcd-admin-sidebar ${isOpen ? 'is-open' : ''}`}
      aria-label="Panel administrativo y guía didáctica IFCD0177"
      aria-hidden={!isOpen}
    >
      {/* 1. Cabecera, botón de apertura y enlace al campus */}
      <IfcdAdminHeader
        isOpen={isOpen}
        onToggle={toggle}
        topOffset={topOffset}
        campusVirtualUrl={curso?.campusVirtualUrl}
      />

      {/* 2. Buscador Integrado en el Panel */}
      <div className="ifcd-search-wrapper">
        <span className="ifcd-search-icon">🔍</span>
        <input
          type="text"
          className="ifcd-search-input"
          placeholder="Buscar fechas, módulos, docs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Buscar en información administrativa"
        />
        {searchTerm && (
          <button
            type="button"
            className="ifcd-search-clear"
            onClick={() => setSearchTerm('')}
            title="Limpiar búsqueda"
          >
            ✕
          </button>
        )}
      </div>

      {/* 3. Barra de sub-pestañas */}
      <IfcdAdminTabsNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* 4. Cuerpo Desplazable del Panel según pestaña activa */}
      <div className="ifcd-admin-body">
        {activeTab === 'cronograma' && (
          <IfcdCronogramaTab
            cronograma={filteredCronograma}
            onSelectSection={onSelectSection}
            onClose={toggle}
          />
        )}

        {activeTab === 'evaluacion' && (
          <IfcdEvaluacionTab evaluacion={evaluacion} />
        )}

        {activeTab === 'tutoria' && (
          <IfcdTutoriaTab tutor={tutor} />
        )}

        {activeTab === 'ficha' && (
          <IfcdFichaTab curso={curso} />
        )}

        {activeTab === 'documentos' && (
          <IfcdDocumentosTab documentos={filteredDocumentos} />
        )}
      </div>
    </aside>
  );
}
