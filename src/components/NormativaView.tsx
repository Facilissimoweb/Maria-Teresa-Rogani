import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Calendar, 
  UserCheck, 
  BookOpen, 
  CheckSquare, 
  ArrowRight, 
  ChevronRight, 
  ChevronDown,
  Scale, 
  AlertOctagon, 
  FileText, 
  Cpu, 
  Lock, 
  HelpCircle,
  Clock,
  ExternalLink,
  Award,
  Download,
  CheckCircle,
  Share2
} from 'lucide-react';
import { ActiveTab } from '../types';

interface NormativaViewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export default function NormativaView({ setActiveTab }: NormativaViewProps) {
  // Active Section for Sticky Index highlights
  const [activeSection, setActiveSection] = useState('introduzione');
  
  // Collapsible sections on mobile
  const [mobileSectionsOpen, setMobileSectionsOpen] = useState({
    accessibilita: true,
    recesso: false,
    aiact: false,
    altri: false,
    affianco: false
  });

  // Interactive Checklist State
  const [checklist, setChecklist] = useState([
    { id: 'item1', label: 'Informativa e-commerce pre-acquisto attiva e visibile nel carrello', category: 'E-commerce', checked: false },
    { id: 'item2', label: 'Modulo standard per il diritto di recesso scaricabile o form online', category: 'E-commerce', checked: false },
    { id: 'item3', label: 'Alternativa testuale (tag "alt") compilata per tutte le immagini del sito', category: 'Accessibilità', checked: false },
    { id: 'item4', label: 'Sito navigabile interamente tramite tastiera (senza l\'uso del mouse)', category: 'Accessibilità', checked: false },
    { id: 'item5', label: 'Contrasto cromatico minimo 4.5:1 per testi e sfondi verificato', category: 'Accessibilità', checked: false },
    { id: 'item6', label: 'Avviso di interazione AI (sezione Chatbot o assistente virtuale attiva)', category: 'AI Act', checked: false },
    { id: 'item7', label: 'Etichettatura visibile o watermark per i contenuti multimediali generati da IA', category: 'AI Act', checked: false },
    { id: 'item8', label: 'Privacy Policy aggiornata e cookie banner a consenso granulare attivo', category: 'Privacy & GDPR', checked: false },
    { id: 'item9', label: 'Verifica delle licenze per immagini, icone e font utilizzati sul portale', category: 'Copyright', checked: false },
    { id: 'item10', label: 'Dichiarazione di Accessibilità pubblicata e linkata nel footer', category: 'Accessibilità', checked: false }
  ]);

  // AI Act Timeline active stage state (for interactive slider or detail panel)
  const [activeTimelineStage, setActiveTimelineStage] = useState(0);

  const timelineStages = [
    {
      date: '2 Febbraio 2025',
      title: 'Fase 1: Divieti & AI Literacy',
      status: 'Già in vigore',
      color: 'border-rose-600 text-rose-600 bg-rose-50 dark:bg-rose-950/20',
      badgeColor: 'bg-rose-500 text-white',
      details: 'Divieto assoluto di sistemi IA dannosi (riconoscimento emozioni non autorizzato, social scoring). Obbligo di formazione per il personale che gestisce sistemi di IA.'
    },
    {
      date: '2 Agosto 2025',
      title: 'Fase 2: Controllo GPAI',
      status: 'Già in vigore',
      color: 'border-amber-600 text-amber-600 bg-amber-50 dark:bg-amber-950/20',
      badgeColor: 'bg-amber-500 text-white',
      details: 'Regole severe per i fornitori di modelli AI per finalità generali (es. OpenAI, Google, Anthropic). Verifica della conformità su copyright e trasparenza.'
    },
    {
      date: 'Novembre/Dicembre 2026',
      title: 'Fase 3: Watermarking & Trasparenza',
      status: 'Scadenza imminente',
      color: 'border-emerald-600 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20',
      badgeColor: 'bg-emerald-500 text-white',
      details: 'Attivazione della marcatura tecnica per contenuti generati da IA. Interfacce trasparenti obbligatorie per chatbot ed assistenti virtuali.'
    },
    {
      date: 'Agosto 2027',
      title: 'Fase 4: Consolidamento Alto Rischio',
      status: 'Futuro adempimento',
      color: 'border-blue-600 text-blue-600 bg-blue-50 dark:bg-blue-950/20',
      badgeColor: 'bg-blue-500 text-white',
      details: 'Piena conformità e monitoraggio per sistemi IA considerati ad alto rischio (es. selezione automatica dei candidati, credit scoring).'
    }
  ];

  // Handle section tracking on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['introduzione', 'accessibilita', 'recesso', 'aiact', 'altri', 'affianco'];
      const scrollPosition = window.scrollY + 250;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

