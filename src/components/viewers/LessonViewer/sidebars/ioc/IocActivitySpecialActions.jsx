import React from 'react';

/**
 * IocActivitySpecialActions
 * Enlaces rápidos especiales: Guía Paso a Paso EAC 2 (DESP EAC2)
 * y salto directo al ejemplo resuelto de código (ENT EAC1).
 */
export default function IocActivitySpecialActions({
  currentActivity,
  gestionSource,
  subjectTitle,
  onSelectSection
}) {
  if (!currentActivity) return null;

  const isDespEac2 = currentActivity.id === 'eac2' && (gestionSource?.includes('desp') || subjectTitle?.toLowerCase().includes('despliegue'));
  const isEntEac1 = currentActivity.resolvedExampleSlug || (currentActivity.id === 'eac1' && (gestionSource?.includes('ent') || subjectTitle?.toLowerCase().includes('entorno')));

  return (
    <>
      {/* Acceso directo a la Guía Paso a Paso para DESP EAC2 */}
      {isDespEac2 && (
        <div style={{ marginBottom: '1.4rem' }}>
          <a
            href="/desp/eac2"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              color: '#ffffff',
              textDecoration: 'none',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              fontWeight: 800,
              fontSize: '0.88rem',
              boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
              transition: 'transform 0.15s, box-shadow 0.15s',
              textAlign: 'center'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <span>🚀</span>
            <span>Abrir Guía Paso a Paso EAC 2 →</span>
          </a>
        </div>
      )}

      {/* Acceso a Ejemplo Resuelto EAC 1 (Rosa Fucsia, idéntico al índice lateral) */}
      {isEntEac1 && (
        <div style={{ marginBottom: '1.4rem' }}>
          <button
            type="button"
            onClick={() => {
              const parentSlug = currentActivity.resolvedTopicSlug || '2-6-resolver-un-enunciado-de-clases-paso-a-paso';
              const subId = currentActivity.resolvedExampleSlug || '2-6-3-eac1-festa-major';
              if (onSelectSection) {
                onSelectSection(parentSlug);
              }
              setTimeout(() => {
                const el = document.getElementById(subId);
                if (el) {
                  const y = el.getBoundingClientRect().top + window.scrollY - 150;
                  window.scrollTo({ top: Math.max(0, y), behavior: 'auto' });
                }
              }, 60);
            }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.65rem',
              background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
              color: '#ffffff',
              border: 'none',
              padding: '0.85rem 1.1rem',
              borderRadius: '10px',
              fontWeight: 800,
              fontSize: '0.88rem',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(236, 72, 153, 0.35)',
              transition: 'all 0.2s ease',
              textAlign: 'left'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(236, 72, 153, 0.48)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(236, 72, 153, 0.35)';
            }}
            title="Ir al apartado 2.6.3 con la resolución oficial de la EAC 1 (Fiesta Mayor)"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span style={{ fontSize: '1.25rem' }}>🎯</span>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: 800 }}>
                  {currentActivity.resolvedExampleTitle || 'Ejemplo Resuelto EAC 1 (Fiesta Mayor)'}
                </span>
                <span style={{ fontSize: '0.74rem', opacity: 0.95, fontWeight: 500, marginTop: '0.18rem' }}>
                  Ver resolución paso a paso (Tema 2.6.3)
                </span>
              </div>
            </div>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, opacity: 0.9 }}>➔</span>
          </button>
        </div>
      )}
    </>
  );
}
