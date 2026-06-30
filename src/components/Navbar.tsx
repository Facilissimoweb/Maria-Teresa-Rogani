import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, ArrowRight, Sun, Moon, Accessibility } from 'lucide-react';
import { ActiveTab } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  darkMode?: boolean;
  setDarkMode?: (val: boolean) => void;
  accessibilityOpen?: boolean;
  setAccessibilityOpen?: (val: boolean) => void;
}

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  darkMode = false, 
  setDarkMode,
  accessibilityOpen = false,
  setAccessibilityOpen
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [activeLang, setActiveLang] = useState(() => {
    try {
      const match = document.cookie.match(/googtrans=([^;]+)/);
      if (match && match[1]) {
        const parts = decodeURIComponent(match[1]).split('/');
        const code = parts[parts.length - 1];
        if (code) return code;
      }
    } catch (e) {
      console.error(e);
    }
    return 'it';
  });

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'chi-sono', label: 'Chi Sono' },
    { id: 'servizi', label: 'Servizi' },
    { id: 'normativa', label: 'Compliance' },
    { id: 'contatti', label: 'Contatti' },
  ] as const;

  const languages = [
    { code: 'it', label: 'ITA', flag: '🇮🇹' },
    { code: 'en', label: 'ENG', flag: '🇬🇧' },
    { code: 'es', label: 'ESP', flag: '🇪🇸' },
    { code: 'fr', label: 'FRA', flag: '🇫🇷' },
    { code: 'de', label: 'DEU', flag: '🇩🇪' },
    { code: 'zh-CN', label: 'CHN', flag: '🇨🇳' },
    { code: 'ar', label: 'ARA', flag: '🇸🇦' },
    { code: 'pt', label: 'POR', flag: '🇵🇹' },
    { code: 'ru', label: 'RUS', flag: '🇷🇺' },
    { code: 'ja', label: 'JPN', flag: '🇯🇵' },
  ] as const;

  useEffect(() => {
    // Initialize Google Translate
    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: 'it',
          includedLanguages: 'it,en,es,fr,de,zh-CN,ar,pt,ru,ja',
          layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: true,
        },
        'google_translate_element'
      );
    };

    // Load Google Translate JS script
    const existingScript = document.getElementById('google-translate-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.id = 'google-translate-script';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Synchronize HTML lang attribute dynamically with activeLang to prevent language mismatches
  useEffect(() => {
    if (activeLang) {
      document.documentElement.setAttribute('lang', activeLang);
    }
  }, [activeLang]);

  const handleLanguageChange = (langCode: string) => {
    // 1. Force cookie setting so Google Translate picks it up on load
    // Crucial for iframes: Use SameSite=None and Secure so standard Chrome/Safari privacy policies don't block translation inside AI Studio preview iframes!
    const cookieValue = `/it/${langCode}`;
    const secureSuffix = '; path=/; SameSite=None; Secure;';
    
    document.cookie = `googtrans=${cookieValue}${secureSuffix}`;
    document.cookie = `googtrans=${cookieValue}; domain=${window.location.hostname}${secureSuffix}`;
    document.cookie = `googtrans=${cookieValue}; domain=.${window.location.hostname}${secureSuffix}`;
    
    // Fallback: if we are on a subdomain (e.g., Cloud Run), also set cookie on apex domain if possible
    const hostParts = window.location.hostname.split('.');
    if (hostParts.length > 2) {
      const domainValue = `.${hostParts.slice(-2).join('.')}`;
      document.cookie = `googtrans=${cookieValue}; domain=${domainValue}${secureSuffix}`;
    }

    // 2. Also attempt combo selection if already rendered
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change'));
    }
    
    setActiveLang(langCode);
    setIsLangOpen(false);

    // 3. Reload after a brief delay to force standard, bulletproof re-translation of the entire DOM structure
    setTimeout(() => {
      window.location.reload();
    }, 150);
  };

  const handleNavClick = (tabId: ActiveTab) => {
    setActiveTab(tabId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentLang = languages.find(l => l.code === activeLang) || { code: 'it', label: 'ITA', flag: '🇮🇹' };

  return (
    <header id="app-navbar" className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm backdrop-blur-md bg-opacity-95 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div 
            id="brand-logo" 
            className="flex items-center space-x-2 sm:space-x-4 cursor-pointer group shrink-0"
            onClick={() => handleNavClick('home')}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#0A192F] dark:bg-[#4A90E2] rotate-45 flex items-center justify-center transition-transform duration-300 group-hover:rotate-[135deg] shadow-md shrink-0">
              <span className="-rotate-45 text-white font-bold text-[10px] sm:text-xs uppercase tracking-tighter block group-hover:rotate-[-135deg] transition-transform duration-300">FW</span>
            </div>
            <div>
              <span className="text-xs sm:text-lg font-extrabold tracking-[0.1em] sm:tracking-[0.18em] text-[#0A192F] dark:text-white block leading-none">
                <span className="sm:inline hidden">FACILISSIMO </span>
                <span className="sm:hidden inline">F.</span>
                <span className="text-[#4A90E2] font-black">WEB</span>
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#0A192F]/50 dark:text-slate-400 block font-bold mt-0.5 sm:mt-1 hidden sm:block">
                Strategic Digital Partner
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav id="desktop-navigation" className="hidden lg:flex flex-1 justify-between items-center ml-8 lg:ml-16">
            <div className="flex justify-between flex-1 max-w-md lg:max-w-xl mx-6">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                  className={`text-xs font-bold tracking-[0.2em] uppercase transition-all duration-200 relative py-2 cursor-pointer ${
                    activeTab === item.id
                      ? 'text-[#0A192F] dark:text-white border-b-2 border-[#0A192F] dark:border-[#4A90E2]'
                      : 'text-[#0A192F]/70 dark:text-slate-300 hover:text-[#0A192F] dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-1.5 lg:space-x-3 shrink-0">
              {/* Custom Globe Language Selector */}
              <div className="relative">
                <button
                  id="navbar-lang-toggle"
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="p-2 text-[#0A192F] dark:text-slate-200 hover:text-[#4A90E2] transition-colors rounded-none cursor-pointer flex items-center justify-center border border-transparent hover:border-slate-200/20"
                  title="Scegli la lingua / Choose language"
                  aria-label="Scegli la lingua"
                >
                  <span className="text-sm mr-1.5">{currentLang.flag}</span>
                  <span className="text-[10px] font-mono font-bold uppercase">{currentLang.label}</span>
                </button>
                
                {isLangOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsLangOpen(false)} />
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#0d1e36] border border-slate-200 dark:border-white/10 shadow-2xl py-1.5 z-50 rounded-2xl max-h-72 overflow-y-auto animate-fadeIn">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code)}
                          className={`w-full text-left px-4 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-slate-50 dark:hover:bg-white/5 transition-colors flex items-center justify-between cursor-pointer ${
                            activeLang === lang.code 
                              ? 'text-[#4A90E2] bg-slate-50 dark:bg-white/5' 
                              : 'text-[#0A192F] dark:text-slate-200'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <span className="text-base">{lang.flag}</span>
                            <span>{lang.label}</span>
                          </div>
                          {activeLang === lang.code && <span className="w-1.5 h-1.5 bg-[#4A90E2] rounded-full" />}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Quick Dark Mode Toggler */}
              {setDarkMode && (
                <button
                  id="navbar-dark-toggle"
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 text-[#0A192F] dark:text-slate-200 hover:text-[#4A90E2] transition-colors rounded-none cursor-pointer flex items-center justify-center border border-transparent hover:border-slate-200/20"
                  title={darkMode ? "Attiva modalità chiara" : "Attiva modalità scura"}
                  aria-label="Cambia tema chiaro/scuro"
                >
                  {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
                </button>
              )}

              {/* Accessibility Panel Toggle in Desktop Navbar */}
              {setAccessibilityOpen && (
                <button
                  id="navbar-accessibility-toggle"
                  onClick={() => setAccessibilityOpen(!accessibilityOpen)}
                  className={`p-2 transition-colors rounded-none cursor-pointer flex items-center justify-center border border-transparent hover:border-slate-200/20 ${
                    accessibilityOpen 
                      ? 'text-[#4A90E2] border-slate-200/20 bg-slate-50 dark:bg-white/5' 
                      : 'text-[#0A192F] dark:text-slate-200 hover:text-[#4A90E2]'
                  }`}
                  title="Navigazione Facilitata"
                  aria-label="Apri pannello di accessibilità"
                >
                  <Accessibility className="w-5 h-5" />
                </button>
              )}

              <button
                id="nav-cta-button"
                onClick={() => handleNavClick('contatti')}
                className="px-5 py-2.5 border-2 border-[#0A192F] dark:border-[#4A90E2] text-[10px] font-bold tracking-[0.2em] uppercase cursor-pointer hover:bg-[#0A192F] dark:hover:bg-[#4A90E2] hover:text-white dark:hover:text-slate-950 text-[#0A192F] dark:text-white transition-all duration-200"
              >
                Richiedi Consulenza
              </button>
            </div>
          </nav>

          {/* Mobile Menu Button & Toggler */}
          <div className="flex lg:hidden items-center space-x-1">
            {/* Mobile accessibility selector button */}
            {setAccessibilityOpen && (
              <button
                onClick={() => setAccessibilityOpen(!accessibilityOpen)}
                className={`p-1.5 transition-colors cursor-pointer ${
                  accessibilityOpen ? 'text-[#4A90E2]' : 'text-[#0A192F] dark:text-slate-200 hover:text-[#4A90E2]'
                }`}
                aria-label="Opzioni di Accessibilità"
                title="Accessibilità"
              >
                <Accessibility className="w-5 h-5" />
              </button>
            )}

            {/* Mobile language selector button */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="p-1.5 text-[#0A192F] dark:text-slate-200 hover:text-[#4A90E2] transition-colors cursor-pointer flex items-center justify-center space-x-1"
                aria-label="Cambia lingua"
                title="Lingua"
              >
                <span className="text-base">{currentLang.flag}</span>
                <span className="text-[10px] font-mono font-bold uppercase">{currentLang.label}</span>
              </button>
              {isLangOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsLangOpen(false)} />
                  <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-[#0d1e36] border border-slate-200 dark:border-white/10 shadow-xl py-1.5 z-50 rounded-2xl max-h-72 overflow-y-auto">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full text-left px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer flex items-center justify-between ${
                          activeLang === lang.code ? 'text-[#4A90E2]' : 'text-[#0A192F] dark:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">{lang.flag}</span>
                          <span>{lang.label}</span>
                        </div>
                        {activeLang === lang.code && <span className="w-1.5 h-1.5 bg-[#4A90E2] rounded-full" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {setDarkMode && (
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-1.5 text-[#0A192F] dark:text-slate-200 hover:text-[#4A90E2] transition-colors cursor-pointer"
                aria-label="Inverti tema"
              >
                {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
              </button>
            )}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#0A192F] dark:text-white hover:text-[#4A90E2] p-1.5 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Hidden google translate container that Google Translate API binds to */}
      <div id="google_translate_element" className="absolute -left-[9999px] -top-[9999px] w-px h-px overflow-hidden pointer-events-none opacity-0"></div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div id="mobile-nav-menu" className="lg:hidden bg-white border-b border-slate-200 animate-fadeIn transition-all duration-300">
          <div style={{ backgroundColor: '#ffffff' }} className="px-6 pt-2 pb-6 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                style={{ fontFamily: "'Poppins', sans-serif", fontSize: '15px' }}
                className={`block w-full text-left px-4 py-3 rounded text-xs font-bold tracking-[0.15em] uppercase transition-colors duration-150 cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-slate-50 dark:bg-white/5 text-[#0A192F] dark:text-white border-l-4 border-[#0A192F] dark:border-[#4A90E2]'
                    : 'text-[#0A192F]/70 dark:text-slate-300 hover:bg-slate-50 hover:text-[#0A192F]'
                }`}
              >
                {item.label}
              </button>
            ))}



            <div className="pt-4">
              <button
                id="mobile-nav-cta"
                onClick={() => handleNavClick('contatti')}
                style={{ fontFamily: "'Poppins', sans-serif", fontSize: '12px' }}
                className="w-full text-center py-3 border-2 border-[#0A192F] dark:border-[#4A90E2] text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-[#0A192F] dark:hover:bg-[#4A90E2] hover:text-white dark:hover:text-slate-950 text-[#0A192F] dark:text-white transition-all duration-200"
              >
                Area Clienti & Richiesta
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
