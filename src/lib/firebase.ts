import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User, signOut } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App only once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

// Configure Google OAuth Provider with Sheets and Drive scopes
export const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.addScope('https://www.googleapis.com/auth/spreadsheets');
googleAuthProvider.addScope('https://www.googleapis.com/auth/drive.file');

let isSigningIn = false;
let cachedAccessToken: string | null = null;

// Initialize auth state listener
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        // If we don't have a cached token but we have a user (e.g. page refresh),
        // we'll need the user to click sign in again to obtain a fresh credential token,
        // or we fallback to requiring authentication.
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

// Sign in with popup and cache the access token
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, googleAuthProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to retrieve access token from Google Sign-In.');
    }
    cachedAccessToken = credential.accessToken;
    // Persist selected spreadsheet ID if any is stored locally
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error) {
    console.error('Error during Google authentication:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = (): string | null => {
  return cachedAccessToken;
};

export const logout = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

// --- GOOGLE SHEETS & DRIVE API INTEGRATIONS (CLIENT-SIDE) ---

export interface GoogleFile {
  id: string;
  name: string;
  webViewLink?: string;
  createdTime?: string;
}

/**
 * Lists all Spreadsheet files in the user's Google Drive.
 */
export async function listSpreadsheets(accessToken: string): Promise<GoogleFile[]> {
  const url = `https://www.googleapis.com/drive/v3/files?q=mimeType%3D%27application%2Fvnd.google-apps.spreadsheet%27+and+trashed%3Dfalse&fields=files(id%2Cname%2CwebViewLink%2CcreatedTime)&orderBy=name&pageSize=50`;
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json'
    }
  });
  
  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: { message: response.statusText } }));
    throw new Error(err.error?.message || 'Errore durante la ricerca dei Fogli Google.');
  }
  
  const data = await response.json();
  return data.files || [];
}

/**
 * Creates a beautiful, pre-formatted Google Spreadsheet for storing Leads.
 */
export async function createLeadsSpreadsheet(accessToken: string, title: string): Promise<GoogleFile> {
  const url = 'https://www.googleapis.com/sheets/v4/spreadsheets';
  
  const body = {
    properties: {
      title: title || 'Facilissimo Web - Leads & Consulenze'
    },
    sheets: [
      {
        properties: {
          title: 'Contatti Ricevuti',
          gridProperties: {
            frozenRowCount: 1
          }
        },
        data: [
          {
            startRow: 0,
            startColumn: 0,
            rowData: [
              {
                values: [
                  { userEnteredValue: { stringValue: 'Data Invio' }, userEnteredFormat: { textFormat: { bold: true }, backgroundColor: { red: 0.9, green: 0.95, blue: 1.0 } } },
                  { userEnteredValue: { stringValue: 'Nome Cliente' }, userEnteredFormat: { textFormat: { bold: true }, backgroundColor: { red: 0.9, green: 0.95, blue: 1.0 } } },
                  { userEnteredValue: { stringValue: 'Azienda' }, userEnteredFormat: { textFormat: { bold: true }, backgroundColor: { red: 0.9, green: 0.95, blue: 1.0 } } },
                  { userEnteredValue: { stringValue: 'Email' }, userEnteredFormat: { textFormat: { bold: true }, backgroundColor: { red: 0.9, green: 0.95, blue: 1.0 } } },
                  { userEnteredValue: { stringValue: 'Telefono' }, userEnteredFormat: { textFormat: { bold: true }, backgroundColor: { red: 0.9, green: 0.95, blue: 1.0 } } },
                  { userEnteredValue: { stringValue: 'Fascia Oraria' }, userEnteredFormat: { textFormat: { bold: true }, backgroundColor: { red: 0.9, green: 0.95, blue: 1.0 } } },
                  { userEnteredValue: { stringValue: 'Ambito Progetto' }, userEnteredFormat: { textFormat: { bold: true }, backgroundColor: { red: 0.9, green: 0.95, blue: 1.0 } } },
                  { userEnteredValue: { stringValue: 'Settore Mercato' }, userEnteredFormat: { textFormat: { bold: true }, backgroundColor: { red: 0.9, green: 0.95, blue: 1.0 } } },
                  { userEnteredValue: { stringValue: 'Budget Indicativo' }, userEnteredFormat: { textFormat: { bold: true }, backgroundColor: { red: 0.9, green: 0.95, blue: 1.0 } } },
                  { userEnteredValue: { stringValue: 'Tipo Ingaggio' }, userEnteredFormat: { textFormat: { bold: true }, backgroundColor: { red: 0.9, green: 0.95, blue: 1.0 } } },
                  { userEnteredValue: { stringValue: 'Messaggio / Domande' }, userEnteredFormat: { textFormat: { bold: true }, backgroundColor: { red: 0.9, green: 0.95, blue: 1.0 } } }
                ]
              }
            ]
          }
        ]
      }
    ]
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: { message: response.statusText } }));
    throw new Error(err.error?.message || 'Impossibile creare il nuovo Foglio Google.');
  }

  const data = await response.json();
  return {
    id: data.spreadsheetId,
    name: data.properties.title,
    webViewLink: data.spreadsheetUrl
  };
}

