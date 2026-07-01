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
  Share2,
  X,
  Maximize2
} from 'lucide-react';
import { ActiveTab } from '../types';
import { GlossaryParagraph } from './GlossaryTerm';
import complianceImg from '../assets/images/regenerated_image_1782923856419.jpg';

interface NormativaViewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export default function NormativaView({ setActiveTab }: NormativaViewProps) {
  // Active Section for Sticky Index highlights
  const [activeSection, setActiveSection] = useState('introduzione');
  
  // Fullscreen image preview state
  const [isFullscreenImageOpen, setIsFullscreenImageOpen] = useState(false);
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

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
      color: 'border-rose-600 text-rose-600 bg-rose-50/5',
      badgeColor: 'bg-rose-500 text-white',
      details: 'Divieto assoluto di sistemi IA dannosi (riconoscimento emozioni non autorizzato, social scoring). Obbligo di formazione per il personale che gestisce sistemi di IA.'
    },
    {
      date: '2 Agosto 2025',
      title: 'Fase 2: Controllo GPAI',
      status: 'Già in vigore',
      color: 'border-amber-600 text-amber-600 bg-amber-50/5',
      badgeColor: 'bg-amber-500 text-white',
      details: 'Regole severe per i fornitori di modelli AI per finalità generali (es. OpenAI, Google, Anthropic). Verifica della conformità su copyright e trasparenza.'
    },
    {
      date: 'Novembre/Dicembre 2026',
      title: 'Fase 3: Watermarking & Trasparenza',
      status: 'Scadenza imminente',
      color: 'border-emerald-600 text-emerald-600 bg-emerald-50/5',
      badgeColor: 'bg-emerald-500 text-white',
      details: 'Attivazione della marcatura tecnica per contenuti generati da IA. Interfacce trasparenti obbligatorie per chatbot ed assistenti virtuali.'
    },
    {
      date: 'Agosto 2027',
      title: 'Fase 4: Consolidamento Alto Rischio',
      status: 'Futuro adempimento',
      color: 'border-blue-600 text-blue-600 bg-blue-50/5',
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
    <article id="normativa-view" className="bg-[#161619] text-white">
      
      {/* 1. HERO HEADER SECTION */}
      <section className="relative bg-[#111113] text-white overflow-hidden py-16 lg:py-24 border-b border-white/10">
        {/* Background Decorative Polygon Grid */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="w-12 h-1 bg-[#10B981] mb-4"></div>
            
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-1 text-[10px] font-bold tracking-[0.2em] uppercase text-[#10B981] font-mono">
              <Scale className="w-4 h-4 text-[#10B981] shrink-0" />
              <span>SICUREZZA DIGITALE & LEGALITÀ</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[0.85] font-display uppercase">
              Normativa &<br />
              <span className="text-[#bef264]">Compliance</span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed max-w-2xl font-light">
              Guida pratica agli adempimenti normativi per microimprese e professionisti. Perché la conformità digitale non è un optional, ma un vantaggio competitivo tangibile.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => setActiveTab('contatti')}
                className="px-8 py-3.5 bg-[#10B981] hover:bg-[#10B981]/90 text-white text-xs font-bold uppercase tracking-[0.2em] shadow-lg transition-all duration-300 cursor-pointer font-mono"
              >
                Prenota Consulenza Gratuita
              </button>
              
              <button
                onClick={() => {
                  const element = document.getElementById('checklist-section');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-3.5 border border-white/20 hover:border-white/50 hover:bg-white/5 text-white text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer font-mono text-center"
              >
                Esegui l'Audit Interattivo
              </button>
            </div>
          </div>
          
          {/* Hero Side Block */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-6">
            <div 
              className="relative bg-black/40 border border-white/10 rounded-none overflow-hidden shadow-2xl group cursor-zoom-in"
              onClick={() => setIsFullscreenImageOpen(true)}
              title="Cliccate per visualizzare a schermo intero"
            >
              {/* Window header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#161619] border-b border-white/10">
                <div className="flex space-x-1.5">
                  <span className="w-2.5 h-2.5 bg-white/20 rounded-full inline-block" />
                  <span className="w-2.5 h-2.5 bg-white/20 rounded-full inline-block" />
                  <span className="w-2.5 h-2.5 bg-white/20 rounded-full inline-block" />
                </div>
                <span className="text-[10px] text-white/40 font-mono tracking-wider">facilissimoweb/compliance</span>
              </div>
              
              {/* Themed Image */}
              <img 
                src={complianceImg} 
                alt="Web Accessibility & Legal Compliance"
                className="w-full h-48 sm:h-56 md:h-64 lg:h-52 object-contain bg-black/80 border-b border-white/10 transition-all duration-300 group-hover:opacity-80"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="bg-[#161619] border border-white/10 p-6 flex flex-col justify-center rounded-none select-none">
              <div className="mb-4">
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#10B981] mb-1 font-bold font-mono">Standard Obbligatori</p>
                <p className="text-xl font-bold text-white font-display uppercase tracking-tight">Pratiche di Compliance Legale</p>
              </div>
              <div className="space-y-3 text-xs text-white/70 font-mono">
                <div className="flex justify-between items-end border-b border-white/5 pb-1.5">
                  <span className="text-[9px] uppercase tracking-[0.15em] opacity-50">Accessibilità Web</span>
                  <span className="font-semibold text-white">Accessibility Act 2025</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/5 pb-1.5">
                  <span className="text-[9px] uppercase tracking-[0.15em] opacity-50">AI Transparency</span>
                  <span className="font-semibold text-white">EU AI Act (Watermarking)</span>
                </div>
                <div className="flex justify-between items-end pb-1">
                  <span className="text-[9px] uppercase tracking-[0.15em] opacity-50">Data Protection</span>
                  <span className="font-semibold text-[#10B981]">GDPR Consenso Granulare</span>
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
                <p className="text-[10px] uppercase tracking-widest text-amber-500 font-bold font-mono mb-1">
                  DISCLAIMER OBBLIGATORIO
                </p>
                <p className="text-xs text-slate-300 leading-relaxed italic font-sans">
                  "Le informazioni contenute in questa pagina hanno scopo puramente informativo e divulgativo e riflettono la mia esperienza pratica nella progettazione web. Non costituiscono consulenza legale. Per questioni specifiche, Vi raccomando di consultare un avvocato o un professionista abilitato."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN LAYOUT CONTAINER WITH STICKY SIDEBAR */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 bg-[#161619] border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Desktop Left Sticky Navigation Menu */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              <div className="bg-[#111113] border border-white/5 p-5">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#10B981] border-b border-white/5 pb-2 mb-4 font-mono">
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
                      className={`w-full text-left px-3 py-2 text-[10px] font-bold uppercase tracking-wider transition-all flex items-center justify-between border-l-2 font-mono ${
                        activeSection === sec.id
                          ? 'border-[#10B981] text-[#10B981] bg-white/2 pl-4'
                          : 'border-transparent text-white/50 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span>{sec.label}</span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${activeSection === sec.id ? 'transform translate-x-1 text-[#10B981]' : 'opacity-20'}`} />
                    </button>
                  ))}
                </nav>
              </div>

              {/* Sidebar Sticky CTA Card */}
              <div className="bg-[#111113] text-white p-5 border border-white/10 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#10B981]/5 blur-2xl rounded-full" />
                <h4 className="text-[10px] font-bold uppercase text-[#10B981] tracking-wider mb-1 font-mono">Verifica gratuita</h4>
                <p className="text-sm font-bold uppercase leading-snug font-display">Il Vostro sito è in regola?</p>
                <p className="text-[11px] text-white/60 mt-2 leading-relaxed">
                  Prenotate una call conoscitiva gratuita di 20 minuti per valutare le Vostre criticità legali.
                </p>
                <button
                  onClick={() => setActiveTab('contatti')}
                  className="w-full mt-4 py-2 bg-[#10B981] hover:bg-[#10B981]/90 text-white font-bold text-[10px] uppercase tracking-widest transition-colors cursor-pointer flex items-center justify-center space-x-1.5 font-mono"
                >
                  <span>Iniziamo Ora</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </aside>

          {/* Main Long-Form Content Area */}
          <main className="col-span-1 lg:col-span-3 space-y-16">
            
            {/* INTRODUZIONE SECTION */}
            <section id="introduzione" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-tight text-white flex items-center gap-2 border-b border-white/10 pb-2">
                <BookOpen className="w-5 h-5 text-[#10B981]" />
                <span>Introduzione alla <span className="text-[#10B981]">Trasparenza Digitale</span></span>
              </h2>
              <GlossaryParagraph className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans font-light">
                Nel panorama economico contemporaneo, un sito web non rappresenta più soltanto una vetrina estetica per il brand, ma una complessa infrastruttura soggetta a rigorose disposizioni giuridiche nazionali ed europee. Progettare con il rigore del Web Graphic Design strategico significa anzitutto garantire che il flusso d'acquisto, la fruizione dei contenuti e l'uso dell'Intelligenza Artificiale avvengano nel pieno rispetto della legge.
              </GlossaryParagraph>
              <GlossaryParagraph className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans font-light">
                Questa guida operativa analizza le tre macro-aree normative fondamentali per chiunque gestisca siti web aziendali: l'Accessibilità Web ed il relativo European Accessibility Act (EAA), il Diritto di Recesso e il recentissimo AI Act Europeo.
              </GlossaryParagraph>
            </section>

            {/* SEZIONE 1: ACCESSIBILITÀ WEB E INCLUSIONE DIGITALE */}
            <section id="accessibilita" className="scroll-mt-24 space-y-6">
              
              {/* Section Header */}
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <h2 className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-tight text-white flex items-center gap-2">
                  <Scale className="w-5 h-5 text-[#10B981]" />
                  <span>1. Accessibilità Web e <span className="text-[#10B981]">Inclusione Digitale</span></span>
                </h2>
                <button 
                  onClick={() => toggleMobileSection('accessibilita')}
                  className="lg:hidden p-1.5 bg-white/5 hover:bg-[#10B981]/15 text-white"
                  aria-label="Espandi sezione"
                >
                  {mobileSectionsOpen.accessibilita ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </button>
              </div>

              {/* Collapsible wrapper */}
              <div className={`${mobileSectionsOpen.accessibilita ? 'block' : 'hidden lg:block'} space-y-6`}>
                
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                    1.1 Perché Non È Più Solo una Scelta Etica
                  </h3>
                  <GlossaryParagraph className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans font-light">
                    La navigazione facilitata (o accessibilità digitale) dei siti web non è più solo una scelta etica di inclusione, ma un obbligo di legge stringente per le aziende private. Chi non si adegua secondo le indicazioni di AgID rischia sanzioni pecuniarie, l'esclusione dai mercati partner e un grave danno d'immagine commerciale.
                  </GlossaryParagraph>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                    1.2 Il Quadro Normativo (Cosa Dice la Legge)
                  </h3>
                  <GlossaryParagraph className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans font-light">
                    La normativa italiana ed europea ha progressivamente esteso gli obblighi di accessibilità dal settore pubblico a quello privato, imponendo elevati criteri WCAG.
                  </GlossaryParagraph>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111113] p-4 border border-white/5">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#10B981] mb-1.5 font-mono">European Accessibility Act (EAA)</h4>
                      <GlossaryParagraph className="text-xs text-white/60 leading-relaxed font-sans font-light">
                        Recepito in Italia con il D.Lgs. n. 82/2022. Stabilisce che tutti i servizi e prodotti digitali chiave (inclusi siti web ed e-commerce) devono essere accessibili seguendo i canoni EAA.
                      </GlossaryParagraph>
                    </div>
                    <div className="bg-[#111113] p-4 border border-white/5">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-purple-400 mb-1.5 font-mono">Standard Tecnico WCAG</h4>
                      <GlossaryParagraph className="text-xs text-white/60 leading-relaxed font-sans font-light">
                        La conformità si ottiene rispettando le linee guida internazionali Web Content Accessibility Guidelines (livello AA), come WCAG, strutturando codice e grafica per chiunque.
                      </GlossaryParagraph>
                    </div>
                  </div>

                  {/* TIMELINE ACCESSIBILITÀ */}
                  <div className="bg-[#111113] p-5 border border-white/10 shadow-sm space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-2 font-mono">
                      <Clock className="w-4 h-4 text-[#10B981]" />
                      <span>Timeline delle Scadenze di Accessibilità</span>
                    </h4>
                    
                    <div className="relative border-l-2 border-white/10 pl-6 ml-2 space-y-6 text-left">
                      {/* Milestone 2025 */}
                      <div className="relative">
                        <div className="absolute -left-8.5 top-0.5 bg-rose-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black">1</div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 font-mono">28 Giugno 2025</span>
                        <h5 className="text-xs font-bold uppercase text-white font-mono">Estensione alle PMI</h5>
                        <p className="text-xs text-white/50 mt-1 leading-relaxed">
                          Obbligo esteso a tutte le PMI con fatturato superiore a 2 milioni di euro o con più di 10 dipendenti.
                        </p>
                      </div>

                      {/* Milestone 2026 */}
                      <div className="relative">
                        <div className="absolute -left-8.5 top-0.5 bg-purple-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black">2</div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 font-mono">Maggio 2026</span>
                        <h5 className="text-xs font-bold uppercase text-white font-mono">Regolamento Vigilanza AgID</h5>
                        <p className="text-xs text-white/50 mt-1 leading-relaxed">
                          L'Agenzia per l'Italia Digitale attiva i controlli ufficiali sistematici e l'esercizio del potere sanzionatorio amministrativo.
                        </p>
                      </div>

                      {/* Milestone 2027 */}
                      <div className="relative">
                        <div className="absolute -left-8.5 top-0.5 bg-emerald-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black">3</div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 font-mono">Scadenze Future & Best Practices</span>
                        <h5 className="text-xs font-bold uppercase text-white font-mono">Regola d'Oro per le Microimprese</h5>
                        <p className="text-xs text-white/50 mt-1 leading-relaxed">
                          Anche se formalmente esentati sotto i 10 dipendenti, l'adeguamento previene sanzioni indirette B2B, cause di discriminazione e aumenta la reach organica e SEO.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* SPECIALIZED BOX: MICROIMPRESE RISCHI */}
                  <div className="bg-purple-500/5 border-l-4 border-purple-600 p-4">
                    <h4 className="text-[10px] font-bold uppercase text-purple-400 tracking-wider mb-1 flex items-center gap-1.5 font-mono">
                      <ShieldAlert className="w-4 h-4" />
                      <span>Nota Importante per le Microimprese</span>
                    </h4>
                    <GlossaryParagraph className="text-[11px] sm:text-xs text-white/75 leading-relaxed font-sans font-light">
                      Anche se formalmente esentate dall'obbligo diretto EAA, le microimprese devono considerare i gravi rischi indiretti: l'esclusione commerciale dai bandi o collaborazioni B2B con grandi imprese obbligate (che non acquistano servizi non conformi), il rischio di cause risarcitorie civili e la perdita di clienti sul mercato digitale.
                    </GlossaryParagraph>
                  </div>
                </div>

                {/* 1.3 IMPLEMENTATION PRINCIPLES */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                    1.3 Applicazioni Pratiche: Come Si Rende un Sito "Facilitato"
                  </h3>
                  <GlossaryParagraph className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans font-light">
                    La navigazione facilitata richiede interventi nativi strutturali sul codice e sul design, non semplici widget o overlay che interferiscono con le tecnologie assistive.
                  </GlossaryParagraph>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { title: "Navigabilità da tastiera", desc: "Il sito deve essere interamente utilizzabile usando solo il tasto Tab, senza l'uso forzato del mouse." },
                      { title: "Compatibilità Screen Reader", desc: "Elementi visivi e immagini contrassegnati con alternative testuali semantiche per software per non vedenti." },
                      { title: "Contrasto cromatico adeguato", desc: "Rapporto di contrasto minimo 4.5:1 per garantire la perfetta leggibilità a ipovedenti e daltonici." },
                      { title: "Dichiarazione di Accessibilità", desc: "La redazione del documento standardizzato da pubblicare nel footer indicando canali di feedback." }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-[#111113] p-4 border border-white/5 flex items-start space-x-3">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <h5 className="text-xs font-bold text-white uppercase tracking-wider font-mono">{item.title}</h5>
                          <p className="text-[11px] text-white/50 mt-1 leading-relaxed font-sans font-light">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* BOX METODO: NATIVO VS OVERLAY */}
                  <div className="bg-white/2 border-l-4 border-white/30 p-4">
                    <h4 className="text-[10px] font-bold uppercase text-white/90 tracking-wider mb-1 font-mono">
                      Il Mio Approccio: Accessibilità Nativa, Non Sovrapposta
                    </h4>
                    <p className="text-[11px] sm:text-xs text-white/60 leading-relaxed font-sans font-light">
                      Evito l'uso di widget automatici o plugin superficiali di overlay (che promettono la messa a norma con un clic ma spesso ostacolano gli screen reader). Progetto interfacce pulite, con codice HTML semantico puro e conformità integrata nativamente.
                    </p>
                  </div>
                </div>

                {/* 1.4 RISCHI E SANZIONI */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                    1.4 I Rischi per le Aziende che Non Si Adeguano
                  </h3>
                  
                  {/* BOX COSA SI RISCHIA */}
                  <div className="bg-rose-500/5 border-l-4 border-rose-600 p-4 space-y-2">
                    <h4 className="text-[10px] font-bold uppercase text-rose-400 tracking-wider flex items-center gap-1.5 font-mono">
                      <AlertOctagon className="w-4 h-4 animate-bounce" />
                      <span>Sanzioni Amministrative & Ripercussioni Legali</span>
                    </h4>
                    <div className="text-[11px] sm:text-xs text-white/70 space-y-1.5 leading-relaxed font-sans font-light">
                      <p><strong>• Multe Pecuniarie AgID:</strong> Variazioni da <strong>5.000€ a 40.000€</strong> per singola violazione. Fino al <strong>5% del fatturato annuo</strong> per gravi recidive.</p>
                      <p><strong>• Blocco del Servizio:</strong> AgID può ordinare l'immediata rimozione del portale o la sospensione dei servizi online fino all'adeguamento.</p>
                      <p><strong>• Reputazione pubblica:</strong> Inserimento nella blacklist istituzionale AgID delle aziende inadempienti.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SEZIONE 2: DIRITTO DI RECESSO NEGLI E-COMMERCE */}
            <section id="recesso" className="scroll-mt-24 space-y-6">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <h2 className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-tight text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#10B981]" />
                  <span>2. Diritto di Recesso <span className="text-[#10B981]">negli E-commerce</span></span>
                </h2>
                <button 
                  onClick={() => toggleMobileSection('recesso')}
                  className="lg:hidden p-1.5 bg-white/5 hover:bg-[#10B981]/15 text-white"
                  aria-label="Espandi sezione"
                >
                  {mobileSectionsOpen.recesso ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </button>
              </div>

              <div className={`${mobileSectionsOpen.recesso ? 'block' : 'hidden lg:block'} space-y-6`}>
                
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                    2.1 La Normativa di Riferimento
                  </h3>
                  <GlossaryParagraph className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans font-light">
                    Il Diritto di Recesso per vendite telematiche è disciplinato rigidamente dal Codice del Consumo, recentemente aggiornato per tutelare i flussi informativi pre-acquisto, specialmente nei siti e-commerce.
                  </GlossaryParagraph>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                    2.2 Le Regole Fondamentali
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111113] p-4 border border-white/5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">Recesso Standard di 14 Giorni</h4>
                      <GlossaryParagraph className="text-xs text-white/60 mt-1 leading-relaxed font-sans font-light">
                        Il consumatore privato gode del Diritto di Recesso e ha il diritto inviolabile di recedere dall'acquisto entro 14 giorni di calendario dalla consegna fisica, senza addurre motivazioni e senza penali.
                      </GlossaryParagraph>
                    </div>

                    <div className="bg-purple-500/5 border-l-4 border-purple-600 p-4 shadow-sm">
                      <h4 className="text-[10px] font-bold uppercase text-purple-400 tracking-wider font-mono">Sanzione per Mancata Informativa</h4>
                      <p className="text-xs text-white/70 mt-1 leading-relaxed font-sans font-light">
                        Se il merchant omette l'informativa corretta pre-acquisto sul recesso, il periodo di recesso del cliente si estende legalmente a <strong>12 mesi + 14 giorni</strong>. Un rischio enorme per la gestione magazzino e il cashflow.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                    2.3 I Miei Obblighi di Design e Funzionalità
                  </h3>
                  <GlossaryParagraph className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans font-light">
                    In fase di sviluppo del carrello e del flusso di checkout per un e-commerce, configuro e strutturo l'aspetto grafico e funzionale:
                  </GlossaryParagraph>
                  <ul className="space-y-2 text-xs sm:text-sm text-white/80 leading-relaxed font-sans font-light">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      <span><strong>Informativa Pre-Acquisto Chiara:</strong> Indicazione dei costi di spedizione di reso e delle modalità pratiche prima del pagamento.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      <span><strong>Modulistica di Recesso:</strong> Integrazione di moduli di recesso scaricabili in formato standardizzato o form dedicati nell'area cliente.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SEZIONE 3: AI ACT EUROPEO (INTELLIGENZA ARTIFICIALE) */}
            <section id="aiact" className="scroll-mt-24 space-y-6">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <h2 className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-tight text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-[#10B981]" />
                  <span>3. AI Act Europeo <span className="text-[#10B981]">(EU AI Act)</span></span>
                </h2>
                <button 
                  onClick={() => toggleMobileSection('aiact')}
                  className="lg:hidden p-1.5 bg-white/5 hover:bg-[#10B981]/15 text-white"
                  aria-label="Espandi sezione"
                >
                  {mobileSectionsOpen.aiact ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </button>
              </div>

              <div className={`${mobileSectionsOpen.aiact ? 'block' : 'hidden lg:block'} space-y-6`}>
                
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                    3.1 Cos'è e Perché Vi Riguarda
                  </h3>
                  <GlossaryParagraph className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans font-light">
                    Il Regolamento UE 2024/1689 (AI Act) introduce requisiti di trasparenza vincolanti per qualsiasi applicativo o LLM che interagisce con gli utenti (es. chatbot d'assistenza, motori di raccomandazione o generazione testi).
                  </GlossaryParagraph>
                </div>

                {/* TIMELINE INTERATTIVA AI ACT */}
                <div className="bg-[#111113] p-6 border border-white/10">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#10B981] mb-4 font-mono">FASI DI ENTRATA IN VIGORE AI ACT</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
                    {timelineStages.map((stage, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveTimelineStage(idx)}
                        className={`p-3 border text-left cursor-pointer transition-colors duration-150 rounded-none ${
                          activeTimelineStage === idx
                            ? 'border-[#10B981] bg-[#10B981]/10 text-white'
                            : 'border-white/5 bg-black/20 text-white/60 hover:border-white/20'
                        }`}
                      >
                        <p className="text-[9px] font-mono font-bold uppercase">{stage.date}</p>
                        <p className="text-xs font-bold font-display uppercase mt-1 truncate">{stage.title}</p>
                      </button>
                    ))}
                  </div>

                  <div className={`p-4 border-l-4 ${timelineStages[activeTimelineStage].color} space-y-2`}>
                    <div className="flex justify-between items-center">
                      <h5 className="text-sm font-bold text-white uppercase font-mono">{timelineStages[activeTimelineStage].title}</h5>
                      <span className={`px-2 py-0.5 text-[8px] font-bold uppercase font-mono ${timelineStages[activeTimelineStage].badgeColor}`}>
                        {timelineStages[activeTimelineStage].status}
                      </span>
                    </div>
                    <p className="text-xs text-white/80 leading-relaxed font-sans font-light">
                      {timelineStages[activeTimelineStage].details}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SEZIONE 4: ALTRI ADEMPIMENTI OBBLIGATORI */}
            <section id="altri" className="scroll-mt-24 space-y-6">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <h2 className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-tight text-white flex items-center gap-2">
                  <Lock className="w-5 h-5 text-[#10B981]" />
                  <span>4. Altri <span className="text-[#10B981]">Adempimenti</span></span>
                </h2>
                <button 
                  onClick={() => toggleMobileSection('altri')}
                  className="lg:hidden p-1.5 bg-white/5 hover:bg-[#10B981]/15 text-white"
                  aria-label="Espandi sezione"
                >
                  {mobileSectionsOpen.altri ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </button>
              </div>

              <div className={`${mobileSectionsOpen.altri ? 'block' : 'hidden lg:block'} space-y-6`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#111113] p-5 border border-white/5">
                    <h4 className="text-xs font-bold uppercase text-white font-mono mb-2">GDPR & Cookie Banner</h4>
                    <p className="text-xs text-white/70 leading-relaxed font-sans font-light">
                      È obbligatorio un cookie banner a consenso granulare (preventivo reale prima dei tracciamenti) con registro dei consensi e link diretto alla Privacy Policy.
                    </p>
                  </div>
                  <div className="bg-[#111113] p-5 border border-white/5">
                    <h4 className="text-xs font-bold uppercase text-white font-mono mb-2">Copyright & Licenze</h4>
                    <p className="text-xs text-white/70 leading-relaxed font-sans font-light">
                      Ogni elemento multimediale (immagini, icone, font tipografici) deve disporre della licenza commerciale d'uso per non incorrere in cause di copyright e sanzioni civilistiche.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SEZIONE 5: COME VI AFFIANCO */}
            <section id="affianco" className="scroll-mt-24 space-y-6">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <h2 className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-tight text-white flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-[#10B981]" />
                  <span>5. Come Vi Affianco <span className="text-[#10B981]">Professionalmente</span></span>
                </h2>
                <button 
                  onClick={() => toggleMobileSection('affianco')}
                  className="lg:hidden p-1.5 bg-white/5 hover:bg-[#10B981]/15 text-white"
                  aria-label="Espandi sezione"
                >
                  {mobileSectionsOpen.affianco ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </button>
              </div>

              <div className={`${mobileSectionsOpen.affianco ? 'block' : 'hidden lg:block'} space-y-4`}>
                <GlossaryParagraph className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans font-light">
                  Non mi limito a scrivere codice, ma offro un affiancamento costante e proattivo per mappare i requisiti del Vostro portale. Integro nel design le migliori pratiche di sicurezza e vi consegno i file pronti per la conformità legale.
                </GlossaryParagraph>
              </div>
            </section>

          </main>
        </div>
      </div>

      {/* 3. INTERACTIVE AUDIT CHECKLIST SECTION */}
      <section id="checklist-section" className="py-20 bg-[#111113] border-b border-white/10 text-white scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          
          <div className="text-center space-y-3 mb-10">
            <span className="text-[10px] font-mono font-bold text-[#10B981] uppercase tracking-[0.3em]">STRUMENTO DI AUTOVALUTAZIONE</span>
            <h2 className="text-3xl font-bold font-display uppercase tracking-tight text-white">Esegui l'Audit Compliance del Vostro Sito</h2>
            <p className="text-xs text-white/60 font-sans font-light max-w-2xl mx-auto">
              Selezionate gli elementi di cui siete già certi. Il misuratore sottostante calcolerà istantaneamente il Vostro livello teorico di conformità alle normative vigenti.
            </p>
          </div>

          <div className="bg-[#161619] border border-white/10 p-6 sm:p-10 space-y-8">
            {/* PROGRESS BAR */}
            <div className="space-y-2">
              <div className="flex justify-between items-end text-xs font-mono">
                <span className="text-[#10B981] font-bold uppercase tracking-wider">LIVELLO DI COMPLIANCE TEORICO:</span>
                <span className="text-white font-bold text-lg">{progressPercent}%</span>
              </div>
              <div className="w-full bg-[#111113] h-3 border border-white/5 overflow-hidden">
                <div 
                  className="bg-[#10B981] h-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-[10px] text-white/40 font-mono uppercase tracking-wider text-right">
                {completedCount} di {checklist.length} requisiti soddisfatti
              </p>
            </div>

            {/* CHECKLIST ITEMS */}
            <div className="space-y-3">
              {checklist.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => toggleChecklistItem(item.id)}
                  className={`p-4 border transition-colors duration-150 flex items-start space-x-3 cursor-pointer select-none ${
                    item.checked 
                      ? 'border-[#10B981]/40 bg-[#10B981]/5' 
                      : 'border-white/5 bg-[#111113] hover:border-white/10'
                  }`}
                >
                  <div className={`w-5 h-5 border flex items-center justify-center shrink-0 mt-0.5 rounded-none ${
                    item.checked ? 'border-[#10B981] bg-[#10B981] text-white' : 'border-white/20 bg-black/20'
                  }`}>
                    {item.checked && <span className="text-[10px]">✓</span>}
                  </div>
                  <div className="flex-grow">
                    <p className={`text-xs ${item.checked ? 'text-white' : 'text-white/70'} leading-relaxed`}>
                      {item.label}
                    </p>
                  </div>
                  <span className="text-[8px] font-mono uppercase bg-white/5 px-2 py-1 text-white/50 shrink-0 select-none">
                    {item.category}
                  </span>
                </div>
              ))}
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4 border-t border-white/5">
              <button
                onClick={handleCopyChecklist}
                className="px-6 py-3 border border-white/20 hover:border-white/50 text-white font-bold text-[10px] uppercase tracking-wider rounded-none transition-colors flex items-center justify-center space-x-2 font-mono cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-white" />
                <span>{copiedText ? 'Copiato!' : 'Copia Report Audit'}</span>
              </button>

              <button
                onClick={() => setActiveTab('contatti')}
                className="px-6 py-3 bg-[#10B981] hover:bg-[#10B981]/90 text-white font-bold text-[10px] uppercase tracking-wider rounded-none transition-colors flex items-center justify-center space-x-2 font-mono cursor-pointer"
              >
                <span>Richiedi Audit Professionale Completo</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      {isFullscreenImageOpen && (
        <div 
          onClick={() => setIsFullscreenImageOpen(false)}
          className="fixed inset-0 bg-black/95 z-[1000] flex flex-col items-center justify-center p-4 cursor-zoom-out animate-fadeIn"
        >
          <div className="relative max-w-5xl max-h-[90vh] flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setIsFullscreenImageOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-[#bef264] transition-colors p-2 text-xs font-mono uppercase tracking-widest flex items-center space-x-1.5 cursor-pointer bg-white/5 border border-white/10 px-3 py-1.5"
            >
              <span>Chiudi</span>
              <X className="w-4 h-4" />
            </button>
            <img 
              src={complianceImg} 
              alt="Web Accessibility & Legal Compliance Fullscreen"
              className="max-w-full max-h-[80vh] object-contain shadow-2xl border border-white/10 select-none"
              referrerPolicy="no-referrer"
            />
            <p className="text-[10px] text-white/50 uppercase tracking-widest font-mono mt-4 text-center">
              Web Accessibility & Legal Compliance • Cliccate all'esterno o sul pulsante per chiudere
            </p>
          </div>
        </div>
      )}

    </article>
  );
}
