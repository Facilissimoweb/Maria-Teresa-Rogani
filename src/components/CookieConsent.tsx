import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, ShieldAlert, Check, X, ChevronRight, ChevronDown } from 'lucide-react';

interface CookieConsentProps {
  onOpenCookiePolicy: () => void;
}

export default function CookieConsent({ onOpenCookiePolicy }: CookieConsentProps) {
  const [show, setShow] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);
  
  // Cookie categories state
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true and disabled
    analytical: true,
    marketing: false,
  });

  useEffect(() => {
    // Check if consent is already saved in localStorage
    const savedConsent = localStorage.getItem('fw-cookie-consent');
    if (!savedConsent) {
      // Small delay to make the entrance elegant and noticeable
      const timer = setTimeout(() => {
        setShow(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const consent = {
      necessary: true,
      analytical: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('fw-cookie-consent', JSON.stringify(consent));
    setShow(false);
  };

  const handleRejectAll = () => {
    const consent = {
      necessary: true,
      analytical: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('fw-cookie-consent', JSON.stringify(consent));
    setShow(false);
  };

  const handleSavePreferences = () => {
    const consent = {
      ...preferences,
      necessary: true, // Safeguard
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('fw-cookie-consent', JSON.stringify(consent));
    setShow(false);
  };

  const togglePreference = (key: 'analytical' | 'marketing') => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center p-4 sm:p-6 md:p-8 bg-black/60 backdrop-blur-sm">
          <motion.div
            id="cookie-consent-banner"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="w-full max-w-2xl bg-[#111113] border-2 border-[#f4700a] text-slate-100 shadow-2xl p-5 md:p-7 font-sans rounded-none flex flex-col space-y-5 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#f4700a]/10 border border-[#f4700a]/20 text-[#f4700a]">
                  <Cookie className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#f4700a] font-mono">Consenso Cookie & GDPR</h3>
                  <p className="text-sm font-bold uppercase text-white font-display mt-0.5">La Vostra Privacy è al Sicuro</p>
                </div>
              </div>
            </div>

            {/* Content Body */}
            {!isCustomizing ? (
              <div className="space-y-4 text-left">
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-light font-sans">
                  Benvenuti su Facilissimo Web. Utilizziamo cookie tecnici per garantire il corretto funzionamento del sito, cookie analitici (in forma anonima) per comprendere come migliorarlo e cookie di profilazione per integrare widget esterni (come l'Assistente AI e le mappe). 
                </p>
                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  Cliccando su <strong className="text-white">"Accetta Tutti"</strong> acconsentite all'uso di tutte queste tecnologie. Potete rifiutare i cookie non necessari cliccando su <strong className="text-white">"Rifiuta Tutti"</strong> o scegliere quali attivare premendo su <strong className="text-white">"Personalizza Preferenze"</strong>. Potete consultare in qualsiasi momento la nostra{' '}
                  <button 
                    onClick={onOpenCookiePolicy}
                    className="text-[#f4700a] underline hover:text-orange-400 font-semibold cursor-pointer"
                  >
                    Cookie Policy
                  </button>.
                </p>
              </div>
            ) : (
              <div className="space-y-4 text-left">
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  Selezionate le categorie di cookie che desiderate abilitare. I cookie tecnici essenziali non possono essere disattivati in quanto necessari per la navigazione sicura del sito.
                </p>

                {/* Preference Options */}
                <div className="space-y-2.5">
                  {/* Necessary (Read-only) */}
                  <div className="p-3 bg-white/5 border border-white/10 flex items-start justify-between">
                    <div className="space-y-1 pr-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-white font-mono">1. Cookie Tecnici & Essenziali</span>
                        <span className="text-[9px] bg-white/10 text-white/60 font-mono px-1.5 py-0.5 uppercase">Sempre Attivi</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-normal font-light">
                        Indispensabili per consentire la navigazione del sito, la memorizzazione delle Vostre preferenze di accessibilità e la sicurezza delle sessioni.
                      </p>
                    </div>
                    <div className="w-10 h-5 flex items-center bg-[#f4700a]/30 rounded-full p-1 opacity-60">
                      <div className="w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center">
                        <Check className="w-2 h-2 text-[#f4700a]" />
                      </div>
                    </div>
                  </div>

                  {/* Analytical */}
                  <div className="p-3 bg-white/5 border border-white/10 flex items-start justify-between">
                    <div className="space-y-1 pr-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-white font-mono">2. Cookie Analitici & Statistici</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-normal font-light">
                        Ci aiutano a misurare e analizzare il traffico in forma totalmente anonimizzata e aggregata per migliorare l'esperienza e l'efficienza del sito.
                      </p>
                    </div>
                    <button
                      onClick={() => togglePreference('analytical')}
                      className={`w-10 h-5 flex items-center rounded-full p-1 transition-all duration-300 shrink-0 cursor-pointer ${
                        preferences.analytical ? 'bg-[#f4700a]' : 'bg-slate-700'
                      }`}
                    >
                      <div className="w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center transition-transform">
                        {preferences.analytical && <Check className="w-2 h-2 text-[#f4700a]" />}
                      </div>
                    </button>
                  </div>

                  {/* Marketing / Profiling */}
                  <div className="p-3 bg-white/5 border border-white/10 flex items-start justify-between">
                    <div className="space-y-1 pr-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-white font-mono">3. Cookie di Profilazione & Terze Parti</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-normal font-light">
                        Utilizzati per integrare funzionalità esterne avanzate (es. widget dell'assistente virtuale AI e mappe interattive Google Maps) che potrebbero tracciare dati di navigazione esterni.
                      </p>
                    </div>
                    <button
                      onClick={() => togglePreference('marketing')}
                      className={`w-10 h-5 flex items-center rounded-full p-1 transition-all duration-300 shrink-0 cursor-pointer ${
                        preferences.marketing ? 'bg-[#f4700a]' : 'bg-slate-700'
                      }`}
                    >
                      <div className="w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center">
                        {preferences.marketing && <Check className="w-2 h-2 text-[#f4700a]" />}
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-white/10">
              <div className="flex items-center space-x-1.5 order-2 sm:order-1">
                {!isCustomizing ? (
                  <button
                    onClick={() => setIsCustomizing(true)}
                    className="text-xs text-slate-300 hover:text-white underline transition-all font-mono py-2 px-3 hover:bg-white/5 cursor-pointer flex items-center space-x-1"
                  >
                    <span>Personalizza</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => setIsCustomizing(false)}
                    className="text-xs text-slate-300 hover:text-white underline transition-all font-mono py-2 px-3 hover:bg-white/5 cursor-pointer flex items-center space-x-1"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                    <span>Torna indietro</span>
                  </button>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-2 order-1 sm:order-2 w-full sm:w-auto">
                {!isCustomizing ? (
                  <>
                    <button
                      onClick={handleRejectAll}
                      className="w-full sm:w-auto px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white text-xs font-black uppercase tracking-widest border border-white/20 transition-all cursor-pointer font-mono"
                    >
                      Rifiuta Tutti
                    </button>
                    <button
                      onClick={handleAcceptAll}
                      className="w-full sm:w-auto px-5 py-2.5 bg-[#f4700a] hover:bg-orange-600 text-white text-xs font-black uppercase tracking-widest border border-[#f4700a] transition-all cursor-pointer font-mono shadow-md"
                    >
                      Accetta Tutti
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleSavePreferences}
                    className="w-full sm:w-auto px-5 py-2.5 bg-[#f4700a] hover:bg-orange-600 text-white text-xs font-black uppercase tracking-widest border border-[#f4700a] transition-all cursor-pointer font-mono shadow-md"
                  >
                    Salva Scelte
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
