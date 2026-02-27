/**
 * Chat/index.jsx
 * Conversational AI interface — accessible, responsive, structured responses
 * Features: text queries, CSV upload with drag-drop, clear chat, keyboard shortcuts
 */
import { useState, useRef, useEffect, useCallback } from 'react';
import { detectIntent, RESPONSES } from '../../utils/intentEngine';
import { analyzeCSV } from '../../utils/fileAnalyzer';
import { CHART_MAP } from '../Dashboard/Charts';
import styles from './Chat.module.css';

const SUGGESTIONS = [
  { label: 'Device Failure Rates', q: 'Compare Android vs iOS failure rates on WiFi and 5G in the evening', icon: '📡' },
  { label: 'Fraud by State', q: 'Which states in India have the most fraud transactions?', icon: '🗺️' },
  { label: 'Age Group Risk', q: 'Which age groups are most involved in fraud and how much money?', icon: '👥' },
  { label: 'Spend Patterns', q: 'When do Food and Entertainment make the most money on weekdays vs weekends?', icon: '🛍️' },
];

const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: 'Ask in Plain English',
    desc: 'No SQL needed — just type your question'
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    title: 'Instant Visualizations',
    desc: 'Auto-generated charts for every answer'
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
      </svg>
    ),
    title: 'Upload & Analyze CSV',
    desc: 'Drag-drop any CSV for instant insights'
  },
];

const INITIAL_MESSAGES = [{
  role: 'ai',
  resp: {
    badge: 'Welcome to PayInsight AI', icon: '⚡',
    what: 'Hello! I\'m PayInsight AI — a conversational analytics assistant built on 250,000 real UPI transactions from 2024. Ask me anything in plain English about payment failures, fraud patterns, or spending behavior. You can also drag and drop a CSV file anywhere to analyze your own data.',
    why: '', matters: '', note: '', chart: null,
  }
}];

