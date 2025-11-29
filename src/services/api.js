const BASE_URL = 'https://www.alphavantage.co/query';

// Helper to delay execution
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Cache to store data and timestamp
const CACHE_KEY = 'financial_dashboard_cache';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export const getApiKey = () => localStorage.getItem('alphavantage_api_key');
export const setApiKey = (key) => localStorage.setItem('alphavantage_api_key', key);

export const fetchFinancialData = async (apiKey) => {
    if (!apiKey) throw new Error('API Key is missing');

    // Check cache first
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
        const { timestamp, data } = JSON.parse(cached);
        // If cache is fresh (less than 1 hour old) and we are not forcing refresh (logic can be added), return it.
        // For now, we'll assume if the user hits refresh, they want fresh data, so we might bypass this in the component.
        // But to be safe with limits, let's return cached if it's very recent (< 5 mins) unless explicitly bypassed?
        // Actually, let's just implement the fetcher and let the caller handle cache policy or just overwrite cache.
    }

    const results = {};

    // We need to fetch multiple endpoints. 
    // Alpha Vantage Free Tier Limit: 5 calls per minute.
    // We have ~13 indicators. This is tricky.
    // Strategy: We will fetch the most critical dynamic ones: Gold, Silver, USD/INR (to convert), and maybe 1-2 indices.
    // For Bonds/Inflation, they don't change every minute, maybe we can skip or use a different source if possible? 
    // Or we just fetch them slowly.

    // Let's try to fetch:
    // 1. USD/INR (to convert metals)
    // 2. Gold (XAU)
    // 3. Silver (XAG)
    // 4. US 10Y Yield
    // 5. Nifty 50 (If available, symbol usually '^NSEI' or similar, might fail on free tier)

    // Queue of requests
    const requests = [
        { key: 'usd_inr', params: { function: 'CURRENCY_EXCHANGE_RATE', from_currency: 'USD', to_currency: 'INR' } },
        { key: 'gold', params: { function: 'CURRENCY_EXCHANGE_RATE', from_currency: 'XAU', to_currency: 'USD' } },
        { key: 'silver', params: { function: 'CURRENCY_EXCHANGE_RATE', from_currency: 'XAG', to_currency: 'USD' } },
        { key: 'us10y', params: { function: 'TREASURY_YIELD', interval: 'daily', maturity: '10year' } },
        // Add more if needed, but keep in mind the limit.
    ];

    const fetchedData = {};

    for (let i = 0; i < requests.length; i++) {
        const req = requests[i];
        try {
            const queryString = new URLSearchParams({ ...req.params, apikey: apiKey }).toString();
            const response = await fetch(`${BASE_URL}?${queryString}`);
            const data = await response.json();

            // Check for API limit message
            if (data.Note && data.Note.includes('call frequency')) {
                console.warn('API Limit reached, stopping fetch.');
                break;
            }

            fetchedData[req.key] = data;

            // Wait 12 seconds between calls to stay under 5 calls/minute (60s / 5 = 12s)
            if (i < requests.length - 1) {
                await delay(12000);
            }
        } catch (error) {
            console.error(`Failed to fetch ${req.key}:`, error);
        }
    }

    return processData(fetchedData);
};

const processData = (data) => {
    // Helper to parse float safely
    const p = (val) => parseFloat(val) || 0;

    const usdRate = p(data.usd_inr?.['Realtime Currency Exchange Rate']?.['5. Exchange Rate']);

    const processed = {};

    if (data.gold && usdRate) {
        const goldUsd = p(data.gold['Realtime Currency Exchange Rate']['5. Exchange Rate']);
        // Gold is usually per oz in international markets. India uses 10g.
        // 1 Troy Ounce = 31.1035 grams.
        // Price per gram = Price per oz / 31.1035
        // Price per 10g = (Price per oz / 31.1035) * 10
        const goldInr10g = (goldUsd * usdRate / 31.1035) * 10;
        processed.gold = { value: goldInr10g, unit: '₹/10g' };
    }

    if (data.silver && usdRate) {
        const silverUsd = p(data.silver['Realtime Currency Exchange Rate']['5. Exchange Rate']);
        // Silver per gram
        const silverInr1g = (silverUsd * usdRate / 31.1035);
        processed.silver = { value: silverInr1g, unit: '₹/g' };
    }

    if (data.us10y?.data?.[0]) {
        processed['us-tbill-10y'] = { value: p(data.us10y.data[0].value), unit: '%' };
    }

    return processed;
};
