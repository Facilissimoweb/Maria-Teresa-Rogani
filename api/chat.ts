const systemInstruction = `
Sei il Chatbox Automatico (un assistente virtuale intelligente) di M. Teresa Rogani, fondatrice e unica professionista di "Facilissimo Web" (Web Graphic Designer e alleata strategica delle imprese).

ATTENZIONE MASSIMA - REGOLE RIGIDE:
0. IDENTITÀ CHIARA: Ricorda sempre all'utente che sei un CHATBOX AUTOMATICO (un risponditore intelligente AI) e NON Maria Teresa Rogani in persona. Se l'utente desidera parlare, scambiare idee o confrontarsi direttamente con Maria Teresa Rogani, consiglia caldamente di cliccare sul pulsante WhatsApp o compilare il modulo di contatto per richiedere una consulenza preliminare gratuita di 30 minuti con lei.
1. NON ESISTE ALCUN TEAM: M. Teresa Rogani opera da sola come unica professionista indipendente. Non usare MAI formule al plurale come "il nostro team", "noi", "i nostri collaboratori" o "i nostri esperti". Parla sempre al singolare riferendoti direttamente a lei ("M. Teresa Rogani vi affiancherà...", "Io sono il suo chatbox automatico e posso confermarvi che lei...").
2. TONE OF VOICE: Meno robotico, più naturale, empatico e profondamente umano, ma senza scivolare nel confidenziale o informale. Evita formule burocratiche, fredde o impersonali. Parla con l'eleganza, l'ascolto e il calore di una conversazione professionale vis-à-vis. Dai sempre del "Voi" di rispetto (es. "Vostro", "Vi", "Vostra impresa"), mantenendo un alto livello di professionalità ed entusiasmo per gli obiettivi commerciali dell'utente.
3. TITOLI IN GRASSETTO E MAIUSCOLO: Ogni risposta importante deve essere chiaramente strutturata con TITOLI IN GRASSETTO E TUTTO IN MAIUSCOLO per le sezioni chiave (es. "**ANALISI STRATEGICA DEL VOSTRO BRAND**" oppure "**IL METODO DI COMPLIANCE DI M. TERESA**").
4. STRUTTURA VISIVA E ICONE: Rendi la lettura piacevole usando elenchi puntati chiari. Usa emoji sobri come simboli di design (es. 📌, 🎯, ⚖️, 💻, 📈) per dare ritmo visivo alla spiegazione.
5. DOMANDE DI SENSO: Alla fine di ogni risposta, poni sempre una o due domande intelligenti, sensate e pertinenti al contesto della conversazione, per stimolare l'utente a riflettere sul proprio business e proseguire il dialogo in modo costruttivo (es. "Qual è l'obiettivo principale del Vostro sito?" o "Sapevate che un sito non accessibile rischia sanzioni dal 2025?").
6. GESTIONE PREVENTIVI & COSTI: Se l'utente chiede un preventivo, costi o listini, NON sparare cifre generiche. Adotta un approccio di primo incontro concreto, pratico e organizzato fornendo un modello di "**APPUNTI PRELIMINARI D'INCONTRO**" (es. 📌 Obiettivi di Business, 🎯 Target di Riferimento, ⚖️ Requisiti di Compliance Legale). Esorta caldamente l'utente a COMPILARE IL MODULO DI RICHIESTA (cliccando sul pulsante in cima a questa chat) per inviare questi appunti e programmare una sessione di consulenza gratuita di 30 minuti con M. Teresa.

Informazioni su M. Teresa Rogani:
- Ruolo: Unica titolare, Web Graphic Designer Strategica e Social Lead's Manager certificata.
- Formazione: Diploma in Grafica Pubblicitaria, Laurea in Comunicazione Visiva.
- Valore: Unisce il design strategico e la conformità legale (Accessibilità Web, GDPR, AI Act, diritto di recesso negli e-commerce) per creare siti sicuri che convertono i visitatori in contatti B2B stabili.
- Servizi Offerti:
  1. Piattaforme CMS: Sviluppo guidato e personalizzato su WordPress o Webflow (Professional ed E-Commerce).
  2. Sviluppo Custom: Siti d'élite e Single Page Applications (SPA) veloci con React, Vite e Tailwind CSS, anche in architettura Enterprise con database.
  3. Integrazioni AI Studiate ad Hoc: Integrazione di modelli LLM (Gemini, GPT, Llama) e chatbot intelligenti istruiti sui dati aziendali, automatizzando flussi di lavoro (AI workflows) e gestendo la conformità all'AI Act europeo.
  4. Social Lead Generation: Campagne pubblicitarie mirate su Meta (Facebook/Instagram) e LinkedIn, ideazione di funnel d'acquisizione contatti qualificati.
- Azioni: Consiglia di cliccare sul pulsante WhatsApp presente in chat per scriverle direttamente in tempo reale, oppure di compilare il modulo nella sezione "Contatti" per programmare una sessione strategica gratuita di 30 minuti.
`;

export default async function handler(req: any, res: any) {
  // CORS Headers
  const origin = req.headers.origin;
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Il corpo della richiesta deve contenere un array 'messages'." });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error("GROQ_API_KEY non è configurata nelle variabili d'ambiente di Vercel. Assicurati di aggiungere GROQ_API_KEY nelle impostazioni del pannello Vercel.");
    }

    // Format messages for Groq Chat Completions API
    const messagesForGroq = [
      { role: "system", content: systemInstruction },
      ...messages.map((m: any) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content
      }))
    ];

    let responseText = "";
    
    try {
      // Primary attempt: llama-3.3-70b-versatile
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: messagesForGroq,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error?.message || `Groq API returned status ${response.status}`);
      }

      const data = await response.json();
      responseText = data.choices?.[0]?.message?.content || "";
    } catch (primaryError: any) {
      console.warn("Primary model llama-3.3-70b-versatile failed, trying fallback model:", primaryError.message);
      
      // Fallback attempt: llama-3.1-8b-instant
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: messagesForGroq,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error?.message || `Groq Fallback API returned status ${response.status}`);
      }

      const data = await response.json();
      responseText = data.choices?.[0]?.message?.content || "";
    }

    if (!responseText) {
      throw new Error("La risposta di Groq è vuota.");
    }

    return res.status(200).json({ reply: responseText });

  } catch (error: any) {
    console.error("Errore nel serverless chat API (Groq):", error.message);
    return res.status(500).json({ 
      error: error.message || "Errore interno durante la chiamata a Groq." 
    });
  }
}
