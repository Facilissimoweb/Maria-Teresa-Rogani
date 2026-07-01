import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  FileSpreadsheet, 
  User, 
  Plus, 
  RefreshCw, 
  ExternalLink, 
  Lock, 
  Check, 
  LogOut, 
  AlertCircle, 
  CheckCircle, 
  ArrowRight,
  Database,
  Calendar,
  Sparkles,
  Layers,
  ChevronRight,
  Mail,
  Loader2,
  TrendingUp,
  BarChart3,
  PieChart as LucidePieChart,
  DollarSign,
  Activity,
  Award
} from 'lucide-react';
import { 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  googleSignIn, 
  logout, 
  initAuth, 
  listSpreadsheets, 
  createLeadsSpreadsheet, 
  getSpreadsheetLeads,
  appendLeadToSpreadsheet,
  getAccessToken,
  GoogleFile 
} from '../lib/firebase';
import { User as FirebaseUser } from 'firebase/auth';

interface AnalyticsMetrics {
  totalLeads: number;
  pipelineValue: number;
  conversionRate: number;
  callGratuitaCount: number;
  sessioneCount: number;
  byDate: { date: string; leads: number; pipeline: number }[];
  byProject: { name: string; value: number }[];
  byBudget: { range: string; count: number; pipeline: number }[];
}

