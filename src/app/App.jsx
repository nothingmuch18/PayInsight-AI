/**
 * App.jsx
 * Root component — semantic HTML, responsive layout, lazy-loaded views, ErrorBoundary
 */
import { useState, Suspense, lazy, useEffect } from 'react';
import '../styles/theme.css';

import ErrorBoundary from './components/ErrorBoundary.jsx';
import Sidebar from './components/Sidebar/index.jsx';
import Topbar from './components/Topbar.jsx';
import Chat from './components/Chat/index.jsx';
import RightPanel from './components/RightPanel/index.jsx';
import BottomNav from './components/BottomNav.jsx';

import styles from './App.module.css';

const FailureView = lazy(() => import('./views/FailureView.jsx'));
const FraudView = lazy(() => import('./views/FraudView.jsx'));
const SpendView = lazy(() => import('./views/SpendView.jsx'));

const PAGE_TITLES = {
  chat: 'Conversational Analytics — PayInsight AI',
  failure: 'Device & Network Analysis — PayInsight AI',
  fraud: 'Fraud Detection Dashboard — PayInsight AI',
  spend: 'Spending Trend Analysis — PayInsight AI',
};

function LoadingFallback() {
  return (
    <div className={styles.loader} role="status" aria-label="Loading content">
      <div className={styles.spinner} />
      <span className={styles.loaderText}>Loading analytics...</span>
    </div>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState('chat');
  const [externalQuery, setExternalQuery] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);

  // Dynamic page title
  useEffect(() => {
    document.title = PAGE_TITLES[activePage] || 'PayInsight AI';
  }, [activePage]);

  const handleAskQuestion = (q) => {
    setActivePage('chat');
    setRightPanelOpen(false);
    setTimeout(() => setExternalQuery(q + '?' + Date.now()), 50);
  };

  const handleNavigate = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  const renderContent = () => {
    switch (activePage) {
      case 'failure': return <Suspense fallback={<LoadingFallback />}><FailureView /></Suspense>;
      case 'fraud': return <Suspense fallback={<LoadingFallback />}><FraudView /></Suspense>;
      case 'spend': return <Suspense fallback={<LoadingFallback />}><SpendView /></Suspense>;
      default: return <Chat externalQuery={externalQuery} />;
    }
  };

  return (
    <ErrorBoundary>
      <div className={styles.app}>

        {/* Skip Link for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className={styles.overlay}
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Right panel overlay (mobile/tablet) */}
        {rightPanelOpen && (
          <div
            className={styles.overlayRight}
            onClick={() => setRightPanelOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Left Sidebar Navigation */}
        <Sidebar
          activePage={activePage}
          onNavigate={handleNavigate}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <main id="main-content" className={styles.main} role="main">
          <Topbar
            activePage={activePage}
            onMenuClick={() => setSidebarOpen(true)}
            onInsightsClick={() => setRightPanelOpen(!rightPanelOpen)}
          />
          <section className={styles.content} aria-live="polite">
            {renderContent()}
          </section>
        </main>

        {/* Right Insight Panel */}
        <RightPanel
          onAskQuestion={handleAskQuestion}
          isOpen={rightPanelOpen}
          onClose={() => setRightPanelOpen(false)}
        />

        {/* Mobile Bottom Navigation */}
        <BottomNav activePage={activePage} onNavigate={handleNavigate} />

      </div>
    </ErrorBoundary>
  );
}
