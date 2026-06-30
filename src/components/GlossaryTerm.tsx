import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, X, ExternalLink } from 'lucide-react';

export interface GlossaryDefinition {
  term: string;
  shortDesc: string;
  extendedDesc: string;
  category: 'Normativa' | 'Tecnologia' | 'Marketing' | 'Design';
}

export const glossaryDb: Record<string, GlossaryDefinition> = {
  'ai act': {
    term: 'AI Act',
    category: 'Normativa',
    shortDesc: 'Il primo regolamento europeo sull\'Intelligenza Artificiale.',
    extendedDesc: 'Classifica i sistemi AI in base al rischio (inaccettabile, alto, limitato, minimo) e impone rigidi vincoli di trasparenza, sicurezza e rispetto dei diritti fondamentali.'
  },
  'llm': {
    term: 'LLM (Large Language Model)',
    category: 'Tecnologia',
    shortDesc: 'Modelli linguistici di intelligenza artificiale su grande scala.',
    extendedDesc: 'Algoritmi addestrati su enormi moli di dati testuali in grado di comprendere, riassumere, tradurre e generare testi complessi in modo simile a un essere umano (es. Gemini, GPT).'
  },
  'cms': {
    term: 'CMS (Content Management System)',
    category: 'Tecnologia',
    shortDesc: 'Piattaforme software per la gestione semplificata dei contenuti web.',
    extendedDesc: 'Sistemi come WordPress o Webflow che permettono a chiunque di modificare testi, immagini e pagine di un sito web tramite un pannello di controllo intuitivo, senza toccare il codice.'
  },
  'spa': {
    term: 'SPA (Single Page Application)',
    category: 'Tecnologia',
    shortDesc: 'Applicazioni web composte da un\'unica pagina fluida.',
    extendedDesc: 'Siti web moderni che caricano una sola pagina HTML. Quando l\'utente naviga, i contenuti cambiano all\'istante senza ricaricare l\'intero browser, garantendo una velocità d\'élite.'
  },
  'gdpr': {
    term: 'GDPR (Regolamento Privacy)',
    category: 'Normativa',
    shortDesc: 'Regolamento europeo sulla protezione dei dati personali.',
    extendedDesc: 'Impone la trasparenza nel trattamento delle informazioni degli utenti, il consenso esplicito per i cookie di tracciamento e il diritto all\'oblio o alla portabilità dei dati personali.'
  },
  'seo': {
    term: 'SEO (Ottimizzazione Motori di Ricerca)',
    category: 'Marketing',
    shortDesc: 'Attività volte a migliorare la visibilità di un sito su Google.',
    extendedDesc: 'Strategie tecniche e di contenuto per scalare le posizioni dei risultati organici (non a pagamento) di Google, intercettando gli utenti che cercano attivamente i tuoi servizi.'
  },
  'wcag': {
    term: 'WCAG (Linee Guida Accessibilità)',
    category: 'Design',
    shortDesc: 'Standard internazionali per rendere il web accessibile a tutti.',
    extendedDesc: 'Regole tecniche precise destinate a rendere i contenuti web accessibili a persone con disabilità visive, uditive, motorie o cognitive (es. contrasto colori elevato, navigabilità via tastiera).'
  },
  'eaa': {
    term: 'EAA (European Accessibility Act)',
    category: 'Normativa',
    shortDesc: 'La direttiva europea sull\'accessibilità di prodotti e servizi.',
    extendedDesc: 'In vigore dal 2025, impone a gran parte delle aziende private e dei servizi digitali (inclusi e-commerce e portali d\'informazione) di conformarsi a elevati requisiti di accessibilità.'
  },
  'ux/ui': {
    term: 'UX/UI Design',
    category: 'Design',
    shortDesc: 'Progettazione dell\'esperienza e dell\'interfaccia utente.',
    extendedDesc: 'L\'User Experience (UX) ottimizza l\'utilità, l\'intuitività e la facilità d\'uso del sito. L\'User Interface (UI) cura la veste estetica, la scelta dei colori, la tipografia e l\'identità visiva.'
  },
  'b2b': {
    term: 'B2B (Business to Business)',
    category: 'Marketing',
    shortDesc: 'Transazioni e scambi commerciali tra imprese.',
    extendedDesc: 'Modello commerciale in cui un\'azienda offre servizi o vende prodotti ad altre aziende (es. consulenze professionali, forniture industriali, software professionali).'
  },
  'tailwind css': {
    term: 'Tailwind CSS',
    category: 'Tecnologia',
    shortDesc: 'Framework CSS moderno ad alta velocità di sviluppo.',
    extendedDesc: 'Consente di applicare gli stili grafici direttamente nel codice HTML tramite classi di utilità predefinite, riducendo drasticamente il peso finale delle pagine e accelerando il caricamento.'
  },
  'vite': {
    term: 'Vite',
    category: 'Tecnologia',
    shortDesc: 'Strumento di build d\'avanguardia per lo sviluppo frontend.',
    extendedDesc: 'Un compilatore ultra-veloce che sostituisce i vecchi tool di sviluppo (es. Webpack), consentendo di vedere i cambiamenti al codice all\'istante e ottimizzando al massimo il codice finale.'
  },
  'react': {
    term: 'React',
    category: 'Tecnologia',
    shortDesc: 'Libreria JavaScript d\'élite ideata da Meta.',
    extendedDesc: 'Utilizzata per creare interfacce utente dinamiche basate su componenti riutilizzabili. Garantisce velocità strabiliante, reattività istantanea ai clic e una manutenzione modulare eccellente.'
  },
  'sla': {
    term: 'SLA (Service Level Agreement)',
    category: 'Tecnologia',
    shortDesc: 'Accordi contrattuali sui livelli di servizio garantiti.',
    extendedDesc: 'Metriche formalizzate che definiscono i tempi massimi di intervento in caso di guasti, la percentuale di disponibilità del server (uptime) e le frequenze dei backup ordinari di sicurezza.'
  },
  'agid': {
    term: 'AgID (Agenzia per l\'Italia Digitale)',
    category: 'Normativa',
    shortDesc: 'Organo pubblico italiano preposto all\'attuazione dell\'Agenda Digitale.',
    extendedDesc: 'Vigila sull\'adozione delle tecnologie dell\'informazione nella pubblica amministrazione e monitora la conformità dei siti internet aziendali e pubblici alle normative sull\'accessibilità.'
  },
  'lead generation': {
    term: 'Lead Generation',
    category: 'Marketing',
    shortDesc: 'Insieme di strategie volte ad attrarre contatti commerciali qualificati.',
    extendedDesc: 'Processo di acquisizione di nominativi e contatti (email, telefono, azienda) di clienti realmente interessati ai tuoi servizi professionali o prodotti aziendali.'
  }
};