export default function Chat({ externalQuery }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [dragging, setDragging] = useState(false);
  const bottomRef = useRef(null);
  const fileInputRef = useRef(null);
  const inputRef = useRef(null);
  const dragCounter = useRef(0);

  // Accept external query from RightPanel shortcuts
  useEffect(() => {
    if (externalQuery) sendMessage(externalQuery);
  }, [externalQuery]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  // Keyboard shortcut: / to focus input
  useEffect(() => {
    const handler = (e) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const sendMessage = (text) => {
    const query = (text || input).trim();
    if (!query) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: query }]);
    setTyping(true);
    setTimeout(() => {
      const intent = detectIntent(query);
      setMessages(prev => [...prev, { role: 'ai', resp: RESPONSES[intent] || RESPONSES.unknown }]);
      setTyping(false);
    }, 800);
  };

  const processFile = useCallback((file) => {
    if (!file || !file.name.endsWith('.csv')) {
      setMessages(prev => [...prev, {
        role: 'ai',
        resp: { badge: 'Invalid File', icon: '⚠️', what: 'Please upload a valid .csv file.', why: '', matters: '', chart: null }
      }]);
      return;
    }
    setMessages(prev => [...prev, { role: 'user', text: `📎 Uploaded: ${file.name} (${(file.size / 1024).toFixed(1)} KB)` }]);
    setTyping(true);

    analyzeCSV(file).then(resp => {
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'ai', resp }]);
        setTyping(false);
      }, 1200);
    });
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    e.target.value = null;
    processFile(file);
  };

  // Drag & Drop handlers
  const handleDragEnter = (e) => { e.preventDefault(); e.stopPropagation(); dragCounter.current++; setDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); e.stopPropagation(); dragCounter.current--; if (dragCounter.current === 0) setDragging(false); };
  const handleDragOver = (e) => { e.preventDefault(); e.stopPropagation(); };
  const handleDrop = (e) => {
    e.preventDefault(); e.stopPropagation();
    setDragging(false); dragCounter.current = 0;
    if (e.dataTransfer.files?.length) processFile(e.dataTransfer.files[0]);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const clearChat = () => { setMessages(INITIAL_MESSAGES); setInput(''); };

  const isWelcome = messages.length <= 1;

  return (
    <div
      className={`${styles.chat} ${dragging ? styles.chatDragging : ''}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Drag overlay */}
      {dragging && (
        <div className={styles.dropOverlay} role="dialog" aria-label="Drop zone">
          <div className={styles.dropBox}>
            <svg className={styles.dropIcon} width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span className={styles.dropTitle}>Drop your CSV file here</span>
            <span className={styles.dropSub}>We'll analyze it instantly</span>
          </div>
        </div>
      )}

      {/* Message list */}
      <div className={styles.messages} role="log" aria-label="Conversation" aria-live="polite">

        {/* Premium welcome hero — only on fresh chat */}
        {isWelcome && (
          <div className={styles.heroSection}>
            <div className={styles.heroGlow} aria-hidden="true" />
            <div className={styles.heroIcon} aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <h1 className={styles.heroTitle}>
              Your UPI Transactions. <span className={styles.heroAccent}>Decoded by AI.</span>
            </h1>
            <p className={styles.heroSub}>
              Ask questions in plain English. Get board-ready insights from 250,000 real transactions — with charts, evidence, and confidence.
            </p>

            {/* Trust badges */}
            <div className={styles.trustStrip} role="list" aria-label="Platform highlights">
              <span className={styles.trustBadge} role="listitem">250K Real Transactions</span>
              <span className={styles.trustDot} aria-hidden="true">·</span>
              <span className={styles.trustBadge} role="listitem">India 2024 Dataset</span>
              <span className={styles.trustDot} aria-hidden="true">·</span>
              <span className={styles.trustBadge} role="listitem">&lt; 1s Response</span>
            </div>

            <div className={styles.heroFeatures}>
              {FEATURES.map((f, i) => (
                <div key={i} className={styles.heroFeature}>
                  <span className={styles.heroFeatureIcon} aria-hidden="true">{f.icon}</span>
                  <div>
                    <div className={styles.heroFeatureTitle}>{f.title}</div>
                    <div className={styles.heroFeatureDesc}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Conversation messages */}
        {messages.slice(isWelcome ? 1 : 0).map((m, i) => (
          <div key={i} className={`${styles.messageRow} ${m.role === 'user' ? styles.userRow : ''}`}>
            {m.role === 'ai' && (
              <div className={styles.avatar} aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
            )}
            <div className={`${styles.bubble} ${m.role === 'user' ? styles.userBubble : styles.aiBubble}`}>
              {m.role === 'user' ? (
                <p className={styles.userText}>{m.text}</p>
              ) : (
                <AIMessage resp={m.resp} />
              )}
            </div>
          </div>
        ))}

        {typing && (
          <div className={styles.messageRow} role="status" aria-label="AI is thinking">
            <div className={styles.avatar} aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <div className={`${styles.bubble} ${styles.aiBubble} ${styles.typingBubble}`}>
              <div className={styles.typingContent}>
                {[0, 1, 2].map(j => (
                  <span key={j} className={styles.dot} style={{ animationDelay: `${j * 0.18}s` }} />
                ))}
                <span className={styles.typingLabel}>Analyzing 250K records...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestion chips — shown on fresh chat */}
      {isWelcome && (
        <div className={styles.suggestions} role="list" aria-label="Suggested questions">
          {SUGGESTIONS.map((s, i) => (
            <button
              key={i}
              className={styles.chip}
              onClick={() => sendMessage(s.q)}
              role="listitem"
              aria-label={`Ask: ${s.label}`}
            >
              <span aria-hidden="true">{s.icon}</span> {s.label}
            </button>
          ))}
        </div>
      )}

      {/* Input bar */}
      <div className={styles.inputRow}>
        <div className={styles.inputBox}>
          <label htmlFor="chat-input" className="sr-only">
            Ask a question about your transaction data
          </label>
          <svg className={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <input
            id="chat-input"
            ref={inputRef}
            className={styles.input}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder='Ask anything or drop a CSV... (press "/" to focus)'
            aria-describedby="input-hint"
          />
          <span id="input-hint" className="sr-only">
            Press Enter to send. Supports natural language queries about UPI transactions.
          </span>
          <input
            type="file"
            accept=".csv"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileUpload}
            aria-label="Upload CSV file"
          />
          <button
            title="Upload CSV for Analysis"
            className={styles.uploadBtn}
            onClick={() => fileInputRef.current?.click()}
            aria-label="Upload CSV file for analysis"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
            </svg>
          </button>
          {!isWelcome && (
            <button
              title="Clear conversation"
              className={styles.clearBtn}
              onClick={clearChat}
              aria-label="Clear conversation history"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          )}
          <button
            className={styles.sendBtn}
            onClick={() => sendMessage()}
            aria-label="Send message"
            style={{ background: input.trim() ? 'var(--green)' : 'var(--bg-elevated)', color: input.trim() ? '#000' : 'var(--text-faint)' }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/** Renders a structured AI response with What/Why/Matters sections */
function AIMessage({ resp }) {
  const ChartComponent = resp.chart ? CHART_MAP[resp.chart] : null;

  const sections = [
    { tag: 'WHAT HAPPENED', text: resp.what, accent: 'var(--green)' },
    resp.why && { tag: 'WHY IT HAPPENED', text: resp.why, accent: 'var(--indigo)' },
    resp.matters && { tag: 'WHY IT MATTERS', text: resp.matters, accent: 'var(--amber)' },
  ].filter(Boolean);

  return (
    <div className={styles.aiContent}>
      <span className={styles.badge} role="status">
        <span aria-hidden="true">{resp.icon}</span> {resp.badge}
      </span>

      {sections.map((s, i) => (
        <div key={i} className={styles.section}>
          <span className={styles.sectionTag} style={{ background: s.accent + '18', color: s.accent }}>
            {s.tag}
          </span>
          <p className={styles.sectionText}>{s.text}</p>
        </div>
      ))}

      {ChartComponent && (
        <div className={styles.chartWrap} role="img" aria-label={`Chart: ${resp.badge}`}>
          <ChartComponent height={190} />
        </div>
      )}

      {resp.note && (
        <div className={styles.note} role="note">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }}>
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <span className={styles.noteText}>{resp.note}</span>
        </div>
      )}
    </div>
  );
}
