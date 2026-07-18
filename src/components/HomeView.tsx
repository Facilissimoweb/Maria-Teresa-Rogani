import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Code, Cpu, Target, ShieldCheck, Zap, Briefcase, User, ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { ActiveTab } from '../types';
import heroImg from '../assets/images/regenerated_image_1782982577389.png';
import { GlossaryParagraph } from './GlossaryTerm';

const testimonials = [
  {
    id: 1,
    category: 'b2b',
    role: 'Studi Specialistici & Professionisti',
    author: 'Dr. L. Rossi',
    entity: 'Studio Medico Specialistico Dr. Rossi',
    quote: "M. Teresa ha riprogettato la nostra presenza digitale con un focus rigoroso su accessibilità e privacy. Il risultato è straordinario: i pazienti trovano subito le informazioni e il modulo di contatto sicuro ha semplificato la gestione del nostro studio medico, raddoppiando le richieste dirette.",
    rating: 5,
    tag: 'Accessibilità & GDPR'
  },
  {
    id: 2,
    category: 'private',
    role: 'Cittadini Comuni & Privati',
    author: 'Dr. Alessandro Cortese',
    entity: 'Ricercatore & Scrittore Indipendente',
    quote: "Come singolo cittadino e appassionato di cultura, cercavo qualcuno che sapesse ascoltare la mia idea di blog letterario senza impormi pacchetti standardizzati e costosi. Maria Teresa è stata un'alleata eccezionale, chiarissima nei costi e dotata di una sensibilità professionale rara.",
    rating: 5,
    tag: 'Portfolio & Blog'
  },
  {
    id: 3,
    category: 'b2b',
    role: 'Studi Specialistici & Professionisti',
    author: 'Avv. Bianca Mattei',
    entity: 'Studio Legale Mattei & Associati',
    quote: "Il rigoroso rispetto del GDPR e la trasparenza erano per noi requisiti di compliance non negoziabili. Facilissimo Web ha saputo coniugare una perfetta conformità normativa a un design pulito, accattivante e orientato a far risaltare la nostra competenza sul mercato della consulenza.",
    rating: 5,
    tag: 'Lead Generation & Compliance'
  },
  {
    id: 4,
    category: 'private',
    role: 'Cittadini Comuni & Privati',
    author: 'Elena Moretti',
    entity: 'Iniziativa Culturale "Quartieri Attivi"',
    quote: "Avevamo bisogno di un sito web per la nostra associazione no-profit che fosse realmente fruibile anche da persone anziane o con disabilità visive. M. Teresa ha fatto un lavoro eccezionale: chiaro, ad altissimo contrasto e accessibile. La sua dedizione e trasparenza economica sono state encomiabili.",
    rating: 5,
    tag: 'Inclusione & Usabilità'
  }
];

interface HomeViewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export default function HomeView({ setActiveTab }: HomeViewProps) {
  const [scrollY, setScrollY] = React.useState(0);
  const [selectedCategory, setSelectedCategory] = React.useState<'all' | 'b2b' | 'private'>('all');
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  const filteredTestimonials = testimonials.filter(
    t => selectedCategory === 'all' || t.category === selectedCategory
  );

  React.useEffect(() => {
    setActiveIndex(0);
  }, [selectedCategory]);

