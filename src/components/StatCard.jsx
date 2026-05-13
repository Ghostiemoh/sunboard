import { motion, useReducedMotion } from 'framer-motion';

/**
 * Metric display card for token details.
 * Redesigned as a Sophisticated Bento tile.
 */
export default function StatCard({ label, value, subValue, icon: Icon, accent = false, index = 0 }) {
  const shouldReduceMotion = useReducedMotion();

  const cardAnimation = shouldReduceMotion
    ? {}
    : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

  return (
    <motion.div
      {...cardAnimation}
      transition={shouldReduceMotion ? {} : { delay: Math.min(index * 0.1, 0.4), duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className={`bento-panel p-6 sm:p-8 flex flex-col justify-between min-h-[160px] relative group overflow-hidden ${
        accent ? 'bg-accent/5 border-accent/20' : 'bg-card border-slate-200'
      }`}
    >
      {/* Decorative Glow */}
      <div className={`absolute -right-8 -top-8 w-24 h-24 rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-1000 ${accent ? 'bg-accent' : 'bg-slate-400'}`} />

      <div className="flex items-center justify-between mb-4 relative z-10">
        <span className={`text-[11px] font-black uppercase tracking-[0.2em] ${accent ? 'text-accent' : 'text-text-secondary'}`}>
          {label}
        </span>
        {Icon && (
          <div className={`p-2.5 rounded-xl border transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 ${
            accent 
              ? 'bg-accent/10 border-accent/20 text-accent shadow-[0_0_20px_rgba(255,90,0,0.2)]' 
              : 'bg-white/5 border-slate-200 text-text-muted group-hover:text-white'
          }`}>
             <Icon size={18} strokeWidth={2.5} />
          </div>
        )}
      </div>

      <div className="space-y-1 relative z-10">
        <div className="text-3xl sm:text-4xl font-black tracking-tighter text-text">
          {value || <div className="shimmer h-10 w-24 rounded-lg" />}
        </div>
        {subValue && (
          <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${accent ? 'bg-accent' : 'bg-positive'} animate-pulse`} />
            <span className="text-xs font-black text-text-muted uppercase tracking-widest leading-none">
              {subValue}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
