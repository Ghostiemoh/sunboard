import { motion, useReducedMotion } from 'framer-motion';
import { useId } from 'react';

/**
 * A Masterpiece sparkline chart with curved paths and premium gradients.
 */
export default function Sparkline({ data, color, width = 120, height = 40 }) {
  const shouldReduceMotion = useReducedMotion();
  const reactId = useId();

  if (!data || data.length < 2) {
    return (
      <div
        className="shimmer rounded-lg"
        style={{ width: `${width}px`, height: `${height}px` }}
      />
    );
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * (height - 8) - 4;
    return { x, y };
  });

  // Create a smooth curve using Cubic Bezier
  const createCurve = (pts) => {
    return pts.reduce((acc, point, i, a) => {
      if (i === 0) return `M ${point.x},${point.y}`;
      const prev = a[i - 1];
      const cx = (prev.x + point.x) / 2;
      return `${acc} C ${cx},${prev.y} ${cx},${point.y} ${point.x},${point.y}`;
    }, '');
  };

  const pathData = createCurve(points);
  const areaPath = `${pathData} L ${width},${height} L 0,${height} Z`;

  const isPositive = data[data.length - 1] >= data[0];
  const lineColor = color || (isPositive ? '#10b981' : '#f43f5e');
  const gradientId = `sparkline-${reactId.replace(/:/g, '')}`;

  return (
    <motion.svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="overflow-visible"
      initial={shouldReduceMotion ? {} : { opacity: 0, pathLength: 0 }}
      animate={shouldReduceMotion ? {} : { opacity: 1, pathLength: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={lineColor} stopOpacity="0.2" />
          <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      
      <path
        d={areaPath}
        fill={`url(#${gradientId})`}
        className="pointer-events-none"
      />
      
      <motion.path
        d={pathData}
        fill="none"
        stroke={lineColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={shouldReduceMotion ? {} : { pathLength: 0 }}
        animate={shouldReduceMotion ? {} : { pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      <motion.circle
        cx={points[points.length - 1].x}
        cy={points[points.length - 1].y}
        r="3"
        fill={lineColor}
        initial={shouldReduceMotion ? {} : { scale: 0 }}
        animate={shouldReduceMotion ? {} : { scale: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
        className="sunrise-glow"
      />
    </motion.svg>
  );
}
