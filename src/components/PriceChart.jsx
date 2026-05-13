import { useEffect, useMemo, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { formatCurrency } from '../services/api';

function CustomTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;

  const point = payload[0].payload;
  return (
    <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl p-5 backdrop-blur-xl">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
           <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
           <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">{point.date}</p>
        </div>
        <p className="text-xl font-black text-text font-mono tracking-tighter">
          {formatCurrency(point.price)}
        </p>
      </div>
    </div>
  );
}

export default function PriceChart({
  data,
  tokenColor = '#ff5a00',
  loading = false,
}) {
  const shouldReduceMotion = useReducedMotion();
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 640px)');
    const update = () => setIsNarrow(mediaQuery.matches);
    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  const isPositive = useMemo(() => {
    if (!data || data.length < 2) return true;
    return data[data.length - 1].price >= data[0].price;
  }, [data]);

  const chartColor = isPositive ? tokenColor : '#f43f5e';

  const tickInterval = useMemo(() => {
    if (!data || data.length === 0) return 'preserveStartEnd';
    if (data.length <= 8) return 0;
    return Math.floor(data.length / 6);
  }, [data]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="shimmer w-full h-[400px] rounded-[3rem]" />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex h-[400px] sm:h-[450px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/60 p-6 text-center">
        <div className="max-w-sm space-y-2">
          <p className="text-sm font-black uppercase tracking-widest text-text">Chart data is warming up</p>
          <p className="text-sm font-semibold leading-relaxed text-text-secondary">
            Sunrise can still show price, liquidity, holders, and transfer context while chart history syncs.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] sm:h-[450px]" role="img" aria-label="Token price history chart">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 0, left: -20, bottom: 22 }}>
          <defs>
            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={chartColor} stopOpacity={0.2} />
              <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="glowGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={chartColor} stopOpacity={0.2} />
              <stop offset="50%" stopColor={chartColor} stopOpacity={1} />
              <stop offset="100%" stopColor={chartColor} stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="8 8"
            stroke="rgba(100, 116, 139, 0.16)"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            hide={isNarrow}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#71717a', fontSize: 10, fontWeight: 800 }}
            interval={tickInterval}
            dy={16}
            height={isNarrow ? 8 : 42}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#71717a', fontSize: 10, fontWeight: 800 }}
            domain={['auto', 'auto']}
            tickFormatter={(v) => formatCurrency(v, true)}
            width={70}
          />
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ stroke: 'rgba(0, 0, 0, 0.1)', strokeWidth: 1, strokeDasharray: '4 4' }} 
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke={chartColor}
            strokeWidth={3}
            fill="url(#priceGradient)"
            animationDuration={shouldReduceMotion ? 0 : 900}
            animationEasing="ease-in-out"
            dot={false}
            activeDot={{
              r: 6,
              fill: chartColor,
              stroke: '#fff',
              strokeWidth: 2,
              className: 'sunrise-glow'
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
