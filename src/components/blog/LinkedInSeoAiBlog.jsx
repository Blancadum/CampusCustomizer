import React, { useState } from 'react';
import { ATS_PROMPT_TEXT, CHECKLIST_ITEMS } from '../../data/linkedinBlogData';
import LinkedInBlogHeader from './linkedin/LinkedInBlogHeader';
import LinkedInAtsSection from './linkedin/LinkedInAtsSection';
import LinkedInProfileOptimizationSection from './linkedin/LinkedInProfileOptimizationSection';
import LinkedInPersonalBrandSection from './linkedin/LinkedInPersonalBrandSection';
import LinkedInBlogFooter from './linkedin/LinkedInBlogFooter';

/**
 * ============================================================================
 * @component   LinkedInSeoAiBlog
 * @description Artículo editorial interactivo sobre algoritmos de selección,
 *              estrategia SEO en LinkedIn, filtros ATS y marca personal para IPO2.
 * ============================================================================
 */
export default function LinkedInSeoAiBlog() {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [checklist, setChecklist] = useState(() => {
    const saved = localStorage.getItem('micampus_linkedin_checklist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return {
      headline: true,
      about: true,
      skills: false,
      cvFormat: false,
      githubLinks: false,
      recommendations: false
    };
  });

  const toggleCheck = (key) => {
    const updated = { ...checklist, [key]: !checklist[key] };
    setChecklist(updated);
    localStorage.setItem('micampus_linkedin_checklist', JSON.stringify(updated));
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(ATS_PROMPT_TEXT).then(() => {
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2500);
    });
  };

  const completedChecks = Object.values(checklist).filter(Boolean).length;
  const progressPercent = Math.round((completedChecks / CHECKLIST_ITEMS.length) * 100);

  return (
    <div className="app-container" style={{ minHeight: '100vh', padding: '1.5rem 5% 4rem', maxWidth: '1080px', margin: '0 auto' }}>
      {/* 1. Header con breadcrumb, metadatos y botones de acción */}
      <LinkedInBlogHeader
        copiedPrompt={copiedPrompt}
        onCopyPrompt={handleCopyPrompt}
      />

      {/* 2. Cuerpo principal estructurado en secciones temáticas */}
      <main style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '2.5rem' }}>
        <LinkedInAtsSection />
        <LinkedInProfileOptimizationSection
          checklist={checklist}
          onToggleCheck={toggleCheck}
          completedChecks={completedChecks}
          progressPercent={progressPercent}
        />
        <LinkedInPersonalBrandSection />
      </main>

      {/* 3. Pie con navegación de retorno */}
      <LinkedInBlogFooter />
    </div>
  );
}
