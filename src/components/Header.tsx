import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/mockData';
import { ActiveView } from '../types';

interface HeaderProps {
  activeView: ActiveView;
  onNavigate: (view: ActiveView, sectionId?: string) => void;
  onOpenBrochure: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeView, onNavigate, onOpenBrochure }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: ActiveView, sectionId?: string) => {
    onNavigate(view, sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 w-full z-50 shadow-[0_2px_10px_rgba(0,0,0,0.08)] bg-white">
      {/* Top Utility Strip */}
      <div className="bg-[#131b2e] text-[#ffffff] text-[11px] font-bold py-1.5 px-3 sm:px-6">
        <div className="max-w-[1320px] mx-auto flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-3 sm:gap-6 shrink-0">
            <a 
              href={`tel:${COMPANY_INFO.phoneCall}`} 
              className="flex items-center gap-1 hover:text-[#fd651e] transition-colors py-0.5"
              title="Llamar a recepción"
            >
              <span className="material-symbols-outlined text-[14px] text-[#fd651e]">call</span>
              <span className="hidden xs:inline">{COMPANY_INFO.phone}</span>
              <span className="xs:hidden">Llamar</span>
            </a>

            <a 
              href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=Hola%20XKALA,%20solicito%20atención%20comercial`}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[#fd651e] transition-colors py-0.5"
              title="Abrir WhatsApp corporativo"
            >
              <span className="material-symbols-outlined text-[14px] text-[#fd651e]">chat</span>
              <span className="hidden sm:inline">{COMPANY_INFO.whatsapp}</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>

            <a 
              href={`mailto:${COMPANY_INFO.email}`} 
              className="hidden md:flex items-center gap-1 hover:text-[#fd651e] transition-colors py-0.5"
            >
              <span className="material-symbols-outlined text-[14px] text-[#fd651e]">mail</span>
              <span>{COMPANY_INFO.email}</span>
            </a>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 text-[#7c839b] shrink-0 text-[11px]">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-[#fd651e]">location_on</span>
              <span className="text-white sm:text-[#bec6e0]">{COMPANY_INFO.location}</span>
            </span>
            <span className="hidden lg:inline text-[#fd651e]">|</span>
            <span className="hidden lg:inline text-[11px] uppercase tracking-wider text-white">
              Portal B2B & Licitaciones
            </span>
          </div>
        </div>
      </div>

      {/* Main Corporate Header */}
      <div className="bg-white/95 backdrop-blur-md border-b border-[#e5eeff]">
        <div className="h-16 sm:h-20 max-w-[1320px] mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Logo Brand */}
          <button 
            onClick={() => handleNavClick('portal-comercial')} 
            className="flex items-center gap-2 sm:gap-3 text-left focus:outline-none group cursor-pointer shrink-0"
            title="Ir al inicio"
          >
            <img 
              alt="Logo XKALA S.A.S" 
              className="h-7 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105"
              src={COMPANY_INFO.logoUrl} 
            />
            <div className="flex flex-col">
              <span className="text-base sm:text-[20px] font-extrabold tracking-tight text-[#0b1c30] leading-tight font-['Montserrat']">
                {COMPANY_INFO.name}
              </span>
              <span className="text-[9px] sm:text-[11px] tracking-wider uppercase text-[#a73a00] font-bold leading-tight">
                {COMPANY_INFO.tagline}
              </span>
            </div>
          </button>

          {/* Desktop Navigation (large screens) */}
          <nav className="hidden xl:flex items-center gap-6 h-full text-[14px] 2xl:text-[15px] font-semibold text-[#45464d]">
            <button
              onClick={() => handleNavClick('portal-comercial')}
              className={`h-full flex items-center px-1 border-b-2 transition-all cursor-pointer ${
                activeView === 'portal-comercial'
                  ? 'text-[#0b1c30] border-[#0b1c30] font-bold'
                  : 'border-transparent hover:text-[#a73a00]'
              }`}
            >
              {activeView === 'cotizador-wizard' && (
                <span className="material-symbols-outlined text-[18px] mr-1 text-[#fd651e]">arrow_back</span>
              )}
              Portal Comercial
            </button>

            <button
              onClick={() => handleNavClick('portal-comercial', 'servicios')}
              className="h-full flex items-center px-1 border-b-2 border-transparent hover:text-[#a73a00] transition-colors cursor-pointer"
            >
              Servicios
            </button>

            <button
              onClick={() => handleNavClick('portal-comercial', 'galeria-obras')}
              className="h-full flex items-center px-1 border-b-2 border-transparent hover:text-[#a73a00] transition-colors cursor-pointer"
            >
              Proyectos Destacados
            </button>

            <button
              onClick={() => handleNavClick('portal-comercial', 'por-que-elegir')}
              className="h-full flex items-center px-1 border-b-2 border-transparent hover:text-[#a73a00] transition-colors cursor-pointer"
            >
              Metodología Llave en Mano
            </button>

            <button
              onClick={onOpenBrochure}
              className="h-full flex items-center px-1 border-b-2 border-transparent hover:text-[#a73a00] transition-colors cursor-pointer"
            >
              Sobre Nosotros & RUP
            </button>

            <button
              onClick={() => handleNavClick('cotizador-wizard')}
              className={`h-full flex items-center px-1 border-b-2 transition-all cursor-pointer ${
                activeView === 'cotizador-wizard'
                  ? 'text-[#a73a00] border-[#a73a00] font-bold'
                  : 'border-transparent text-[#a73a00] hover:text-[#fd651e]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px] mr-1">calculate</span>
              Cotizador B2B
            </button>
          </nav>

          {/* Right Action Trigger */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('cotizador-wizard')}
              className="hidden md:inline-flex items-center justify-center gap-1.5 bg-[#fd651e] hover:bg-[#a73a00] text-white text-[13px] sm:text-[14px] font-bold px-3.5 sm:px-5 py-2 sm:py-2.5 rounded shadow-[0_2px_8px_rgba(253,101,30,0.3)] transition-all cursor-pointer min-h-[40px]"
            >
              <span className="material-symbols-outlined text-[18px]">calculate</span>
              <span className="hidden lg:inline">Solicitar Cotización</span>
              <span className="lg:hidden">Cotizar</span>
            </button>

            <button 
              onClick={() => handleNavClick(activeView === 'portal-comercial' ? 'cotizador-wizard' : 'portal-comercial')}
              className="w-10 h-10 sm:w-10 sm:h-10 rounded-full bg-[#000000] hover:bg-[#213145] text-white flex items-center justify-center transition-colors cursor-pointer shadow-sm min-h-[44px] min-w-[44px]"
              title={activeView === 'portal-comercial' ? 'Ir a Cotizador' : 'Ir a Portal Comercial'}
              aria-label="Alternar vista"
            >
              <span className="material-symbols-outlined text-[19px]">
                {activeView === 'portal-comercial' ? 'calculate' : 'domain'}
              </span>
            </button>

            {/* Mobile / Tablet Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded text-[#0b1c30] hover:bg-[#eff4ff] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
              aria-label="Abrir menú de navegación"
            >
              <span className="material-symbols-outlined text-[28px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-[#e5eeff] px-4 sm:px-6 py-4 flex flex-col gap-2 shadow-xl animate-in slide-in-from-top-2 duration-200 max-h-[80vh] overflow-y-auto">
          <button
            onClick={() => handleNavClick('portal-comercial')}
            className={`text-left py-3 px-3.5 rounded-lg flex items-center gap-3 text-[15px] font-semibold min-h-[44px] transition-colors cursor-pointer ${
              activeView === 'portal-comercial' ? 'bg-[#eff4ff] text-[#0b1c30] font-bold' : 'text-[#45464d] hover:bg-[#f8f9ff]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px] text-[#fd651e]">domain</span>
            <span>Vista 1: Portal Comercial</span>
          </button>

          <button
            onClick={() => handleNavClick('cotizador-wizard')}
            className={`text-left py-3 px-3.5 rounded-lg flex items-center gap-3 text-[15px] font-semibold min-h-[44px] transition-colors cursor-pointer ${
              activeView === 'cotizador-wizard' ? 'bg-[#ffdbce] text-[#a73a00] font-bold' : 'text-[#a73a00] hover:bg-[#fff0eb]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">calculate</span>
            <span>Vista 2: Cotizador & Asesoría B2B</span>
          </button>

          <button
            onClick={() => handleNavClick('portal-comercial', 'servicios')}
            className="text-left py-2.5 px-3.5 rounded-lg text-[#45464d] hover:bg-[#eff4ff] text-[15px] min-h-[44px] flex items-center gap-3 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px] text-[#76777d]">construction</span>
            <span>Servicios de Ingeniería</span>
          </button>

          <button
            onClick={() => handleNavClick('portal-comercial', 'galeria-obras')}
            className="text-left py-2.5 px-3.5 rounded-lg text-[#45464d] hover:bg-[#eff4ff] text-[15px] min-h-[44px] flex items-center gap-3 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px] text-[#76777d]">photo_library</span>
            <span>Proyectos Destacados</span>
          </button>

          <button
            onClick={() => handleNavClick('portal-comercial', 'por-que-elegir')}
            className="text-left py-2.5 px-3.5 rounded-lg text-[#45464d] hover:bg-[#eff4ff] text-[15px] min-h-[44px] flex items-center gap-3 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px] text-[#76777d]">verified</span>
            <span>Metodología Llave en Mano</span>
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBrochure();
            }}
            className="text-left py-2.5 px-3.5 rounded-lg text-[#45464d] hover:bg-[#eff4ff] text-[15px] min-h-[44px] flex items-center gap-3 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px] text-[#fd651e]">download</span>
            <span>Descargar Brochure & RUP</span>
          </button>

          <div className="pt-3 mt-1 border-t border-[#e5eeff] flex flex-col gap-2.5">
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=Hola%20XKALA,%20solicito%20atención%20comercial`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-[#fd651e] hover:bg-[#a73a00] text-white font-bold rounded-lg flex items-center justify-center gap-2 text-[14px] shadow-sm min-h-[44px]"
            >
              <span className="material-symbols-outlined text-[20px]">chat</span>
              <span>WhatsApp Comercial Inmediato</span>
            </a>
            
            <a
              href={`tel:${COMPANY_INFO.phoneCall}`}
              className="w-full py-2.5 bg-[#eff4ff] text-[#0b1c30] font-bold rounded-lg flex items-center justify-center gap-2 text-[13px] min-h-[44px]"
            >
              <span className="material-symbols-outlined text-[18px] text-[#fd651e]">call</span>
              <span>Llamar a Sede Central ({COMPANY_INFO.phone})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