const parseLeadsData = (rawLeads: string[][]): AnalyticsMetrics => {
  if (!rawLeads || rawLeads.length === 0) {
    const mockByDate = [
      { date: '25 Giu', leads: 3, pipeline: 9250 },
      { date: '26 Giu', leads: 4, pipeline: 15500 },
      { date: '27 Giu', leads: 2, pipeline: 5500 },
      { date: '28 Giu', leads: 5, pipeline: 19000 },
      { date: '29 Giu', leads: 3, pipeline: 10250 },
      { date: '30 Giu', leads: 6, pipeline: 24500 },
      { date: '01 Lug', leads: 4, pipeline: 14750 },
    ];
    
    const mockByProject = [
      { name: 'Custom React / SPA', value: 9 },
      { name: 'CMS WordPress / Webflow', value: 6 },
      { name: 'Integrazione AI Sistemi', value: 5 },
      { name: 'E-Commerce CMS Ready', value: 4 },
      { name: 'Soluzione Enterprise', value: 3 },
    ];

    const mockByBudget = [
      { range: 'Fino a € 1.500', count: 4, pipeline: 4000 },
      { range: '€ 1.500 - € 3.000', count: 8, pipeline: 18000 },
      { range: '€ 3.000 - € 6.000', count: 10, pipeline: 45000 },
      { range: 'Oltre € 6.000', count: 5, pipeline: 31750 },
    ];

    return {
      totalLeads: 27,
      pipelineValue: 98750,
      conversionRate: 67,
      callGratuitaCount: 18,
      sessioneCount: 9,
      byDate: mockByDate,
      byProject: mockByProject,
      byBudget: mockByBudget,
    };
  }

  let totalLeads = rawLeads.length;
  let pipelineValue = 0;
  let callGratuitaCount = 0;
  let sessioneCount = 0;

  const dateMap: { [key: string]: { leads: number; pipeline: number } } = {};
  const projectMap: { [key: string]: number } = {};
  const budgetMap: { [key: string]: { count: number; pipeline: number } } = {
    'Fino a € 1.500': { count: 0, pipeline: 0 },
    '€ 1.500 - € 3.000': { count: 0, pipeline: 0 },
    '€ 3.000 - € 6.000': { count: 0, pipeline: 0 },
    'Oltre € 6.000': { count: 0, pipeline: 0 },
  };

  rawLeads.forEach(row => {
    let dateStr = 'Sconosciuta';
    if (row[0]) {
      const match = row[0].match(/^(\d+[\/\-]\d+[\/\-]\d+)/);
      if (match) {
        const parts = match[1].split(/[\/\-]/);
        if (parts.length >= 2) {
          const day = parts[0];
          const monthNum = parseInt(parts[1], 10);
          const months = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];
          const monthName = months[monthNum - 1] || 'Mese';
          dateStr = `${day} ${monthName}`;
        } else {
          dateStr = match[1];
        }
      } else {
        dateStr = row[0].split(',')[0];
      }
    }

    let rowBudgetVal = 0;
    const bStr = row[8] || '';
    let budgetCategory = '€ 1.500 - € 3.000';

    if (bStr.includes('3.000') && bStr.includes('6.000')) {
      rowBudgetVal = 4500;
      budgetCategory = '€ 3.000 - € 6.000';
    } else if (bStr.includes('6.000')) {
      rowBudgetVal = 7500;
      budgetCategory = 'Oltre € 6.000';
    } else if (bStr.includes('1.500') && bStr.includes('3.000')) {
      rowBudgetVal = 2250;
      budgetCategory = '€ 1.500 - € 3.000';
    } else if (bStr.includes('1.500')) {
      rowBudgetVal = 1000;
      budgetCategory = 'Fino a € 1.500';
    } else {
      rowBudgetVal = 2250;
      budgetCategory = '€ 1.500 - € 3.000';
    }

    pipelineValue += rowBudgetVal;

    if (budgetMap[budgetCategory]) {
      budgetMap[budgetCategory].count += 1;
      budgetMap[budgetCategory].pipeline += rowBudgetVal;
    }

    const rawProjName = row[6] || 'Altro';
    let cleanProjName = rawProjName;
    if (rawProjName.includes('React') || rawProjName.includes('SPA')) {
      cleanProjName = 'Custom React / SPA';
    } else if (rawProjName.includes('WordPress') || rawProjName.includes('Webflow') || rawProjName.includes('Professional')) {
      cleanProjName = 'CMS WordPress / Webflow';
    } else if (rawProjName.includes('AI') || rawProjName.includes('Chatbot')) {
      cleanProjName = 'Integrazione AI Sistemi';
    } else if (rawProjName.includes('Shopify') || rawProjName.includes('E-Commerce')) {
      cleanProjName = 'E-Commerce CMS Ready';
    } else if (rawProjName.includes('Enterprise') || rawProjName.includes('Full-Stack')) {
      cleanProjName = 'Soluzione Enterprise';
    } else if (rawProjName.includes('Restyling') || rawProjName.includes('Migrazione')) {
      cleanProjName = 'Restyling / Migrazione';
    } else if (rawProjName.includes('SEO') || rawProjName.includes('Performance')) {
      cleanProjName = 'SEO & Performance';
    } else if (rawProjName.includes('Consulenza') || rawProjName.includes('Assistenza')) {
      cleanProjName = 'Consulenza Strategica';
    } else if (rawProjName.includes('sicuro')) {
      cleanProjName = 'Valutazione Iniziale';
    }

    projectMap[cleanProjName] = (projectMap[cleanProjName] || 0) + 1;

    const engType = row[9] || '';
    if (engType.includes('Call Gratuita') || engType.includes('call-gratuita') || engType.includes('30 min')) {
      callGratuitaCount++;
    } else {
      sessioneCount++;
    }

    if (!dateMap[dateStr]) {
      dateMap[dateStr] = { leads: 0, pipeline: 0 };
    }
    dateMap[dateStr].leads += 1;
    dateMap[dateStr].pipeline += rowBudgetVal;
  });

  const byDate = Object.keys(dateMap).map(key => ({
    date: key,
    leads: dateMap[key].leads,
    pipeline: dateMap[key].pipeline,
  }));

  const byProject = Object.keys(projectMap).map(key => ({
    name: key,
    value: projectMap[key],
  })).sort((a, b) => b.value - a.value);

  const byBudget = Object.keys(budgetMap).map(key => ({
    range: key,
    count: budgetMap[key].count,
    pipeline: budgetMap[key].pipeline,
  }));

  return {
    totalLeads,
    pipelineValue,
    conversionRate: totalLeads > 0 ? Math.round((sessioneCount / totalLeads) * 100) : 0,
    callGratuitaCount,
    sessioneCount,
    byDate,
    byProject,
    byBudget,
  };
};