  React.useEffect(() => {
    if (isHovered || filteredTestimonials.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % filteredTestimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [filteredTestimonials.length, isHovered]);

  const handlePrev = () => {
    if (filteredTestimonials.length <= 1) return;
    setActiveIndex(prev => (prev === 0 ? filteredTestimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (filteredTestimonials.length <= 1) return;
    setActiveIndex(prev => (prev + 1) % filteredTestimonials.length);
  };

  React.useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Move the background image down at 35% of the scroll speed
  const parallaxOffset = scrollY * 0.35;

  return (
    <article id="home-view" className="animate-fadeIn">
      {/* HERO SECTION */}
      <section id="hero-section" className="relative bg-[#111113] text-white overflow-hidden py-16 lg:py-24 border-b border-white/10">

        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src={heroImg} 
            alt="Facilissimo Web Studio Background" 
            className="absolute left-0 w-full h-[140%] -top-[20%] object-cover object-center scale-105"
            style={{
              transform: `translate3d(0, ${parallaxOffset}px, 0)`,
              willChange: 'transform'
            }}
            referrerPolicy="no-referrer"
          />
          {/* Subtle gradient overlay to allow the background photo to be beautifully visible while keeping text readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#09090b]/95 via-[#09090b]/70 to-[#09090b]/30 md:from-[#09090b]/90 md:via-[#09090b]/60 md:to-transparent" />
          <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
        </div>

        {/* Background Decorative Polygon Grid */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#d69429_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none z-0" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Content */}
          <motion.div 
            className="lg:col-span-7 space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="w-12 h-1 bg-[#d69429] mb-4"></div>
            
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-1 text-[10px] font-bold tracking-[0.2em] uppercase text-[#d69429] font-mono">
              <Sparkles className="w-3.5 h-3.5 text-[#dea954] shrink-0" />
              <span style={{ fontSize: '14px' }}>[L'Evoluzione dello Sviluppo Web]</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.85] font-display uppercase">
              <span className="bg-gradient-to-r from-[#e7bf7e] to-[#f4700a] bg-clip-text text-transparent block">Rigore.</span>
              <span className="bg-gradient-to-r from-[#e7bf7e] to-[#f4700a] bg-clip-text text-transparent block">Strategia.</span>
              <span className="bg-gradient-to-r from-[#e7bf7e] to-[#f4700a] bg-clip-text text-transparent block italic" style={{ fontSize: '50px' }}>Performance.</span>
            </h1>

            <h2 className="text-xl sm:text-2xl font-display uppercase text-[#d69429] tracking-wide font-bold leading-tight max-w-2xl" style={{ fontSize: '30px', lineHeight: '1.15' }}>
              Siti Web ad Elevata Conversione, <span className="text-white block mt-1.5 capitalize" style={{ fontWeight: 'bold', fontFamily: 'Geist, sans-serif', fontSize: '19px', lineHeight: '1.2' }}>Progettati con Rigore e Strategia.</span>
            </h2>
            
            <GlossaryParagraph id="hero-description-paragraph" className="text-base text-slate-400 font-normal leading-relaxed max-w-2xl text-left">
              FACILISSIMO WEB semplifica lo sviluppo web coniugando tecnologia d'avanguardia, etica professionale della comunicazione e massima trasparenza economica. Garantisco la massima conversione dei Vostri contatti grazie a un approccio fortemente strategico come la lead generation.
            </GlossaryParagraph>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                id="hero-cta-primary"
                onClick={() => {
                  setActiveTab('contatti');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-3.5 bg-gradient-to-r from-[#f4700a] via-[#e56f28] to-[#d69429] hover:brightness-110 text-black text-xs font-black uppercase tracking-[0.2em] shadow-lg transition-all duration-300 cursor-pointer font-mono"
              >
                Iniziate Ora
              </button>
              
              <button
                id="hero-cta-secondary"
                onClick={() => {
                  setActiveTab('servizi');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-3.5 border-2 border-[#f4700a] hover:bg-[#f4700a]/10 hover:text-orange-400 text-[#f4700a] text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer font-mono"
              >
                Scoprite i Metodi
              </button>
            </div>
          </motion.div>
          
          {/* Hero Image / UI Mockup with Strategic Side Panel */}
          <motion.div 
            className="lg:col-span-5 grid grid-cols-1 gap-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          >
            <div className="relative bg-black/40 border border-white/10 rounded-none overflow-hidden shadow-2xl">
              {/* Window header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#1b1b18] border-b border-white/10">
                <div className="flex space-x-1.5">
                  <span className="w-2.5 h-2.5 bg-white/20 rounded-full inline-block" />
                  <span className="w-2.5 h-2.5 bg-white/20 rounded-full inline-block" />
                  <span className="w-2.5 h-2.5 bg-white/20 rounded-full inline-block" />
                </div>
                <span className="text-[10px] text-white/40 font-mono tracking-wider">facilissimoweb/struttura</span>
              </div>
              
              {/* Image from template */}
              <img 
                src={heroImg} 
                alt="Facilissimo Web UI Mockup"
                className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity duration-350"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Strategic Info Box */}
            <div className="bg-[#1b1b18] border border-white/10 p-6 flex flex-col justify-center rounded-none select-none">
              <div className="mb-4">
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#d69429] mb-1 font-bold font-mono">Status Partner</p>
                <p className="text-lg font-bold text-white font-display uppercase tracking-tight">Social Lead's Manager Certificato</p>
              </div>
              <div className="space-y-3 text-xs text-white/70 font-mono">
                <div className="flex justify-between items-end border-b border-white/5 pb-1.5">
                  <span className="text-[9px] uppercase tracking-[0.15em] opacity-50">Metodo</span>
                  <span className="font-semibold text-white">Sviluppo Custom React</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/5 pb-1.5">
                  <span className="text-[9px] uppercase tracking-[0.15em] opacity-50">AI Integration</span>
                  <span className="font-semibold text-white">Trasparente / Consapevole</span>
                </div>
                <div className="flex justify-between items-end pb-1">
                  <span className="text-[9px] uppercase tracking-[0.15em] opacity-50">Focus Primario</span>
                  <span className="font-semibold text-[#d69429]">Massima Conversione</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AUDIENCE SECTION (A CHI MI RIVOLGO) */}
      <section id="audience-section" className="py-20 bg-[#0c0c0d] border-b border-white/10 text-white relative">
        {/* Subtle radial glow background accent */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-72 h-72 bg-[#f4700a]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 -translate-y-1/2 translate-x-1/2 w-80 h-80 bg-[#d69429]/5 blur-[140px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="px-3 py-1 bg-white/5 text-[#f4700a] text-[10px] font-bold tracking-[0.25em] uppercase border border-white/10 inline-block font-mono">
              Destinatari dei Servizi
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold font-display uppercase tracking-tight leading-none">
              A Chi si Rivolge <span className="bg-gradient-to-r from-[#e7bf7e] to-[#f4700a] bg-clip-text text-transparent block italic sm:inline">Facilissimo Web?</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400 font-sans font-light leading-relaxed max-w-2xl">
              I miei servizi di progettazione e consulenza digitale sono pensati per rendere il web accessibile, efficace e sicuro per chiunque. Mi rivolgo sia a realtà strutturate sia al singolo cittadino, offrendo percorsi personalizzati e trasparenti.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Target 1: Studi e Professionisti */}
            <motion.div 
              className="bg-[#131311] p-8 lg:p-10 border border-white/5 hover:border-white/10 transition-all duration-300 flex flex-col justify-between h-full group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="p-4 bg-[#d69429]/10 text-[#d69429] border border-[#d69429]/20">
                    <Briefcase className="w-8 h-8" />
                  </div>
                  <span className="text-[10px] font-mono text-white/30 tracking-[0.2em] uppercase font-bold">Studi &amp; Imprese</span>
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold font-display uppercase text-white group-hover:text-[#e7bf7e] transition-colors">
                  Studi Specialistici &amp; Professionisti
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                  Soluzioni digitali per chi desidera consolidare la propria autorevolezza, attirare clienti qualificati o digitalizzare la propria attività. Con un focus rigoroso su usabilità e normative.
                </p>

                <ul className="space-y-3.5 pt-2">
                  <li className="flex items-start text-xs text-slate-300 font-mono">
                    <span className="text-[#f4700a] mr-2 text-sm">✦</span>
                    <div>
                      <strong className="text-white">Studi Medici e Specialistici:</strong> Piattaforme sicure e accessibili per la presentazione dei servizi sanitari e contatti diretti.
                    </div>
                  </li>
                  <li className="flex items-start text-xs text-slate-300 font-mono">
                    <span className="text-[#f4700a] mr-2 text-sm">✦</span>
                    <div>
                      <strong className="text-white">Avvocati, Commercialisti e Consulenti:</strong> Siti web professionali ottimizzati per la lead generation e pienamente conformi al GDPR.
                    </div>
                  </li>
                  <li className="flex items-start text-xs text-slate-300 font-mono">
                    <span className="text-[#f4700a] mr-2 text-sm">✦</span>
                    <div>
                      <strong className="text-white">PMI e Artigiani:</strong> Vetrine digitali ad altissime prestazioni per valorizzare competenze uniche e attrarre nuovi mercati.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="pt-8 border-t border-white/5 mt-8">
                <button
                  onClick={() => {
                    setActiveTab('servizi');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center space-x-2 text-xs font-bold text-[#f4700a] hover:text-white uppercase tracking-wider font-mono transition-colors group-hover:translate-x-1 duration-300 cursor-pointer"
                >
                  <span>Esplora i servizi dedicati</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* Target 2: Cittadini e Privati */}
            <motion.div 
              className="bg-[#131311] p-8 lg:p-10 border border-white/5 hover:border-white/10 transition-all duration-300 flex flex-col justify-between h-full group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="p-4 bg-[#f4700a]/10 text-[#f4700a] border border-[#f4700a]/20">
                    <User className="w-8 h-8" />
                  </div>
                  <span className="text-[10px] font-mono text-white/30 tracking-[0.2em] uppercase font-bold">Cittadini &amp; Privati</span>
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold font-display uppercase text-white group-hover:text-[#f4700a] transition-colors">
                  Cittadini Comuni &amp; Privati
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                  Perché il digitale deve essere uno strumento democratico. Affianco i singoli cittadini per dare forma alle loro idee personali, professionali o associative con la massima semplicità.
                </p>

                <ul className="space-y-3.5 pt-2">
                  <li className="flex items-start text-xs text-slate-300 font-mono">
                    <span className="text-[#d69429] mr-2 text-sm">✦</span>
                    <div>
                      <strong className="text-white">Portfoli e CV Digitali:</strong> Pagine web eleganti e moderne per studenti, docenti o lavoratori che vogliono distinguersi nella ricerca attiva.
                    </div>
                  </li>
                  <li className="flex items-start text-xs text-slate-300 font-mono">
                    <span className="text-[#d69429] mr-2 text-sm">✦</span>
                    <div>
                      <strong className="text-white">Progetti Personali e Blog:</strong> Spazi digitali per diffondere passioni, hobby, ricerche scientifiche o attività culturali.
                    </div>
                  </li>
                  <li className="flex items-start text-xs text-slate-300 font-mono">
                    <span className="text-[#d69429] mr-2 text-sm">✦</span>
                    <div>
                      <strong className="text-white">Associazioni e No-Profit:</strong> Siti per promuovere iniziative di quartiere, culturali o benefiche, con massima accessibilità per tutti.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="pt-8 border-t border-white/5 mt-8">
                <button
                  onClick={() => {
                    setActiveTab('contatti');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center space-x-2 text-xs font-bold text-[#d69429] hover:text-white uppercase tracking-wider font-mono transition-colors group-hover:translate-x-1 duration-300 cursor-pointer"
                >
                  <span>Inizia un progetto personale</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CORE STATS & BRAND VALUES */}
      <section id="values-section" className="py-20 bg-gradient-to-b from-black via-[#f4700a]/25 to-[#111113] border-b border-white/10 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-4">
            <div className="space-y-2">
              <h2 className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-[#d69429]">I Miei Principi Fondanti</h2>
              <p className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-tight text-white">
                Un approccio pragmatico focalizzato sui Vostri risultati aziendali
              </p>
            </div>
            <div className="w-24 h-[1px] bg-white/10 hidden md:block shrink-0" />
            <p className="text-xs text-white/50 italic max-w-xs">Un percorso strutturato per garantire la Vostra eccellenza operativa.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-[#131311] p-8 rounded-none border-t-4 border-[#d69429] border-x border-b border-white/5 flex flex-col justify-between hover:bg-white/2 transition-colors duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="space-y-4">
                <div className="p-3 bg-[#d69429]/5 text-[#d69429] rounded-none w-fit border border-white/5">
                  <Target className="w-6 h-6 text-[#d69429]" />
                </div>
                <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider">Orientamento alla Conversione</h3>
                <GlossaryParagraph className="text-xs sm:text-sm text-white/70 leading-relaxed">
                   Ogni pixel, pulsante e paragrafo è studiato con l'unico obiettivo di guidare i Vostri utenti verso l'azione desiderata. Non realizzo semplici vetrine statiche, ma veri e propri catalizzatori di contatti con strategie avanzate di Lead Generation.
                </GlossaryParagraph>
              </div>
            </motion.div>

            <motion.div 
              className="bg-[#131311] p-8 rounded-none border-t-4 border-[#d69429]/70 border-x border-b border-white/5 flex flex-col justify-between hover:bg-white/2 transition-colors duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              <div className="space-y-4">
                <div className="p-3 bg-[#d69429]/5 text-[#d69429] rounded-none w-fit border border-white/5">
                  <ShieldCheck className="w-6 h-6 text-[#d69429]" />
                </div>
                <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider">Trasparenza Etica ed Economica</h3>
                <GlossaryParagraph className="text-xs sm:text-sm text-white/70 leading-relaxed">
                   I Vostri investimenti sono dettagliati singolarmente. Non vi troverete mai a fronteggiare costi nascosti o canoni ingiustificati. Riceverete report limpidi e chiarimenti approfonditi sulla conformità legale come GDPR e accessibilità.
                </GlossaryParagraph>
              </div>
            </motion.div>

            <motion.div 
              className="bg-[#131311] p-8 rounded-none border-t-4 border-[#d69429]/40 border-x border-b border-white/5 flex flex-col justify-between hover:bg-white/2 transition-colors duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="space-y-4">
                <div className="p-3 bg-[#d69429]/5 text-[#d69429] rounded-none w-fit border border-white/5">
                  <Code className="w-6 h-6 text-[#d69429]" />
                </div>
                <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider">Eccellenza Tecnologica</h3>
                <GlossaryParagraph className="text-xs sm:text-sm text-white/70 leading-relaxed">
                   Sfrutto competenze consolidate di comunicazione e sviluppo web in React. Questo garantisce codice d'élite in Tailwind CSS, elevati standard di sicurezza, conformità alle normative e scalabilità futura.
                </GlossaryParagraph>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI TRANSPARENCY SECTION */}
      <section id="ai-transparency-section" className="py-24 bg-[#131311] text-white relative overflow-hidden border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* AI Text Presentation */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-1 rounded-none text-[10px] font-bold tracking-[0.25em] text-[#d69429] font-mono">
                <Cpu className="w-4 h-4 text-[#d69429] shrink-0" />
                <span>ETICA E TRASPARENZA AI</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-none font-display uppercase">
                Integrazione Consapevole <br />
                <span className="text-[#d69429]">dell'Intelligenza Artificiale.</span>
              </h2>
              <GlossaryParagraph className="text-white/70 text-sm leading-relaxed">
                Sono fermamente convinta che l'Intelligenza Artificiale e i sistemi LLM rappresentino il più straordinario amplificatore di produttività del nostro secolo. Presso <strong>FACILISSIMO WEB</strong>, l'AI viene integrata in modo rigoroso, etico e pienamente conforme all'AI Act europeo per trasferire tutti i benefici di tempo e costo direttamente a Voi.
              </GlossaryParagraph>

              {/* Grid of AI benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-white/5 border-t-2 border-[#d69429] text-white rounded-none mt-0.5 shrink-0">
                    <Zap className="w-4 h-4 text-[#d69429]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider font-mono">Sviluppo Accelerato del 50%</h4>
                    <p className="text-xs text-white/50 leading-relaxed mt-1">
                      Strumenti di generation ed analisi del codice mi consentono di dimezzare i tempi di codifica standard.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-white/5 border-t-2 border-[#d69429] text-white rounded-none mt-0.5 shrink-0">
                    <Code className="w-4 h-4 text-[#d69429]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider font-mono">Refactoring e Test Avanzati</h4>
                    <p className="text-xs text-white/50 leading-relaxed mt-1">
                      Verifico costantemente la robustezza logica del codice tramite verifiche automatizzate guidate dall'AI.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-white/5 border-t-2 border-[#d69429] text-white rounded-none mt-0.5 shrink-0">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider font-mono">Ottimizzazione UX e Contenuti</h4>
                    <p className="text-xs text-white/50 leading-relaxed mt-1">
                      Strutturo i flussi informativi per massimizzare la leggibilità e la pertinenza semantica SEO.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-white/5 border-t-2 border-[#d69429] text-white rounded-none mt-0.5 shrink-0">
                    <ShieldCheck className="w-4 h-4 text-[#f4700a]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider font-mono">Trasparenza Economica</h4>
                    <p className="text-xs text-white/50 leading-relaxed mt-1">
                      La riduzione dei costi di setup manuale si traduce in tariffe d'ingresso sensibilmente più competitive per Voi.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Interactive Manifesto Sidebar */}
            <div className="lg:col-span-5">
              <div className="bg-[#1b1b18] text-white p-8 rounded-none border border-white/10 shadow-xl space-y-6 relative select-none">
                <div className="absolute top-4 right-4 text-[#d69429] opacity-5">
                  <Cpu className="w-16 h-16" />
                </div>
                
                <h3 className="text-sm font-bold text-white uppercase tracking-[0.2em] border-b border-white/5 pb-3 flex items-center space-x-2 font-mono">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Il Mio Manifesto AI</span>
                </h3>

                <blockquote className="italic text-xs text-white/70 leading-relaxed font-sans">
                  "L'Intelligenza Artificiale non sostituisce la strategia e l'intuizione umana, ne amplifica la visione. Sviluppo siti web orientati alla conversione garantendo trasparenza assoluta sull'uso di algoritmi generativi per il Vostro progetto."
                </blockquote>

                <div className="space-y-3 pt-2 text-[10px] tracking-wider uppercase font-mono">
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-white/50">Progettazione Logica</span>
                    <span className="text-[#d69429] font-bold">100% Supervisionata</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-white/50">Generazione Codice Base</span>
                    <span className="text-[#f4700a] font-bold">Assistita da AI Generative</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-white/50">Test & Controllo Sicurezza</span>
                    <span className="text-amber-400 font-bold">Verificati Rigorosamente</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-white/50">Strategia di Conversione</span>
                    <span className="text-[#d69429] font-bold">Analisi Umana Esclusiva</span>
                  </div>
                </div>

                <div className="bg-white/2 border border-white/5 p-4 rounded-none text-xs text-white/70">
                  <p className="font-bold text-white mb-1 uppercase tracking-wider text-[10px] text-[#d69429] font-mono">Perché è un vantaggio per Voi?</p>
                  Siti che prima richiedevano settimane di lavoro e budget elevati vengono oggi realizzati in tempi rapidi, con standard qualitativi di prim'ordine e tariffe chiare.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CUSTOMER SUCCESS STORIES (TESTIMONIALS CAROUSEL) */}
      <section id="testimonials-carousel" className="py-24 bg-[#0a0a0b] text-white relative border-b border-white/10 overflow-hidden">
        {/* Decorative backdrop glow */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 translate-x-1/3 w-80 h-80 bg-[#d69429]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 translate-y-1/3 -translate-x-1/3 w-80 h-80 bg-[#f4700a]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
            <span className="px-3 py-1 bg-white/5 text-[#f4700a] text-[10px] font-bold tracking-[0.25em] uppercase border border-white/10 inline-block font-mono">
              Recensioni e Storie di Successo
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-display uppercase tracking-tight">
              La Parola ai <span className="bg-gradient-to-r from-[#e7bf7e] to-[#f4700a] bg-clip-text text-transparent italic block sm:inline">Nostri Clienti</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-sans font-light leading-relaxed">
              Trasparenza ed efficacia misurata sul campo. Leggete l'esperienza diretta sia degli studi professionali che dei privati che si sono affidati al mio percorso di ingaggio.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex justify-center items-center gap-2.5 sm:gap-4 mb-12 flex-wrap">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 font-mono border ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-[#f4700a] to-[#d69429] text-black border-transparent'
                  : 'bg-white/5 text-slate-300 border-white/5 hover:bg-white/10 hover:border-white/10'
              } cursor-pointer`}
            >
              Tutti ({testimonials.length})
            </button>
            <button
              onClick={() => setSelectedCategory('b2b')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 font-mono border ${
                selectedCategory === 'b2b'
                  ? 'bg-gradient-to-r from-[#f4700a] to-[#d69429] text-black border-transparent'
                  : 'bg-white/5 text-slate-300 border-white/5 hover:bg-white/10 hover:border-white/10'
              } cursor-pointer`}
            >
              Studi &amp; Imprese ({testimonials.filter(t => t.category === 'b2b').length})
            </button>
            <button
              onClick={() => setSelectedCategory('private')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 font-mono border ${
                selectedCategory === 'private'
                  ? 'bg-gradient-to-r from-[#f4700a] to-[#d69429] text-black border-transparent'
                  : 'bg-white/5 text-slate-300 border-white/5 hover:bg-white/10 hover:border-white/10'
              } cursor-pointer`}
            >
              Cittadini &amp; Privati ({testimonials.filter(t => t.category === 'private').length})
            </button>
          </div>

          {/* Active Testimonial Card Container */}
          <div 
            className="relative min-h-[360px] md:min-h-[280px] flex items-center justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {filteredTestimonials.map((item, idx) => {
              if (idx !== activeIndex) return null;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-4xl bg-[#131311] border border-white/5 p-8 sm:p-12 relative flex flex-col justify-between group"
                >
                  {/* Glowing vertical side accent lines */}
                  <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-[#f4700a] to-[#d69429]" />
                  
                  {/* Star Rating & Quote Decorator */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-1">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <Quote className="w-10 h-10 text-white/5 opacity-40 group-hover:text-[#f4700a]/15 transition-all duration-300" />
                  </div>

                  {/* Testimonial Quote */}
                  <blockquote className="text-base sm:text-lg lg:text-xl font-normal leading-relaxed text-white/90 italic font-sans mb-8">
                    "{item.quote}"
                  </blockquote>

                  {/* Author Meta Details */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/5">
                    <div>
                      <cite className="not-italic text-sm sm:text-base font-bold text-white font-display uppercase tracking-wide block">
                        {item.author}
                      </cite>
                      <span className="text-xs text-[#d69429] font-mono tracking-wider uppercase block mt-1">
                        {item.entity} — {item.role}
                      </span>
                    </div>

                    <span className="px-2.5 py-1 bg-white/5 text-[10px] text-white/50 font-mono tracking-widest uppercase border border-white/10 w-fit">
                      {item.tag}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center max-w-4xl mx-auto mt-8 px-4">
            {/* Left Button */}
            <button
              onClick={handlePrev}
              className="p-3 bg-white/5 hover:bg-[#f4700a]/10 hover:text-[#f4700a] border border-white/5 hover:border-[#f4700a]/20 transition-all duration-300 rounded-none cursor-pointer group"
              aria-label="Precedente recensione"
            >
              <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
            </button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {filteredTestimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 transition-all duration-300 cursor-pointer ${
                    idx === activeIndex
                      ? 'w-6 bg-gradient-to-r from-[#f4700a] to-[#d69429]'
                      : 'w-1.5 bg-white/10 hover:bg-white/30'
                  }`}
                  aria-label={`Vai alla recensione ${idx + 1}`}
                />
              ))}
            </div>

            {/* Right Button */}
            <button
              onClick={handleNext}
              className="p-3 bg-white/5 hover:bg-[#f4700a]/10 hover:text-[#f4700a] border border-white/5 hover:border-[#f4700a]/20 transition-all duration-300 rounded-none cursor-pointer group"
              aria-label="Prossima recensione"
            >
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Sincere Guarantee Label */}
          <div className="text-center mt-12 text-[10px] text-white/30 font-mono tracking-[0.15em] uppercase flex items-center justify-center gap-2">
            <span>✓ Recensioni reali e verificate al 100%</span>
            <span>•</span>
            <span>Nessun profilo finto o generato da AI</span>
          </div>

        </div>
      </section>

      {/* FINAL INTERACTIVE CALL TO ACTION */}
      <section id="home-cta-section" className="py-20 bg-[#1b1b18] text-white relative overflow-hidden border-t border-white/10">
        <div className="max-w-5xl mx-auto text-center relative z-10 px-6 lg:px-12 space-y-6">
          <div className="w-12 h-1 bg-[#d69429] mx-auto mb-4"></div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-none font-display uppercase">
            Pronti a definire la Vostra <span className="text-[#d69429]">nuova presenza digitale?</span>
          </h2>
          <p className="text-white/70 text-sm max-w-xl mx-auto leading-relaxed">
            Sia che desideriate un CMS ottimizzato o uno sviluppo interamente custom su misura, vi affianco con un approccio consulenziale e una strategia di comunicazione mirata ad alti standard qualitativi.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            <button
              onClick={() => {
                setActiveTab('contatti');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 bg-gradient-to-r from-[#f4700a] via-[#e56f28] to-[#d69429] hover:brightness-110 text-black text-xs font-black uppercase tracking-[0.2em] shadow-lg transition-all duration-300 cursor-pointer font-mono"
            >
              Richiedete la Vostra Call Gratuita
            </button>
          </div>
        </div>
      </section>
    </article>
  );
}
