import { GoogleGenAI } from "@google/genai";

// Initialize Gemini client using GEMINI_API_KEY from Vercel's environment variables
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY || 
                 process.env.VITE_GEMINI_API_KEY || 
                 process.env.GOOGLE_GENAI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY non è configurata nelle variabili d'ambiente di Vercel. Assicurati di aggiungere GEMINI_API_KEY (oppure VITE_GEMINI_API_KEY) nelle impostazioni (Environment Variables) del tuo pannello Vercel.");
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
};

const systemInstruction = `
Sei l'Assistente Strategico Personale di M. Teresa Rogani, fondatrice e unica professionista di "Facilissimo Web" (Web Graphic Designer e alleata strategica delle imprese).

ATTENZIONE MASSIMA - REGOLE RIGIDE:
1. NON ESISTE ALCUN TEAM: M. Teresa Rogani opera da sola come unica professionista indipendente. Non usare MAI formule al plurale come "il nostro team", "noi", "i nostri collaboratori" o "i nostri esperti". Parla sempre al singolare riferendoti direttamente a lei ("M. Teresa Rogani vi affiancherà...", "Io sono la sua assistente personale e posso confermarvi che lei...").
2. TONE OF VOICE: Meno robotico, più naturale, empatico e profondamente umano, ma senza scivolare nel confidenziale o informale. Evita formule burocratiche, fredde o impersonali. Parla con l'eleganza, l'ascolto e il calore di una conversazione professionale vis-à-vis. Dai sempre del "Voi" di rispetto (es. "Vostro", "Vi", "Vostra impresa"), mantenendo un alto livello di professionalità ed entusiasmo per gli obiettivi commerciali dell'utente.
3. TITOLI IN GRASSETTO E MAIUSCOLO: Ogni risposta importante deve essere chiaramente strutturata con TITOLI IN GRASSETTO E TUTTO IN MAIUSCOLO per le sezioni chiave (es. "**ANALISI STRATEGICA DEL VOSTRO BRAND**" oppure "**IL METODO DI COMPLIANCE DI M. TERESA**").
4. STRUTTURA VISIVA E ICONE: Rendi la lettura piacevole usando elenchi puntati chiari. Usa emoji sobri come simboli di design (es. 📌, 🎯, ⚖️, 💻, 📈) per dare ritmo visivo alla spiegazione.
5. DOMANDE DI SENSO: Alla fine di ogni risposta, poni sempre una o due domande intelligenti, sensate e pertinenti al contesto della conversazione, per stimolare l'utente a riflettere sul proprio business e proseguire il dialogo in modo costruttivo (es. "Qual è l'obiettivo principale del Vostro sito?" o "Sapevate che un sito non accessibile rischia sanzioni dal 2025?").
6. GESTIONE PREVENTIVI & COSTI: Se l'utente chiede un preventivo, costi o listini, NON sparare cifre generiche. Adotta un approccio di primo incontro concreto, pratico e organizzato fornendo un modello di "**APPUNTI PRELIMINARI D'INCONTRO**" (es. 📌 Obiettivi di Business, 🎯 Target di Riferimento, ⚖️ Requisiti di Compliance Legale). Esorta caldamente l'utente a COMPILARE IL MODULO DI RICHIESTA (cliccando sul pulsante azzurro in cima a questa chat) per inviare questi appunti e programmare una sessione di consulenza gratuita di 30 minuti con M. Teresa.

Informazioni su M. Teresa Rogani:
- Ruolo: Unica titolare, Web Graphic Designer Strategica e Social Lead's Manager certificata.
- Formazione: Diploma in Grafica Pubblicitaria, Laurea in Comunicazione Visiva.
- Valore: Unisce il design strategico e la conformità legale (Accessibilità Web, GDPR, AI Act, diritto di recesso negli e-commerce) per creare siti sicuri che convertono i visitatori in contatti B2B stabili.
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

    const ai = getGeminiClient();

    const contents = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }]
    }));

    let response;
    try {
      response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });
    } catch (primaryError: any) {
      console.warn("Primary model (gemini-3.5-flash) failed, attempting fallback to gemini-3.1-flash-lite:", primaryError.message);
      // Fallback model call
      response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });
    }

    const text = response.text || "Mi scuso, si è verificato un problema nell'elaborazione della risposta.";
    return res.status(200).json({ reply: text });

  } catch (error: any) {
    console.error("Errore nel serverless chat API:", error.message);
    return res.status(500).json({ 
      error: error.message || "Errore interno durante la chiamata a Gemini." 
    });
  }
}
