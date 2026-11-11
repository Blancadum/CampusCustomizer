import React from 'react';

/**
 * Lista anidada de subsecciones (x.x.x) con sangría jerárquica y marcado fucsia para EACs.
 */
export default function LessonSidebarSubsections({
  subsections,
  activeSubSlug,
  scrollToSection,
  themeColor
}) {
  if (!subsections || subsections.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', marginLeft: '0.9rem', marginTop: '0.2rem', marginBottom: '0.35rem', borderLeft: '2px solid var(--border-subtle)', paddingLeft: '0.5rem' }}>
      {subsections.map((sub, sIdx) => {
        const subId = sub.slug || sub.id;
        const isSubActive = activeSubSlug === subId;
        const isSubEac = /eac/i.test(sub.title) || Boolean(sub.isEac);

        // Detección de sub-encabezados jerárquicos (ej: 3.1., 3.2., 4.1.)
        const numMatch = sub.title.match(/^\s*(\d+(?:\.\d+)*)\.?\s+/);
        let isSubHeading = false;
        let indentLevel = 0;
        if (numMatch) {
          const parts = numMatch[1].split('.').filter(Boolean);
          const hasParentLevel1 = subsections.some(s => /^\s*\d+\.\s+/.test(s.title));
          if (hasParentLevel1 && parts.length >= 2) {
            isSubHeading = true;
            indentLevel = parts.length - 1;
          }
        }

        const indentRem = isSubHeading ? Math.min(indentLevel, 3) * 1.65 : 0;

        return (
          <button
            key={subId || sIdx}
            data-sidebar-slug={subId}
            aria-current={isSubActive ? 'true' : undefined}
            onClick={() => {
              scrollToSection(subId);
            }}
            style={{
              padding: isSubHeading ? '0.35rem 0.5rem 0.35rem 0.65rem' : '0.45rem 0.55rem',
              marginLeft: `${indentRem}rem`,
              marginTop: (!isSubHeading && sIdx > 0) ? '0.35rem' : '0.05rem',
              marginBottom: '0.05rem',
              width: isSubHeading ? `calc(100% - ${indentRem}rem)` : '100%',
              textAlign: 'left',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '5px',
              color: isSubEac 
                ? '#ec4899' 
                : (isSubActive ? themeColor : (isSubHeading ? 'var(--text-muted)' : 'var(--text-title)')),
              background: isSubActive 
                ? (isSubEac ? 'rgba(236, 72, 153, 0.18)' : `${themeColor}1f`) 
                : 'transparent',
              fontWeight: isSubEac ? '700' : (isSubHeading ? '400' : '500'),
              textShadow: isSubActive ? '0 0 0.35px currentColor' : 'none',
              fontSize: isSubHeading ? '0.80rem' : '0.86rem',
              lineHeight: '1.35',
              transition: 'all 0.15s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.35rem',
              borderLeft: isSubEac 
                ? '3px solid #ec4899' 
                : (isSubActive ? `3px solid ${themeColor}` : (isSubHeading ? '2px solid rgba(255, 255, 255, 0.14)' : '3px solid transparent'))
            }}
            onMouseEnter={(e) => {
              if (!isSubActive) e.currentTarget.style.background = isSubEac ? 'rgba(236, 72, 153, 0.08)' : 'var(--bg-hover)';
            }}
            onMouseLeave={(e) => {
              if (!isSubActive) e.currentTarget.style.background = 'transparent';
            }}
            title={isSubEac ? 'Susceptible de examen PAF / EAC' : sub.title}
          >
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {(sub.topicNum && !sub.title.startsWith(sub.topicNum)) ? `${sub.topicNum} - ` : ''}{sub.title}
            </span>
            {isSubEac && (
              <span 
                style={{ 
                  fontSize: '0.62rem', 
                  fontWeight: 800, 
                  padding: '0.1rem 0.35rem', 
                  borderRadius: '4px', 
                  background: 'rgba(236, 72, 153, 0.2)', 
                  color: '#ec4899',
                  flexShrink: 0
                }}
              >
                EAC
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
