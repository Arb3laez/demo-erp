import React, { useState } from 'react';
import { TYPOLOGIES, PORTFOLIO_PROJECTS, COMPANY_INFO } from '../data/mockData';
import { ActiveView, PortfolioProject, ProjectTypology } from '../types';

interface PortalComercialProps {
  onNavigateToWizard: (initialData?: {
    projectType?: string;
    area?: number;
    budgetRange?: string;
  }) => void;
  onOpenProjectModal: (project: PortfolioProject) => void;
  onOpenBrochure: () => void;
}

export const PortalComercial: React.FC<PortalComercialProps> = ({
  onNavigateToWizard,
  onOpenProjectModal,
  onOpenBrochure,
}) => {
  // Quoter state
  const [selectedTypologyId, setSelectedTypologyId] = useState<ProjectTypology>('industrial');
  const [area, setArea] = useState<number>(1200);

  // Portfolio filter state
  const [activeFilter, setActiveFilter] = useState<'all' | 'industrial' | 'comercial' | 'corporativo'>('all');

  // Contact form state
  const [contactSubmitted, setContactSubmitted] = useState<boolean>(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    service: 'civil',
    description: '',
  });

  // Calculation helpers
  const currentTypology = TYPOLOGIES.find((t) => t.id === selectedTypologyId) || TYPOLOGIES[0];
  const totalCostRaw = area * currentTypology.ratePerM2;
  const totalMillions = totalCostRaw / 1_000_000;

  const formatPriceCOP = (millions: number) => {
    if (millions >= 1000) {
      return `$${(millions / 1000).toFixed(2).replace('.', ',')}MM`;
    }
    return `$${Math.round(millions)}M`;
  };

  const costArch = totalMillions * currentTypology.multArch;
  const costStruct = totalMillions * currentTypology.multStruct;
  const costExec = totalMillions * currentTypology.multExec;
  const costHvac = totalMillions * currentTypology.multHvac;

  // Filtered portfolio
  const filteredProjects = PORTFOLIO_PROJECTS.filter(
    (p) => activeFilter === 'all' || p.category === activeFilter
  );

  const handleFormalizeFromQuoter = () => {
    let budgetEstimate = '$500.000.000 - $1.500.000.000 COP';
    if (totalCostRaw < 150_000_000) budgetEstimate = '$50.000.000 - $150.000.000 COP';
    else if (totalCostRaw < 500_000_000) budgetEstimate = '$150.000.000 - $500.000.000 COP';
    else if (totalCostRaw > 1_500_000_000) budgetEstimate = '> $1.500.000.000 COP (Licitaciones de Gran Escala)';

    onNavigateToWizard({
      projectType: currentTypology.name,
      area: area,
      budgetRange: budgetEstimate,
    });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phone || !contactForm.email) return;
    setContactSubmitted(true);
  };

  return (
    <div className="flex flex-col w-full">
      {/* 1. HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-[#131b2e] text-white">
        <div className="absolute inset-0 z-0 opacity-25 mix-blend-luminosity pointer-events-none">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${COMPANY_INFO.heroBgUrl}')` }}
          />
        </div>
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#fd651e]/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-[#93ccff]/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-[1320px] mx-auto px-5 md:px-12 py-12 lg:py-24 flex flex-col justify-between">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 flex flex-col gap-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#fd651e]/20 text-[#ffdbce] rounded font-bold text-[11px] uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#fd651e] animate-pulse" />
                  Proyectamos • Diseñamos • Construimos
                </span>
                <span className="text-[#7c839b] text-[11px] uppercase tracking-widest hidden sm:inline font-bold">
                  | Barranquilla & Región Caribe
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white leading-tight font-extrabold max-w-4xl tracking-tight font-['Montserrat']">
                Transformamos visiones en <span className="text-[#fd651e]">megaestructuras</span> y soluciones llave en mano.
              </h1>

              <p className="text-base sm:text-lg text-[#7c839b] max-w-2xl leading-relaxed font-['Plus_Jakarta_Sans']">
                Líderes en diseño arquitectónico, obras civiles de alta envergadura, climatización industrial especializada y gerencia técnica de obra sin desviaciones presupuestarias.
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#000000] text-white text-xs font-semibold rounded shadow-sm">
                  <span className="material-symbols-outlined text-[16px] text-[#fd651e]">verified</span>
                  +150 Proyectos Entregados
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#000000] text-white text-xs font-semibold rounded shadow-sm">
                  <span className="material-symbols-outlined text-[16px] text-[#fd651e]">schedule</span>
                  Cumplimiento 100% en Cronograma
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#000000] text-white text-xs font-semibold rounded shadow-sm">
                  <span className="material-symbols-outlined text-[16px] text-[#fd651e]">layers</span>
                  Certificación NSR-10 & BIM Level 2
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
                <button
                  onClick={() => onNavigateToWizard()}
                  className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-[#fd651e] hover:bg-[#a73a00] text-white text-sm rounded shadow-xl font-bold tracking-wide transition-all cursor-pointer"
                >
                  <span>Cotizar mi Proyecto Ahora</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
                <a
                  href="#galeria-obras"
                  className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-[#213145] hover:bg-[#000000] text-white text-sm rounded shadow-sm transition-all cursor-pointer font-semibold"
                >
                  <span className="material-symbols-outlined text-[20px] text-[#fd651e]">business_center</span>
                  <span>Ver Portafolio de Obras</span>
                </a>
              </div>
            </div>

            {/* Right Metrics Panel */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-xl border border-white/10">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs uppercase tracking-wider text-[#fd651e] font-bold">
                    Métricas de Desempeño
                  </span>
                  <span className="material-symbols-outlined text-[#fd651e] text-[20px]">analytics</span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4">
                  <div className="bg-[#131b2e]/90 p-3.5 rounded-lg border border-[#76777d]/20">
                    <p className="text-2xl sm:text-3xl text-white font-extrabold font-['Montserrat'] leading-none">
                      285K+
                    </p>
                    <p className="text-xs text-[#7c839b] mt-1.5">m² de obra civil construidos</p>
                  </div>

                  <div className="bg-[#131b2e]/90 p-3.5 rounded-lg border border-[#76777d]/20">
                    <p className="text-2xl sm:text-3xl text-[#fd651e] font-extrabold font-['Montserrat'] leading-none">
                      38%
                    </p>
                    <p className="text-xs text-[#7c839b] mt-1.5">Eficiencia energética HVAC</p>
                  </div>

                  <div className="bg-[#131b2e]/90 p-3.5 rounded-lg border border-[#76777d]/20">
                    <p className="text-2xl sm:text-3xl text-white font-extrabold font-['Montserrat'] leading-none">
                      85+
                    </p>
                    <p className="text-xs text-[#7c839b] mt-1.5">Clientes B2B Corporativos</p>
                  </div>

                  <div className="bg-[#131b2e]/90 p-3.5 rounded-lg border border-[#76777d]/20">
                    <p className="text-2xl sm:text-3xl text-[#fd651e] font-extrabold font-['Montserrat'] leading-none">
                      0%
                    </p>
                    <p className="text-xs text-[#7c839b] mt-1.5">Desviación en costo acordado</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 flex items-center gap-2 text-[#7c839b] text-xs border-t border-white/10">
                  <span className="material-symbols-outlined text-[#fd651e] text-[18px] shrink-0">verified_user</span>
                  <span>Garantía contractualmente indexada en pólizas de cumplimiento y estabilidad.</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. QUICK ESTIMATOR & QUOTER */}
      <section className="w-full bg-[#eff4ff] py-14" id="cotizador-interactivo">
        <div className="max-w-[1320px] mx-auto px-5 md:px-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#a73a00] font-bold">
                Herramienta B2B en Tiempo Real
              </span>
              <h2 className="text-2xl sm:text-3xl text-[#0b1c30] font-extrabold mt-1 font-['Montserrat']">
                Calculadora de Estimación Técnica y Fases
              </h2>
              <p className="text-sm sm:text-base text-[#45464d] max-w-2xl mt-1">
                Configure la tipología de proyecto y dimensione la escala aproximada para obtener una proyección técnica inmediata con metodología XKALA llave en mano.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm text-[#0b1c30] self-start md:self-auto border border-[#e5eeff]">
              <span className="material-symbols-outlined text-[#fd651e]">bolt</span>
              <span className="text-xs sm:text-sm font-semibold">Respuesta de Ingeniería &lt; 24h</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-[#e2e8f0]">
            
            {/* Configuration Side */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <label className="block text-base sm:text-lg font-bold text-[#0b1c30] mb-3 font-['Montserrat']">
                  1. Seleccione la Tipología de Proyecto
                </label>
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
                  {TYPOLOGIES.map((t) => {
                    const isSelected = t.id === selectedTypologyId;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setSelectedTypologyId(t.id)}
                        className={`text-left p-3.5 rounded-xl transition-all flex flex-col gap-1 cursor-pointer border ${
                          isSelected
                            ? 'bg-[#000000] text-white border-[#000000] shadow-md'
                            : 'bg-[#f8f9ff] text-[#0b1c30] hover:bg-[#e5eeff] border-[#e2e8f0]'
                        }`}
                      >
                        <span className={`material-symbols-outlined text-[24px] ${isSelected ? 'text-[#fd651e]' : 'text-[#a73a00]'}`}>
                          {t.icon}
                        </span>
                        <span className="text-xs sm:text-sm font-bold leading-tight font-['Montserrat']">
                          {t.name}
                        </span>
                        <span className="text-[11px] opacity-75 line-clamp-1">
                          {t.subtitle}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Area Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="area-slider" className="text-base sm:text-lg font-bold text-[#0b1c30] font-['Montserrat']">
                    2. Área Estimada de Intervención
                  </label>
                  <div className="flex items-center gap-1 bg-[#eff4ff] px-3 py-1 rounded-lg border border-[#d3e4fe]">
                    <span className="text-xl font-bold text-[#a73a00] font-['Montserrat']">
                      {area.toLocaleString('es-CO')}
                    </span>
                    <span className="text-xs font-bold text-[#45464d]">m²</span>
                  </div>
                </div>

                <input
                  id="area-slider"
                  type="range"
                  min="150"
                  max="10000"
                  step="50"
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full h-2 bg-[#d3e4fe] rounded-lg appearance-none cursor-pointer accent-[#fd651e]"
                />

                <div className="flex justify-between text-[#76777d] text-xs mt-1.5 font-medium">
                  <span>150 m²</span>
                  <span>2,500 m²</span>
                  <span>5,000 m²</span>
                  <span>10,000+ m²</span>
                </div>
              </div>

              {/* Note */}
              <div className="bg-[#eff4ff] p-4 rounded-xl flex items-center gap-3 border border-[#d3e4fe]">
                <span className="material-symbols-outlined text-[#fd651e] text-[28px] shrink-0">tune</span>
                <div className="text-[#0b1c30] text-xs leading-relaxed">
                  <p className="font-bold">Modelado con Metodología BIM 4D/5D</p>
                  <p className="text-[#45464d]">
                    Los valores reflejan costos paramétricos estandarizados para Colombia (Región Caribe y vínculos portuarios) e integran gestión técnica integral.
                  </p>
                </div>
              </div>
            </div>

            {/* Dynamic Results Side */}
            <div className="lg:col-span-5 bg-[#131b2e] text-white p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#213145]">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#213145]">
                  <span className="text-xs uppercase tracking-widest text-[#7c839b] font-bold">
                    Desglose Paramétrico Estimado
                  </span>
                  <span className="px-2 py-0.5 bg-[#fd651e] text-white rounded text-xs font-bold">
                    COP Est.
                  </span>
                </div>

                <div className="my-5">
                  <p className="text-xs text-[#7c839b]">Inversión Estimada Llave en Mano:</p>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl sm:text-4xl text-white font-extrabold tracking-tight font-['Montserrat']">
                      {formatPriceCOP(totalMillions)}
                    </span>
                    <span className="text-sm text-[#fd651e] font-bold">COP*</span>
                  </div>
                  <p className="text-[11px] text-[#7c839b] mt-1">
                    *Cálculo preliminar de referencia sin contingencias especiales de suelo.
                  </p>
                </div>

                {/* Breakdown Bars */}
                <div className="space-y-3 pt-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1 text-[#7c839b]">
                      <span>Diseño Arquitectónico & BIM</span>
                      <span className="text-white font-bold">{formatPriceCOP(costArch)}</span>
                    </div>
                    <div className="w-full bg-[#000000] h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#93ccff] h-full rounded-full transition-all duration-300"
                        style={{ width: `${Math.round(currentTypology.multArch * 100)}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1 text-[#7c839b]">
                      <span>Ingeniería Estructural & Suelos NSR-10</span>
                      <span className="text-white font-bold">{formatPriceCOP(costStruct)}</span>
                    </div>
                    <div className="w-full bg-[#000000] h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#d3e4fe] h-full rounded-full transition-all duration-300"
                        style={{ width: `${Math.round(currentTypology.multStruct * 100)}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1 text-[#7c839b]">
                      <span>Ejecución Obra Civil & Acabados</span>
                      <span className="text-white font-bold">{formatPriceCOP(costExec)}</span>
                    </div>
                    <div className="w-full bg-[#000000] h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#fd651e] h-full rounded-full transition-all duration-300"
                        style={{ width: `${Math.round(currentTypology.multExec * 100)}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1 text-[#7c839b]">
                      <span>Climatización HVAC & Redes Técnicas</span>
                      <span className="text-white font-bold">{formatPriceCOP(costHvac)}</span>
                    </div>
                    <div className="w-full bg-[#000000] h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#188ace] h-full rounded-full transition-all duration-300"
                        style={{ width: `${Math.round(currentTypology.multHvac * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#213145]">
                <button
                  type="button"
                  onClick={handleFormalizeFromQuoter}
                  className="w-full h-12 inline-flex items-center justify-center gap-2 bg-[#fd651e] hover:bg-[#a73a00] text-white text-sm rounded shadow-md font-bold tracking-wide transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">request_quote</span>
                  <span>Formalizar Propuesta Oficial con Ingeniero</span>
                </button>
                <p className="text-center text-[11px] text-[#7c839b] mt-2 flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-[#fd651e]">shield</span>
                  Sin compromiso comercial. Estudio de prefactibilidad inicial.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. SERVICIOS / ECOSISTEMA INTEGRAL */}
      <section className="w-full py-16 bg-[#f8f9ff]" id="servicios">
        <div className="max-w-[1320px] mx-auto px-5 md:px-12">
          <div className="max-w-3xl mb-10">
            <span className="text-xs uppercase tracking-widest text-[#a73a00] font-bold">
              Ecosistema Integral XKALA
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#0b1c30] font-extrabold mt-1 font-['Montserrat']">
              Capacidad Técnica de Extremo a Extremo
            </h2>
            <p className="text-base text-[#45464d] mt-2 leading-relaxed">
              Eliminamos la fragmentación operativa centralizando la ingeniería de diseño, las obras estructurales pesadas y la climatización crítica bajo una única dirección técnica de máxima precisión.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Service 1 */}
            <div className="group bg-white p-6 sm:p-7 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-[#e2e8f0]">
              <div>
                <div className="w-14 h-14 rounded-xl bg-[#eff4ff] flex items-center justify-center mb-4 group-hover:bg-[#000000] group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[#fd651e] text-[32px]">foundation</span>
                </div>
                <span className="text-xs text-[#a73a00] font-bold uppercase tracking-wider">
                  División Civil & Estructuras
                </span>
                <h3 className="text-xl font-bold text-[#0b1c30] font-['Montserrat'] mt-1 mb-2">
                  Ingeniería & Construcción Pesada
                </h3>
                <p className="text-sm text-[#45464d] mb-4 leading-relaxed">
                  Desarrollo integral de obras civiles, pavimentación industrial, cimentaciones profundas, estructuras de concreto reforzado y montaje de naves en acero estructural de grandes luces.
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-[#0b1c30] mb-6 font-medium">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#a73a00] text-[18px]">check_circle</span>
                    Bodegas logísticas y centros de distribución
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#a73a00] text-[18px]">check_circle</span>
                    Edificaciones institucionales y hospitalarias
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#a73a00] text-[18px]">check_circle</span>
                    Control estricto de calidad de materiales (ensayos in-situ)
                  </li>
                </ul>
              </div>

              <a
                href="#contacto-comercial"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#a73a00] hover:text-[#0b1c30] pt-2 transition-colors"
              >
                <span>Consultar requerimientos civiles</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            </div>

            {/* Service 2 */}
            <div className="group bg-white p-6 sm:p-7 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-[#e2e8f0]">
              <div>
                <div className="w-14 h-14 rounded-xl bg-[#eff4ff] flex items-center justify-center mb-4 group-hover:bg-[#000000] group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[#fd651e] text-[32px]">architecture</span>
                </div>
                <span className="text-xs text-[#a73a00] font-bold uppercase tracking-wider">
                  División Arquitectura & Modelado
                </span>
                <h3 className="text-xl font-bold text-[#0b1c30] font-['Montserrat'] mt-1 mb-2">
                  Diseño Arquitectónico & BIM
                </h3>
                <p className="text-sm text-[#45464d] mb-4 leading-relaxed">
                  Coordinación multidisciplinaria mediante tecnología BIM (Building Information Modeling). Detección temprana de colisiones MEP, modelado 3D fotorrealista y optimización bioclimática.
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-[#0b1c30] mb-6 font-medium">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#a73a00] text-[18px]">check_circle</span>
                    Cálculo estructural sismorresistente NSR-10
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#a73a00] text-[18px]">check_circle</span>
                    Coordinación de ingenierías hidrosanitarias y eléctricas
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#a73a00] text-[18px]">check_circle</span>
                    Planos listos para curaduría y licencias de obra
                  </li>
                </ul>
              </div>

              <a
                href="#contacto-comercial"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#a73a00] hover:text-[#0b1c30] pt-2 transition-colors"
              >
                <span>Iniciar diseño o coordinación BIM</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            </div>

            {/* Service 3 */}
            <div className="group bg-white p-6 sm:p-7 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-[#e2e8f0]">
              <div>
                <div className="w-14 h-14 rounded-xl bg-[#eff4ff] flex items-center justify-center mb-4 group-hover:bg-[#000000] group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[#fd651e] text-[32px]">mode_fan</span>
                </div>
                <span className="text-xs text-[#a73a00] font-bold uppercase tracking-wider">
                  División Técnica Especializada
                </span>
                <h3 className="text-xl font-bold text-[#0b1c30] font-['Montserrat'] mt-1 mb-2">
                  Climatización HVAC & Mantenimiento
                </h3>
                <p className="text-sm text-[#45464d] mb-4 leading-relaxed">
                  Soluciones termomecánicas de última generación adaptadas al rigor climático del Caribe: chillers industriales, sistemas VRF de flujo refrigerante variable y aire de precisión para cuartos limpios.
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-[#0b1c30] mb-6 font-medium">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#a73a00] text-[18px]">check_circle</span>
                    Ductería aislada térmicamente según norma SMACNA
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#a73a00] text-[18px]">check_circle</span>
                    Contratos integrales de mantenimiento preventivo SLA 24/7
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#a73a00] text-[18px]">check_circle</span>
                    Subestaciones eléctricas de media tensión RETIE
                  </li>
                </ul>
              </div>

              <a
                href="#contacto-comercial"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#a73a00] hover:text-[#0b1c30] pt-2 transition-colors"
              >
                <span>Diagnóstico de Climatización</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 4. PORTAFOLIO DE OBRAS */}
      <section className="w-full py-16 bg-[#eff4ff]" id="galeria-obras">
        <div className="max-w-[1320px] mx-auto px-5 md:px-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#a73a00] font-bold">
                Casos de Éxito Reales
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#0b1c30] font-extrabold mt-1 font-['Montserrat']">
                Proyectos Entregados con Excelencia
              </h2>
              <p className="text-sm sm:text-base text-[#45464d] max-w-2xl mt-1">
                Explore las obras de infraestructura, adecuaciones corporativas y sistemas técnicos entregados a tiempo en los principales nodos industriales y comerciales de la región.
              </p>
            </div>

            {/* Category Filters */}
            <div className="flex items-center overflow-x-auto no-scrollbar gap-1.5 bg-[#d3e4fe]/50 p-1.5 rounded-xl border border-[#d3e4fe] max-w-full">
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap min-h-[38px] flex items-center shrink-0 ${
                  activeFilter === 'all'
                    ? 'bg-[#000000] text-white shadow-sm'
                    : 'text-[#45464d] hover:text-[#0b1c30]'
                }`}
              >
                Todos
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('industrial')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap min-h-[38px] flex items-center shrink-0 ${
                  activeFilter === 'industrial'
                    ? 'bg-[#000000] text-white shadow-sm'
                    : 'text-[#45464d] hover:text-[#0b1c30]'
                }`}
              >
                Industrial
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('comercial')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap min-h-[38px] flex items-center shrink-0 ${
                  activeFilter === 'comercial'
                    ? 'bg-[#000000] text-white shadow-sm'
                    : 'text-[#45464d] hover:text-[#0b1c30]'
                }`}
              >
                Comercial
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('corporativo')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap min-h-[38px] flex items-center shrink-0 ${
                  activeFilter === 'corporativo'
                    ? 'bg-[#000000] text-white shadow-sm'
                    : 'text-[#45464d] hover:text-[#0b1c30]'
                }`}
              >
                Corporativo / Salud
              </button>
            </div>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div 
                key={project.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md group hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-[#e2e8f0]"
              >
                <div>
                  <div className="relative w-full h-64 overflow-hidden bg-[#131b2e]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#000000]/85 backdrop-blur-sm text-white px-2.5 py-1 rounded text-[11px] uppercase font-bold tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#fd651e]" />
                      {project.scopeTag}
                    </div>
                  </div>

                  <div className="p-5 flex flex-col">
                    <div className="flex items-center justify-between text-[#76777d] text-xs mb-1">
                      <span>{project.location}</span>
                      <span className="font-bold text-[#a73a00]">{project.area}</span>
                    </div>

                    <h3 className="text-lg font-bold text-[#0b1c30] mb-2 font-['Montserrat'] leading-snug group-hover:text-[#a73a00] transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#45464d] leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between text-xs border-t border-[#f1f5f9] mt-3">
                  <span className="text-[#76777d]">Ejecución: <strong>{project.executionTime}</strong></span>
                  <button
                    type="button"
                    onClick={() => onOpenProjectModal(project)}
                    className="text-[#a73a00] font-bold flex items-center gap-1 hover:text-[#fd651e] transition-colors cursor-pointer"
                  >
                    <span>Ficha Técnica</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. POR QUÉ ELEGIR XKALA (DIFFERENTIATORS & KPIS) */}
      <section className="w-full py-16 bg-[#f8f9ff]" id="por-que-elegir">
        <div className="max-w-[1320px] mx-auto px-5 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#a73a00] font-bold">
                  Respaldo Corporativo & Técnico
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#0b1c30] font-extrabold mt-1 font-['Montserrat'] leading-tight">
                  Por qué los directores de proyectos confían en XKALA S.A.S
                </h2>
                <p className="text-base text-[#45464d] mt-2 leading-relaxed">
                  En la industria constructiva colombiana, el 70% de las obras sufren demoras o sobrecostos imprevistos. Nosotros transformamos la incertidumbre en garantía técnica ejecutable.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#fd651e]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[#a73a00] text-[24px]">balance</span>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#0b1c30] font-['Montserrat']">Ingeniería de Valor Real</h4>
                    <p className="text-xs sm:text-sm text-[#45464d] mt-0.5">
                      Auditamos especificaciones técnicas para optimizar costos de materiales sin sacrificar factor de seguridad estructural ni durabilidad.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#fd651e]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[#a73a00] text-[24px]">verified</span>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#0b1c30] font-['Montserrat']">Presupuesto Blindado Sin Sorpresas</h4>
                    <p className="text-xs sm:text-sm text-[#45464d] mt-0.5">
                      Contratos de precio global fijo basados en cantidades de obra cubicadas en modelos BIM detallados.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#fd651e]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[#a73a00] text-[24px]">group_work</span>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#0b1c30] font-['Montserrat']">Equipo Multidisciplinario In-House</h4>
                    <p className="text-xs sm:text-sm text-[#45464d] mt-0.5">
                      Ingenieros civiles residentes, calculistas sísmicos, especialistas HVAC y arquitectos coordinadores dedicados exclusivamente a su faena.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="lg:col-span-7 bg-[#eff4ff] p-6 sm:p-8 rounded-3xl border border-[#d3e4fe]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#e2e8f0]">
                  <span className="material-symbols-outlined text-[#a73a00] text-[32px] mb-2">speed</span>
                  <p className="text-3xl sm:text-4xl text-[#0b1c30] font-extrabold font-['Montserrat']">99.2%</p>
                  <h5 className="text-sm font-bold text-[#0b1c30] mt-1 font-['Montserrat']">Efectividad de Entrega</h5>
                  <p className="text-xs text-[#45464d] mt-1">Hitos de obra cumplidos conforme a la carta Gantt contractual avalada por interventoría.</p>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#e2e8f0]">
                  <span className="material-symbols-outlined text-[#a73a00] text-[32px] mb-2">security</span>
                  <p className="text-3xl sm:text-4xl text-[#a73a00] font-extrabold font-['Montserrat']">0</p>
                  <h5 className="text-sm font-bold text-[#0b1c30] mt-1 font-['Montserrat']">Incidentes Críticos SST</h5>
                  <p className="text-xs text-[#45464d] mt-1">Protocolos de seguridad en trabajo en alturas, izaje de cargas y soldadura estructural certificada.</p>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#e2e8f0]">
                  <span className="material-symbols-outlined text-[#a73a00] text-[32px] mb-2">architecture</span>
                  <p className="text-3xl sm:text-4xl text-[#0b1c30] font-extrabold font-['Montserrat']">100%</p>
                  <h5 className="text-sm font-bold text-[#0b1c30] mt-1 font-['Montserrat']">Compatibilidad BIM</h5>
                  <p className="text-xs text-[#45464d] mt-1">Archivos nativos IFC, Revit y Navisworks para auditoría abierta de todas las redes.</p>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#e2e8f0]">
                  <span className="material-symbols-outlined text-[#a73a00] text-[32px] mb-2">handshake</span>
                  <p className="text-3xl sm:text-4xl text-[#a73a00] font-extrabold font-['Montserrat']">+12 Años</p>
                  <h5 className="text-sm font-bold text-[#0b1c30] mt-1 font-['Montserrat']">Trayectoria de Equipo</h5>
                  <p className="text-xs text-[#45464d] mt-1">Experiencia acumulada en megaobras de infraestructura costera y comercial en el Caribe.</p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. BANNER CONTACTO DIRECTO & FORMULARIO COMERCIAL */}
      <section className="w-full py-16 bg-[#131b2e] text-white relative overflow-hidden" id="contacto-comercial">
        <div className="max-w-[1320px] mx-auto px-5 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Direct Information */}
            <div className="lg:col-span-6 flex flex-col gap-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#fd651e]/20 text-[#ffdbce] rounded text-xs font-bold uppercase tracking-wider w-fit">
                <span className="w-2 h-2 rounded-full bg-[#fd651e] animate-ping" />
                Canal Preferente B2B & Licitaciones
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white font-extrabold tracking-tight font-['Montserrat']">
                ¿Tiene un proyecto en curso o una licitación por adjudicar?
              </h2>

              <p className="text-sm sm:text-base text-[#7c839b] leading-relaxed">
                Hable directamente con la gerencia técnica de XKALA S.A.S. Revisamos sus planos preliminares, preparamos un análisis de viabilidad y entregamos una cotización de ingeniería sin costo.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=Hola%20XKALA,%20requiero%20una%20asesoría%20técnica%20para%20un%20proyecto`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 h-13 px-6 bg-[#fd651e] hover:bg-[#a73a00] text-white font-bold text-sm rounded shadow-xl transition-all"
                >
                  <span className="material-symbols-outlined text-[22px]">chat</span>
                  <span>Chatear vía WhatsApp Inmediato</span>
                </a>
                <a
                  href={`tel:${COMPANY_INFO.phoneCall}`}
                  className="inline-flex items-center justify-center gap-2 h-13 px-6 bg-[#213145] hover:bg-[#000000] text-white font-bold text-sm rounded transition-all"
                >
                  <span className="material-symbols-outlined text-[22px] text-[#fd651e]">call</span>
                  <span>Llamar a Gerencia</span>
                </a>
              </div>

              <div className="pt-4 flex flex-col gap-2 text-xs text-[#7c839b] border-t border-[#213145]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#fd651e] text-[18px]">location_on</span>
                  <span>Sede Central: Barranquilla, Atlántico • Cobertura en toda la Costa Norte</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#fd651e] text-[18px]">mail</span>
                  <span>Recepción de pliegos y RFPs: {COMPANY_INFO.email}</span>
                </div>
              </div>
            </div>

            {/* Quick Conversion Form */}
            <div className="lg:col-span-6 bg-white text-[#0b1c30] p-6 sm:p-8 rounded-3xl shadow-2xl border border-[#e2e8f0]">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-[#0b1c30] font-['Montserrat']">
                  Solicitud de Asesoría Técnica & Cotización
                </h3>
                <p className="text-xs sm:text-sm text-[#45464d] mt-1">
                  Diligencie los datos básicos. Un ingeniero comercial se contactará en menos de 24 horas.
                </p>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#45464d] mb-1">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Carlos Mendoza"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full h-11 px-3 bg-[#eff4ff] rounded border-0 text-sm text-[#0b1c30] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#fd651e]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#45464d] mb-1">
                      Empresa / Entidad
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Constructora del Norte S.A."
                      value={contactForm.company}
                      onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                      className="w-full h-11 px-3 bg-[#eff4ff] rounded border-0 text-sm text-[#0b1c30] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#fd651e]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#45464d] mb-1">
                      Teléfono / Móvil *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+57 300 000 0000"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="w-full h-11 px-3 bg-[#eff4ff] rounded border-0 text-sm text-[#0b1c30] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#fd651e]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#45464d] mb-1">
                      Correo Electrónico Corporativo *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="carlos@empresa.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full h-11 px-3 bg-[#eff4ff] rounded border-0 text-sm text-[#0b1c30] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#fd651e]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#45464d] mb-1">
                    Área de Interés Principal *
                  </label>
                  <select
                    value={contactForm.service}
                    onChange={(e) => setContactForm({ ...contactForm, service: e.target.value })}
                    className="w-full h-11 px-3 bg-[#eff4ff] rounded border-0 text-sm text-[#0b1c30] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#fd651e]"
                  >
                    <option value="civil">Obras Civiles & Estructuras Pesadas</option>
                    <option value="bim">Diseño Arquitectónico & Coordinación BIM</option>
                    <option value="hvac">Sistemas de Climatización HVAC Industrial</option>
                    <option value="mantenimiento">Mantenimiento Técnico Integral</option>
                    <option value="llave-en-mano">Proyecto Completo Llave en Mano</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#45464d] mb-1">
                    Breve Descripción o Alcance Estimado
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Indique ubicación aproximada, m² de obra, requerimientos especiales o fechas límite de licitación..."
                    value={contactForm.description}
                    onChange={(e) => setContactForm({ ...contactForm, description: e.target.value })}
                    className="w-full p-3 bg-[#eff4ff] rounded border-0 text-sm text-[#0b1c30] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#fd651e]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-12 bg-[#fd651e] hover:bg-[#a73a00] text-white font-bold text-sm rounded shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">send</span>
                  <span>Enviar Solicitud de Cotización Prioritaria</span>
                </button>
              </form>

              {contactSubmitted && (
                <div className="mt-3 p-3 bg-[#eff4ff] border border-[#93ccff] rounded-xl flex items-center gap-2 text-[#004b73] text-xs animate-in fade-in">
                  <span className="material-symbols-outlined text-[#fd651e] text-[20px]">check_circle</span>
                  <span>¡Solicitud registrada con éxito! Ticket XK-2025-0894. Un ingeniero se contactará hoy mismo.</span>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
