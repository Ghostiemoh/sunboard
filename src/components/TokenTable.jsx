import { useState, useMemo, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronUp, ChevronDown, Search, X, ArrowUpRight } from 'lucide-react';
import ChangeIndicator from './ChangeIndicator';
import { formatCurrency } from '../services/api';

const COLUMNS = [
  { key: 'rank', label: '#', align: 'center', sortable: true },
  { key: 'name', label: 'Matrix Asset', align: 'left', sortable: true },
  { key: 'score', label: 'Sunrise Score', align: 'center', sortable: true },
  { key: 'current_price', label: 'Price', align: 'right', sortable: true },
  { key: 'price_change_percentage_24h', label: '24H Matrix', align: 'right', sortable: true },
  { key: 'market_cap', label: 'Net Value', align: 'right', sortable: true },
  { key: 'total_volume', label: '24H Flow', align: 'right', sortable: true, hideOnMobile: true },
  { key: 'action', label: 'Open', align: 'right', sortable: false },
];

// Helper to get score color
const getScoreColor = (score) => {
  if (score >= 80) return 'bg-emerald-500 text-white';
  if (score >= 60) return 'bg-orange-500 text-white';
  if (score >= 40) return 'bg-yellow-400 text-slate-900';
  return 'bg-slate-400 text-white';
};

