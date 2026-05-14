/**
 * Deterministic Mock Generators for SunBoard
 * These ensure the UI looks premium even when API limits are hit.
 */

export function buildFallbackToken(config, index = 0) {
  const seed = config.solanaMint.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const marketCap = 18_000_000 + ((seed + index * 7919) % 420_000_000);
  const volume = 550_000 + ((seed * 17 + index * 1543) % 24_000_000);
  const liquidity = 220_000 + ((seed * 11 + index * 911) % 8_000_000);
  const price = Math.max(0.000001, marketCap / (800_000_000 + ((seed % 11) * 75_000_000)));
  const change24h = Number((((seed % 3600) / 100) - 18).toFixed(2));
  const change6h = Number((((seed % 1200) / 100) - 6).toFixed(2));

  return {
    id: config.solanaMint,
    symbol: config.symbol,
    name: config.name,
    image: config.image || `https://api.dicebear.com/7.x/initials/svg?seed=${config.symbol}&backgroundColor=ff5a00,0f172a&textColor=ffffff`,
    current_price: price,
    market_cap: marketCap,
    total_volume: volume,
    liquidity,
    price_change_percentage_24h: change24h,
    price_change_percentage_6h: change6h,
    dataSource: 'fallback',
  };
}

export function generateFallbackChart(basePrice, mint, timeRange = '1D') {
  const seed = mint.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const points = timeRange === '1H' ? 24 : timeRange === '1M' ? 30 : timeRange === '1W' ? 28 : 32;
  const now = Date.now();
  const stepMs = timeRange === '1H'
    ? 2.5 * 60 * 1000
    : timeRange === '1D'
      ? 45 * 60 * 1000
      : timeRange === '1W'
        ? 6 * 60 * 60 * 1000
        : 24 * 60 * 60 * 1000;

  return Array.from({ length: points }).map((_, index) => {
    const drift = Math.sin((index + seed) / 3) * 0.035;
    const pulse = Math.cos((index + seed) / 5) * 0.018;
    const price = Math.max(0.000001, basePrice * (1 + drift + pulse + index * 0.0015));
    const time = now - ((points - index - 1) * stepMs);

    return {
      time,
      date: new Date(time).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      price,
      fallback: true,
    };
  });
}

export function generateMockHolders(mint) {
  const seed = mint.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  const holders = [];
  let remaining = 100;
  const totalSupply = 1000000000;
  
  for (let i = 0; i < 10; i++) {
    const pct = i === 0 ? 5 + (seed % 5) : (remaining / (15 - i)) * (0.8 + (seed % 4) / 10);
    remaining -= pct;
    holders.push({
      owner: `${mint.slice(0, 4)}...${(seed + i).toString(16).slice(-4)}`,
      uiAmount: (totalSupply * pct) / 100,
      percentage: Number(pct.toFixed(2))
    });
  }
  return holders;
}

export function generateMockTrades(mint) {
  const seed = mint.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  const trades = [];
  const now = Math.floor(Date.now() / 1000);
  
  for (let i = 0; i < 15; i++) {
    const isBuy = (seed + i) % 2 === 0;
    const amountUSD = 1000 + ((seed * (i + 1)) % 25000);
    trades.push({
      side: isBuy ? 'buy' : 'sell',
      volumeUSD: amountUSD,
      blockTime: now - (i * 180 + (seed % 120)),
      owner: `Wallet...${(seed - i).toString(16).slice(-4)}`,
      tokens: [{ uiAmount: amountUSD / 2 }]
    });
  }
  return trades;
}
