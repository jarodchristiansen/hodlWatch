# Mesh

[![codecov](https://codecov.io/gh/jarodchristiansen/hodlWatch/branch/main/graph/badge.svg?token=GHT2GI9U4T)](https://codecov.io/gh/jarodchristiansen/hodlWatch)

Real-time cryptocurrency market intelligence dashboard. Tracks live price data, surfaces quantitative economic indicators, and integrates with TradingView via WebSockets — built on a production-grade Next.js stack with a full testing and component development pipeline.

**Live:** [hodl-watch.vercel.app](https://hodl-watch.vercel.app)

---

## Features

- **Live market data** — Real-time price and volume tracking for major cryptocurrencies via CoinGecko API and FRED macroeconomic data feeds
- **TradingView integration** — WebSocket-powered chart embeds for live candlestick and indicator data
- **Quantitative indicators** — Fibonacci Retracement, Sharpe Ratio, Sortino Ratio, Net Realized Profit/Loss, and additional macro trend metrics computed from live data
- **GraphQL API layer** — Apollo Server with typed resolvers; client queries generated via GraphQL Codegen for full end-to-end type safety
- **Component library** — Reusable UI components developed and documented in Storybook with a centralized design token system
- **Authentication** — User accounts with session management via NextAuth.js

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, React, TypeScript |
| API | GraphQL (Apollo Client + Apollo Server) |
| Type Generation | GraphQL Codegen |
| Database | MongoDB |
| Auth | NextAuth.js |
| Data Sources | CoinGecko API, FRED (Federal Reserve Economic Data) |
| Real-time | WebSockets (TradingView) |
| Styling | Styled Components, CSS custom properties |
| Component Dev | Storybook |
| Testing | Jest, React Testing Library, Cypress E2E |
| Code Quality | ESLint, Prettier, Husky pre-commit hooks |
| CI/Coverage | GitHub Actions, Codecov |
| Deployment | Vercel |

---

## Architecture

```
hodlWatch/
├── components/        # Reusable UI components (documented in Storybook)
├── pages/             # Next.js route-based pages + API routes
├── db/                # MongoDB connection and query logic
├── lib/               # Apollo client config, NextAuth setup
├── helpers/           # Shared utility functions and data transformers
├── client_types/      # Auto-generated TypeScript types (GraphQL Codegen)
├── content/           # Static content and MDX
├── styles/            # Global CSS, design tokens (variables.ts)
├── tests/             # Jest unit and component tests
├── cypress/e2e/       # End-to-end test suites
└── scripts/           # Data scripts (Python)
```

### Design Token System

All styling is driven by a centralized token file at `styles/variables.ts`. New components should consume tokens rather than hardcoded values:

| Token Group | Contents |
|---|---|
| `Colors` / `ChartColors` / `Surfaces` | Navy / charcoal / gold palette; chart series colors |
| `FontFamily` / `FontSize` / `FontWeight` | Typography scale |
| `SectionSpacing` / `Padding` / `ContentWidth` | Layout rhythm |
| `Transitions` | Motion constants |

CSS custom properties mirroring core tokens are available globally via `styles/globals.css` (`:root`).

### GraphQL Layer

- `apollo-client.js` — client-side Apollo config with caching
- `codegen.yml` — schema introspection and TypeScript type generation
- `client_types/` — generated types consumed across pages and components; regenerate with `npm run codegen`

---

## Getting Started

### Prerequisites

- Node.js v16+
- MongoDB Atlas connection string
- CoinGecko API key (free tier sufficient)
- FRED API key (free, from [fred.stlouisfed.org](https://fred.stlouisfed.org/docs/api/api_key.html))

### Local Setup

```bash
git clone https://github.com/jarodchristiansen/hodlWatch
cd hodlWatch
npm install
```

Create a `.env.local`:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
COINGECKO_API_KEY=your_coingecko_key
FRED_API_KEY=your_fred_key
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Regenerate GraphQL Types

```bash
npm run codegen
```

---

## Testing

```bash
# Unit and component tests
npm run test
npm run test:coverage

# End-to-end (requires dev server running)
npm run cypress

# Lint
npm run lint
```

### Storybook

```bash
npm run storybook
```

Browse and develop components in isolation at [http://localhost:6006](http://localhost:6006).

---

## Data Sources

| Source | Usage |
|---|---|
| [CoinGecko API](https://www.coingecko.com/en/api) | Live price, volume, and market cap data |
| [FRED](https://fred.stlouisfed.org/) | Macroeconomic indicators (M2, CPI, Fed Funds rate, etc.) |
| TradingView | WebSocket-powered charting embeds |

---

## Roadmap

- Portfolio tracking — user-defined holdings with P&L over time
- Alert system — price and indicator threshold notifications
- Expand Cypress E2E coverage for dashboard and auth flows
- Migrate to Next.js App Router

---

## License

MIT
