import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import iocIcon from '../../assets/img/icons/ioc.webp';
import HeaderSearchBar from './HeaderSearchBar';
import HeaderClock from './HeaderClock';
import ThemeSwitcher from './ThemeSwitcher';
import './Header.css';

export default function Header() {
  const location = useLocation();

  return (
    <header className="main-header">
      <div className="header-wrapper">
        <div className="header-inner">
          <div className="brand-section">
            {location.pathname === '/' ? (
              <div className="brand-logo-icon">🎯</div>
            ) : (
              <Link to="/" className="brand-logo-icon brand-link">
                🎯
              </Link>
            )}
            <div className="brand-titles">
              <h1 className="brand-heading">
                MiCampus
                <a
                  href="/data/calendars/exports/todo.ics"
                  download="calendario_miCampus.ics"
                  className="btn-sync-pill"
                  title="Descargar e importar calendario unificado (.ics)"
                >
                  📅 Sincroniza
                </a>
              </h1>
            </div>
          </div>

          <HeaderSearchBar />

          <nav className="header-campus-nav" aria-label="Navegación principal de campus">
            <HeaderClock />

            <ThemeSwitcher />

            <a
              href="https://ioc.xtec.cat/campus/my/"
              target="_blank"
              rel="noopener noreferrer"
              className="header-nav-btn"
              title="Ir al Campus Oficial IOC"
            >
              <img src={iocIcon} alt="IOC" />
              <span className="nav-text">IOC Oficial</span>
            </a>

            <a
              href="https://campus.uoc.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className="header-nav-btn"
              title="Ir al Campus Oficial UOC"
            >
              <span style={{ fontSize: '14px' }}>🏛️</span>
              <span className="nav-text">UOC Oficial</span>
            </a>

            <Link
              to="/ioc/asig-1/eac1"
              className="header-nav-btn"
              title="Ver ejemplo de Guía Paso a Paso de EAC/PEC"
            >
              <span style={{ fontSize: '14px' }}>🚀</span>
              <span className="nav-text">Workbench EAC</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
