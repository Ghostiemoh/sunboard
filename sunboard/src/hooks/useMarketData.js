import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchDexScreenerTokens, calculateSunriseScore, buildFallbackToken } from '../services/api';
import { SUNRISE_TOKENS, SOLANA_MINTS } from '../config/tokens';

/**
 * Hook to fetch and manage real-time market data for all Sunrise tokens.
 * Fetches from DexScreener bulk endpoint.
 * Auto-refreshes every 60 seconds.
 */
export function useMarketData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const isFirstLoad = useRef(true);

  const fetchData = useCallback(async () => {
    try {
      if (isFirstLoad.current) {
        setLoading(true);
      }
      setError(null);
      
      const apiTokens = await fetchDexScreenerTokens(SOLANA_MINTS);
      
      // Merge with our SUNRISE_TOKENS config to ensure correct order and names
      const completeData = SUNRISE_TOKENS.map((config, index) => {
        const apiData = apiTokens.find(t => t.id === config.solanaMint);
        
        const merged = apiData ? {
          ...apiData,
          name: config.name,
          symbol: config.symbol,
          image: config.image || apiData.image || `https://api.dicebear.com/7.x/initials/svg?seed=${config.symbol}&backgroundColor=ff5a00,0f172a&textColor=ffffff`,
          dataSource: 'live',
        } : buildFallbackToken(config, index);

        // Calculate the proprietary Sunrise Score
        return {
          ...merged,
          score: calculateSunriseScore(merged)
        };
      });

      setData(completeData);
      setLastUpdated(new Date());
      isFirstLoad.current = false;
    } catch (fetchError) {
      setError(fetchError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const initialLoad = window.setTimeout(() => {
      fetchData();
    }, 0);
    const interval = setInterval(fetchData, 60000);
    return () => {
      window.clearTimeout(initialLoad);
      clearInterval(interval);
    };
  }, [fetchData]);

  return { data, loading, error, lastUpdated, refetch: fetchData };
}
