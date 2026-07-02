import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Code, Cpu, Target, ShieldCheck, Zap } from 'lucide-react';
import { ActiveTab } from '../types';
import heroImg from '../assets/images/regenerated_image_1782982577389.png';
import { GlossaryParagraph } from './GlossaryTerm';
import ParticleOverlay from './ParticleOverlay';

interface HomeViewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export default function HomeView({ setActiveTab }: HomeViewProps) {
  return (
    <article id="home-view" className="animate-fadeIn">
      {/* HERO SECTION */}
      <section id="hero-section" className="relative bg-[#131311] text-white overflow-hidden py-16 lg:py-24 border-b border-white/10">
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
              <span style={{ fontSize: '14px' }}>[L'Evoluzione dello Sviluppo Web]</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[0.85] font-display uppercase">
              Rigore.<br />
              Strategia.<br />
              <span className="text-[#e7bf7e] italic">Performance.</span>
            </h1>

            <h2 className="text-xl sm:text-2xl font-display uppercase text-[#d69429] tracking-wide font-bold leading-relaxed max-w-2xl">
              Siti Web ad Elevata Conversione, <span className="text-white font-sans font-light capitalize text-base sm:text-lg block mt-1">Progettati con Rigore e Strategia.</span>
            </h2>
            
            <GlossaryParagraph id="hero-description-paragraph" className="text-sm text-slate-400 font-normal leading-relaxed max-w-2xl text-left">
              FACILISSIMO WEB semplifica lo sviluppo web coniugando tecnologia d'avanguardia, etica professionale della comunicazione e massima trasparenza economica. Garantisco la massima conversione dei Vostri contatti grazie a un approccio fortemente strategico come la lead generation.
            </GlossaryParagraph>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                id="hero-cta-primary"
                onClick={() => {
                  setActiveTab('contatti');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-3.5 bg-[#d69429] hover:bg-[#ab7621] text-white text-xs font-bold uppercase tracking-[0.2em] shadow-lg transition-all duration-300 cursor-pointer font-mono"
              >
                Iniziate Ora
              </button>
              
              <button
                id="hero-cta-secondary"
                onClick={() => {
                  setActiveTab('servizi');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-3.5 border border-white/20 hover:border-white/50 hover:bg-white/5 text-white text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer font-mono"
              >
                Scoprite i Metodi
              </button>
            </div>
          </motion.div>
          
          {/* Hero Image / UI Mockup with Strategic Side Panel */}
          <motion.div 
            className="lg:col-span-5 grid grid-cols-1 gap-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          >
            <div className="relative bg-black/40 border border-white/10 rounded-none overflow-hidden shadow-2xl">
              {/* Window header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#1b1b18] border-b border-white/10">
                <div className="flex space-x-1.5">
                  <span className="w-2.5 h-2.5 bg-white/20 rounded-full inline-block" />
                  <span className="w-2.5 h-2.5 bg-white/20 rounded-full inline-block" />
                  <span className="w-2.5 h-2.5 bg-white/20 rounded-full inline-block" />
                </div>
                <span className="text-[10px] text-white/40 font-mono tracking-wider">facilissimoweb/struttura</span>
              </div>
              
              {/* Image from template */}
              <img 
                src={heroImg} 
                alt="Facilissimo Web UI Mockup"
                className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity duration-350"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Strategic Info Box */}
            <div className="bg-[#1b1b18] border border-white/10 p-6 flex flex-col justify-center rounded-none select-none">
              <div className="mb-4">
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#d69429] mb-1 font-bold font-mono">Status Partner</p>
                <p className="text-lg font-bold text-white font-display uppercase tracking-tight">Social Lead's Manager Certificato</p>
              </div>
              <div className="space-y-3 text-xs text-white/70 font-mono">
                <div className="flex justify-between items-end border-b border-white/5 pb-1.5">
                  <span className="text-[9px] uppercase tracking-[0.15em] opacity-50">Metodo</span>
                  <span className="font-semibold text-white">Sviluppo Custom React</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/5 pb-1.5">
                  <span className="text-[9px] uppercase tracking-[0.15em] opacity-50">AI Integration</span>
                  <span className="font-semibold text-white">Trasparente / Consapevole</span>
                </div>
                <div className="flex justify-between items-end pb-1">
                  <span className="text-[9px] uppercase tracking-[0.15em] opacity-50">Focus Primario</span>
                  <span className="font-semibold text-[#d69429]">Massima Conversione</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CORE STATS & BRAND VALUES */}
      <section id="values-section" className="py-20 bg-[#363630] border-b border-white/10 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-4">
            <div className="space-y-2">
              <h2 className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-[#d69429]">I Miei Principi Fondanti</h2>
              <p className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-tight text-white">
                Un approccio pragmatico focalizzato sui Vostri risultati aziendali
              </p>
            </div>
            <div className="w-24 h-[1px] bg-white/10 hidden md:block shrink-0" />
            <p className="text-xs text-white/50 italic max-w-xs">Un percorso strutturato per garantire la Vostra eccellenza operativa.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-[#131311] p-8 rounded-none border-t-4 border-[#d69429] border-x border-b border-white/5 flex flex-col justify-between hover:bg-white/2 transition-colors duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="space-y-4">
                <div className="p-3 bg-[#d69429]/5 text-[#d69429] rounded-none w-fit border border-white/5">
                  <Target className="w-6 h-6 text-[#d69429]" />
                </div>
                <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider">Orientamento alla Conversione</h3>
                <GlossaryParagraph className="text-xs sm:text-sm text-white/70 leading-relaxed">
                   Ogni pixel, pulsante e paragrafo è studiato con l'unico obiettivo di guidare i Vostri utenti verso l'azione desiderata. Non realizzo semplici vetrine statiche, ma veri e propri catalizzatori di contatti con strategie avanzate di Lead Generation.
                </GlossaryParagraph>
              </div>
            </motion.div>

            <motion.div 
              className="bg-[#131311] p-8 rounded-none border-t-4 border-[#d69429]/70 border-x border-b border-white/5 flex flex-col justify-between hover:bg-white/2 transition-colors duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              <div className="space-y-4">
                <div className="p-3 bg-[#d69429]/5 text-[#d69429] rounded-none w-fit border border-white/5">
                  <ShieldCheck className="w-6 h-6 text-[#d69429]" />
                </div>
                <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider">Trasparenza Etica ed Economica</h3>
                <GlossaryParagraph className="text-xs sm:text-sm text-white/70 leading-relaxed">
                   I Vostri investimenti sono dettagliati singolarmente. Non vi troverete mai a fronteggiare costi nascosti o canoni ingiustificati. Riceverete report limpidi e chiarimenti approfonditi sulla conformità legale come GDPR e accessibilità.
                </GlossaryParagraph>
              </div>
            </motion.div>

            <motion.div 
              className="bg-[#131311] p-8 rounded-none border-t-4 border-[#d69429]/40 border-x border-b border-white/5 flex flex-col justify-between hover:bg-white/2 transition-colors duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="space-y-4">
                <div className="p-3 bg-[#d69429]/5 text-[#d69429] rounded-none w-fit border border-white/5">
                  <Code className="w-6 h-6 text-[#d69429]" />
                </div>
                <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider">Eccellenza Tecnologica</h3>
                <GlossaryParagraph className="text-xs sm:text-sm text-white/70 leading-relaxed">
                   Sfrutto competenze consolidate di comunicazione e sviluppo web in React. Questo garantisce codice d'élite in Tailwind CSS, elevati standard di sicurezza, conformità alle normative e scalabilità futura.
                </GlossaryParagraph>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI TRANSPARENCY SECTION */}
      <section id="ai-transparency-section" className="py-24 bg-[#131311] text-white relative overflow-hidden border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* AI Text Presentation */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-1 rounded-none text-[10px] font-bold tracking-[0.25em] text-[#d69429] font-mono">
                <Cpu className="w-4 h-4 text-[#d69429] shrink-0" />
                <span>ETICA E TRASPARENZA AI</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-none font-display uppercase">
                Integrazione Consapevole <br />
                <span className="text-[#d69429]">dell'Intelligenza Artificiale.</span>
              </h2>
              <GlossaryParagraph className="text-white/70 text-sm leading-relaxed">
                Sono fermamente convinta che l'Intelligenza Artificiale e i sistemi LLM rappresentino il più straordinario amplificatore di produttività del nostro secolo. Presso <strong>FACILISSIMO WEB</strong>, l'AI viene integrata in modo rigoroso, etico e pienamente conforme all'AI Act europeo per trasferire tutti i benefici di tempo e costo direttamente a Voi.
              </GlossaryParagraph>

              {/* Grid of AI benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-white/5 border-t-2 border-[#d69429] text-white rounded-none mt-0.5 shrink-0">
                    <Zap className="w-4 h-4 text-[#d69429]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider font-mono">Sviluppo Accelerato del 50%</h4>
                    <p className="text-xs text-white/50 leading-relaxed mt-1">
                      Strumenti di generation ed analisi del codice mi consentono di dimezzare i tempi di codifica standard.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-white/5 border-t-2 border-[#d69429] text-white rounded-none mt-0.5 shrink-0">
                    <Code className="w-4 h-4 text-[#d69429]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider font-mono">Refactoring e Test Avanzati</h4>
                    <p className="text-xs text-white/50 leading-relaxed mt-1">
                      Verifico costantemente la robustezza logica del codice tramite verifiche automatizzate guidate dall'AI.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-white/5 border-t-2 border-[#d69429] text-white rounded-none mt-0.5 shrink-0">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider font-mono">Ottimizzazione UX e Contenuti</h4>
                    <p className="text-xs text-white/50 leading-relaxed mt-1">
                      Strutturo i flussi informativi per massimizzare la leggibilità e la pertinenza semantica SEO.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-white/5 border-t-2 border-[#d69429] text-white rounded-none mt-0.5 shrink-0">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider font-mono">Trasparenza Economica</h4>
                    <p className="text-xs text-white/50 leading-relaxed mt-1">
                      La riduzione dei costi di setup manuale si traduce in tariffe d'ingresso sensibilmente più competitive per Voi.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Interactive Manifesto Sidebar */}
            <div className="lg:col-span-5">
              <div className="bg-[#1b1b18] text-white p-8 rounded-none border border-white/10 shadow-xl space-y-6 relative select-none">
                <div className="absolute top-4 right-4 text-[#d69429] opacity-5">
                  <Cpu className="w-16 h-16" />
                </div>
                
                <h3 className="text-sm font-bold text-white uppercase tracking-[0.2em] border-b border-white/5 pb-3 flex items-center space-x-2 font-mono">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Il Mio Manifesto AI</span>
                </h3>

                <blockquote className="italic text-xs text-white/70 leading-relaxed font-sans">
                  "L'Intelligenza Artificiale non sostituisce la strategia e l'intuizione umana, ne amplifica la visione. Sviluppo siti web orientati alla conversione garantendo trasparenza assoluta sull'uso di algoritmi generativi per il Vostro progetto."
                </blockquote>

                <div className="space-y-3 pt-2 text-[10px] tracking-wider uppercase font-mono">
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-white/50">Progettazione Logica</span>
                    <span className="text-[#d69429] font-bold">100% Supervisionata</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-white/50">Generazione Codice Base</span>
                    <span className="text-emerald-400 font-bold">Assistita da AI Generative</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-white/50">Test & Controllo Sicurezza</span>
                    <span className="text-amber-400 font-bold">Verificati Rigorosamente</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-white/50">Strategia di Conversione</span>
                    <span className="text-[#d69429] font-bold">Analisi Umana Esclusiva</span>
                  </div>
                </div>

                <div className="bg-white/2 border border-white/5 p-4 rounded-none text-xs text-white/70">
                  <p className="font-bold text-white mb-1 uppercase tracking-wider text-[10px] text-[#d69429] font-mono">Perché è un vantaggio per Voi?</p>
                  Siti che prima richiedevano settimane di lavoro e budget elevati vengono oggi realizzati in tempi rapidi, con standard qualitativi di prim'ordine e tariffe chiare.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL INTERACTIVE CALL TO ACTION */}
      <section id="home-cta-section" className="py-20 bg-[#1b1b18] text-white relative overflow-hidden border-t border-white/10">
        <div className="max-w-5xl mx-auto text-center relative z-10 px-6 lg:px-12 space-y-6">
          <div className="w-12 h-1 bg-[#d69429] mx-auto mb-4"></div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-none font-display uppercase">
            Pronti a definire la Vostra <span className="text-[#d69429]">nuova presenza digitale?</span>
          </h2>
          <p className="text-white/70 text-sm max-w-xl mx-auto leading-relaxed">
            Sia che desideriate un CMS ottimizzato o uno sviluppo interamente custom su misura, vi affianco con un approccio consulenziale e una strategia di comunicazione mirata ad alti standard qualitativi.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            <button
              onClick={() => {
                setActiveTab('contatti');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 bg-[#d69429] hover:bg-[#ab7621] text-white text-xs font-bold uppercase tracking-[0.2em] shadow-lg transition-all duration-300 cursor-pointer font-mono"
            >
              Richiedete la Vostra Call Gratuita
            </button>
            <button
              onClick={() => {
                setActiveTab('servizi');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 border border-white/20 hover:border-white/50 hover:bg-white/5 text-white text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer font-mono"
            >
              Consultate i Miei Pacchetti
            </button>
          </div>
        </div>
      </section>
    </article>
  );
}
