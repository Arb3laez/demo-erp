import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/mockData';
import { WizardFormData } from '../types';

interface CotizadorWizardProps {
  initialData?: {
    projectType?: string;
    area?: number;
    budgetRange?: string;
  };
  onOpenBrochure: () => void;
}

export const CotizadorWizard: React.FC<CotizadorWizardProps> = ({
  initialData,
  onOpenBrochure,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState<WizardFormData>({
    projectType: initialData?.projectType || 'Construcción Nueva',
    city: 'Barranquilla (Sede Central / AMB)',
    sector: '',
    area: initialData?.area || 250,
    budgetRange: initialData?.budgetRange || '$500.000.000 - $1.500.000.000 COP',
    additionalServices: ['Modelado BIM'],
    clientName: '',
    clientCompany: '',
    clientPhone: '',
    clientEmail: '',
    notes: '',
    dataConsent: true,
  });

  const [ticketId, setTicketId] = useState<string>('XK-2025-0894');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const titles: Record<number, string> = {
    1: 'Tipo de Requerimiento',
    2: 'Detalles del Inmueble y Área',
    3: 'Servicios y Especialidades Adicionales',
    4: 'Contacto y Agendamiento de Visita',
  };

  const handleNext = () => {
    setValidationError(null);
    if (currentStep === 4) {
      if (!formData.clientName.trim() || !formData.clientCompany.trim() || !formData.clientPhone.trim() || !formData.clientEmail.trim()) {
        setValidationError('Por favor complete los campos obligatorios de contacto para agendar la visita técnica.');
        return;
      }
      // Generate random ticket suffix
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      setTicketId(`XK-2025-${randomNum}`);
      setIsSubmitted(true);
      return;
    }
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    setValidationError(null);
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setCurrentStep(1);
    setValidationError(null);
  };

  const toggleAdditionalService = (serviceName: string) => {
    setFormData((prev) => {
      const exists = prev.additionalServices.includes(serviceName);
      return {
        ...prev,
        additionalServices: exists
          ? prev.additionalServices.filter((s) => s !== serviceName)
          : [...prev.additionalServices, serviceName],
      };
    });
  };

  return (
    <div className="flex flex-col w-full">
      {/* Hero Header Section */}
      <section className="relative w-full bg-[#131b2e] text-white py-12 overflow-hidden shadow-xl">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-[#fd651e]/10 blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 -bottom-20 w-80 h-80 rounded-full bg-[#d3e4fe]/5 blur-3xl pointer-events-none" />
        
        <div className="max-w-[1320px] mx-auto px-5 md:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-[#ffdbce] mb-3 text-xs font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-[18px] text-[#fd651e]">verified</span>
                <span>Respaldo Integral B2B • {COMPANY_INFO.nit}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl text-white font-extrabold tracking-tight mb-2 font-['Montserrat']">
                Inicie su proyecto con el respaldo de ingenieros expertos
              </h1>
              <p className="text-base text-[#7c839b] max-w-2xl leading-relaxed">
                Calcule el alcance preliminar, configure los módulos técnicos de ingeniería y solicite su visita técnica presencial sin costo para obras en el Caribe Colombiano.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-6 bg-[#213145]/70 p-3.5 sm:p-4 rounded-xl backdrop-blur-md border border-white/10 w-full sm:w-auto">
              <div className="flex flex-col">
                <span className="text-[11px] sm:text-xs uppercase text-[#7c839b] font-bold">Tiempo de Respuesta</span>
                <span className="text-lg sm:text-2xl text-[#fd651e] font-extrabold font-['Montserrat']">&lt; 24h Hábiles</span>
              </div>
              <div className="flex flex-col border-l border-white/20 pl-3 sm:pl-6">
                <span className="text-[11px] sm:text-xs uppercase text-[#7c839b] font-bold">Inspección Diagnóstica</span>
                <span className="text-lg sm:text-2xl text-white font-extrabold font-['Montserrat']">100% Bonificada</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Wizard & Sidebar Section */}
      <section className="max-w-[1320px] mx-auto px-5 md:px-12 py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Wizard Form Column */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Step Progress Header */}
            {!isSubmitted && (
              <div className="bg-white p-6 rounded-2xl shadow-md border border-[#e2e8f0]">
                <div className="flex items-center justify-between gap-4 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-[#fd651e] text-white flex items-center justify-center font-bold font-['Montserrat'] text-base shadow-sm">
                      {currentStep}
                    </span>
                    <div>
                      <span className="text-xs text-[#a73a00] uppercase font-bold tracking-wider">
                        Fase de Estimación
                      </span>
                      <h2 className="text-xl font-bold text-[#0b1c30] font-['Montserrat']">
                        {titles[currentStep]}
                      </h2>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-[#76777d]">
                      Paso {currentStep} de {totalSteps}
                    </span>
                  </div>
                </div>

                {/* Progress bar track */}
                <div className="w-full bg-[#e5eeff] h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#fd651e] h-full transition-all duration-300 ease-out rounded-full"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Error banner */}
            {validationError && (
              <div className="p-4 bg-[#ffdad6] text-[#ba1a1a] rounded-xl flex items-center gap-3 text-sm font-semibold border border-[#ffb4ab]">
                <span className="material-symbols-outlined text-[20px]">error</span>
                <span>{validationError}</span>
              </div>
            )}

            {/* Step Content Card */}
            {!isSubmitted ? (
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-[#e2e8f0]">
                
                {/* STEP 1: Tipología */}
                {currentStep === 1 && (
                  <div className="flex flex-col gap-6">
                    <p className="text-sm sm:text-base text-[#45464d]">
                      Seleccione la tipología constructiva principal para dimensionar el equipo de ingeniería asignado:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Option 1 */}
                      <label 
                        className={`cursor-pointer group relative flex flex-col p-5 rounded-xl transition-all border ${
                          formData.projectType === 'Construcción Nueva'
                            ? 'bg-[#eff4ff] border-[#fd651e] shadow-md ring-2 ring-[#fd651e]/30'
                            : 'bg-[#f8f9ff] border-[#e2e8f0] hover:bg-[#eff4ff]'
                        }`}
                      >
                        <input
                          type="radio"
                          name="project_type"
                          value="Construcción Nueva"
                          checked={formData.projectType === 'Construcción Nueva'}
                          onChange={() => setFormData({ ...formData, projectType: 'Construcción Nueva' })}
                          className="sr-only"
                        />
                        <div className="flex items-start justify-between mb-3">
                          <span className="material-symbols-outlined text-[36px] text-[#fd651e] transition-transform duration-300 group-hover:scale-110">
                            foundation
                          </span>
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                            formData.projectType === 'Construcción Nueva' ? 'bg-[#fd651e] text-white' : 'bg-[#d3e4fe]'
                          }`}>
                            <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-[#0b1c30] group-hover:text-[#a73a00] font-['Montserrat']">
                          Construcción Nueva
                        </h3>
                        <p className="text-xs text-[#45464d] mt-1 leading-relaxed">
                          Edificaciones comerciales, bodegas logísticas, locales e infraestructura institucional desde cimientos.
                        </p>
                        <span className="mt-3 inline-flex items-center gap-1 text-xs text-[#a73a00] font-bold">
                          Seleccionar tipología <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                        </span>
                      </label>

                      {/* Option 2 */}
                      <label 
                        className={`cursor-pointer group relative flex flex-col p-5 rounded-xl transition-all border ${
                          formData.projectType === 'Remodelación Comercial'
                            ? 'bg-[#eff4ff] border-[#fd651e] shadow-md ring-2 ring-[#fd651e]/30'
                            : 'bg-[#f8f9ff] border-[#e2e8f0] hover:bg-[#eff4ff]'
                        }`}
                      >
                        <input
                          type="radio"
                          name="project_type"
                          value="Remodelación Comercial"
                          checked={formData.projectType === 'Remodelación Comercial'}
                          onChange={() => setFormData({ ...formData, projectType: 'Remodelación Comercial' })}
                          className="sr-only"
                        />
                        <div className="flex items-start justify-between mb-3">
                          <span className="material-symbols-outlined text-[36px] text-[#fd651e] transition-transform duration-300 group-hover:scale-110">
                            architecture
                          </span>
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                            formData.projectType === 'Remodelación Comercial' ? 'bg-[#fd651e] text-white' : 'bg-[#d3e4fe]'
                          }`}>
                            <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-[#0b1c30] group-hover:text-[#a73a00] font-['Montserrat']">
                          Remodelación Comercial
                        </h3>
                        <p className="text-xs text-[#45464d] mt-1 leading-relaxed">
                          Reforzamiento estructural, modernización de acabados corporativos, divisiones técnicas y ampliaciones.
                        </p>
                        <span className="mt-3 inline-flex items-center gap-1 text-xs text-[#a73a00] font-bold">
                          Seleccionar tipología <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                        </span>
                      </label>

                      {/* Option 3 */}
                      <label 
                        className={`cursor-pointer group relative flex flex-col p-5 rounded-xl transition-all border ${
                          formData.projectType === 'Climatización Industrial (HVAC)'
                            ? 'bg-[#eff4ff] border-[#fd651e] shadow-md ring-2 ring-[#fd651e]/30'
                            : 'bg-[#f8f9ff] border-[#e2e8f0] hover:bg-[#eff4ff]'
                        }`}
                      >
                        <input
                          type="radio"
                          name="project_type"
                          value="Climatización Industrial (HVAC)"
                          checked={formData.projectType === 'Climatización Industrial (HVAC)'}
                          onChange={() => setFormData({ ...formData, projectType: 'Climatización Industrial (HVAC)' })}
                          className="sr-only"
                        />
                        <div className="flex items-start justify-between mb-3">
                          <span className="material-symbols-outlined text-[36px] text-[#fd651e] transition-transform duration-300 group-hover:scale-110">
                            mode_fan
                          </span>
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                            formData.projectType === 'Climatización Industrial (HVAC)' ? 'bg-[#fd651e] text-white' : 'bg-[#d3e4fe]'
                          }`}>
                            <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-[#0b1c30] group-hover:text-[#a73a00] font-['Montserrat']">
                          Climatización Industrial (HVAC)
                        </h3>
                        <p className="text-xs text-[#45464d] mt-1 leading-relaxed">
                          Sistemas VRF, Chillers, ductería certificada ASHRAE, ventilación mecánica y cuartos limpios.
                        </p>
                        <span className="mt-3 inline-flex items-center gap-1 text-xs text-[#a73a00] font-bold">
                          Seleccionar tipología <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                        </span>
                      </label>

                      {/* Option 4 */}
                      <label 
                        className={`cursor-pointer group relative flex flex-col p-5 rounded-xl transition-all border ${
                          formData.projectType === 'Mantenimiento Industrial'
                            ? 'bg-[#eff4ff] border-[#fd651e] shadow-md ring-2 ring-[#fd651e]/30'
                            : 'bg-[#f8f9ff] border-[#e2e8f0] hover:bg-[#eff4ff]'
                        }`}
                      >
                        <input
                          type="radio"
                          name="project_type"
                          value="Mantenimiento Industrial"
                          checked={formData.projectType === 'Mantenimiento Industrial'}
                          onChange={() => setFormData({ ...formData, projectType: 'Mantenimiento Industrial' })}
                          className="sr-only"
                        />
                        <div className="flex items-start justify-between mb-3">
                          <span className="material-symbols-outlined text-[36px] text-[#fd651e] transition-transform duration-300 group-hover:scale-110">
                            engineering
                          </span>
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                            formData.projectType === 'Mantenimiento Industrial' ? 'bg-[#fd651e] text-white' : 'bg-[#d3e4fe]'
                          }`}>
                            <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-[#0b1c30] group-hover:text-[#a73a00] font-['Montserrat']">
                          Mantenimiento Preventivo / Correctivo
                        </h3>
                        <p className="text-xs text-[#45464d] mt-1 leading-relaxed">
                          Planes contratados para plantas operativas, impermeabilización especializada y paradas programadas.
                        </p>
                        <span className="mt-3 inline-flex items-center gap-1 text-xs text-[#a73a00] font-bold">
                          Seleccionar tipología <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                        </span>
                      </label>

                    </div>
                  </div>
                )}

                {/* STEP 2: Ubicación & Área */}
                {currentStep === 2 && (
                  <div className="flex flex-col gap-6">
                    <p className="text-sm sm:text-base text-[#45464d]">
                      Indique la localización geográfica y dimensiones estimadas del inmueble o lote:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="citySelect" className="text-xs font-bold text-[#0b1c30]">
                          Ubicación del Proyecto *
                        </label>
                        <select
                          id="citySelect"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="h-11 px-3.5 rounded-lg bg-[#eff4ff] text-[#0b1c30] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#fd651e] border border-[#d3e4fe]"
                        >
                          <option value="Barranquilla (Sede Central / AMB)">Barranquilla y Área Metropolitana</option>
                          <option value="Cartagena (Mamonal / Bolívar)">Cartagena / Zona Franca Mamonal</option>
                          <option value="Santa Marta (Magdalena)">Santa Marta y Alrededores</option>
                          <option value="Valledupar / La Guajira">Valledupar / La Guajira</option>
                          <option value="Otro Municipio">Otra Ubicación Regional</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label htmlFor="sectorInput" className="text-xs font-bold text-[#0b1c30]">
                          Parque Industrial, Barrio o Sector
                        </label>
                        <input
                          id="sectorInput"
                          type="text"
                          placeholder="Ej: Vía 40, Parque Industrial del Norte"
                          value={formData.sector}
                          onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                          className="h-11 px-3.5 rounded-lg bg-[#eff4ff] text-[#0b1c30] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#fd651e] border border-[#d3e4fe]"
                        />
                      </div>
                    </div>

                    {/* Area Slider */}
                    <div className="bg-[#eff4ff] p-5 rounded-xl flex flex-col gap-3 border border-[#d3e4fe]">
                      <div className="flex justify-between items-center">
                        <label htmlFor="areaRange" className="text-sm font-bold text-[#0b1c30]">
                          Área Estimada de Intervención
                        </label>
                        <div className="flex items-baseline gap-1 bg-white px-3 py-1 rounded-lg shadow-sm border border-[#d3e4fe]">
                          <span className="text-xl font-bold text-[#a73a00] font-['Montserrat']">
                            {formData.area.toLocaleString('es-CO')}
                          </span>
                          <span className="text-xs font-bold text-[#76777d]">m²</span>
                        </div>
                      </div>

                      <input
                        id="areaRange"
                        type="range"
                        min="50"
                        max="10000"
                        step="50"
                        value={formData.area}
                        onChange={(e) => setFormData({ ...formData, area: Number(e.target.value) })}
                        className="w-full accent-[#fd651e] cursor-pointer h-2 bg-[#d3e4fe] rounded-lg"
                      />

                      <div className="flex justify-between text-xs text-[#76777d] font-medium">
                        <span>50 m² (Comercial)</span>
                        <span>2,500 m² (Industrial)</span>
                        <span>10,000+ m² (Macroproyecto)</span>
                      </div>
                    </div>

                    {/* Budget Select */}
                    <div className="flex flex-col gap-1">
                      <label htmlFor="budgetEstimate" className="text-xs font-bold text-[#0b1c30]">
                        Rango Presupuestal Previsto (COP)
                      </label>
                      <select
                        id="budgetEstimate"
                        value={formData.budgetRange}
                        onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                        className="h-11 px-3.5 rounded-lg bg-[#eff4ff] text-[#0b1c30] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#fd651e] border border-[#d3e4fe]"
                      >
                        <option value="$50.000.000 - $150.000.000 COP">$50.000.000 - $150.000.000 COP</option>
                        <option value="$150.000.000 - $500.000.000 COP">$150.000.000 - $500.000.000 COP</option>
                        <option value="$500.000.000 - $1.500.000.000 COP">$500.000.000 - $1.500.000.000 COP</option>
                        <option value="> $1.500.000.000 COP (Licitaciones de Gran Escala)">&gt; $1.500.000.000 COP (Licitaciones de Gran Escala)</option>
                        <option value="Por Definir en Visita">A determinar mediante presupuesto técnico en visita</option>
                      </select>
                    </div>

                  </div>
                )}

                {/* STEP 3: Especialidades Adicionales */}
                {currentStep === 3 && (
                  <div className="flex flex-col gap-6">
                    <p className="text-sm sm:text-base text-[#45464d]">
                      Integre especialidades técnicas adicionales a su proyecto para entrega Llave en Mano:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Checkbox 1 */}
                      <label 
                        onClick={() => toggleAdditionalService('Modelado BIM')}
                        className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all border ${
                          formData.additionalServices.includes('Modelado BIM')
                            ? 'bg-[#eff4ff] border-[#fd651e]'
                            : 'bg-[#f8f9ff] border-[#e2e8f0] hover:bg-[#eff4ff]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.additionalServices.includes('Modelado BIM')}
                          readOnly
                          className="mt-1 w-5 h-5 accent-[#fd651e] rounded"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-[#0b1c30] flex items-center gap-1.5 font-['Montserrat']">
                            <span className="material-symbols-outlined text-[#fd651e] text-[20px]">view_in_ar</span>
                            Modelado BIM 4D/5D
                          </span>
                          <span className="text-xs text-[#76777d] mt-1">
                            Coordinación de interferencias mecánicas y simulación constructiva previa a obra.
                          </span>
                        </div>
                      </label>

                      {/* Checkbox 2 */}
                      <label 
                        onClick={() => toggleAdditionalService('Licencias y Curaduría')}
                        className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all border ${
                          formData.additionalServices.includes('Licencias y Curaduría')
                            ? 'bg-[#eff4ff] border-[#fd651e]'
                            : 'bg-[#f8f9ff] border-[#e2e8f0] hover:bg-[#eff4ff]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.additionalServices.includes('Licencias y Curaduría')}
                          readOnly
                          className="mt-1 w-5 h-5 accent-[#fd651e] rounded"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-[#0b1c30] flex items-center gap-1.5 font-['Montserrat']">
                            <span className="material-symbols-outlined text-[#fd651e] text-[20px]">assignment_turned_in</span>
                            Licencias & Trámites
                          </span>
                          <span className="text-xs text-[#76777d] mt-1">
                            Gestión directa ante Curadurías Urbanas, POT municipal y permisos ambientales.
                          </span>
                        </div>
                      </label>

                      {/* Checkbox 3 */}
                      <label 
                        onClick={() => toggleAdditionalService('Red Eléctrica RETIE')}
                        className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all border ${
                          formData.additionalServices.includes('Red Eléctrica RETIE')
                            ? 'bg-[#eff4ff] border-[#fd651e]'
                            : 'bg-[#f8f9ff] border-[#e2e8f0] hover:bg-[#eff4ff]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.additionalServices.includes('Red Eléctrica RETIE')}
                          readOnly
                          className="mt-1 w-5 h-5 accent-[#fd651e] rounded"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-[#0b1c30] flex items-center gap-1.5 font-['Montserrat']">
                            <span className="material-symbols-outlined text-[#fd651e] text-[20px]">bolt</span>
                            Red Eléctrica RETIE
                          </span>
                          <span className="text-xs text-[#76777d] mt-1">
                            Tableros de potencia, transformadores, UPS industriales y dictamen de inspección.
                          </span>
                        </div>
                      </label>

                      {/* Checkbox 4 */}
                      <label 
                        onClick={() => toggleAdditionalService('Climatización Central')}
                        className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all border ${
                          formData.additionalServices.includes('Climatización Central')
                            ? 'bg-[#eff4ff] border-[#fd651e]'
                            : 'bg-[#f8f9ff] border-[#e2e8f0] hover:bg-[#eff4ff]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.additionalServices.includes('Climatización Central')}
                          readOnly
                          className="mt-1 w-5 h-5 accent-[#fd651e] rounded"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-[#0b1c30] flex items-center gap-1.5 font-['Montserrat']">
                            <span className="material-symbols-outlined text-[#fd651e] text-[20px]">ac_unit</span>
                            Climatización Centralizada
                          </span>
                          <span className="text-xs text-[#76777d] mt-1">
                            Cálculo de cargas térmicas, balance hídrico y distribución eficiente de flujo de aire.
                          </span>
                        </div>
                      </label>

                    </div>

                    <div className="bg-[#eff4ff] p-4 rounded-xl flex items-center gap-3 border border-[#d3e4fe]">
                      <span className="material-symbols-outlined text-[#fd651e] text-[28px] shrink-0">tune</span>
                      <p className="text-xs sm:text-sm text-[#0b1c30]">
                        <strong>¿Requiere suministro estructural?</strong> Evaluamos vigas de acero estructural ASTM A36 y cubiertas UPVC termoacústicas en la visita inicial.
                      </p>
                    </div>
                  </div>
                )}

                {/* STEP 4: Contacto y Agendamiento */}
                {currentStep === 4 && (
                  <div className="flex flex-col gap-6">
                    <div className="bg-[#ffdbce] p-4 rounded-xl flex items-center gap-3 text-[#370e00] border border-[#ffb599]">
                      <span className="material-symbols-outlined text-[32px] text-[#a73a00] shrink-0">calendar_month</span>
                      <div>
                        <h4 className="text-sm font-bold font-['Montserrat']">Agendamiento Directo de Visita Técnica</h4>
                        <p className="text-xs mt-0.5">Un ingeniero senior evaluará el predio y recopilará levantamientos planimétricos sin costo.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="clientName" className="text-xs font-bold text-[#0b1c30]">
                          Nombre y Apellido *
                        </label>
                        <input
                          id="clientName"
                          type="text"
                          required
                          placeholder="Ej: Ing. Mauricio Restrepo"
                          value={formData.clientName}
                          onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                          className="h-11 px-3.5 rounded-lg bg-[#eff4ff] text-[#0b1c30] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#fd651e] border border-[#d3e4fe]"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label htmlFor="clientCompany" className="text-xs font-bold text-[#0b1c30]">
                          Empresa / Organización *
                        </label>
                        <input
                          id="clientCompany"
                          type="text"
                          required
                          placeholder="Ej: Inversiones & Logística SAS"
                          value={formData.clientCompany}
                          onChange={(e) => setFormData({ ...formData, clientCompany: e.target.value })}
                          className="h-11 px-3.5 rounded-lg bg-[#eff4ff] text-[#0b1c30] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#fd651e] border border-[#d3e4fe]"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label htmlFor="clientPhone" className="text-xs font-bold text-[#0b1c30]">
                          Teléfono / WhatsApp Directo *
                        </label>
                        <input
                          id="clientPhone"
                          type="tel"
                          required
                          placeholder="+57 300 000 0000"
                          value={formData.clientPhone}
                          onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                          className="h-11 px-3.5 rounded-lg bg-[#eff4ff] text-[#0b1c30] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#fd651e] border border-[#d3e4fe]"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label htmlFor="clientEmail" className="text-xs font-bold text-[#0b1c30]">
                          Correo Electrónico Corporativo *
                        </label>
                        <input
                          id="clientEmail"
                          type="email"
                          required
                          placeholder="m.restrepo@empresa.com"
                          value={formData.clientEmail}
                          onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                          className="h-11 px-3.5 rounded-lg bg-[#eff4ff] text-[#0b1c30] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#fd651e] border border-[#d3e4fe]"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="projectNotes" className="text-xs font-bold text-[#0b1c30]">
                        Observaciones Técnicas o Fecha Tentativa para Visita
                      </label>
                      <textarea
                        id="projectNotes"
                        rows={3}
                        placeholder="Indique disponibilidad horaria, requerimientos de dotación SST o características particulares del predio..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="p-3.5 rounded-lg bg-[#eff4ff] text-[#0b1c30] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#fd651e] border border-[#d3e4fe]"
                      />
                    </div>

                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.dataConsent}
                        onChange={(e) => setFormData({ ...formData, dataConsent: e.target.checked })}
                        className="w-4 h-4 accent-[#fd651e] rounded"
                      />
                      <span className="text-xs text-[#76777d]">
                        Autorizo el tratamiento de mis datos de conformidad con la Política de Privacidad de XKALA S.A.S.
                      </span>
                    </label>
                  </div>
                )}

                {/* Navigation Action Buttons */}
                <div className="flex items-center justify-between gap-3 pt-6 border-t border-[#e2e8f0] mt-6">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className={`inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg bg-[#eff4ff] text-[#0b1c30] font-bold text-xs sm:text-sm hover:bg-[#dce9ff] transition-colors cursor-pointer min-h-[44px] min-w-[100px] ${
                      currentStep === 1 ? 'invisible' : 'visible'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    <span>Anterior</span>
                  </button>

                  {currentStep < totalSteps ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 rounded-lg bg-[#fd651e] text-white font-bold text-xs sm:text-sm hover:bg-[#a73a00] shadow-md transition-all cursor-pointer min-h-[44px] min-w-[120px]"
                    >
                      <span>Siguiente</span>
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3 rounded-lg bg-[#fd651e] text-white font-bold text-xs sm:text-sm hover:bg-[#a73a00] shadow-xl transition-all cursor-pointer min-h-[44px]"
                    >
                      <span className="material-symbols-outlined text-[20px]">send</span>
                      <span>Enviar Solicitud y Agendar</span>
                    </button>
                  )}
                </div>

              </div>
            ) : (
              /* Confirmation Screen */
              <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-xl flex flex-col items-center text-center gap-4 border border-[#e2e8f0] animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-[#fd651e]/20 text-[#fd651e] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[42px]">check_circle</span>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0b1c30] font-['Montserrat']">
                  ¡Solicitud de Cotización Radicada!
                </h3>
                
                <p className="text-sm sm:text-base text-[#45464d] max-w-xl leading-relaxed">
                  Se ha generado el expediente técnico de prefactibilidad preliminar para <strong>{formData.projectType}</strong> ({formData.area} m²). Un ingeniero consultor de XKALA S.A.S le contactará en menos de 24 horas hábiles para coordinar la inspección diagnóstica en sitio.
                </p>

                <div className="p-4 bg-[#eff4ff] rounded-xl w-full max-w-md text-left flex flex-col gap-1.5 border border-[#d3e4fe]">
                  <span className="text-xs text-[#a73a00] font-bold uppercase tracking-wider">
                    Ticket Comercial: {ticketId}
                  </span>
                  <span className="text-xs text-[#0b1c30]">
                    Cliente: <strong>{formData.clientName} ({formData.clientCompany})</strong>
                  </span>
                  <span className="text-xs text-[#0b1c30]">
                    Estado: <strong>Asignación de Inspector Técnico</strong>
                  </span>
                  <span className="text-xs text-[#0b1c30]">
                    Atención central: <strong>{COMPANY_INFO.phone}</strong>
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-2.5 bg-[#000000] text-white font-bold text-xs rounded-lg hover:bg-[#213145] transition-colors cursor-pointer"
                  >
                    Generar Otra Consulta Técnica
                  </button>
                  <button
                    type="button"
                    onClick={onOpenBrochure}
                    className="px-6 py-2.5 bg-[#eff4ff] text-[#0b1c30] font-bold text-xs rounded-lg hover:bg-[#dce9ff] transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#fd651e]">download</span>
                    Descargar RUP & Dossier
                  </button>
                </div>
              </div>
            )}

            {/* Quality & Normative Guarantee Badges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white shadow-sm flex flex-col gap-1 border border-[#e2e8f0]">
                <span className="material-symbols-outlined text-[#fd651e] text-[24px]">balance</span>
                <h4 className="text-sm font-bold text-[#0b1c30] font-['Montserrat']">Normativa NSR-10</h4>
                <p className="text-xs text-[#76777d]">Diseños estructurales y cálculos sismorresistentes avalados por ingenieros colegiados.</p>
              </div>

              <div className="p-4 rounded-xl bg-white shadow-sm flex flex-col gap-1 border border-[#e2e8f0]">
                <span className="material-symbols-outlined text-[#fd651e] text-[24px]">security</span>
                <h4 className="text-sm font-bold text-[#0b1c30] font-['Montserrat']">Compliance SST Integral</h4>
                <p className="text-xs text-[#76777d]">Cero incidentes incapacitantes con sistema de gestión bajo estándar ISO 45001.</p>
              </div>

              <div className="p-4 rounded-xl bg-white shadow-sm flex flex-col gap-1 border border-[#e2e8f0]">
                <span className="material-symbols-outlined text-[#fd651e] text-[24px]">speed</span>
                <h4 className="text-sm font-bold text-[#0b1c30] font-['Montserrat']">Cronograma Blindado</h4>
                <p className="text-xs text-[#76777d]">Seguimiento por curva S y penalizaciones contractualmente pactadas a nuestro cargo.</p>
              </div>
            </div>

          </div>

          {/* Right Column: Corporate Guarantees, Testimonials, Headquarters */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Dark Brand Guarantees Card */}
            <div className="bg-[#131b2e] text-white p-6 sm:p-7 rounded-2xl shadow-xl flex flex-col gap-5 relative overflow-hidden border border-[#213145]">
              <div className="absolute right-0 top-0 w-32 h-32 bg-[#fd651e]/10 rounded-full blur-2xl pointer-events-none" />
              
              <div>
                <div className="flex items-center gap-1 text-[#fd651e] mb-1">
                  <span className="material-symbols-outlined text-[20px]">shield_with_heart</span>
                  <span className="text-xs uppercase tracking-wider font-bold">Respaldo XKALA S.A.S</span>
                </div>
                <h3 className="text-xl font-bold text-white font-['Montserrat']">
                  Garantías Contractuales B2B
                </h3>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[#fd651e] text-[18px]">request_quote</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-['Montserrat']">Presupuesto Cerrado</h4>
                    <p className="text-xs text-[#7c839b] mt-0.5">
                      Garantía de cero sobrecostos por imprevistos ocultos en obras bajo modalidad Llave en Mano.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[#fd651e] text-[18px]">verified_user</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-['Montserrat']">Pólizas de Cumplimiento</h4>
                    <p className="text-xs text-[#7c839b] mt-0.5">
                      Amparos de estabilidad de obra por 5 años, calidad de equipos y salarios con aseguradoras clase A.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[#fd651e] text-[18px]">handyman</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-['Montserrat']">Garantía de Climatización</h4>
                    <p className="text-xs text-[#7c839b] mt-0.5">
                      Certificación técnica de caudal, hermeticidad de ductos y 1 año de mantenimiento preventivo incluido.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 p-4 rounded-xl flex flex-col gap-2 border border-white/10">
                <span className="text-xs uppercase tracking-wider text-[#fd651e] font-bold">
                  Atención Inmediata
                </span>
                <p className="text-xs text-[#7c839b]">
                  ¿Desea estructurar pliegos de licitación o requiere atención para una emergencia de infraestructura?
                </p>
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=Hola,%20deseo%20asesoría%20comercial%20inmediata%20para%20un%20proyecto%20con%20XKALA%20SAS`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center justify-center gap-2 w-full bg-[#fd651e] hover:bg-[#a73a00] text-white text-xs font-bold py-2.5 rounded-lg transition-colors shadow-md"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>Hablar con Asesor en WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Testimonials Card */}
            <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col gap-4 border border-[#e2e8f0]">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-[#0b1c30] font-['Montserrat']">
                  Testimonios B2B
                </h4>
                <div className="flex gap-0.5 text-[#fd651e]">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[16px]">star</span>
                  ))}
                </div>
              </div>

              {/* Testimonial 1 */}
              <div className="bg-[#eff4ff] p-4 rounded-xl flex flex-col gap-2 border border-[#d3e4fe]">
                <p className="text-xs text-[#0b1c30] italic leading-relaxed">
                  "XKALA ejecutó el montaje de climatización de nuestra bodega logística de 2,800 m² en Zona Franca Barranquilla. Cumplieron cronograma al día y con certificación RETIE impecable."
                </p>
                <div className="flex items-center gap-2.5 pt-1">
                  <div className="w-8 h-8 rounded-full bg-[#131b2e] text-white flex items-center justify-center font-bold text-xs">
                    CR
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#0b1c30]">Carlos R. Mendoza</span>
                    <span className="text-[11px] text-[#76777d]">Director de Operaciones • Caribe Logística</span>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-[#eff4ff] p-4 rounded-xl flex flex-col gap-2 border border-[#d3e4fe]">
                <p className="text-xs text-[#0b1c30] italic leading-relaxed">
                  "La metodología de presupuesto cerrado nos dio total tranquilidad. Cero cobros adicionales al término de la adecuación civil de nuestras oficinas en Cartagena."
                </p>
                <div className="flex items-center gap-2.5 pt-1">
                  <div className="w-8 h-8 rounded-full bg-[#131b2e] text-white flex items-center justify-center font-bold text-xs">
                    AG
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#0b1c30]">Dra. Andrea Gutiérrez</span>
                    <span className="text-[11px] text-[#76777d]">Gerencia Inmobiliaria • Grupo Nexus</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Headquarters Card */}
            <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col gap-3 border border-[#e2e8f0]">
              <h4 className="text-base font-bold text-[#0b1c30] font-['Montserrat']">
                Sede Central y Operaciones
              </h4>
              
              <div className="w-full h-36 rounded-xl bg-[#eff4ff] flex items-center justify-center relative overflow-hidden border border-[#d3e4fe]">
                <div className="absolute inset-0 bg-[#131b2e]/10 flex items-center justify-center">
                  <div className="bg-white/95 backdrop-blur-sm px-3.5 py-2 rounded-lg shadow flex items-center gap-2 border border-[#e2e8f0]">
                    <span className="material-symbols-outlined text-[#fd651e]">apartment</span>
                    <span className="text-xs font-bold text-[#0b1c30]">Barranquilla, Atlántico</span>
                  </div>
                </div>
              </div>

              <div className="pt-1 flex flex-col gap-1.5 text-[#45464d] text-xs">
                <p className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#fd651e]">call</span>
                  <span>{COMPANY_INFO.phone}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#fd651e]">mail</span>
                  <span>{COMPANY_INFO.email}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#fd651e]">schedule</span>
                  <span>{COMPANY_INFO.schedule}</span>
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Corporate Institutional Callout Banner */}
      <section className="w-full bg-[#eff4ff] py-12 border-t border-[#d3e4fe]">
        <div className="max-w-[1320px] mx-auto px-5 md:px-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-[#e2e8f0]">
            <div className="max-w-2xl">
              <span className="text-xs text-[#a73a00] uppercase font-bold tracking-wider">
                Gestión Corporativa
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0b1c30] mt-1 font-['Montserrat']">
                ¿Representa a una entidad pública o constructora licitante?
              </h3>
              <p className="text-xs sm:text-sm text-[#45464d] mt-1">
                Descargue de inmediato nuestro portafolio técnico institucional con RUP, K residual de contratación, certificaciones de calidad y balance contable auditado.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={onOpenBrochure}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#000000] hover:bg-[#213145] text-white font-bold text-xs transition-colors cursor-pointer shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                <span>Descargar Brochure & RUP</span>
              </button>

              <a
                href={`tel:${COMPANY_INFO.phoneCall}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#eff4ff] text-[#0b1c30] font-bold text-xs hover:bg-[#dce9ff] transition-colors"
              >
                <span className="material-symbols-outlined text-[18px] text-[#fd651e]">phone</span>
                <span>Línea Licitaciones</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
