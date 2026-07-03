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
  },
  'e-commerce': {
    term: 'E-commerce',
    category: 'Tecnologia',
    shortDesc: 'Piattaforme di vendita online e negozi digitali.',
    extendedDesc: 'Siti web strutturati per la compravendita di beni o servizi, con cataloghi, carrelli d\'acquisto digitali e sistemi di pagamento elettronici sicuri (es. Shopify, WooCommerce).'
  },
  'web graphic design': {
    term: 'Web Graphic Design',
    category: 'Design',
    shortDesc: 'Progettazione grafica specifica per l\'ambiente web.',
    extendedDesc: 'Disciplina che unisce la creatività artistica visiva (layout, impaginazione, equilibrio cromatico) alla funzionalità tecnica dell\'interfaccia web, garantendo eccellente comunicazione ed usabilità.'
  },
  'diritto di recesso': {
    term: 'Diritto di Recesso',
    category: 'Normativa',
    shortDesc: 'Il diritto del consumatore di ripensare all\'acquisto entro 14 giorni.',
    extendedDesc: 'Norma di tutela che consente all\'acquirente online di annullare l\'acquisto senza alcuna penale e senza specificare il motivo, ottenendo il rimborso integrale del pagamento.'
  },
  'dichiarazione di accessibilità': {
    term: 'Dichiarazione di Accessibilità',
    category: 'Normativa',
    shortDesc: 'Documento ufficiale obbligatorio che attesta la conformità.',
    extendedDesc: 'Un modello standardizzato redatto dal titolare del sito e pubblicato nel footer, che descrive lo stato di conformità del portale ai requisiti di accessibilità e fornisce un canale per segnalazioni.'
  },
  'consenso granulare': {
    term: 'Consenso Granulare',
    category: 'Normativa',
    shortDesc: 'Consenso specifico e separato per ciascuna finalità dei dati.',
    extendedDesc: 'Un principio cardine del GDPR che vieta di raggruppare i consensi (es. accettare la privacy policy non deve obbligare l\'utente a ricevere newsletter o ad essere tracciato da cookie di marketing).'
  },
  'audit': {
    term: 'Audit (Verifica di Conformità)',
    category: 'Tecnologia',
    shortDesc: 'Esame tecnico o normativo approfondito del portale.',
    extendedDesc: 'Un\'analisi metodica che valuta lo stato di un sito rispetto alle regole vigenti (es. audit di accessibilità WCAG, audit di sicurezza dei dati o audit legale del processo di checkout).'
  },
  'cookies': {
    term: 'Cookies (Cookie Web)',
    category: 'Tecnologia',
    shortDesc: 'Piccoli frammenti di testo salvati dal browser dell\'utente.',
    extendedDesc: 'File utilizzati per ricordare preferenze di navigazione (es. lingua selezionata, carrello, stato del tema scuro) o per tracciare le visite degli utenti a scopi statistici o pubblicitari.'
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
        className="font-medium border-b border-dashed border-[#f4700a] hover:border-solid hover:text-[#f4700a] transition-colors focus:outline-none cursor-help text-inherit inline-flex items-center gap-0.5"
        title="Clicca per visualizzare la definizione"
        id={`glossary-btn-${termKey}`}
      >
        {children}
        <HelpCircle className="w-3 h-3 text-[#f4700a]/80 inline-block align-middle ml-0.5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.span
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="fixed bottom-4 left-4 right-4 max-w-sm mx-auto z-50 sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:bottom-full sm:mb-2 sm:w-80 sm:right-auto sm:bottom-auto bg-[#111113] border-2 border-[#f4700a] text-slate-100 p-4 rounded-none shadow-2xl text-left block pointer-events-auto leading-normal font-sans"
            id={`glossary-popover-${termKey}`}
          >
            {/* Popover Header */}
            <span className="flex items-center justify-between border-b border-white/10 pb-2 mb-2 block">
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
                className="text-slate-500 hover:text-[#f4700a] transition-colors p-0.5 hover:bg-white/5 rounded-none"
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
            <span className="text-xs text-[#f4700a] block mb-1.5 font-medium leading-relaxed">
              {definition.shortDesc}
            </span>
            <span className="text-xs text-slate-400 block leading-relaxed mb-3">
              {definition.extendedDesc}
            </span>

            {/* Context Link */}
            <span className="text-[10px] text-slate-500 flex items-center justify-between pt-2 border-t border-white/10 block">
              <span>Clicca fuori per chiudere</span>
              <span className="flex items-center gap-1 font-mono text-slate-400">
                INFO <ExternalLink className="w-2.5 h-2.5 text-[#f4700a]" />
              </span>
            </span>

            {/* Caret Anchor */}
            <span className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#111113] hidden sm:block" />
            <span className="absolute top-full left-1/2 -translate-x-1/2 border-[10px] border-transparent border-t-[#f4700a] z-[-1] hidden sm:block -mt-[1px]" />
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
