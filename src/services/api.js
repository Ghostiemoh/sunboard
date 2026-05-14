/**
 * API Service Layer
 * Fetches market data from DexScreener and Birdeye APIs.
 */

import { generateMockHolders, generateMockTrades } from './mocks';

const DEXSCREENER_BASE = 'https://api.dexscreener.com/latest/dex';
const BIRDEYE_BASE = 'https://public-api.birdeye.so';
const DEFAULT_FETCH_TIMEOUT = 7000;

// Multi-Lane API Key Matrix for High-Performance Throttling
const BIRDEYE_KEYS = {
  CHARTS: 'a54d7f9323da465b873ac9ca95c70f2e',
  HOLDERS: '657dbca188444cab88b3b9253338aea3',
  TRADES: 'aa325b96921146d3835e5177ccccf4a2'
};

const getBirdeyeHeaders = (lane = 'CHARTS') => ({
  'x-api-key': BIRDEYE_KEYS[lane] || BIRDEYE_KEYS.CHARTS,
  'x-chain': 'solana',
  'accept': 'application/json'
});

async function fetchWithTimeout(url, options = {}, timeoutMs = DEFAULT_FETCH_TIMEOUT) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    window.clearTimeout(timeout);
  }
}

/**
 * Fetch market data for multiple tokens from DexScreener.
 * @param {string} mints - Comma-separated Solana mint addresses
 * @returns {Array} Array of token market data mapped from DexScreener pairs
 */
export async function fetchDexScreenerTokens(mints) {
  const mintArray = mints.split(',');
  const chunkSize = 3;
  const chunks = [];
  
  for (let i = 0; i < mintArray.length; i += chunkSize) {
    chunks.push(mintArray.slice(i, i + chunkSize).join(','));
  }

  const chunkResults = await Promise.allSettled(chunks.map(async (chunk) => {
    const url = `${DEXSCREENER_BASE}/tokens/${chunk}`;
    const response = await fetchWithTimeout(url, {}, 6500);
    if (!response.ok) {
      throw new Error(`DexScreener status ${response.status}`);
    }
    const data = await response.json();
    return data.pairs || [];
  }));

  const allPairs = chunkResults.flatMap(result => result.status === 'fulfilled' ? result.value : []);
  
  const tokenMap = new Map();
  
  allPairs.forEach(pair => {
    if (pair.chainId !== 'solana') return;
    
    const mint = pair.baseToken.address;
    
    const currentBest = tokenMap.get(mint);
    if (!currentBest || (pair.liquidity?.usd || 0) > (currentBest.liquidity?.usd || 0)) {
      tokenMap.set(mint, pair);
    }
  });

  return Array.from(tokenMap.values()).map(pair => ({
    id: pair.baseToken.address,
    symbol: pair.baseToken.symbol,
    name: pair.baseToken.name,
    image: pair.info?.imageUrl,
    current_price: parseFloat(pair.priceUsd) || 0,
    price_change_percentage_24h: pair.priceChange?.h24 || 0,
    price_change_percentage_6h: pair.priceChange?.h6 || 0,
    market_cap: pair.fdv || pair.marketCap || 0,
    total_volume: pair.volume?.h24 || 0,
    websites: pair.info?.websites || [],
    socials: pair.info?.socials || [],
    liquidity: pair.liquidity?.usd || 0
  }));
}

/**
 * Fetch price chart history from Birdeye.
 * @param {string} mint - Solana mint address
 * @param {string} timeType - '1D', '1W', '1M' etc
 */