export default function TokenTable({ data, loading }) {
  const shouldReduceMotion = useReducedMotion();
  const [sortKey, setSortKey] = useState('market_cap');
  const [sortDir, setSortDir] = useState('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  const handleSort = useCallback((key) => {
    if (!key) return;
    setSortKey(prevKey => {
      if (prevKey === key) {
        setSortDir(prev => prev === 'asc' ? 'desc' : 'asc');
        return prevKey;
      }
      setSortDir('desc');
      return key;
    });
  }, []);

  const filteredAndSorted = useMemo(() => {
    let filtered = data;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = data.filter(t => t.name.toLowerCase().includes(query) || t.symbol.toLowerCase().includes(query));
    }
    return [...filtered].sort((a, b) => {
      const aVal = a[sortKey] ?? 0;
      const bVal = b[sortKey] ?? 0;
      return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
    });
  }, [data, sortKey, sortDir, searchQuery]);

  const rowAnimation = shouldReduceMotion ? {} : { initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 } };

  if (loading) {
    return (
      <div className="bento-panel bg-surface p-8 space-y-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="shimmer h-20 rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="bento-panel overflow-hidden bg-surface border-slate-200">
      {/* Header / Search */}
      <div className="p-6 sm:p-8 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="relative w-full sm:w-96 group">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent transition-colors" />
          <input
            ref={searchInputRef}
            type="search"
            aria-label="Search Sunrise tokens"
            placeholder="Search Protocol Matrix..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100 border border-slate-200 rounded-2xl pl-12 pr-10 py-4 text-sm font-bold text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 flex min-h-10 min-w-10 -translate-y-1/2 items-center justify-center rounded-lg text-text-muted transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <X size={16} />
            </button>
          )}
        </div>
        
        <div className="flex items-center gap-4">
           <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em]">Total Listed: {data.length}</span>
        </div>
      </div>

      {filteredAndSorted.length === 0 ? (
        <div className="px-6 py-16 text-center">
          <div className="mx-auto max-w-sm space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <Search size={20} aria-hidden="true" />
            </div>
            <h3 className="text-base font-black text-text">No Sunrise asset found</h3>
            <p className="text-sm font-semibold leading-relaxed text-text-secondary">
              Try another token name or symbol, then open a market to inspect its score, holders, and transfers.
            </p>
            <button type="button" onClick={() => setSearchQuery('')} className="btn-secondary">
              Clear search
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3 p-4 md:hidden">
          {filteredAndSorted.map((token, index) => (
            <Link
              key={token.id}
              to={`/token/${token.id}`}
              className="flex min-h-24 items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-accent/40 hover:bg-accent/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="w-5 shrink-0 text-sm font-black text-text-secondary">{index + 1}</span>
                {token.image ? (
                  <img src={token.image} alt={`${token.name} logo`} className="h-12 w-12 shrink-0 rounded-xl border border-slate-200 bg-card shadow-md" />
                ) : (
                  <div className="h-12 w-12 shrink-0 rounded-xl sunrise-gradient flex items-center justify-center text-xs font-black text-white shadow-md">
                    {token.symbol.substring(0, 2).toUpperCase()}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="truncate text-base font-black text-text">{token.name}</div>
                  <div className="mt-1 text-[11px] font-extrabold uppercase tracking-[0.15em] text-text-secondary">{token.symbol}</div>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <div className={`mb-2 inline-flex rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${getScoreColor(token.score)}`}>
                  {token.score} PTS
                </div>
                <div className="font-mono text-sm font-black text-text">{formatCurrency(token.current_price)}</div>
                <ChangeIndicator value={token.price_change_percentage_24h} size="sm" />
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Table */}
      {filteredAndSorted.length > 0 && (
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[1000px] text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              {COLUMNS.map(col => (
                <th key={col.key} className={`px-6 py-6 ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'} ${col.hideOnMobile ? 'hidden lg:table-cell' : ''}`}>
                  {col.sortable ? (
                    <button
                      type="button"
                      onClick={() => handleSort(col.key)}
                      className="inline-flex min-h-10 items-center gap-2 rounded-lg px-2 text-[11px] font-black uppercase tracking-[0.2em] text-text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                    >
                      {col.label}
                      {sortKey === col.key && (
                        sortDir === 'asc' ? <ChevronUp size={14} className="text-accent" /> : <ChevronDown size={14} className="text-accent" />
                      )}
                    </button>
                  ) : <span className="text-[11px] font-black text-text-muted uppercase tracking-[0.2em]">{col.label}</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.03]">
            {filteredAndSorted.map((token, index) => {
              const mintAddress = token.id;
              return (
                <motion.tr
                  key={token.id}
                  {...rowAnimation}
                  transition={{ delay: index * 0.03, duration: 0.4 }}
                  className="group transition-colors duration-150 hover:bg-slate-50"
                >
                  <td className="px-6 py-8 text-center">
                    <span className="text-sm font-black text-text-secondary group-hover:text-accent transition-colors">{index + 1}</span>
                  </td>
                  
                  <td className="px-6 py-8">
                    <div className="flex items-center gap-4">
                      {token.image ? (
                        <img src={token.image} alt={`${token.name} logo`} className="w-12 h-12 rounded-xl bg-card border border-slate-200 shadow-xl group-hover:scale-105 transition-transform duration-150" />
                      ) : (
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xs font-black text-white shadow-xl sunrise-gradient">
                          {token.symbol.substring(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <Link
                          to={`/token/${mintAddress}`}
                          className="text-base font-black tracking-tight text-text transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                        >
                          {token.name}
                        </Link>
                        <div className="text-[11px] font-extrabold text-text-secondary uppercase tracking-[0.15em] mt-1 group-hover:text-accent transition-colors">{token.symbol}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-8">
                    <div className="flex justify-center">
                      <div className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase shadow-lg ${getScoreColor(token.score)}`}>
                        {token.score} <span className="opacity-60 ml-0.5">PTS</span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-8 text-right">
                    <span className="text-sm font-black text-text font-mono">{formatCurrency(token.current_price)}</span>
                  </td>

                  <td className="px-6 py-8 text-right">
                    <ChangeIndicator value={token.price_change_percentage_24h} size="md" />
                  </td>

                  <td className="px-6 py-8 text-right">
                    <span className="text-sm font-black text-text-secondary group-hover:text-text transition-colors">{formatCurrency(token.market_cap, true)}</span>
                  </td>

                  <td className="px-6 py-8 text-right hidden lg:table-cell">
                    <span className="text-sm font-black text-text-secondary group-hover:text-accent transition-colors">{formatCurrency(token.total_volume, true)}</span>
                  </td>

                  <td className="px-6 py-8 text-right">
                    <Link
                      to={`/token/${mintAddress}`}
                      className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-black uppercase tracking-widest text-text-secondary transition-colors hover:border-accent/40 hover:bg-accent/5 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                      aria-label={`Open ${token.name} detail`}
                    >
                      Open
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </Link>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
}
