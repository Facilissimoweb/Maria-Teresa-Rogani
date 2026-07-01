import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Phone, Clock, FileText, CheckCircle2, ShieldCheck, Mail, AlertCircle, Sparkles, Send, MapPin, Loader2, FileSpreadsheet } from 'lucide-react';
import { LeadForm } from '../types';
import LegalModal, { LegalDocType } from './LegalModal';
import { getAccessToken, appendLeadToSpreadsheet } from '../lib/firebase';

const getProjectTypeName = (type: string) => {
  switch (type) {
    case 'cms-professional': return 'CMS Professional (WordPress/Webflow)';
    case 'cms-ecommerce': return 'E-Commerce CMS Ready (Shopify/WooCommerce)';
    case 'custom-spa': return 'Sviluppo Custom React / SPA';
    case 'custom-enterprise': return 'Soluzione Enterprise Integrata';
    case 'custom-ai': return 'Integrazione AI Studiate ad Hoc';
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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionWarning, setSubmissionWarning] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  // Legal Modal states
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState<LegalDocType>('privacy');

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Also scroll to top on submission state change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [submitted]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors: string[] = [];

    if (!formData.name.trim()) validationErrors.push('Il campo Nome è obbligatorio.');
    if (!formData.email.trim()) validationErrors.push('Il campo Email è obbligatorio.');
    if (!formData.phone.trim()) validationErrors.push('Il campo Telefono è obbligatorio.');
    if (!formData.consent) validationErrors.push('È necessario acconsentire al trattamento dei dati personali.');

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      const errorEl = document.getElementById('error-box');
      errorEl?.scrollIntoView({ behavior: 'smooth' });
    } else {
      setErrors([]);
      setIsSubmitting(true);
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        let resData: any = {};
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          resData = await response.json();
        } else {
          const textError = await response.text();
          throw new Error(`Risposta del server non valida (${response.status}): ${textError.substring(0, 120)}...`);
        }

        if (!response.ok) {
          throw new Error(resData.error || 'Si è verificato un errore durante l\'invio della richiesta.');
        }

        // Try syncing with active Google Sheet if selected and authenticated
        const activeSheetId = localStorage.getItem('fw_selected_spreadsheet_id');
        const token = getAccessToken();
        if (activeSheetId && token) {
          try {
            await appendLeadToSpreadsheet(token, activeSheetId, {
              ...formData,
              projectType: getProjectTypeName(formData.projectType)
            });
          } catch (sheetError) {
            console.error('Error appending lead to Google Sheets:', sheetError);
          }
        }

        if (resData.simulated) {
          setSubmissionWarning(resData.message);
        } else {
          setSubmissionWarning(null);
        }

        setSubmitted(true);
      } catch (err: any) {
        setErrors([err.message || 'Si è verificato un errore imprevisto. Si prega di riprovare più tardi o contattarmi direttamente.']);
        setTimeout(() => {
          const errorEl = document.getElementById('error-box');
          errorEl?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <article id="contatti-view" className="bg-[#161619] text-white">
      {/* HERO SECTION */}
      <section id="contatti-hero" className="relative bg-[#111113] text-white overflow-hidden py-16 lg:py-24 border-b border-white/10">
        {/* Background Decorative Polygon Grid */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#4285f4_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Content */}
          <motion.div 
            className="lg:col-span-7 space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="w-12 h-1 bg-[#4285F4] mb-4"></div>
            
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-1 text-[10px] font-bold tracking-[0.2em] uppercase text-[#4285F4] font-mono">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>CONTATTI & CONSULENZA STRATEGICA</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[0.85] font-display uppercase">
              Progettiamo il<br />
              Vostro Successo
            </h1>
            
            <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed max-w-2xl font-light">
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
            <div className="relative bg-black/40 border border-white/10 rounded-none overflow-hidden shadow-2xl">
              {/* Window header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#161619] border-b border-white/10">
                <div className="flex space-x-1.5">
                  <span className="w-2.5 h-2.5 bg-white/20 rounded-full inline-block" />
                  <span className="w-2.5 h-2.5 bg-white/20 rounded-full inline-block" />
                  <span className="w-2.5 h-2.5 bg-white/20 rounded-full inline-block" />
                </div>
                <span className="text-[10px] text-white/40 font-mono tracking-wider">facilissimoweb/contatti</span>
              </div>
              
              {/* Themed Image */}
              <img 
                src="https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?auto=format&fit=crop&w=800&q=80" 
                alt="Start Your Project With Us"
                className="w-full h-48 sm:h-56 md:h-64 lg:h-52 object-cover border-b border-white/10"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="bg-[#161619] border border-white/10 p-6 flex flex-col justify-center rounded-none select-none">
              <div className="mb-4">
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#4285F4] mb-1 font-bold font-mono">Primo Incontro Gratuito</p>
                <p className="text-xl font-bold text-white font-display uppercase tracking-tight">Sessione Strategica di 30 Minuti</p>
              </div>
              <div className="space-y-3 text-xs text-white/70 font-mono">
                <div className="flex justify-between items-end border-b border-white/5 pb-1.5">
                  <span className="text-[9px] uppercase tracking-[0.15em] opacity-50">Durata</span>
                  <span className="font-semibold text-white">30 Minuti in Video Call</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/5 pb-1.5">
                  <span className="text-[9px] uppercase tracking-[0.15em] opacity-50">Focus</span>
                  <span className="font-semibold text-white">Obiettivi & Compliance</span>
                </div>
                <div className="flex justify-between items-end pb-1">
                  <span className="text-[9px] uppercase tracking-[0.15em] opacity-50">Costo</span>
                  <span className="font-semibold text-emerald-400">GRATUITA (100% Off)</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="py-16 bg-[#161619] border-b border-white/10 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {submitted ? (
          /* SUCCESS SCREEN */
          <div id="submission-success-card" className="max-w-3xl mx-auto bg-[#111113] border border-white/10 p-10 shadow-lg text-center space-y-8">
            <div className="w-16 h-16 bg-white/5 rounded-none flex items-center justify-center mx-auto text-[#4285F4] border border-white/10">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-3xl font-bold font-display uppercase tracking-tight text-white">Richiesta Ricevuta!</h2>
              <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-sans font-light">
                Gentile <strong>{formData.name}</strong>, vi ringraziamo per l'interesse dimostrato nei confronti di <strong>FACILISSIMO WEB</strong>.
              </p>
            </div>

            <div className="bg-[#161619] p-6 text-left border border-white/5 space-y-4 max-w-xl mx-auto text-xs sm:text-sm">
              <h3 className="font-bold text-white uppercase text-[10px] tracking-widest border-b border-white/5 pb-2 font-mono">Riepilogo dei Dati Inseriti:</h3>
              <div className="grid grid-cols-2 gap-4 font-sans font-light">
                <div>
                  <span className="text-white/40 block text-[9px] font-bold uppercase tracking-wider font-mono">Tipologia Ingaggio:</span>
                  <span className="text-white font-medium">
                    {formData.inquiryType === 'call-gratuita' ? '📞 Call Preliminare Gratuita (30 min)' : '💻 Sessione di Codifica Strategica (60 min)'}
                  </span>
                </div>
                <div>
                  <span className="text-white/40 block text-[9px] font-bold uppercase tracking-wider font-mono">Ambito Progetto:</span>
                  <span className="text-white font-medium">
                    {getProjectTypeName(formData.projectType)}
                  </span>
                </div>
                <div>
                  <span className="text-white/40 block text-[9px] font-bold uppercase tracking-wider font-mono">Settore di Mercato:</span>
                  <span className="text-white font-medium">{formData.marketSector || 'Non specificato'}</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[9px] font-bold uppercase tracking-wider font-mono">Budget Indicativo:</span>
                  <span className="text-white font-medium">{formData.budgetRange}</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[9px] font-bold uppercase tracking-wider font-mono">Orario Preferito:</span>
                  <span className="text-white font-medium">{formData.preferredTime}</span>
                </div>
              </div>
              <div className="pt-2 border-t border-white/5">
                <span className="text-white/40 block text-[9px] font-bold uppercase tracking-wider font-mono">Messaggio Allegato:</span>
                <p className="text-white/70 italic mt-1 font-mono text-xs">
                  "{formData.message || 'Nessun messaggio allegato.'}"
                </p>
              </div>
            </div>

            <p className="text-xs text-white/50 leading-relaxed max-w-md mx-auto font-sans font-light">
              Analizzerò personalmente i Vostri requisiti ed il Vostro sito web attuale (se esistente) per contattarvi tramite email o telefono entro le prossime 12-24 ore lavorative.
            </p>

            {submissionWarning && (
              <div className="bg-amber-500/5 border border-amber-500/20 p-6 text-left max-w-xl mx-auto text-xs space-y-2 text-slate-300 rounded-none">
                <div className="flex items-center space-x-2 font-bold uppercase tracking-wider text-[10px] text-amber-500 font-mono">
                  <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Nota di Configurazione SMTP (M. Teresa)</span>
                </div>
                <p className="leading-relaxed font-sans font-light">
                  L'invio sul frontend è avvenuto con successo, ma si tratta di una <strong>simulazione sul server</strong> perché non hai ancora inserito le credenziali SMTP nel file <code className="font-mono bg-white/5 text-amber-400 px-1 py-0.5 rounded text-[11px]">.env</code> o nelle variabili di ambiente.
                </p>
                <div className="pt-2">
                  <p className="font-bold text-[10px] uppercase tracking-wider text-white mb-1 font-mono">Come ricevere le email reali su <span className="font-mono text-slate-300">facilissimoweb.mc@gmail.com</span>:</p>
                  <ol className="list-decimal pl-4 space-y-1.5 text-white/60 font-sans font-light">
                    <li>
                      Apri il file <code className="font-mono bg-white/5 text-white px-1 py-0.5 rounded">.env</code> o la sezione dei Secrets di hosting.
                    </li>
                    <li>
                      Aggiungi o compila la variabile <code className="font-mono bg-white/5 text-white px-1 py-0.5 rounded">SMTP_USER="facilissimoweb.mc@gmail.com"</code>.
                    </li>
                    <li>
                      Crea una <strong>Password per le App</strong> sul tuo account Google (Sicurezza account &gt; Verifica in 2 passaggi &gt; Password per le app) e impostala in <code className="font-mono bg-white/5 text-white px-1 py-0.5 rounded">SMTP_PASS="tua_password_app"</code>.
                    </li>
                  </ol>
                </div>
                <p className="text-[10px] text-white/40 italic pt-1 font-mono">Questo messaggio d'aiuto viene mostrato solo quando le chiavi non sono configurate.</p>
              </div>
            )}

            <div className="pt-4">
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-3 bg-[#4285F4] hover:bg-[#4285F4]/90 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-none transition-colors duration-150 font-mono cursor-pointer"
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
              <h2 className="text-xl font-bold text-white uppercase tracking-wider font-display border-b border-white/5 pb-2">Opzioni di Contatto</h2>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-sans font-light">
                Credo che la trasparenza parta dal primo contatto. Per questo motivo vi offro la possibilità di scegliere liberamente tra due modalità distinte per parlarmi del Vostro progetto:
              </p>

              {/* Interaction Selector Cards */}
              <div 
                id="select-call-gratuita"
                onClick={() => handleInquirySelect('call-gratuita')}
                className={`p-6 rounded-none border-t-4 cursor-pointer transition-all duration-200 text-left relative ${
                  formData.inquiryType === 'call-gratuita'
                    ? 'border-[#4285F4] bg-[#111113] shadow-md'
                    : 'border-white/10 bg-black/25 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-5 h-5 text-[#4285F4] shrink-0" />
                    <h3 className="font-bold text-white text-sm uppercase tracking-wider font-display">Call Preliminare Gratuita</h3>
                  </div>
                  <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-none uppercase tracking-wider font-mono">Gratis</span>
                </div>
                <p className="text-xs text-white/60 leading-relaxed font-sans font-light">
                  Un briefing telefonico o video di 30 minuti. Serve a conoscerci, inquadrare l'idea generale della Vostra piattaforma e valutare se la Vostra attività necessita di un CMS o di uno sviluppo Custom.
                </p>
                <ul className="mt-3 space-y-1.5 text-[9px] text-white/40 uppercase tracking-wider font-mono">
                  <li className="flex items-center space-x-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Nessun obbligo di acquisto</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Durata: 30 minuti</span>
                  </li>
                </ul>
              </div>

              <div 
                id="select-sessione-codifica"
                onClick={() => handleInquirySelect('sessione-codifica')}
                className={`p-6 rounded-none border-t-4 cursor-pointer transition-all duration-200 text-left relative ${
                  formData.inquiryType === 'sessione-codifica'
                    ? 'border-[#4285F4] bg-[#111113] shadow-md'
                    : 'border-white/10 bg-black/25 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-[#4285F4] shrink-0" />
                    <h3 className="font-bold text-white text-sm uppercase tracking-wider font-display">Sessione Strategica</h3>
                  </div>
                  <span className="text-[9px] font-bold text-white bg-white/5 border border-white/10 px-2 py-1 rounded-none uppercase tracking-wider font-mono">60 Minuti</span>
                </div>
                <p className="text-xs text-white/60 leading-relaxed font-sans font-light">
                  Una sessione approfondita di 60 minuti. Creiamo insieme un wireframe strategico preliminare, analizziamo l'architettura delle informazioni, definiamo i messaggi chiave e vi fornisco un piano strategico dettagliato per il funnel di conversione.
                </p>
                <ul className="mt-3 space-y-1.5 text-[9px] text-white/40 uppercase tracking-wider font-mono">
                  <li className="flex items-center space-x-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Analisi architetturale approfondita</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Consigliata per e-commerce e portali</span>
                  </li>
                </ul>
              </div>

              {/* Certifications and support badge */}
              <div className="bg-[#111113] text-white p-6 rounded-none border border-white/10 space-y-3">
                <div className="flex items-center space-x-2 text-[#4285F4]">
                  <ShieldCheck className="w-5 h-5 animate-pulse" />
                  <span className="font-bold text-[10px] uppercase tracking-[0.15em] font-mono">Garanzia di Sicurezza</span>
                </div>
                <p className="text-xs text-white/60 leading-relaxed font-sans font-light">
                  Ogni informazione o idea di business condivisa con me è tutelata da segreto professionale assoluto. Tratto i Vostri dati personali unicamente per rispondere alla Vostra richiesta, in piena conformità con il GDPR.
                </p>
              </div>
            </div>

            {/* FORM COLUMN */}
            <div className="lg:col-span-7 bg-[#111113] p-8 rounded-none border border-white/10 shadow-sm">
              <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-6 font-display border-b border-white/5 pb-2">Modulo di Richiesta</h2>

              {errors.length > 0 && (
                <div id="error-box" className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-none mb-6 space-y-1 font-mono">
                  <div className="flex items-center space-x-2 font-bold mb-1 uppercase tracking-wider">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Verificare i seguenti campi obbligatori:</span>
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
                <div className="bg-black/40 p-4 border border-white/5 text-xs flex justify-between items-center select-none font-mono">
                  <div>
                    <span className="text-white/40 block font-bold uppercase tracking-wider text-[9px]">Ingaggio Selezionato:</span>
                    <span className="text-[#4285F4] font-bold text-xs">
                      {formData.inquiryType === 'call-gratuita' ? '📞 Call Preliminare Gratuita (30 Min)' : '💻 Sessione Strategica (60 Min)'}
                    </span>
                  </div>
                  <span className="text-[9px] text-white/50 font-bold uppercase tracking-wider cursor-pointer underline hover:text-white" onClick={() => window.scrollTo({ top: 300, behavior: 'smooth' })}>
                    Modifica
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-[10px] font-bold text-white/80 uppercase tracking-wider font-mono">Il Vostro Nome *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="es. Maria Teresa Rogani"
                      className="w-full px-4 py-3 border border-white/10 rounded-none text-xs sm:text-sm focus:outline-none focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] bg-[#161619] text-white font-sans placeholder-white/30"
                    />
                  </div>

                  {/* Company field */}
                  <div className="space-y-1.5">
                    <label htmlFor="company" className="text-[10px] font-bold text-white/80 uppercase tracking-wider font-mono">Nome Azienda / Ente</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="es. Società Agricola SpA"
                      className="w-full px-4 py-3 border border-white/10 rounded-none text-xs sm:text-sm focus:outline-none focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] bg-[#161619] text-white font-sans placeholder-white/30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-[10px] font-bold text-white/80 uppercase tracking-wider font-mono">Indirizzo Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="es. nome@azienda.it"
                      className="w-full px-4 py-3 border border-white/10 rounded-none text-xs sm:text-sm focus:outline-none focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] bg-[#161619] text-white font-sans placeholder-white/30"
                    />
                  </div>

                  {/* Phone field */}
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="text-[10px] font-bold text-white/80 uppercase tracking-wider font-mono">Recapito Telefonico *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="es. +39 333 1234567"
                      className="w-full px-4 py-3 border border-white/10 rounded-none text-xs sm:text-sm focus:outline-none focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] bg-[#161619] text-white font-sans placeholder-white/30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Settore di Mercato select */}
                  <div className="space-y-1.5">
                    <label htmlFor="marketSector" className="text-[10px] font-bold text-white/80 uppercase tracking-wider font-mono">Settore di Mercato</label>
                    <select
                      id="marketSector"
                      name="marketSector"
                      value={formData.marketSector}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-white/10 rounded-none text-xs sm:text-sm focus:outline-none focus:border-[#4285F4] bg-[#161619] text-white font-sans"
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
                    <label htmlFor="preferredTime" className="text-[10px] font-bold text-white/80 uppercase tracking-wider font-mono">Fascia Oraria di Ricontatto</label>
                    <select
                      id="preferredTime"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-white/10 rounded-none text-xs sm:text-sm focus:outline-none focus:border-[#4285F4] bg-[#161619] text-white font-sans"
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
                    <label htmlFor="projectType" className="text-[10px] font-bold text-white/80 uppercase tracking-wider font-mono">Ambito del Progetto</label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-white/10 rounded-none text-xs sm:text-sm focus:outline-none focus:border-[#4285F4] bg-[#161619] text-white font-sans"
                    >
                      <option value="cms-professional">CMS Professional (WordPress / Webflow)</option>
                      <option value="cms-ecommerce">E-Commerce CMS Ready (Shopify / WooCommerce)</option>
                      <option value="custom-spa">Sviluppo Custom React / SPA (Siti & Web-App Veloci)</option>
                      <option value="custom-enterprise">Soluzione Enterprise Integrata (Full-Stack & DB)</option>
                      <option value="custom-ai">Integrazione AI Studiate ad Hoc (Sistemi AI & Chatbot)</option>
                      <option value="restyling">Restyling & Migrazione Sito Esistente</option>
                      <option value="seo-performance">Ottimizzazione Performance, Sicurezza & SEO</option>
                      <option value="consulenza">Consulenza Strategica & Assistenza Continua</option>
                      <option value="non-sicuro">Non ho ancora deciso (Valutiamo nella Call di 30 Minuti)</option>
                    </select>
                  </div>

                  {/* Budget selector */}
                  <div className="space-y-1.5">
                    <label htmlFor="budgetRange" className="text-[10px] font-bold text-white/80 uppercase tracking-wider font-mono">Budget Previsto Indicativo</label>
                    <select
                      id="budgetRange"
                      name="budgetRange"
                      value={formData.budgetRange}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-white/10 rounded-none text-xs sm:text-sm focus:outline-none focus:border-[#4285F4] bg-[#161619] text-white font-sans"
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
                  <label htmlFor="message" className="text-[10px] font-bold text-white/80 uppercase tracking-wider font-mono">Dettagli sul Progetto o Domande</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Fornitemi una breve descrizione della Vostra attività ed i Vostri obiettivi commerciali principali..."
                    className="w-full px-4 py-3 border border-white/10 rounded-none text-xs sm:text-sm focus:outline-none focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] bg-[#161619] text-white font-sans placeholder-white/30"
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
                    className="w-4 h-4 mt-0.5 rounded-none border-white/20 text-[#4285F4] focus:ring-[#4285F4] bg-[#161619] cursor-pointer"
                  />
                  <label htmlFor="consent" className="text-[11px] text-white/60 leading-relaxed font-sans font-light">
                    Acconsento al trattamento dei dati personali ai sensi della{' '}
                    <button
                      type="button"
                      onClick={() => handleOpenLegal('privacy')}
                      className="text-[#4285F4] underline font-bold cursor-pointer inline bg-transparent border-none p-0"
                    >
                      Privacy Policy
                    </button>{' '}
                    e della{' '}
                    <button
                      type="button"
                      onClick={() => handleOpenLegal('cookie')}
                      className="text-[#4285F4] underline font-bold cursor-pointer inline bg-transparent border-none p-0"
                    >
                      Cookie Policy
                    </button>{' '}
                    e dichiaro di accettare i{' '}
                    <button
                      type="button"
                      onClick={() => handleOpenLegal('terms')}
                      className="text-[#4285F4] underline font-bold cursor-pointer inline bg-transparent border-none p-0"
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
                    disabled={isSubmitting}
                    className={`w-full py-4 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-none transition-all duration-150 shadow-md flex items-center justify-center space-x-2 font-mono ${
                      isSubmitting 
                        ? 'bg-[#4285F4]/50 cursor-not-allowed' 
                        : 'bg-[#4285F4] hover:bg-[#4285F4]/90 cursor-pointer'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 text-white animate-spin" />
                        <span>Invio in corso...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-white" />
                        <span>Invia la Vostra Richiesta</span>
                      </>
                    )}
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
