import React, { useState, useEffect } from 'react';
import { Accessibility, X, Sun, Moon, Type, Eye, RotateCcw, HelpCircle, Check, Info } from 'lucide-react';

interface AccessibilityPanelProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  textSize: string; // '100' | '110' | '121' | '135'
  setTextSize: (val: string) => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
  readableFont: boolean;
  setReadableFont: (val: boolean) => void;
  isOpen?: boolean;
  setIsOpen?: (val: boolean) => void;
}

export default function AccessibilityPanel({
  darkMode,
  setDarkMode,
  textSize,
  setTextSize,
  highContrast,
  setHighContrast,
  readableFont,
  setReadableFont,
  isOpen: propIsOpen,
  setIsOpen: propSetIsOpen,
}: AccessibilityPanelProps) {
  const [localIsOpen, setLocalIsOpen] = useState(false);
  const isOpen = propIsOpen !== undefined ? propIsOpen : localIsOpen;
  const setIsOpen = propSetIsOpen !== undefined ? propSetIsOpen : setLocalIsOpen;
  const [showTooltip, setShowTooltip] = useState(true);

  const resetAll = () => {
    setDarkMode(true);
    setTextSize('100');
    setHighContrast(false);
    setReadableFont(false);
    
    // Reset Google Translate if possible
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (select) {
      select.value = 'it';
      select.dispatchEvent(new Event('change'));
    }
  };

  useEffect(() => {
    // Hide tooltip after 8 seconds
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div 
      id="accessibility-root" 
      className="fixed top-24 left-4 right-4 sm:left-auto sm:right-6 lg:right-12 sm:w-85 z-50 font-sans"
    >
      {/* Interactive Accessibility Dialog Panel */}
      <div 
        id="accessibility-panel-body"
        className="w-full bg-white dark:bg-[#0d1e36] border-2 border-[#0A192F] dark:border-[#4A90E2] shadow-2xl p-5 text-[#0A192F] dark:text-white rounded-2xl max-h-[80vh] overflow-y-auto z-50 animate-slideDown text-left"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-200 dark:border-white/10 pb-3 mb-4">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#4A90E2]">PANNELLO DI NAVIGAZIONE</h4>
            <p className="text-base font-extrabold uppercase tracking-wider text-[#0A192F] dark:text-white mt-0.5">FACILITATA & ACCESSIBILE</p>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/10 text-[#0A192F] dark:text-white rounded-xl transition-colors cursor-pointer"
            aria-label="Chiudi pannello"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-5">
          {/* 3. Text Sizing Zoom levels */}
          <div className="space-y-2 pb-3 border-b border-slate-100 dark:border-white/5">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">Dimensione Testo</span>
              <span className="text-[11px] font-mono font-bold text-[#4A90E2] uppercase tracking-wider">
                {textSize === '100' && 'Normale (100%)'}
                {textSize === '110' && 'Ingrandito (110%)'}
                {textSize === '121' && 'Consigliato (121%)'}
                {textSize === '135' && 'Massimo (135%)'}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1.5 pt-1">
              {[
                { value: '100', label: '100%' },
                { value: '110', label: '110%' },
                { value: '121', label: '121%' },
                { value: '135', label: '135%' }
              ].map((sz) => (
                <button
                  key={sz.value}
                  onClick={() => setTextSize(sz.value)}
                  className={`py-2 px-1 text-[10px] font-bold tracking-wider border text-center transition-all duration-150 cursor-pointer rounded-xl ${
                    textSize === sz.value
                      ? 'bg-[#0A192F] dark:bg-[#4A90E2] border-[#0A192F] dark:border-[#4A90E2] text-white'
                      : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-500'
                  }`}
                >
                  {sz.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4. High Contrast */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">Contrasto Elevato</span>
              <span className="text-[11px] text-slate-400 dark:text-slate-400 mt-0.5 block leading-relaxed">Aumenta la leggibilità del layout</span>
            </div>
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-all duration-300 cursor-pointer ${
                highContrast ? 'bg-[#f4700a] justify-end' : 'bg-slate-200 justify-start'
              }`}
            >
              <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-md">
                {highContrast && <Check className="w-2.5 h-2.5 text-orange-600" />}
              </div>
            </button>
          </div>

          {/* 5. Highly Legible Font */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">Carattere Facilitato</span>
              <span className="text-[11px] text-slate-400 dark:text-slate-400 mt-0.5 block leading-relaxed">Usa un carattere ad alta leggibilità</span>
            </div>
            <button
              onClick={() => setReadableFont(!readableFont)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-all duration-300 cursor-pointer ${
                readableFont ? 'bg-[#f4700a] justify-end' : 'bg-slate-200 justify-start'
              }`}
            >
              <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-md">
                {readableFont && <Check className="w-2.5 h-2.5 text-orange-600" />}
              </div>
            </button>
          </div>

          {/* Actions */}
          <div className="flex space-x-2 pt-2">
            <button
              onClick={resetAll}
              className="w-full py-2.5 border border-slate-300 dark:border-white/10 text-slate-600 dark:text-slate-300 text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-white/5 hover:text-[#0A192F] dark:hover:text-white rounded-xl transition-all duration-150 flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Ripristina Default</span>
            </button>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-5 pt-3 border-t border-slate-100 dark:border-white/5 text-[9px] uppercase tracking-wider text-slate-400 dark:text-slate-500 text-center flex items-center justify-center space-x-1">
          <Info className="w-3 h-3 text-[#4A90E2]" />
          <span>Progettato per la massima inclusività</span>
        </div>
      </div>
    </div>
  );
}
