import React, { useState, useEffect } from 'react';
import { ActiveTab } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import ChiSonoView from './components/ChiSonoView';
import ServiziView from './components/ServiziView';
import ContattiView from './components/ContattiView';
import NormativaView from './components/NormativaView';
import AccessibilityPanel from './components/AccessibilityPanel';
import ChatAssistant from './components/ChatAssistant';
import LegalModal, { LegalDocType } from './components/LegalModal';
import SitemapModal from './components/SitemapModal';
import WebVitalsOverlay from './components/WebVitalsOverlay';
import { Sparkles, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  
  // Accessibility and Theme States
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [textSize, setTextSize] = useState<string>('100'); // '100' | '110' | '121' | '135'
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [readableFont, setReadableFont] = useState<boolean>(false);
  const [accessibilityOpen, setAccessibilityOpen] = useState<boolean>(false);
  const [announcement, setAnnouncement] = useState<string>('');

  // 1. Initial mounting hook to parse URL path or hash on page load and listen to back/forward navigation
  useEffect(() => {
    const handleUrlChange = () => {
      // First try to parse path from window.location.pathname
      const rawPath = window.location.pathname.replace(/^\/|\/$/g, '');
      const path = rawPath as ActiveTab;
      // Second try to parse hash
      const hash = window.location.hash.replace('#', '') as ActiveTab;
      
      const validTabs: ActiveTab[] = ['home', 'chi-sono', 'servizi', 'contatti', 'normativa'];
      if (validTabs.includes(path)) {
        setActiveTab(path);
      } else if (validTabs.includes(hash)) {
        setActiveTab(hash);
      } else if (rawPath === '') {
        setActiveTab('home');
      }
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  // 2. Synchronize active tab changes with document titles, URL path/hash, and accessibility announcements
  useEffect(() => {
    // Scroll to top instantly when tab changes
    window.scrollTo(0, 0);
    try {
      window.scrollTo({ top: 0, behavior: 'instant' as any });
    } catch (e) {
      // fallback handled by previous call
    }

    // Sync state to URL pathname using history.pushState so Chrome/browsers detect true page navigation!
    const targetPath = activeTab === 'home' ? '/' : `/${activeTab}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ tab: activeTab }, '', targetPath);
    }

    // Also update hash for compatibility
    if (window.location.hash.replace('#', '') !== activeTab) {
      window.history.replaceState(null, '', `${targetPath}#${activeTab}`);
    }

    // Map activeTab to structured Titles for screen readers, browsers and SEO
    const titleMap: Record<ActiveTab, string> = {
      'home': 'Facilissimo Web | Web Graphic Design & Strategia di M. Teresa Rogani',
      'chi-sono': 'Chi Sono | M. Teresa Rogani - Web Graphic Designer e Alleata delle Imprese',
      'servizi': 'Servizi, Strategia e Lead Generation | Facilissimo Web',
      'normativa': 'Compliance Normativa, Accessibilità, AI Act e GDPR | Facilissimo Web',
      'contatti': 'Contatti, Consulenza Gratuita e Preventivo | Facilissimo Web'
    };
    document.title = titleMap[activeTab] || 'Facilissimo Web';

    // Map activeTab to explicit screen reader announcements
    const announcementMap: Record<ActiveTab, string> = {
      'home': 'Pagina Home caricata. Esplora i servizi e il design strategico.',
      'chi-sono': 'Pagina Chi Sono caricata. Scopri la professionalità e il percorso di M. Teresa Rogani.',
      'servizi': 'Pagina Servizi e Metodologia caricata. Scopri i servizi di design, strategia e lead generation.',
      'normativa': 'Pagina Compliance Normativa caricata. Approfondisci l\'Accessibilità Web, il GDPR e l\'AI Act.',
      'contatti': 'Pagina Contatti caricata. Compila il modulo di richiesta per richiedere un preventivo o una consulenza.'
    };
    setAnnouncement(announcementMap[activeTab] || 'Contenuto aggiornato.');
  }, [activeTab]);

  // 3. Accessibility: Focus the active view container when navigation occurs
  useEffect(() => {
    const timer = setTimeout(() => {
      const containerId = `${activeTab}-view`;
      const element = document.getElementById(containerId);
      if (element) {
        element.setAttribute('tabindex', '-1');
        element.focus({ preventScroll: true });
      }
    }, 120);
    return () => clearTimeout(timer);
  }, [activeTab]);

  // Global Legal Modal States
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState<LegalDocType>('privacy');
  const [sitemapOpen, setSitemapOpen] = useState(false);

  const handleOpenLegal = (docType: LegalDocType) => {
    setSelectedDocType(docType);
    setLegalModalOpen(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView setActiveTab={setActiveTab} />;
      case 'chi-sono':
        return <ChiSonoView setActiveTab={setActiveTab} />;
      case 'servizi':
        return <ServiziView setActiveTab={setActiveTab} />;
      case 'contatti':
        return <ContattiView />;
      case 'normativa':
        return <NormativaView setActiveTab={setActiveTab} />;
      default:
        return <HomeView setActiveTab={setActiveTab} />;
    }
  };

  // Build the responsive classes string for the entire site container based on accessibility state
  const containerClasses = [
    "min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-indigo-600 selection:text-white transition-all duration-300",
    darkMode ? "dark" : "",
    highContrast ? "high-contrast-active" : "",
    readableFont ? "readable-font-active" : "",
    textSize === '110' ? "zoom-110" : "",
    textSize === '121' ? "zoom-121" : "",
    textSize === '135' ? "zoom-135" : "",
  ].filter(Boolean).join(" ");

  return (
    <div id="app-root-container" className={containerClasses}>
      {/* Dev-tool Overlay for Core Web Vitals */}
      <WebVitalsOverlay />

      {/* Dynamic Upper Accent Ribbon */}
      <div id="accent-ribbon" className="w-full bg-slate-950 text-slate-300 py-2.5 px-4 text-center text-xs border-b border-slate-900 flex justify-center items-center space-x-3">
        <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
        <span className="font-semibold tracking-wide">
          Sinergia Tecnologica: Scoprite la trasparenza etica dei miei processi integrati con l'Intelligenza Artificiale.
        </span>
        <button 
          onClick={() => {
            setActiveTab('servizi');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-amber-400 font-bold hover:underline inline-flex items-center space-x-1 pl-2 text-[11px] uppercase tracking-wider"
        >
          <span>Approfondisci</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Main Navigation Bar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        accessibilityOpen={accessibilityOpen}
        setAccessibilityOpen={setAccessibilityOpen}
      />

      {/* Main Content Area */}
      <main id="app-main-content" className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Interactive Banner before Footer */}
      <section id="trust-banner" className="bg-white border-t border-b border-slate-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-3.5">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Garantito da Standard Elevati</h4>
              <p className="text-xs text-slate-500">
                Pianificazione e collaudi ad alta affidabilità per garantire stabilità e scalabilità nel tempo.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3.5">
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Ecosistema AI Trasparente</h4>
              <p className="text-xs text-slate-500">
                L'Intelligenza Artificiale al Vostro servizio per un incremento tangibile dell'efficienza dei costi di sviluppo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Shared Footer */}
      <Footer 
        setActiveTab={setActiveTab} 
        onLegalClick={handleOpenLegal} 
        onSitemapClick={() => setSitemapOpen(true)}
      />

      {/* Floating Accessibility Panel */}
      <AccessibilityPanel
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        textSize={textSize}
        setTextSize={setTextSize}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        readableFont={readableFont}
        setReadableFont={setReadableFont}
        isOpen={accessibilityOpen}
        setIsOpen={setAccessibilityOpen}
      />

      {/* Global Interactive AI Chat Assistant */}
      <ChatAssistant setActiveTab={setActiveTab} />

      {/* Global Interactive Legal Document Modal */}
      <LegalModal 
        isOpen={legalModalOpen} 
        docType={selectedDocType} 
        onClose={() => setLegalModalOpen(false)} 
      />

      {/* Global Interactive Sitemap Modal */}
      <SitemapModal
        isOpen={sitemapOpen}
        onClose={() => setSitemapOpen(false)}
        setActiveTab={setActiveTab}
        onLegalClick={handleOpenLegal}
      />

      {/* Dynamic Voice/Screen Reader Announcement Hook */}
      <div className="sr-only" aria-live="assertive" aria-atomic="true">
        {announcement}
      </div>
    </div>
  );
}
