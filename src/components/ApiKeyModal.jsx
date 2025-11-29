import React, { useState } from 'react';

const ApiKeyModal = ({ isOpen, onClose, onSave }) => {
    const [key, setKey] = useState('');

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: 1000, backdropFilter: 'blur(4px)'
        }}>
            <div className="glass-panel" style={{ padding: '2rem', width: '100%', maxWidth: '400px' }}>
                <h2 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Enter API Key</h2>
                <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                    Please enter your Alpha Vantage API key to fetch real-time data.
                    You can get one for free at <a href="https://www.alphavantage.co/support/#api-key" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-color)' }}>alphavantage.co</a>.
                </p>

                <input
                    type="text"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    placeholder="Ex: DEMO_KEY"
                    style={{
                        width: '100%', padding: '0.75rem', borderRadius: '0.5rem',
                        border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)',
                        color: 'white', marginBottom: '1.5rem', outline: 'none'
                    }}
                />

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none',
                            background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer'
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onSave(key)}
                        disabled={!key}
                        style={{
                            padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none',
                            background: 'var(--accent-color)', color: 'white', cursor: 'pointer',
                            fontWeight: '600'
                        }}
                    >
                        Save & Fetch
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApiKeyModal;
