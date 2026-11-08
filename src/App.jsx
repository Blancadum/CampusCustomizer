import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./Home.jsx'));
import Header from './components/layout/Header.jsx';
import GlobalToDo from './components/layout/GlobalToDo.jsx';
import Placeholder from './components/layout/Placeholder.jsx';
import { getIocRoutes } from './routes/iocRoutes.jsx';

function RouteFallback() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        color: 'var(--c-blue, #3b82f6)',
        fontSize: '1rem',
        fontWeight: '500'
      }}
    >
      <span>Cargando módulo... 🚀</span>
    </div>
  );
}

function AppContent() {
  return (
    <>
      <Header />
      <GlobalToDo />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          {getIocRoutes()}
          <Route path="*" element={<Placeholder title="404 - Página No Encontrada" />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
