import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  Share2, 
  Facebook, 
  Linkedin, 
  Twitter, 
  Link2, 
  ArrowLeft, 
  ChevronRight, 
  HelpCircle, 
  CheckCircle2, 
  ArrowUpRight, 
  BookOpen,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { GlossaryParagraph } from './GlossaryTerm';

interface BlogViewProps {
  setActiveTab: (tab: any) => void;
}

interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  blocks: {
    subtitle: string;
    content: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  cta: {
    text: string;
    buttonText: string;
    actionTab: 'contatti' | 'servizi';
  };
  meta: {
    description: string;
    keywords: string[];
  };
}

export default function BlogView({ setActiveTab }: BlogViewProps) {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Also scroll to top when article is selected or deselected
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [selectedArticleId]);

  const articles: Article[] = [
    {
      id: 'ai-act-web-design',
      title: "L'era dell'AI Act: Come l'Intelligenza Artificiale Etica trasforma il Web Design moderno",
      category: "Tecnologia & Normative",
      date: "25 Giugno 2026",
      readTime: "6 min lettura",
      excerpt: "L'introduzione della nuova normativa europea sull'Intelligenza Artificiale (AI Act) ridefinisce le regole del gioco digitale. Scopri come integrare l'AI nei tuoi processi mantenendo trasparenza etica ed assoluta conformità.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      meta: {
        description: "Scopri come l'AI Act influisce sul web design e sull'integrazione di intelligenza artificiale etica nei siti aziendali nel 2026.",
        keywords: ["AI Act", "Intelligenza Artificiale Etica", "Web Design 2026", "GDPR", "Trasparenza"]
      },
      blocks: [
        {
          subtitle: "1. La Rivoluzione della Trasparenza Informativa",
          content: "L'Unione Europea ha tracciato una linea chiara con l'AI Act: gli utenti finali devono sempre essere informati se stanno interagendo con un sistema automatizzato di Intelligenza Artificiale o se i contenuti proposti (testi, immagini, assistenti virtuali) sono frutto di algoritmi generativi. Nei siti web moderni, questo si traduce nell'obbligo di inserire dichiarazioni chiare di 'AI Disclosure', posizionate in prossimità di chatbot o generatori dinamici. Non si tratta solo di adempiere a un obbligo normativo, ma di costruire una relazione basata sulla fiducia e sul rispetto del tempo dell'utente."
        },
        {
          subtitle: "2. Rispetto della Privacy e Algoritmi Inclusivi",
          content: "Oltre alla trasparenza, l'AI Act richiede elevati standard di sicurezza e non discriminazione nell'elaborazione dei dati personali. Se il tuo sito web utilizza algoritmi predittivi o di profilazione per suggerire prodotti o servizi, questi devono essere documentati ed esenti da bias cognitivi che possano escludere o penalizzare determinate categorie di utenti. L'architettura del codice deve essere pulita, documentabile e aperta alle verifiche di conformità, garantendo che l'accessibilità web si fonda armoniosamente con la sicurezza informatica."
        },
        {
          subtitle: "3. Il Vantaggio Strategico del Design Responsabile",
          content: "I brand che scelgono la strada dell'etica fin da subito ottengono un posizionamento d'eccellenza. Mostrare ai visitatori che il proprio sito web rispetta i dettami dell'AI Act e valorizza la trasparenza attira lead ad alto valore, stanchi della sovraesposizione ai contenuti 'AI Slop' impersonali e di scarsa qualità. Il segreto è una sinergia equilibrata: l'Intelligenza Artificiale deve fungere da assistente per potenziare le funzionalità, non da sostituto della sensibilità strategica umana."
        }
      ],
      faqs: [
        {
          question: "Che cos'è esattamente l'AI Act e chi ne è influenzato?",
          answer: "L'AI Act è il primo regolamento globale e vincolante sull'Intelligenza Artificiale approvato dall'Unione Europea. Influenza chiunque sviluppi, fornisca o utilizzi sistemi di IA all'interno dell'UE, compresi i proprietari di siti web che integrano chatbot intelligenti o raccomandazioni personalizzate guidate dall'AI."
        },
        {
          question: "Come posso rendere il mio sito conforme all'AI Act?",
          answer: "È fondamentale inserire etichette di trasparenza (es. 'Generato con supporto di IA'), documentare l'uso dei dati se utilizzi modelli generativi, configurare chatbot in modo che sia evidente la loro natura robotica e non violare le linee guida sull'uso dei dati personali e dei cookie sensibili."
        },
        {
          question: "L'uso dell'AI nei testi penalizza il posizionamento SEO?",
          answer: "I motori di ricerca come Google penalizzano i testi generati in modo puramente massivo e privi di valore informativo aggiunto (AI slop). Se l'AI viene usata come base per una ricerca, ma il testo è scritto, ottimizzato e arricchito da un professionista umano, l'indicizzazione rimarrà eccellente."
        }
      ],
      cta: {
        text: "Vuoi allineare la tua piattaforma web alle normative europee sull'AI Act senza rinunciare all'innovazione tecnologica?",
        buttonText: "Richiedi un Audit Etico & Tecnologico",
        actionTab: "contatti"
      }
    },
    {
      id: 'lead-gen-social-strategy',
      title: "Lead Generation Efficace su Meta e LinkedIn: Strategie per Convertire nel 2026",
      category: "Digital Marketing",
      date: "18 Giugno 2026",
      readTime: "8 min lettura",
      excerpt: "Basta sprecare budget in clic inutili. Scopri la formula scientifica per attrarre lead caldi attraverso un mix strategico di inserzioni targettizzate, landing page dedicate e flussi automatici di nutrimento.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      meta: {
        description: "Strategia definitiva per fare social lead generation su Facebook, Instagram e LinkedIn ottimizzando il tasso di conversione e il ROI delle campagne.",
        keywords: ["Social Lead Generation", "Meta Ads", "LinkedIn Ads", "Funnels automatici", "Landing Page"]
      },
      blocks: [
        {
          subtitle: "1. Superare il Rumore di Fondo dei Feed Social",
          content: "Nel mercato saturo di oggi, un'inserzione generica che promette un banale 'preventivo gratuito' ha un tasso di conversione prossimo allo zero. Per catturare l'attenzione di un utente distratto, devi offrire un valore immediato e tangibile (il cosiddetto Lead Magnet). Che si tratti di un PDF strategico, di un foglio di calcolo personalizzato o di un video di spiegazione esclusivo, il potenziale cliente deve percepire che lo scambio di dati sia un ottimo affare per lui. Il copy deve essere incentrato sulla risoluzione di un problema specifico, non sull'auto-celebrazione della tua azienda."
        },
        {
          subtitle: "2. La Forza di una Landing Page Minimale e Focalizzata",
          content: "Portare traffico qualificato da Meta o LinkedIn su una homepage generica o un sito pieno di link è il modo migliore per bruciare budget pubblicitario. Ogni campagna di Lead Generation necessita di una Landing Page a focus singolo: nessun menu di navigazione superiore, un titolo forte e dirompente, un form di contatto brevissimo ma strategico (chiedendo solo i dati vitali) e forti elementi di riprova sociale (testimonianze reali). La pagina deve caricarsi in meno di 1.5 secondi e presentarsi in modo impeccabile sui dispositivi mobile."
        },
        {
          subtitle: "3. Riscaldare i Contatti in Automatico (Lead Nurturing)",
          content: "Ottenere il contatto è solo il primo passo. Il vero tasso di conversione finale in vendite si decide nelle prime 48 ore successive alla compilazione del modulo. Un flusso di email marketing automatico e ben calibrato deve dare il benvenuto al contatto, consegnare immediatamente il valore promesso e spiegare nei giorni successivi perché la tua soluzione è l'unica in grado di risolvere il suo mal di testa commerciale. L'automazione lavora mentre tu ti dedichi ad altro, consegnando al tuo team commerciale solo lead pronti e predisposti all'acquisto."
        }
      ],
      faqs: [
        {
          question: "È meglio investire su Meta Ads (Facebook/Instagram) o su LinkedIn Ads?",
          answer: "Dipende dal target. Se vendi a privati (B2C) o a piccoli professionisti, Meta Ads offre costi per lead molto più bassi. Se vendi a imprese strutturate (B2B), direttori acquisti o settori di nicchia industriale, LinkedIn Ads è impareggiabile per precisione di targettizzazione professionale, sebbene richieda budget di partenza più elevati."
        },
        {
          question: "Qual è il budget minimo consigliato per iniziare a vedere risultati?",
          answer: "Consigliamo di partire con almeno € 15-20 al giorno per singola piattaforma. Questo budget consente agli algoritmi di fare test di apprendimento sufficienti ed identificare il pubblico più incline alla conversione nel minor tempo possibile."
        },
        {
          question: "Che cos'è un Lead Magnet e quale dovrei scegliere?",
          answer: "Il Lead Magnet è una risorsa gratuita che regali in cambio dei dati dell'utente. I migliori sono quelli focalizzati su un risultato rapido: una checklist di 5 punti, un calcolatore di costi su file Excel, o un video-corso di 10 minuti che risolve un problema specifico del tuo settore."
        }
      ],
      cta: {
        text: "Pronto a costruire un sistema automatizzato che genera lead profilati su base quotidiana per il tuo business?",
        buttonText: "Configura la tua Lead Generation",
        actionTab: "servizi"
      }
    },
    {
      id: 'accessibilita-web-business',
      title: "Accessibilità Web: Perché un sito accessibile vende fino al 20% in più",
      category: "Business & UX Design",
      date: "10 Giugno 2026",
      readTime: "7 min lettura",
      excerpt: "Rendere un sito internet pienamente accessibile non è solo un dovere morale e legislativo. È una scelta di business straordinaria che allarga il bacino dei tuoi clienti e migliora la SEO organica complessiva.",
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
      meta: {
        description: "L'accessibilità web come leva competitiva. Scopri come l'adeguamento alle WCAG aumenta il fatturato, migliora la SEO e allinea il brand alle leggi vigenti.",
        keywords: ["Accessibilità Web", "WCAG 2.1", "SEO", "User Experience", "Fatturato aziendale"]
      },
      blocks: [
        {
          subtitle: "1. La Barriera Invisibile che Allontana i Tuoi Clienti",
          content: "Circa il 15% della popolazione mondiale vive con una forma di disabilità temporanea o permanente (problemi visivi, uditivi, motori o cognitivi). Quando un sito web presenta testi a basso contrasto, pulsanti impossibili da navigare via tastiera, o moduli di contatto che generano errori privi di feedback sonoro o testuale, si stanno letteralmente cacciando via questi utenti. Fornire un'esperienza senza barriere significa accogliere fette di mercato che la concorrenza sta ignorando, convertendo visitatori precedentemente impossibilitati a concludere un acquisto o a richiedere un servizio."
        },
        {
          subtitle: "2. Ottimizzazione Tecnica e Linee Guida WCAG 2.1",
          content: "Implementare l'accessibilità non significa rendere un sito noioso o esteticamente povero. Al contrario, richiede un design ordinato e un codice strutturato. L'uso corretto dei tag HTML semantici (come <header>, <main>, <nav>, <article>), gli attributi 'alt' descrittivi per tutte le immagini, l'indice di focus visibile e la compatibilità con i lettori dello schermo (screen reader) sono i pilastri delle linee guida WCAG. Questa precisione ingegneristica viene premiata enormemente anche dagli algoritmi dei motori di ricerca."
        },
        {
          subtitle: "3. Il Ritorno sull'Investimento: Benefici Legali, SEO e SEO Reputazionale",
          content: "Un codice accessibile è sinonimo di un codice pulitissimo. Google adora l'HTML semantico e la velocità di caricamento che ne consegue, posizionando i siti conformi più in alto nei risultati organici. Inoltre, l'adeguamento previene pesanti sanzioni legislative previste dalle normative europee. Dal punto di vista del brand, posizionarsi come un'azienda inclusiva e socialmente responsabile genera un valore reputazionale inestimabile che fidelizza i clienti nel lungo termine."
        }
      ],
      faqs: [
        {
          question: "Cosa sono le linee guida WCAG?",
          answer: "Le WCAG (Web Content Accessibility Guidelines) sono gli standard internazionali definiti dal W3C per spiegare come rendere i contenuti web accessibili a persone con disabilità visive, uditive, fisiche, vocali, cognitive o neurologiche."
        },
        {
          question: "L'accessibilità è obbligatoria per legge per le piccole aziende?",
          answer: "L'Unione Europea, attraverso l'European Accessibility Act, ha esteso gli obblighi di accessibilità a moltissime categorie del settore privato, tra cui e-commerce, servizi bancari e aziende di trasporti. Ma al di l' della legge, rimane una scelta etica e commerciale fondamentale per chiunque."
        },
        {
          question: "Un sito accessibile costa molto di più?",
          answer: "Se l'accessibilità viene progettata fin dal primo giorno (Accessibility by Design), l'aumento dei costi è minimo poiché fa parte delle buone pratiche di sviluppo standard. L'adeguamento di un sito vecchio e mal progettato richiede invece un'analisi tecnica e un rifacimento che può richiedere un investimento maggiore."
        }
      ],
      cta: {
        text: "Desideri verificare se la tua attuale piattaforma web rispetta i criteri di accessibilità e scoprire quante vendite stai perdendo?",
        buttonText: "Esegui un Test di Accessibilità Gratuito",
        actionTab: "contatti"
      }
    }
  ];

  const handleShare = (article: Article, platform: 'wa' | 'fb' | 'li' | 'tw' | 'copy') => {
    const url = `${window.location.origin}/blog/${article.id}`;
    
    // Explicitly construct share contents with Excerpt and Image URL where possible
    const shareText = `*${article.title}*\n\n"${article.excerpt}"\n\nLeggi l'articolo completo su Facilissimo Web: ${url}`;
    
    if (platform === 'wa') {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
    } else if (platform === 'fb') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(article.excerpt)}`, '_blank');
    } else if (platform === 'li') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'tw') {
      const truncatedExcerpt = article.excerpt.length > 100 ? article.excerpt.substring(0, 97) + "..." : article.excerpt;
      const tweetText = `"${article.title}"\n\n${truncatedExcerpt}\n`;
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'copy') {
      const clipboardContent = `${article.title}\n\n${article.excerpt}\n\nLink: ${url}`;
      navigator.clipboard.writeText(clipboardContent);
      setCopiedId(article.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const selectedArticle = articles.find(a => a.id === selectedArticleId);

  // Synchronize browser metadata dynamically with selected article
  useEffect(() => {
    if (selectedArticleId && selectedArticle) {
      document.title = `${selectedArticle.title} | Il Blog di Facilissimo Web`;
    } else {
      document.title = 'Blog, Risorse e Strategia Digitale | Facilissimo Web';
    }
  }, [selectedArticleId, selectedArticle]);

  // Synchronize browser URL bar and back/forward navigation when selectedArticleId changes
  useEffect(() => {
    if (selectedArticleId) {
      const targetPath = `/blog/${selectedArticleId}`;
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ tab: 'blog', articleId: selectedArticleId }, '', targetPath);
      }
    } else {
      const targetPath = '/blog';
      if (window.location.pathname !== targetPath && window.location.pathname.startsWith('/blog/')) {
        window.history.pushState({ tab: 'blog' }, '', targetPath);
      }
    }
  }, [selectedArticleId]);

  // Handle direct url hash, pathname, or query param access on mount or popstate
  useEffect(() => {
    const handleUrlRouting = () => {
      const hash = window.location.hash.replace('#', '');
      const rawPath = window.location.pathname.replace(/^\/|\/$/g, '');
      
      const urlParams = new URLSearchParams(window.location.search);
      const queryArticle = urlParams.get('article');

      let matchedArticleId: string | null = null;

      if (rawPath.startsWith('blog/')) {
        const parts = rawPath.split('/');
        if (parts[1] && articles.some(a => a.id === parts[1])) {
          matchedArticleId = parts[1];
        }
      } else if (articles.some(a => a.id === rawPath)) {
        matchedArticleId = rawPath;
      } else if (hash && articles.some(a => a.id === hash)) {
        matchedArticleId = hash;
      } else if (queryArticle && articles.some(a => a.id === queryArticle)) {
        matchedArticleId = queryArticle;
      }

      if (matchedArticleId) {
        setSelectedArticleId(matchedArticleId);
      } else {
        if (window.location.pathname === '/blog' || window.location.pathname === '/blog/') {
          setSelectedArticleId(null);
        }
      }
    };

    handleUrlRouting();
    window.addEventListener('hashchange', handleUrlRouting);
    window.addEventListener('popstate', handleUrlRouting);
    return () => {
      window.removeEventListener('hashchange', handleUrlRouting);
      window.removeEventListener('popstate', handleUrlRouting);
    };
  }, []);

  return (
    <article id="blog-view" className="w-full bg-[#111113] text-white">
      
      {/* Blog Hero Banner */}
      <section id="blog-hero" className="relative py-16 lg:py-24 overflow-hidden bg-[#111113] border-b border-white/10">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f4700a_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-center space-y-6">
          <div className="w-12 h-1 bg-[#f4700a] mx-auto"></div>
          <span className="px-3 py-1 bg-white/5 text-[#f4700a] text-[10px] font-bold tracking-[0.25em] uppercase border border-white/10 inline-block font-mono">
            Risorse e Insights
          </span>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white font-display uppercase">
            Il Nostro <span className="text-[#f4700a] italic">Blog</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-300 font-sans font-light leading-relaxed">
            Consulenza, strategie, novità normative e approfondimenti pratici per trasformare la presenza digitale della Vostra azienda in uno strumento etico, performante e ad alta conversione.
          </p>
        </div>
      </section>

      {/* Main Blog Page / Detail Switcher */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 bg-[#111113] border-b border-white/10">
        <AnimatePresence mode="wait">
          {!selectedArticleId ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {articles.map((article) => (
                <div 
                  key={article.id} 
                  id={`article-card-${article.id}`}
                  onClick={() => setSelectedArticleId(article.id)}
                  className="bg-[#111113] border border-white/5 rounded-none flex flex-col justify-between overflow-hidden shadow-sm hover:border-[#f4700a]/40 transition-all duration-300 group cursor-pointer"
                >
                  <div>
                    {/* Cover Image */}
                    <div className="h-48 overflow-hidden bg-black/40 relative border-b border-white/10">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-4 left-4 bg-black/80 border border-white/15 text-white text-[9px] font-mono font-bold tracking-wider uppercase px-2.5 py-1">
                        {article.category}
                      </span>
                    </div>

                    {/* Meta info */}
                    <div className="p-6 pb-0 space-y-4">
                      <div className="flex items-center space-x-4 text-[10px] font-mono text-white/50">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3.5 h-3.5 text-[#f4700a]" />
                          <span>{article.date}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5 text-[#f4700a]" />
                          <span>{article.readTime}</span>
                        </span>
                      </div>

                      <h2 className="text-lg font-bold text-white uppercase tracking-tight font-display leading-snug group-hover:text-[#f4700a] transition-colors duration-200">
                        {article.title}
                      </h2>

                      <p className="text-xs text-white/60 line-clamp-3 leading-relaxed font-sans font-light">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Footer Action and Sharing */}
                  <div className="p-6 pt-4 border-t border-white/5 mt-6 flex justify-between items-center bg-black/10">
                    <button
                      onClick={() => setSelectedArticleId(article.id)}
                      className="text-white hover:text-[#f4700a] font-bold text-[10px] uppercase tracking-wider flex items-center space-x-1 group/btn cursor-pointer font-mono"
                    >
                      <span>Leggi Articolo</span>
                      <ChevronRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                    </button>

                    {/* Social sharing row */}
                    <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleShare(article, 'copy')}
                        className="p-1.5 text-white/40 hover:text-white hover:bg-white/5 transition-all cursor-pointer rounded-none"
                        title="Copia link"
                      >
                        <Link2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleShare(article, 'wa')}
                        className="p-1.5 text-white/40 hover:text-[#f4700a] hover:bg-white/5 transition-all cursor-pointer rounded-none"
                        title="Condividi su WhatsApp"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </button>
                      {copiedId === article.id && (
                        <span className="absolute transform -translate-y-6 bg-black border border-white/10 text-white text-[9px] px-2 py-0.5 font-mono">
                          Copiato!
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            // Full Article Detail View
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {/* Back Link */}
              <button
                onClick={() => {
                  setSelectedArticleId(null);
                  setExpandedFaq(null);
                }}
                className="inline-flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-[#f4700a] hover:underline cursor-pointer font-mono"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Torna alla lista</span>
              </button>

              {selectedArticle && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  
                  {/* Article Content Area */}
                  <div className="lg:col-span-8 space-y-10 bg-[#111113] p-6 sm:p-10 border border-white/5">
                    
                    {/* Header meta */}
                    <div className="space-y-4">
                      <span className="bg-white/5 text-[#f4700a] text-[10px] font-bold tracking-widest uppercase px-3 py-1 border border-white/10 font-mono">
                        {selectedArticle.category}
                      </span>
                      <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight uppercase leading-tight font-display">
                        {selectedArticle.title}
                      </h2>
                      
                      <div className="flex items-center space-x-6 text-xs text-white/50 font-mono border-y border-white/5 py-3">
                        <span className="flex items-center space-x-1.5">
                          <Calendar className="w-4 h-4 text-[#f4700a]" />
                          <span>Pubblicato il: {selectedArticle.date}</span>
                        </span>
                        <span className="flex items-center space-x-1.5">
                          <Clock className="w-4 h-4 text-[#f4700a]" />
                          <span>Tempo di lettura: {selectedArticle.readTime}</span>
                        </span>
                      </div>
                    </div>

                    {/* Excerpt */}
                    <GlossaryParagraph className="text-sm sm:text-base font-medium text-white/90 leading-relaxed border-l-4 border-[#f4700a] pl-4 italic font-sans">
                      {selectedArticle.excerpt}
                    </GlossaryParagraph>

                    {/* Cover image detail */}
                    <div className="h-64 sm:h-96 w-full overflow-hidden bg-black/40 border border-white/10">
                      <img 
                        src={selectedArticle.image} 
                        alt={selectedArticle.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content Blocks */}
                    <div className="space-y-8">
                      {selectedArticle.blocks.map((block, idx) => (
                        <div key={idx} className="space-y-3">
                          <h3 className="text-lg font-bold text-white uppercase tracking-wider font-display border-b border-white/5 pb-1">
                            {block.subtitle}
                          </h3>
                          <GlossaryParagraph className="text-xs sm:text-sm text-white/70 leading-relaxed whitespace-pre-line font-sans font-light">
                            {block.content}
                          </GlossaryParagraph>
                        </div>
                      ))}
                    </div>

                    {/* Dedicated Article FAQs */}
                    <div className="border-t border-white/10 pt-10 space-y-6">
                      <div className="flex items-center space-x-2">
                        <HelpCircle className="w-5 h-5 text-[#f4700a]" />
                        <h3 className="text-lg font-bold text-white uppercase tracking-wider font-display">
                          Domande Frequenti sull'Articolo
                        </h3>
                      </div>

                      <div className="space-y-3">
                        {selectedArticle.faqs.map((faq, idx) => (
                          <div 
                            key={idx}
                            className="border border-white/5 bg-black/20 p-4"
                          >
                            <button
                              onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                              className="w-full flex justify-between items-center text-left text-xs sm:text-sm font-bold text-white focus:outline-none cursor-pointer font-sans"
                            >
                              <span>{faq.question}</span>
                              <ChevronRight className={`w-4 h-4 transform transition-transform duration-200 ${expandedFaq === idx ? 'rotate-90 text-[#f4700a]' : 'text-slate-400'}`} />
                            </button>
                            
                            <AnimatePresence initial={false}>
                              {expandedFaq === idx && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <GlossaryParagraph className="text-[11px] sm:text-xs text-white/60 leading-relaxed pt-3 border-t border-white/5 mt-3 font-sans font-light">
                                    {faq.answer}
                                  </GlossaryParagraph>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Dedicated CTA */}
                    <div className="bg-[#1b1b1e] border border-white/10 text-white p-6 sm:p-8 space-y-4 relative overflow-hidden">
                      <div className="absolute right-0 bottom-0 opacity-10 translate-x-10 translate-y-10">
                        <Sparkles className="w-48 h-48 text-white" />
                      </div>
                      
                      <div className="relative z-10 space-y-3">
                        <h4 className="text-[10px] font-mono text-[#f4700a] font-bold uppercase tracking-widest">Sinergia Strategica</h4>
                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl font-light font-sans">
                          {selectedArticle.cta.text}
                        </p>
                        <button
                          onClick={() => setActiveTab(selectedArticle.cta.actionTab)}
                          className="px-5 py-3 bg-gradient-to-r from-[#f4700a] via-[#e56f28] to-[#d69429] hover:brightness-110 text-black text-[10px] font-black uppercase tracking-widest rounded-none transition-all duration-300 inline-flex items-center space-x-1 cursor-pointer font-mono shadow-md"
                        >
                          <span>{selectedArticle.cta.buttonText}</span>
                          <ArrowUpRight className="w-4 h-4 text-black" />
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Sidebar Meta and Sharing */}
                  <div className="lg:col-span-4 space-y-8 sticky top-24">
                    
                    {/* Share Box */}
                    <div className="bg-[#111113] p-6 border border-white/5 space-y-4">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2 font-mono">
                        Condividi l'Articolo
                      </h4>
                      <p className="text-[11px] text-white/50 leading-relaxed font-sans font-light">
                        Ti piace questa risorsa? Aiutami a diffondere trasparenza e cultura digitale condividendola sui tuoi canali professionali o personali:
                      </p>

                      <div className="grid grid-cols-2 gap-2.5 font-mono">
                        <button
                          onClick={() => handleShare(selectedArticle, 'li')}
                          className="py-2.5 px-3 border border-white/10 hover:border-[#f4700a] text-white/70 hover:text-white text-[10px] font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                          <span>LinkedIn</span>
                        </button>
                        <button
                          onClick={() => handleShare(selectedArticle, 'tw')}
                          className="py-2.5 px-3 border border-white/10 hover:border-[#f4700a] text-white/70 hover:text-white text-[10px] font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                        >
                          <Twitter className="w-3.5 h-3.5" />
                          <span>Twitter</span>
                        </button>
                        <button
                          onClick={() => handleShare(selectedArticle, 'fb')}
                          className="py-2.5 px-3 border border-white/10 hover:border-[#f4700a] text-white/70 hover:text-white text-[10px] font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                        >
                          <Facebook className="w-3.5 h-3.5" />
                          <span>Facebook</span>
                        </button>
                        <button
                          onClick={() => handleShare(selectedArticle, 'copy')}
                          className="py-2.5 px-3 border border-white/10 hover:border-[#f4700a] text-white/70 hover:text-white text-[10px] font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-colors cursor-pointer relative"
                        >
                          <Link2 className="w-3.5 h-3.5 text-[#f4700a]" />
                          <span>{copiedId === selectedArticle.id ? 'Copiato!' : 'Link'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Metadata Box */}
                    <div className="bg-[#111113] p-6 border border-white/5 space-y-4">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2 font-mono">
                        Indicizzazione & SEO
                      </h4>
                      <p className="text-[11px] text-white/50 leading-relaxed font-sans font-light">
                        Questo articolo è stato ottimizzato dal punto di vista semantico e strutturale con i seguenti metadati tecnici:
                      </p>

                      <div className="space-y-3">
                        <div>
                          <span className="text-[9px] font-bold text-white/40 uppercase tracking-wider block font-mono">Meta Description</span>
                          <span className="text-[11px] text-white/70 block italic leading-relaxed mt-1 font-sans font-light">
                            "{selectedArticle.meta.description}"
                          </span>
                        </div>
                        <div>
                          <span className="text-[9px] font-bold text-white/40 uppercase tracking-wider block font-mono">Parole Chiave Principali</span>
                          <div className="flex flex-wrap gap-1 mt-1.5 font-mono">
                            {selectedArticle.meta.keywords.map((kw, i) => (
                              <span key={i} className="text-[9px] font-bold bg-white/5 text-white/70 px-2 py-0.5">
                                #{kw}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sinergia banner info */}
                    <div className="bg-[#111113] p-6 border border-white/5 text-center space-y-4">
                      <Sparkles className="w-8 h-8 text-[#f4700a] mx-auto animate-pulse" />
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">
                        Consulenza su Misura
                      </h4>
                      <p className="text-[11px] text-white/50 leading-relaxed font-sans font-light">
                        Tutti i progetti di Facilissimo Web integrano accessibilità, conformità legale e copywriting strategico nativamente.
                      </p>
                      <button
                        onClick={() => setActiveTab('contatti')}
                        className="w-full py-2.5 border-2 border-[#f4700a] hover:bg-[#f4700a]/10 hover:text-orange-400 text-[#f4700a] text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer font-mono"
                      >
                        Prenota Sessione Gratuita
                      </button>
                    </div>

                  </div>

                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </article>
  );
}
