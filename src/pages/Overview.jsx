import { motion, useReducedMotion } from 'framer-motion';
import { Sunrise, TrendingUp, Zap, RefreshCw, Globe, ShieldCheck, Activity, AlertTriangle } from 'lucide-react';
import TokenTable from '../components/TokenTable';
import { useMarketData } from '../hooks/useMarketData';

export default function Overview() {
  const { data, loading, error, lastUpdated, refetch } = useMarketData();
  const shouldReduceMotion = useReducedMotion();

  const totalMarketCap = data.reduce((sum, t) => sum + (t.market_cap || 0), 0);
  const totalVolume = data.reduce((sum, t) => sum + (t.total_volume || 0), 0);
  const avgChange24h = data.length > 0
    ? data.reduce((sum, t) => sum + (t.price_change_percentage_24h || 0), 0) / data.length
    : 0;
  const liveCount = data.filter(t => t.dataSource === 'live').length;

  const fadeUp = shouldReduceMotion ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Hero Section */}
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
      >
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full">
            <Sunrise size={16} className="text-accent animate-float" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent pt-0.5">Sunrise Command Center</span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[0.9] text-text">
            Track Sunrise tokens <br/> before the <span className="text-accent">move.</span>
          </h1>
          
          <p className="text-lg text-text-secondary max-w-lg font-medium leading-relaxed">
            Real-time market, liquidity, holder, and transfer intelligence for Sunrise-listed assets on Solana.
          </p>
          
          <div className="flex items-center gap-4 pt-4">
            <button
              type="button"
              onClick={refetch}
              disabled={loading}
              className="btn-primary group flex items-center gap-2"
              aria-busy={loading}
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-700'} />
              <span>{loading ? 'Syncing' : 'Refresh data'}</span>
            </button>
            
            <div className="flex flex-col">
               <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Data status</span>
               <span className="text-xs font-bold text-text font-mono">
                 {lastUpdated ? lastUpdated.toLocaleTimeString() : 'Awaiting Data...'}
               </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-4">
          <div className="bento-panel col-span-2 p-8 flex flex-col justify-between min-h-[200px] bg-surface group">
            <div className="flex justify-between items-start">
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-text-secondary">Total Network Value</span>
              <div className="p-3 bg-white/5 rounded-2xl text-accent transition-transform group-hover:rotate-12 duration-500">
                <Globe size={24} />
              </div>
            </div>
            <div className="text-5xl sm:text-7xl font-black tracking-tighter text-text">
              {loading ? <div className="shimmer h-12 w-48 rounded-lg" /> : `$${(totalMarketCap / 1e9).toFixed(2)}B`}
            </div>
            <div className="mt-3 text-[10px] font-black uppercase tracking-widest text-text-muted">
              {liveCount ? `${liveCount}/${data.length} markets live` : 'Cached preview ready'}
            </div>
          </div>

          <div className="bento-panel p-6 flex flex-col justify-between min-h-[160px] bg-surface group">
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-positive" />
              <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">24H Flow</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black tracking-tighter text-text">
              {loading ? <div className="shimmer h-8 w-24 rounded-md" /> : `$${(totalVolume / 1e6).toFixed(1)}M`}
            </div>
          </div>

          <div className="bento-panel p-6 flex flex-col justify-between min-h-[160px] bg-surface group">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className={avgChange24h >= 0 ? 'text-positive' : 'text-negative'} />
              <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Avg Volatility</span>
            </div>
            <div className={`text-2xl sm:text-3xl font-black tracking-tighter ${avgChange24h >= 0 ? 'text-positive' : 'text-negative'}`}>
              {loading ? <div className="shimmer h-8 w-20 rounded-md" /> : `${avgChange24h >= 0 ? '+' : ''}${avgChange24h.toFixed(2)}%`}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        {...fadeUp}
        transition={{ delay: 0.12, duration: 0.45 }}
        className="grid grid-cols-1 gap-4 md:grid-cols-3"
      >
        {[
          {
            icon: ShieldCheck,
            title: 'Ignite',
            label: '80+ score',
            copy: 'Momentum, liquidity, and flow align. Start deeper research here.',
            tone: 'text-emerald-600 bg-emerald-50 border-emerald-100',
          },
          {
            icon: Activity,
            title: 'Monitor',
            label: '60-79 score',
            copy: 'Pattern is forming, but confirmation is not complete yet.',
            tone: 'text-orange-600 bg-orange-50 border-orange-100',
          },
          {
            icon: AlertTriangle,
            title: 'Cooldown',
            label: 'Below 60',
            copy: 'Flow is mixed or weak. Wait for stronger on-chain evidence.',
            tone: 'text-slate-600 bg-slate-50 border-slate-200',
          },
        ].map((item) => (
          <div key={item.title} className={`rounded-2xl border p-5 ${item.tone}`}>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <item.icon size={18} aria-hidden="true" />
                <h3 className="text-sm font-black uppercase tracking-widest">{item.title}</h3>
              </div>
              <span className="rounded-full bg-white/75 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider">{item.label}</span>
            </div>
            <p className="text-sm font-semibold leading-relaxed text-text-secondary">{item.copy}</p>
          </div>
        ))}
      </motion.div>

      {/* Main Table Section */}
      <motion.div
        {...fadeUp}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 sunrise-gradient rounded-full" />
            <h2 className="text-2xl font-black tracking-tight text-text uppercase">Asset Matrix</h2>
          </div>
          <div className="hidden sm:flex items-center gap-6">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-positive" />
                <span className="text-[10px] font-bold text-text-muted uppercase">On-Chain Verified</span>
             </div>
          </div>
        </div>
        
        <TokenTable data={data} loading={loading} />
      </motion.div>

      {/* Error State */}
      {error && (
        <div className="bento-panel p-4 bg-negative/5 border-negative/20 flex items-center justify-between">
          <div className="flex items-center gap-3 text-negative">
             <div className="w-2 h-2 rounded-full bg-negative animate-pulse" />
             <span className="text-sm font-bold">Protocol Sync Warning: {error}</span>
          </div>
          <button onClick={refetch} className="text-xs font-black uppercase tracking-widest hover:text-text transition-colors">Force Sync</button>
        </div>
      )}
    </div>
  );
}
