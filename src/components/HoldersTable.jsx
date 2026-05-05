import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, ShieldCheck, RefreshCw } from 'lucide-react';
import { fetchBirdeyeHolders } from '../services/api';

export default function HoldersTable({ mintAddress }) {
  const [holders, setHolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadHolders() {
      if (!mintAddress) return;
      try {
        setLoading(true);
        setError(null);
        const data = await fetchBirdeyeHolders(mintAddress);
        const totalTop10 = data.slice(0, 10).reduce((sum, h) => sum + h.uiAmount, 0);
        
        const formattedHolders = data.slice(0, 10).map((h, index) => ({
          address: h.owner,
          amount: h.uiAmount,
          percentage: h.percentage || (totalTop10 > 0 ? (h.uiAmount / (totalTop10 * 2)) * 100 : 0),
          rank: index + 1
        }));
        if (!cancelled) {
          setHolders(formattedHolders);
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setError('Holder distribution is temporarily unavailable.');
          setHolders([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }
    loadHolders();

    return () => {
      cancelled = true;
    };
  }, [mintAddress]);

  return (
    <div className="bento-panel bg-surface overflow-hidden">
      <div className="p-8 border-b border-slate-200 bg-slate-50">
        <div className="flex items-center gap-3">
          <Users size={20} className="text-accent" />
          <h3 className="text-sm font-black text-text uppercase tracking-widest pt-0.5">Holder Distribution</h3>
        </div>
      </div>

      <div className="p-4 space-y-2 min-h-[350px]">
        {loading ? (
          <div className="space-y-3 p-2" aria-busy="true">
             {Array.from({ length: 6 }).map((_, index) => (
               <div key={index} className="shimmer h-16 rounded-2xl" />
             ))}
          </div>
        ) : error ? (
          <div className="flex h-[300px] flex-col items-center justify-center gap-4 px-6 text-center">
            <RefreshCw size={28} className="text-accent" aria-hidden="true" />
            <div className="space-y-1">
              <p className="text-sm font-black text-text">Holder scan paused</p>
              <p className="text-xs font-semibold leading-relaxed text-text-secondary">{error}</p>
            </div>
          </div>
        ) : holders.length === 0 ? (
          <div className="flex h-[300px] flex-col items-center justify-center gap-3 px-6 text-center">
             <Users size={28} className="text-accent" aria-hidden="true" />
             <p className="text-sm font-black text-text">No holder rows yet</p>
             <p className="text-xs font-semibold leading-relaxed text-text-secondary">The token is listed, but holder data has not returned from the indexer.</p>
          </div>
        ) : (
          holders.map((holder, index) => (
            <motion.div
              key={`${holder.address}-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200"
            >
              <div className="flex items-center justify-between mb-3">
                 <div className="flex items-center gap-3">
                    <span className="text-sm font-black text-text-secondary group-hover:text-accent transition-colors w-4">{holder.rank}</span>
                    <span className="text-sm font-black text-text font-mono tracking-tighter">{holder.address.slice(0, 6)}...{holder.address.slice(-6)}</span>
                    {index < 3 && <ShieldCheck size={14} className="text-accent" />}
                 </div>
                 <span className="text-xs font-black text-text">{holder.percentage.toFixed(2)}%</span>
              </div>
              
              <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${holder.percentage}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className="h-full sunrise-gradient" 
                />
              </div>
            </motion.div>
          ))
        )}
      </div>
      
      <div className="p-6 bg-slate-50 border-t border-slate-200">
         <p className="text-[9px] font-bold text-text-muted uppercase tracking-[0.2em] text-center">Protocol Synchronized • Top 10 Entities</p>
      </div>
    </div>
  );
}
