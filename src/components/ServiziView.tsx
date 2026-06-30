import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Settings, Code, ArrowRight, CheckCircle2, ChevronRight, HelpCircle, Eye, Info, CalendarRange, Sparkles } from 'lucide-react';

interface ServiziViewProps {
  setActiveTab: (tab: 'home' | 'chi-sono' | 'servizi' | 'contatti') => void;
}

export default function ServiziView({ setActiveTab }: ServiziViewProps) {
  const [activePhase, setActivePhase] = useState<number>(1);
  const [activeCategory, setActiveCategory] = useState<'cms' | 'custom'>('cms');

  const phaseLabelColors: Record<number, string> = {
    2: '#f8fbff',
    3: '#ffffff',
    4: '#ffffff',
    5: '#fafdff',
    6: '#ffffff',
    7: '#ffffff',
  };

  const cmsPackages = [
    {
      id: 'cms-start',
      title: 'Piattaforma CMS Professional',
      price: 'Da € 1.490',
      description: 'Sviluppo strutturato su base WordPress o Webflow, ideale per professionisti ed imprese che cercano una presenza online autorevole, modificabile autonomamente.',
      features: [
        'Configurazione CMS & Hosting Sicuro',
        'Fino a 7 sezioni ottimizzate per Mobile',
        'Funnel base di acquisizione contatti',
        'Pannello di amministrazione semplificato',
        'Ottimizzazione SEO on-page fondamentale',
        'Integrazione tracciamenti analytics standard',
        'Supporto formativo per l\'aggiornamento contenuti'
      ],
      bestFor: 'Liberi Professionisti, Consulenti, Piccole e Medie Imprese locali'
    },
    {
      id: 'cms-commerce',
      title: 'E-Commerce CMS Ready',
      price: 'Da € 2.890',
      description: 'Soluzione e-commerce performante su Shopify o WooCommerce, programmata per ridurre al minimo i tassi di abbandono del carrello e guidare all\'acquisto.',
      features: [
        'Piattaforma Shopify / WooCommerce personalizzata',
        'Catalogo prodotti ottimizzato',
        'Integrazione gateway di pagamento sicuri (Stripe, PayPal)',
        'Sistemi di recupero carrelli abbandonati via email',
        'Gestione autonoma inventario e ordini',
        'Ottimizzazione SEO e velocità di caricamento',
        'Configurazione flussi promozionali social'
      ],
      bestFor: 'Brand commerciali, Startup e-commerce, Negozi fisici in digitalizzazione'
    }
  ];

  const customPackages = [
    {
      id: 'custom-app',
      title: 'Sviluppo Custom React / SPA',
      price: 'Da € 4.500',
      description: 'Siti web e web-app a singola pagina (SPA) sviluppati interamente a codice tramite React, Vite e Tailwind CSS. Massime performance e zero vincoli.',
      features: [
        'Architettura custom senza l\'ausilio di CMS tradizionali',
        'Performance di caricamento da primato (LCP < 1.0s)',
        'Design esclusivo sviluppato da zero per la Vostra identità',
        'Totale immunità da vulnerabilità note di plugin di terze parti',
        'Integrazione API avanzate e webhook su misura',
        'Ideale per software as a service (SaaS) o cataloghi interattivi',
        'Manutenzione agevolata con codice pulito e testato'
      ],
      bestFor: 'Aziende ad alta tecnologia, Startup innovative, Progetti con necessità funzionali su misura'
    },
    {
      id: 'custom-portal',
      title: 'Soluzione Enterprise Integrata',
      price: 'Su Preventivo',
      description: 'Infrastruttura web complessa comprendente backend personalizzato, database relazionali o non-relazionali, pannelli amministrativi dedicati e sistemi analitici proprietari.',
      features: [
        'Sviluppo stack tecnologico personalizzato (Full-Stack)',
        'Infrastruttura database scalabile e performante',
        'Sistemi di login protetti con autenticazione multifattore',
        'Integrazione profonda con i Vostri sistemi gestionali interni',
        'Dashboard analitiche in tempo reale per monitorare i KPI',
        'Livello di sicurezza enterprise crittografato',
        'Accordi di livello di servizio (SLA) per manutenzione e SLA'
      ],
      bestFor: 'Grandi aziende, Portali associativi, Piattaforme web dinamiche con migliaia di utenti'
    }
  ];

  const operationalPhases = [
    {
      phase: 1,
      title: 'Briefing Strategico & Requisiti',
      shortDesc: 'Studio della Vostra identità di brand e pianificazione iniziale.',
      description: 'Ogni progetto di successo inizia con un\'analisi rigorosa. Durante questa fase definisco i Vostri obiettivi aziendali, identifico i punti di forza rispetto alla concorrenza ed esamino la fattibilità tecnica. Questo mi consente di orientarvi responsabilmente verso la tecnologia più idonea (CMS o Custom), riducendo gli sprechi di budget.',
      deliverable: 'Documento di Analisi dei Requisiti (SDR) e preventivo analitico trasparente.',
      timeline: 'Settimana 1'
    },
    {
      phase: 2,
      title: 'Architettura & Wireframing UX/UI',
      shortDesc: 'Strutturazione dei percorsi di navigazione dei Vostri utenti.',
      description: 'Progetto lo scheletro visivo e strutturale (wireframe) del sito web. Concentro la mia attenzione sui percorsi di conversione degli utenti, assicurando che le informazioni chiave siano visibili senza alcuno sforzo cognitivo. Il design risultante è sobrio, moderno ed elegante, privo di elementi di distrazione.',
      deliverable: 'Prototipo interattivo navigabile delle sezioni chiave del sito web.',
      timeline: 'Settimana 2'
    },
    {
      phase: 3,
      title: 'Ottimizzazione dei Contenuti',
      shortDesc: 'Stesura di testi formali ed efficaci per guidare la conversione.',
      description: 'I testi sono il motore primario della conversione. Revisiono o stendo ex-novo i Vostri contenuti istituzionali adottando rigorosamente il "Voi" formale per dare lustro e professionalità. Strutturo la gerarchia semantica della pagina affinché sia appetibile per i motori di ricerca (SEO) e convincente per i visitatori.',
      deliverable: 'Copybook finale approvato con formattazione semantica H1-H2-H3.',
      timeline: 'Settimana 3'
    },
    {
      phase: 4,
      title: 'Sviluppo Tecnologico Assistito',
      shortDesc: 'Scrittura del codice e sviluppo strategico della piattaforma.',
      description: 'Traduco le idee in codice pulito. Utilizzo modelli di Intelligenza Artificiale per accelerare la fase di scrittura dei blocchi logici primari e per effettuare test continui di correttezza formale. Questo riduce i tempi operativi del 50%, permettendomi di focalizzarmi sulla stabilità dell\'architettura e sui dettagli.',
      deliverable: 'Codice sorgente compilato o installazione CMS in ambiente di staging protetto.',
      timeline: 'Settimane 4-5'
    },
    {
      phase: 5,
      title: 'Integrazione Sistemi Lead Generation',
      shortDesc: 'Attivazione di moduli di prenotazione, CRM e newsletter.',
      description: 'Sulla base delle competenze certificate da Social Lead\'s Manager, collego il Vostro sito web con i Vostri strumenti di gestione quotidiana. Integro moduli di contatto intelligenti, calendari interattivi per prenotazioni di call gratuite, sistemi di iscrizione a newsletter e tracciamenti analitici conformi al GDPR.',
      deliverable: 'Moduli di acquisizione funzionanti e sincronizzati con email/CRM aziendale.',
      timeline: 'Settimana 5'
    },
    {
      phase: 6,
      title: 'Collaudo, Debugging & QA',
      shortDesc: 'Verifica minuziosa di ogni singola funzionalità ed elemento visivo.',
      description: 'Sottopongo la piattaforma a rigorosi test di qualità. Verifico la perfetta visualizzazione su dispositivi mobile, tablet e desktop di diverse risoluzioni. Effettuo test di velocità di caricamento, ottimizzazione del peso delle immagini, analisi dell\'accessibilità (normative WCAG) e controlli di sicurezza fondamentali.',
      deliverable: 'Report di Collaudo Tecnico (Velocità LCP, Sicurezza SSL, Responsiveness).',
      timeline: 'Settimana 6'
    },
    {
      phase: 7,
      title: 'Rilascio, Monitoraggio & Feedback',
      shortDesc: 'Messa online finale e monitoraggio dei primi risultati reali.',
      description: 'Procedo alla pubblicazione finale sul Vostro dominio. Monitoro le prestazioni nei giorni immediatamente successivi per garantire la massima reattività del server. Vi fornisco inoltre una sessione di formazione video registrata affinché possiate gestire in totale autonomia e sicurezza i Vostri contenuti.',
      deliverable: 'Consegna credenziali, video-manuale d\'uso e pubblicazione in produzione.',
      timeline: 'Settimana 6 (Fine del ciclo)'
    }
  ];

  return (
    <article id="servizi-view" className="animate-fadeIn transition-colors duration-200">
      {/* HERO SECTION */}
      <section id="servizi-hero" className="relative bg-[#0A192F] text-white overflow-hidden py-20 lg:py-28 border-b border-slate-800">
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
              <span>LE MIE SOLUZIONI STRATEGICHE</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-tight italic">
              Servizi Professionali <br />
              <span className="font-bold not-italic text-white">su Misura per Voi</span>
            </h1>
            
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-2xl">
              Distinguiamo nettamente tra piattaforme CMS programmabili per la massima versatilità ordinaria e sviluppi custom puri per performance tecnologiche d'élite.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                id="servizi-hero-cta"
                onClick={() => setActiveTab('contatti')}
                className="px-8 py-3.5 bg-[#4A90E2] hover:bg-[#357ABD] text-white text-xs font-bold uppercase tracking-[0.2em] shadow-lg shadow-black/20 transition-all duration-300"
              >
                Iniziate Ora
              </button>
            </div>
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
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#4A90E2] mb-1 font-bold">Standard di Progettazione</p>
                <p className="text-xl font-serif italic text-white">Trasparenza & Alta Affidabilità</p>
              </div>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex justify-between items-end border-b border-white/10 pb-1.5">
                  <span className="text-[9px] uppercase tracking-[0.15em] opacity-60">Piattaforme CMS</span>
                  <span className="font-semibold text-white">WordPress o Webflow</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/10 pb-1.5">
                  <span className="text-[9px] uppercase tracking-[0.15em] opacity-60">Sviluppo Custom</span>
                  <span className="font-semibold text-white">React / SPA & Tailwind</span>
                </div>
                <div className="flex justify-between items-end pb-1">
                  <span className="text-[9px] uppercase tracking-[0.15em] opacity-60">SLA & Supporto</span>
                  <span className="font-semibold text-white text-[#4A90E2]">Incluso & Formativo</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="py-16 bg-[#F8FAFC] dark:bg-[#0a192f] transition-colors duration-200 text-slate-800 dark:text-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* COMPARISON TABS (CMS VS CUSTOM) */}
        <div className="mb-20">
          <div className="flex justify-center mb-8">
            <div className="bg-slate-200 p-1 rounded-none flex space-x-1">
              <button
                id="tab-selector-cms"
                onClick={() => setActiveCategory('cms')}
                className={`px-5 py-3 rounded-none text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center space-x-2 cursor-pointer ${
                  activeCategory === 'cms'
                    ? 'bg-[#0A192F] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-4 h-4 shrink-0" />
                <span>Piattaforme CMS (Sviluppo Guidato)</span>
              </button>
              <button
                id="tab-selector-custom"
                onClick={() => setActiveCategory('custom')}
                className={`px-5 py-3 rounded-none text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center space-x-2 cursor-pointer ${
                  activeCategory === 'custom'
                    ? 'bg-[#0A192F] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Code className="w-4 h-4 shrink-0" />
                <span>Sviluppo Custom (Codice Proprietario)</span>
              </button>
            </div>
          </div>

          {/* SERVICE CARDS */}
          <AnimatePresence mode="wait">
            {activeCategory === 'cms' ? (
              <motion.div 
                key="cms"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                {cmsPackages.map((pkg) => (
                  <div 
                    key={pkg.id} 
                    id={`pkg-${pkg.id}`}
                    className="bg-white p-8 rounded-none border-t-4 border-[#0A192F] border-x border-b border-slate-200/85 flex flex-col justify-between hover:bg-slate-50/50 transition-colors duration-300 relative overflow-hidden shadow-sm"
                  >
                    <div className="space-y-6">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-[#0A192F] uppercase tracking-wider">{pkg.title}</h3>
                        <span className="text-[#0A192F] font-mono font-bold text-sm px-3 py-1.5 bg-[#0A192F]/5 rounded-none border border-[#0A192F]/10">
                          {pkg.price}
                        </span>
                      </div>
                      
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {pkg.description}
                      </p>

                      <div className="border-t border-slate-100 pt-6">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Servizi Inclusi nel Pacchetto</h4>
                        <ul className="space-y-2.5">
                          {pkg.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start space-x-2.5 text-xs text-slate-700">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 mt-8 pt-6">
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">Ideale per:</span> {pkg.bestFor}
                      </p>
                      <button
                        onClick={() => setActiveTab('contatti')}
                        className="w-full mt-4 py-3 bg-[#0A192F] hover:bg-[#0A192F]/90 text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-none transition-colors duration-150 flex items-center justify-center space-x-1"
                      >
                        <span>Selezionate questo pacchetto</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="custom"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                {customPackages.map((pkg) => (
                  <div 
                    key={pkg.id} 
                    id={`pkg-${pkg.id}`}
                    className="bg-white p-8 rounded-none border-t-4 border-[#4A90E2] border-x border-b border-slate-200/85 flex flex-col justify-between hover:bg-slate-50/50 transition-colors duration-300 relative overflow-hidden shadow-sm"
                  >
                    <div className="space-y-6">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-[#0A192F] uppercase tracking-wider">{pkg.title}</h3>
                        <span className="text-[#0A192F] font-mono font-bold text-sm px-3 py-1.5 bg-[#0A192F]/5 rounded-none border border-[#0A192F]/10">
                          {pkg.price}
                        </span>
                      </div>
                      
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {pkg.description}
                      </p>

                      <div className="border-t border-slate-100 pt-6">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Servizi Inclusi nel Pacchetto</h4>
                        <ul className="space-y-2.5">
                          {pkg.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start space-x-2.5 text-xs text-slate-700">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 mt-8 pt-6">
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">Ideale per:</span> {pkg.bestFor}
                      </p>
                      <button
                        onClick={() => setActiveTab('contatti')}
                        className="w-full mt-4 py-3 bg-[#4A90E2] hover:bg-[#4A90E2]/90 text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-none transition-colors duration-150 flex items-center justify-center space-x-1"
                      >
                        <span>Inizializzate lo sviluppo custom</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 7 PHASES OPERATIONAL TIMELINE */}
        <div id="phases-timeline-section" className="text-white rounded-none p-8 sm:p-12 shadow-xl mb-12 border border-slate-800" style={{ backgroundColor: '#4c786f' }}>
          <div className="max-w-3xl mx-auto text-center mb-12 space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: '#0f1012' }}>IL PROTOCOLLO OPERATIVO IN 7 FASI</span>
            <h2 className="text-2xl sm:text-3xl font-light italic">Il Vostro Progetto, <span className="font-bold not-italic text-white">Passo dopo Passo</span></h2>
            <p className="text-xs leading-relaxed" style={{ color: '#ffffff' }}>
              Seguo un protocollo rigoroso per assicurarmi che il Vostro sito sia perfetto. Fate clic su ciascuna fase per visualizzare i dettagli operativi e i risultati previsti.
            </p>
          </div>

          {/* Interactive Steps List */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 border-b border-white/10 pb-6">
            {operationalPhases.map((phase) => (
              <button
                key={phase.phase}
                id={`phase-tab-${phase.phase}`}
                onClick={() => setActivePhase(phase.phase)}
                className={`px-4 py-2.5 rounded-none text-[10px] font-bold uppercase tracking-wider transition-all duration-200 flex items-center space-x-2 cursor-pointer ${
                  activePhase === phase.phase
                    ? 'bg-slate-950 text-white shadow-md'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="w-5 h-5 bg-slate-950 rounded-none inline-flex items-center justify-center text-[9px] font-mono border border-slate-800 shrink-0">
                  {phase.phase}
                </span>
                <span 
                  className="hidden md:inline"
                  style={activePhase !== phase.phase && phaseLabelColors[phase.phase] ? { color: phaseLabelColors[phase.phase] } : undefined}
                >
                  {phase.title}
                </span>
                <span className="md:hidden">Fase {phase.phase}</span>
              </button>
            ))}
          </div>

          {/* Phase Details Box */}
          <div className="bg-[#0b1b36] border border-white/10 rounded-none p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-5">
              <div className="flex items-center space-x-3">
                <span className="text-4xl font-extrabold text-[#4A90E2] font-mono">0{operationalPhases[activePhase - 1].phase}</span>
                <div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">{operationalPhases[activePhase - 1].title}</h3>
                  <p className="text-[10px] text-[#4A90E2] font-bold uppercase tracking-widest">{operationalPhases[activePhase - 1].timeline}</p>
                </div>
              </div>
              
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {operationalPhases[activePhase - 1].description}
              </p>

              <div className="bg-slate-950 p-4 rounded-none border border-slate-800 space-y-2">
                <div className="flex items-center space-x-2 text-[10px] font-bold text-[#4A90E2] uppercase tracking-wider">
                  <Info className="w-4 h-4 shrink-0" />
                  <span>Cosa Riceverete (Deliverable):</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic font-serif">
                  "{operationalPhases[activePhase - 1].deliverable}"
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#0A192F]/50 p-5 rounded-none border border-white/10 space-y-4">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2">Vantaggi di questa fase</h4>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start space-x-2">
                  <span className="text-[#4A90E2] font-bold">✓</span>
                  <span>Consulenza diretta e costante</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#4A90E2] font-bold">✓</span>
                  <span>Verifica rigorosa di ogni requisito</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#4A90E2] font-bold">✓</span>
                  <span>Trasparenza e rispetto delle tempistiche</span>
                </li>
              </ul>
              
              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('contatti')}
                  className="w-full py-2.5 bg-transparent border border-white/30 hover:border-white text-white font-bold text-[10px] uppercase tracking-wider rounded-none transition-colors duration-150 flex items-center justify-center space-x-1"
                >
                  <span>Chiedete informazioni</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* PRAGMATIC ADVISOR HELPER */}
        <div className="bg-white border-2 border-[#0A192F] text-[#0A192F] rounded-none p-8 shadow-md grid grid-cols-1 md:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          <div className="md:col-span-8 space-y-3">
            <span className="text-[10px] font-mono font-bold text-[#4A90E2] uppercase tracking-[0.25em] flex items-center space-x-1">
              <CalendarRange className="w-4 h-4 shrink-0" />
              <span>Consulenza Preliminare Gratuita</span>
            </span>
            <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-[#0A192F]">Non siete sicuri di quale soluzione scegliere per la Vostra attività?</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Metto a Vostra disposizione un incontro informativo gratuito di 15 minuti. Insieme analizzeremo la natura del Vostro business ed esamineremo i costi di gestione futuri, indicandovi con assoluta trasparenza la strada più idonea.
            </p>
          </div>
          <div className="md:col-span-4 flex justify-end">
            <button
              onClick={() => setActiveTab('contatti')}
              className="px-6 py-3 bg-[#0A192F] hover:bg-[#0A192F]/90 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-none transition-colors duration-150 shadow-md flex items-center space-x-2 w-full md:w-auto justify-center"
            >
              <span>Contattatemi Ora</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        </div>
      </div>
    </article>
  );
}
