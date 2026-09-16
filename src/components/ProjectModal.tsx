import React from 'react';
import { PortfolioProject } from '../types';

interface ProjectModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  onQuoteSimilar: (project: PortfolioProject) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onQuoteSimilar,
}) => {
  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0b1c30]/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#e2e8f0] relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Image Banner */}
        <div className="relative h-48 sm:h-64 w-full bg-[#131b2e] overflow-hidden shrink-0">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c30] via-[#0b1c30]/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer min-h-[44px] min-w-[44px]"
            aria-label="Cerrar ficha de proyecto"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>

          <div className="absolute bottom-3 left-4 right-4 sm:left-6 sm:right-6">
            <span className="px-2.5 py-0.5 rounded bg-[#fd651e] text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider inline-block mb-1">
              {project.scopeTag}
            </span>
            <h3 className="text-lg sm:text-2xl font-bold text-white font-['Montserrat'] leading-tight">
              {project.title}
            </h3>
            <p className="text-[#93ccff] text-xs sm:text-[13px] font-medium mt-0.5">
              {project.location} • {project.area}
            </p>
          </div>
        </div>

        {/* Modal Content Details */}
        <div className="p-4 sm:p-6 md:p-8 flex flex-col gap-5">
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#a73a00] mb-1">
              Alcance del Proyecto
            </h4>
            <p className="text-[#45464d] text-sm sm:text-[15px] leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Technical Specs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 bg-[#eff4ff] p-4 sm:p-5 rounded-xl border border-[#d3e4fe]">
            <div className="flex flex-col">
              <span className="text-[11px] uppercase font-bold text-[#76777d]">Nivel BIM Aplicado</span>
              <span className="text-xs sm:text-sm font-bold text-[#0b1c30] mt-0.5">{project.specs.bimLevel}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-[11px] uppercase font-bold text-[#76777d]">Normativa Vigente</span>
              <span className="text-xs sm:text-sm font-bold text-[#0b1c30] mt-0.5">{project.specs.normative}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-[11px] uppercase font-bold text-[#76777d]">Tipo Estructural</span>
              <span className="text-xs sm:text-sm font-bold text-[#0b1c30] mt-0.5">{project.specs.structuralType}</span>
            </div>

            {project.specs.hvacCapacity && (
              <div className="flex flex-col">
                <span className="text-[11px] uppercase font-bold text-[#76777d]">Capacidad Térmica HVAC</span>
                <span className="text-xs sm:text-sm font-bold text-[#0b1c30] mt-0.5">{project.specs.hvacCapacity}</span>
              </div>
            )}

            <div className="flex flex-col">
              <span className="text-[11px] uppercase font-bold text-[#76777d]">Tiempo de Ejecución</span>
              <span className="text-xs sm:text-sm font-bold text-[#a73a00] mt-0.5">{project.executionTime} (Sin desvíos)</span>
            </div>

            <div className="flex flex-col">
              <span className="text-[11px] uppercase font-bold text-[#76777d]">Resultado Destacado</span>
              <span className="text-xs sm:text-sm font-bold text-[#0b1c30] mt-0.5">{project.highlight}</span>
            </div>
          </div>

          {/* Action Triggers */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-2 border-t border-[#e2e8f0]">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded text-[#45464d] hover:bg-[#eff4ff] text-xs sm:text-sm font-bold transition-colors cursor-pointer min-h-[44px] flex items-center justify-center"
            >
              Cerrar Ficha
            </button>

            <button
              onClick={() => {
                onClose();
                onQuoteSimilar(project);
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded bg-[#fd651e] hover:bg-[#a73a00] text-white text-xs sm:text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
            >
              <span className="material-symbols-outlined text-[18px]">calculate</span>
              <span>Cotizar Proyecto Similar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
