import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../../../config/api';
import SubjectRightAside from './SubjectRightAside.jsx';
import { getIocSubjectByCode } from '../../../config/iocSubjects';
import SubjectHeaderTitle from './SubjectHeaderTitle.jsx';
import SubjectHeaderControls from './SubjectHeaderControls.jsx';
import SubjectCalendar from './SubjectCalendar.jsx';
import SubjectEacsGrid from './SubjectEacsGrid.jsx';
import SubjectTutorialSection from './SubjectTutorialSection.jsx';
import SubjectLightboxModal from './SubjectLightboxModal.jsx';
import './SubjectLanding.css';

export default function SubjectLanding({ dataSource, subjectConfig }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(null); // id de la eac subiéndose
  const [activeEacId, setActiveEacId] = useState('');
  const [activeBloque, setActiveBloque] = useState('bloque1');
  const [showMobileCalendar, setShowMobileCalendar] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null); // Índice de imagen en modal lightbox

  useEffect(() => {
    if (data && data.eacs) {
      const now = new Date();
      let current = data.eacs.find(e => e.dueDate && new Date(e.dueDate) >= now);
      if (!current) current = data.eacs[data.eacs.length - 1];
      if (current) setActiveEacId(current.id);
    }
    if (data && data.blocks && data.blocks.length > 0) {
      setActiveBloque(data.blocks[0].id);
    }
  }, [data]);

  const fetchSubjectData = React.useCallback(() => {
    fetch(dataSource)
      .then(res => {
        if (!res.ok) throw new Error('No se pudo cargar la info de la asignatura');
        return res.json();
      })
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [dataSource]);

  useEffect(() => {
    setLoading(true);
    fetchSubjectData();
  }, [fetchSubjectData]);

  const handleMarkAsDone = async (eacId) => {
    try {
      const res = await fetch(API_ENDPOINTS.eacStatus, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectId: data.id,
          eacId: eacId,
          status: 'done'
        })
      });
      if (res.ok) {
        // Refrescar los datos para ver el cambio (y la nueva barra de progreso)
        fetchSubjectData();
      } else {
        alert('Error al marcar como entregado');
      }
    } catch(err) {
      console.error('Error al actualizar estado EAC:', err);
      alert('Error de red al conectar con el backend local.');
    }
  };

  const handleFileUpload = async (eacId, file) => {
    if (!file) return;
    setUploading(eacId);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(API_ENDPOINTS.upload(data.id), {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        alert(`¡Copia de seguridad guardada con éxito en la bóveda!`);
      } else {
        alert('Error al subir el archivo');
      }
    } catch(err) {
      console.error('Error al subir copia de seguridad EAC:', err);
      alert('Error de conexión con la base de datos local');
    } finally {
      setUploading(null);
    }
  };

  const resolvedSubjectConfig = React.useMemo(() => {
    if (subjectConfig) return subjectConfig;
    if (data?.id) return getIocSubjectByCode(data.id);
    return null;
  }, [subjectConfig, data]);

  // Galería de imágenes de ejercicios para la EAC activa
  const activeEacGallery = React.useMemo(() => {
    if (!data?.eacs) return [];
    const activeEac = data.eacs.find(e => e.id === activeEacId);
    if (!activeEac || !Array.isArray(activeEac.exercicis)) return [];
    return activeEac.exercicis.filter(ex => Boolean(ex.img));
  }, [data, activeEacId]);

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Cargando asignatura...</div>;
  if (error) return <div style={{ padding: '2rem', color: 'red' }}>Error: {error}</div>;
  if (!data) return null;

  return (
    <div className="app-container" style={{ '--subject-color': data.themeColor }}>
      {/* Panel lateral derecho con pestañas deslizantes (Lecciones, EACs, DevKit, Git) */}
      {resolvedSubjectConfig && (
        <SubjectRightAside
          subjectConfig={resolvedSubjectConfig}
          gestionData={data}
          themeColor={data.themeColor}
          topOffset="76px"
        />
      )}
      <main className="content-main" style={{ padding: '2rem 5%', maxWidth: '1200px', margin: '0 auto' }}>
        
        {showMobileCalendar && <div className="calendar-overlay" onClick={() => setShowMobileCalendar(false)}></div>}
        
        {/* HERO BANNER */}
        <header className="header-container">
          {/* LEFT SIDE: Title & Controls */}
          <div className="header-left-side">
            <SubjectHeaderTitle data={data} />
            <SubjectHeaderControls
              data={data}
              activeBloque={activeBloque}
              setActiveBloque={setActiveBloque}
              activeEacId={activeEacId}
              setActiveEacId={setActiveEacId}
              onOpenMobileCalendar={() => setShowMobileCalendar(true)}
            />
          </div>

          {/* RIGHT SIDE: MINI CALENDARIO MENSUAL DE LA ASIGNATURA */}
          <SubjectCalendar
            events={data.events}
            eacs={data.eacs}
            showMobileCalendar={showMobileCalendar}
            setShowMobileCalendar={setShowMobileCalendar}
          />
        </header>

        {/* ENTREGAS EACs */}
        <SubjectEacsGrid
          eacs={data.eacs}
          activeEacId={activeEacId}
          subjectId={data.id}
          uploading={uploading}
          onSelectTutorial={(eacId) => {
            setActiveEacId(eacId);
            setShowTutorial(true);
            setTimeout(() => {
              const section = document.getElementById('paso-a-paso-section');
              if (section) section.scrollIntoView({ behavior: 'auto' });
            }, 50);
          }}
          onFileUpload={handleFileUpload}
          onMarkAsDone={handleMarkAsDone}
        />

        {/* PASO A PASO SECTION */}
        <SubjectTutorialSection
          showTutorial={showTutorial}
          onClose={() => setShowTutorial(false)}
          eacs={data.eacs}
          activeEacId={activeEacId}
          subjectId={data.id}
          presentation={data.presentation}
          activeEacGallery={activeEacGallery}
          onOpenLightbox={(gIdx) => setLightboxIndex(gIdx)}
        />

        {/* MODAL LIGHTBOX / VISOR INTERACTIVO DE DIAGRAMAS */}
        <SubjectLightboxModal
          gallery={activeEacGallery}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onIndexChange={setLightboxIndex}
        />

      </main>
    </div>
  );
}
