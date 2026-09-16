import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/mockData';

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrochureModal: React.FC<BrochureModalProps> = ({ isOpen, onClose }) => {
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => {
      // Create a simulated downloadable text/dossier for XKALA S.A.S
      const blob = new Blob([
        `XKALA S.A.S - DOSSIER INSTITUCIONAL Y REGISTRO ÚNICO DE PROPONENTES (RUP)\n` +
        `NIT: 901.428.114-2\n` +
        `Sede Central: Parque Industrial del Norte, Barranquilla - Colombia\n` +
        `Línea Directa: +57 (605) 309 4500\n\n` +
        `ESPECIALIDADES REGISTRADAS:\n` +
        `- Obras Civiles y Cimentaciones Especiales (NSR-10)\n` +
        `- Sistemas Centralizados de Climatización HVAC & Filtración Hospitalaria\n` +
        `- Montajes Electromecánicos y Subestaciones RETIE\n` +
        `- Modelado y Coordinación BIM Nivel 2 y 3 (LOD 350-400)\n\n` +
        `CAPACIDAD FINANCIERA Y RESIDUAL:\n` +
        `- K Residual de Contratación: Vigente ante Cámara de Comercio de Barranquilla\n` +
        `- Certificación ISO 9001, ISO 14001, ISO 45001 en proceso de auditoría anual\n`
      ], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Brochure_Tecnico_RUP_XKALA_SAS.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 400);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0b1c30]/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-8 shadow-2xl border border-[#e2e8f0] relative flex flex-col max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 rounded-full bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] flex items-center justify-center transition-colors cursor-pointer min-h-[44px] min-w-[44px]"
          aria-label="Cerrar modal"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="w-12 h-12 rounded-xl bg-[#ffdbce] text-[#a73a00] flex items-center justify-center mb-3 sm:mb-4 shrink-0">
          <span className="material-symbols-outlined text-[28px]">folder_zip</span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-[#0b1c30] font-['Montserrat']">
          Portafolio Corporativo & RUP
        </h3>
        <p className="text-xs sm:text-sm text-[#45464d] mt-1 leading-relaxed">
          Descargue el paquete documental oficial de <strong>XKALA S.A.S</strong> para procesos licitatorios y homologación de proveedores.
        </p>

        <div className="my-4 sm:my-5 bg-[#f8f9ff] p-3.5 sm:p-4 rounded-xl border border-[#e5eeff] space-y-2 text-xs sm:text-[13px] text-[#0b1c30]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#fd651e] text-[18px] shrink-0">verified</span>
            <span>Certificado RUP actualizado ante Cámara de Comercio</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#fd651e] text-[18px] shrink-0">verified</span>
            <span>K Residual de Contratación & Balance Auditado</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#fd651e] text-[18px] shrink-0">verified</span>
            <span>Pólizas de Responsabilidad Civil & Estabilidad de Obra</span>
          </div>
        </div>

        {downloaded ? (
          <div className="p-3 bg-[#eff4ff] border border-[#93ccff] rounded-lg text-center text-xs sm:text-sm text-[#004b73] font-semibold flex items-center justify-center gap-2 min-h-[44px]">
            <span className="material-symbols-outlined text-[#fd651e]">check_circle</span>
            <span>¡Descarga generada con éxito!</span>
          </div>
        ) : (
          <button
            onClick={handleDownload}
            className="w-full py-3 px-5 rounded bg-[#000000] hover:bg-[#213145] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer min-h-[44px]"
          >
            <span className="material-symbols-outlined text-[20px]">download</span>
            <span>Descargar Expediente Técnico (.TXT/PDF)</span>
          </button>
        )}

        <div className="mt-4 pt-3 border-t border-[#e2e8f0] flex items-center justify-between text-[11px] sm:text-xs text-[#76777d]">
          <span>NIT: 901.428.114-2</span>
          <span>{COMPANY_INFO.phone}</span>
        </div>
      </div>
    </div>
  );
};
