import React from 'react';
import { Mail, Phone, MapPin, Award, CheckCircle, ArrowUpRight, Share2, Activity } from 'lucide-react';
import { ActiveTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  onLegalClick?: (docType: 'privacy' | 'cookie' | 'terms') => void;
  onSitemapClick?: () => void;
  onWebVitalsClick?: () => void;
}

export default function Footer({ setActiveTab, onLegalClick, onSitemapClick, onWebVitalsClick }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const shareUrl = typeof window !== 'undefined' && window.location ? window.location.origin : 'https://facilissimoweb.it';

  const handleLinkClick = (tabId: ActiveTab) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="app-footer" className="bg-[#0A192F] text-slate-300 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Presentation */}
          <div id="footer-brand" className="space-y-4 col-span-1 md:col-span-1">
            <div className="flex items-center space-x-3 text-white cursor-pointer group" onClick={() => handleLinkClick('home')}>
              <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
                <div className="absolute inset-0 border-2 border-[#4A90E2] rotate-45 transition-transform group-hover:rotate-90 duration-300"></div>
                <span className="font-mono font-bold text-xs tracking-widest text-white mt-[1px] ml-[1px]">F</span>
              </div>
              <span className="text-sm font-bold uppercase tracking-widest">
                FACILISSIMO <span className="text-[#4A90E2]">WEB</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              La Vostra professionista della comunicazione di riferimento per lo sviluppo e la consulenza di siti web ad elevate prestazioni. Coniugo competenze consolidate e soluzioni strategiche per massimizzare la Vostra conversione.
            </p>
            <div className="flex items-center space-x-2 text-[10px] text-[#4A90E2] font-bold uppercase tracking-wider bg-white/5 border border-white/10 px-3 py-2 rounded-none w-fit">
              <Award className="w-4 h-4 text-[#4A90E2]" />
              <span>Certified Social Lead's Manager</span>
            </div>
          </div>

          {/* Quick Links */}
          <div id="footer-links" className="space-y-4">
            <h3 className="text-white text-xs font-bold uppercase tracking-widest border-b border-white/10 pb-2">Navigazione</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button 
                  onClick={() => handleLinkClick('home')} 
                  className="hover:text-[#4A90E2] transition-colors duration-150 flex items-center space-x-1 cursor-pointer text-left"
                >
                  <span>Inizio (Home)</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('chi-sono')} 
                  className="hover:text-[#4A90E2] transition-colors duration-150 flex items-center space-x-1 cursor-pointer text-left"
                >
                  <span>Chi Sono (Biografia)</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('servizi')} 
                  className="hover:text-[#4A90E2] transition-colors duration-150 flex items-center space-x-1 cursor-pointer text-left"
                >
                  <span>Servizi & Processo</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('contatti')} 
                  className="hover:text-[#4A90E2] transition-colors duration-150 flex items-center space-x-1 cursor-pointer text-left"
                >
                  <span>Prenotazione & Contatti</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={onSitemapClick} 
                  className="hover:text-[#4A90E2] transition-colors duration-150 flex items-center space-x-1 cursor-pointer text-left font-bold text-[#4A90E2]"
                  id="footer-sitemap-btn"
                >
                  <span>Mappa del Sito (Sitemap)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Professional Engagements */}
          <div id="footer-services" className="space-y-4">
            <h3 className="text-white text-xs font-bold uppercase tracking-widest border-b border-white/10 pb-2">Il Vostro Successo</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-[#4A90E2] shrink-0 mt-0.5" />
                <span>Soluzioni Custom React/Vite</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-[#4A90E2] shrink-0 mt-0.5" />
                <span>Piattaforme CMS Ottimizzate</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-[#4A90E2] shrink-0 mt-0.5" />
                <span>Analisi Strategica del Funnel</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-[#4A90E2] shrink-0 mt-0.5" />
                <span>Trasparenza Etica nell'Uso di AI</span>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div id="footer-contact-info" className="space-y-4">
            <h3 className="text-white text-xs font-bold uppercase tracking-widest border-b border-white/10 pb-2">Contatti Diretti</h3>
            <ul className="space-y-3.5 text-xs sm:text-sm">
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#4A90E2] shrink-0" />
                <a href="mailto:facilissimoweb.mc@gmail.com" className="hover:text-[#4A90E2] transition-colors duration-150 break-all">
                  facilissimoweb.mc@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#4A90E2] shrink-0" />
                <a href="tel:+393793603321" className="hover:text-[#4A90E2] transition-colors duration-150">
                  +39 379 360 3321
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#4A90E2] shrink-0 mt-0.5" />
                <span>Servizio Attivo su Scala Nazionale ed Internazionale</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Modern Sharing Buttons Block */}
        <div id="footer-sharing-section" className="border-t border-white/10 mt-12 pt-8 text-center sm:text-left">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="space-y-1">
              <h4 className="text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center sm:justify-start gap-2">
                <Share2 className="w-4 h-4 text-[#4A90E2]" />
                <span>Condividete Facilissimo Web</span>
              </h4>
              <p className="text-[11px] text-slate-400">Consigliate i nostri servizi di Web Graphic Design strategico e Lead Generation ai vostri colleghi e contatti professionali.</p>
            </div>
            <div className="flex flex-wrap gap-2.5 justify-center">
              {/* WhatsApp */}
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent("Facilissimo Web di M. Teresa Rogani - Web Graphic Design Strategico e Lead Generation Certificata per lo sviluppo professionale della Vostra presenza digitale. Visita il sito: " + shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-600/10 hover:bg-emerald-600 hover:text-white text-emerald-400 text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20 transition-all cursor-pointer"
                title="Condividi su WhatsApp"
              >
                WhatsApp
              </a>

              {/* LinkedIn */}
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-700/10 hover:bg-blue-700 hover:text-white text-blue-400 text-[10px] font-bold uppercase tracking-widest border border-blue-500/20 transition-all cursor-pointer"
                title="Condividi su LinkedIn"
              >
                LinkedIn
              </a>

              {/* Facebook */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-800/10 hover:bg-blue-800 hover:text-white text-blue-500 text-[10px] font-bold uppercase tracking-widest border border-blue-500/20 transition-all cursor-pointer"
                title="Condividi su Facebook"
              >
                Facebook
              </a>

              {/* Twitter/X */}
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent("Siti web professionali ad elevate prestazioni con Facilissimo Web, di M. Teresa Rogani.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-slate-800/20 hover:bg-slate-800 hover:text-white text-slate-300 text-[10px] font-bold uppercase tracking-widest border border-slate-700/30 transition-all cursor-pointer"
                title="Condividi su Twitter/X"
              >
                Twitter / X
              </a>

              {/* Email */}
              <a
                href={`mailto:?subject=${encodeURIComponent("Consiglio Partner Digitale Strategico: Facilissimo Web")}&body=${encodeURIComponent("Ciao,\n\nti consiglio di esaminare i servizi offerti da Facilissimo Web (fondato da M. Teresa Rogani), un partner d'eccellenza per la progettazione visiva e la lead generation della tua impresa.\n\nSito web: " + shareUrl)}`}
                className="px-4 py-2 bg-rose-600/10 hover:bg-rose-600 hover:text-white text-rose-400 text-[10px] font-bold uppercase tracking-widest border border-rose-500/20 transition-all cursor-pointer"
                title="Consiglia via Email"
              >
                Invia per Email
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] uppercase tracking-wider text-slate-500 gap-4">
          <div id="footer-copyright" className="text-slate-500 text-center sm:text-left leading-relaxed">
            <p>&copy; {currentYear} FACILISSIMO WEB. Tutti i diritti riservati.</p>
            <p className="mt-1">P.IVA: 02136780430 | Sviluppato con standard d'eccellenza e soluzioni AI integrate.</p>
          </div>
          <div id="footer-legal-links" className="flex flex-wrap gap-4 mt-4 sm:mt-0 text-slate-500 shrink-0 justify-center sm:justify-end">
            <button onClick={() => onLegalClick && onLegalClick('privacy')} className="hover:text-slate-400 cursor-pointer bg-transparent border-none text-[10px] uppercase tracking-wider font-bold">Privacy Policy</button>
            <button onClick={() => onLegalClick && onLegalClick('cookie')} className="hover:text-slate-400 cursor-pointer bg-transparent border-none text-[10px] uppercase tracking-wider font-bold">Cookie Policy</button>
            <button onClick={() => onLegalClick && onLegalClick('terms')} className="hover:text-slate-400 cursor-pointer bg-transparent border-none text-[10px] uppercase tracking-wider font-bold">Termini di Servizio</button>
            {onWebVitalsClick && (
              <button 
                id="btn-web-vitals-toggle-mobile" 
                onClick={onWebVitalsClick} 
                className="text-[#bef264] hover:text-[#a3e635] cursor-pointer bg-transparent border-none text-[10px] uppercase tracking-wider font-bold flex items-center space-x-1.5"
                title="Monitor Core Web Vitals"
              >
                <Activity className="w-3.5 h-3.5 animate-pulse" />
                <span>Dev Performance</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
