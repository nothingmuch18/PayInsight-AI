/**
 * ErrorBoundary.jsx
 * Graceful error recovery wrapper — catches React rendering errors
 */
import { Component } from 'react';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('PayInsight Error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    justifyContent: 'center', height: '100%', padding: '2rem',
                    color: 'var(--text-primary)', textAlign: 'center'
                }}>
                    <div style={{
                        width: 56, height: 56, borderRadius: 16,
                        background: 'linear-gradient(135deg, var(--red), var(--orange))',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 28, marginBottom: 16
                    }}>
                        ⚠️
                    </div>
                    <h2 style={{
                        fontFamily: 'var(--font-display)', fontSize: 'var(--type-h2)',
                        fontWeight: 700, marginBottom: 8
                    }}>
                        Something went wrong
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: 'var(--type-body)', maxWidth: 400, marginBottom: 24 }}>
                        An unexpected error occurred. Please refresh the page to continue using PayInsight AI.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            padding: '12px 24px', background: 'var(--green)', color: '#000',
                            borderRadius: 'var(--radius-md)', fontWeight: 700, fontSize: 'var(--type-body)',
                            border: 'none', cursor: 'pointer'
                        }}
                    >
                        Refresh Page
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}
