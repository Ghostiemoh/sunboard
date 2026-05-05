import { useParams, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ExternalLink, Copy, Check,
  TrendingUp, Globe, Activity, Zap, ChevronLeft, LayoutGrid, Info, ShoppingBag
} from 'lucide-react';
import { useState, useMemo } from 'react';
import PriceChart from '../components/PriceChart';
import StatCard from '../components/StatCard';
import ChangeIndicator from '../components/ChangeIndicator';
import HoldersTable from '../components/HoldersTable';
import TransferFeed from '../components/TransferFeed';
import { useTokenDetail } from '../hooks/useTokenDetail';
import { formatCurrency, formatPercentage } from '../services/api';
import { SUNRISE_TOKENS } from '../config/tokens';

export default function TokenDetail() {
  const { tokenId } = useParams();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const { detail: token, chartData, timeRange, setTimeRange, loading, error } = useTokenDetail(tokenId);
  const [copied, setCopied] = useState(false);

  const config = useMemo(() => SUNRISE_TOKENS.find(t => t.solanaMint === tokenId), [tokenId]);
  const fadeUp = shouldReduceMotion ? {} : { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } };

  const handleCopyAddress = (address) => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 space-y-12">
        <div className="flex gap-6 items-center">
          <div className="shimmer w-20 h-20 rounded-3xl" />
          <div className="space-y-3">
             <div className="shimmer h-10 w-64 rounded-lg" />
             <div className="shimmer h-6 w-32 rounded-md" />
          </div>
        </div>
        <div className="shimmer h-[500px] rounded-[3rem]" />
        <div className="grid grid-cols-4 gap-6">
           <div className="shimmer h-32 rounded-3xl" />
           <div className="shimmer h-32 rounded-3xl" />
           <div className="shimmer h-32 rounded-3xl" />
           <div className="shimmer h-32 rounded-3xl" />
        </div>
      </div>
    );
  }

  if (error || !token) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 text-center flex flex-col items-center">
        <div className="bento-panel p-12 bg-negative/5 border-negative/20 inline-block space-y-6">
          <Info size={48} className="text-negative mx-auto" />
          <h2 className="text-2xl font-black text-text">Sync Failure</h2>
          <p className="text-text-secondary font-medium">Protocol Error: {error || 'Asset not found'}</p>
          <button onClick={() => navigate('/')} className="btn-secondary flex items-center gap-2 mx-auto">
             <ChevronLeft size={18} />
             Return to Matrix
          </button>
        </div>
      </div>
    );
  }

  const mintAddress = token.id;
  const tradeUrl = `https://sunrisedefi.com/?token=${mintAddress}`;
  const isFallback = token.dataSource === 'fallback';

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
      {/* Navigation & Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div className="flex w-full min-w-0 flex-col gap-5 sm:flex-row sm:items-start sm:gap-6 md:w-auto">
          {token.image ? (
            <img 
              src={token.image} 
              alt={`${token.name} logo`}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-[2rem] bg-card p-1 shadow-2xl border border-slate-200" 
            />
          ) : (
            <div 
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-[2rem] flex items-center justify-center text-3xl font-black text-text shadow-2xl sunrise-glow border border-slate-200" 
              style={{ background: config?.color || 'var(--color-accent)' }}
            >
              {token.symbol?.substring(0, 2).toUpperCase()}
            </div>
          )}
          
          <div className="min-w-0 space-y-2">
            <motion.div {...fadeUp} className="flex flex-wrap items-center gap-3">
               <button
                 type="button"
                 onClick={() => navigate('/')}
                 aria-label="Back to markets"
                 className="min-h-10 min-w-10 p-2 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors text-text-muted hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
               >
                  <ChevronLeft size={18} />
               </button>
               <span className="text-xs font-bold text-accent uppercase tracking-[0.3em]">Protocol Verified Asset</span>
               <span className={`rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-widest ${isFallback ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                 {isFallback ? 'Cached preview' : 'Live market'}
               </span>
            </motion.div>
            
            <h1 className="max-w-full break-words text-4xl font-black leading-none tracking-tighter text-text sm:text-7xl">
              {token.name}
            </h1>
            
            <div className="flex flex-wrap items-center gap-3 font-mono">
              <span className="text-sm font-black text-accent bg-accent/10 px-3 py-1 rounded-lg uppercase">{token.symbol}</span>
              <div className="h-4 w-[1px] bg-slate-200" />
              <span className="text-lg font-bold text-text">{formatCurrency(token.current_price)}</span>
              <ChangeIndicator value={token.price_change_percentage_24h} size="lg" />
            </div>
          </div>
        </div>

        <div className="flex w-full flex-wrap gap-3 md:w-auto md:justify-end">
          <button
            type="button"
            onClick={() => handleCopyAddress(mintAddress)}
            className="btn-secondary group flex-1 px-6 sm:flex-none"
            aria-label={`Copy ${token.symbol} mint address`}
          >
             <div className="flex items-center gap-3">
                <span className="text-sm font-mono tracking-tighter">{copied ? 'COPIED!' : `${mintAddress.slice(0, 4)}...${mintAddress.slice(-4)}`}</span>
                {copied ? <Check size={16} className="text-positive" /> : <Copy size={16} className="group-hover:text-accent transition-colors" />}
             </div>
          </button>
          <a href={tradeUrl} target="_blank" rel="noopener noreferrer" className="btn-primary flex-1 gap-2 sm:flex-none">
            <ShoppingBag size={17} aria-hidden="true" />
            Get {token.symbol}
          </a>
        </div>
      </div>

      <motion.section
        {...fadeUp}
        className="relative overflow-hidden rounded-2xl border border-orange-300 bg-[#fff3ea] p-6 sm:p-8 shadow-[0_24px_80px_rgba(255,90,0,0.16)]"
      >
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,rgba(255,90,0,0.25),transparent_55%)]" aria-hidden="true" />
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-300 bg-white/70 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-accent">
              <Zap size={13} aria-hidden="true" />
              Sunrise action lane
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-text">
              Get {token.symbol} where the liquidity is already moving.
            </h2>
            <p className="text-sm sm:text-base font-semibold leading-relaxed text-text-secondary">
              Jump from analytics to execution with the mint preloaded, then verify the pool on DexScreener before signing.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={tradeUrl} target="_blank" rel="noopener noreferrer" className="btn-primary gap-2 bg-orange-600 hover:bg-orange-700">
              <ShoppingBag size={17} aria-hidden="true" />
              Buy {token.symbol}
            </a>
            <a href={`https://dexscreener.com/solana/${mintAddress}`} target="_blank" rel="noopener noreferrer" className="btn-secondary gap-2">
              Check pool
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </motion.section>

      {/* Stats Bento Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Current Valuation" value={formatCurrency(token.current_price)} subValue={token.price_change_percentage_24h ? `${formatPercentage(token.price_change_percentage_24h)} (24h)` : null} icon={TrendingUp} accent index={0} />
        <StatCard label="Market Cap" value={formatCurrency(token.market_cap, true)} icon={Globe} index={1} />
        <StatCard label="24h Volume" value={formatCurrency(token.total_volume, true)} icon={Activity} index={2} />
        <StatCard label="Solana Liquidity" value={formatCurrency(token.liquidity, true)} icon={Zap} index={3} />
      </div>

      {/* Main Analytics Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Chart (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          <motion.div {...fadeUp} className="bento-panel p-8 sm:p-10 bg-surface min-h-[550px] relative overflow-hidden group">
             {/* Dynamic background effect */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[100px] pointer-events-none group-hover:bg-accent/10 transition-all duration-1000" />
             
             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-6 relative z-10">
                <div>
                   <h3 className="text-2xl font-black text-text tracking-tight">On-Chain Performance</h3>
                   <div className="flex items-center gap-2 mt-1">
                      <img src="https://birdeye.so/favicon.ico" className="w-3 h-3 grayscale opacity-60" alt="" />
                      <p className="text-[11px] font-extrabold text-text-secondary uppercase tracking-[0.2em]">Birdeye Verified Matrix • Solana</p>
                   </div>
                </div>
                <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl border border-slate-100">
                  {['1H', '1D', '1W', '1M'].map((range) => (
                    <button 
                      key={range} 
                      onClick={() => setTimeRange(range)} 
                      className={`px-5 py-2 rounded-xl text-[11px] font-black transition-all duration-300 ${timeRange === range ? 'bg-accent text-white shadow-lg scale-105' : 'text-text-muted hover:text-accent hover:bg-accent/5'}`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
             </div>
             
             <PriceChart data={chartData} tokenColor={config?.color || 'var(--color-accent)'} />
          </motion.div>

          <TransferFeed mintAddress={mintAddress} tokenSymbol={token.symbol} />
        </div>

        {/* Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-8">
          {/* Sunrise Intelligence Panel */}
          <motion.div {...fadeUp} className="bento-panel p-8 bg-surface border-slate-200 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-3xl pointer-events-none" />
            
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Zap size={18} className="text-accent" />
                </div>
                <h3 className="text-sm font-black text-text uppercase tracking-widest">Sunrise Intelligence</h3>
              </div>
              <div className={`px-3 py-1 rounded-lg text-[10px] font-black tracking-widest ${token.score >= 60 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-orange-500/10 text-orange-500'}`}>
                {token.score} PTS
              </div>
            </div>

            <div className="space-y-6">
              {/* Score Meter */}
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-black text-text-muted uppercase tracking-wider">
                  <span>Momentum Score</span>
                  <span>{token.score}/100</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${token.score}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full ${token.score >= 80 ? 'bg-emerald-500' : token.score >= 60 ? 'bg-orange-500' : 'bg-yellow-400'}`}
                  />
                </div>
              </div>

              {/* Insights List */}
              <div className="space-y-3">
                <div className="text-[10px] font-black text-text-muted uppercase tracking-wider">Market Insights</div>
                <div className="space-y-2">
                  {token.insights?.map((insight, i) => (
                    <div key={i} className="flex gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                        insight.type === 'bullish' ? 'bg-emerald-500' : 
                        insight.type === 'warning' ? 'bg-amber-500' : 
                        insight.type === 'bearish' ? 'bg-rose-500' : 'bg-slate-400'
                      }`} />
                      <span className="text-xs font-bold text-text-secondary leading-tight">{insight.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 border-t border-slate-100">
                <p className="text-[9px] font-black text-text-muted uppercase tracking-widest leading-relaxed">
                  Proprietary algorithmic scoring based on price velocity, liquidity depth, and on-chain flow.
                </p>
              </div>
            </div>
          </motion.div>

          <HoldersTable mintAddress={mintAddress} />
          
          <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="bento-panel p-8 bg-surface space-y-8">
            <div className="flex items-center gap-3">
               <LayoutGrid size={20} className="text-accent" />
               <h3 className="text-sm font-black text-text uppercase tracking-widest">Protocol Resources</h3>
            </div>
            
            <div className="space-y-4">
              <a href={`https://dexscreener.com/solana/${mintAddress}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-5 rounded-2xl bg-slate-100 border border-slate-100 hover:border-accent/30 hover:bg-accent/5 transition-all group">
                <div className="flex flex-col">
                  <span className="text-xs font-black text-text uppercase tracking-tight">DexScreener</span>
                  <span className="text-[10px] font-bold text-text-muted">Live DEX Chart</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-accent group-hover:text-text transition-all">
                  <ExternalLink size={16} />
                </div>
              </a>
              
              <a href={`https://solscan.io/token/${mintAddress}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-5 rounded-2xl bg-slate-100 border border-slate-100 hover:border-accent/30 hover:bg-accent/5 transition-all group">
                <div className="flex flex-col">
                  <span className="text-xs font-black text-text uppercase tracking-tight">Solscan Explorer</span>
                  <span className="text-[10px] font-bold text-text-muted">Transaction Matrix</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-accent group-hover:text-text transition-all">
                  <ExternalLink size={16} />
                </div>
              </a>
            </div>
            
            <div className="p-4 rounded-2xl bg-accent/5 border border-accent/10">
               <p className="text-[10px] font-bold text-accent leading-relaxed text-center uppercase tracking-widest">
                 Sunrise Terminal Protocol v3.0 • Verified On-Chain Analytics
               </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
