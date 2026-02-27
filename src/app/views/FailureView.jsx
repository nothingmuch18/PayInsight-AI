/**
 * views/FailureView.jsx
 * Dashboard — Device & Network Failure Rate Analysis
 */
import { FailureRateChart } from '../components/Dashboard/Charts';
import styles from './Views.module.css';

const KPI_CARDS = [
  { label: 'Worst Combination', value: 'Web + 3G', sub: '8.64% failure rate', color: 'var(--red)' },
  { label: 'Best Combination', value: 'Web + WiFi', sub: '4.30% failure rate', color: 'var(--green)' },
  { label: 'Highest Volume', value: 'Android + 4G', sub: '38,380 transactions', color: 'var(--indigo)' },
];

export default function FailureView() {
  return (
    <section className={styles.page} aria-labelledby="failure-title">
      <header className={styles.pageHeader}>
        <h2 id="failure-title" className={styles.pageTitle}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ display: 'inline', verticalAlign: 'middle', marginRight: 8 }}>
            <path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><circle cx="12" cy="20" r="1" />
          </svg>
          Device & Network Failure Rates
        </h2>
        <p className={styles.pageSub}>Peak Evening Hours (6 PM – 10 PM) · 85,562 transactions analysed</p>
      </header>

      <div className={styles.insightBanner} style={{ borderColor: 'rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.06)' }} role="alert">
        <strong style={{ color: 'var(--amber)' }}>Key Finding: </strong>
        Web on 3G has an 8.64% failure rate — nearly 2× the platform average. Android on WiFi is the most reliable combination at 4.63%.
      </div>

      <article className={styles.card}>
        <h3 className={styles.cardLabel}>Failure Rate (%) by Device & Network Type</h3>
        <div role="img" aria-label="Bar chart showing failure rates by device and network type">
          <FailureRateChart height={220} />
        </div>
      </article>

      <div className={styles.kpiGrid} style={{ gridTemplateColumns: 'repeat(3, 1fr)' }} role="list" aria-label="Key metrics">
        {KPI_CARDS.map((k, i) => (
          <article key={i} className={styles.kpiCard} style={{ borderColor: k.color + '33' }} role="listitem">
            <div className={styles.kpiLabel}>{k.label}</div>
            <div className={styles.kpiVal} style={{ color: k.color }}>{k.value}</div>
            {k.sub && <div className={styles.kpiSub}>{k.sub}</div>}
          </article>
        ))}
      </div>
    </section>
  );
}