export default function SheetsDashboard() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [spreadsheets, setSpreadsheets] = useState<GoogleFile[]>([]);
  const [selectedSheetId, setSelectedSheetId] = useState<string>(() => {
    return localStorage.getItem('fw_selected_spreadsheet_id') || '';
  });
  const [selectedSheetName, setSelectedSheetName] = useState<string>(() => {
    return localStorage.getItem('fw_selected_spreadsheet_name') || '';
  });
  
  const [leads, setLeads] = useState<string[][]>([]);
  const [loadingLeads, setLoadingLeads] = useState<boolean>(false);
  const [creatingSheet, setCreatingSheet] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Simulated Test Submission State
  const [simulatedSubmitting, setSimulatedSubmitting] = useState<boolean>(false);

  // Initialize Auth
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, accessToken) => {
        setUser(currentUser);
        setToken(accessToken);
        setLoading(false);
      },
      () => {
        setUser(null);
        setToken(null);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  // Fetch spreadsheets once token is available
  useEffect(() => {
    if (token) {
      fetchSpreadsheets();
    } else {
      setSpreadsheets([]);
      setLeads([]);
    }
  }, [token]);

  // Fetch leads once spreadsheet is selected
  useEffect(() => {
    if (token && selectedSheetId) {
      fetchLeads();
    } else {
      setLeads([]);
    }
  }, [token, selectedSheetId]);

  const fetchSpreadsheets = async () => {
    if (!token) return;
    setError(null);
    try {
      const list = await listSpreadsheets(token);
      setSpreadsheets(list);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Impossibile caricare i Fogli Google. Verifica i permessi.');
    }
  };

  const fetchLeads = async () => {
    if (!token || !selectedSheetId) return;
    setLoadingLeads(true);
    setError(null);
    try {
      const data = await getSpreadsheetLeads(token, selectedSheetId);
      setLeads(data);
    } catch (err: any) {
      console.error(err);
      setError('Impossibile leggere le righe del foglio. Assicurati che sia formattato con i giusti fogli di calcolo.');
    } finally {
      setLoadingLeads(false);
    }
  };

  const handleSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setToken(res.accessToken);
        setSuccessMsg('Connessione effettuata con successo a Google!');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Errore durante l\'autenticazione Google. Riprova.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setError(null);
    try {
      await logout();
      setUser(null);
      setToken(null);
      localStorage.removeItem('fw_selected_spreadsheet_id');
      localStorage.removeItem('fw_selected_spreadsheet_name');
      setSelectedSheetId('');
      setSelectedSheetName('');
      setLeads([]);
      setSuccessMsg('Disconnesso dal servizio Google Sheets.');
    } catch (err: any) {
      setError('Errore durante la disconnessione.');
    }
  };

  const handleSelectSheet = (sheetId: string, sheetName: string) => {
    setSelectedSheetId(sheetId);
    setSelectedSheetName(sheetName);
    localStorage.setItem('fw_selected_spreadsheet_id', sheetId);
    localStorage.setItem('fw_selected_spreadsheet_name', sheetName);
    setSuccessMsg(`Foglio "${sheetName}" impostato come database attivo.`);
  };

  const handleCreateNewSheet = async () => {
    if (!token) return;
    setCreatingSheet(true);
    setError(null);
    try {
      const newSheet = await createLeadsSpreadsheet(token, 'Facilissimo Web - Leads & Consulenze');
      setSpreadsheets(prev => [newSheet, ...prev]);
      handleSelectSheet(newSheet.id, newSheet.name);
      setSuccessMsg('Nuovo foglio "Facilissimo Web - Leads" creato e configurato su Google Drive!');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Errore nella creazione del foglio.');
    } finally {
      setCreatingSheet(false);
    }
  };

  const handleSimulateInquiry = async () => {
    if (!token || !selectedSheetId) return;
    setSimulatedSubmitting(true);
    setError(null);
    try {
      const mockLead = {
        name: 'Riccardo Rossi',
        company: 'Agriturismo Colle Verde',
        email: 'info@colleverde.it',
        phone: '+39 347 9876543',
        preferredTime: 'Pomeriggio (14:00 - 18:00)',
        projectType: 'Sviluppo Custom React / SPA',
        marketSector: 'Agricoltura, Food & Viticoltura',
        budgetRange: '€ 3.000 - € 6.000',
        inquiryType: 'call-gratuita',
        message: 'Vorremmo rinnovare la nostra presenza web per vendere vini biologici online.'
      };
      
      await appendLeadToSpreadsheet(token, selectedSheetId, mockLead);
      setSuccessMsg('Simulazione completata! Lead di test inserito correttamente nel tuo Foglio Google.');
      fetchLeads(); // refresh leads
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Errore durante la simulazione dell\'invio.');
    } finally {
      setSimulatedSubmitting(false);
    }
  };

  // Compute analytics in real-time
  const stats = parseLeadsData(leads);
  const isDemoData = leads.length === 0;

  return (
    <article id="sheets-dashboard" className="animate-fadeIn min-h-screen bg-slate-50 dark:bg-[#0A192F] py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-10">
        
        {/* Header Block */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/30 px-3.5 py-1.5 rounded text-[10px] font-bold tracking-[0.2em] uppercase text-emerald-600 dark:text-emerald-400">
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Integrazione Google Sheets</span>
            </div>
            <h1 className="text-3xl font-light italic text-slate-900 dark:text-white">
              Sincronizzazione in Tempo Reale <br />
              <span className="font-bold not-italic">con i Fogli Google dei Clienti</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-3xl">
              Abilitate l'acquisizione dei contatti e dei lead direttamente all'interno dei Vostri file Excel online di Google Workspace, con il massimo della trasparenza e senza database intermedi.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {user && (
              <button
                onClick={handleSignOut}
                className="inline-flex items-center space-x-2 px-4 py-2 border border-slate-300 hover:border-red-500 hover:bg-red-50 hover:text-red-600 dark:border-slate-700 dark:hover:bg-red-950/20 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Disconnetti</span>
              </button>
            )}
          </div>
        </div>

        {/* Global Feedback Banners */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 text-xs text-red-700 flex items-start space-x-3 rounded-none">
            <AlertCircle className="w-4.5 h-4.5 text-red-500 shrink-0" />
            <div className="space-y-1">
              <span className="font-bold">Attenzione:</span>
              <p>{error}</p>
            </div>
          </div>
        )}

        {successMsg && (
          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 text-xs text-emerald-700 flex items-start space-x-3 rounded-none">
            <CheckCircle className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
            <div className="space-y-1">
              <span className="font-bold">Completato:</span>
              <p>{successMsg}</p>
            </div>
          </div>
        )}

        {loading ? (
          /* Central Loading */
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <Loader2 className="w-8 h-8 text-[#4A90E2] animate-spin" />
            <span className="text-xs text-slate-400 font-mono">Verifica stato connessione Google...</span>
          </div>
        ) : !user ? (
          /* LOGIN BLOCK */
          <div className="max-w-xl mx-auto bg-white dark:bg-[#0c1e36] border-2 border-emerald-500 p-8 text-center space-y-6 shadow-xl rounded-none">
            <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 rounded-none flex items-center justify-center mx-auto border border-emerald-200">
              <FileSpreadsheet className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-wider">Connetti Google Workspace</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-md mx-auto">
                Accedi in sicurezza con il tuo account Google. L'applicazione salverà i contatti ricevuti dal sito web direttamente su un file di calcolo sul tuo account Google Drive, garantendo la tua proprietà exclusività dei dati.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 border border-slate-200 dark:border-slate-800 text-left space-y-3 rounded-none">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Permessi e Sicurezza:</h4>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-center space-x-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span><strong>Proprietà Assoluta:</strong> Nessun database di terze parti memorizzerà i tuoi dati.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span><strong>Trasparenza GDPR:</strong> Pieno controllo sugli accessi tramite il tuo account Google.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span><strong>Portabilità:</strong> Esporta e gestisci i dati in tempo reale in formato Excel o PDF.</span>
                </li>
              </ul>
            </div>

            {/* Custom Google Material Button */}
            <button 
              onClick={handleSignIn}
              style={{ width: '100%' }}
              className="px-6 py-3.5 bg-[#10B981] hover:bg-[#10B981]/90 text-white text-xs font-bold uppercase tracking-[0.2em] shadow-lg flex items-center justify-center space-x-3 cursor-pointer transition-colors"
            >
              <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#FFF" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#FFF" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FFF" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#FFF" />
              </svg>
              <span>Accedi con Google</span>
            </button>
          </div>
        ) : user.email !== 'facilissimoweb.mc@gmail.com' ? (
          /* UNAUTHORIZED EMAIL ACCESS BLOCK */
          <div className="max-w-xl mx-auto bg-white dark:bg-[#0c1e36] border-2 border-red-500 p-8 text-center space-y-6 shadow-xl rounded-none animate-fadeIn">
            <div className="w-16 h-16 bg-red-50 dark:bg-red-950/20 text-red-600 rounded-none flex items-center justify-center mx-auto border border-red-200">
              <Lock className="w-8 h-8 text-red-500" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-wider">Accesso Riservato</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-md mx-auto">
                Questa area privata contiene strumenti interni e metriche di business riservati esclusivamente all'amministratore del sito (<strong className="text-[#0A192F] dark:text-white">facilissimoweb.mc@gmail.com</strong>).
              </p>
            </div>

            <div className="bg-red-50/50 dark:bg-red-950/10 p-4 border border-red-100 dark:border-red-900/30 text-center rounded-none font-mono text-xs text-red-700 dark:text-red-400">
              <span className="block font-bold">Email Connessa:</span>
              <span className="block break-all mt-1">{user.email}</span>
            </div>

            <button 
              onClick={handleSignOut}
              className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-[0.2em] shadow-lg flex items-center justify-center space-x-3 cursor-pointer transition-colors w-full"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              <span>Disconnetti & Accedi con l'E-mail Corretta</span>
            </button>
          </div>
        ) : (
          /* MAIN LOGGED-IN SYSTEM */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* LEFT PROFILE & SELECTION BAR */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Profile Card */}
              <div className="bg-white dark:bg-[#0c1e36] p-6 border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center space-x-3.5">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || 'Profilo'} className="w-12 h-12 rounded-full border-2 border-emerald-500" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
                      {user.displayName ? user.displayName[0] : 'G'}
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">{user.displayName || 'Utente Google'}</h3>
                    <p className="text-[10px] text-slate-400 font-mono">{user.email}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs text-emerald-500">
                  <div className="flex items-center space-x-1.5 font-bold uppercase tracking-wider text-[9px]">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                    <span>Connesso via API</span>
                  </div>
                </div>
              </div>

              {/* Connected Spreadsheet Selector Card */}
              <div className="bg-white dark:bg-[#0c1e36] p-6 border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">Database Attivo</h3>
                  <Database className="w-4 h-4 text-[#4A90E2]" />
                </div>

                {selectedSheetId ? (
                  <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 text-xs rounded-none space-y-1.5">
                    <span className="text-slate-400 block text-[9px] font-bold uppercase tracking-wider">Foglio Selezionato:</span>
                    <span className="text-[#0A192F] dark:text-emerald-400 font-bold block truncate">{selectedSheetName}</span>
                    <span className="text-[10px] text-slate-400 block truncate font-mono">ID: {selectedSheetId}</span>
                    
                    <div className="pt-2 flex items-center space-x-3">
                      <a 
                        href={`https://docs.google.com/spreadsheets/d/${selectedSheetId}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[10px] font-bold text-emerald-600 hover:underline flex items-center space-x-1 uppercase tracking-wider"
                      >
                        <span>Apri Foglio Real-time</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-400">
                    Nessun foglio di calcolo attualmente selezionato per l'acquisizione dei lead.
                  </div>
                )}

                {/* Create New Sheet Button */}
                <button
                  onClick={handleCreateNewSheet}
                  disabled={creatingSheet}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white text-[10px] font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                >
                  {creatingSheet ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Creazione in corso...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Crea Nuovo Foglio Lead</span>
                    </>
                  )}
                </button>
              </div>

              {/* Choose from existing files list */}
              <div className="bg-white dark:bg-[#0c1e36] p-6 border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">Seleziona Foglio Google</h3>
                  <button 
                    onClick={fetchSpreadsheets}
                    className="p-1 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
                    title="Aggiorna lista"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                </div>

                {spreadsheets.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-4">Nessun foglio di calcolo trovato sul tuo Drive.</p>
                ) : (
                  <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                    {spreadsheets.map((sheet) => (
                      <div 
                        key={sheet.id}
                        onClick={() => handleSelectSheet(sheet.id, sheet.name)}
                        className={`p-2.5 border text-xs cursor-pointer transition-all flex items-center justify-between rounded-none ${
                          selectedSheetId === sheet.id
                            ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/10'
                            : 'border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-white/5'
                        }`}
                      >
                        <div className="space-y-1 truncate flex-1 mr-2">
                          <span className="font-bold text-slate-800 dark:text-slate-200 block truncate">{sheet.name}</span>
                          <span className="text-[9px] text-slate-400 font-mono block">Aggiornato il {sheet.createdTime ? new Date(sheet.createdTime).toLocaleDateString() : 'N/A'}</span>
                        </div>
                        {selectedSheetId === sheet.id && (
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* RIGHT CONTENT WORKSPACE & TABLE */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Integration actions and Live Test */}
              <div className="bg-white dark:bg-[#0c1e36] p-6 border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="space-y-0.5">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">Integrazione in Produzione</h3>
                    <p className="text-[10px] text-slate-400">Verifica o testa l'invio istantaneo dei dati</p>
                  </div>
                  
                  <span className="text-[9px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400 font-bold px-2 py-1 uppercase tracking-wider">
                    Connesso
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Ogni richiesta inviata tramite il modulo presente nella sezione <strong>Contatti</strong> verrà istantaneamente salvata nel foglio di calcolo attualmente attivo, sincronizzandosi senza alcuna latenza. 
                </p>

                {selectedSheetId ? (
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <button
                      onClick={handleSimulateInquiry}
                      disabled={simulatedSubmitting}
                      className="inline-flex items-center justify-center space-x-2 px-5 py-3 bg-slate-900 dark:bg-[#4A90E2] hover:bg-slate-800 hover:text-white dark:hover:bg-opacity-90 text-white dark:text-slate-950 text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
                    >
                      {simulatedSubmitting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Simulazione in corso...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Invia Lead di Test nel Foglio</span>
                        </>
                      )}
                    </button>
                    
                    <p className="text-[10px] text-slate-400 max-w-sm italic">
                      Invia un lead fittizio ("Riccardo Rossi") al tuo foglio per verificare che l'integrazione con Google API funzioni correttamente.
                    </p>
                  </div>
                ) : (
                  <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 text-xs text-amber-800 dark:text-amber-400 flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Selezionate o create un Foglio Google sulla sinistra prima di eseguire una prova.</span>
                  </div>
                )}
              </div>

              {/* ANALYTICS DASHBOARD CARD */}
              <div className="bg-white dark:bg-[#0c1e36] p-6 border border-slate-200 dark:border-slate-800 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
                        Dashboard Analytics & Conversioni
                      </h3>
                      {isDemoData ? (
                        <span className="inline-flex items-center space-x-1 px-1.5 py-0.5 text-[8px] font-bold bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/30 text-amber-600 dark:text-amber-400 uppercase tracking-widest">
                          Simulazione
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 px-1.5 py-0.5 text-[8px] font-bold bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                          Dati Reali
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400">
                      Visualizzazione in tempo reale dell'andamento e della redditività dei lead acquisiti
                    </p>
                  </div>
                  
                  <div className="text-[10px] text-slate-500 font-mono flex items-center space-x-1.5">
                    <Activity className="w-3 h-3 text-[#4A90E2] animate-pulse" />
                    <span>Aggiornato via API</span>
                  </div>
                </div>

                {/* Banner indicating that demo mode is active because sheet is currently empty */}
                {isDemoData && (
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 rounded-none flex items-start space-x-2.5">
                    <AlertCircle className="w-4.5 h-4.5 text-[#4A90E2] shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-semibold text-[#0A192F] dark:text-white">Il tuo Foglio Google è attualmente vuoto o non sincronizzato.</p>
                      <p className="text-[11px] text-slate-400">
                        Per illustrare l'integrazione, ti mostriamo una simulazione dell'andamento dei lead di un'agenzia web in crescita. Non appena riceverai contatti reali o invierai un lead di prova tramite il pulsante "Invia Lead di Test", la dashboard si aggiornerà istantaneamente con le metriche reali del tuo foglio.
                      </p>
                    </div>
                  </div>
                )}

                {/* KPI Metrics row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* KPI 1: Leads count */}
                  <div className="p-4 bg-slate-50/50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-850/50 flex items-center space-x-4">
                    <div className="w-10 h-10 bg-[#4A90E2]/10 text-[#4A90E2] flex items-center justify-center rounded border border-[#4A90E2]/25 shrink-0">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Leads Ricevuti</span>
                      <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white block leading-none">
                        {stats.totalLeads}
                      </span>
                    </div>
                  </div>

                  {/* KPI 2: Pipeline value */}
                  <div className="p-4 bg-slate-50/50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-850/50 flex items-center space-x-4">
                    <div className="w-10 h-10 bg-emerald-500/10 text-emerald-500 flex items-center justify-center rounded border border-emerald-500/25 shrink-0">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Valore Stimato</span>
                      <span className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 block leading-none">
                        € {stats.pipelineValue.toLocaleString('it-IT')}
                      </span>
                    </div>
                  </div>

                  {/* KPI 3: Strategy Call conversion */}
                  <div className="p-4 bg-slate-50/50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-850/50 flex items-center space-x-4">
                    <div className="w-10 h-10 bg-indigo-500/10 text-indigo-500 flex items-center justify-center rounded border border-indigo-500/25 shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Tasso Strategico</span>
                      <span className="text-2xl font-bold font-mono text-indigo-500 dark:text-indigo-400 block leading-none">
                        {stats.conversionRate}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
                  {/* Chart A: Lead Trend & Volume over time */}
                  <div className="space-y-2 p-4 border border-slate-150 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/10">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                        Andamento Temporale & Valore
                      </span>
                      <span className="text-[8px] font-mono text-slate-400 uppercase">Trend Ultimi Inserimenti</span>
                    </div>
                    
                    <div className="h-[260px] w-full pt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={stats.byDate} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#4A90E2" stopOpacity={0.4}/>
                              <stop offset="95%" stopColor="#4A90E2" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorPipeline" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                              <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:hidden" />
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" className="hidden dark:block" />
                          <XAxis dataKey="date" stroke="#94a3b8" fontSize={10} tickLine={false} />
                          <YAxis yAxisId="left" stroke="#4A90E2" fontSize={10} tickLine={false} label={{ value: 'Contatti', angle: -90, position: 'insideLeft', style: { fill: '#4a90e2', fontSize: 10, fontWeight: 'bold' } }} />
                          <YAxis yAxisId="right" orientation="right" stroke="#10B981" fontSize={10} tickLine={false} label={{ value: 'Valore (€)', angle: 90, position: 'insideRight', style: { fill: '#10b981', fontSize: 10, fontWeight: 'bold' } }} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '4px', color: '#fff', fontSize: '11px' }}
                            labelStyle={{ fontWeight: 'bold', color: '#38bdf8' }}
                          />
                          <Area yAxisId="left" type="monotone" dataKey="leads" name="Nuovi Contatti" stroke="#4A90E2" strokeWidth={2} fillOpacity={1} fill="url(#colorLeads)" />
                          <Area yAxisId="right" type="monotone" dataKey="pipeline" name="Valore Est. (€)" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorPipeline)" />
                          <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Chart B: Distribution of project categories */}
                  <div className="space-y-2 p-4 border border-slate-150 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/10">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                        Ambiti di Progetto Richiesti
                      </span>
                      <span className="text-[8px] font-mono text-slate-400 uppercase">Ripartizione Soluzioni</span>
                    </div>

                    <div className="h-[260px] w-full pt-4">
                      {stats.byProject.length === 0 ? (
                        <div className="h-full flex items-center justify-center text-xs text-slate-400 font-mono">
                          Nessun dato sul progetto disponibile
                        </div>
                      ) : (
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={stats.byProject} margin={{ top: 10, right: 10, left: -20, bottom: 5 }} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:hidden" />
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" className="hidden dark:block" />
                            <XAxis type="number" stroke="#94a3b8" fontSize={10} tickLine={false} allowDecimals={false} />
                            <YAxis type="category" dataKey="name" stroke="#94a3b8" fontSize={9} tickLine={false} width={120} />
                            <Tooltip
                              contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '4px', color: '#fff', fontSize: '11px' }}
                              labelStyle={{ fontWeight: 'bold' }}
                            />
                            <Bar dataKey="value" name="Volume Richieste" fill="#6366F1" radius={[0, 4, 4, 0]}>
                              {stats.byProject.map((_entry, index) => {
                                const colors = ['#4A90E2', '#10B981', '#6366F1', '#F59E0B', '#EC4899', '#8B5CF6'];
                                return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                              })}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sub-KPI analysis footer: Free consultation Calls vs Paid Intensive Strategies */}
                <div className="p-4 bg-slate-50 dark:bg-slate-900/30 border border-slate-150 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-amber-500/10 text-amber-500 flex items-center justify-center rounded shrink-0">
                      <LucidePieChart className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200 block uppercase font-sans">Canale di Acquisizione Primario</span>
                      <p className="text-[11px] text-slate-400">Rapporto tra Call Conoscitive Gratuite e Sessioni Strategiche Intensive</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 text-xs font-mono">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full inline-block" />
                      <span className="text-slate-500">📞 Call Gratuita:</span>
                      <span className="font-bold text-slate-800 dark:text-white">{stats.callGratuitaCount}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 bg-[#4A90E2] rounded-full inline-block" />
                      <span className="text-slate-500">💻 Sessione Premium:</span>
                      <span className="font-bold text-slate-800 dark:text-white">{stats.sessioneCount}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* TABLE VIEW OF ACTUAL LEADS */}
              <div className="bg-white dark:bg-[#0c1e36] p-6 border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="space-y-0.5">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">Record nel Foglio di Calcolo</h3>
                    <p className="text-[10px] text-slate-400">Dati caricati direttamente dal foglio attivo</p>
                  </div>
                  
                  {selectedSheetId && (
                    <button
                      onClick={fetchLeads}
                      disabled={loadingLeads}
                      className="p-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 cursor-pointer"
                    >
                      <RefreshCw className={`w-3 h-3 ${loadingLeads ? 'animate-spin' : ''}`} />
                      <span>Ricarica</span>
                    </button>
                  )}
                </div>

                {!selectedSheetId ? (
                  <div className="py-16 text-center text-slate-400 text-xs">
                    Selezionate un file spreadsheet per visualizzarne i record.
                  </div>
                ) : loadingLeads ? (
                  <div className="flex flex-col items-center justify-center py-16 space-y-3">
                    <Loader2 className="w-6 h-6 text-emerald-500 animate-spin" />
                    <span className="text-[10px] text-slate-400 font-mono">Caricamento record in corso...</span>
                  </div>
                ) : leads.length === 0 ? (
                  <div className="py-16 text-center text-slate-400 text-xs space-y-2">
                    <p>Nessun record presente in questo Foglio Google o intestazioni non conformi.</p>
                    <p className="text-[10px] text-slate-400">Utilizza il pulsante "Invia Lead di Test nel Foglio" qui sopra per iniziare.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 text-slate-500 uppercase tracking-wider text-[9px] font-bold">
                          <th className="py-3 px-3">Data</th>
                          <th className="py-3 px-3">Nome</th>
                          <th className="py-3 px-3">Email / Telefono</th>
                          <th className="py-3 px-3">Progetto</th>
                          <th className="py-3 px-3">Budget</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {leads.map((row, index) => (
                          <tr key={index} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                            <td className="py-3.5 px-3 font-mono text-[10px] text-slate-400 whitespace-nowrap">{row[0] || '-'}</td>
                            <td className="py-3.5 px-3 font-bold text-slate-800 dark:text-slate-100 whitespace-nowrap">
                              <div className="space-y-0.5">
                                <span>{row[1] || '-'}</span>
                                {row[2] && row[2] !== '-' && (
                                  <span className="block text-[9px] text-slate-400 font-normal">{row[2]}</span>
                                )}
                              </div>
                            </td>
                            <td className="py-3.5 px-3 whitespace-nowrap text-slate-600 dark:text-slate-300">
                              <div className="space-y-0.5 font-mono text-[10px]">
                                <span className="block">{row[3] || '-'}</span>
                                <span className="block text-slate-400">{row[4] || '-'}</span>
                              </div>
                            </td>
                            <td className="py-3.5 px-3 whitespace-nowrap text-slate-600 dark:text-slate-300">
                              <div className="space-y-0.5">
                                <span className="block text-[11px] font-semibold">{row[6] || '-'}</span>
                                <span className="block text-[9px] text-slate-400">{row[9] || '-'}</span>
                              </div>
                            </td>
                            <td className="py-3.5 px-3 whitespace-nowrap font-bold text-slate-900 dark:text-emerald-400 font-mono text-[11px]">
                              {row[8] || '-'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

      </div>
    </article>
  );
}
