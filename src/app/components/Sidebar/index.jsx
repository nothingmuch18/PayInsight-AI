/**
 * Sidebar/index.jsx
 * Left navigation — SVG icons, collapsible, ARIA, responsive drawer
 */
import { STATS } from '../../data/transactionData';
import { formatVolume, formatPct } from '../../utils/formatters';
import styles from './Sidebar.module.css';

const NAV_ITEMS = [
  {
    id: 'chat', label: 'AI Chat',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: 'failure', label: 'Failure Rates',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><circle cx="12" cy="20" r="1" />
      </svg>
    ),
  },
  {
    id: 'fraud', label: 'Fraud Analysis',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    id: 'spend', label: 'Spend Trends',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
];

const STAT_ROWS = [
  { label: 'Transactions', value: '2,50,000', color: 'var(--text-secondary)' },
  { label: 'Volume', value: formatVolume(STATS.volume), color: 'var(--text-secondary)' },
  { label: 'Success Rate', value: formatPct(STATS.successRate), color: 'var(--green)' },
  { label: 'Fraud Rate', value: formatPct(STATS.fraudRate), color: 'var(--red)' },
  { label: 'Failed Txns', value: '12,376', color: 'var(--amber)' },
];

export default function Sidebar({ activePage, onNavigate, isOpen, onClose }) {
  return (
    <nav
      className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}
      aria-label="Primary navigation"
      role="navigation"
    >
      {/* Brand */}
      <div className={styles.brand}>
        <div className={styles.brandIcon} aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        </div>
        <div>
          <div className={styles.brandName}>PayInsight</div>
          <div className={styles.brandTag}>Decision Intelligence</div>
        </div>
        {/* Mobile close button */}
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close navigation"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Navigation Links */}
      <div className={styles.nav}>
        <div className={styles.sectionLabel} id="nav-label">NAVIGATION</div>
        <ul className={styles.navList} role="list" aria-labelledby="nav-label">
          {NAV_ITEMS.map(item => (
            <li key={item.id} role="listitem">
              <button
                className={`${styles.navBtn} ${activePage === item.id ? styles.navBtnActive : ''}`}
                onClick={() => onNavigate(item.id)}
                aria-current={activePage === item.id ? 'page' : undefined}
                aria-label={item.label}
              >
                <span className={styles.navIcon} aria-hidden="true">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>

        {/* Dataset Stats */}
        <div className={`${styles.sectionLabel} ${styles.sectionLabelMt}`}>DATASET STATS</div>
        <dl className={styles.statList}>
          {STAT_ROWS.map((s, i) => (
            <div key={i} className={styles.statRow}>
              <dt className={styles.statLabel}>{s.label}</dt>
              <dd className={styles.statValue} style={{ color: s.color }}>{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className={styles.footer}>
        <span>UPI DATA · 2024–2026 · INDIA</span>
        <span className={styles.version}>v2.0</span>
      </div>
    </nav>
  );
}
