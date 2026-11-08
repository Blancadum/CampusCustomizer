import { Link } from 'react-router-dom';

export default function Placeholder({ title }) {
  return (
    <div 
      className="placeholder-container" 
      style={{ 
        padding: '3rem 2rem', 
        textAlign: 'center', 
        minHeight: '60vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}
    >
      <h2 style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>{title}</h2>
      <p style={{ color: 'var(--text-muted, #94a3b8)', marginBottom: '1.5rem' }}>
        Este módulo está en proceso de migración o configuración.
      </p>
      <Link 
        to="/" 
        style={{ 
          color: 'var(--c-blue, #3b82f6)', 
          fontWeight: '600', 
          textDecoration: 'none' 
        }}
      >
        ← Volver al inicio
      </Link>
    </div>
  );
}
