/**
 * RightPanel/index.jsx
 * Right sidebar — quick insights + AI shortcut buttons, responsive drawer
 */
import styles from './RightPanel.module.css';

const INSIGHTS = [
  { title: 'Web+3G Most Risky', desc: '8.64% failure during evening peak — nearly 2× platform average.', tag: 'Risk', color: 'var(--amber)', tagIcon: '⚠️' },
  { title: 'Maharashtra Leads Fraud', desc: '71 cases — highest state. Karnataka close behind at 69.', tag: 'Fraud', color: 'var(--red)', tagIcon: '🛡️' },
  { title: '26–35 Most Targeted', desc: '163 fraud cases. Avg fraud txn ₹1,627 vs ₹1,326 normal.', tag: 'Users', color: 'var(--indigo)', tagIcon: '👥' },
  { title: 'Food Peaks at Noon', desc: '₹552 avg at 12 PM and ₹547 at 7 PM on weekdays.', tag: 'Trend', color: 'var(--green)', tagIcon: '📈' },
  { title: 'WiFi Safest Network', desc: 'Lowest failure rates across all device types during peak hours.', tag: 'Safe', color: 'var(--green)', tagIcon: '✅' },
  { title: 'Android Dominates Volume', desc: 'Android+4G: 38,380 transactions — 45% of all evening traffic.', tag: 'Volume', color: 'var(--indigo)', tagIcon: '📱' },
];

const SHORTCUTS = [
  { label: 'Device Failure Rates', q: 'Compare Android vs iOS failure rates on WiFi and 5G in the evening', icon: '📡' },
  { label: 'Fraud by State', q: 'Which states in India have the most fraud transactions?', icon: '🗺️' },
  { label: 'Age Group Risk', q: 'Which age groups are most involved in fraud?', icon: '👥' },
  { label: 'Spend Patterns', q: 'When do Food and Entertainment make the most money?', icon: '🛍️' },
];

export default function RightPanel({ onAskQuestion, isOpen, onClose }) {
  return (
    <aside
      className={`${styles.panel} ${isOpen ? styles.panelOpen : ''}`}
      aria-label="Quick insights"
    >
      {/* Header */}
      <div className={styles.head}>
        <div>
          <h2 className={styles.headTitle}>QUICK INSIGHTS</h2>
          <p className={styles.headSub}>From 250K real transactions</p>
        </div>
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close insights panel"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Insight cards */}
      <div className={styles.insightList} role="list" aria-label="Key insights">
        {INSIGHTS.map((c, i) => (
          <article key={i} className={styles.insightCard} role="listitem">
            <div className={styles.insightTop}>
              <h3 className={styles.insightTitle}>{c.title}</h3>
              <span
                className={styles.insightTag}
                style={{ background: c.color + '18', color: c.color }}
                aria-label={`Category: ${c.tag}`}
              >
                {c.tagIcon} {c.tag}
              </span>
            </div>
            <p className={styles.insightDesc}>{c.desc}</p>
          </article>
        ))}
      </div>

      {/* Shortcut buttons */}
      <div className={styles.shortcuts}>
        <div className={styles.shortcutsLabel}>ASK THE AI</div>
        {SHORTCUTS.map((s, i) => (
          <button
            key={i}
            className={styles.shortcutBtn}
            onClick={() => onAskQuestion(s.q)}
            aria-label={`Ask AI: ${s.label}`}
          >
            <span aria-hidden="true">{s.icon}</span> {s.label}
            <svg className={styles.shortcutArrow} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        ))}
      </div>
    </aside>
  );
}
