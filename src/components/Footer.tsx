import React from 'react';
import { Mail, Phone, MapPin, Award, CheckCircle, ArrowUpRight, Share2, Activity, Facebook, Linkedin, Twitter, MessageCircle } from 'lucide-react';
import { ActiveTab } from '../types';
import brandLogoImg from '../assets/images/regenerated_image_1782982577389.png';
import footerBgImg from '../assets/images/fw footer 2.png';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  onLegalClick?: (docType: 'privacy' | 'cookie' | 'terms') => void;
  onSitemapClick?: () => void;
  onWebVitalsClick?: () => void;
}

export default function Footer({ setActiveTab, onLegalClick, onSitemapClick, onWebVitalsClick }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const shareUrl = typeof window !== 'undefined' && window.location ? window.location.origin : 'https://facilissimoweb.it';

  const [parallaxOffset, setParallaxOffset] = React.useState(0);
  const footerRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (footerRef.current) {
            const rect = footerRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            // Calculate how far the footer is relative to the bottom of the viewport
            const relativeOffset = (rect.top - viewportHeight) * 0.18;
            setParallaxOffset(relativeOffset);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial run
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLinkClick = (tabId: ActiveTab) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      ref={footerRef}
      id="app-footer" 
      className="relative text-white border-t border-white/10 overflow-hidden"
    >
      {/* Parallax Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img 
          src={footerBgImg} 
          alt="Footer Background Path" 
          className="absolute left-0 w-full h-[150%] object-cover object-center scale-105"
          style={{
            transform: `translate3d(0, ${parallaxOffset}px, 0)`,
            willChange: 'transform'
          }}
          referrerPolicy="no-referrer"
        />
        {/* Semi-transparent soft orange gradient overlay to tint the image slightly, keeping white text readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#f4700a]/50 via-[#e56f28]/40 to-[#d69429]/50" />
        <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Presentation */}
          <div id="footer-brand" className="space-y-4 col-span-1 md:col-span-1">
            <div className="flex items-center space-x-3 text-white cursor-pointer group" onClick={() => handleLinkClick('home')}>
              <div className="w-10 h-10 flex items-center justify-center transition-all duration-300 group-hover:scale-105 shrink-0">
                <img 
                  src={brandLogoImg} 
                  alt="Facilissimo Web Logo" 
                  className="max-w-full max-h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-sm font-black uppercase tracking-widest text-white">
                FACILISSIMO <span className="text-white font-black">WEB</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-white font-medium leading-relaxed">
              La Vostra professionista della comunicazione di riferimento per lo sviluppo e la consulenza di siti web ad elevate prestazioni. Coniugo competenze consolidate e soluzioni strategiche per massimizzare la Vostra conversione.
            </p>
            <div className="flex items-center space-x-2 text-[10px] text-white font-black uppercase tracking-wider bg-white/5 border border-white/10 px-3 py-2 rounded-none w-fit">
              <Award className="w-4 h-4 text-white" />
              <span>Certified Social Lead's Manager</span>
            </div>
          </div>

          {/* Quick Links */}
          <div id="footer-links" className="space-y-4">
            <h3 className="text-white text-xs font-black uppercase tracking-widest border-b border-white/20 pb-2">Navigazione</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-white">
              <li>
                <button 
                  onClick={() => handleLinkClick('home')} 
                  className="hover:text-[#f4700a] hover:underline transition-colors duration-150 flex items-center space-x-1 cursor-pointer text-left text-white"
                >
                  <span>Inizio (Home)</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('chi-sono')} 
                  className="hover:text-[#f4700a] hover:underline transition-colors duration-150 flex items-center space-x-1 cursor-pointer text-left text-white"
                >
                  <span>Chi Sono (Biografia)</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('servizi')} 
                  className="hover:text-[#f4700a] hover:underline transition-colors duration-150 flex items-center space-x-1 cursor-pointer text-left text-white"
                >
                  <span>Servizi & Processo</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('contatti')} 
                  className="hover:text-[#f4700a] hover:underline transition-colors duration-150 flex items-center space-x-1 cursor-pointer text-left text-white"
                >
                  <span>Prenotazione & Contatti</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={onSitemapClick} 
                  className="hover:text-[#f4700a] hover:underline transition-colors duration-150 flex items-center space-x-1 cursor-pointer text-left font-black text-white"
                  id="footer-sitemap-btn"
                >
                  <span>Mappa del Sito (Sitemap)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Professional Engagements */}
          <div id="footer-services" className="space-y-4">
            <h3 className="text-white text-xs font-black uppercase tracking-widest border-b border-white/20 pb-2">Il Vostro Successo</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-white">
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span>Soluzioni Custom React/Vite</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span>Piattaforme CMS Ottimizzate</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span>Analisi Strategica del Funnel</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span>Trasparenza Etica nell'Uso di AI</span>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div id="footer-contact-info" className="space-y-4">
            <h3 className="text-white text-xs font-black uppercase tracking-widest border-b border-white/20 pb-2">Contatti Diretti</h3>
            <ul className="space-y-3.5 text-xs sm:text-sm font-medium text-white">
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-white shrink-0" />
                <a href="mailto:facilissimoweb.mc@gmail.com" className="hover:text-[#f4700a] hover:underline transition-colors duration-150 break-all text-white">
                  facilissimoweb.mc@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-white shrink-0" />
                <a href="tel:+393793603321" className="hover:text-[#f4700a] hover:underline transition-colors duration-150 text-white">
                  +39 379 360 3321
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <span>Servizio Attivo su Scala Nazionale ed Internazionale</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Modern Sharing Buttons Block */}
        <div id="footer-sharing-section" className="border-t border-white/10 mt-12 pt-8 text-center sm:text-left">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="space-y-1">
              <h4 className="text-white text-xs font-black uppercase tracking-widest flex items-center justify-center sm:justify-start gap-2">
                <Share2 className="w-4 h-4 text-white" />
                <span>Condividete Facilissimo Web</span>
              </h4>
              <p className="text-[11px] text-white font-medium">Consigliate i nostri servizi di Web Graphic Design strategico e Lead Generation ai vostri colleghi e contatti professionali.</p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              {/* WhatsApp */}
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent("Facilissimo Web di M. Teresa Rogani - Web Graphic Design Strategico e Lead Generation Certificata per lo sviluppo professionale della Vostra presenza digitale. Visita il sito: " + shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: '#25D366' }}
                className="flex items-center justify-center w-10 h-10 rounded-full text-white transition-all hover:scale-105 cursor-pointer shadow-lg"
                title="Condividi su WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>

              {/* LinkedIn */}
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: '#0077B5' }}
                className="flex items-center justify-center w-10 h-10 rounded-full text-white transition-all hover:scale-105 cursor-pointer shadow-lg"
                title="Condividi su LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>

              {/* Facebook */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: '#1877F2' }}
                className="flex items-center justify-center w-10 h-10 rounded-full text-white transition-all hover:scale-105 cursor-pointer shadow-lg"
                title="Condividi su Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>

              {/* Twitter/X */}
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent("Siti web professionali ad elevate prestazioni con Facilissimo Web, di M. Teresa Rogani.")}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: '#000000' }}
                className="flex items-center justify-center w-10 h-10 rounded-full text-white transition-all hover:scale-105 cursor-pointer shadow-lg"
                title="Condividi su Twitter/X"
              >
                <Twitter className="w-5 h-5" />
              </a>

              {/* Email */}
              <a
                href={`mailto:?subject=${encodeURIComponent("Consiglio Partner Digitale Strategico: Facilissimo Web")}&body=${encodeURIComponent("Ciao,\n\nti consiglio di esaminare i servizi offerti da Facilissimo Web (fondato da M. Teresa Rogani), un partner d'eccellenza per la progettazione visiva e la lead generation della tua impresa.\n\nSito web: " + shareUrl)}`}
                style={{ backgroundColor: '#EA4335' }}
                className="flex items-center justify-center w-10 h-10 rounded-full text-white transition-all hover:scale-105 cursor-pointer shadow-lg"
                title="Consiglia via Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div 
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            paddingTop: '35px',
            marginLeft: '0px',
            paddingLeft: '23px',
            paddingBottom: '28px'
          }}
          className="border-t border-white/10 mt-12 flex flex-col gap-6 w-full text-[10px] uppercase tracking-wider text-white font-extrabold"
        >
          <div id="footer-copyright" className="text-white text-left w-full leading-relaxed space-y-3">
            <p
              style={{
                paddingBottom: '3px',
                paddingTop: '0px',
                paddingRight: '26px',
                textAlign: 'center'
              }}
            >
              &copy; {currentYear} FACILISSIMO WEB di Maria Teresa Rogani. Tutti i diritti di proprietà intellettuale, design visivo, codice sorgente e layout d'interfaccia sono riservati in tutta l'Unione Europea. Ogni utilizzo non autorizzato sarà perseguito a norma di legge.
            </p>
            <hr className="border-white/10 w-full" />
            <p
              style={{
                marginLeft: '-7px',
                paddingTop: '6px',
                paddingBottom: '8px',
                marginRight: '26px',
                paddingLeft: '8px',
                textAlign: 'center'
              }}
            >
              P.IVA: 02136780430 | Partner Digitale Strategico con sede operativa in Italia. Sviluppato e ottimizzato secondo i più elevati standard tecnologici internazionali del W3C per massimizzare la velocità di caricamento, l'accessibilità digitale e i tassi di conversione della lead generation strategica attraverso soluzioni di Intelligenza Artificiale d'avanguardia integrate.
            </p>
          </div>
          <div id="footer-legal-links" className="flex flex-wrap gap-4 pt-4 border-t border-white/10 w-full justify-start text-white">
            <button onClick={() => onLegalClick && onLegalClick('privacy')} className="hover:text-[#f4700a] cursor-pointer bg-transparent border-none text-[10px] uppercase tracking-wider font-black text-white">Privacy Policy</button>
            <button onClick={() => onLegalClick && onLegalClick('cookie')} className="hover:text-[#f4700a] cursor-pointer bg-transparent border-none text-[10px] uppercase tracking-wider font-black text-white">Cookie Policy</button>
            <button onClick={() => onLegalClick && onLegalClick('terms')} className="hover:text-[#f4700a] cursor-pointer bg-transparent border-none text-[10px] uppercase tracking-wider font-black text-white">Termini di Servizio</button>
            {onWebVitalsClick && (
              <button 
                id="btn-web-vitals-toggle-mobile" 
                onClick={onWebVitalsClick} 
                className="text-white hover:text-[#f4700a] cursor-pointer bg-transparent border-none text-[10px] uppercase tracking-wider font-black flex items-center space-x-1.5"
                title="Monitor Core Web Vitals"
              >
                <Activity className="w-3.5 h-3.5 animate-pulse text-white" />
                <span>Dev Performance</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
