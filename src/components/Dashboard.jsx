import React from 'react';
import IndicatorCard from './IndicatorCard';
import { indicators as initialIndicators } from '../data/indicators';

const Dashboard = ({ liveData, isLoading }) => {
    // Merge initial static data with live data if available
    const mergedIndicators = initialIndicators.map(ind => {
        if (liveData && liveData[ind.id]) {
            return { ...ind, ...liveData[ind.id], isLive: true };
        }
        return ind;
    });

    // Group indicators by category
    const categories = mergedIndicators.reduce((acc, indicator) => {
        if (!acc[indicator.category]) {
            acc[indicator.category] = [];
        }
        acc[indicator.category].push(indicator);
        return acc;
    }, {});

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {isLoading && (
                <div style={{
                    textAlign: 'center', padding: '1rem', background: 'rgba(56, 189, 248, 0.1)',
                    borderRadius: '0.5rem', color: 'var(--accent-color)', marginBottom: '1rem'
                }}>
                    Fetching latest market data... (This may take up to a minute due to API limits)
                </div>
            )}

            {Object.entries(categories).map(([category, items]) => (
                <section key={category}>
                    <h2 style={{
                        fontSize: '1.25rem',
                        marginBottom: '1.5rem',
                        color: 'var(--text-primary)',
                        borderLeft: '4px solid var(--accent-color)',
                        paddingLeft: '1rem'
                    }}>
                        {category}
                    </h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        {items.map((indicator) => (
                            <IndicatorCard key={indicator.id} data={indicator} isLoading={isLoading} />
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
};

export default Dashboard;
