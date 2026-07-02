import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Award, GraduationCap, Check, ShieldCheck, Mail, ArrowRight, BookOpen, Sparkles, Target, X } from 'lucide-react';
import { ActiveTab } from '../types';
import profileImg from '../assets/images/maria_teresa.jpg';
import partnerPortraitImg from '../assets/images/partner_portrait_1782724733588.jpg';
import regeneratedHeroImg from '../assets/images/regenerated_image_1782924691329.webp';
import { GlossaryParagraph } from './GlossaryTerm';
import ParticleOverlay from './ParticleOverlay';

interface ChiSonoViewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export default function ChiSonoView({ setActiveTab }: ChiSonoViewProps) {
  const [imageSrc, setImageSrc] = React.useState(profileImg);
  const [fallbackAttempts, setFallbackAttempts] = React.useState(0);
  const [isFullscreenImageOpen, setIsFullscreenImageOpen] = React.useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleImageError = () => {
    if (fallbackAttempts === 0) {
      setImageSrc(partnerPortraitImg);
      setFallbackAttempts(1);
    }
  };

  return (
    <article id="chi-sono-view" className="animate-fadeIn">
      {/* HERO SECTION */}
      <section id="chi-sono-hero" className="relative bg-[#131311] text-white overflow-hidden py-16 lg:py-24 border-b border-white/10">
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
              <span style={{ fontSize: '15px' }}>VISUAL COMMUNICATION & WEB DESIGN STRATEGY</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[0.85] font-display uppercase">
              M. Teresa<br />
              <span className="text-[#e7bf7e] italic">Rogani</span>
            </h1>
            
            <h2 className="text-xl sm:text-2xl font-display uppercase text-[#d69429] tracking-wide font-bold leading-relaxed max-w-2xl">
              Affianco la Vostra impresa come <span className="text-white font-sans font-light capitalize text-base sm:text-lg block mt-1">Web Graphic Designer e alleata strategica.</span>
            </h2>

            <GlossaryParagraph className="text-sm text-slate-400 font-normal leading-relaxed max-w-2xl">
              Unisco una solida preparazione accademica nella progettazione visiva a una visione orientata agli obiettivi concreti del Vostro business, inclusa la Lead Generation strategica.
            </GlossaryParagraph>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                id="chi-sono-hero-cta"
                onClick={() => setActiveTab('contatti')}
                className="px-8 py-3.5 bg-[#d69429] hover:bg-[#ab7621] text-white text-xs font-bold uppercase tracking-[0.2em] shadow-lg transition-all duration-300 cursor-pointer font-mono"
              >
                Parliamo del Vostro Progetto
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
              <div className="flex items-center justify-between px-4 py-3 bg-[#161619] border-b border-white/10">
                <div className="flex space-x-1.5">
                  <span className="w-2.5 h-2.5 bg-white/20 rounded-full inline-block" />
                  <span className="w-2.5 h-2.5 bg-white/20 rounded-full inline-block" />
                  <span className="w-2.5 h-2.5 bg-white/20 rounded-full inline-block" />
                </div>
                <span className="text-[10px] text-white/40 font-mono tracking-wider">facilissimoweb/chi-sono</span>
              </div>
              
              {/* Themed Image */}
              <img 
                src={regeneratedHeroImg} 
                alt="Web Graphic Design Workspace"
                className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity duration-350"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="bg-[#1b1b18] border border-white/10 p-6 flex flex-col justify-center rounded-none select-none">
              <div className="mb-4">
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#d69429] mb-1 font-bold font-mono">Unica Titolare</p>
                <p className="text-xl font-bold text-white font-display uppercase tracking-tight">Web Graphic Designer Strategica</p>
              </div>
              <div className="space-y-3 text-xs text-white/70 font-mono">
                <div className="flex justify-between items-end border-b border-white/5 pb-1.5">
                  <span className="text-[9px] uppercase tracking-[0.15em] opacity-50">Ruolo</span>
                  <span className="font-semibold text-white">Consulente Indipendente</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/5 pb-1.5">
                  <span className="text-[9px] uppercase tracking-[0.15em] opacity-50">Competenza</span>
                  <span className="font-semibold text-white">Design, Social, Legale & AI</span>
                </div>
                <div className="flex justify-between items-end pb-1">
                  <span className="text-[9px] uppercase tracking-[0.15em] opacity-50">Status</span>
                  <span className="font-semibold text-[#d69429]">Social Lead's Manager</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="py-16 bg-[#363630] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          {/* PROFILE & VISION SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
            {/* Portrait Column */}
            <motion.div 
              className="lg:col-span-5 flex justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative w-full max-w-md">
                {/* Geometric Frame Accent */}
                <div className="absolute top-0 right-0 w-8 h-8 bg-[#d69429] translate-x-2 -translate-y-2 z-0 hidden sm:block"></div>
                
                <div className="relative bg-[#131311] p-4 rounded-none shadow-2xl border border-white/10 z-10">
                  <img 
                    src={imageSrc} 
                    onError={handleImageError}
                    alt="M. Teresa Rogani - Web Graphic Designer" 
                    className="w-full h-auto object-cover rounded-none grayscale hover:grayscale-0 transition-all duration-300"
                    referrerPolicy="no-referrer"
                  />
                  
                  <div className="mt-4 text-center border-t border-white/10 pt-4">
                    <h3 className="text-lg font-bold text-white font-display uppercase tracking-wider">M. Teresa Rogani</h3>
                    <p className="text-[10px] text-[#d69429] font-bold uppercase tracking-[0.2em] mt-1 font-mono">Fondatrice e Web Graphic Designer</p>
                    <p className="text-[9px] text-white/50 mt-2 font-mono uppercase tracking-wider">Visual Communication & Web Design Strategy</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Biography & Vision Column */}
            <motion.div 
              className="lg:col-span-7 space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none font-display uppercase">
                Metodologia Rigorosa ed <span className="text-[#d69429]">Efficacia Comunicativa</span>
              </h2>
              
              <GlossaryParagraph className="text-white/70 text-xs sm:text-sm leading-relaxed font-sans font-light">
                In un panorama digitale in costante evoluzione, mi propongo come professionista di riferimento per la progettazione di interfacce web che uniscano estetica, funzionalità e strategia. La mia metodologia poggia su due pilastri fondamentali: il rigorore del Web Graphic Design e l'efficacia della comunicazione visiva, con particolare cura dei canoni di UX/UI e accessibilità.
              </GlossaryParagraph>

              <div className="border-l-4 border-[#d69429] pl-4 py-2 my-4 bg-white/2">
                <p className="text-xs sm:text-sm text-white/90 font-mono tracking-wide">
                  "Progetto esperienze digitali curate, accessibili e coerenti con l'identità del Vostro brand, trasformando i Vostri valori in un linguaggio visivo chiaro, unico e professionale."
                </p>
              </div>

              <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-sans font-light">
                Il Vostro sito non sarà un semplice template anonimo riempito di testi preconfezionati, ma diventerà una vera e propria risorsa strategica d'impresa in grado di esprimere credibilità immediata a chiunque vi acceda.
              </p>
            </motion.div>
          </div>

          {/* STUDY & FORMATION TIMELINE/CARDS */}
          <div className="mb-20 space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#d69429]">IL BACKGROUND</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display uppercase tracking-tight">Il Mio Percorso e la Formazione Continua</h3>
              <p className="text-xs text-white/50">Le solide basi accademiche e il costante aggiornamento per governare l'innovazione</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Formazione Accademica */}
              <motion.div 
                className="bg-[#131311] p-6 sm:p-8 rounded-none border border-white/5 hover:border-[#d69429]/40 transition-colors duration-200 flex flex-col justify-between shadow-sm relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="space-y-4">
                  <div className="p-3 bg-[#d69429]/5 text-[#d69429] w-12 h-12 flex items-center justify-center border border-white/5">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-white text-sm uppercase tracking-wider font-mono">Formazione Accademica</h4>
                  <GlossaryParagraph className="text-xs text-white/70 leading-relaxed font-sans font-light">
                    La mia professionalità nasce da un Diploma in Grafica Pubblicitaria e si consolida con una Laurea in Comunicazione Visiva. Questo background accademico mi ha fornito le fondamenta per progettare esperienze digitali curate, accessibili e coerenti con l'identità del Vostro brand, sposando la cura del Web Graphic Design.
                  </GlossaryParagraph>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 text-[9px] font-mono text-white/40 uppercase tracking-widest">
                  Diploma & Laurea Specialistica
                </div>
              </motion.div>

              {/* Card 2: Aggiornamento Continuo */}
              <motion.div 
                className="bg-[#131311] p-6 sm:p-8 rounded-none border border-white/5 hover:border-[#d69429]/40 transition-colors duration-200 flex flex-col justify-between shadow-sm relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.25 }}
              >
                <div className="space-y-4">
                  <div className="p-3 bg-[#d69429]/5 text-[#d69429] w-12 h-12 flex items-center justify-center border border-white/5">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-white text-sm uppercase tracking-wider font-mono">Formazione Continua</h4>
                  <GlossaryParagraph className="text-xs text-white/70 leading-relaxed font-sans font-light">
                    Il web non si ferma mai, e neppure la mia formazione. Mi aggiorno costantemente sulle nuove tecnologie, sulle best practice di UX/UI Design e sugli strumenti digitali emergenti. Integro nel mio flusso di lavoro solo le innovazioni che portano un reale vantaggio, come React, Vite e Tailwind CSS, mantenendo la regia creativa.
                  </GlossaryParagraph>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 text-[9px] font-mono text-white/40 uppercase tracking-widest">
                  Best Practice & UX Research
                </div>
              </motion.div>

              {/* Card 3: Competenza Strategica */}
              <motion.div 
                className="bg-[#131311] p-6 sm:p-8 rounded-none border border-white/5 hover:border-[#d69429]/40 transition-colors duration-200 flex flex-col justify-between shadow-sm relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="space-y-4">
                  <div className="p-3 bg-[#d69429]/5 text-[#d69429] w-12 h-12 flex items-center justify-center border border-white/5">
                    <Target className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-white text-sm uppercase tracking-wider font-mono">Lead Generation</h4>
                  <GlossaryParagraph className="text-xs text-white/70 leading-relaxed font-sans font-light">
                    Alla progettazione visiva affianco una competenza strategica nella generazione di contatti, supportata da una formazione specifica. This mi permette di concepire il design non solo come estetica, ma come uno strumento strutturato per guidare l'utente e convertire la navigazione in opportunità stabili tramite la Lead Generation.
                  </GlossaryParagraph>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 text-[9px] font-mono text-white/40 uppercase tracking-widest">
                  Social Lead's Manager
                </div>
              </motion.div>
            </div>
          {/* VALUES & STRATEGIC PILLARS */}
          <div id="strategic-pillars" className="bg-[#131311] text-white p-8 sm:p-12 rounded-none shadow-xl border border-white/10 relative overflow-hidden mb-20">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 to-slate-900/40 opacity-50 pointer-events-none" />
            <div className="relative z-10 space-y-10">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-[10px] font-mono font-bold text-[#d69429] uppercase tracking-[0.3em]">LE COMPETENZE CHIAVE</span>
                <h3 className="text-3xl font-bold font-display uppercase tracking-tight text-white">In Che Modo Questo Si Traduce in Valore per Voi</h3>
                <div className="h-[2px] w-12 bg-[#d69429] mx-auto mt-4" />
              </div>
 
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
                <div className="space-y-3 bg-white/2 p-6 rounded-none border border-white/5 hover:border-[#d69429]/40 transition-colors">
                  <div className="text-[#d69429] font-mono font-bold text-3xl">01.</div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Web Graphic Design & Comunicazione Visiva</h4>
                  <p className="text-xs text-white/70 leading-relaxed font-sans font-light">
                    Progettazione di interfacce web, identità visiva, usabilità e sistemi di comunicazione capaci di rappresentare il Vostro brand con professionalità, coerenza e un impatto memorabile.
                  </p>
                </div>
 
                <div className="space-y-3 bg-white/2 p-6 rounded-none border border-white/5 hover:border-[#d69429]/40 transition-colors">
                  <div className="text-[#d69429] font-mono font-bold text-3xl">02.</div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Strategia e Lead Generation</h4>
                  <p className="text-xs text-white/70 leading-relaxed font-sans font-light">
                    Integrazione di elementi funzionali e call-to-action studiate per convertire l'interesse dei visitatori in contatti commerciali qualificati, supportando attivamente la crescita del Vostro business.
                  </p>
                </div>
 
                <div className="space-y-3 bg-white/2 p-6 rounded-none border border-white/5 hover:border-[#d69429]/40 transition-colors">
                  <div className="text-[#d69429] font-mono font-bold text-3xl">03.</div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Formazione Continua e Metodo</h4>
                  <p className="text-xs text-white/70 leading-relaxed font-sans font-light">
                    Approccio dinamico all'innovazione digitale. Studio e applico le nuove tecnologie con rigore metodologico, per offrirVi soluzioni costantemente attuali, performanti e misurabili nel tempo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM CALL TO ACTION */}
        <div className="bg-[#131311] p-8 sm:p-10 rounded-none border border-white/10 text-center space-y-6 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-white font-display uppercase tracking-wider leading-tight">Desiderate una valutazione strategica per il Vostro progetto?</h3>
          <p className="text-xs sm:text-sm text-white/70 max-w-2xl mx-auto leading-relaxed font-sans font-light">
            Metto a Vostra disposizione la mia competenza ed il mio metodo di progettazione per analizzare la fattibilità della Vostra idea imprenditoriale e consigliarvi la strada migliore.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setActiveTab('contatti')}
              className="px-8 py-4 bg-[#d69429] hover:bg-[#ab7621] text-white text-xs font-bold uppercase tracking-[0.2em] transition-all duration-200 inline-flex items-center space-x-2 cursor-pointer font-mono"
            >
              <span>Contattami per una Sessione Strategica</span>
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
              src={regeneratedHeroImg} 
              alt="Web Graphic Design Workspace Fullscreen"
              className="max-w-full max-h-[80vh] object-contain shadow-2xl border border-white/10 select-none"
              referrerPolicy="no-referrer"
            />
            <p className="text-[10px] text-white/50 uppercase tracking-widest font-mono mt-4 text-center">
              Web Graphic Design Workspace • Cliccate all'esterno o sul pulsante per chiudere
            </p>
          </div>
        </div>
      )}

    </article>
  );
}
