import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import ApiKeyModal from './components/ApiKeyModal';
import { getApiKey, setApiKey, fetchFinancialData } from './services/api';

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [liveData, setLiveData] = useState(null);
    const [apiKey, setApiKeyState] = useState(getApiKey());

    const currentDate = new Date().toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const handleFetchData = async (key = apiKey) => {
        if (!key) {
            setIsModalOpen(true);
            return;
        }

        setIsLoading(true);
        try {
            const data = await fetchFinancialData(key);
            setLiveData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("Failed to fetch data. Check console or API key.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveKey = (key) => {
        setApiKey(key);
        setApiKeyState(key);
        setIsModalOpen(false);
        handleFetchData(key);
    };

    return (
        <div className="container">
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', background: 'linear-gradient(to right, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Market Pulse
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Daily Financial Indicators</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                        {currentDate}
                    </div>
                    <button
                        onClick={() => handleFetchData()}
                        disabled={isLoading}
                        style={{
                            padding: '0.5rem 1rem',
                            fontSize: '0.875rem',
                            borderRadius: '0.5rem',
                            border: '1px solid var(--accent-color)',
                            background: 'rgba(56, 189, 248, 0.1)',
                            color: 'var(--accent-color)',
                            cursor: isLoading ? 'wait' : 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        {isLoading ? 'Refreshing...' : 'Refresh Data'}
                    </button>
                </div>
            </header>

            <main>
                <Dashboard liveData={liveData} isLoading={isLoading} />
            </main>

            <ApiKeyModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveKey}
            />

            <footer style={{ marginTop: '4rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.75rem', paddingBottom: '2rem' }}>
                <p>Data provided by Alpha Vantage (Free Tier) & Static Fallbacks.</p>
            </footer>
        </div>
    );
}

export default App;
