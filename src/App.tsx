import React, { useState, useEffect } from 'react';
import { ActiveView, PortfolioProject } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingSwitcher } from './components/FloatingSwitcher';
import { PortalComercial } from './components/PortalComercial';
import { CotizadorWizard } from './components/CotizadorWizard';
import { ProjectModal } from './components/ProjectModal';
import { BrochureModal } from './components/BrochureModal';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('portal-comercial');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [brochureOpen, setBrochureOpen] = useState<boolean>(false);

  // Initial data passed into wizard if configured from quoter in Screen 1
  const [wizardPrefill, setWizardPrefill] = useState<{
    projectType?: string;
    area?: number;
    budgetRange?: string;
  } | undefined>(undefined);

  // Scroll to top or section on view change
  const handleNavigate = (view: ActiveView, sectionId?: string) => {
    setActiveView(view);
    if (view === 'portal-comercial' && sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFormalizeQuote = (data?: {
    projectType?: string;
    area?: number;
    budgetRange?: string;
  }) => {
    if (data) {
      setWizardPrefill(data);
    }
    setActiveView('cotizador-wizard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuoteSimilarProject = (project: PortfolioProject) => {
    let typeName = 'Construcción Nueva';
    if (project.category === 'industrial') typeName = 'Construcción Nueva';
    else if (project.category === 'comercial') typeName = 'Remodelación Comercial';
    else if (project.category === 'corporativo') typeName = 'Climatización Industrial (HVAC)';

    setWizardPrefill({
      projectType: typeName,
      area: parseInt(project.area.replace(/\D/g, ''), 10) || 500,
      budgetRange: '> $1.500.000.000 COP (Licitaciones de Gran Escala)',
    });
    setActiveView('cotizador-wizard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#0b1c30]">
      {/* Persistent Corporate Header */}
      <Header
        activeView={activeView}
        onNavigate={handleNavigate}
        onOpenBrochure={() => setBrochureOpen(true)}
      />

      {/* Main View Container */}
      <main className="w-full pb-28 flex-1 overflow-x-hidden">
        {activeView === 'portal-comercial' ? (
          <PortalComercial
            onNavigateToWizard={handleFormalizeQuote}
            onOpenProjectModal={(proj) => setSelectedProject(proj)}
            onOpenBrochure={() => setBrochureOpen(true)}
          />
        ) : (
          <CotizadorWizard
            key={JSON.stringify(wizardPrefill)}
            initialData={wizardPrefill}
            onOpenBrochure={() => setBrochureOpen(true)}
          />
        )}
      </main>

      {/* Floating View Switcher pill at the bottom */}
      <FloatingSwitcher
        activeView={activeView}
        onSelectView={(view) => handleNavigate(view)}
      />

      {/* Corporate Technical Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBrochure={() => setBrochureOpen(true)}
      />

      {/* Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onQuoteSimilar={handleQuoteSimilarProject}
      />

      <BrochureModal
        isOpen={brochureOpen}
        onClose={() => setBrochureOpen(false)}
      />
    </div>
  );
}
