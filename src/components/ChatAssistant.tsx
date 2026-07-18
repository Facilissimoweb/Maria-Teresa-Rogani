import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Loader2, RefreshCw } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface ChatAssistantProps {
  setActiveTab?: (tab: 'home' | 'chi-sono' | 'servizi' | 'normativa' | 'contatti') => void;
}

export default function ChatAssistant({ setActiveTab }: ChatAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Benvenuti su Facilissimo Web! Sono il **Chatbox automatico di M. Teresa Rogani** (un assistente virtuale intelligente: non state parlando direttamente con lei, ma con il suo risponditore AI). M. Teresa opera come unica professionista indipendente per affiancarvi in ogni fase del Vostro progetto. Come vostro assistente virtuale, sono a disposizione per illustrare i servizi e i vantaggi dell\'accessibilità e della lead generation. Come posso aiutarvi oggi a ottimizzare i Vostri risultati online? Se desiderate scriverle o parlarle direttamente, potete cliccare sul pulsante WhatsApp o compilare il modulo di richiesta!'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "Quali sono i servizi di Facilissimo Web?",
    "Come posso generare nuovi contatti?",
    "Chi è M. Teresa Rogani?",
    "Come posso richiedere una consulenza?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getLastAssistantQuestions = (): string[] => {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg && lastMsg.role === 'assistant') {
      const lines = lastMsg.content.split('\n');
      const questions = lines
        .map(line => line.trim())
        .filter(line => line.endsWith('?') && line.length > 10 && line.length < 100)
        .map(line => line.replace(/^[\s\-•📌🎯⚖️💻📈]*\s*/, ''));
      return questions.slice(0, 2);
    }
    return [];
  };

  const renderMessageContent = (content: string) => {
    const parts = content.split('**');
    return (
      <span className="whitespace-pre-wrap font-medium block">
        {parts.map((part, i) => {
          if (i % 2 === 1) {
            const isHeading = part === part.toUpperCase() && part.length > 3;
            return (
              <strong 
                key={i} 
                className={`font-black text-[#0A192F] dark:text-white ${isHeading ? 'text-[11px] block mt-3.5 mb-1.5 tracking-wider' : 'text-xs'}`}
              >
                {part}
              </strong>
            );
          }
          return part;
        })}
      </span>
    );
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setError(null);
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Build conversation history in correct format for the server
      const chatHistory = [...messages, userMessage].map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: chatHistory })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Errore nella connessione con il server AI.');
      }

      const data = await response.json();
      
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.reply
        }
      ]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Errore di connessione. Verificare che le chiavi API siano state impostate correttamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const resetChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: 'Benvenuti su Facilissimo Web! Sono il **Chatbox automatico di M. Teresa Rogani** (un assistente virtuale intelligente: non state parlando direttamente con lei, ma con il suo risponditore AI). M. Teresa opera come unica professionista indipendente per affiancarvi in ogni fase del Vostro progetto. Come vostro assistente virtuale, sono a disposizione per illustrare i servizi e i vantaggi dell\'accessibilità e della lead generation. Come posso aiutarvi oggi a ottimizzare i Vostri risultati online? Se desiderate scriverle o parlarle direttamente, potete cliccare sul pulsante WhatsApp o compilare il modulo di richiesta!'
      }
    ]);
    setError(null);
  };

  const handleRequestFormRedirect = () => {
    if (setActiveTab) {
      setActiveTab('contatti');
      setIsOpen(false);
      setTimeout(() => {
        const formElement = document.getElementById('lead-generation-form');
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          const viewElement = document.getElementById('contatti-view');
          if (viewElement) {
            viewElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }, 150);
    }
  };

  return (
    <div id="ai-chat-assistant-container" className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Chat Trigger Button */}
      <button
        id="ai-chat-trigger"
        onClick={() => {
          const nextState = !isOpen;
          setIsOpen(nextState);
          if (nextState) {
            // Scroll both window and the main view container to the top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            const mainEl = document.getElementById('app-main-content');
            if (mainEl) {
              mainEl.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }
        }}
        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl relative cursor-pointer ${
          isOpen
            ? 'bg-rose-600 text-white hover:bg-rose-700'
            : 'bg-[#f4700a] text-white hover:bg-[#d45d05] hover:scale-105'
        }`}
        title="Apri Chatbox Facilissimo Web"
        aria-label="Apri assistente virtuale"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <div className="relative">
            <MessageSquare className="w-7 h-7 text-black" />
            <Sparkles className="w-3.5 h-3.5 text-indigo-950 absolute -top-1 -right-1 animate-pulse" />
          </div>
        )}
      </button>

      {/* Interactive Chat Window */}
      {isOpen && (
        <div
          id="ai-chat-window"
          className="fixed inset-4 sm:inset-auto sm:bottom-20 sm:right-6 sm:left-auto sm:top-auto sm:w-[420px] sm:h-[620px] sm:max-h-[80vh] bg-white dark:bg-[#0d1e36] border-2 border-[#f4700a] shadow-2xl flex flex-col z-50 animate-slideUp rounded-3xl overflow-hidden text-left"
        >
          {/* Header */}
          <div className="bg-[#111113] text-white p-4 flex justify-between items-center border-b border-[#f4700a]/20 shrink-0">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-[#f4700a] rounded-xl">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-[#f4700a]">CHATBOX FACILISSIMO WEB</h4>
                <p className="text-sm font-extrabold uppercase tracking-wider">DI M.TERESA ROGANI</p>
              </div>
            </div>
            <div className="flex items-center space-x-1.5">
              <button
                onClick={resetChat}
                className="p-1.5 hover:bg-white/10 text-slate-300 hover:text-white rounded-xl transition-colors cursor-pointer"
                title="Svuota chat"
                aria-label="Ricomincia chat"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 text-slate-300 hover:text-white rounded-xl transition-colors cursor-pointer"
                title="Chiudi"
                aria-label="Chiudi chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* WhatsApp & Request Form Actions Banner */}
          <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-white/10 p-3 flex flex-col sm:flex-row gap-2 items-stretch shrink-0">
            <button
              onClick={handleRequestFormRedirect}
              className="flex-1 flex items-center justify-center space-x-1.5 bg-[#f4700a] hover:bg-[#f4700a]/80 text-white font-extrabold py-2 px-3 rounded-xl transition-all duration-200 text-[9px] uppercase tracking-wider shadow-sm hover:shadow hover:scale-[1.01] cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>COMPILATE IL MODULO DI RICHIESTA</span>
            </button>
            <a
              href="https://wa.me/393793603321"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-1.5 bg-[#f4700a] hover:bg-[#d45d05] text-white font-extrabold py-2 px-3 rounded-xl transition-all duration-200 text-[9px] uppercase tracking-wider shadow-sm hover:shadow hover:scale-[1.01] cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.023-5.11-2.884-6.978C16.53 1.9 14.053.874 11.418.874c-5.44 0-9.865 4.42-9.869 9.866-.001 1.764.475 3.49 1.38 5.013l-.991 3.616 3.704-.972zm11.117-6.52c-.3-.15-1.77-.874-2.043-.974-.275-.1-.475-.15-.675.15-.2.3-.775.974-.95 1.174-.175.2-.35.225-.65.075-.3-.15-1.265-.467-2.41-1.485-.89-.794-1.49-1.775-1.665-2.075-.175-.3-.018-.463.13-.612.135-.133.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.588-.492-.51-.675-.519-.172-.008-.371-.01-.571-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.11 3.224 5.11 4.524.714.31 1.27.494 1.706.633.717.227 1.37.195 1.886.118.575-.085 1.77-.724 2.02-1.424.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35z" />
              </svg>
              <span>WHATSAPP DIRETTI</span>
            </a>
          </div>

          {/* Messages List Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 dark:bg-[#081526]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 text-xs leading-relaxed shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-[#f4700a] text-white rounded-2xl rounded-tr-none'
                      : 'bg-white dark:bg-[#0d1e36] text-slate-900 dark:text-slate-200 border border-slate-200 dark:border-white/10 rounded-2xl rounded-tl-none'
                  }`}
                >
                  {renderMessageContent(msg.content)}
                </div>
              </div>
            ))}

            {/* Suggested Chip Buttons */}
            {messages.length === 1 && (
              <div className="pt-2 space-y-1.5">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">Domande Frequenti:</span>
                <div className="flex flex-col gap-1.5">
                  {suggestions.map((sug, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(sug)}
                      className="text-left py-2 px-3.5 text-[11px] bg-white dark:bg-[#0d1e36] text-slate-900 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-[#f4700a] dark:hover:border-[#f4700a] cursor-pointer transition-colors font-semibold rounded-xl"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Dynamic Contextual Follow-up Chips (Domande di senso) */}
            {!isLoading && messages.length > 1 && (
              (() => {
                const contextualQuestions = getLastAssistantQuestions();
                if (contextualQuestions.length > 0) {
                  return (
                    <div className="pt-2 space-y-1.5">
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">Domande di Approfondimento:</span>
                      <div className="flex flex-col gap-1.5">
                        {contextualQuestions.map((q, i) => (
                          <button
                            key={i}
                            onClick={() => handleSendMessage(q)}
                            className="text-left py-2 px-3.5 text-[11px] bg-white dark:bg-[#0d1e36] text-slate-900 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-[#f4700a] dark:hover:border-[#f4700a] cursor-pointer transition-colors font-semibold rounded-xl flex items-center space-x-1"
                          >
                            <span>💡</span>
                            <span className="flex-1">{q}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                }
                return null;
              })()
            )}

            {/* Loader/Thinking block */}
            {isLoading && (
              <div className="flex justify-start items-center space-x-2 pt-1">
                <div className="bg-white dark:bg-[#0d1e36] text-slate-900 dark:text-slate-200 border border-slate-200 dark:border-white/10 p-3 rounded-2xl flex items-center space-x-2 shadow-sm">
                  <Loader2 className="w-4 h-4 animate-spin text-[#f4700a]" />
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Elaborazione in corso...</span>
                </div>
              </div>
            )}

            {/* Error Message Block */}
            {error && (
              <div className="p-3 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/30 text-rose-700 dark:text-rose-300 text-xs rounded-xl">
                <p className="font-semibold uppercase tracking-wider text-[9px] text-rose-600 dark:text-rose-400 mb-0.5">Errore del sistema</p>
                <p>{error}</p>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Form Input Area */}
          <form
            onSubmit={handleFormSubmit}
            className="p-3 bg-white dark:bg-[#0d1e36] border-t border-slate-200 dark:border-white/10 flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Scrivete un messaggio..."
              disabled={isLoading}
              className="flex-1 text-xs px-3.5 py-2.5 border border-slate-200 dark:border-white/10 focus:border-[#f4700a] dark:focus:border-[#f4700a] focus:outline-none bg-slate-50 dark:bg-[#081526] text-slate-900 dark:text-white rounded-xl"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="p-2.5 bg-[#f4700a] hover:bg-[#f4700a]/80 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer rounded-xl shrink-0"
              title="Invia"
              aria-label="Invia messaggio"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
