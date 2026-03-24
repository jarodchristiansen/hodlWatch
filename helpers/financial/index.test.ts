import { processFinancialHistory } from "./index";

describe("processFinancialHistory", () => {
  it("returns empty series for null/undefined input", () => {
    const a = processFinancialHistory(null);
    const b = processFinancialHistory(undefined);
    expect(a.market_dominance).toEqual([]);
    expect(b.highs).toEqual([]);
  });

  it("maps a full row into all buckets", () => {
    const row = {
      time: 1_700_000_000,
      market_dominance: 42,
      volatility: 0.1,
      volumeto: 100,
      volumefrom: 50,
      percent_change_24h: 2.5,
      close: 30_000,
      low: 29_000,
      high: 31_000,
      price_btc: 1.2,
    };
    const out = processFinancialHistory([row]);
    expect(out.market_dominance).toHaveLength(1);
    expect(out.volatility).toHaveLength(1);
    expect(out.volume).toHaveLength(1);
    expect(out.percent_change).toHaveLength(1);
    expect(out.closes).toHaveLength(1);
    expect(out.price_btc).toHaveLength(1);
    expect(out.closes[0].close).toBe(30_000);
  });

  it("collects highs and lows as raw values", () => {
    const out = processFinancialHistory([
      { time: 1, high: 10, low: 5 },
      { time: 2, high: 11 },
    ]);
    expect(out.highs).toEqual([10, 11]);
    expect(out.lows).toEqual([5]);
  });
});
