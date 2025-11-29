import React from 'react';

const IndicatorCard = ({ data, isLoading }) => {
    const isPositive = data.change >= 0;
    const isNeutral = data.change === 0;

    const trendColor = isNeutral
        ? 'var(--text-secondary)'
        : isPositive
            ? 'var(--positive-color)'
            : 'var(--negative-color)';

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', transition: 'transform 0.2s ease', cursor: 'default', opacity: isLoading ? 0.7 : 1 }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {data.name}
                    {data.isLive && (
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--positive-color)', boxShadow: '0 0 4px var(--positive-color)' }} title="Live Data"></span>
                    )}
                </h3>
                {/* Simple trend indicator icon */}
                <div style={{ color: trendColor }}>
                    {isNeutral ? '−' : isPositive ? '↗' : '↘'}
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.5rem' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                    {data.value ? data.value.toLocaleString('en-IN') : '--'}
                </span>
                {data.unit && (
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        {data.unit}
                    </span>
                )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                <span style={{ color: trendColor, fontWeight: '500' }}>
                    {isPositive ? '+' : ''}{data.change}
                </span>
                <span style={{ color: trendColor, opacity: 0.8 }}>
                    ({isPositive ? '+' : ''}{data.changePercent}%)
                </span>
            </div>
        </div>
    );
};

export default IndicatorCard;
