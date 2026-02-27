/**
 * components/Topbar.jsx
 * Top header bar — hamburger menu, page title, KPI chips, insights toggle
 */
import styles from './Topbar.module.css';

const PAGE_TITLES = {
  chat:    'Conversational Analytics',
  failure: 'Device & Network Analysis',
  fraud:   'Fraud Detection Dashboard',
  spend:   'Spending Trend Analysis',
};

const PAGE_BREADCRUMBS = {
  chat:    ['PayInsight', 'AI Analyst'],
  failure: ['PayInsight', 'Analytics Hub', 'Reliability Monitor'],
  fraud:   ['PayInsight', 'Analytics Hub', 'Fraud Intelligence'],
  spend:   ['PayInsight', 'Analytics Hub', 'Spending Insights'],
};

const KPI_CHIPS = [
  { label: 'Total',    value: '2,50,000', color: 'var(--indigo)' },
  { label: 'Failures', value: '4.95%',    color: 'var(--amber)' },
  { label: 'Fraud',    value: '0.19%',    color: 'var(--red)' },
];

export default function Topbar({ activePage, onMenuClick, onInsightsClick }) {
  const breadcrumbs = PAGE_BREADCRUMBS[activePage] || ['PayInsight'];

  return (
    <header className={styles.topbar} role="banner">
      <div className={styles.left}>
        {/* Mobile hamburger */}
        <button
          className={styles.menuBtn}
          onClick={onMenuClick}
          aria-label="Open navigation menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>

        {/* Breadcrumb */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <ol className={styles.breadcrumbList}>
            {breadcrumbs.map((crumb, i) => (
              <li key={i} className={styles.breadcrumbItem}>
                {i > 0 && <span className={styles.breadcrumbSep} aria-hidden="true">/</span>}
                <span className={i === breadcrumbs.length - 1 ? styles.breadcrumbActive : ''}>
                  {crumb}
                </span>
              </li>
            ))}
          </ol>
        </nav>

        <h1 className={styles.title}>{PAGE_TITLES[activePage] || 'Analytics'}</h1>
      </div>

      <div className={styles.right}>
        {/* KPI Chips */}
        <div className={styles.chips} role="list" aria-label="Key metrics">
          {KPI_CHIPS.map((k, i) => (
            <div key={i} className={styles.chip} role="listitem" style={{ borderColor: k.color + '22' }}>
              <span className={styles.chipLabel}>{k.label}</span>
              <span className={styles.chipVal} style={{ color: k.color }}>{k.value}</span>
            </div>
          ))}
        </div>

        {/* Insights toggle (tablet/mobile) */}
        <button
          className={styles.insightsBtn}
          onClick={onInsightsClick}
          aria-label="Toggle insights panel"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
        </button>
      </div>
    </header>
  );
}
