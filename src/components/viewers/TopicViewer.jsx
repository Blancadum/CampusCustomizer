import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './TopicViewer.css';

/**
 * TopicViewer
 * Visor de temas y lecciones temáticas con navegación lateral y paginación inferior.
 */
export default function TopicViewer({ dataSource, defaultSlug }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const currentSlug = slug || defaultSlug;

  useEffect(() => {
    setLoading(true);
    fetch(dataSource)
      .then(res => {
        if (!res.ok) throw new Error('No se pudo cargar el contenido');
        return res.json();
      })
      .then(data => {
        setTopics(data);
        const found = data.find(item => item.slug === currentSlug);
        if (found) {
          setTopic(found);
          setError(null);
        } else if (data.length > 0) {
          setTopic(data[0]);
          setError(null);
        } else {
          setError('El tema que buscas no existe.');
        }
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [dataSource, currentSlug]);

  if (loading) {
    return (
      <div className="app-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h2>Cargando campus... 🚀</h2>
      </div>
    );
  }

  if (error || !topic) {
    return (
      <div className="app-container" style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Oops! 💥</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/')} className="theme-btn" style={{ marginTop: '1rem' }}>
          Volver a Home
        </button>
      </div>
    );
  }

  return (
    <div className="mini-campus-layout">
      {/* Botón flotante optimizado para replegar/desplegar menú lateral */}
      <button 
        type="button"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`topic-sidebar-toggle-btn ${isSidebarOpen ? 'is-open' : 'is-closed'}`}
        title={isSidebarOpen ? 'Replegar menú lateral' : 'Desplegar menú lateral'}
        aria-label={isSidebarOpen ? 'Replegar menú lateral' : 'Desplegar menú lateral'}
        aria-expanded={isSidebarOpen}
      >
        <span>{isSidebarOpen ? '◀' : '▶'}</span>
      </button>

      {/* SIDEBAR */}
      <aside className={`campus-sidebar ${isSidebarOpen ? 'is-open' : 'is-closed'}`}>
        <h3 className="campus-sidebar-title">
          {topic.moduleTitle}
        </h3>
        
        <nav className="campus-sidebar-nav">
          {topics.map(t => {
            const isActive = t.slug === currentSlug;
            return (
              <Link 
                key={t.slug}
                to={`../${t.slug}`} 
                className={`campus-nav-item ${isActive ? 'active' : ''}`}
              >
                {t.title}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className={`campus-content ${isSidebarOpen ? 'with-sidebar' : 'without-sidebar'}`}>
        <div className="topic-header" style={{ marginBottom: '2rem' }}>
          <span className="topic-badge" style={{ 
            display: 'inline-block', 
            background: 'var(--accent-purple)', 
            color: 'white', 
            padding: '0.2rem 0.5rem', 
            borderRadius: '4px', 
            fontSize: '0.75rem', 
            fontWeight: 'bold', 
            marginBottom: '1rem' 
          }}>
            {topic.badge}
          </span>
          <h1 style={{ margin: 0, fontSize: '2.5rem', color: 'var(--text-title)' }}>{topic.title}</h1>
        </div>
        
        <div 
          className="topic-body" 
          style={{ lineHeight: '1.6', color: 'var(--text-main)' }}
          dangerouslySetInnerHTML={{ __html: topic.contentHtml }} 
        />
        
        {/* NAVEGACIÓN INFERIOR */}
        <div className="topic-navigation">
          {topic.prevSlug ? (
            <button 
              type="button"
              className="theme-btn" 
              onClick={() => navigate(`../${topic.prevSlug}`)}
            >
              ← Anterior
            </button>
          ) : <div />}
          
          {topic.nextSlug ? (
            <button 
              type="button"
              className="theme-btn" 
              onClick={() => navigate(`../${topic.nextSlug}`)}
            >
              Siguiente →
            </button>
          ) : <div />}
        </div>
      </main>
    </div>
  );
}
