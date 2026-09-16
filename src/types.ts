export type ActiveView = 'portal-comercial' | 'cotizador-wizard';

export type ProjectTypology = 
  | 'industrial'
  | 'comercial'
  | 'residencial'
  | 'hvac'
  | 'mantenimiento'
  | 'institucional';

export interface TypologyConfig {
  id: ProjectTypology;
  name: string;
  subtitle: string;
  icon: string;
  ratePerM2: number; // in COP
  multArch: number;
  multStruct: number;
  multExec: number;
  multHvac: number;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: 'industrial' | 'comercial' | 'corporativo';
  location: string;
  area: string;
  scopeTag: string;
  description: string;
  image: string;
  executionTime: string;
  highlight: string;
  client: string;
  specs: {
    bimLevel: string;
    normative: string;
    hvacCapacity?: string;
    structuralType: string;
  };
}

export interface WizardFormData {
  projectType: string;
  city: string;
  sector: string;
  area: number;
  budgetRange: string;
  additionalServices: string[];
  clientName: string;
  clientCompany: string;
  clientPhone: string;
  clientEmail: string;
  notes: string;
  dataConsent: boolean;
}
