import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY non è configurata nei Secrets del server.");
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

// API chat endpoint with state-of-the-art system prompt in Italian
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Il corpo della richiesta deve contenere un array 'messages'." });
    }

    const ai = getGeminiClient();

    // Map message format into standard Gemini Content parts
    const contents = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }]
    }));

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
    res.json({ reply: text });

  } catch (error: any) {
    console.error("Errore nel server chat API:", error.message);
    res.status(500).json({ 
      error: error.message || "Errore interno del server durante la chiamata a Gemini." 
    });
  }
});

// API contact route with Nodemailer for sending lead emails
app.post("/api/contact", async (req, res) => {
  try {
    const { 
      name, 
      email, 
      phone, 
      company, 
      inquiryType, 
      projectType, 
      budgetRange, 
      preferredTime, 
      marketSector, 
      message, 
      consent 
    } = req.body;

    // Check mandatory fields
    if (!name || !email || !phone) {
      return res.status(400).json({ error: "I campi Nome, Email e Telefono sono obbligatori." });
    }

    const recipientEmail = "facilissimoweb.mc@gmail.com";

    // SMTP variables from environment
    let smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    // Sanitize host: strip protocols, leading slashes or colons (e.g. ://gmail.com -> gmail.com)
    smtpHost = smtpHost.replace(/^(https?:\/\/|smtps?:\/\/|:\/\/|smtp:)?/i, "").trim();
    // If it is just "gmail.com", map to "smtp.gmail.com"
    if (smtpHost.toLowerCase() === "gmail.com") {
      smtpHost = "smtp.gmail.com";
    }

    const smtpPort = parseInt(process.env.SMTP_PORT || "587");
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    const emailSubject = `[Facilissimo Web] Nuova Richiesta da ${name}`;
    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-top: 4px solid #0A192F; background-color: #ffffff;">
        <h2 style="color: #0A192F; font-size: 20px; font-weight: bold; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; margin-top: 0;">
          Nuovo Contatto Ricevuto!
        </h2>
        
        <p style="font-size: 14px; color: #475569; line-height: 1.5;">
          Hai ricevuto una nuova richiesta di contatto dal modulo di <strong>Facilissimo Web</strong>. Ecco i dettagli:
        </p>

        <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin: 20px 0;">
          <tr style="background-color: #f8fafc;">
            <td style="padding: 10px; font-weight: bold; width: 35%; color: #334155;">Nome:</td>
            <td style="padding: 10px; color: #0f172a;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #334155;">Email:</td>
            <td style="padding: 10px; color: #0f172a;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="padding: 10px; font-weight: bold; color: #334155;">Telefono:</td>
            <td style="padding: 10px; color: #0f172a;"><a href="tel:${phone}">${phone}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #334155;">Azienda / Ente:</td>
            <td style="padding: 10px; color: #0f172a;">${company || "Non specificato"}</td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="padding: 10px; font-weight: bold; color: #334155;">Settore di Mercato:</td>
            <td style="padding: 10px; color: #0f172a;">${marketSector || "Non specificato"}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #334155;">Tipologia Ingaggio:</td>
            <td style="padding: 10px; color: #0f172a; font-weight: bold; color: #0A192F;">
              ${inquiryType === 'call-gratuita' ? '📞 Call Preliminare Gratuita (30 min)' : '💻 Sessione Strategica (60 min)'}
            </td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="padding: 10px; font-weight: bold; color: #334155;">Ambito Progetto:</td>
            <td style="padding: 10px; color: #0f172a;">${projectType || "Non specificato"}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #334155;">Budget Indicativo:</td>
            <td style="padding: 10px; font-weight: bold; color: #10b981;">${budgetRange || "Non specificato"}</td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="padding: 10px; font-weight: bold; color: #334155;">Orario di Ricontatto:</td>
            <td style="padding: 10px; color: #0f172a;">${preferredTime || "Non specificato"}</td>
          </tr>
        </table>

        <div style="background-color: #f1f5f9; padding: 15px; border-left: 3px solid #0A192F; font-size: 13px; font-style: italic; color: #334155; margin-bottom: 20px;">
          <p style="margin: 0; font-weight: bold; font-style: normal; margin-bottom: 5px; color: #0A192F;">Messaggio / Dettagli:</p>
          "${message ? message.replace(/\n/g, '<br />') : 'Nessun dettaglio aggiuntivo.'}"
        </div>

        <div style="font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 10px; margin-top: 20px;">
          Questo messaggio è stato generato automaticamente dal modulo di contatto di <strong>Facilissimo Web</strong>.<br />
          Consenso GDPR fornito: <strong>${consent ? "SÌ" : "NO"}</strong>
        </div>
      </div>
    `;

    console.log(`[Contact Form Submission] Received lead from ${name} (${email})`);

    // Guard checking if credentials are set
    if (!smtpUser || !smtpPass) {
      console.warn("ATTENZIONE: SMTP_USER e/o SMTP_PASS non sono configurati. L'email NON è stata inviata realmente, ma l'operazione è stata simulata con successo.");
      return res.json({ 
        success: true, 
        simulated: true, 
        message: "Richiesta ricevuta ma l'email reale non è stata inviata perché SMTP_USER o SMTP_PASS non sono configurati." 
      });
    }

    // Create SMTP transport
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, 
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

    // Send mail to the designated mailbox
    await transporter.sendMail({
      from: `"${name} (Facilissimo Web)" <${smtpUser}>`,
      to: recipientEmail,
      replyTo: email,
      subject: emailSubject,
      html: emailHtml,
      text: `Nuovo Contatto Ricevuto!\n\nNome: ${name}\nEmail: ${email}\nTelefono: ${phone}\nAzienda: ${company}\nSettore: ${marketSector}\nIngaggio: ${inquiryType}\nAmbito: ${projectType}\nBudget: ${budgetRange}\nOrario: ${preferredTime}\n\nMessaggio:\n${message}\n\nConsenso GDPR: ${consent ? "SI" : "NO"}`
    });

    console.log(`[Email Sent] Email successfully dispatched to ${recipientEmail}`);
    return res.json({ success: true, simulated: false });

  } catch (err: any) {
    console.error("Errore nell'invio dell'email via SMTP:", err);
    return res.status(500).json({ 
      error: "Impossibile inviare l'email reale a causa di un errore di connessione SMTP o di configurazione.",
      details: err.message 
    });
  }
});

// Setup Vite Dev Server / Static Asset Serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
