import { formatPercentage } from '../services/api';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

/**
 * Renders a percentage change value with color coding and trend icon.
 * FIX #4: Icons now always visible — color-only indicators fail colorblind users.
 */
export default function ChangeIndicator({ value, size = 'md' }) {
  if (value === null || value === undefined) {
    return <span className="text-text-muted">—</span>;
  }

  const isPositive = value > 0;
  const isNeutral = value === 0;

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
  };

  const iconSize = size === 'sm' ? 10 : size === 'lg' || size === 'xl' ? 18 : 14;

  return (
    <span
      className={`inline-flex items-center gap-0.5 font-semibold font-mono ${sizeClasses[size]} ${
        isNeutral
          ? 'text-text-muted'
          : isPositive
          ? 'text-positive'
          : 'text-negative'
      }`}
      aria-label={`${isPositive ? 'Up' : isNeutral ? 'No change' : 'Down'} ${formatPercentage(value)}`}
    >
      {isNeutral ? (
        <Minus size={iconSize} aria-hidden="true" />
      ) : isPositive ? (
        <TrendingUp size={iconSize} aria-hidden="true" />
      ) : (
        <TrendingDown size={iconSize} aria-hidden="true" />
      )}
      {formatPercentage(value)}
    </span>
  );
}
