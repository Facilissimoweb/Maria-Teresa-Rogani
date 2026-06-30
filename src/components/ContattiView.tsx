import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Phone, Clock, FileText, CheckCircle2, ShieldCheck, Mail, AlertCircle, Sparkles, Send, MapPin } from 'lucide-react';
import { LeadForm } from '../types';
import LegalModal, { LegalDocType } from './LegalModal';

const getProjectTypeName = (type: string) => {
  switch (type) {
    case 'cms-professional': return 'CMS Professional (WordPress/Webflow)';
    case 'cms-ecommerce': return 'E-Commerce CMS Ready (Shopify/WooCommerce)';
    case 'custom-spa': return 'Sviluppo Custom React / SPA';
    case 'custom-enterprise': return 'Soluzione Enterprise Integrata';
    case 'restyling': return 'Restyling / Migrazione Sito Esistente';
    case 'seo-performance': return 'Ottimizzazione Performance, Sicurezza & SEO';
    case 'consulenza': return 'Consulenza Strategica & Assistenza Continua';
    case 'non-sicuro': return 'Non sono ancora sicuro (Valutiamo insieme)';
    default: return type;
  }
};

export default function ContattiView() {
  const [formData, setFormData] = useState<LeadForm>({
    name: '',
    company: '',
    email: '',
    phone: '',
    projectType: 'non-sicuro',
    inquiryType: 'call-gratuita',
    message: '',
    budgetRange: '€ 1.500 - € 3.000',
    preferredTime: 'Mattina (09:00 - 13:00)',
    marketSector: 'E-commerce & Retail Online',
    consent: false
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);

  // Legal Modal states
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState<LegalDocType>('privacy');

  const handleOpenLegal = (type: LegalDocType) => {
    setSelectedDocType(type);
    setLegalModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleInquirySelect = (type: 'call-gratuita' | 'sessione-codifica') => {
    setFormData(prev => ({
      ...prev,
      inquiryType: type
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors: string[] = [];

    if (!formData.name.trim()) validationErrors.push('Il campo Nome è obbligatorio.');
    if (!formData.email.trim()) validationErrors.push('Il campo Email è obbligatorio.');
    if (!formData.phone.trim()) validationErrors.push('Il campo Telefono è obbligatorio.');
    if (!formData.consent) validationErrors.push('È necessario acconsentire al trattamento dei dati personali.');

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      // Scroll to error box
      const errorEl = document.getElementById('error-box');
      errorEl?.scrollIntoView({ behavior: 'smooth' });
    } else {
      setErrors([]);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <article id="contatti-view" className="animate-fadeIn transition-colors duration-200">
      {/* HERO SECTION */}
      <section id="contatti-hero" className="relative bg-[#0A192F] text-white overflow-hidden py-20 lg:py-28 border-b border-slate-800">
        {/* Background Decorative Polygon Grid */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#4a90e2_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 hidden lg:block">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 L100 0 L100 100 Z" fill="#4A90E2" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Content */}
          <motion.div 
            className="lg:col-span-7 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="w-12 h-1 bg-[#4A90E2] mb-6"></div>
            
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded text-[10px] font-bold tracking-[0.2em] uppercase text-[#4A90E2]">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>CONTATTI & CONSULENZA STRATEGICA</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-tight italic">
              Iniziamo a Progettare <br />
              <span className="font-bold not-italic text-white">il Vostro Successo Online</span>
            </h1>
            
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-2xl">
              Scegliete la tipologia di ingaggio più adatta alle Vostre esigenze. Sono pronta ad affiancarvi con la massima trasparenza, fin dal primo istante.
            </p>
          </motion.div>
          
          {/* Hero Side Block */}
          <motion.div 
            className="lg:col-span-5 grid grid-cols-1 gap-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 flex flex-col justify-center rounded">
              <div className="mb-4">
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#4A90E2] mb-1 font-bold">Primo Incontro Gratuito</p>
                <p className="text-xl font-serif italic text-white">Sessione Strategica di 30 Minuti</p>
              </div>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex justify-between items-end border-b border-white/10 pb-1.5">
                  <span className="text-[9px] uppercase tracking-[0.15em] opacity-60">Durata</span>
                  <span className="font-semibold text-white">30 Minuti in Video Call</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/10 pb-1.5">
                  <span className="text-[9px] uppercase tracking-[0.15em] opacity-60">Focus</span>
                  <span className="font-semibold text-white">Obiettivi, Target & Compliance</span>
                </div>
                <div className="flex justify-between items-end pb-1">
                  <span className="text-[9px] uppercase tracking-[0.15em] opacity-60">Costo</span>
                  <span className="font-semibold text-emerald-400 font-mono">GRATUITA (100% Off)</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="py-16 bg-[#F8FAFC] dark:bg-[#0a192f] transition-colors duration-200 text-slate-800 dark:text-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {submitted ? (
          /* SUCCESS SCREEN */
          <div id="submission-success-card" className="max-w-3xl mx-auto bg-white border-2 border-[#0A192F] rounded-none p-10 shadow-lg text-center space-y-6">
            <div className="w-16 h-16 bg-slate-50 rounded-none flex items-center justify-center mx-auto text-[#0A192F] border border-slate-200">
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-light italic text-[#0A192F]">Richiesta <span className="font-bold not-italic">Ricevuta con Successo!</span></h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Gentile <strong>{formData.name}</strong>, vi ringraziamo per l'interesse dimostrato nei confronti di <strong>FACILISSIMO WEB</strong>.
              </p>
            </div>

            <div className="bg-[#F8FAFC] rounded-none p-6 text-left border border-slate-200 space-y-4 max-w-xl mx-auto text-xs sm:text-sm">
              <h3 className="font-bold text-[#0A192F] uppercase text-[10px] tracking-widest border-b border-slate-200 pb-2">Riepilogo delle Vostre Opzioni:</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">Tipologia Ingaggio:</span>
                  <span className="text-slate-800 font-bold">
                    {formData.inquiryType === 'call-gratuita' ? '📞 Call Preliminare Gratuita (30 min)' : '💻 Sessione di Codifica Strategica (60 min)'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">Ambito Progetto:</span>
                  <span className="text-slate-800 font-bold">
                    {getProjectTypeName(formData.projectType)}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">Settore di Mercato:</span>
                  <span className="text-slate-800 font-bold">{formData.marketSector || 'Non specificato'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">Budget Indicativo:</span>
                  <span className="text-slate-800 font-bold">{formData.budgetRange}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">Orario Preferito:</span>
                  <span className="text-slate-800 font-bold">{formData.preferredTime}</span>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">Messaggio Allegato:</span>
                <p className="text-slate-600 italic mt-1 font-mono text-xs">
                  "{formData.message || 'Nessun messaggio allegato.'}"
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
              Analizzerò personalmente i Vostri requisiti ed il Vostro sito web attuale (se esistente) per contattarvi tramite email o telefono entro le prossime 12-24 ore lavorative.
            </p>

            <div className="pt-4">
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-3 bg-[#0A192F] hover:bg-[#0A192F]/90 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-none transition-colors duration-150"
              >
                Invia una nuova richiesta
              </button>
            </div>
          </div>
        ) : (
          /* LEAD GENERATION GRID WITH COMPARISON AND FORM */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* ENGAGEMENT TYPES COMPARISON */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-lg font-bold text-[#0A192F] uppercase tracking-wider">Le Mie Fasi di Ingaggio Preliminare</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Credo che la trasparenza parta dal primo contatto. Per questo motivo vi offro la possibilità di scegliere liberamente tra due modalità distinte per parlarmi del Vostro progetto:
              </p>

              {/* Interaction Selector Cards */}
              <div 
                id="select-call-gratuita"
                onClick={() => handleInquirySelect('call-gratuita')}
                className={`p-6 rounded-none border-t-4 cursor-pointer transition-all duration-200 text-left relative ${
                  formData.inquiryType === 'call-gratuita'
                    ? 'border-[#0A192F] bg-white shadow-md'
                    : 'border-slate-200 bg-white/70 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-5 h-5 text-[#0A192F] shrink-0" />
                    <h3 className="font-bold text-[#0A192F] text-sm uppercase tracking-wider">Call Preliminare Gratuita</h3>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1.5 rounded-none uppercase tracking-wider">Gratis</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Un briefing telefonico o video di 30 minuti. Serve a conoscerci, inquadrare l'idea generale della Vostra piattaforma e valutare se la Vostra attività necessita di un CMS o di uno sviluppo Custom.
                </p>
                <ul className="mt-3 space-y-1.5 text-[10px] text-slate-500 uppercase tracking-wider">
                  <li className="flex items-center space-x-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>Nessun obbligo di acquisto</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>Durata: 30 minuti</span>
                  </li>
                </ul>
              </div>

              <div 
                id="select-sessione-codifica"
                onClick={() => handleInquirySelect('sessione-codifica')}
                className={`p-6 rounded-none border-t-4 cursor-pointer transition-all duration-200 text-left relative ${
                  formData.inquiryType === 'sessione-codifica'
                    ? 'border-[#0A192F] bg-white shadow-md'
                    : 'border-slate-200 bg-white/70 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-[#4A90E2] shrink-0" />
                    <h3 className="font-bold text-[#0A192F] text-sm uppercase tracking-wider">Sessione Strategica</h3>
                  </div>
                  <span className="text-[10px] font-bold text-[#0A192F] bg-[#0A192F]/5 px-2.5 py-1.5 rounded-none uppercase tracking-wider">60 Minuti</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Una sessione approfondita di 60 minuti. Creiamo insieme un wireframe strategico preliminare, analizziamo l'architettura delle informazioni, definiamo i messaggi chiave e vi fornisco un piano strategico dettagliato per il funnel di conversione.
                </p>
                <ul className="mt-3 space-y-1.5 text-[10px] text-slate-500 uppercase tracking-wider">
                  <li className="flex items-center space-x-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>Analisi architetturale approfondita</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>Consigliata per e-commerce e portali</span>
                  </li>
                </ul>
              </div>

              {/* Certifications and support badge */}
              <div className="bg-[#0A192F] text-white p-6 rounded-none border border-slate-800 space-y-3">
                <div className="flex items-center space-x-2 text-[#4A90E2]">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="font-bold text-xs uppercase tracking-[0.15em]">Garanzia di Sicurezza</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Ogni informazione o idea di business condivisa con me è tutelata da segreto professionale assoluto. Tratto i Vostri dati personali unicamente per rispondere alla Vostra richiesta, in piena conformità con il GDPR.
                </p>
              </div>
            </div>

            {/* FORM COLUMN */}
            <div className="lg:col-span-7 bg-white p-8 rounded-none border-2 border-[#0A192F] shadow-sm">
              <h2 className="text-lg font-bold text-[#0A192F] uppercase tracking-wider mb-6">Compilate il Modulo di Richiesta</h2>

              {errors.length > 0 && (
                <div id="error-box" className="p-4 bg-red-50 border border-red-150 text-red-700 text-xs rounded-none mb-6 space-y-1">
                  <div className="flex items-center space-x-2 font-bold mb-1 uppercase tracking-wider">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Si prega di verificare i seguenti campi:</span>
                  </div>
                  <ul className="list-disc pl-5 space-y-0.5">
                    {errors.map((error, idx) => (
                      <li key={idx}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              <form id="lead-generation-form" onSubmit={handleSubmit} className="space-y-5">
                {/* Visual indicator of what's selected above */}
                <div className="bg-slate-100 p-4 rounded-none border border-slate-200 text-xs flex justify-between items-center">
                  <div>
                    <span className="text-slate-400 block font-bold uppercase tracking-wider text-[9px]">Ingaggio Selezionato:</span>
                    <span className="text-[#0A192F] font-bold text-xs">
                      {formData.inquiryType === 'call-gratuita' ? '📞 Call Preliminare Gratuita (30 Minuti)' : '💻 Sessione Strategica (60 Minuti)'}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#4A90E2] font-bold uppercase tracking-wider cursor-pointer underline" onClick={() => window.scrollTo({ top: 300, behavior: 'smooth' })}>
                    Modifica
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-[10px] font-bold text-[#0A192F] uppercase tracking-wider">Il Vostro Nome *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="es. Maria Teresa Rogani"
                      className="w-full px-4 py-3 border border-slate-200 rounded-none text-xs sm:text-sm focus:outline-none focus:border-[#0A192F] focus:ring-1 focus:ring-[#0A192F] bg-[#F8FAFC]"
                    />
                  </div>

                  {/* Company field */}
                  <div className="space-y-1.5">
                    <label htmlFor="company" className="text-[10px] font-bold text-[#0A192F] uppercase tracking-wider">Nome Azienda / Ente</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="es. Società Agricola SpA"
                      className="w-full px-4 py-3 border border-slate-200 rounded-none text-xs sm:text-sm focus:outline-none focus:border-[#0A192F] focus:ring-1 focus:ring-[#0A192F] bg-[#F8FAFC]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-[10px] font-bold text-[#0A192F] uppercase tracking-wider">Indirizzo Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="es. nome@azienda.it"
                      className="w-full px-4 py-3 border border-slate-200 rounded-none text-xs sm:text-sm focus:outline-none focus:border-[#0A192F] focus:ring-1 focus:ring-[#0A192F] bg-[#F8FAFC]"
                    />
                  </div>

                  {/* Phone field */}
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="text-[10px] font-bold text-[#0A192F] uppercase tracking-wider">Recapito Telefonico *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="es. +39 333 1234567"
                      className="w-full px-4 py-3 border border-slate-200 rounded-none text-xs sm:text-sm focus:outline-none focus:border-[#0A192F] focus:ring-1 focus:ring-[#0A192F] bg-[#F8FAFC]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Settore di Mercato select (Extended List) */}
                  <div className="space-y-1.5">
                    <label htmlFor="marketSector" className="text-[10px] font-bold text-[#0A192F] uppercase tracking-wider">Settore di Mercato</label>
                    <select
                      id="marketSector"
                      name="marketSector"
                      value={formData.marketSector}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-200 rounded-none text-xs sm:text-sm focus:outline-none focus:border-[#0A192F] bg-[#F8FAFC]"
                    >
                      <option value="E-commerce & Retail Online">E-commerce & Retail Online</option>
                      <option value="Servizi Professionali (Consulenza, Legale, Medico)">Servizi Professionali (Consulenza, Legale, Medico)</option>
                      <option value="Ristorazione e Ospitalità (B&B, Hotel, Ristorante)">Ristorazione e Ospitalità (B&B, Hotel, Ristorante)</option>
                      <option value="Agricoltura, Food & Viticoltura">Agricoltura, Food & Viticoltura</option>
                      <option value="Artigianato & Commercio Locale">Artigianato & Commercio Locale</option>
                      <option value="Edilizia, Immobiliare & Architettura">Edilizia, Immobiliare & Architettura</option>
                      <option value="Startup, Tecnologia & Software">Startup, Tecnologia & Software</option>
                      <option value="Istruzione, Formazione & No-Profit">Istruzione, Formazione & No-Profit</option>
                      <option value="Benessere, Sport & Personal Care">Benessere, Sport & Personal Care</option>
                      <option value="Turismo & Agenzie di Viaggio">Turismo & Agenzie di Viaggio</option>
                      <option value="Arte, Intrattenimento & Spettacolo">Arte, Intrattenimento & Spettacolo</option>
                      <option value="Altro / Non Elencato">Altro / Non Elencato</option>
                    </select>
                  </div>

                  {/* Scheduling dropdown */}
                  <div className="space-y-1.5">
                    <label htmlFor="preferredTime" className="text-[10px] font-bold text-[#0A192F] uppercase tracking-wider">Fascia Oraria di Ricontatto</label>
                    <select
                      id="preferredTime"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-200 rounded-none text-xs sm:text-sm focus:outline-none focus:border-[#0A192F] bg-[#F8FAFC]"
                    >
                      <option value="Mattina (09:00 - 13:00)">Mattina (09:00 - 13:00)</option>
                      <option value="Pomeriggio (14:00 - 18:00)">Pomeriggio (14:00 - 18:00)</option>
                      <option value="Tardo Pomeriggio (18:00 - 19:30)">Tardo Pomeriggio (18:00 - 19:30)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Project Type field */}
                  <div className="space-y-1.5">
                    <label htmlFor="projectType" className="text-[10px] font-bold text-[#0A192F] uppercase tracking-wider">Ambito del Progetto</label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-200 rounded-none text-xs sm:text-sm focus:outline-none focus:border-[#0A192F] bg-[#F8FAFC]"
                    >
                      <option value="cms-professional">CMS Professional (WordPress / Webflow)</option>
                      <option value="cms-ecommerce">E-Commerce CMS Ready (Shopify / WooCommerce)</option>
                      <option value="custom-spa">Sviluppo Custom React / SPA (Siti & Web-App Veloci)</option>
                      <option value="custom-enterprise">Soluzione Enterprise Integrata (Full-Stack & DB)</option>
                      <option value="restyling">Restyling & Migrazione Sito Esistente</option>
                      <option value="seo-performance">Ottimizzazione Performance, Sicurezza & SEO</option>
                      <option value="consulenza">Consulenza Strategica & Assistenza Continua</option>
                      <option value="non-sicuro">Non ho ancora deciso (Valutiamo nella Call di 30 Minuti)</option>
                    </select>
                  </div>

                  {/* Budget selector */}
                  <div className="space-y-1.5">
                    <label htmlFor="budgetRange" className="text-[10px] font-bold text-[#0A192F] uppercase tracking-wider">Budget Previsto Indicativo</label>
                    <select
                      id="budgetRange"
                      name="budgetRange"
                      value={formData.budgetRange}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-200 rounded-none text-xs sm:text-sm focus:outline-none focus:border-[#0A192F] bg-[#F8FAFC]"
                    >
                      <option value="Fino a € 1.500">Fino a € 1.500</option>
                      <option value="€ 1.500 - € 3.000">€ 1.500 - € 3.000</option>
                      <option value="€ 3.000 - € 6.000">€ 3.000 - € 6.000</option>
                      <option value="Oltre € 6.000">Oltre € 6.000</option>
                    </select>
                  </div>
                </div>

                {/* Message field */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-[10px] font-bold text-[#0A192F] uppercase tracking-wider">Dettagli sul Progetto o Domande</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Fornitemi una breve descrizione della Vostra attività ed i Vostri obiettivi commerciali principali..."
                    className="w-full px-4 py-3 border border-slate-200 rounded-none text-xs sm:text-sm focus:outline-none focus:border-[#0A192F] focus:ring-1 focus:ring-[#0A192F]"
                  />
                </div>

                {/* Privacy check */}
                <div className="flex items-start space-x-3 pt-2">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 mt-0.5 rounded-none border-slate-300 text-[#0A192F] focus:ring-[#0A192F] cursor-pointer"
                  />
                  <label htmlFor="consent" className="text-[11px] text-slate-500 leading-relaxed">
                    Acconsento al trattamento dei dati personali ai sensi della{' '}
                    <button
                      type="button"
                      onClick={() => handleOpenLegal('privacy')}
                      className="text-[#4A90E2] underline font-bold cursor-pointer inline bg-transparent border-none p-0"
                    >
                      Privacy Policy
                    </button>{' '}
                    e della{' '}
                    <button
                      type="button"
                      onClick={() => handleOpenLegal('cookie')}
                      className="text-[#4A90E2] underline font-bold cursor-pointer inline bg-transparent border-none p-0"
                    >
                      Cookie Policy
                    </button>{' '}
                    e dichiaro di accettare i{' '}
                    <button
                      type="button"
                      onClick={() => handleOpenLegal('terms')}
                      className="text-[#4A90E2] underline font-bold cursor-pointer inline bg-transparent border-none p-0"
                    >
                      Termini di Servizio
                    </button>
                    . Dichiaro di essere l'unico titolare dei dati inseriti. *
                  </label>
                </div>

                {/* Submit button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    id="form-submit-button"
                    className="w-full py-4 bg-[#4A90E2] hover:bg-[#4A90E2]/90 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-none transition-all duration-150 shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-white" />
                    <span>Invia la Vostra Richiesta</span>
                  </button>
                </div>
              </form>
            </div>

          </div>
        )}

        </div>
      </div>

      {/* Interactive Legal Documents Overlay Modal */}
      <LegalModal 
        isOpen={legalModalOpen} 
        docType={selectedDocType} 
        onClose={() => setLegalModalOpen(false)} 
      />
    </article>
  );
}
