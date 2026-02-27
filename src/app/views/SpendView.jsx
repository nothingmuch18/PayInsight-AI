/**
 * views/SpendView.jsx
 * Dashboard — Food & Entertainment Spend Trends
 */
import { SpendingChart } from '../components/Dashboard/Charts';
import styles from './Views.module.css';

const KPI_CARDS = [
  { label: 'Food Avg (Weekday)', value: '₹532', color: 'var(--amber)' },
  { label: 'Food Avg (Weekend)', value: '₹531', color: 'var(--orange)' },
  { label: 'Entertainment (Weekday)', value: '₹414', color: 'var(--indigo)' },
  { label: 'Entertainment (Weekend)', value: '₹411', color: 'var(--violet)' },
];

export default function SpendView() {
  return (
    <section className={styles.page} aria-labelledby="spend-title">
      <header className={styles.pageHeader}>
        <h2 id="spend-title" className={styles.pageTitle}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ display: 'inline', verticalAlign: 'middle', marginRight: 8 }}>
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
          Spend Trends — Food & Entertainment
        </h2>
        <p className={styles.pageSub}>37,464 Food · 20,103 Entertainment transactions · Full Year 2024</p>
      </header>

      <div className={styles.insightBanner} style={{ borderColor: 'rgba(16,185,129,0.3)', background: 'rgba(16,185,129,0.06)' }} role="alert">
        <strong style={{ color: 'var(--green)' }}>Key Finding: </strong>
        Food peaks at noon (₹552) and 6–7 PM (₹539–547) on weekdays — clear meal-time behavior. Entertainment is flat (~₹413) with a modest late-night rise on weekday evenings.
      </div>

      <article className={styles.card}>
        <h3 className={styles.cardLabel}>Avg Spend (₹) by Hour — Weekday vs Weekend</h3>
        <div role="img" aria-label="Line chart showing average spending by hour for food and entertainment on weekdays and weekends">
          <SpendingChart height={240} />
        </div>
      </article>

      <div className={styles.kpiGrid} style={{ gridTemplateColumns: 'repeat(4, 1fr)' }} role="list" aria-label="Key metrics">
        {KPI_CARDS.map((k, i) => (
          <article key={i} className={styles.kpiCard} style={{ borderColor: k.color + '33' }} role="listitem">
            <div className={styles.kpiLabel}>{k.label}</div>
            <div className={styles.kpiVal} style={{ color: k.color }}>{k.value}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
