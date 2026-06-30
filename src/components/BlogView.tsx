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
          answer: "L'Unione Europea, attraverso l'European Accessibility Act, ha esteso gli obblighi di accessibilità a moltissime categorie del settore privato, tra cui e-commerce, servizi bancari e aziende di trasporti. Ma al di là della legge, rimane una scelta etica e commerciale fondamentale per chiunque."
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
    const url = `${window.location.origin}/blog#${article.id}`;
    
    // Explicitly construct share contents with Excerpt and Image URL where possible
    const shareText = `*${article.title}*\n\n"${article.excerpt}"\n\nAnteprima visiva: ${article.image}\n\nLeggi l'articolo completo su Facilissimo Web: ${url}`;
    
    if (platform === 'wa') {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
    } else if (platform === 'fb') {
      // Facebook uses OG meta tags scraped from the URL. We also append a text summary in fallback
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(article.excerpt)}`, '_blank');
    } else if (platform === 'li') {
      // LinkedIn relies heavily on OG tags scraped from URL
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'tw') {
      // Twitter accepts text and URL parameters. We pass truncated excerpt and the URL
      const truncatedExcerpt = article.excerpt.length > 100 ? article.excerpt.substring(0, 97) + "..." : article.excerpt;
      const tweetText = `"${article.title}"\n\n${truncatedExcerpt}\n\nAnteprima: ${article.image}\n`;
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'copy') {
      // Custom clipboard text including title, excerpt, image, and link
      const clipboardContent = `${article.title}\n\n${article.excerpt}\n\nImmagine di riferimento: ${article.image}\n\nLink: ${url}`;
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

      const setMetaTag = (attributeName: string, attributeValue: string, contentValue: string) => {
        let el = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
        if (!el) {
          el = document.createElement('meta');
          el.setAttribute(attributeName, attributeValue);
          document.head.appendChild(el);
        }
        el.setAttribute('content', contentValue);
      };

      // Standard metadata
      setMetaTag('name', 'description', selectedArticle.excerpt);
      
      // Open Graph (Facebook / LinkedIn) metadata
      setMetaTag('property', 'og:title', selectedArticle.title);
      setMetaTag('property', 'og:description', selectedArticle.excerpt);
      setMetaTag('property', 'og:image', selectedArticle.image);
      setMetaTag('property', 'og:type', 'article');
      setMetaTag('property', 'og:url', `${window.location.origin}/blog#${selectedArticle.id}`);

      // Twitter Card metadata
      setMetaTag('name', 'twitter:card', 'summary_large_image');
      setMetaTag('name', 'twitter:title', selectedArticle.title);
      setMetaTag('name', 'twitter:description', selectedArticle.excerpt);
      setMetaTag('name', 'twitter:image', selectedArticle.image);
    } else {
      // Fallback/Default Blog page title and description
      document.title = 'Blog, Risorse e Strategia Digitale | Facilissimo Web';
      
      const setMetaTag = (attributeName: string, attributeValue: string, contentValue: string) => {
        let el = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
        if (el) el.setAttribute('content', contentValue);
      };
      
      setMetaTag('name', 'description', 'Il blog di Facilissimo Web. Leggi le ultime risorse, novità e guide strategiche per migliorare la presenza digitale della tua impresa.');
      setMetaTag('property', 'og:title', 'Blog, Risorse e Strategia Digitale | Facilissimo Web');
      setMetaTag('property', 'og:description', 'Il blog di Facilissimo Web. Leggi le ultime risorse, novità e guide strategiche per migliorare la presenza digitale della tua impresa.');
      setMetaTag('property', 'og:image', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80');
    }
  }, [selectedArticleId, selectedArticle]);

  // Handle direct url hash access on mount / hash change
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && articles.some(a => a.id === hash)) {
        setSelectedArticleId(hash);
        // Scroll to article content nicely
        setTimeout(() => {
          const el = document.getElementById('blog-hero');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 300, behavior: 'smooth' });
          }
        }, 150);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <article id="blog-view" className="w-full bg-[#FAFBFD] dark:bg-[#0a192f] transition-colors duration-300 min-h-screen text-slate-800 dark:text-slate-200">
      
      {/* Blog Hero Banner */}
      <section id="blog-hero" className="relative py-20 overflow-hidden bg-slate-900 text-white">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-[#4A90E2] blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-indigo-500 blur-3xl" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/40 to-[#0A192F]/95" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-center space-y-4">
          <span className="px-3 py-1 bg-[#4A90E2]/20 text-[#4A90E2] text-[10px] font-bold tracking-[0.25em] uppercase border border-[#4A90E2]/30 inline-block rounded-none">
            Risorse e Insights
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white uppercase font-sans">
            Il Blog di <span className="text-[#4A90E2]">Facilissimo</span> Web
          </h1>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
            Consulenza, strategie, novità normative e approfondimenti pratici per trasformare la presenza digitale della Vostra azienda in uno strumento etico, performante e ad alta conversione.
          </p>
        </div>
      </section>

      {/* Main Blog Page / Detail Switcher */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <AnimatePresence mode="wait">
          {!selectedArticleId ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {articles.map((article) => (
                <div 
                  key={article.id} 
                  id={`article-card-${article.id}`}
                  onClick={() => {
                    setSelectedArticleId(article.id);
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                  className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 rounded-none flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-white/10 transition-all duration-300 group cursor-pointer"
                >
                  <div>
                    {/* Cover Image */}
                    <div className="h-48 overflow-hidden bg-slate-100 relative">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-4 left-4 bg-[#0A192F] text-white text-[9px] font-bold tracking-wider uppercase px-2.5 py-1">
                        {article.category}
                      </span>
                    </div>

                    {/* Meta info */}
                    <div className="p-6 pb-0 space-y-3">
                      <div className="flex items-center space-x-4 text-[11px] font-mono font-medium text-slate-500">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3.5 h-3.5 text-[#4A90E2]" />
                          <span>{article.date}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5 text-[#4A90E2]" />
                          <span>{article.readTime}</span>
                        </span>
                      </div>

                      <h2 className="text-base sm:text-lg font-bold text-[#0A192F] dark:text-white leading-snug group-hover:text-[#4A90E2] transition-colors duration-200">
                        {article.title}
                      </h2>

                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Footer Action and Sharing */}
                  <div className="p-6 pt-4 border-t border-slate-100 dark:border-white/5 mt-6 flex justify-between items-center bg-slate-50/50 dark:bg-transparent">
                    <button
                      onClick={() => {
                        setSelectedArticleId(article.id);
                        window.scrollTo({ top: 300, behavior: 'smooth' });
                      }}
                      className="text-[#0A192F] dark:text-[#4A90E2] font-bold text-xs uppercase tracking-wider flex items-center space-x-1 group/btn cursor-pointer"
                    >
                      <span>Leggi Articolo</span>
                      <ChevronRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                    </button>

                    {/* Social sharing row */}
                    <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleShare(article, 'copy')}
                        className="p-1.5 text-slate-400 hover:text-[#0A192F] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all rounded-none cursor-pointer"
                        title="Copia link"
                      >
                        <Link2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleShare(article, 'wa')}
                        className="p-1.5 text-slate-400 hover:text-emerald-500 hover:bg-slate-100 dark:hover:bg-white/5 transition-all rounded-none cursor-pointer"
                        title="Condividi su WhatsApp"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </button>
                      {copiedId === article.id && (
                        <span className="absolute transform -translate-y-6 bg-slate-900 text-white text-[9px] px-2 py-0.5 rounded shadow">
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
                className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#0A192F] dark:text-[#4A90E2] hover:underline cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Torna alla lista degli articoli</span>
              </button>

              {selectedArticle && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  
                  {/* Article Content Area */}
                  <div className="lg:col-span-8 space-y-10 bg-white dark:bg-slate-900/40 p-6 sm:p-10 border border-slate-200 dark:border-white/5">
                    
                    {/* Header meta */}
                    <div className="space-y-4">
                      <span className="bg-[#4A90E2]/10 text-[#4A90E2] text-[10px] font-bold tracking-wider uppercase px-3 py-1 border border-[#4A90E2]/20">
                        {selectedArticle.category}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A192F] dark:text-white tracking-tight uppercase leading-tight">
                        {selectedArticle.title}
                      </h2>
                      
                      <div className="flex items-center space-x-6 text-xs text-slate-500 font-mono border-y border-slate-100 py-3">
                        <span className="flex items-center space-x-1.5">
                          <Calendar className="w-4 h-4 text-[#4A90E2]" />
                          <span>Pubblicato il: {selectedArticle.date}</span>
                        </span>
                        <span className="flex items-center space-x-1.5">
                          <Clock className="w-4 h-4 text-[#4A90E2]" />
                          <span>Tempo di lettura: {selectedArticle.readTime}</span>
                        </span>
                      </div>
                    </div>

                    {/* Excerpt */}
                    <p className="text-sm sm:text-base font-semibold text-[#0A192F] dark:text-slate-300 leading-relaxed border-l-4 border-[#4A90E2] pl-4 italic">
                      {selectedArticle.excerpt}
                    </p>

                    {/* Cover image detail */}
                    <div className="h-64 sm:h-96 w-full overflow-hidden bg-slate-100">
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
                          <h3 className="text-base sm:text-lg font-bold text-[#0A192F] dark:text-white uppercase tracking-wider">
                            {block.subtitle}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                            {block.content}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Dedicated Article FAQs */}
                    <div className="border-t border-slate-200 dark:border-white/10 pt-10 space-y-6">
                      <div className="flex items-center space-x-2">
                        <HelpCircle className="w-5 h-5 text-[#4A90E2]" />
                        <h3 className="text-base sm:text-lg font-bold text-[#0A192F] dark:text-white uppercase tracking-wider">
                          FAQ / Domande Frequenti sull'Articolo
                        </h3>
                      </div>

                      <div className="space-y-3">
                        {selectedArticle.faqs.map((faq, idx) => (
                          <div 
                            key={idx}
                            className="border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 p-4"
                          >
                            <button
                              onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                              className="w-full flex justify-between items-center text-left text-xs sm:text-sm font-bold text-[#0A192F] dark:text-white focus:outline-none cursor-pointer"
                            >
                              <span>{faq.question}</span>
                              <ChevronRight className={`w-4 h-4 transform transition-transform duration-200 ${expandedFaq === idx ? 'rotate-90 text-[#4A90E2]' : 'text-slate-400'}`} />
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
                                  <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-3 border-t border-slate-200/50 dark:border-white/5 mt-3">
                                    {faq.answer}
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Dedicated CTA */}
                    <div className="bg-[#0A192F] text-white p-6 sm:p-8 space-y-4 relative overflow-hidden">
                      <div className="absolute right-0 bottom-0 opacity-10 translate-x-10 translate-y-10">
                        <Sparkles className="w-48 h-48 text-white" />
                      </div>
                      
                      <div className="relative z-10 space-y-3">
                        <h4 className="text-xs font-mono text-[#4A90E2] font-bold uppercase tracking-widest">Sinergia Strategica</h4>
                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl font-medium">
                          {selectedArticle.cta.text}
                        </p>
                        <button
                          onClick={() => setActiveTab(selectedArticle.cta.actionTab)}
                          className="px-5 py-3 bg-white text-[#0A192F] hover:bg-[#4A90E2] hover:text-white text-[11px] font-bold uppercase tracking-widest rounded-none transition-all duration-150 inline-flex items-center space-x-1 cursor-pointer"
                        >
                          <span>{selectedArticle.cta.buttonText}</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Sidebar Meta and Sharing */}
                  <div className="lg:col-span-4 space-y-8 sticky top-24">
                    
                    {/* Share Box */}
                    <div className="bg-white dark:bg-slate-900/60 p-6 border border-slate-200 dark:border-white/5 space-y-4">
                      <h4 className="text-xs font-bold text-[#0A192F] dark:text-white uppercase tracking-wider border-b border-slate-100 pb-2">
                        Condividi l'Articolo
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Ti piace questa risorsa? Aiutami a diffondere trasparenza e cultura digitale condividendola sui tuoi canali professionali o personali:
                      </p>

                      <div className="grid grid-cols-2 gap-2.5">
                        <button
                          onClick={() => handleShare(selectedArticle, 'li')}
                          className="py-2.5 px-3 border border-slate-200 hover:border-[#0077b5] text-slate-600 hover:text-[#0077b5] text-[10px] font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                          <span>LinkedIn</span>
                        </button>
                        <button
                          onClick={() => handleShare(selectedArticle, 'tw')}
                          className="py-2.5 px-3 border border-slate-200 hover:border-slate-900 text-slate-600 hover:text-slate-900 text-[10px] font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                        >
                          <Twitter className="w-3.5 h-3.5" />
                          <span>Twitter</span>
                        </button>
                        <button
                          onClick={() => handleShare(selectedArticle, 'fb')}
                          className="py-2.5 px-3 border border-slate-200 hover:border-[#1877f2] text-slate-600 hover:text-[#1877f2] text-[10px] font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                        >
                          <Facebook className="w-3.5 h-3.5" />
                          <span>Facebook</span>
                        </button>
                        <button
                          onClick={() => handleShare(selectedArticle, 'copy')}
                          className="py-2.5 px-3 border border-slate-200 hover:border-slate-800 text-slate-600 hover:text-slate-800 text-[10px] font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-colors cursor-pointer relative"
                        >
                          <Link2 className="w-3.5 h-3.5 text-[#4A90E2]" />
                          <span>{copiedId === selectedArticle.id ? 'Copiato!' : 'Link'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Metadata Box */}
                    <div className="bg-white dark:bg-slate-900/60 p-6 border border-slate-200 dark:border-white/5 space-y-4">
                      <h4 className="text-xs font-bold text-[#0A192F] dark:text-white uppercase tracking-wider border-b border-slate-100 pb-2">
                        Indicizzazione & SEO
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Questo articolo è stato ottimizzato dal punto di vista semantico e strutturale con i seguenti metadati tecnici:
                      </p>

                      <div className="space-y-3">
                        <div>
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Meta Description</span>
                          <span className="text-[11px] text-slate-600 dark:text-slate-300 block italic leading-relaxed mt-1">
                            "{selectedArticle.meta.description}"
                          </span>
                        </div>
                        <div>
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Parole Chiave Principali</span>
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {selectedArticle.meta.keywords.map((kw, i) => (
                              <span key={i} className="text-[9px] font-mono font-bold bg-slate-100 dark:bg-white/5 text-[#0A192F] dark:text-slate-300 px-2 py-0.5">
                                #{kw}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sinergia banner info */}
                    <div className="bg-gradient-to-br from-indigo-50 to-slate-50 dark:from-slate-900 dark:to-slate-950 p-6 border border-slate-200 dark:border-white/5 text-center space-y-4">
                      <Sparkles className="w-8 h-8 text-[#4A90E2] mx-auto animate-pulse" />
                      <h4 className="text-xs font-bold text-[#0A192F] dark:text-white uppercase tracking-wider">
                        Consulenza su Misura
                      </h4>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                        Tutti i progetti di Facilissimo Web integrano accessibilità, conformità legale e copywriting strategico nativamente.
                      </p>
                      <button
                        onClick={() => setActiveTab('contatti')}
                        className="w-full py-2.5 border-2 border-[#0A192F] dark:border-[#4A90E2] hover:bg-[#0A192F] dark:hover:bg-[#4A90E2] hover:text-white text-[10px] font-bold uppercase tracking-wider transition-all duration-200 text-[#0A192F] dark:text-white cursor-pointer"
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