  const toggleMobileSection = (section: keyof typeof mobileSectionsOpen) => {
    setMobileSectionsOpen(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleChecklistItem = (id: string) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const completedCount = checklist.filter(item => item.checked).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

  // Copy checklist as raw checklist text
  const [copiedText, setCopiedText] = useState(false);
  const handleCopyChecklist = () => {
    const text = "CHECKLIST COMPLIANCE SITI WEB - FACILISSIMO WEB\n\n" + 
      checklist.map(item => `[${item.checked ? 'X' : ' '}] ${item.label} (${item.category})`).join('\n') + 
      `\n\nProgresso: ${progressPercent}% completato.\nVisita: https://facilissimoweb.it per una consulenza strategica gratuita.`;
    
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  return (
    <article id="normativa-view" className="bg-slate-50 dark:bg-[#081526] min-h-screen text-slate-800 dark:text-slate-200">
      
      {/* 1. HERO HEADER SECTION */}
      <section className="relative bg-[#0A192F] text-white overflow-hidden py-20 lg:py-28 border-b border-slate-800">
        {/* Background Decorative Polygon Grid */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#4a90e2_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 hidden lg:block">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 L100 0 L100 100 Z" fill="#4A90E2" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="w-12 h-1 bg-[#4A90E2] mb-6"></div>
            
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded text-[10px] font-bold tracking-[0.2em] uppercase text-[#4A90E2]">
              <Scale className="w-4 h-4 text-[#4A90E2] shrink-0" />
              <span>SICUREZZA DIGITALE & LEGALITÀ</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-tight italic">
              Normativa & Compliance: <br />
              <span className="font-bold not-italic text-white">Il Vostro Sito in Regola.</span>
            </h1>
            
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-2xl">
              Guida pratica agli adempimenti normativi per microimprese e professionisti. Perché la conformità digitale non è un optional, ma un vantaggio competitivo tangibile.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => setActiveTab('contatti')}
                className="px-8 py-3.5 bg-[#4A90E2] hover:bg-[#357ABD] text-white text-xs font-bold uppercase tracking-[0.2em] shadow-lg shadow-black/20 transition-all duration-300 cursor-pointer text-center"
              >
                Prenota Consulenza Gratuita
              </button>
              
              <button
                onClick={() => {
                  const element = document.getElementById('checklist-section');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-3.5 border border-white/30 hover:border-white/60 hover:bg-white/5 text-white text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer text-center"
              >
                Esegui l'Audit Interattivo
              </button>
            </div>
          </div>
          
          {/* Hero Side Block */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-6">
            <div className="relative bg-slate-950 border border-slate-800 rounded-lg overflow-hidden shadow-2xl">
              {/* Window header */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
                <div className="flex space-x-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full inline-block" />
                  <span className="w-3 h-3 bg-yellow-500 rounded-full inline-block" />
                  <span className="w-3 h-3 bg-green-500 rounded-full inline-block" />
                </div>
                <span className="text-[10px] text-slate-500 font-mono tracking-wider">facilissimoweb/compliance</span>
              </div>
              
              {/* Themed Image */}
              <img 
                src="https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80" 
                alt="Web Accessibility & Legal Compliance"
                className="w-full h-48 sm:h-56 md:h-64 lg:h-52 xl:h-60 object-cover border-b border-slate-800"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 flex flex-col justify-center rounded">
              <div className="mb-4">
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#4A90E2] mb-1 font-bold">Standard Obbligatori</p>
                <p className="text-xl font-serif italic text-white">Pratiche di Compliance Legale</p>
              </div>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex justify-between items-end border-b border-white/10 pb-1.5">
                  <span className="text-[9px] uppercase tracking-[0.15em] opacity-60">Accessibilità Web</span>
                  <span className="font-semibold text-white">European Accessibility Act 2025</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/10 pb-1.5">
                  <span className="text-[9px] uppercase tracking-[0.15em] opacity-60">AI Transparency</span>
                  <span className="font-semibold text-white">EU AI Act (Watermarking & Info)</span>
                </div>
                <div className="flex justify-between items-end pb-1">
                  <span className="text-[9px] uppercase tracking-[0.15em] opacity-60">Data Protection</span>
                  <span className="font-semibold text-[#4A90E2]">GDPR Consenso Granulare</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DISCLAIMER OBBLIGATORIO */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-12 relative z-10">
          <div className="bg-amber-500/10 border-l-4 border-amber-500 p-4 text-left">
            <div className="flex items-start space-x-3">
              <AlertOctagon className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs uppercase tracking-widest text-amber-500 font-black mb-1">
                  DISCLAIMER OBBLIGATORIO
                </p>
                <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed font-semibold italic">
                  "Le informazioni contenute in questa pagina hanno scopo puramente informativo e divulgativo e riflettono la mia esperienza pratica nella progettazione web. Non costituiscono consulenza legale. Per questioni specifiche, Vi raccomando di consultare un avvocato o un professionista abilitato."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN LAYOUT CONTAINER WITH STICKY SIDEBAR */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Left Sticky Navigation Menu */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              <div className="bg-white dark:bg-[#0d1e36] border border-slate-200 dark:border-white/10 p-5 shadow-sm">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4A90E2] border-b border-slate-100 dark:border-white/5 pb-2 mb-4">
                  INDICE GUIDA COMPLIANCE
                </h3>
                <nav className="space-y-1">
                  {[
                    { id: 'introduzione', label: 'Introduzione' },
                    { id: 'accessibilita', label: '1. Accessibilità Web' },
                    { id: 'recesso', label: '2. Diritto di Recesso' },
                    { id: 'aiact', label: '3. AI Act Europeo' },
                    { id: 'altri', label: '4. Altri Adempimenti' },
                    { id: 'affianco', label: '5. Come Vi Affianco' }
                  ].map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => handleScrollToSection(sec.id)}
                      className={`w-full text-left px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-between border-l-2 ${
                        activeSection === sec.id
                          ? 'border-[#4A90E2] text-[#4A90E2] bg-slate-50 dark:bg-white/5 pl-4'
                          : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-white/5'
                      }`}
                    >
                      <span>{sec.label}</span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${activeSection === sec.id ? 'transform translate-x-1' : 'opacity-30'}`} />
                    </button>
                  ))}
                </nav>
              </div>

              {/* Sidebar Sticky CTA Card */}
              <div className="bg-[#0A192F] text-white p-5 border border-[#4A90E2]/20 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#4A90E2]/5 blur-2xl rounded-full" />
                <h4 className="text-xs font-bold uppercase text-[#4A90E2] tracking-wider mb-1">Verifica gratuita</h4>
                <p className="text-sm font-extrabold uppercase leading-snug">Il Vostro sito è in regola?</p>
                <p className="text-[11px] text-slate-300 mt-2 leading-relaxed">
                  Prenotate una call conoscitiva gratuita di 20 minuti per valutare le Vostre criticità legali.
                </p>
                <button
                  onClick={() => setActiveTab('contatti')}
                  className="w-full mt-4 py-2 bg-[#4A90E2] hover:bg-[#357ABD] text-white font-bold text-[10px] uppercase tracking-widest transition-colors cursor-pointer flex items-center justify-center space-x-1.5"
                >
                  <span>Iniziamo Ora</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </aside>

          {/* Main Long-Form Content Area */}
          <main className="col-span-1 lg:col-span-3 space-y-12">
            
            {/* INTRODUZIONE SECTION */}
            <section id="introduzione" className="scroll-mt-24 space-y-4">
              <h2 className="text-xl sm:text-2xl font-light italic text-[#0A192F] dark:text-white tracking-tight flex items-center gap-2 border-b-2 border-slate-100 dark:border-white/10 pb-2">
                <BookOpen className="w-5 h-5 text-[#4A90E2]" />
                <span>Introduzione alla <span className="font-bold not-italic text-[#4A90E2]">Trasparenza Digitale</span></span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Nel panorama economico contemporaneo, un sito web non rappresenta più soltanto una vetrina estetica per il brand, ma una complessa infrastruttura soggetta a rigorose disposizioni giuridiche nazionali ed europee. Progettare con il rigore del <strong>Web Graphic Design strategico</strong> significa anzitutto garantire che il flusso d'acquisto, la fruizione dei contenuti e l'uso dell'Intelligenza Artificiale avvengano nel pieno rispetto della legge.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Questa guida operativa analizza le tre macro-aree normative fondamentali per chiunque gestisca siti web aziendali: l'<strong>Accessibilità Web (European Accessibility Act)</strong>, il <strong>Diritto di Recesso</strong> e il recentissimo <strong>AI Act Europeo</strong>.
              </p>
            </section>

            {/* SEZIONE 1: ACCESSIBILITÀ WEB E INCLUSIONE DIGITALE */}
            <section id="accessibilita" className="scroll-mt-24 space-y-6">
              
              {/* Section Header with Mobile Accordion support */}
              <div className="flex justify-between items-center border-b-2 border-slate-100 dark:border-white/10 pb-2">
                <h2 className="text-xl sm:text-2xl font-light italic text-[#0A192F] dark:text-white tracking-tight flex items-center gap-2">
                  <Scale className="w-5 h-5 text-[#4A90E2]" />
                  <span>1. Accessibilità Web e <span className="font-bold not-italic text-[#4A90E2]">Inclusione Digitale</span></span>
                </h2>
                <button 
                  onClick={() => toggleMobileSection('accessibilita')}
                  className="lg:hidden p-1.5 bg-slate-100 dark:bg-white/5 hover:bg-[#4A90E2]/15 text-[#0A192F] dark:text-white"
                  aria-label="Espandi sezione"
                >
                  {mobileSectionsOpen.accessibilita ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </button>
              </div>

              {/* Collapsible wrapper */}
              <div className={`${mobileSectionsOpen.accessibilita ? 'block' : 'hidden lg:block'} space-y-6`}>
                
                <div className="space-y-3">
                  <h3 className="text-sm font-black uppercase tracking-wider text-[#0A192F] dark:text-white">
                    1.1 Perché Non È Più Solo una Scelta Etica
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    La navigazione facilitata (o accessibilità digitale) dei siti web non è più solo una scelta etica di inclusione, ma un <strong>obbligo di legge stringente</strong> per le aziende private. Chi non si adegua rischia pesanti sanzioni pecuniarie, l'esclusione dai mercati pubblici e un grave danno d'immagine commerciale.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-wider text-[#0A192F] dark:text-white">
                    1.2 Il Quadro Normativo (Cosa Dice la Legge)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    La normativa italiana ed europea ha progressivamente esteso gli obblighi di accessibilità dal settore pubblico a quello privato.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-100/50 dark:bg-white/5 p-4 border border-slate-200/50 dark:border-white/10">
                      <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#4A90E2] mb-1.5">European Accessibility Act (EAA)</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed">
                        Recepito in Italia con il <strong>D.Lgs. n. 82/2022</strong>. Stabilisce che tutti i servizi e prodotti digitali chiave (inclusi siti web ed e-commerce) devono essere accessibili.
                      </p>
                    </div>
                    <div className="bg-slate-100/50 dark:bg-white/5 p-4 border border-slate-200/50 dark:border-white/10">
                      <h4 className="text-xs font-extrabold uppercase tracking-widest text-purple-500 mb-1.5">Standard Tecnico WCAG</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed">
                        La conformità si ottiene rispettando le linee guida internazionali <strong>Web Content Accessibility Guidelines (livello AA)</strong>, WCAG 2.1 e 2.2, strutturando codice e grafica per chiunque.
                      </p>
                    </div>
                  </div>

                  {/* TIMELINE ACCESSIBILITÀ */}
                  <div className="bg-white dark:bg-[#0d1e36] p-5 border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#0A192F] dark:text-white flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#4A90E2]" />
                      <span>Timeline delle Scadenze di Accessibilità</span>
                    </h4>
                    
                    <div className="relative border-l-2 border-slate-200 dark:border-white/10 pl-6 ml-2 space-y-6 text-left">
                      {/* Mileston 2025 */}
                      <div className="relative">
                        <div className="absolute -left-8.5 top-0.5 bg-rose-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black">1</div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-rose-500">28 Giugno 2025</span>
                        <h5 className="text-xs font-bold uppercase text-[#0A192F] dark:text-white">Estensione alle PMI</h5>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                          Obbligo esteso a tutte le PMI con fatturato superiore a 2 milioni di euro o con più di 10 dipendenti.
                        </p>
                      </div>

                      {/* Mileston 2026 */}
                      <div className="relative">
                        <div className="absolute -left-8.5 top-0.5 bg-purple-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black">2</div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-purple-500">Maggio 2026</span>
                        <h5 className="text-xs font-bold uppercase text-[#0A192F] dark:text-white">Regolamento Vigilanza AgID</h5>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                          L'Agenzia per l'Italia Digitale attiva i controlli ufficiali sistematici e l'esercizio del potere sanzionatorio amministrativo.
                        </p>
                      </div>

                      {/* Mileston 2027 */}
                      <div className="relative">
                        <div className="absolute -left-8.5 top-0.5 bg-emerald-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black">3</div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-500">Scadenze Future & Best Practices</span>
                        <h5 className="text-xs font-bold uppercase text-[#0A192F] dark:text-white">Regola d'Oro per le Microimprese</h5>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                          Anche se formalmente esentati sotto i 10 dipendenti, l'adeguamento previene sanzioni indirette B2B, cause di discriminazione e aumenta la reach organica e SEO.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* SPECIALIZED BOX: MICROIMPRESE RISCHI */}
                  <div className="bg-purple-500/5 border-l-4 border-purple-600 dark:bg-purple-500/10 p-4">
                    <h4 className="text-xs font-black uppercase text-purple-700 dark:text-purple-400 tracking-wider mb-1 flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4" />
                      <span>Nota Importante per le Microimprese</span>
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      Anche se formalmente esentate dall'obbligo diretto EAA, le microimprese devono considerare i gravi rischi indiretti: l'esclusione commerciale dai bandi o collaborazioni B2B con grandi imprese obbligate (che non acquistano servizi non conformi), il rischio di cause risarcitorie civili e la perdita di clienti sul mercato digitale.
                    </p>
                  </div>
                </div>

                {/* 1.3 IMPLEMENTATION PRINCIPLES */}
                <div className="space-y-3">
                  <h3 className="text-sm font-black uppercase tracking-wider text-[#0A192F] dark:text-white">
                    1.3 Applicazioni Pratiche: Come Si Rende un Sito "Facilitato"
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    La navigazione facilitata richiede **interventi nativi strutturali sul codice e sul design**, non semplici "widget" o "overlay" che interferiscono con le tecnologie assistive.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { title: "Navigabilità da tastiera", desc: "Il sito deve essere interamente utilizzabile usando solo il tasto Tab, senza l'uso forzato del mouse." },
                      { title: "Compatibilità Screen Reader", desc: "Elementi visivi e immagini contrassegnati con alternative testuali semantiche per software per non vedenti." },
                      { title: "Contrasto cromatico adeguato", desc: "Rapporto di contrasto minimo 4.5:1 per garantire la perfetta leggibilità a ipovedenti e daltonici." },
                      { title: "Dichiarazione di Accessibilità", desc: "La redazione del documento standardizzato da pubblicare nel footer indicando canali di feedback." }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-white dark:bg-[#0d1e36] p-4 border border-slate-200 dark:border-white/5 flex items-start space-x-3">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <div>
                          <h5 className="text-xs font-bold text-[#0A192F] dark:text-white uppercase tracking-wider">{item.title}</h5>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* BOX METODO: NATIVO VS OVERLAY */}
                  <div className="bg-slate-500/5 border-l-4 border-slate-600 dark:bg-slate-500/10 p-4">
                    <h4 className="text-xs font-black uppercase text-slate-700 dark:text-slate-300 tracking-wider mb-1">
                      Il Mio Approccio: Accessibilità Nativa, Non Sovrapposta
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      Evito l'uso di widget automatici o plugin superficiali di overlay (che promettono la messa a norma con un clic ma spesso ostacolano gli screen reader). Progetto interfacce pulite, con codice HTML semantico puro e conformità integrata nativamente.
                    </p>
                  </div>
                </div>

                {/* 1.4 RISCHI E SANZIONI */}
                <div className="space-y-3">
                  <h3 className="text-sm font-black uppercase tracking-wider text-[#0A192F] dark:text-white">
                    1.4 I Rischi per le Aziende che Non Si Adeguano
                  </h3>
                  
                  {/* BOX COSA SI RISCHIA */}
                  <div className="bg-rose-500/5 border-l-4 border-rose-600 dark:bg-rose-500/10 p-4 space-y-2">
                    <h4 className="text-xs font-black uppercase text-rose-700 dark:text-rose-400 tracking-wider flex items-center gap-1.5">
                      <AlertOctagon className="w-4 h-4 animate-bounce" />
                      <span>Sanzioni Amministrative & Ripercussioni Legali</span>
                    </h4>
                    <div className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 space-y-1.5 leading-relaxed">
                      <p><strong>• Multe Pecuniarie AgID:</strong> Variazioni da <strong>5.000€ a 40.000€</strong> per singola violazione. Fino al <strong>5% del fatturato annuo</strong> per gravi recidive.</p>
                      <p><strong>• Blocco del Servizio:</strong> AgID può ordinare l'immediata rimozione del portale o la sospensione dei servizi online fino all'adeguamento.</p>
                      <p><strong>• Reputazione pubblica:</strong> Inserimento nella blacklist istituzionale AgID delle aziende inadempienti.</p>
                    </div>
                  </div>
                </div>

                {/* 1.5 CASI STUDIO REALI */}
                <div className="space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-wider text-[#0A192F] dark:text-white">
                    1.5 Casi Studio e Dati sulle Controversie Legali
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Il trend legale globale dimostra quanto la conformità sia determinante per tutelare l'economia d'impresa e prevenire class action distruttive.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Caso 1 */}
                    <div className="bg-white dark:bg-[#0d1e36] border-l-4 border-[#4A90E2] p-4 shadow-sm flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-[#4A90E2] font-black">Caso 1</span>
                        <h4 className="text-xs font-bold uppercase text-[#0A192F] dark:text-white mt-1 mb-2">Target: E-commerce</h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                          L'<strong>82% delle cause civili di accessibilità</strong> si focalizza sui siti e-commerce. Flussi di pagamento non conformi o bottoni carrello non etichettati impediscono la transazione, innescando ricorsi legali per discriminazione.
                        </p>
                      </div>
                    </div>

                    {/* Caso 2 */}
                    <div className="bg-white dark:bg-[#0d1e36] border-l-4 border-[#4A90E2] p-4 shadow-sm flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-[#4A90E2] font-black">Caso 2</span>
                        <h4 className="text-xs font-bold uppercase text-[#0A192F] dark:text-white mt-1 mb-2">Domino's Pizza ADA</h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                          Un cittadino non vedente ha citato in giudizio la catena per non aver potuto personalizzare una pizza. La Corte Suprema USA ha stabilito che i siti web sono "luoghi di pubblico alloggio" condannando Domino's a spese legali mastodontiche.
                        </p>
                      </div>
                    </div>

                    {/* Caso 3 */}
                    <div className="bg-white dark:bg-[#0d1e36] border-l-4 border-[#4A90E2] p-4 shadow-sm flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-[#4A90E2] font-black">Caso 3</span>
                        <h4 className="text-xs font-bold uppercase text-[#0A192F] dark:text-white mt-1 mb-2">Il Flop degli Overlay</h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                          Numerose class action hanno colpito brand che usavano widget automatici di terze parti. Gli overlay entravano in conflitto con gli screen reader degli utenti bloccando la navigazione, confermando l'inefficacia delle "scorciatoie".
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 1.7 OPERATIONAL STEPS */}
                <div className="space-y-3">
                  <h3 className="text-sm font-black uppercase tracking-wider text-[#0A192F] dark:text-white">
                    1.7 Come Procedere: I Passi Operativi
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-start space-x-3 bg-slate-100/50 dark:bg-white/5 p-3.5">
                      <span className="w-5 h-5 bg-[#0A192F] text-white flex items-center justify-center font-bold text-xs shrink-0 rounded-none">1</span>
                      <div>
                        <p className="text-xs font-extrabold uppercase text-[#0A192F] dark:text-white">Audit Tecnico Strutturale</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Analisi manuale del codice e test reali con screen reader NVDA/VoiceOver per scovare barriere architettoniche digitali.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 bg-slate-100/50 dark:bg-white/5 p-3.5">
                      <span className="w-5 h-5 bg-[#0A192F] text-white flex items-center justify-center font-bold text-xs shrink-0 rounded-none">2</span>
                      <div>
                        <p className="text-xs font-extrabold uppercase text-[#0A192F] dark:text-white">Piano di Adeguamento Formale</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Redazione di un cronoprogramma di correzione, valutato molto positivamente da AgID in caso di controlli.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 bg-slate-100/50 dark:bg-white/5 p-3.5">
                      <span className="w-5 h-5 bg-[#0A192F] text-white flex items-center justify-center font-bold text-xs shrink-0 rounded-none">3</span>
                      <div>
                        <p className="text-xs font-extrabold uppercase text-[#0A192F] dark:text-white">Dichiarazione Istituzionale</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Compilazione e linkaggio nel footer del documento ufficiale che mappa la conformità.</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* SEZIONE 2: DIRITTO DI RECESSO NEGLI E-COMMERCE */}
            <section id="recesso" className="scroll-mt-24 space-y-6">
              <div className="flex justify-between items-center border-b-2 border-slate-100 dark:border-white/10 pb-2">
                <h2 className="text-xl sm:text-2xl font-light italic text-[#0A192F] dark:text-white tracking-tight flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#4A90E2]" />
                  <span>2. Diritto di Recesso <span className="font-bold not-italic text-[#4A90E2]">negli E-commerce</span></span>
                </h2>
                <button 
                  onClick={() => toggleMobileSection('recesso')}
                  className="lg:hidden p-1.5 bg-slate-100 dark:bg-white/5 hover:bg-[#4A90E2]/15 text-[#0A192F] dark:text-white"
                  aria-label="Espandi sezione"
                >
                  {mobileSectionsOpen.recesso ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </button>
              </div>

              <div className={`${mobileSectionsOpen.recesso ? 'block' : 'hidden lg:block'} space-y-6`}>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-black uppercase tracking-wider text-[#0A192F] dark:text-white">
                    2.1 La Normativa di Riferimento
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Il recesso per vendite telematiche è disciplinato rigidamente dal <strong>Codice del Consumo (D.Lgs. 206/2005)</strong>, recentemente aggiornato per tutelare i flussi informativi pre-acquisto.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-wider text-[#0A192F] dark:text-white">
                    2.2 Le Regole Fondamentali
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-[#0d1e36] p-4 border border-slate-200 dark:border-white/10 shadow-sm">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#0A192F] dark:text-white">Recesso Standard di 14 Giorni</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                        Il consumatore privato ha il diritto inviolabile di recedere dall'acquisto entro 14 giorni di calendario dalla consegna fisica, senza addurre motivazioni e senza penali.
                      </p>
                    </div>

                    {/* BOX SCADENZE: SANZIONE MANCATA INFORMATIVA */}
                    <div className="bg-purple-500/5 border-l-4 border-purple-600 dark:bg-purple-500/10 p-4 shadow-sm">
                      <h4 className="text-xs font-black uppercase text-purple-700 dark:text-purple-400 tracking-wider">Sanzione per Mancata Informativa</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                        Se il merchant omette l'informativa corretta pre-acquisto sul recesso, il periodo di recesso del cliente si estende legalmente a <strong>12 mesi + 14 giorni</strong>. Un rischio enorme per la gestione magazzino e il cashflow.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-black uppercase tracking-wider text-[#0A192F] dark:text-white">
                    2.3 I Miei Obblighi di Design e Funzionalità
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    In fase di sviluppo del carrello e del flusso di checkout, configuro e strutturo:
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#4A90E2] shrink-0 mt-0.5" />
                      <span><strong>Informativa Pre-Acquisto Chara:</strong> Indicazione dei costi di spedizione di reso e delle modalità pratiche prima del pagamento.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#4A90E2] shrink-0 mt-0.5" />
                      <span><strong>Modulistica di Recesso:</strong> Integrazione di moduli di recesso scaricabili in formato standardizzato o form dedicati nell'area cliente.</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2 bg-slate-100/50 dark:bg-white/5 p-4 border border-slate-200/50 dark:border-white/5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#0A192F] dark:text-white">
                    2.4 Eccezioni Legali al Recesso (Prodotti Non Rimborsabili)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    La legge consente di escludere il recesso esclusivamente per:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 text-[11px] text-slate-500 dark:text-slate-400">
                    <div className="p-2 bg-white dark:bg-[#081526] border border-slate-100 dark:border-white/5">• Prodotti personalizzati o confezionati su misura</div>
                    <div className="p-2 bg-white dark:bg-[#081526] border border-slate-100 dark:border-white/5">• Prodotti deperibili (es. alimentari freschi, fiori)</div>
                    <div className="p-2 bg-white dark:bg-[#081526] border border-slate-100 dark:border-white/5">• Beni sigillati aperti non rimborsabili per igiene</div>
                    <div className="p-2 bg-white dark:bg-[#081526] border border-slate-100 dark:border-white/5">• Download digitali con rinuncia esplicita pre-acquisto</div>
                  </div>
                </div>

              </div>
            </section>

            {/* SEZIONE 3: AI ACT EUROPEO (INTELLIGENZA ARTIFICIALE) */}
            <section id="aiact" className="scroll-mt-24 space-y-6">
              <div className="flex justify-between items-center border-b-2 border-slate-100 dark:border-white/10 pb-2">
                <h2 className="text-xl sm:text-2xl font-light italic text-[#0A192F] dark:text-white tracking-tight flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-[#4A90E2]" />
                  <span>3. AI Act Europeo <span className="font-bold not-italic text-[#4A90E2]">(Intelligenza Artificiale)</span></span>
                </h2>
                <button 
                  onClick={() => toggleMobileSection('aiact')}
                  className="lg:hidden p-1.5 bg-slate-100 dark:bg-white/5 hover:bg-[#4A90E2]/15 text-[#0A192F] dark:text-white"
                  aria-label="Espandi sezione"
                >
                  {mobileSectionsOpen.aiact ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </button>
              </div>

              <div className={`${mobileSectionsOpen.aiact ? 'block' : 'hidden lg:block'} space-y-6`}>
                
                <div className="space-y-3">
                  <h3 className="text-sm font-black uppercase tracking-wider text-[#0A192F] dark:text-white">
                    3.1 Cos'è e Perché Vi Riguarda
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Il <strong>Regolamento UE 2024/1689 (AI Act)</strong> è entrato in vigore il <strong>1° Agosto 2024</strong> ed è il primo quadro giuridico globale per l'IA. Introduce requisiti di trasparenza vincolanti per qualsiasi applicativo che interagisce con gli utenti (es. chatbot d'assistenza, motori di raccomandazione o generazione testi).
                  </p>
                </div>

                {/* VISUAL INFOGRAPHIC: RISK LEVELS */}
                <div className="bg-white dark:bg-[#0d1e36] p-5 border border-slate-200 dark:border-white/10 shadow-sm space-y-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#0A192F] dark:text-white text-center">
                    I LIVELLI DI RISCHIO DELL'AI ACT
                  </h4>
                  <p className="text-[11px] text-slate-400 text-center max-w-lg mx-auto uppercase tracking-wider font-semibold">
                    La maggior parte delle applicazioni web rientra nel Rischio Limitato con rigorosi doveri di trasparenza.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5 pt-2">
                    <div className="p-3 bg-red-600/10 border-t-4 border-red-600 text-center">
                      <h5 className="text-[10px] font-black uppercase text-red-600">Rischio Inaccettabile</h5>
                      <p className="text-[10px] text-slate-400 mt-1 leading-normal">Vietati nell'UE (manipolazione del comportamento, social credit scoring).</p>
                    </div>
                    <div className="p-3 bg-amber-600/10 border-t-4 border-amber-600 text-center">
                      <h5 className="text-[10px] font-black uppercase text-amber-600">Alto Rischio</h5>
                      <p className="text-[10px] text-slate-400 mt-1 leading-normal">Sistemi di selezione CV o rating del credito. Richiedono audit di terze parti.</p>
                    </div>
                    <div className="p-3 bg-emerald-600/10 border-t-4 border-emerald-600 text-center">
                      <h5 className="text-[10px] font-black uppercase text-emerald-600">Rischio Limitato</h5>
                      <p className="text-[10px] text-slate-400 mt-1 leading-normal"><strong>Chatbot & Generatori IA.</strong> Obbligatoria l'informativa esplicita.</p>
                    </div>
                    <div className="p-3 bg-blue-600/10 border-t-4 border-blue-600 text-center">
                      <h5 className="text-[10px] font-black uppercase text-blue-600">Rischio Minimo</h5>
                      <p className="text-[10px] text-slate-400 mt-1 leading-normal">Filtri antispam, raccomandazioni d'acquisto generiche.</p>
                    </div>
                  </div>
                </div>

                {/* 3.3 TIMELINE CRONOLOGICA AI ACT - INTERACTIVE ACCORDION */}
                <div className="space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-wider text-[#0A192F] dark:text-white">
                    3.3 La Cronologia Esatta delle Azioni da Intraprendere
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    L'applicazione dell'AI Act è strutturata in quattro fasi progressive. Cliccate sulle tappe per analizzare gli adempimenti correlati:
                  </p>

                  {/* Horizontal Timeline (Desktop) & Vertical (Mobile) Selector */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {timelineStages.map((stage, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveTimelineStage(i)}
                        className={`p-3.5 border-2 text-left transition-all rounded-none cursor-pointer flex flex-col justify-between ${
                          activeTimelineStage === i
                            ? 'border-[#4A90E2] bg-white dark:bg-white/5 ring-2 ring-[#4A90E2]/20 shadow-md'
                            : 'border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-transparent hover:border-slate-300'
                        }`}
                      >
                        <div>
                          <span className="text-[9px] font-bold block opacity-60 mb-1">{stage.date}</span>
                          <h4 className="text-[11px] font-black uppercase leading-tight text-slate-800 dark:text-white">{stage.title}</h4>
                        </div>
                        <span className={`inline-block text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 mt-3 self-start ${stage.badgeColor}`}>
                          {stage.status}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Selected Stage Detail Panel */}
                  <div className={`p-5 border-l-4 ${timelineStages[activeTimelineStage].color} transition-all`}>
                    <p className="text-[10px] uppercase tracking-widest font-black text-slate-400">Dettaglio Adempimenti Scadenza</p>
                    <h4 className="text-xs sm:text-sm font-black uppercase text-slate-800 dark:text-white mt-1">
                      {timelineStages[activeTimelineStage].title} ({timelineStages[activeTimelineStage].date})
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                      {timelineStages[activeTimelineStage].details}
                    </p>
                  </div>
                </div>

                {/* 3.4 ROLE OF DESIGNER IN COMPLIANCE */}
                <div className="space-y-3">
                  <h3 className="text-sm font-black uppercase tracking-wider text-[#0A192F] dark:text-white">
                    3.4 Il Mio Ruolo nell'Implementazione
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Come Web Graphic Designer, mi occupo di tradurre questi obblighi normativi in scelte di design e funzionalità concrete per il Vostro portale web:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-[#0d1e36] p-4 border border-slate-200 dark:border-white/5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#0A192F] dark:text-white">Progettazione di Interfacce Trasparenti</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                        Design di banner informativi eleganti che segnalano l'interazione con l'IA, conformemente all'Articolo 50, senza disturbare l'usabilità complessiva.
                      </p>
                    </div>
                    <div className="bg-white dark:bg-[#0d1e36] p-4 border border-slate-200 dark:border-white/5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#0A192F] dark:text-white">Watermarking & Marcatura</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                        Integrazione di log, metadati ed etichette visive per tracciare e identificare le immagini o i contenuti generati artificialmente.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* SEZIONE 4: ALTRI ADEMPIMENTI DA NON DIMENTICARE */}
            <section id="altri" className="scroll-mt-24 space-y-6">
              <div className="flex justify-between items-center border-b-2 border-slate-100 dark:border-white/10 pb-2">
                <h2 className="text-xl sm:text-2xl font-light italic text-[#0A192F] dark:text-white tracking-tight flex items-center gap-2">
                  <Lock className="w-5 h-5 text-[#4A90E2]" />
                  <span>4. Altri Adempimenti <span className="font-bold not-italic text-[#4A90E2]">da Non Dimenticare</span></span>
                </h2>
                <button 
                  onClick={() => toggleMobileSection('altri')}
                  className="lg:hidden p-1.5 bg-slate-100 dark:bg-white/5 hover:bg-[#4A90E2]/15 text-[#0A192F] dark:text-white"
                  aria-label="Espandi sezione"
                >
                  {mobileSectionsOpen.altri ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </button>
              </div>

              <div className={`${mobileSectionsOpen.altri ? 'block' : 'hidden lg:block'} space-y-4`}>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Per strutturare una presenza digitale solida e priva di rischi, non dimenticate di allineare:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: "Privacy e GDPR", desc: "Cookie banner con blocco preventivo dei tracker e consenso granulare secondo le linee guida del Garante Privacy." },
                    { title: "Termini e Condizioni", desc: "Contratto di servizio ben descritto, limitazioni di responsabilità e foro competente per prevenire controversie." },
                    { title: "Copyright e Licenze", desc: "Uso rigoroso di immagini, icone e font regolarmente licenziati con corretta attribuzione dei diritti." },
                    { title: "Fatturazione Elettronica", desc: "Conservazione a norma delle transazioni e-commerce integrando il tracciamento dei flussi fiscali." }
                  ].map((elem, idx) => (
                    <div key={idx} className="bg-slate-100/30 dark:bg-white/5 p-4 border border-slate-200/50 dark:border-white/5 text-left">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A90E2]">{elem.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{elem.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* INTERACTIVE CHECKLIST COMPLIANCE SECTION */}
            <section id="checklist-section" className="scroll-mt-24 bg-white dark:bg-[#0d1e36] p-6 md:p-8 border-2 border-[#0A192F] dark:border-[#4A90E2] shadow-xl space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#4A90E2]">Strumento Pratico</h3>
                  <h2 className="text-lg md:text-xl font-light italic text-[#0A192F] dark:text-white leading-none mt-1">
                    Audit di <span className="font-bold not-italic text-[#4A90E2]">Compliance Interattivo</span>
                  </h2>
                </div>
                <button
                  onClick={handleCopyChecklist}
                  className="px-4 py-2 bg-slate-100 dark:bg-white/10 hover:bg-[#4A90E2] hover:text-white text-slate-800 dark:text-white text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-1.5 transition-all"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedText ? 'Copiato in Appunti!' : 'Condividi Checklist'}</span>
                </button>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="uppercase tracking-wider text-slate-500">Progresso Verifica:</span>
                  <span className="text-[#4A90E2]">{completedCount} di {checklist.length} completati ({progressPercent}%)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-white/10 h-3 overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full transition-all duration-500 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Checklist Items list */}
              <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-2">
                {checklist.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => toggleChecklistItem(item.id)}
                    className={`w-full text-left p-3 border transition-all flex items-start gap-3 cursor-pointer ${
                      item.checked
                        ? 'bg-emerald-500/5 border-emerald-500/40 text-[#0A192F] dark:text-slate-100'
                        : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    <div className="pt-0.5 shrink-0">
                      <div className={`w-4 h-4 border flex items-center justify-center ${
                        item.checked ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-300 dark:border-white/20'
                      }`}>
                        {item.checked && <span className="text-[10px] font-black">✓</span>}
                      </div>
                    </div>
                    <div className="flex-1">
                      <span className={`inline-block text-[8px] font-bold uppercase px-1 py-0.5 mb-1 ${
                        item.category === 'Accessibilità' ? 'bg-[#4A90E2]/10 text-[#4A90E2]' :
                        item.category === 'E-commerce' ? 'bg-purple-500/10 text-purple-500' :
                        item.category === 'AI Act' ? 'bg-amber-500/10 text-amber-500' : 'bg-slate-500/10 text-slate-400'
                      }`}>
                        {item.category}
                      </span>
                      <p className={`text-xs ${item.checked ? 'line-through text-slate-400' : 'font-semibold'}`}>
                        {item.label}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* SEZIONE 5: COME VI AFFIANCO NEL MIO LAVORO */}
            <section id="affianco" className="scroll-mt-24 space-y-6">
              <div className="flex justify-between items-center border-b-2 border-slate-100 dark:border-white/10 pb-2">
                <h2 className="text-xl sm:text-2xl font-light italic text-[#0A192F] dark:text-white tracking-tight flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-[#4A90E2]" />
                  <span>5. Come Vi Affianco <span className="font-bold not-italic text-[#4A90E2]">Nel Mio Lavoro</span></span>
                </h2>
                <button 
                  onClick={() => toggleMobileSection('affianco')}
                  className="lg:hidden p-1.5 bg-slate-100 dark:bg-white/5 hover:bg-[#4A90E2]/15 text-[#0A192F] dark:text-white"
                  aria-label="Espandi sezione"
                >
                  {mobileSectionsOpen.affianco ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </button>
              </div>

              <div className={`${mobileSectionsOpen.affianco ? 'block' : 'hidden lg:block'} space-y-6`}>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Non sono un avvocato, ma nel mio quotidiano come <strong>Web Graphic Designer strategico</strong> mi occupo di tradurre queste complesse normative in scelte visive, di codice e di flusso concrete ed usabili.
                </p>

                {/* Checklist with checkboxes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Audit di Compliance Completo per il Vostro portale web esistente",
                    "Design e checkout di E-commerce conformi per ridurre il tasso di contestazione",
                    "Implementazione dell'accessibilità nativa (WCAG 2.1 AA) e codice semantico puro",
                    "Integrazione e interfacce di trasparenza conformi all'AI Act (chatbot, watermark)",
                    "Formazione documentata sull'AI Literacy per Voi ed il Vostro team d'impresa",
                    "Stretta collaborazione con legali specializzati per Privacy Policy integrate nel layout"
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-start space-x-3 bg-white dark:bg-[#0d1e36] p-4 border border-slate-100 dark:border-white/5 shadow-sm">
                      <div className="p-1 bg-[#4A90E2]/10 text-[#4A90E2] shrink-0">
                        <Award className="w-4 h-4" />
                      </div>
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-200 leading-relaxed">{feat}</p>
                    </div>
                  ))}
                </div>

                {/* FINAL CALL TO ACTION BOX */}
                <div className="bg-[#0A192F] text-white p-6 sm:p-8 border-2 border-[#4A90E2] shadow-2xl relative overflow-hidden text-center sm:text-left">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-[#4A90E2]/10 blur-3xl rounded-full" />
                  
                  <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="space-y-2">
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#4A90E2]">IL VOSTRO PRIMO PASSO</span>
                      <h4 className="text-lg sm:text-xl font-black uppercase text-white leading-tight">
                        Volete verificare se il Vostro attuale sito è in regola?
                      </h4>
                      <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                        Prenotate una call conoscitiva gratuita di 20 minuti. Analizzeremo insieme le Vostre criticità, Vi indicherò i primi passi da compiere e Vi spiegherò come raggiungere la conformità.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('contatti')}
                      className="px-6 py-3.5 bg-[#4A90E2] hover:bg-[#357ABD] text-white font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer shrink-0 flex items-center justify-center space-x-2 shadow-lg"
                    >
                      <span>Prenota Call Conoscitiva</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            </section>

            {/* FOOTER DELLA PAGINA: FONTI NORMATIVE E RISCORSE */}
            <section id="normativa-footer" className="bg-slate-100 dark:bg-white/5 p-6 border border-slate-200 dark:border-white/10 space-y-6">
              <div className="flex justify-between items-center border-b border-slate-200 dark:border-white/10 pb-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">Fonti Normative & Risorse Utili</h4>
                <span className="text-[10px] text-slate-400 font-bold">Ultimo Aggiornamento: Maggio 2026</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                <div>
                  <h5 className="font-bold uppercase tracking-wider text-[#0A192F] dark:text-white mb-2">Legislazioni di Riferimento</h5>
                  <ul className="space-y-1">
                    <li>• Direttiva UE 2019/882 (European Accessibility Act)</li>
                    <li>• D.Lgs. 82/2022 (Recepimento italiano accessibilità)</li>
                    <li>• Legge 4/2004 (Legge Stanca per l'accessibilità digitale)</li>
                    <li>• D.Lgs. 206/2005 (Codice del Consumo e-commerce)</li>
                    <li>• Regolamento UE 2024/1689 (AI Act per l'Intelligenza Artificiale)</li>
                    <li>• Regolamento UE 2016/679 (GDPR sulla tutela dei dati personali)</li>
                    <li>• Regolamento di Vigilanza AgID (Maggio 2026)</li>
                  </ul>
                </div>

                <div>
                  <h5 className="font-bold uppercase tracking-wider text-[#0A192F] dark:text-white mb-2">Risorse Istituzionali Esterne</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      { name: "AgID Istituzionale", url: "https://www.agid.gov.it/" },
                      { name: "Garante Privacy", url: "https://www.garanteprivacy.it/" },
                      { name: "Portale EUR-Lex", url: "https://eur-lex.europa.eu/" },
                      { name: "Indigo AI Act Blog", url: "https://indigo.ai/it/blog/ai-act/" }
                    ].map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white dark:bg-[#081526] border border-slate-200 dark:border-white/5 hover:text-[#4A90E2] flex items-center justify-between group transition-colors"
                      >
                        <span className="font-bold uppercase tracking-wider text-[9px]">{link.name}</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 text-[#4A90E2] transition-opacity" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 dark:text-slate-500 italic text-center pt-2 border-t border-slate-200 dark:border-white/10">
                Disclaimer: Le informazioni qui riportate hanno esclusivamente valore divulgativo ed informativo. Si declina qualsiasi responsabilità per l'uso non conforme dei materiali.
              </div>
            </section>

          </main>
        </div>
      </div>

    </article>
  );
}