/**
 * Fetches the lead rows from a specific spreadsheet.
 */
export async function getSpreadsheetLeads(accessToken: string, spreadsheetId: string): Promise<string[][]> {
  const range = 'Contatti Ricevuti!A2:K500';
  const url = `https://www.googleapis.com/sheets/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}`;

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    // If the tab doesn't exist, try getting the default sheet (Sheet1)
    const fallbackUrl = `https://www.googleapis.com/sheets/v4/spreadsheets/${spreadsheetId}/values/A2:K500`;
    const fallbackResponse = await fetch(fallbackUrl, {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    if (!fallbackResponse.ok) {
      throw new Error('Impossibile recuperare i dati dal foglio selezionato. Assicurarsi che sia formattato correttamente.');
    }
    const fbData = await fallbackResponse.json();
    return fbData.values || [];
  }

  const data = await response.json();
  return data.values || [];
}

/**
 * Appends a new lead row to a specific Google Spreadsheet.
 */
export async function appendLeadToSpreadsheet(
  accessToken: string,
  spreadsheetId: string,
  lead: {
    name: string;
    company: string;
    email: string;
    phone: string;
    preferredTime: string;
    projectType: string;
    marketSector?: string;
    budgetRange: string;
    inquiryType: string;
    message: string;
  }
): Promise<void> {
  const range = 'Contatti Ricevuti!A1';
  const url = `https://www.googleapis.com/sheets/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED`;
  
  const formattedDate = new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' });

  const body = {
    range: range,
    majorDimension: 'ROWS',
    values: [
      [
        formattedDate,
        lead.name,
        lead.company || '-',
        lead.email,
        lead.phone,
        lead.preferredTime,
        lead.projectType,
        lead.marketSector || '-',
        lead.budgetRange,
        lead.inquiryType === 'call-gratuita' ? '📞 Call Gratuita (30 min)' : '💻 Sessione Strategica (60 min)',
        lead.message || '-'
      ]
    ]
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    // Attempt fallback to sheet index range A1 if 'Contatti Ricevuti' tab is not present
    const fallbackUrl = `https://www.googleapis.com/sheets/v4/spreadsheets/${spreadsheetId}/values/A1:append?valueInputOption=USER_ENTERED`;
    const fallbackResponse = await fetch(fallbackUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        values: [
          [
            formattedDate,
            lead.name,
            lead.company || '-',
            lead.email,
            lead.phone,
            lead.preferredTime,
            lead.projectType,
            lead.marketSector || '-',
            lead.budgetRange,
            lead.inquiryType,
            lead.message || '-'
          ]
        ]
      })
    });
    
    if (!fallbackResponse.ok) {
      const err = await fallbackResponse.json().catch(() => ({ error: { message: fallbackResponse.statusText } }));
      throw new Error(err.error?.message || 'Impossibile salvare i dati nel Foglio Google.');
    }
  }
}
