export const indicators = [
    {
        id: 'nifty50',
        name: 'Nifty 50',
        category: 'Indices',
        value: 26202.95,
        change: -13.10, // Approx calculated from -0.05%
        changePercent: -0.05,
        unit: '',
        trend: 'down'
    },
    {
        id: 'bse30',
        name: 'BSE Sensex',
        category: 'Indices',
        value: 85706.67,
        change: 128.50, // Approx calculated from +0.15%
        changePercent: 0.15,
        unit: '',
        trend: 'up'
    },
    {
        id: 'gold',
        name: 'Gold (24K)',
        category: 'Metals',
        value: 126150.00,
        change: 150.00, // Dummy change
        changePercent: 0.12,
        unit: '₹/10g',
        trend: 'up'
    },
    {
        id: 'silver',
        name: 'Silver',
        category: 'Metals',
        value: 162.67, // Per gram derived from 162667/kg
        change: 0.50,
        changePercent: 0.31,
        unit: '₹/g',
        trend: 'up'
    },
    {
        id: 'bond-india-10y',
        name: 'India 10Y Bond',
        category: 'Fixed Income',
        value: 6.51,
        change: 0.01,
        changePercent: 0.15,
        unit: '%',
        trend: 'up'
    },
    {
        id: 'us-tbill-90d',
        name: 'US T-Bills 90D',
        category: 'Fixed Income',
        value: 3.74,
        change: 0.00,
        changePercent: 0.00,
        unit: '%',
        trend: 'neutral'
    },
    {
        id: 'us-tbill-5y',
        name: 'US T-Bills 5Y',
        category: 'Fixed Income',
        value: 3.56,
        change: -0.02,
        changePercent: -0.56,
        unit: '%',
        trend: 'down'
    },
    {
        id: 'us-tbill-10y',
        name: 'US T-Bills 10Y',
        category: 'Fixed Income',
        value: 3.99,
        change: 0.05,
        changePercent: 1.27,
        unit: '%',
        trend: 'up'
    },
    {
        id: 'us-tbill-30y',
        name: 'US T-Bills 30Y',
        category: 'Fixed Income',
        value: 4.64,
        change: 0.03,
        changePercent: 0.65,
        unit: '%',
        trend: 'up'
    },
    {
        id: 'us-tbill-50y',
        name: 'US T-Bills 50Y',
        category: 'Fixed Income',
        value: 4.70, // Estimated
        change: 0.00,
        changePercent: 0.00,
        unit: '%',
        trend: 'neutral'
    },
    {
        id: 'cpi-india',
        name: 'India CPI',
        category: 'Economics',
        value: 0.25,
        change: -1.19, // Drop from previous
        changePercent: -82.6,
        unit: '%',
        trend: 'down'
    },
    {
        id: 'wpi-india',
        name: 'India WPI',
        category: 'Economics',
        value: -1.21,
        change: -0.50,
        changePercent: -20.0,
        unit: '%',
        trend: 'down'
    },
    {
        id: 'repo-rate',
        name: 'Repo Rate',
        category: 'Economics',
        value: 5.50,
        change: 0.00,
        changePercent: 0.00,
        unit: '%',
        trend: 'neutral'
    }
];
