import nodemailer from "nodemailer";

export default async function handler(req: any, res: any) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Metodo non consentito" });
  }

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
            <td style="padding: 10px; color: #0A192F; font-weight: bold;">
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

    console.log(`[Contact Form Serverless] Received lead from ${name} (${email})`);

    // Guard checking if credentials are set
    if (!smtpUser || !smtpPass) {
      console.warn("ATTENZIONE: SMTP_USER e/o SMTP_PASS non sono configurati. L'email è stata simulata.");
      return res.status(200).json({ 
        success: true, 
        simulated: true, 
        message: "Richiesta ricevuta, ma l'invio reale dell'email non è configurato su questo ambiente (mancano SMTP_USER o SMTP_PASS nei Secret)." 
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

    console.log(`[Email Sent Serverless] Email successfully dispatched to ${recipientEmail}`);
    return res.status(200).json({ success: true, simulated: false });

  } catch (err: any) {
    console.error("Errore nell'invio dell'email via SMTP (Serverless):", err);
    return res.status(500).json({ 
      error: "Impossibile inviare l'email reale a causa di un errore di connessione SMTP o di configurazione.",
      details: err.message 
    });
  }
}
