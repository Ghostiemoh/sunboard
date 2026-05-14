/**
 * Sunrise Intelligence Service
 * Proprietary Sunrise Intelligence Algorithm for momentum scoring and market insights.
 */

/**
 * Calculates a Momentum Score (0-100) based on multiple on-chain factors.
 */
export function calculateSunriseScore(token) {
  if (!token) return 0;
  
  // 1. Price Velocity (40%) - 24h change vs 6h change
  const priceMomentum = Math.min(Math.max((token.price_change_percentage_24h * 0.4) + (token.price_change_percentage_6h * 0.6), -20), 20);
  const priceScore = ((priceMomentum + 20) / 40) * 100;
  
  // 2. Liquidity Efficiency (30%) - Volume to Liquidity ratio
  const volToLiqRatio = token.liquidity > 0 ? (token.total_volume / token.liquidity) : 0;
  const liqScore = Math.min(volToLiqRatio * 100, 100);
  
  // 3. Market Depth (30%) - Market Cap vs Volume
  const mcapToVolRatio = token.market_cap > 0 ? (token.total_volume / token.market_cap) : 0;
  const depthScore = Math.min(mcapToVolRatio * 200, 100);
  
  const finalScore = (priceScore * 0.4) + (liqScore * 0.3) + (depthScore * 0.3);
  return Math.round(Math.min(Math.max(finalScore, 0), 100));
}

/**
 * Generate dynamic insights based on token metrics
 */
export function getSunriseInsights(token, score) {
  const insights = [];
  
  if (score > 75) insights.push({ type: 'bullish', text: 'Parabolic Momentum Detected' });
  else if (score > 60) insights.push({ type: 'neutral', text: 'Healthy Accumulation' });
  else if (score < 30) insights.push({ type: 'bearish', text: 'Exhaustion Phase' });

  if (token.total_volume > token.liquidity * 2) {
    insights.push({ type: 'warning', text: 'Volatility Alert: Volume exceeds Liquidity' });
  }
  
  if (token.price_change_percentage_24h > 15 && token.price_change_percentage_6h < 0) {
    insights.push({ type: 'warning', text: 'Potential Rejection at Resistance' });
  }

  if (insights.length === 0) insights.push({ type: 'neutral', text: 'Steady Market Activity' });
  
  return insights;
}
