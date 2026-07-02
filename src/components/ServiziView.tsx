import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Settings, Code, ArrowRight, CheckCircle2, ChevronRight, HelpCircle, Eye, Info, CalendarRange, Sparkles, X } from 'lucide-react';
import { GlossaryParagraph } from './GlossaryTerm';
import ParticleOverlay from './ParticleOverlay';
import serviziHeroImg from '../assets/images/regenerated_image_1782920318517.jpg';

interface ServiziViewProps {
  setActiveTab: (tab: 'home' | 'chi-sono' | 'servizi' | 'contatti') => void;
}

export default function ServiziView({ setActiveTab }: ServiziViewProps) {
  const [activePhase, setActivePhase] = useState<number>(1);
  const [activeCategory, setActiveCategory] = useState<'cms' | 'custom' | 'social'>('cms');
  const [isFullscreenImageOpen, setIsFullscreenImageOpen] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

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
    },
    {
      id: 'custom-ai',
      title: 'Integrazioni AI Studiate ad Hoc',
      price: 'Su Preventivo',
      description: 'Integrazione di modelli di Intelligenza Artificiale Generativa (Generative AI, Assistenti Virtuali intelligenti, LLM) all\'interno delle Vostre applicazioni web o flussi di lavoro, progettati per automatizzare processi e qualificare lead.',
      features: [
        'Studio di fattibilità strategica e selezione del modello AI idoneo (Gemini, GPT)',
        'Integrazione API server-side sicura per salvaguardare le chiavi e credenziali',
        'Sviluppo di chatbot intelligenti e assistenti virtuali istruiti sui dati del Vostro business',
        'Automazione intelligente di flussi di lavoro (AI workflows) tramite webhook dedicati',
        'Analisi semantica avanzata, riassunto automatico di testi e classificazione dati',
        'Interfacce utente fluide ed eleganti per interazioni uomo-macchina d\'avanguardia',
        'Massima aderenza alle linee guida sull\'Intelligenza Artificiale Etica e conformità all\'AI Act'
      ],
      bestFor: 'Imprese e studi che desiderano automatizzare flussi operativi interni o qualificare i contatti in modo personalizzato.'
    }
  ];

  const socialPackages = [
    {
      id: 'social-start',
      title: 'Social Lead Generation Start',
      price: 'Da € 1.290',
      description: 'Configurazione ed ottimizzazione delle Vostre prime campagne di acquisizione contatti sui canali social. Ideale per lanciare la Vostra presenza ed iniziare a raccogliere contatti profilati con un investimento contenuto.',
      features: [
        'Studio del target e definizione del pubblico ottimale',
        'Creazione e ottimizzazione di Meta Ads (Facebook/Instagram)',
        'Sviluppo di 1 Landing Page ad alta conversione',
        'Sincronizzazione dei contatti via Email / Telegram / WhatsApp',
        'Configurazione tracciamenti fondamentali (Meta Pixel)',
        '1 mese di monitoraggio attivo delle campagne con reportistica'
      ],
      bestFor: 'Professionisti e attività locali che desiderano testare l\'efficacia dell\'acquisizione contatti online.'
    },
    {
      id: 'social-advanced',
      title: 'Social Lead Generation Advanced',
      price: 'Da € 2.490',
      description: 'Sistema integrato di lead generation multicanale con flussi automatici di riscaldamento del contatto. Ideale per studi professionali o imprese che desiderano un flusso costante e automatizzato di clienti pronti all\'acquisto.',
      features: [
        'Analisi avanzata e ricerca del pubblico B2B/B2C',
        'Campagne multicanale attive (Meta Ads & LinkedIn Ads)',
        'Fino a 3 varianti di Landing Page con A/B Testing',
        'Flusso automatico di Email Marketing (Lead Nurturing - 4 email)',
        'Integrazione API avanzata con il Vostro CRM aziendale',
        'Consulenza strategica continua e reportistica quindicinale',
        'Sviluppo di Lead Magnet personalizzato (PDF, Video o Guida)'
      ],
      bestFor: 'Aziende strutturate, Studi professionali, Agenzie e attività B2B ad alto scontrino medio.'
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
    <article id="servizi-view" className="animate-fadeIn text-white">
      {/* HERO SECTION */}
      <section id="servizi-hero" className="relative bg-[#131311] text-white overflow-hidden py-16 lg:py-24 border-b border-white/10">
        {/* Dynamic Interactive Particle Canvas Overlay */}
        <ParticleOverlay />
        
        {/* Background Decorative Polygon Grid */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d69429_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Content */}
          <motion.div 
            className="lg:col-span-7 space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="w-12 h-1 bg-[#d69429] mb-4"></div>
            
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-1 text-[10px] font-bold tracking-[0.2em] uppercase text-[#d69429] font-mono">
              <Sparkles className="w-3.5 h-3.5 text-[#dea954] shrink-0" />
              <span className="font-mono font-bold text-[15px]">LE MIE SOLUZIONI STRATEGICHE</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[0.85] font-display uppercase">
              Soluzioni<br />
              <span className="text-[#e7bf7e] italic">Su Misura</span>
            </h1>
            
            <h2 className="text-xl sm:text-2xl font-display uppercase text-[#d69429] tracking-wide font-bold leading-relaxed max-w-2xl">
              Distinguiamo nettamente tra <span className="text-white font-sans font-light capitalize text-base sm:text-lg block mt-1">piattaforme CMS per la massima versatilità ordinaria, sviluppi custom puri per performance d'élite ed integrazioni AI studiate ad hoc.</span>
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                id="servizi-hero-cta"
                onClick={() => setActiveTab('contatti')}
                className="px-8 py-3.5 bg-[#d69429] hover:bg-[#ab7621] text-white text-xs font-bold uppercase tracking-[0.2em] shadow-lg transition-all duration-300 cursor-pointer font-mono"
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
            <div 
              className="relative bg-black/40 border border-white/10 rounded-none overflow-hidden shadow-2xl group cursor-zoom-in"
              onClick={() => setIsFullscreenImageOpen(true)}
              title="Cliccate per visualizzare a schermo intero"
            >
              {/* Window header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#1b1b18] border-b border-white/10">
                <div className="flex space-x-1.5">
                  <span className="w-2.5 h-2.5 bg-white/20 rounded-full inline-block" />
                  <span className="w-2.5 h-2.5 bg-white/20 rounded-full inline-block" />
                  <span className="w-2.5 h-2.5 bg-white/20 rounded-full inline-block" />
                </div>
                <span className="text-[10px] text-white/40 font-mono tracking-wider">facilissimoweb/servizi</span>
              </div>
              
              {/* Themed Image */}
              <img 
                src={serviziHeroImg} 
                alt="Web App Development Services"
                className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity duration-350"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="bg-[#1b1b18] border border-white/10 p-6 flex flex-col justify-center rounded-none select-none">
              <div className="mb-4">
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#d69429] mb-1 font-bold font-mono">Standard di Progettazione</p>
                <p className="text-xl font-bold text-white font-display uppercase tracking-tight">Trasparenza & Alta Affidabilità</p>
              </div>
              <div className="space-y-3 text-xs text-white/70 font-mono">
                <div className="flex justify-between items-end border-b border-white/5 pb-1.5">
                  <span className="text-[9px] uppercase tracking-[0.15em] opacity-50">Piattaforme CMS</span>
                  <span className="font-semibold text-white">WordPress o Webflow</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/5 pb-1.5">
                  <span className="text-[9px] uppercase tracking-[0.15em] opacity-50">Sviluppo Custom</span>
                  <span className="font-semibold text-white">React / SPA & Tailwind</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/5 pb-1.5">
                  <span className="text-[9px] uppercase tracking-[0.15em] opacity-50">Integrazione AI</span>
                  <span className="font-semibold text-white">Ad Hoc / LLM & Gemini</span>
                </div>
                <div className="flex justify-between items-end pb-1">
                  <span className="text-[9px] uppercase tracking-[0.15em] opacity-50">SLA & Supporto</span>
                  <span className="font-semibold text-[#d69429]">Incluso & Formativo</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="py-16 bg-[#363630] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          {/* COMPARISON TABS (CMS VS CUSTOM VS SOCIAL) */}
          <div className="mb-20">
            <div className="flex justify-center mb-10">
              <div className="bg-[#131311] p-1.5 border border-white/10 rounded-none flex flex-wrap gap-1 justify-center">
                <button
                  id="tab-selector-cms"
                  onClick={() => setActiveCategory('cms')}
                  className={`px-5 py-3 rounded-none text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center space-x-2 cursor-pointer font-mono ${
                    activeCategory === 'cms'
                      ? 'bg-[#d69429] text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Layers className="w-4 h-4 shrink-0" />
                  <span>Piattaforme CMS (WordPress / Webflow)</span>
                </button>
                <button
                  id="tab-selector-custom"
                  onClick={() => setActiveCategory('custom')}
                  className={`px-5 py-3 rounded-none text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center space-x-2 cursor-pointer font-mono ${
                    activeCategory === 'custom'
                      ? 'bg-[#d69429] text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Code className="w-4 h-4 shrink-0" />
                  <span>Sviluppo Custom (React / Next.js)</span>
                </button>
                <button
                  id="tab-selector-social"
                  onClick={() => setActiveCategory('social')}
                  className={`px-5 py-3 rounded-none text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center space-x-2 cursor-pointer font-mono ${
                    activeCategory === 'social'
                      ? 'bg-[#d69429] text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Sparkles className="w-4 h-4 shrink-0 text-amber-400" />
                  <span>Social Lead Generation</span>
                </button>
              </div>
            </div>
          </div>

          {/* SERVICE CARDS */}
          <AnimatePresence mode="wait">
            {activeCategory === 'cms' && (
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
                      className="bg-[#131311] p-8 rounded-none border border-white/5 hover:border-[#d69429]/40 flex flex-col justify-between transition-colors duration-300 relative overflow-hidden"
                    >
                      <div className="space-y-6">
                        <div className="flex justify-between items-start">
                          <h3 className="text-xl font-bold text-white uppercase tracking-wider font-display">{pkg.title}</h3>
                          <span className="text-white font-mono font-bold text-xs px-3 py-1.5 bg-white/5 rounded-none border border-white/10 shrink-0 ml-4">
                            {pkg.price}
                          </span>
                        </div>
                        
                        <GlossaryParagraph className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans font-light">
                          {pkg.description}
                        </GlossaryParagraph>
 
                        <div className="border-t border-white/5 pt-6">
                          <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3 font-mono">Servizi Inclusi nel Pacchetto</h4>
                          <ul className="space-y-2.5">
                            {pkg.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start space-x-2.5 text-xs text-white/80">
                                <CheckCircle2 className="w-4 h-4 text-[#d69429] shrink-0 mt-0.5" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
 
                      <div className="border-t border-white/5 mt-8 pt-6">
                        <p className="text-[11px] text-white/50 leading-relaxed font-mono">
                          <span className="font-bold text-white uppercase tracking-wider text-[10px]">Ideale per:</span> {pkg.bestFor}
                        </p>
                        <button
                          onClick={() => setActiveTab('contatti')}
                          className="w-full mt-4 py-3 bg-[#d69429] hover:bg-[#ab7621] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-none transition-colors duration-150 flex items-center justify-center space-x-1 font-mono cursor-pointer"
                        >
                          <span>Selezionate questo pacchetto</span>
                          <ChevronRight className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeCategory === 'custom' && (
                <motion.div 
                  key="custom"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {customPackages.map((pkg) => (
                    <div 
                      key={pkg.id} 
                      id={`pkg-${pkg.id}`}
                      className="bg-[#131311] p-8 rounded-none border border-white/5 hover:border-[#d69429]/40 flex flex-col justify-between transition-colors duration-300 relative overflow-hidden"
                    >
                      <div className="space-y-6">
                        <div className="flex justify-between items-start">
                          <h3 className="text-xl font-bold text-white uppercase tracking-wider font-display">{pkg.title}</h3>
                          <span className="text-white font-mono font-bold text-xs px-3 py-1.5 bg-white/5 rounded-none border border-white/10 shrink-0 ml-4">
                            {pkg.price}
                          </span>
                        </div>
                        
                        <GlossaryParagraph className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans font-light">
                          {pkg.description}
                        </GlossaryParagraph>
 
                        <div className="border-t border-white/5 pt-6">
                          <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3 font-mono">Servizi Inclusi nel Pacchetto</h4>
                          <ul className="space-y-2.5">
                            {pkg.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start space-x-2.5 text-xs text-white/80">
                                <CheckCircle2 className="w-4 h-4 text-[#d69429] shrink-0 mt-0.5" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
 
                      <div className="border-t border-white/5 mt-8 pt-6">
                        <p className="text-[11px] text-white/50 leading-relaxed font-mono">
                          <span className="font-bold text-white uppercase tracking-wider text-[10px]">Ideale per:</span> {pkg.bestFor}
                        </p>
                        <button
                          onClick={() => setActiveTab('contatti')}
                          className="w-full mt-4 py-3 bg-[#d69429] hover:bg-[#ab7621] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-none transition-colors duration-150 flex items-center justify-center space-x-1 font-mono cursor-pointer"
                        >
                          <span>Inizializzate lo sviluppo custom</span>
                          <ChevronRight className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeCategory === 'social' && (
                <motion.div 
                  key="social"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                >
                  {socialPackages.map((pkg) => (
                    <div 
                      key={pkg.id} 
                      id={`pkg-${pkg.id}`}
                      className="bg-[#131311] p-8 rounded-none border border-white/5 hover:border-[#d69429]/40 flex flex-col justify-between transition-colors duration-300 relative overflow-hidden"
                    >
                      <div className="space-y-6">
                        <div className="flex justify-between items-start">
                          <h3 className="text-xl font-bold text-white uppercase tracking-wider font-display">{pkg.title}</h3>
                          <span className="text-white font-mono font-bold text-xs px-3 py-1.5 bg-white/5 rounded-none border border-white/10 shrink-0 ml-4">
                            {pkg.price}
                          </span>
                        </div>
                        
                        <GlossaryParagraph className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans font-light">
                          {pkg.description}
                        </GlossaryParagraph>
 
                        <div className="border-t border-white/5 pt-6">
                          <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3 font-mono">Servizi Inclusi nel Pacchetto</h4>
                          <ul className="space-y-2.5">
                            {pkg.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start space-x-2.5 text-xs text-white/80">
                                <CheckCircle2 className="w-4 h-4 text-[#d69429] shrink-0 mt-0.5" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
 
                      <div className="border-t border-white/5 mt-8 pt-6">
                        <p className="text-[11px] text-white/50 leading-relaxed font-mono">
                          <span className="font-bold text-white uppercase tracking-wider text-[10px]">Ideale per:</span> {pkg.bestFor}
                        </p>
                        <button
                          onClick={() => setActiveTab('contatti')}
                          className="w-full mt-4 py-3 bg-[#d69429] hover:bg-[#ab7621] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-none transition-colors duration-150 flex items-center justify-center space-x-1 font-mono cursor-pointer"
                        >
                          <span>Selezionate questa strategia</span>
                          <ChevronRight className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
          </AnimatePresence>

          {/* 7 PHASES OPERATIONAL TIMELINE */}
          <div id="phases-timeline-section" className="bg-[#131311] text-white rounded-none p-8 sm:p-12 shadow-xl mb-12 border border-white/10">
            <div className="max-w-3xl mx-auto text-center mb-12 space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[#d69429]">IL PROTOCOLLO OPERATIVO IN 7 FASI</span>
              <h2 className="text-3xl font-bold font-display uppercase tracking-tight text-white">Il Vostro Progetto, Passo dopo Passo</h2>
              <p className="text-xs leading-relaxed text-white/60 font-sans font-light">
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
                  className={`px-4 py-2.5 rounded-none text-[10px] font-bold uppercase tracking-wider transition-all duration-200 flex items-center space-x-2 cursor-pointer font-mono ${
                    activePhase === phase.phase
                      ? 'bg-[#d69429] text-white shadow-md'
                      : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="w-5 h-5 bg-black/40 text-white rounded-none inline-flex items-center justify-center text-[9px] font-mono border border-white/10 shrink-0">
                    {phase.phase}
                  </span>
                  <span className="hidden md:inline">
                    {phase.title}
                  </span>
                  <span className="md:hidden">Fase {phase.phase}</span>
                </button>
              ))}
            </div>
 
            {/* Phase Details Box */}
            <div className="bg-[#1b1b18] border border-white/10 rounded-none p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-5">
                <div className="flex items-center space-x-3">
                  <span className="text-4xl font-extrabold text-[#d69429] font-mono">0{operationalPhases[activePhase - 1].phase}</span>
                  <div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-wider font-display">{operationalPhases[activePhase - 1].title}</h3>
                    <p className="text-[10px] text-[#d69429] font-bold uppercase tracking-widest font-mono">{operationalPhases[activePhase - 1].timeline}</p>
                  </div>
                </div>
                
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans font-light">
                  {operationalPhases[activePhase - 1].description}
                </p>
 
                <div className="bg-[#131311] p-4 rounded-none border border-white/5 space-y-2">
                  <div className="flex items-center space-x-2 text-[10px] font-bold text-[#d69429] uppercase tracking-wider font-mono">
                    <Info className="w-4 h-4 shrink-0" />
                    <span>Cosa Riceverete (Deliverable):</span>
                  </div>
                  <p className="text-xs text-white/80 leading-relaxed italic font-sans font-light">
                    "{operationalPhases[activePhase - 1].deliverable}"
                  </p>
                </div>
              </div>
 
              <div className="lg:col-span-4 bg-black/20 p-5 rounded-none border border-white/5 space-y-4">
                <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-widest border-b border-white/5 pb-2 font-mono">Vantaggi di questa fase</h4>
                <ul className="space-y-3 text-xs text-white/70">
                  <li className="flex items-start space-x-2">
                    <span className="text-[#d69429] font-bold">✓</span>
                    <span>Consulenza diretta e costante</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#d69429] font-bold">✓</span>
                    <span>Verifica rigorosa di ogni requisito</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#d69429] font-bold">✓</span>
                    <span>Trasparenza e rispetto delle tempistiche</span>
                  </li>
                </ul>
                
                <div className="pt-2">
                  <button
                    onClick={() => setActiveTab('contatti')}
                    className="w-full py-2.5 bg-transparent border border-white/20 hover:border-white text-white font-bold text-[10px] uppercase tracking-wider rounded-none transition-colors duration-150 flex items-center justify-center space-x-1 font-mono cursor-pointer"
                  >
                    <span>Chiedete informazioni</span>
                    <ChevronRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* PRAGMATIC ADVISOR HELPER */}
          <div className="bg-[#131311] border border-white/10 rounded-none p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
            <div className="md:col-span-8 space-y-3">
              <span className="text-[10px] font-mono font-bold text-[#d69429] uppercase tracking-[0.25em] flex items-center space-x-1">
                <CalendarRange className="w-4 h-4 shrink-0" />
                <span>Consulenza Preliminare Gratuita</span>
              </span>
              <h3 className="text-xl font-bold uppercase tracking-wider text-white font-display">Non siete sicuri di quale soluzione scegliere per la Vostra attività?</h3>
              <p className="text-xs text-white/70 leading-relaxed font-sans font-light">
                Metto a Vostra disposizione un incontro informativo gratuito di 15 minuti. Insieme analizzeremo la natura del Vostro business ed esamineremo i costi di gestione futuri, indicandovi con assoluta trasparenza la strada più idonea.
              </p>
            </div>
            <div className="md:col-span-4 flex justify-end">
              <button
                onClick={() => setActiveTab('contatti')}
                className="px-6 py-3 bg-[#d69429] hover:bg-[#ab7621] text-white font-bold text-xs uppercase tracking-[0.2em] rounded-none transition-colors duration-150 shadow-md flex items-center space-x-2 w-full md:w-auto justify-center font-mono cursor-pointer"
              >
                <span>Contattatemi Ora</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isFullscreenImageOpen && (
        <div 
          onClick={() => setIsFullscreenImageOpen(false)}
          className="fixed inset-0 bg-black/95 z-[1000] flex flex-col items-center justify-center p-4 cursor-zoom-out animate-fadeIn"
        >
          <div className="relative max-w-5xl max-h-[90vh] flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setIsFullscreenImageOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-[#e7bf7e] transition-colors p-2 text-xs font-mono uppercase tracking-widest flex items-center space-x-1.5 cursor-pointer bg-white/5 border border-white/10 px-3 py-1.5"
            >
              <span>Chiudi</span>
              <X className="w-4 h-4" />
            </button>
            <img 
              src={serviziHeroImg} 
              alt="Web App Development Services Fullscreen"
              className="max-w-full max-h-[80vh] object-contain shadow-2xl border border-white/10 select-none"
              referrerPolicy="no-referrer"
            />
            <p className="text-[10px] text-white/50 uppercase tracking-widest font-mono mt-4 text-center">
              Web App Development Services • Cliccate all'esterno o sul pulsante per chiudere
            </p>
          </div>
        </div>
      )}

    </article>
  );
}
