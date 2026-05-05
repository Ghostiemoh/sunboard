import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Sunrise, LayoutGrid } from 'lucide-react';

export default function Layout() {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  const pageTransition = shouldReduceMotion
    ? { initial: {}, animate: {}, exit: {} }
    : {
        initial: { opacity: 0, scale: 0.98, filter: 'blur(10px)' },
        animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
        exit: { opacity: 0, scale: 1.02, filter: 'blur(10px)' },
      };

  return (
    <div className="min-h-dvh flex flex-col bg-background text-text selection:bg-accent/30 selection:text-text">
      {/* Navigation */}
      <nav className="nav-glass h-20 flex items-center px-6 sm:px-12">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-3 group rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
            <div className="w-10 h-10 rounded-xl sunrise-gradient flex items-center justify-center shadow-lg sunrise-glow group-hover:scale-110 transition-transform duration-500">
              <Sunrise size={22} strokeWidth={2.5} className="text-text" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tighter leading-none">SUNRISE</span>
              <span className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] leading-none mt-0.5">Terminal</span>
            </div>
          </NavLink>

          <div className="flex items-center gap-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex min-h-11 items-center gap-2.5 rounded-xl px-5 py-2.5 text-sm font-bold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                  isActive
                    ? 'bg-slate-100 text-text border border-slate-200 shadow-sm'
                    : 'text-text-muted hover:text-accent hover:bg-accent/5'
                }`
              }
            >
              <LayoutGrid size={18} />
              <span className="hidden sm:inline">Markets</span>
            </NavLink>
            
            <div className="h-6 w-[1px] bg-slate-200 mx-2 hidden sm:block" />
            
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 group cursor-default">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-[10px] font-black text-accent uppercase tracking-widest pt-0.5">Live</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 relative z-10 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            {...pageTransition}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200 bg-surface py-12 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 text-text font-bold">
              <Sunrise size={18} className="text-accent" />
              <span>Sunrise On-Chain Terminal</span>
            </div>
            <p className="text-xs text-text-muted max-w-xs font-medium leading-relaxed">
              Real-time matrix for Sunrise assets on Solana. Precision data, zero friction.
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center md:items-end gap-1">
              <div className="flex items-center gap-2">
                 <img src="https://birdeye.so/favicon.ico" className="w-3 h-3 grayscale opacity-70" alt="" />
                 <span className="text-[10px] font-black text-text uppercase tracking-widest">Birdeye API Hub</span>
              </div>
              <span className="text-[9px] font-bold text-accent uppercase tracking-[0.2em]">Live Data Sync v3.0</span>
            </div>
            <div className="w-[1px] h-10 bg-slate-100" />
            <span className="text-xs font-bold text-text-faint">(c) 2026 Sunrise</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
