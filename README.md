# Sunboard

Sunboard is a Sunrise DeFi token intelligence dashboard for Solana assets. It turns token market data, liquidity, holder distribution, transfer flow, and a simple momentum score into a fast research surface for deciding which Sunrise-listed assets deserve attention.

## What It Does

- Tracks Sunrise-listed tokens on Solana in one market dashboard.
- Scores assets with a Sunrise Score based on price velocity, liquidity depth, and flow.
- Opens each token into a dedicated detail page with chart, holders, transfers, and resource links.
- Provides a clear "Get token" action lane that sends users from analysis to execution.
- Falls back gracefully when public APIs rate-limit or stall, so the product does not get stuck on loaders.
- Works on desktop and mobile with a card-based mobile market view.

## Why It Exists

Most token dashboards show price first and context later. Sunboard is built for faster judgment: which assets are moving, which ones have enough liquidity to inspect, and where a user should verify before trading.

The app is designed around Sunrise DeFi assets, with Solana-first UX patterns like truncated mint addresses, copy feedback, explorer links, token-specific actions, and clear live/cached data states.

## Data Sources

- DexScreener for token pairs, price, volume, market cap, and liquidity.
- Birdeye for price history, holders, and transfer activity.
- Local deterministic fallback data when public endpoints are unavailable.

## Tech Stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- Recharts
- Lucide React

## Local Development

```bash
npm install
npm run dev
```

The local app runs on the Vite URL printed in the terminal, usually:

```bash
http://localhost:5173
```

## Production Build

```bash
npm run lint
npm run build
```

The production output is generated in `dist/`.

## Deploy To Vercel

From this folder:

```bash
npx vercel login
npx vercel deploy --prod --yes
```

Recommended Vercel settings:

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

## Repository

GitHub: https://github.com/Ghostiemoh/sunboard

## Notes

Sunboard uses public API endpoints, so live data availability can vary by rate limits and network conditions. When that happens, the interface shows cached or fallback states instead of leaving the user on a blank loading screen.
