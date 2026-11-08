import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PeteteItinerarioPostIt.css';

const ITINERARIO_ITEMS = [
  {
    num: '1',
    emoji: '🌐',
    title: 'Fundamentos Web & HTTP',
    desc: 'Protocolo HTTP/HTTPS, semántica REST, idempotencia, códigos de estado (2xx, 4xx, 5xx) y arquitectura en 3 capas.',
    slug: 'fundamentos-web-http'
  },
  {
    num: '2',
    emoji: '⚙️',
    title: 'Ecosistema, Maven & Lombok',
    desc: 'Ciclo de vida de Maven (pom.xml), metaprogramación con Lombok (@Data, @Builder) y serialización Jackson JSON.',
    slug: 'ecosistema-maven-lombok'
  },
  {
    num: '3',
    emoji: '🌱',
    title: 'Spring Core, IoC & Capas',
    desc: 'Inversión de Control (IoC), Inyección de dependencias por constructor, ámbito de Beans y controladores @RestController.',
    slug: 'act-01-ioc'
  },
  {
    num: '4',
    emoji: '🔗',
    title: 'Persistencia JPA, Hibernate & DTOs',
    desc: 'Mapeo relacional @Entity, @OneToMany, FetchType LAZY/EAGER, Spring Data Repositories, DTOs y validación @Valid.',
    slug: 'act-08-entidades-jpa'
  },
  {
    num: '5',
    emoji: '📜',
    title: 'Resiliencia, Logs & OpenAPI',
    desc: 'Control centralizado de errores con @ControllerAdvice y ProblemDetail, logs con SLF4J/Logback y Swagger UI.',
    slug: 'act-12-manejo-errores'
  },
  {
    num: '6',
    emoji: '🧪',
    title: 'Testing Profesional & Tests',
    desc: 'Tests unitarios con JUnit 5 y Mockito (@Mock, @InjectMocks) y tests de integración con @WebMvcTest y MockMvc.',
    slug: 'seguridad-y-testing'
  }
];

/**
 * Componente interactivo estilo "Post-it" con el Itinerario del Curso Petete
 */
export default function PeteteItinerarioPostIt() {
  const location = useLocation();
  const navigate = useNavigate();

  // Detección de la ruta base limpia (/accenture/petete, /petete o /java/petete)
  const currentPath = location.pathname;
  let basePath = '/petete';
  if (currentPath.includes('/accenture/petete')) {
    basePath = '/accenture/petete';
  } else if (currentPath.includes('/java/petete')) {
    basePath = '/java/petete';
  } else if (currentPath.includes('/springboot/petete')) {
    basePath = '/petete';
  }

  const handleItemClick = (e, slug) => {
    e.preventDefault();
    const targetElement = document.getElementById(slug);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `${basePath}/${slug}`);
    } else {
      navigate(`${basePath}/${slug}`);
    }
  };

  return (
    <aside className="petete-postit-container" aria-label="Itinerario del Curso Petete">
      <div className="petete-postit">
        {/* Efecto de cinta adhesiva / celofán translúcido superior */}
        <div className="petete-postit-tape" />

        {/* Cabecera del Post-it con chincheta */}
        <div className="petete-postit-header">
          <div className="petete-postit-title-group">
            <span className="petete-postit-pin" aria-hidden="true">📌</span>
            <h2 className="petete-postit-title">🗺️ Itinerario del Curso</h2>
          </div>
          <span className="petete-postit-badge">Hoja de Ruta · 6 Bloques</span>
        </div>

        {/* Cuadrícula didáctica de los 6 bloques del itinerario */}
        <div className="petete-postit-grid">
          {ITINERARIO_ITEMS.map((item) => {
            const isActive = currentPath.endsWith(item.slug) || currentPath.includes(`/${item.slug}`);

            return (
              <a
                key={item.num}
                href={`${basePath}/${item.slug}`}
                onClick={(e) => handleItemClick(e, item.slug)}
                className={`petete-postit-item ${isActive ? 'is-active' : ''}`}
                title={`Ir al tema: ${item.title}`}
                aria-current={isActive ? 'true' : undefined}
              >
                <div className="petete-postit-item-badge">
                  <span>{item.emoji}</span>
                  <span className="petete-postit-item-num">{item.num}</span>
                </div>
                <div className="petete-postit-item-content">
                  <h3 className="petete-postit-item-title">
                    <span>{item.num}. {item.title}</span>
                    {isActive && <span className="petete-postit-active-pill">Actual</span>}
                  </h3>
                  <p className="petete-postit-item-desc">{item.desc}</p>
                </div>
              </a>
            );
          })}
        </div>

        {/* Acceso directo destacado a la Arena de Tests & Quiz */}
        <div className="petete-postit-footer">
          <div className="petete-postit-footer-label">
            <span>🎮</span>
            <span>¿Quieres practicar preguntas de examen?</span>
          </div>
          <button
            type="button"
            onClick={() => navigate('/quiz')}
            className="petete-postit-footer-btn"
            title="Abrir la Arena de Tests y Juegos Interactivos"
          >
            <span>Ir a la Arena de Tests & Quiz</span>
            <span>➔</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
