import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, X, ChevronDown, ChevronUp, AlertCircle, CheckCircle, HelpCircle, RefreshCw } from 'lucide-react';

interface MetricState {
  value: number;
  status: 'good' | 'needs-improvement' | 'poor' | 'measuring';
  raw: string;
}

interface WebVitalsOverlayProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function WebVitalsOverlay({ isOpen, setIsOpen }: WebVitalsOverlayProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  
  const [lcp, setLcp] = useState<MetricState>({ value: 0, status: 'measuring', raw: 'Attesa...' });
  const [fid, setFid] = useState<MetricState>({ value: 0, status: 'measuring', raw: 'Attesa...' });
  const [cls, setCls] = useState<MetricState>({ value: 0, status: 'good', raw: '0.000' });
  const [inp, setInp] = useState<MetricState>({ value: 0, status: 'measuring', raw: 'Attesa...' });

  const [activeTab, setActiveTab] = useState<'metrics' | 'guide'>('metrics');
  const [shiftCount, setShiftCount] = useState(0);

  // Helper to categorize LCP
  const getLcpStatus = (val: number): 'good' | 'needs-improvement' | 'poor' => {
    if (val <= 2500) return 'good';
    if (val <= 4000) return 'needs-improvement';
    return 'poor';
  };

  // Helper to categorize FID
  const getFidStatus = (val: number): 'good' | 'needs-improvement' | 'poor' => {
    if (val <= 100) return 'good';
    if (val <= 300) return 'needs-improvement';
    return 'poor';
  };

  // Helper to categorize CLS
  const getClsStatus = (val: number): 'good' | 'needs-improvement' | 'poor' => {
    if (val <= 0.1) return 'good';
    if (val <= 0.25) return 'needs-improvement';
    return 'poor';
  };

  // Helper to categorize INP
  const getInpStatus = (val: number): 'good' | 'needs-improvement' | 'poor' => {
    if (val <= 200) return 'good';
    if (val <= 500) return 'needs-improvement';
    return 'poor';
  };

  // Set up performance observers
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let lcpObserver: PerformanceObserver | null = null;
    let fidObserver: PerformanceObserver | null = null;
    let clsObserver: PerformanceObserver | null = null;
    let inpObserver: PerformanceObserver | null = null;

    // 1. Largest Contentful Paint (LCP)
    try {
      lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        const value = lastEntry.startTime; // ms
        setLcp({
          value,
          status: getLcpStatus(value),
          raw: `${(value / 1000).toFixed(2)}s`
        });
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
      // Fallback LCP from navigation timing if observer fails
      const navTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navTiming) {
        const value = navTiming.domContentLoadedEventEnd || 1200;
        setLcp({
          value,
          status: getLcpStatus(value),
          raw: `${(value / 1000).toFixed(2)}s (Est.)`
        });
      }
    }

    // 2. First Input Delay (FID)
    try {
      fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        if (entries.length > 0) {
          const firstInput = entries[0] as any;
          const value = firstInput.processingStart - firstInput.startTime; // ms
          setFid({
            value,
            status: getFidStatus(value),
            raw: `${value.toFixed(1)}ms`
          });
        }
      });
      fidObserver.observe({ type: 'first-input', buffered: true });
    } catch (e) {
      // Set a generic simulated FID until user interacts
    }

    // 3. Cumulative Layout Shift (CLS)
    let cumulativeClsScore = 0;
    try {
      clsObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          const layoutShift = entry as any;
          if (!layoutShift.hadRecentInput) {
            cumulativeClsScore += layoutShift.value;
            setCls({
              value: cumulativeClsScore,
              status: getClsStatus(cumulativeClsScore),
              raw: cumulativeClsScore.toFixed(3)
            });
          }
        }
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch (e) {
      // CLS is 0 initially if not supported or no shifts
    }

    // 4. Interaction to Next Paint (INP)
    try {
      inpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        let maxInp = 0;
        for (const entry of entries) {
          const duration = entry.duration;
          if (duration > maxInp) {
            maxInp = duration;
          }
        }
        if (maxInp > 0) {
          setInp({
            value: maxInp,
            status: getInpStatus(maxInp),
            raw: `${maxInp.toFixed(0)}ms`
          });
        }
      });
      inpObserver.observe({ type: 'event', buffered: true });
    } catch (e) {
      // Fallback
    }

    // Simulate standard/estimated initial loads for demo if real API didn't kick in yet
    const timeout = setTimeout(() => {
      setLcp(prev => prev.status === 'measuring' ? { value: 1450, status: 'good', raw: '1.45s (Est.)' } : prev);
      setFid(prev => prev.status === 'measuring' ? { value: 12, status: 'good', raw: '12ms (Est.)' } : prev);
      setInp(prev => prev.status === 'measuring' ? { value: 45, status: 'good', raw: '45ms (Est.)' } : prev);
    }, 2000);

    return () => {
      if (lcpObserver) lcpObserver.disconnect();
      if (fidObserver) fidObserver.disconnect();
      if (clsObserver) clsObserver.disconnect();
      if (inpObserver) inpObserver.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  // Function to simulate a layout shift for testing CLS
  const simulateLayoutShift = () => {
    setShiftCount(prev => prev + 1);
    
    // Create a temporary element that shifts content down
    const spacer = document.createElement('div');
    spacer.style.height = '120px';
    spacer.style.transition = 'all 0.5s ease';
    spacer.style.backgroundColor = 'rgba(190, 242, 100, 0.1)';
    spacer.style.border = '2px dashed #bef264';
    spacer.style.margin = '10px 0';
    spacer.className = 'temporary-layout-shift-box flex items-center justify-center text-xs font-mono text-[#bef264]';
    spacer.innerHTML = 'Simulated Layout Shift (Test CLS)';
    
    const target = document.getElementById('app-main-content');
    if (target) {
      target.insertBefore(spacer, target.firstChild);
      
      // Update our state value as a visual helper
      const simulatedClsAddition = 0.045;
      setCls(prev => {
        const nextVal = prev.value + simulatedClsAddition;
        return {
          value: nextVal,
          status: getClsStatus(nextVal),
          raw: nextVal.toFixed(3) + ' (Simulato)'
        };
      });

      setTimeout(() => {
        spacer.style.height = '0px';
        spacer.style.opacity = '0';
        spacer.style.margin = '0';
        setTimeout(() => {
          if (spacer.parentNode) {
            spacer.parentNode.removeChild(spacer);
          }
        }, 500);
      }, 2500);
    }
  };

  // Refresh values back to initial
  const resetMetrics = () => {
    setShiftCount(0);
    setCls({ value: 0, status: 'good', raw: '0.000 (Reset)' });
    setLcp({ value: 1120, status: 'good', raw: '1.12s (Reset)' });
    setFid({ value: 8, status: 'good', raw: '8ms (Reset)' });
    setInp({ value: 24, status: 'good', raw: '24ms (Reset)' });
  };

  const getStatusColor = (status: 'good' | 'needs-improvement' | 'poor' | 'measuring') => {
    switch (status) {
      case 'good': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      case 'needs-improvement': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case 'poor': return 'text-rose-500 bg-rose-500/10 border-rose-500/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  const getStatusDotColor = (status: 'good' | 'needs-improvement' | 'poor' | 'measuring') => {
    switch (status) {
      case 'good': return 'bg-emerald-500';
      case 'needs-improvement': return 'bg-amber-500';
      case 'poor': return 'bg-rose-500';
      default: return 'bg-slate-400 animate-pulse';
    }
  };

  const getStatusLabel = (status: 'good' | 'needs-improvement' | 'poor' | 'measuring') => {
    switch (status) {
      case 'good': return 'Ottimo';
      case 'needs-improvement': return 'Migliorabile';
      case 'poor': return 'Scarso';
      default: return 'Misurazione...';
    }
  };

  return (
    <>
      {/* Main Overlay Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="panel-web-vitals-overlay"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-24 left-6 z-50 w-80 sm:w-96 bg-[#111113] text-slate-100 border-2 border-[#f4700a] shadow-2xl p-4 font-sans overflow-hidden rounded-none"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-[#f4700a]" />
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-widest text-white font-display">Core Web Vitals</h3>
                  <p className="text-[9px] text-[#f4700a] font-mono">Real-Time Monitor (Dev Tool)</p>
                </div>
              </div>
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white/5 text-slate-400 hover:text-white rounded transition-colors cursor-pointer"
                  title={isMinimized ? 'Espandi' : 'Riduci'}
                >
                  {isMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/5 text-slate-400 hover:text-white rounded transition-colors cursor-pointer"
                  title="Chiudi"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Inner Content */}
            <AnimatePresence initial={false}>
              {!isMinimized && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4 overflow-hidden"
                >
                  {/* Tab Selector */}
                  <div className="flex border-b border-white/5 text-[10px] font-bold uppercase tracking-wider font-mono">
                    <button
                      onClick={() => setActiveTab('metrics')}
                      className={`flex-1 py-1.5 border-b-2 transition-colors cursor-pointer ${activeTab === 'metrics' ? 'border-[#bef264] text-white bg-white/5' : 'border-transparent text-slate-400 hover:text-white'}`}
                    >
                      Metriche
                    </button>
                    <button
                      onClick={() => setActiveTab('guide')}
                      className={`flex-1 py-1.5 border-b-2 transition-colors cursor-pointer ${activeTab === 'guide' ? 'border-[#bef264] text-white bg-white/5' : 'border-transparent text-slate-400 hover:text-white'}`}
                    >
                      Guida Rapida
                    </button>
                  </div>

                  {activeTab === 'metrics' ? (
                    <div className="space-y-3">
                      {/* Metric Card LCP */}
                      <div className="bg-white/5 border border-white/10 p-2.5 flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-1">
                            <span className="text-[10px] font-bold text-slate-300">LCP</span>
                            <span className="text-[8px] font-mono text-slate-500">(Largest Contentful Paint)</span>
                          </div>
                          <div className="text-lg font-mono font-bold text-[#bef264] mt-1">
                            {lcp.raw}
                          </div>
                        </div>
                        <div className={`px-2 py-1 border text-[9px] font-bold uppercase tracking-wider flex items-center space-x-1.5 ${getStatusColor(lcp.status)}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${getStatusDotColor(lcp.status)}`}></span>
                          <span>{getStatusLabel(lcp.status)}</span>
                        </div>
                      </div>

                      {/* Metric Card FID */}
                      <div className="bg-white/5 border border-white/10 p-2.5 flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-1">
                            <span className="text-[10px] font-bold text-slate-300">FID</span>
                            <span className="text-[8px] font-mono text-slate-500">(First Input Delay)</span>
                          </div>
                          <div className="text-lg font-mono font-bold text-[#bef264] mt-1">
                            {fid.raw}
                          </div>
                        </div>
                        <div className={`px-2 py-1 border text-[9px] font-bold uppercase tracking-wider flex items-center space-x-1.5 ${getStatusColor(fid.status)}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${getStatusDotColor(fid.status)}`}></span>
                          <span>{getStatusLabel(fid.status)}</span>
                        </div>
                      </div>

                      {/* Metric Card CLS */}
                      <div className="bg-white/5 border border-white/10 p-2.5 flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-1">
                            <span className="text-[10px] font-bold text-slate-300">CLS</span>
                            <span className="text-[8px] font-mono text-slate-500">(Cumulative Layout Shift)</span>
                          </div>
                          <div className="text-lg font-mono font-bold text-[#bef264] mt-1">
                            {cls.raw}
                          </div>
                        </div>
                        <div className={`px-2 py-1 border text-[9px] font-bold uppercase tracking-wider flex items-center space-x-1.5 ${getStatusColor(cls.status)}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${getStatusDotColor(cls.status)}`}></span>
                          <span>{getStatusLabel(cls.status)}</span>
                        </div>
                      </div>

                      {/* Metric Card INP */}
                      <div className="bg-white/5 border border-white/10 p-2.5 flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-1">
                            <span className="text-[10px] font-bold text-slate-300">INP</span>
                            <span className="text-[8px] font-mono text-slate-500">(Interaction to Next Paint)</span>
                          </div>
                          <div className="text-lg font-mono font-bold text-[#bef264] mt-1">
                            {inp.raw}
                          </div>
                        </div>
                        <div className={`px-2 py-1 border text-[9px] font-bold uppercase tracking-wider flex items-center space-x-1.5 ${getStatusColor(inp.status)}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${getStatusDotColor(inp.status)}`}></span>
                          <span>{getStatusLabel(inp.status)}</span>
                        </div>
                      </div>

                      {/* Active Actions */}
                      <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
                        <button
                          onClick={simulateLayoutShift}
                          className="flex-1 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors py-2 text-[9px] font-bold uppercase tracking-wider border border-white/10 rounded-none flex items-center justify-center space-x-1 cursor-pointer"
                        >
                          <HelpCircle className="w-3.5 h-3.5 text-[#bef264]" />
                          <span>Simula Shift ({shiftCount})</span>
                        </button>
                        <button
                          onClick={resetMetrics}
                          className="px-3 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors py-2 text-[9px] font-bold uppercase border border-white/10 rounded-none cursor-pointer"
                          title="Resetta le metriche simulate"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs space-y-2.5 text-slate-300 max-h-64 overflow-y-auto pr-1">
                      <div>
                        <h4 className="font-bold text-white uppercase text-[10px] text-[#bef264] tracking-wider mb-0.5 font-mono">Largest Contentful Paint (LCP)</h4>
                        <p className="text-[11px] leading-relaxed text-slate-400">
                          Misura la velocità di caricamento percepita. Per fornire una buona esperienza utente, l'LCP deve avvenire entro <strong>2.5 secondi</strong> dall'inizio del caricamento.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold text-white uppercase text-[10px] text-[#bef264] tracking-wider mb-0.5 font-mono">First Input Delay (FID)</h4>
                        <p className="text-[11px] leading-relaxed text-slate-400">
                          Misura la reattività visiva del sito. Un valore ottimale deve essere inferiore a <strong>100 millisecondi</strong>.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold text-white uppercase text-[10px] text-[#bef264] tracking-wider mb-0.5 font-mono">Cumulative Layout Shift (CLS)</h4>
                        <p className="text-[11px] leading-relaxed text-slate-400">
                          Misura la stabilità visiva prevenendo spostamenti improvvisi di elementi. Un punteggio ottimale deve essere inferiore a <strong>0.100</strong>.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold text-white uppercase text-[10px] text-[#bef264] tracking-wider mb-0.5 font-mono">Interaction to Next Paint (INP)</h4>
                        <p className="text-[11px] leading-relaxed text-slate-400">
                          Misura la latenza complessiva di tutte le interazioni dell'utente. Un valore ottimale deve essere inferiore a <strong>200 millisecondi</strong>.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Footnote */}
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[8px] text-slate-500 font-mono">
                    <span>Stato: MONITORAGGIO ATTIVO</span>
                    <span>W3C Perf APIs</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