export async function fetchBirdeyePriceChart(mint, timeType = '1D') {
  const now = Math.floor(Date.now() / 1000);
  
  let timeFrom = now - (24 * 60 * 60);
  let type = '15m';
  
  if (timeType === '7D' || timeType === '1W') {
    timeFrom = now - (7 * 24 * 60 * 60);
    type = '1H';
  } else if (timeType === '30D' || timeType === '1M') {
    timeFrom = now - (30 * 24 * 60 * 60);
    type = '4H';
  } else if (timeType === '90D' || timeType === '3M') {
    timeFrom = now - (90 * 24 * 60 * 60);
    type = '1D';
  }

  const url = `${BIRDEYE_BASE}/defi/history_price?address=${mint}&address_type=token&type=${type}&time_from=${timeFrom}&time_to=${now}`;

  try {
    const json = await fetchWithCache(url, { headers: getBirdeyeHeaders('CHARTS') }, `chart-${mint}-${type}`);
    if (!json.success || !json.data || !json.data.items) {
      return [];
    }
    return json.data.items.map(item => ({
      time: item.unixTime * 1000,
      date: new Date(item.unixTime * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      price: item.value,
    }));
  } catch (error) {
    if (error.message.includes('429')) {
      console.warn('Birdeye rate limit (429) on chart data');
      return [];
    }
    throw new Error(`Birdeye chart error: ${error.message}`, { cause: error });
  }
}

// Persistent Cache Logic
const PERSISTENT_CACHE_KEY = 'sunrise_terminal_cache_v1';
const CACHE_DURATION = 5 * 60 * 1000;

const loadPersistentCache = () => {
  try {
    const saved = localStorage.getItem(PERSISTENT_CACHE_KEY);
    return saved ? new Map(JSON.parse(saved)) : new Map();
  } catch {
    return new Map();
  }
};

const savePersistentCache = (m) => {
  try {
    const entries = Array.from(m.entries()).filter((entry) => Date.now() - entry[1].timestamp < CACHE_DURATION * 6);
    localStorage.setItem(PERSISTENT_CACHE_KEY, JSON.stringify(entries));
    return true;
  } catch {
    return false;
  }
};

const cache = loadPersistentCache();
let lastRequestTimes = { CHARTS: 0, HOLDERS: 0, TRADES: 0 };
const MIN_REQUEST_INTERVAL = 1100;

async function fetchWithCache(url, options, cacheKey) {
  const apiKey = options.headers['x-api-key'];
  const lane = Object.keys(BIRDEYE_KEYS).find(key => BIRDEYE_KEYS[key] === apiKey) || 'CHARTS';

  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTimes[lane];
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    await new Promise(resolve => setTimeout(resolve, MIN_REQUEST_INTERVAL - timeSinceLastRequest));
  }
  
  lastRequestTimes[lane] = Date.now();
  
  try {
    const response = await fetchWithTimeout(url, options);
    if (!response.ok) {
      if (response.status === 429) {
        if (cached) return cached.data;
        throw new Error(`Rate Limit (429)`);
      }
      throw new Error(`Status ${response.status}`);
    }
    const data = await response.json();
    cache.set(cacheKey, { data, timestamp: Date.now() });
    savePersistentCache(cache);
    return data;
  } catch (error) {
    if (cached) return cached.data;
    throw error;
  }
}

/**
 * Fetch Top Holders from Birdeye
 */
export async function fetchBirdeyeHolders(mint) {
  const url = `${BIRDEYE_BASE}/defi/v3/token/holder?address=${mint}&limit=10`;
  try {
    const json = await fetchWithCache(url, { headers: getBirdeyeHeaders('HOLDERS') }, `holders-${mint}`);
    return json.data?.items || generateMockHolders(mint);
  } catch (error) {
    console.warn('Birdeye holders failed, using fallback:', error.message);
    return generateMockHolders(mint);
  }
}

/**
 * Fetch Recent Trades from Birdeye
 */
export async function fetchBirdeyeTrades(mint) {
  const url = `${BIRDEYE_BASE}/defi/txs/token?address=${mint}&limit=15`;
  try {
    const json = await fetchWithCache(url, { headers: getBirdeyeHeaders('TRADES') }, `trades-${mint}`);
    return json.data?.items || generateMockTrades(mint);
  } catch (error) {
    console.warn('Birdeye trades failed, using fallback:', error.message);
    return generateMockTrades(mint);
  }
}

// Re-export core logic for convenience if needed, but components should ideally import from specialized modules.
export * from './intelligence';
export * from './mocks';
export * from '../utils/format';
