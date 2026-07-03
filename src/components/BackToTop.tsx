import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function BackToTop() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check window scroll (used for mobile layouts where the whole window scrolls)
      const windowScroll = window.scrollY;
      
      // Check app-main-content scroll (used for desktop layout with custom scrollable area)
      const mainEl = document.getElementById('app-main-content');
      const mainScroll = mainEl ? mainEl.scrollTop : 0;
      
      if (windowScroll > 400 || mainScroll > 400) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    // Add scroll listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const mainEl = document.getElementById('app-main-content');
    if (mainEl) {
      mainEl.addEventListener('scroll', handleScroll, { passive: true });
    }

    // Secondary check to ensure we bind to the main container once DOM mounts completely
    const timeoutId = setTimeout(() => {
      const el = document.getElementById('app-main-content');
      if (el) {
        el.addEventListener('scroll', handleScroll, { passive: true });
      }
    }, 500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (mainEl) {
        mainEl.removeEventListener('scroll', handleScroll);
      }
      const el = document.getElementById('app-main-content');
      if (el) {
        el.removeEventListener('scroll', handleScroll);
      }
      clearTimeout(timeoutId);
    };
  }, []);

  const scrollToTop = () => {
    // Smooth scroll window for mobile
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Smooth scroll the main content area for desktop/PC
    const mainEl = document.getElementById('app-main-content');
    if (mainEl) {
      mainEl.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <AnimatePresence>
      {showButton && (
        <motion.button
          id="back-to-top-button"
          initial={{ opacity: 0, y: 15, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.8 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={scrollToTop}
          style={{ width: '20px', height: '20px' }}
          className="fixed bottom-[92px] right-6 z-40 bg-[#111113] hover:bg-[#1b1b1f] text-[#f4700a] border border-[#f4700a] shadow-2xl flex items-center justify-center transition-all duration-200 cursor-pointer rounded-none group"
          title="Torna su"
          aria-label="Torna all'inizio della pagina"
        >
          <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
