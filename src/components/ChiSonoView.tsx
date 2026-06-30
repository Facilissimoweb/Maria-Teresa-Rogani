import React from 'react';
import { Award, GraduationCap, Check, ShieldCheck, Mail, ArrowRight, BookOpen, Sparkles, Target } from 'lucide-react';
import { ActiveTab } from '../types';
import profileImg from '../assets/images/maria_teresa.jpg';
import partnerPortraitImg from '../assets/images/partner_portrait_1782724733588.jpg';

interface ChiSonoViewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export default function ChiSonoView({ setActiveTab }: ChiSonoViewProps) {
  const [imageSrc, setImageSrc] = React.useState(profileImg);
  const [fallbackAttempts, setFallbackAttempts] = React.useState(0);

  const handleImageError = () => {
    if (fallbackAttempts === 0) {
      setImageSrc(partnerPortraitImg);
      setFallbackAttempts(1);
    }
  };

  return (
    <article id="chi-sono-view" className="animate-fadeIn transition-colors duration-200">
      {/* HERO SECTION */}
      <section id="chi-sono-hero" className="relative bg-[#0A192F] text-white overflow-hidden py-20 lg:py-28 border-b border-slate-800">
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
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>VISUAL COMMUNICATION & WEB DESIGN STRATEGY</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-tight italic">
              Chi Sono: <br />
              <span className="font-bold not-italic text-white">M. Teresa Rogani</span>
            </h1>
            
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-2xl">
              Affianco la Vostra impresa come Web Graphic Designer e alleata strategica, unendo una solida preparazione accademica nella progettazione visiva a una visione orientata agli obiettivi concreti del Vostro business.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                id="chi-sono-hero-cta"
                onClick={() => setActiveTab('contatti')}
                className="px-8 py-3.5 bg-[#4A90E2] hover:bg-[#357ABD] text-white text-xs font-bold uppercase tracking-[0.2em] shadow-lg shadow-black/20 transition-all duration-300"
              >
                Parliamo del Vostro Progetto
              </button>
            </div>
          </div>
          
          {/* Hero Side Block */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-6">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 flex flex-col justify-center rounded">
              <div className="mb-4">
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#4A90E2] mb-1 font-bold">Unica Titolare</p>
                <p className="text-xl font-serif italic text-white">Web Graphic Designer Strategica</p>
              </div>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex justify-between items-end border-b border-white/10 pb-1.5">
                  <span className="text-[9px] uppercase tracking-[0.15em] opacity-60">Ruolo</span>
                  <span className="font-semibold text-white">Consulente Indipendente</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/10 pb-1.5">
                  <span className="text-[9px] uppercase tracking-[0.15em] opacity-60">Competenza</span>
                  <span className="font-semibold text-white">Design, Social, Legale & AI</span>
                </div>
                <div className="flex justify-between items-end pb-1">
                  <span className="text-[9px] uppercase tracking-[0.15em] opacity-60">Status</span>
                  <span className="font-semibold text-white text-[#4A90E2]">Lead's Manager Certificata</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="py-16 bg-[#F8FAFC] dark:bg-[#0a192f] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* PROFILE & VISION SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Portrait Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Geometric Frame Accent */}
              <div className="absolute top-0 right-0 w-8 h-8 bg-[#4A90E2] translate-x-2 -translate-y-2 z-0 hidden sm:block"></div>
              
              <div className="relative bg-white dark:bg-[#0d1e36] p-4 rounded-none shadow-md border-2 border-[#0A192F] dark:border-[#4A90E2] z-10">
                <img 
                  src={imageSrc} 
                  onError={handleImageError}
                  alt="M. Teresa Rogani - Web Graphic Designer" 
                  className="w-full h-auto object-cover rounded-none grayscale hover:grayscale-0 transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
                
                <div className="mt-4 text-center border-t border-slate-200 dark:border-white/10 pt-4">
                  <h3 className="text-base font-bold text-[#0A192F] dark:text-white uppercase tracking-wider">M. Teresa Rogani</h3>
                  <p className="text-[10px] text-[#4A90E2] font-bold uppercase tracking-[0.2em] mt-1">Fondatrice e Web Graphic Designer</p>
                  <p className="text-[9px] text-slate-400 dark:text-slate-400 mt-2 font-mono uppercase tracking-wider">Visual Communication & Web Design Strategy</p>
                </div>
              </div>
            </div>
          </div>

          {/* Biography & Vision Column */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-xl sm:text-2xl font-light text-[#0A192F] dark:text-white tracking-tight italic">
              Metodologia Rigorosa ed <span className="font-bold not-italic text-[#0A192F] dark:text-[#4A90E2]">Efficacia Comunicativa</span>
            </h2>
            
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
              In un panorama digitale in costante evoluzione, mi propongo come professionista di riferimento per la progettazione di interfacce web che uniscano estetica, funzionalità e strategia. La mia metodologia poggia su due pilastri fondamentali: il rigore del <strong>Web Graphic Design</strong> e l'efficacia della <strong>comunicazione visiva</strong>.
            </p>

            <div className="border-l-4 border-[#4A90E2] pl-4 py-1 my-4 bg-slate-50 dark:bg-white/5">
              <p className="text-xs sm:text-sm text-[#0A192F] dark:text-white font-medium italic">
                "Progetto esperienze digitali curate, accessibili e coerenti con l'identità del Vostro brand, trasformando i Vostri valori in un linguaggio visivo chiaro, unico e professionale."
              </p>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
              Il Vostro sito non sarà un semplice template anonimo riempito di testi preconfezionati, ma diventerà una vera e propria risorsa strategica d'impresa in grado di esprimere credibilità immediata a chiunque vi acceda.
            </p>
          </div>
        </div>

        {/* STUDY & FORMATION TIMELINE/CARDS */}
        <div className="mb-20 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#4A90E2]">IL BACKGROUND</span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0A192F] dark:text-white uppercase tracking-tight">Il Mio Percorso e la Formazione Continua</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Le solide basi accademiche e il costante aggiornamento per governare l'innovazione</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Formazione Accademica */}
            <div className="bg-white dark:bg-[#0d1e36] p-6 sm:p-8 rounded-none border border-slate-200 dark:border-white/10 hover:border-[#4A90E2] dark:hover:border-[#4A90E2] transition-colors duration-200 flex flex-col justify-between shadow-sm relative group">
              <div className="space-y-4">
                <div className="p-3 bg-[#0A192F]/5 dark:bg-white/5 text-[#4A90E2] w-12 h-12 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-[#0A192F] dark:text-white text-sm uppercase tracking-wider">Formazione Accademica</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  La mia professionalità nasce da un <strong>Diploma in Grafica Pubblicitaria</strong> e si consolida con una <strong>Laurea in Comunicazione Visiva</strong>. Questo background accademico mi ha fornito le fondamenta per progettare esperienze digitali curate, accessibili e coerenti con l'identità del Vostro brand.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5 text-[9px] font-mono text-slate-400 uppercase tracking-widest">
                Diploma & Laurea Specialistica
              </div>
            </div>

            {/* Card 2: Aggiornamento Continuo */}
            <div className="bg-white dark:bg-[#0d1e36] p-6 sm:p-8 rounded-none border border-slate-200 dark:border-white/10 hover:border-[#4A90E2] dark:hover:border-[#4A90E2] transition-colors duration-200 flex flex-col justify-between shadow-sm relative group">
              <div className="space-y-4">
                <div className="p-3 bg-[#0A192F]/5 dark:bg-white/5 text-[#4A90E2] w-12 h-12 flex items-center justify-center">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-[#0A192F] dark:text-white text-sm uppercase tracking-wider">Formazione Continua</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Il web non si ferma mai, e neppure la mia formazione. Mi aggiorno costantemente sulle nuove tecnologie, sulle best practice di <strong>User Experience</strong> e sugli strumenti digitali emergenti. Integro nel mio flusso di lavoro solo le innovazioni che portano un reale vantaggio, mantenendo la regia creativa saldamente nelle mie mani.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5 text-[9px] font-mono text-slate-400 uppercase tracking-widest">
                Best Practice & UX Research
              </div>
            </div>

            {/* Card 3: Competenza Strategica */}
            <div className="bg-white dark:bg-[#0d1e36] p-6 sm:p-8 rounded-none border border-slate-200 dark:border-white/10 hover:border-[#4A90E2] dark:hover:border-[#4A90E2] transition-colors duration-200 flex flex-col justify-between shadow-sm relative group">
              <div className="space-y-4">
                <div className="p-3 bg-[#0A192F]/5 dark:bg-white/5 text-[#4A90E2] w-12 h-12 flex items-center justify-center">
                  <Target className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-[#0A192F] dark:text-white text-sm uppercase tracking-wider">Lead Generation</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Alla progettazione visiva affianco una competenza strategica nella generazione di contatti, supportata da una formazione specifica come <strong>Social Lead's Manager</strong>. Questo mi permette di concepire il design non solo come estetica, ma come uno strumento strutturato per guidare l'utente e convertire la navigazione in opportunità.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5 text-[9px] font-mono text-slate-400 uppercase tracking-widest">
                Social Lead's Manager
              </div>
            </div>
          </div>
        </div>

        {/* VALUES & STRATEGIC PILLARS */}
        <div id="strategic-pillars" className="bg-[#0A192F] dark:bg-[#0d1e36] text-white p-8 sm:p-12 rounded-none shadow-xl border border-[#0A192F] dark:border-[#4A90E2]/20 relative overflow-hidden mb-20">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 to-slate-900/40 opacity-50 pointer-events-none" />
          <div className="relative z-10 space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-[10px] font-bold text-[#4A90E2] uppercase tracking-[0.3em]">LE COMPETENZE CHIAVE</span>
              <h3 className="text-2xl sm:text-3xl font-light italic">In Che Modo Questo Si Traduce <span className="font-bold not-italic">in Valore per Voi</span></h3>
              <div className="h-[2px] w-12 bg-[#4A90E2] mx-auto mt-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
              <div className="space-y-3 bg-white/5 p-6 rounded-none border border-white/10 hover:border-[#4A90E2]/40 transition-colors">
                <div className="text-[#4A90E2] font-mono font-bold text-3xl">01.</div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Web Graphic Design & Comunicazione Visiva</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Progettazione di interfacce web, identità visiva, usabilità e sistemi di comunicazione capaci di rappresentare il Vostro brand con professionalità, coerenza e un impatto memorabile.
                </p>
              </div>

              <div className="space-y-3 bg-white/5 p-6 rounded-none border border-white/10 hover:border-[#4A90E2]/40 transition-colors">
                <div className="text-[#4A90E2] font-mono font-bold text-3xl">02.</div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Strategia e Lead Generation</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Integrazione di elementi funzionali e call-to-action studiate per convertire l'interesse dei visitatori in contatti commerciali qualificati, supportando attivamente la crescita del Vostro business.
                </p>
              </div>

              <div className="space-y-3 bg-white/5 p-6 rounded-none border border-white/10 hover:border-[#4A90E2]/40 transition-colors">
                <div className="text-[#4A90E2] font-mono font-bold text-3xl">03.</div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Formazione Continua e Metodo</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Approccio dinamico all'innovazione digitale. Studio e applico le nuove tecnologie con rigore metodologico, per offrirVi soluzioni costantemente attuali, performanti e misurabili nel tempo.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM CALL TO ACTION */}
        <div className="bg-white dark:bg-[#0d1e36] p-8 sm:p-10 rounded-none border-2 border-[#0A192F] dark:border-[#4A90E2] text-center space-y-5 shadow-sm max-w-4xl mx-auto transition-colors duration-200">
          <h3 className="text-lg font-bold text-[#0A192F] dark:text-white uppercase tracking-wider">Desiderate una valutazione strategica per il Vostro progetto?</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Metto a Vostra disposizione la mia competenza ed il mio metodo di progettazione per analizzare la fattibilità della Vostra idea imprenditoriale e consigliarvi la strada migliore.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setActiveTab('contatti')}
              className="px-6 py-3 bg-[#0A192F] dark:bg-[#4A90E2] hover:opacity-90 dark:text-slate-950 text-white text-xs font-bold uppercase tracking-[0.2em] transition-all duration-200 inline-flex items-center space-x-2 cursor-pointer"
            >
              <span>Contattami per una Sessione Strategica</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        </div>
      </div>
    </article>
  );
}
