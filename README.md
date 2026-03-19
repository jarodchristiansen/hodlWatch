## Mesh

[![codecov](https://codecov.io/gh/jarodchristiansen/hodlWatch/branch/main/graph/badge.svg?token=GHT2GI9U4T)](https://codecov.io/gh/jarodchristiansen/hodlWatch)


Mesh is a Next.js application that aggregates and analyzes cryptocurrency market data, providing users with key economic indicators and market trends.

## Features
- Live market data tracking
- Economic indicators for major cryptocurrencies as well as macroeconomic trends
- GraphQL API integration for real-time updates. Integrates with TradingView using Websockets
- User-friendly dashboard with key metrics like Fibonacci Retracement, Sharpe Ratio, Sortino Ratio, Net Realized Profit-Loss etc

## Tech Stack
- Frontend: Next.js, TypeScript, GraphQL (Apollo), MongoDB
- Data: CoinGecko API, FRED, Apollo Server

## Getting Started
1. **Clone the repository:** `git clone [<repo_url>](https://github.com/jarodchristiansen/hodlWatch/)`
2. **Install dependencies:** `npm install`
3. **Set up environment variables** for API keys.
4. **Run the app:** `npm run dev`

## Design tokens

Use [`styles/variables.ts`](styles/variables.ts) as the single source for **colors** (`Colors`, `ChartColors`, `Surfaces`), **typography** (`FontFamily`, `FontSize`, `FontWeight`), **spacing** (`SectionSpacing`, `Padding`, `ContentWidth`), and **motion** (`Transitions`). Prefer these tokens in styled-components and TS/TSX instead of raw hex or arbitrary `px` for section rhythm.

Global CSS in [`styles/globals.css`](styles/globals.css) mirrors core tokens as CSS custom properties (`:root`). New UI should align with the navy / charcoal / gold palette; chart series use `ChartColors` from the same file.

