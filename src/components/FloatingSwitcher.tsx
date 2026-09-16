import React from 'react';
import { ActiveView } from '../types';

interface FloatingSwitcherProps {
  activeView: ActiveView;
  onSelectView: (view: ActiveView) => void;
}

export const FloatingSwitcher: React.FC<FloatingSwitcherProps> = ({
  activeView,
  onSelectView,
}) => {
  return (
    <aside 
      aria-label="Navegación entre Pantallas y Vistas" 
      className="fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#131b2e]/95 backdrop-blur-md text-white px-2.5 sm:px-4 py-1.5 rounded-full shadow-2xl border border-white/20 flex items-center gap-1.5 sm:gap-2 max-w-[calc(100vw-1.5rem)]"
    >
      <span className="text-[11px] font-bold uppercase tracking-wider text-[#c6c6cd] hidden md:inline-flex items-center gap-1 shrink-0">
        <span className="material-symbols-outlined text-[16px] text-[#fd651e]">swap_horiz</span>
        <span>Pantallas:</span>
      </span>

      <div className="flex items-center bg-white/10 p-1 rounded-full gap-1 shrink-0">
        <button
          onClick={() => onSelectView('portal-comercial')}
          className={`flex items-center justify-center gap-1 sm:gap-1.5 px-3 sm:px-3.5 py-2 rounded-full text-[11px] sm:text-[12px] font-bold transition-all cursor-pointer min-h-[40px] ${
            activeView === 'portal-comercial'
              ? 'bg-[#fd651e] text-white shadow-md'
              : 'text-[#c6c6cd] hover:text-white hover:bg-white/10'
          }`}
          title="Ver Landing Comercial y Portafolio"
        >
          <span className="material-symbols-outlined text-[15px] sm:text-[16px]">domain</span>
          <span>
            <span className="hidden sm:inline">Vista 1: </span>
            <span>Portal</span>
            <span className="hidden xs:inline"> Comercial</span>
          </span>
        </button>

        <button
          onClick={() => onSelectView('cotizador-wizard')}
          className={`flex items-center justify-center gap-1 sm:gap-1.5 px-3 sm:px-3.5 py-2 rounded-full text-[11px] sm:text-[12px] font-bold transition-all cursor-pointer min-h-[40px] ${
            activeView === 'cotizador-wizard'
              ? 'bg-[#fd651e] text-white shadow-md'
              : 'text-[#c6c6cd] hover:text-white hover:bg-white/10'
          }`}
          title="Ir a Cotizador & Asesoría Comercial"
        >
          <span className="material-symbols-outlined text-[15px] sm:text-[16px]">calculate</span>
          <span>
            <span className="hidden sm:inline">Vista 2: </span>
            <span>Cotizador</span>
            <span className="hidden md:inline"> & Asesoría</span>
          </span>
        </button>
      </div>
    </aside>
  );
};
