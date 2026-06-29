import React from 'react';
import { X, Network, ExternalLink, Compass } from 'lucide-react';
import { ActiveTab } from '../types';

interface SitemapModalProps {
  isOpen: boolean;
  onClose: () => void;
  setActiveTab: (tab: ActiveTab) => void;
  onLegalClick: (docType: 'privacy' | 'cookie' | 'terms') => void;
}

export default function SitemapModal({ isOpen, onClose, setActiveTab, onLegalClick }: SitemapModalProps) {
  if (!isOpen) return null;

  const handleNavigate = (tab: ActiveTab) => {
    setActiveTab(tab);
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sections = [
    {
      title: "1. Sezioni Principali",
      items: [
        { name: "Home (Inizio)", tab: 'home' as ActiveTab, desc: "Presentazione e core-value della digital partner." },
        { name: "Chi Sono (Biografia)", tab: 'chi-sono' as ActiveTab, desc: "Il profilo strategico di M. Teresa Rogani e il suo metodo." },
        { name: "Servizi & Processo", tab: 'servizi' as ActiveTab, desc: "Servizi di Web Graphic Design e Lead Generation certificata." },
        { name: "Normativa & Compliance", tab: 'normativa' as ActiveTab, desc: "La Vostra guida strategica agli adempimenti di accessibilità, e-commerce e AI Act." },
        { name: "Contatti & Prenotazione", tab: 'contatti' as ActiveTab, desc: "Modulo di prenotazione per sessione strategica gratuita." }
      ]
    },
    {
      title: "2. Approfondimenti & Legal",
      items: [
        { name: "Privacy Policy", action: () => { onLegalClick('privacy'); onClose(); }, desc: "Trattamento etico e legale dei dati aziendali." },
        { name: "Cookie Policy", action: () => { onLegalClick('cookie'); onClose(); }, desc: "Configurazione e informativa sui cookie di navigazione." },
        { name: "Termini di Servizio", action: () => { onLegalClick('terms'); onClose(); }, desc: "Regolamentazione del rapporto contrattuale." }
      ]
    },
    {
      title: "3. File Tecnologici",
      items: [
        { name: "sitemap.xml", href: "/sitemap.xml", desc: "La sitemap XML ufficiale inviata ai motori di ricerca per l'indicizzazione." }
      ]
    }
  ];

  return (
    <div id="sitemap-modal-root" className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Dialog container */}
      <div 
        id="sitemap-modal-body"
        className="relative bg-white dark:bg-[#0d1e36] border-2 border-[#0A192F] dark:border-[#4A90E2] shadow-2xl p-6 md:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slideUp text-left"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-200 dark:border-white/10 pb-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#0A192F] dark:bg-[#4A90E2] text-white">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#4A90E2]">ARCHITETTURA SITO</h3>
              <p className="text-lg font-black uppercase text-[#0A192F] dark:text-white leading-none mt-1">MAPPA DEL SITO (SITEMAP)</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/5 text-[#0A192F] dark:text-slate-300 transition-colors"
            aria-label="Chiudi mappa del sito"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed uppercase tracking-wider font-semibold">
            Esplorate tutte le risorse digitali e le sezioni strategiche di Facilissimo Web per orientare la Vostra navigazione.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {sections.map((sect, idx) => (
              <div key={idx} className="space-y-3">
                <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#4A90E2] border-b border-slate-100 dark:border-white/5 pb-1">
                  {sect.title}
                </h4>
                <div className="space-y-2">
                  {sect.items.map((item, itemIdx) => {
                    const buttonClasses = "w-full text-left p-2.5 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-100 dark:border-white/5 transition-all text-[#0A192F] dark:text-slate-200 block cursor-pointer group";
                    
                    if (item.tab) {
                      return (
                        <button
                          key={itemIdx}
                          onClick={() => handleNavigate(item.tab)}
                          className={buttonClasses}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-extrabold uppercase tracking-wider group-hover:text-[#4A90E2]">{item.name}</span>
                            <Compass className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#4A90E2] transition-colors" />
                          </div>
                          <p className="text-[10px] text-slate-400 mt-1">{item.desc}</p>
                        </button>
                      );
                    } else if (item.action) {
                      return (
                        <button
                          key={itemIdx}
                          onClick={item.action}
                          className={buttonClasses}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-extrabold uppercase tracking-wider group-hover:text-[#4A90E2]">{item.name}</span>
                            <Compass className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#4A90E2] transition-colors" />
                          </div>
                          <p className="text-[10px] text-slate-400 mt-1">{item.desc}</p>
                        </button>
                      );
                    } else {
                      return (
                        <a
                          key={itemIdx}
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className={buttonClasses}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">{item.name}</span>
                            <ExternalLink className="w-3.5 h-3.5 text-emerald-500" />
                          </div>
                          <p className="text-[10px] text-slate-400 mt-1">{item.desc}</p>
                        </a>
                      );
                    }
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-slate-200 dark:border-white/10 text-center">
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
            FACILISSIMO WEB &copy; {new Date().getFullYear()} • Architettura Web Performante
          </p>
        </div>
      </div>
    </div>
  );
}
