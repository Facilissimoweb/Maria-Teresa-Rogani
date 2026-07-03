import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, ArrowRight, Sun, Moon, Accessibility, Lock, Unlock, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ActiveTab } from '../types';
import brandLogoImg from '../assets/images/regenerated_image_1782982577389.png';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  darkMode?: boolean;
  setDarkMode?: (val: boolean) => void;
  accessibilityOpen?: boolean;
  setAccessibilityOpen?: (val: boolean) => void;
  isAdmin?: boolean;
}

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  darkMode = false, 
  setDarkMode,
  accessibilityOpen = false,
  setAccessibilityOpen,
  isAdmin = false
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

  const baseMenuItems = [
    { id: 'home', label: 'Home' },
    { id: 'chi-sono', label: 'Chi Sono' },
    { id: 'servizi', label: 'Servizi' },
    { id: 'normativa', label: 'Compliance' },
    { id: 'blog', label: 'Blog' },
  ] as const;

  const menuItems = isAdmin 
    ? [...baseMenuItems, { id: 'fogli', label: 'Google Sheets' } as const]
    : baseMenuItems;

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
    <header id="app-navbar" className="sticky top-0 z-50 w-full bg-[#111113] border-b border-white/10 shadow-sm backdrop-blur-md bg-opacity-95 transition-all duration-300 text-white">
      <div 
        style={{ 
          backgroundColor: '#e56f28',
          height: '68px',
          paddingLeft: '24px',
          paddingRight: '24px',
          paddingTop: '0px',
          paddingBottom: '0px',
          marginTop: '-14px',
          marginBottom: '0px'
        }} 
        className="w-full flex items-center justify-between"
      >
        {/* Logo/Complete Title in Black */}
        <div 
          id="brand-logo" 
          className="flex items-center cursor-pointer group shrink"
          onClick={() => handleNavClick('home')}
        >
          <span 
            className="text-black uppercase leading-none select-none"
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontStyle: 'italic',
              fontSize: '25px',
              fontWeight: 700,
              paddingBottom: '0px',
              marginTop: '11px'
            }}
          >
            FACILISSIMO WEB
          </span>
        </div>

        {/* Hamburger Icon */}
        <button
          id="menu-toggle-button"
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none flex items-center justify-center cursor-pointer text-black"
          aria-label="Apri menu"
        >
          {isOpen ? (
            <X 
              className="text-black" 
              style={{
                marginTop: '10px',
                borderWidth: '1px',
                borderStyle: 'none',
                borderRadius: '0px',
                width: '50px',
                height: '38px'
              }}
            />
          ) : (
            <Menu 
              className="text-black" 
              style={{
                marginTop: '10px',
                borderWidth: '1px',
                borderStyle: 'none',
                borderRadius: '0px',
                width: '50px',
                height: '38px'
              }}
            />
          )}
        </button>
      </div>

      {/* Hidden google translate container that Google Translate API binds to */}
      <div id="google_translate_element" className="absolute -left-[9999px] -top-[9999px] w-px h-px overflow-hidden pointer-events-none opacity-0"></div>

      {/* Full-Screen Lateral Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="fullscreen-drawer"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="fixed inset-0 z-50 bg-[#09090b]/98 backdrop-blur-xl flex flex-col h-screen w-screen overflow-y-auto"
          >
            {/* Header of Drawer */}
            <div className="flex justify-between items-center px-6 py-6 border-b border-white/10 bg-black/40">
              <span className="text-xs sm:text-sm font-black tracking-[0.2em] text-white uppercase select-none">
                FACILISSIMO WEB
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-[#f4700a] p-2 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
                aria-label="Chiudi menu"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            {/* Menu Items Content Area */}
            <div className="flex-1 flex flex-col justify-between py-12 px-6 max-w-xl mx-auto w-full">
              {/* Navigation list */}
              <div className="space-y-2 text-center my-auto">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    id={`drawer-nav-link-${item.id}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleNavClick(item.id)}
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                    className={`block w-full py-4 text-xl md:text-3xl font-black uppercase tracking-[0.25em] transition-all duration-300 hover:text-[#f4700a] cursor-pointer border-b border-white/5 relative ${
                      activeTab === item.id 
                        ? 'text-[#f4700a] scale-105' 
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    <span className="inline-flex items-center space-x-2">
                      {item.id === 'blog' && (
                        <span className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-ping mr-2 shrink-0" />
                      )}
                      <span>{item.label}</span>
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Extra Utilities & Action Buttons */}
              <div className="space-y-6 pt-8 border-t border-white/10 mt-auto">
                {/* CTA Button */}
                <motion.button
                  id="drawer-cta-button"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: menuItems.length * 0.05 }}
                  onClick={() => handleNavClick('contatti')}
                  className="w-full py-4 rounded-none bg-gradient-to-r from-[#f4700a] via-[#e56f28] to-[#d69429] hover:brightness-115 active:scale-98 text-black font-black text-xs md:text-sm uppercase tracking-[0.25em] transition-all duration-200 shadow-xl cursor-pointer"
                >
                  Richiedi Consulenza
                </motion.button>

                {/* Area Riservata Access */}
                {!isAdmin && (
                  <motion.button
                    id="drawer-admin-lock-button"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (menuItems.length + 1) * 0.05 }}
                    onClick={() => handleNavClick('fogli')}
                    className="w-full py-3 border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center space-x-2 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-150 cursor-pointer"
                  >
                    <Lock className="w-4 h-4 text-[#f4700a]" />
                    <span>Area Riservata</span>
                  </motion.button>
                )}

                {/* Accessibility & Languages Toggles */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Accessibility Option */}
                  {setAccessibilityOpen && (
                    <button
                      id="drawer-accessibility-toggle"
                      onClick={() => setAccessibilityOpen(!accessibilityOpen)}
                      className={`flex items-center justify-center space-x-2 py-3 px-4 border text-[10px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                        accessibilityOpen 
                          ? 'bg-[#f4700a]/25 border-[#f4700a] text-[#f4700a]' 
                          : 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Accessibility className="w-4 h-4" />
                      <span>Accessibilità</span>
                    </button>
                  )}

                  {/* Language Selector */}
                  <div className="relative">
                    <button
                      id="drawer-lang-toggle"
                      onClick={() => setIsLangOpen(!isLangOpen)}
                      className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all duration-200"
                    >
                      <span className="text-base">{currentLang.flag}</span>
                      <span>{currentLang.label}</span>
                    </button>

                    {isLangOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsLangOpen(false)} />
                        <div className="absolute right-0 bottom-full mb-2 w-44 bg-[#09090b] border border-white/10 shadow-2xl py-1.5 z-50 rounded-xl max-h-52 overflow-y-auto animate-fadeIn">
                          {languages.map((lang) => (
                            <button
                              key={lang.code}
                              onClick={() => handleLanguageChange(lang.code)}
                              className={`w-full text-left px-4 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-white/5 cursor-pointer flex items-center justify-between transition-colors ${
                                activeLang === lang.code ? 'text-[#f4700a]' : 'text-slate-200 hover:text-white'
                              }`}
                            >
                              <div className="flex items-center space-x-2">
                                <span className="text-sm">{lang.flag}</span>
                                <span>{lang.label}</span>
                              </div>
                              {activeLang === lang.code && <span className="w-1.5 h-1.5 bg-[#f4700a] rounded-full" />}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Brand details at bottom of screen */}
              <div className="text-center font-mono text-[9px] text-white/30 tracking-[0.18em] leading-relaxed uppercase pt-6 select-none">
                FACILISSIMO WEB di Maria Teresa Rogani <br />
                Strategic Digital Partner
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
