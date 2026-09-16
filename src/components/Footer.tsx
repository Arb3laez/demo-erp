import React from 'react';
import { COMPANY_INFO } from '../data/mockData';
import { ActiveView } from '../types';

interface FooterProps {
  onNavigate: (view: ActiveView, sectionId?: string) => void;
  onOpenBrochure: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBrochure }) => {
  return (
    <footer className="w-full bg-[#131b2e] text-white pt-12 pb-8 shadow-[0_-1px_10px_rgba(0,0,0,0.05)] border-t border-[#213145]">
      <div className="max-w-[1320px] mx-auto px-5 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-[#7c839b]/20">
          
          {/* Column 1: Brand & Bio */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold text-white tracking-tight font-['Montserrat']">
                {COMPANY_INFO.name}
              </span>
            </div>
            <p className="text-sm text-[#7c839b] mb-4 leading-relaxed font-['Plus_Jakarta_Sans']">
              Soluciones integrales de infraestructura, climatización especializada HVAC, montajes electromecánicos y gerencia técnica de obra con sede central en Barranquilla.
            </p>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-white uppercase tracking-wider font-bold">Redes:</span>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#fd651e] hover:text-white font-semibold transition-colors"
              >
                @xkala.pdc
              </a>
            </div>
          </div>

          {/* Column 2: Engineering Divisions */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4 font-['Montserrat']">
              Divisiones de Ingeniería
            </h4>
            <ul className="space-y-2 text-sm text-[#7c839b] font-['Plus_Jakarta_Sans']">
              <li>
                <button 
                  onClick={() => onNavigate('portal-comercial', 'servicios')}
                  className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer text-left"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#fd651e]">chevron_right</span>
                  Ingeniería y Obras Civiles
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('portal-comercial', 'servicios')}
                  className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer text-left"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#fd651e]">chevron_right</span>
                  Modelado BIM & Diseño Estructural
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('portal-comercial', 'servicios')}
                  className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer text-left"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#fd651e]">chevron_right</span>
                  Sistemas de Climatización (HVAC)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('portal-comercial', 'servicios')}
                  className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer text-left"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#fd651e]">chevron_right</span>
                  Mantenimiento Industrial Especializado
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('portal-comercial', 'servicios')}
                  className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer text-left"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#fd651e]">chevron_right</span>
                  Estructuras Metálicas & Prefabricados
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Commercial Attention */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4 font-['Montserrat']">
              Atención Comercial
            </h4>
            <ul className="space-y-2.5 text-sm text-[#7c839b] font-['Plus_Jakarta_Sans']">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[#fd651e] text-[18px] mt-0.5 shrink-0">business</span>
                <span>{COMPANY_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#fd651e] text-[18px] shrink-0">phone_in_talk</span>
                <a href={`tel:${COMPANY_INFO.phoneCall}`} className="hover:text-white transition-colors">
                  Línea Directa: {COMPANY_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#fd651e] text-[18px] shrink-0">send</span>
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white transition-colors">
                  {COMPANY_INFO.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#fd651e] text-[18px] shrink-0">schedule</span>
                <span>{COMPANY_INFO.schedule}</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Compliance & Brochure */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4 font-['Montserrat']">
              Garantía y Compliance
            </h4>
            <div className="bg-[#0b1c30] p-3.5 rounded-lg mb-4 border border-[#76777d]/30">
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-[#fd651e] text-[18px]">verified</span>
                <span className="text-xs font-bold text-white uppercase tracking-wider">Estándar Certificado</span>
              </div>
              <p className="text-xs text-[#7c839b] leading-relaxed">
                Cumplimiento riguroso de normativas NSR-10, RETIE, ASHRAE e ISO 9001 en todos nuestros contratos.
              </p>
            </div>
            <button
              onClick={onOpenBrochure}
              className="w-full py-2.5 px-4 bg-[#fd651e] hover:bg-[#a73a00] text-white text-xs font-bold rounded transition-colors text-center shadow-md flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Descargar Brochure Corporativo</span>
            </button>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#7c839b] text-center md:text-left">
          <p>© 2025 XKALA S.A.S. Todos los derechos reservados. {COMPANY_INFO.nit}.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <button 
              onClick={onOpenBrochure} 
              className="hover:text-white transition-colors cursor-pointer py-1"
            >
              Política de Proyectos
            </button>
            <button 
              onClick={onOpenBrochure} 
              className="hover:text-white transition-colors cursor-pointer py-1"
            >
              Tratamiento de Datos
            </button>
            <button 
              onClick={onOpenBrochure} 
              className="hover:text-white transition-colors cursor-pointer py-1"
            >
              Seguridad y Salud SST
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
