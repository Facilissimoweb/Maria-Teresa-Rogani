import React, { useRef, useEffect } from 'react';
import { X, Shield, Eye, FileText } from 'lucide-react';

export type LegalDocType = 'privacy' | 'cookie' | 'terms';

interface LegalModalProps {
  isOpen: boolean;
  docType: LegalDocType;
  onClose: () => void;
}

export default function LegalModal({ isOpen, docType, onClose }: LegalModalProps) {
  const modalBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && modalBodyRef.current) {
      modalBodyRef.current.scrollTop = 0;
    }
  }, [isOpen, docType]);

  if (!isOpen) return null;

  const renderContent = () => {
    switch (docType) {
      case 'privacy':
        return (
          <div className="space-y-6 text-slate-300 text-xs sm:text-sm leading-relaxed text-left font-sans font-light">
            <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
              <Shield className="w-8 h-8 text-[#10B981]" />
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider font-display">Informativa sulla Privacy Policy</h3>
                <p className="text-[10px] text-white/50 uppercase tracking-widest font-mono">Ai sensi del Regolamento Europeo GDPR 2016/679</p>
              </div>
            </div>

            <p>
              La presente Informativa sulla Privacy ha lo scopo di descrivere le modalità di gestione di questo sito web in riferimento al trattamento dei dati personali degli utenti che lo consultano e che utilizzano i moduli di contatto.
            </p>

            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-white border-l-2 border-[#10B981] pl-2 font-mono">1. Titolare del Trattamento</h4>
              <p>
                Il Titolare del trattamento dei dati personali raccolti tramite questo sito è:<br />
                <strong>FACILISSIMO WEB</strong> di Maria Teresa Rogani<br />
                Partita IVA: <strong>02136780430</strong><br />
                Email di contatto: <a href="mailto:facilissimoweb.mc@gmail.com" className="text-[#10B981] underline">facilissimoweb.mc@gmail.com</a><br />
                Telefono: <strong>+39 379 360 3321</strong>
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-white border-l-2 border-[#10B981] pl-2 font-mono">2. Tipologia di Dati Raccolti</h4>
              <p>
                Attraverso il modulo di contatto o la selezione dell'ingaggio preliminare vengono raccolti i seguenti dati personali forniti volontariamente dall'utente:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Nome e Cognome o Ragione Sociale</li>
                <li>Indirizzo Email</li>
                <li>Recapito Telefonico</li>
                <li>Indirizzo del Sito Web Attuale (se esistente)</li>
                <li>Tipologia di ingaggio richiesta (Call Preliminare Gratuita o Sessione Strategica)</li>
                <li>Qualsiasi ulteriore informazione o messaggio inserito liberamente nel campo note</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-white border-l-2 border-[#10B981] pl-2 font-mono">3. Finalità del Trattamento</h4>
              <p>
                I dati raccolti sono utilizzati esclusivamente per le seguenti finalità:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Fornire il servizio richiesto (erogazione della Call Preliminare o della Sessione Strategica).</li>
                <li>Ricontattare l'utente via email o telefono per definire i dettagli tecnici ed operativi del progetto.</li>
                <li>Adempiere ad obblighi di legge amministrativi, fiscali e contabili connessi alle prestazioni commerciali.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-white border-l-2 border-[#10B981] pl-2 font-mono">4. Base Giuridica del Trattamento</h4>
              <p>
                La base giuridica che legittima il trattamento è il <strong>consenso esplicito</strong> fornito dall'interessato all'atto dell'invio del modulo di contatto (con apposita spunta obbligatoria), nonché l'esecuzione di misure precontrattuali o contrattuali adottate su richiesta dell'interessato stesso.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-white border-l-2 border-[#10B981] pl-2 font-mono">5. Conservazione e Sicurezza dei Dati</h4>
              <p>
                I dati vengono trattati esclusivamente con strumenti informatici idonei a garantirne la sicurezza e la riservatezza assoluta. Nessun dato viene comunicato o ceduto a terze parti esterne senza consenso, ad eccezione dei soggetti terzi la cui collaborazione è indispensabile per l'adempimento delle finalità fiscali (es. commercialista) o tecnologiche strettamente necessarie. I dati saranno conservati per il tempo strettamente necessario a gestire la richiesta dell'utente ed eventualmente per il periodo imposto dalle norme fiscali in caso di fatturazione (10 anni).
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-white border-l-2 border-[#10B981] pl-2 font-mono">6. Diritti dell'Interessato</h4>
              <p>
                Ai sensi degli articoli 15-22 del GDPR, l'utente ha il diritto in qualunque momento di ottenere la conferma dell'esistenza dei suoi dati, di conoscerne il contenuto, di chiederne la rettifica, l'integrazione, la limitazione del trattamento o la completa cancellazione (diritto all'oblio). Tali richieste possono essere inviate gratuitamente scrivendo all'indirizzo email <a href="mailto:facilissimoweb.mc@gmail.com" className="text-[#10B981] underline font-bold">facilissimoweb.mc@gmail.com</a>.
              </p>
            </div>
          </div>
        );

      case 'cookie':
        return (
          <div className="space-y-6 text-slate-300 text-xs sm:text-sm leading-relaxed text-left font-sans font-light">
            <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
              <Eye className="w-8 h-8 text-[#10B981]" />
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider font-display">Informativa Estesa sui Cookie</h3>
                <p className="text-[10px] text-white/50 uppercase tracking-widest font-mono">Provvedimento del Garante della Privacy n. 229/2014 e linee guida GDPR</p>
              </div>
            </div>

            <p>
              I cookie sono piccoli file di testo che i siti visitati dagli utenti inviano ai loro terminali, dove vengono memorizzati per essere poi ritrasmessi agli stessi siti alla visita successiva. Questo sito fa uso di cookie tecnici necessari e di cookie di terze parti legati a servizi specifici.
            </p>

            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-white border-l-2 border-[#10B981] pl-2 font-mono">1. Tipologie di Cookie Utilizzati</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Cookie Tecnici e di Preferenza (Sito):</strong> Necessari per il corretto funzionamento dell'interfaccia utente. Memorizzano informazioni utili quali lo stato delle preferenze di zoom del testo del pannello di accessibilità, e l'accettazione del cookie banner stesso. Questi cookie non raccolgono informazioni a fini di marketing e non richiedono il preventivo consenso dell'utente, in quanto essenziali per erogare il servizio.
                </li>
                <li>
                  <strong>Cookie di Terze Parti (Google Translate):</strong> Quando l'utente decide di avvalersi del servizio di traduzione multilingua integrato (Google Translate), la piattaforma di terze parti Google Inc. installa cookie tecnici o analitici di terze parti per gestire la memorizzazione della lingua di destinazione selezionata ed erogare il servizio in modo fluido.
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-white border-l-2 border-[#10B981] pl-2 font-mono">2. Consenso ed Abilitazione dei Cookie</h4>
              <p>
                Al primo accesso al sito viene mostrato un banner informativo a fondo schermo. Cliccando su "Accetta Tutti" l'utente acconsente al caricamento delle preferenze e dei cookie descritti. Qualora l'utente preferisca bloccare i cookie di terze parti, può farlo configurando opportunamente le impostazioni del proprio browser web o rifiutando i cookie facoltativi dal banner.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-white border-l-2 border-[#10B981] pl-2 font-mono">3. Come disabilitare i cookie tramite Browser</h4>
              <p>
                Ogni utente può rifiutare o cancellare i cookie modificando manualmente le impostazioni del proprio browser di navigazione (Chrome, Firefox, Edge, Safari, Opera). Si ricorda che la disabilitazione totale dei cookie tecnici potrebbe compromettere la navigazione ottimale di alcune sezioni di FACILISSIMO WEB.
              </p>
            </div>
          </div>
        );

      case 'terms':
        return (
          <div className="space-y-6 text-slate-300 text-xs sm:text-sm leading-relaxed text-left font-sans font-light">
            <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
              <FileText className="w-8 h-8 text-[#10B981]" />
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider font-display">Termini e Condizioni di Servizio</h3>
                <p className="text-[10px] text-white/50 uppercase tracking-widest font-mono">Accordo contrattuale per le prestazioni di consulenza e sviluppo web</p>
              </div>
            </div>

            <p>
              I presenti Termini e Condizioni disciplinano l'utilizzo di questo sito web e la prenotazione delle sessioni di ingaggio preliminare fornite da FACILISSIMO WEB.
            </p>

            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-white border-l-2 border-[#10B981] pl-2 font-mono">1. Oggetto dei Servizi Preliminari</h4>
              <p>
                FACILISSIMO WEB offre all'utente la possibilità di richiedere due specifiche modalità di contatto ed ingaggio preliminare:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Call Preliminare Gratuita (15 Minuti):</strong> Briefing puramente esplorativo volto a inquadrare l'idea generale della piattaforma, utile per valutare la tipologia di sviluppo raccomandata. Non costituisce parere o consulenza professionale vincolante.
                </li>
                <li>
                  <strong>Sessione Strategica (60 Minuti):</strong> Consulenza avanzata professionale ed approfondita volta alla pianificazione di un wireframe strategico preliminare, analisi dell'architettura dell'informazione, definizione dei messaggi chiave e consegna di un piano strategico per il funnel di conversione. È soggetta alle condizioni tariffarie concordate.
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-white border-l-2 border-[#10B981] pl-2 font-mono">2. Accuratezza delle Informazioni</h4>
              <p>
                L'utente dichiara che tutti i dati inseriti nel modulo di prenotazione contatti sono veritieri, aggiornati e corretti. FACILISSIMO WEB non è responsabile per la mancata erogazione delle sessioni dovuta a email o numeri di telefono errati o inattivi inseriti dall'utente.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-white border-l-2 border-[#10B981] pl-2 font-mono">3. Clausola di Riservatezza ed Etica Professionale</h4>
              <p>
                Qualsiasi idea di business, bozza di progetto o informazione industriale condivisa dall'utente prima, durante o dopo le sessioni di ingaggio è tutelata da <strong>segreto professionale assoluto</strong>. FACILISSIMO WEB si impegna a trattare tali dati in massima conformità etica, senza divulgarli o sfruttarli in alcun modo a vantaggio proprio o di concorrenti terzi.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-white border-l-2 border-[#10B981] pl-2 font-mono">4. Limitazione di Responsabilità</h4>
              <p>
                I consigli strategici forniti durante le sessioni preliminari rappresentano pareri professionali basati sull'esperienza. Il successo commerciale effettivo dipende dall'esecuzione operativa, dal mercato e da variabili esterne indipendenti da FACILISSIMO WEB, che non può pertanto garantire risultati matematici di profitto o conversione legati alle sole sessioni preliminari.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div id="legal-modal-overlay" className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
      <div 
        ref={modalBodyRef}
        id="legal-modal-body" 
        className="bg-[#111113] border-2 border-[#10B981] max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative flex flex-col rounded-none animate-scaleIn"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white hover:bg-white/5 transition-colors cursor-pointer"
          aria-label="Chiudi finestra"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Dynamic Modal Content */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {renderContent()}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-white/10 px-6 sm:px-8 py-4 bg-[#09090b] flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-[#bef264] text-black text-xs font-bold uppercase tracking-widest hover:bg-[#a3e635] transition-colors cursor-pointer font-mono"
          >
            Ho Letto e Compreso
          </button>
        </div>
      </div>
    </div>
  );
}
