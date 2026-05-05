import { useState, useEffect, useCallback } from 'react';
import {
  fetchDexScreenerTokens,
  fetchBirdeyePriceChart,
  calculateSunriseScore,
  getSunriseInsights,
  buildFallbackToken,
  generateFallbackChart,
} from '../services/api';
import { SUNRISE_TOKENS } from '../config/tokens';

/**
 * Hook to fetch detailed data for a single token using DexScreener & Birdeye.
 * Includes price chart data for the selected time range.
 */
export function useTokenDetail(mintAddress) {
  const [detail, setDetail] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [timeRange, setTimeRange] = useState('1D'); // Default range
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDetail = useCallback(async () => {
    if (!mintAddress) return;
    try {
      setLoading(true);
      setError(null);
      
      const [dexDataArray, chartResult] = await Promise.all([
        fetchDexScreenerTokens(mintAddress),
        fetchBirdeyePriceChart(mintAddress, timeRange).catch(err => {
          console.warn('Failed to fetch chart data:', err);
          return [];
        }),
      ]);
      
      const configIndex = SUNRISE_TOKENS.findIndex(t => t.solanaMint === mintAddress);
      const config = SUNRISE_TOKENS[configIndex];
      const apiData = dexDataArray[0];
      let chartBasePrice = 0.04;

      if (apiData || config) {
        const fallback = config ? buildFallbackToken(config, Math.max(configIndex, 0)) : null;
        const chartFirstPrice = chartResult[0]?.price;
        const chartLastPrice = chartResult[chartResult.length - 1]?.price;
        const chartChange = chartFirstPrice && chartLastPrice
          ? ((chartLastPrice - chartFirstPrice) / chartFirstPrice) * 100
          : null;
        const marketData = apiData || (chartLastPrice ? {
          ...fallback,
          current_price: chartLastPrice,
          price_change_percentage_24h: chartChange ?? fallback.price_change_percentage_24h,
          dataSource: 'live',
        } : fallback);
        const price = marketData.current_price;
        chartBasePrice = price;
        const volume = marketData.total_volume;
        const fdv = marketData.market_cap;
        
        const merged = {
          id: mintAddress,
          symbol: config?.symbol || marketData.symbol || '',
          name: config?.name || marketData.name || 'Unknown Token',
          image: config?.image || marketData.image,
          description: { en: `Live Solana data for ${config?.name || marketData.name}.` },
          current_price: price,
          market_cap: fdv,
          total_volume: volume,
          liquidity: marketData.liquidity || 0,
          price_change_percentage_24h: marketData.price_change_percentage_24h || 0,
          price_change_percentage_6h: marketData.price_change_percentage_6h || 0,
          dataSource: apiData ? 'live' : 'fallback',
          market_data: {
            current_price: { usd: price },
            market_cap: { usd: fdv },
            total_volume: { usd: volume },
            fully_diluted_valuation: { usd: fdv },
            circulating_supply: null,
            total_supply: null,
            ath: null,
            ath_change_percentage: null,
            price_change_percentage_24h: marketData.price_change_percentage_24h || 0,
          },
          links: { homepage: apiData?.websites?.map(w => w.url) || [] }
        };

        const score = calculateSunriseScore(merged);
        const insights = getSunriseInsights(merged, score);

        setDetail({
          ...merged,
          score,
          insights
        });
      } else {
        throw new Error('Token not found on DexScreener');
      }

      setChartData(chartResult.length ? chartResult : generateFallbackChart(chartBasePrice, mintAddress, timeRange));
      
    } catch (fetchError) {
      setError(fetchError.message);
    } finally {
      setLoading(false);
    }
  }, [mintAddress, timeRange]);

  useEffect(() => {
    const initialLoad = window.setTimeout(() => {
      fetchDetail();
    }, 0);
    return () => window.clearTimeout(initialLoad);
  }, [fetchDetail]);

  return { detail, chartData, timeRange, setTimeRange, loading, error, refetch: fetchDetail };
}
