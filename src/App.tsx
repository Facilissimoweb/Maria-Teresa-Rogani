import React, { useState, useEffect } from 'react';
import { ActiveTab } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import ChiSonoView from './components/ChiSonoView';
import ServiziView from './components/ServiziView';
import ContattiView from './components/ContattiView';
import NormativaView from './components/NormativaView';
import BlogView from './components/BlogView';
import SheetsDashboard from './components/SheetsDashboard';
import AccessibilityPanel from './components/AccessibilityPanel';
import ChatAssistant from './components/ChatAssistant';
import LegalModal, { LegalDocType } from './components/LegalModal';
import SitemapModal from './components/SitemapModal';
import WebVitalsOverlay from './components/WebVitalsOverlay';
import { Sparkles, ArrowRight, ShieldCheck, Cpu, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Monitor auth state to determine admin status in real-time
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email) {
        setUserEmail(user.email);
        setIsAdmin(user.email === 'facilissimoweb.mc@gmail.com');
      } else {
        setUserEmail(null);
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);
  
  // Accessibility and Theme States
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [textSize, setTextSize] = useState<string>('100'); // '100' | '110' | '121' | '135'
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [readableFont, setReadableFont] = useState<boolean>(false);
  const [accessibilityOpen, setAccessibilityOpen] = useState<boolean>(false);
  const [announcement, setAnnouncement] = useState<string>('');
  const [webVitalsOpen, setWebVitalsOpen] = useState<boolean>(false);
  const [showAccent, setShowAccent] = useState<boolean>(true);
  const lastScrollY = React.useRef<number>(0);

  // Scroll listener to show accent ribbon on scroll up and hide on scroll down (mobile only)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 20) {
        setShowAccent(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down
        setShowAccent(false);
      } else {
        // Scrolling up
        setShowAccent(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 1. Initial mounting hook to parse URL path or hash on page load and listen to back/forward navigation
  useEffect(() => {
    const handleUrlChange = () => {
      const rawPath = window.location.pathname.replace(/^\/|\/$/g, '');
      const hash = window.location.hash.replace('#', '');
      
      const urlParams = new URLSearchParams(window.location.search);
      const queryArticle = urlParams.get('article');

      const validTabs: ActiveTab[] = ['home', 'chi-sono', 'servizi', 'blog', 'contatti', 'normativa', 'fogli'];
      const articleIds = ['ai-act-web-design', 'lead-gen-social-strategy', 'accessibilita-web-business'];

      // Extract article ID from subpath like blog/ai-act-web-design, query string, or hash
      let urlArticleId: string | null = null;
      if (rawPath.startsWith('blog/')) {
        const parts = rawPath.split('/');
        if (parts.length > 1 && articleIds.includes(parts[1])) {
          urlArticleId = parts[1];
        }
      } else if (articleIds.includes(rawPath)) {
        urlArticleId = rawPath;
      } else if (hash && articleIds.includes(hash)) {
        urlArticleId = hash;
      } else if (queryArticle && articleIds.includes(queryArticle)) {
        urlArticleId = queryArticle;
      }

      if (urlArticleId) {
        setActiveTab('blog');
      } else {
        // Match general tabs
        const mainPath = rawPath.split('/')[0];
        if (validTabs.includes(mainPath as ActiveTab)) {
          setActiveTab(mainPath as ActiveTab);
        } else if (validTabs.includes(hash as ActiveTab)) {
          setActiveTab(hash as ActiveTab);
        } else if (rawPath === '') {
          setActiveTab('home');
        }
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
      'blog': 'Blog, Risorse e Strategia Digitale | Facilissimo Web',
      'normativa': 'Compliance Normativa, Accessibilità, AI Act e GDPR | Facilissimo Web',
      'contatti': 'Contatti, Consulenza Gratuita e Preventivo | Facilissimo Web',
      'fogli': 'Integrazione Google Sheets & Workspace | Facilissimo Web'
    };
    document.title = titleMap[activeTab] || 'Facilissimo Web';

    // Map activeTab to explicit screen reader announcements
    const announcementMap: Record<ActiveTab, string> = {
      'home': 'Pagina Home caricata. Esplora i servizi e il design strategico.',
      'chi-sono': 'Pagina Chi Sono caricata. Scopri la professionalità e il percorso di M. Teresa Rogani.',
      'servizi': 'Pagina Servizi e Metodologia caricata. Scopri i servizi di design, strategia e lead generation.',
      'blog': 'Pagina Blog caricata. Leggi le ultime risorse, novità e guide strategiche.',
      'normativa': 'Pagina Compliance Normativa caricata. Approfondisci l\'Accessibilità Web, il GDPR e l\'AI Act.',
      'contatti': 'Pagina Contatti caricata. Compila il modulo di richiesta per richiedere un preventivo o una consulenza.',
      'fogli': 'Pagina Integrazione Google Sheets caricata. Gestisci l\'acquisizione dei contatti e sincronizza i fogli Google.'
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
      case 'blog':
        return <BlogView setActiveTab={setActiveTab} />;
      case 'normativa':
        return <NormativaView setActiveTab={setActiveTab} />;
      case 'fogli':
        return <SheetsDashboard />;
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
    <div id="app-root-container" className={`${containerClasses} lg:h-screen lg:overflow-hidden lg:grid lg:grid-cols-[1fr_280px] lg:grid-rows-[auto_1fr] bg-[#131311]`}>
      {/* Dev-tool Overlay for Core Web Vitals */}
      <WebVitalsOverlay isOpen={webVitalsOpen} setIsOpen={setWebVitalsOpen} />

      {/* Sidebar Right - Desktop only */}
      <aside className="hidden lg:flex lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-3 border-l border-white/10 flex-col p-8 bg-[#131311] text-white select-none">
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/50 mb-12">
          Facilissimo Web — [v2.0]
        </div>
        <nav className="flex-grow flex flex-col space-y-2">
          {[
            { id: 'home', label: '01 Home' },
            { id: 'chi-sono', label: '02 Chi Sono' },
            { id: 'servizi', label: '03 Servizi' },
            { id: 'normativa', label: '04 Compliance' },
            { id: 'blog', label: '05 Blog', badge: true },
            ...(isAdmin ? [{ id: 'fogli', label: '06 Area Riservata' }] : []),
            { id: 'contatti', label: '07 Contatti' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id as ActiveTab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`w-full text-left py-4 border-b border-white/5 text-xs font-mono tracking-[0.15em] uppercase transition-colors duration-150 cursor-pointer flex items-center justify-between ${
                activeTab === item.id 
                  ? 'text-[#d69429] font-bold border-b-[#d69429]' 
                  : item.id === 'blog' 
                    ? 'text-amber-500 hover:text-amber-400'
                    : 'text-white/55 hover:text-white'
              }`}
            >
              <span>{item.label}</span>
              {item.badge && (
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping shrink-0" />
              )}
            </button>
          ))}
        </nav>
        <div className="font-mono text-[10px] text-white/40 tracking-[0.15em] leading-relaxed uppercase mt-auto">
          Strategic Digital Partner<br />
          M. Teresa Rogani
        </div>
      </aside>

      {/* Header - Desktop only */}
      <header className="hidden lg:flex lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-2 border-b border-white/10 p-6 justify-between items-center bg-[#131311] text-white">
        <div className="px-2 py-0.5 border border-[#d69429] text-[#d69429] font-mono text-[9px] uppercase tracking-wider">
          Consapevolezza AI
        </div>
        <div className="flex items-center space-x-6 text-xs font-mono text-white/50 uppercase tracking-[0.15em]">
          <span className="cursor-pointer hover:text-white transition-colors" onClick={() => handleOpenLegal('privacy')}>Privacy Policy</span>
          <span className="cursor-pointer hover:text-white transition-colors" onClick={() => setSitemapOpen(true)}>Sitemap</span>
        </div>
      </header>

      {/* Dynamic Upper Accent Ribbon - Mobile only */}
      <div 
        id="accent-ribbon" 
        className="w-full lg:hidden bg-slate-950 text-slate-200 text-center uppercase tracking-[0.25em] border-b border-slate-900 flex justify-center items-center sticky top-0 z-50 transition-transform duration-300 ease-in-out select-none"
        style={{ 
          height: '36px',
          transform: showAccent ? 'translateY(0)' : 'translateY(-100%)',
          fontSize: '15px',
          fontFamily: 'Anton, sans-serif',
          lineHeight: '14px',
          fontStyle: 'italic'
        }}
      >
        FACILISSIMO WEB
      </div>

      {/* Main Navigation Bar - Mobile only */}
      <div 
        className="lg:hidden sticky z-40 transition-all duration-300 ease-in-out"
        style={{ 
          top: showAccent ? '36px' : '0px'
        }}
      >
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
          accessibilityOpen={accessibilityOpen}
          setAccessibilityOpen={setAccessibilityOpen}
          isAdmin={isAdmin}
        />
      </div>

      {/* Main Content Area */}
      <main id="app-main-content" className="flex-grow lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3 lg:overflow-y-auto lg:scrollbar-none bg-[#111113]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="flex flex-col min-h-full justify-between"
          >
            <div>
              {renderContent()}
            </div>

            <div>
              {/* Global Interactive Banner before Footer - Mobile only */}
              <section id="trust-banner" className="lg:hidden bg-white border-t border-b border-slate-100 py-8">
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

              {/* Shared Full Footer for both Desktop and Mobile */}
              <Footer 
                setActiveTab={setActiveTab} 
                onLegalClick={handleOpenLegal} 
                onSitemapClick={() => setSitemapOpen(true)}
                onWebVitalsClick={() => setWebVitalsOpen(!webVitalsOpen)}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

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
