/**
 * views/FraudView.jsx
 * Dashboard — Fraud Analysis (State + Age Group)
 */
import { FraudStateChart, FraudAgeChart } from '../components/Dashboard/Charts';
import styles from './Views.module.css';

const KPI_CARDS = [
  { label: 'Total Fraud Cases', value: '480', color: 'var(--red)' },
  { label: 'Overall Fraud Rate', value: '0.19%', color: 'var(--amber)' },
  { label: 'Most Targeted Age', value: '26–35', color: 'var(--indigo)' },
  { label: 'Highest Risk State', value: 'Maharashtra', color: 'var(--red)' },
];

export default function FraudView() {
  return (
    <section className={styles.page} aria-labelledby="fraud-title">
      <header className={styles.pageHeader}>
        <h2 id="fraud-title" className={styles.pageTitle}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ display: 'inline', verticalAlign: 'middle', marginRight: 8 }}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          Fraud Analysis
        </h2>
        <p className={styles.pageSub}>480 flagged transactions · 0.19% overall fraud rate · 250,000 total</p>
      </header>

      <div className={styles.insightBanner} style={{ borderColor: 'rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.06)' }} role="alert">
        <strong style={{ color: 'var(--red)' }}>Key Finding: </strong>
        Maharashtra (71) and Karnataka (69) account for 29% of all fraud. The 26–35 age group is most targeted with avg fraud transaction of ₹1,627.
      </div>

      <div className={styles.twoColGrid}>
        <article className={styles.card}>
          <h3 className={styles.cardLabel}>Top 10 States by Fraud Count</h3>
          <div role="img" aria-label="Horizontal bar chart showing top 10 states by fraud count">
            <FraudStateChart height={220} />
          </div>
        </article>
        <article className={styles.card}>
          <h3 className={styles.cardLabel}>Fraud vs Normal Avg Amount by Age Group (₹)</h3>
          <div role="img" aria-label="Grouped bar chart comparing fraud and normal average amounts by age group">
            <FraudAgeChart height={220} />
          </div>
        </article>
      </div>

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
