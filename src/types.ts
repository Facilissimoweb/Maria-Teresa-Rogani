export type ActiveTab = 'home' | 'chi-sono' | 'servizi' | 'contatti' | 'normativa' | 'blog';

export interface CMSPackage {
  id: string;
  title: string;
  price: string;
  description: string;
  features: string[];
  bestFor: string;
}

export interface CustomService {
  id: string;
  title: string;
  price: string;
  description: string;
  features: string[];
  bestFor: string;
}

export interface OperationalPhase {
  phase: number;
  title: string;
  description: string;
  deliverable: string;
}

export interface LeadForm {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: 'cms' | 'custom' | 'non-sicuro';
  inquiryType: 'call-gratuita' | 'sessione-codifica';
  message: string;
  budgetRange: string;
  preferredTime: string;
  marketSector?: string;
  consent: boolean;
}
