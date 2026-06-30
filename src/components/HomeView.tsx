import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Code, Cpu, Target, ShieldCheck, Zap } from 'lucide-react';
import { ActiveTab } from '../types';
import heroImg from '../assets/images/facilissimo_hero_1782724717858.jpg';

interface HomeViewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export default function HomeView({ setActiveTab }: HomeViewProps) {
  return (
    <article id="home-view" className="animate-fadeIn">
      {/* HERO SECTION */}
      <section id="hero-section" className="relative bg-[#0A192F] text-white overflow-hidden py-20 lg:py-28 border-b border-slate-800">
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
              <span>L'EVOLUZIONE DELLO SVILUPPO WEB STRATEGICO</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-tight italic">
              Siti Web ad Elevata Conversione, <br />
              <span className="font-bold not-italic text-white">Progettati con Rigore.</span>
            </h1>
            
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-2xl">
              FACILISSIMO WEB semplifica lo sviluppo web coniugando tecnologia d'avanguardia, etica professionale della comunicazione e massima trasparenza economica. Garantisco la massima conversione dei Vostri contatti grazie a un approccio fortemente strategico.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                id="hero-cta-primary"
                onClick={() => setActiveTab('contatti')}
                className="px-8 py-3.5 bg-[#4A90E2] hover:bg-[#4A90E2]/90 text-white text-xs font-bold uppercase tracking-[0.2em] shadow-lg shadow-black/20 transition-all duration-300"
              >
                Iniziate Ora
              </button>
              
              <button
                id="hero-cta-secondary"
                onClick={() => setActiveTab('servizi')}
                className="px-8 py-3.5 border border-white/30 hover:border-white/60 hover:bg-white/5 text-white text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300"
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
            <div className="relative bg-slate-950 border border-slate-800 rounded-lg overflow-hidden shadow-2xl">
              {/* Window header */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
                <div className="flex space-x-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full inline-block" />
                  <span className="w-3 h-3 bg-yellow-500 rounded-full inline-block" />
                  <span className="w-3 h-3 bg-green-500 rounded-full inline-block" />
                </div>
                <span className="text-[10px] text-slate-500 font-mono tracking-wider">facilissimoweb/struttura</span>
              </div>
              
              {/* Image from template */}
              <img 
                src={heroImg} 
                alt="Facilissimo Web UI Mockup"
                className="w-full h-auto object-cover border-b border-slate-800"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Strategic Info Box */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 flex flex-col justify-center rounded">
              <div className="mb-4">
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#4A90E2] mb-1 font-bold">Status Partner</p>
                <p className="text-xl font-serif italic text-white">Social Lead's Manager Certificato</p>
              </div>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex justify-between items-end border-b border-white/10 pb-1.5">
                  <span className="text-[9px] uppercase tracking-[0.15em] opacity-60">Metodo</span>
                  <span className="font-semibold text-white">Sviluppo Custom React</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/10 pb-1.5">
                  <span className="text-[9px] uppercase tracking-[0.15em] opacity-60">AI Integration</span>
                  <span className="font-semibold text-white">Trasparente / Consapevole</span>
                </div>
                <div className="flex justify-between items-end pb-1">
                  <span className="text-[9px] uppercase tracking-[0.15em] opacity-60">Focus Primario</span>
                  <span className="font-semibold text-white text-[#4A90E2]">Massima Conversione</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CORE STATS & BRAND VALUES */}
      <section id="values-section" className="py-20 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-4">
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-[#0A192F]">I Miei Principi Fondanti</h2>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#0A192F] tracking-tight">
                Un approccio pragmatico focalizzato sui Vostri risultati aziendali
              </p>
            </div>
            <div className="w-24 h-[1px] bg-slate-300 hidden md:block shrink-0" />
            <p className="text-xs text-slate-500 italic max-w-xs">Un percorso strutturato per garantire la Vostra eccellenza operativa.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white p-8 rounded-none border-t-4 border-[#0A192F] border-x border-b border-slate-200/80 flex flex-col justify-between hover:bg-slate-50/50 transition-colors duration-300 shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="space-y-4">
                <div className="p-3 bg-[#0A192F]/5 text-[#0A192F] rounded-none w-fit">
                  <Target className="w-6 h-6 text-[#0A192F]" />
                </div>
                <h3 className="text-lg font-bold text-[#0A192F] uppercase tracking-wider">Orientamento alla Conversione</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Ogni pixel, pulsante e paragrafo è studiato con l'unico obiettivo di guidare i Vostri utenti verso l'azione desiderata. Non realizzo semplici vetrine statiche, ma veri e propri catalizzatori di contatti e vendite.
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white p-8 rounded-none border-t-4 border-[#112240] border-x border-b border-slate-200/80 flex flex-col justify-between hover:bg-slate-50/50 transition-colors duration-300 shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              <div className="space-y-4">
                <div className="p-3 bg-[#0A192F]/5 text-[#0A192F] rounded-none w-fit">
                  <ShieldCheck className="w-6 h-6 text-[#0A192F]" />
                </div>
                <h3 className="text-lg font-bold text-[#0A192F] uppercase tracking-wider">Trasparenza Etica ed Economica</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  I Vostri investimenti sono dettagliati singolarmente. Non vi troverete mai a fronteggiare costi nascosti o canoni ingiustificati. Riceverete report limpidi e chiarimenti approfonditi su ogni fase del mio lavoro.
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white p-8 rounded-none border-t-4 border-[#4A90E2] border-x border-b border-slate-200/80 flex flex-col justify-between hover:bg-slate-50/50 transition-colors duration-300 shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="space-y-4">
                <div className="p-3 bg-[#0A192F]/5 text-[#0A192F] rounded-none w-fit">
                  <Code className="w-6 h-6 text-[#0A192F]" />
                </div>
                <h3 className="text-lg font-bold text-[#0A192F] uppercase tracking-wider">Eccellenza Tecnologica</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Sfrutto competenze consolidate di comunicazione e sviluppo web strategico. Questo garantisce codice pulito, elevati standard di sicurezza, conformità alle normative e scalabilità futura per la Vostra attività.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI TRANSPARENCY SECTION */}
      <section id="ai-transparency-section" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* AI Text Presentation */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-slate-100 border border-slate-200 px-3.5 py-1.5 rounded-none text-[10px] font-bold tracking-[0.25em] text-[#0A192F]">
                <Cpu className="w-4 h-4 text-[#4A90E2] shrink-0" />
                <span>ETICA E TRASPARENZA AI</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-light text-[#0A192F] tracking-tight leading-tight italic">
                Integrazione Consapevole <br />
                <span className="font-bold not-italic">dell'Intelligenza Artificiale.</span>
              </h2>
                         <p className="text-slate-600 text-sm leading-relaxed">
                Sono fermamente convinta che l'Intelligenza Artificiale rappresenti il più straordinario amplificatore di produttività del nostro secolo. Presso <strong>FACILISSIMO WEB</strong>, l'AI viene integrata in modo rigoroso e trasparente nel processo creativo e di sviluppo strategico, trasferendo tutti i benefici di tempo e costo direttamente a Voi.
              </p>

              {/* Grid of AI benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-slate-50 border-t-2 border-[#0A192F] text-slate-950 rounded-none mt-0.5 shrink-0">
                    <Zap className="w-4 h-4 text-[#4A90E2]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Sviluppo Accelerato del 50%</h4>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1">
                      Strumenti di generazione ed analisi del codice mi consentono di dimezzare i tempi di codifica standard.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-slate-50 border-t-2 border-[#112240] text-slate-950 rounded-none mt-0.5 shrink-0">
                    <Code className="w-4 h-4 text-[#4A90E2]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Refactoring e Test Avanzati</h4>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1">
                      Verifico costantemente la robustezza logica del codice tramite verifiche automatizzate guidate dall'AI.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-slate-50 border-t-2 border-[#1B3A57] text-slate-950 rounded-none mt-0.5 shrink-0">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Ottimizzazione UX e Contenuti</h4>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1">
                      Strutturo i flussi informativi per massimizzare la leggibilità e la pertinenza semantica SEO.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-slate-50 border-t-2 border-[#4A90E2] text-slate-950 rounded-none mt-0.5 shrink-0">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Trasparenza Economica</h4>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1">
                      La riduzione dei costi di setup manuale si traduce in tariffe d'ingresso sensibilmente più competitive per Voi.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Interactive Manifesto Sidebar */}
            <div className="lg:col-span-5">
              <div className="bg-[#0A192F] text-white p-8 rounded-none border border-slate-800 shadow-xl space-y-6 relative">
                <div className="absolute top-4 right-4 text-indigo-400 opacity-10">
                  <Cpu className="w-16 h-16" />
                </div>
                
                <h3 className="text-sm font-bold text-white uppercase tracking-[0.2em] border-b border-slate-800 pb-3 flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Il Mio Manifesto AI</span>
                </h3>

                <blockquote className="italic text-xs text-slate-300 leading-relaxed font-serif">
                  "L'Intelligenza Artificiale non sostituisce la strategia e l'intuizione umana, ne amplifica la visione. Sviluppo siti web orientati alla conversione garantendo trasparenza assoluta sull'uso di algoritmi generativi per il Vostro progetto."
                </blockquote>

                <div className="space-y-3 pt-2 text-[10px] tracking-wider uppercase">
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-slate-400">Progettazione Logica</span>
                    <span className="text-[#4A90E2] font-bold">100% Supervisionata</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-slate-400">Generazione Codice Base</span>
                    <span className="text-emerald-400 font-bold">Assistita da AI Generative</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-slate-400">Test & Controllo Sicurezza</span>
                    <span className="text-amber-400 font-bold">Verificati Rigorosamente</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-slate-400">Strategia di Conversione</span>
                    <span className="text-[#4A90E2] font-bold">Analisi Umana Esclusiva</span>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-none text-xs text-slate-300">
                  <p className="font-bold text-white mb-1 uppercase tracking-wider text-[10px] text-[#4A90E2]">Perché è un vantaggio per Voi?</p>
                  Siti che prima richiedevano settimane di lavoro e budget elevati vengono oggi realizzati in tempi rapidi, con standard qualitativi di prim'ordine e tariffe chiare.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL INTERACTIVE CALL TO ACTION */}
      <section id="home-cta-section" className="py-20 bg-[#0A192F] text-white relative overflow-hidden border-t border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A192F] to-[#112240] opacity-95" />
        <div className="max-w-5xl mx-auto text-center relative z-10 px-6 lg:px-12 space-y-6">
          <div className="w-12 h-1 bg-[#4A90E2] mx-auto mb-4"></div>
          <h2 className="text-2xl sm:text-4xl font-light text-white tracking-tight italic">
            Pronti a definire la Vostra <span className="font-bold not-italic">nuova presenza digitale?</span>
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            Sia che desideriate un CMS ottimizzato o uno sviluppo interamente custom su misura, vi affianco con un approccio consulenziale e una strategia di comunicazione mirata ad alti standard qualitativi.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            <button
              onClick={() => setActiveTab('contatti')}
              className="px-8 py-3.5 bg-[#4A90E2] hover:bg-[#4A90E2]/90 text-white text-xs font-bold uppercase tracking-[0.2em] shadow-lg shadow-black/20 transition-all duration-300"
            >
              Richiedete la Vostra Call Gratuita
            </button>
            <button
              onClick={() => setActiveTab('servizi')}
              className="px-8 py-3.5 border border-white/30 hover:border-white/60 hover:bg-white/5 text-white text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300"
            >
              Consultate i Miei Pacchetti
            </button>
          </div>
        </div>
      </section>
    </article>
  );
}
