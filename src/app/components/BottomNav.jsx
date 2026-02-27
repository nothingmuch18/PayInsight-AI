/**
 * BottomNav.jsx
 * Mobile bottom tab navigation — visible only on small screens
 */
import styles from './BottomNav.module.css';

const TABS = [
    {
        id: 'chat', label: 'AI Chat',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
        ),
    },
    {
        id: 'failure', label: 'Failures',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><circle cx="12" cy="20" r="1" />
            </svg>
        ),
    },
    {
        id: 'fraud', label: 'Fraud',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
    },
    {
        id: 'spend', label: 'Spend',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
        ),
    },
];

export default function BottomNav({ activePage, onNavigate }) {
    return (
        <nav className={styles.bottomNav} aria-label="Mobile navigation" role="navigation">
            {TABS.map(tab => (
                <button
                    key={tab.id}
                    className={`${styles.tab} ${activePage === tab.id ? styles.tabActive : ''}`}
                    onClick={() => onNavigate(tab.id)}
                    aria-current={activePage === tab.id ? 'page' : undefined}
                    aria-label={tab.label}
                >
                    <span className={styles.tabIcon} aria-hidden="true">{tab.icon}</span>
                    <span className={styles.tabLabel}>{tab.label}</span>
                </button>
            ))}
        </nav>
    );
}