// Extracted search keys sorted by length (descending) to avoid partial matching issues (e.g., 'Tailwind CSS' matching 'Tailwind')
const orderedTerms = Object.keys(glossaryDb).sort((a, b) => b.length - a.length);

// Escape function for regex keywords
const escapeRegExp = (string: string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

// Build the global case-insensitive matching regex
const termsPattern = orderedTerms.map(escapeRegExp).join('|');
const glossaryRegex = new RegExp(`\\b(${termsPattern})\\b`, 'gi');

interface GlossaryWordProps {
  termKey: string;
  children: string;
  key?: React.Key;
}

export function GlossaryWord({ termKey, children }: GlossaryWordProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const definition = glossaryDb[termKey];

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  if (!definition) return <span>{children}</span>;

  // Choose a colored bullet based on category
  const getCategoryColor = (cat: GlossaryDefinition['category']) => {
    switch (cat) {
      case 'Normativa': return 'bg-amber-500 text-amber-500';
      case 'Tecnologia': return 'bg-cyan-500 text-cyan-500';
      case 'Marketing': return 'bg-emerald-500 text-emerald-500';
      case 'Design': return 'bg-fuchsia-500 text-fuchsia-500';
      default: return 'bg-blue-500 text-blue-500';
    }
  };

  return (
    <span ref={containerRef} className="relative inline-block" id={`glossary-wrapper-${termKey}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="font-medium border-b border-dashed border-[#4A90E2] hover:border-solid hover:text-[#4A90E2] transition-colors focus:outline-none cursor-help text-inherit inline-flex items-center gap-0.5"
        title="Clicca per visualizzare la definizione"
        id={`glossary-btn-${termKey}`}
      >
        {children}
        <HelpCircle className="w-3 h-3 text-[#4A90E2]/60 inline-block align-middle ml-0.5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.span
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-72 sm:w-80 bg-slate-900 border border-slate-800 text-slate-200 p-4 rounded-lg shadow-2xl z-50 text-left block pointer-events-auto leading-normal font-sans"
            id={`glossary-popover-${termKey}`}
          >
            {/* Popover Header */}
            <span className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2 block">
              <span className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${getCategoryColor(definition.category).split(' ')[0]}`} />
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono">
                  {definition.category}
                </span>
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="text-slate-500 hover:text-slate-300 transition-colors p-0.5 hover:bg-slate-800 rounded"
                title="Chiudi spiegazione"
                id={`glossary-close-${termKey}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>

            {/* Term Title */}
            <strong className="text-sm font-bold text-white block mb-1">
              {definition.term}
            </strong>

            {/* Explanations */}
            <span className="text-xs text-[#4A90E2] block mb-1.5 font-medium leading-relaxed">
              {definition.shortDesc}
            </span>
            <span className="text-xs text-slate-400 block leading-relaxed mb-3">
              {definition.extendedDesc}
            </span>

            {/* Context Link */}
            <span className="text-[10px] text-slate-500 flex items-center justify-between pt-2 border-t border-slate-800 block">
              <span>Clicca fuori per chiudere</span>
              <span className="flex items-center gap-1 font-mono text-slate-400">
                INFO <ExternalLink className="w-2.5 h-2.5" />
              </span>
            </span>

            {/* Caret Anchor */}
            <span className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900 block" />
            <span className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-800 z-[-1] block -mt-[1px]" />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

interface GlossaryParagraphProps {
  children: string | React.ReactNode;
  className?: string;
  id?: string;
}

export function GlossaryParagraph({ children, className = '', id }: GlossaryParagraphProps) {
  if (typeof children !== 'string') {
    return <p className={className} id={id}>{children}</p>;
  }

  // Split text by matching glossary terms
  const parts = children.split(glossaryRegex);
  
  return (
    <p className={className} id={id}>
      {parts.map((part, index) => {
        const lowerPart = part.toLowerCase();
        if (glossaryDb[lowerPart]) {
          return (
            <GlossaryWord key={index} termKey={lowerPart}>
              {part}
            </GlossaryWord>
          );
        }
        return part;
      })}
    </p>
  );
}
