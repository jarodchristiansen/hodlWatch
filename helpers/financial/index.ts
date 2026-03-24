import { FormatUnixTime } from "../formatters/time";

type FinancialRow = Record<string, unknown>;

function appendMarketDominance(
  acc: ReturnType<typeof emptyBuckets>,
  i: FinancialRow
) {
  if (!i?.market_dominance) return;
  acc.market_dominance.push({
    market_dominance: i.market_dominance,
    time: FormatUnixTime(i.time as number),
  });
}

function appendVolatility(acc: ReturnType<typeof emptyBuckets>, i: FinancialRow) {
  if (!i?.volatility) return;
  acc.volatility.push({
    volatility: i.volatility,
    time: FormatUnixTime(i.time as number),
  });
}

function appendVolume(acc: ReturnType<typeof emptyBuckets>, i: FinancialRow) {
  if (!i.volumeto || !i.volumefrom) return;
  acc.volume.push({
    volumeTo: i.volumeto,
    volumeFrom: i.volumefrom,
    time: FormatUnixTime(i.time as number),
  });
}

function appendPercentChange(
  acc: ReturnType<typeof emptyBuckets>,
  i: FinancialRow
) {
  if (!i?.percent_change_24h) return;
  acc.percent_change.push({
    percent_change: i.percent_change_24h,
    time: FormatUnixTime(i.time as number),
  });
}

function appendCloses(acc: ReturnType<typeof emptyBuckets>, i: FinancialRow) {
  if (!i?.close) return;
  acc.closes.push({
    close: i.close,
    time: FormatUnixTime(i.time as number),
    low: i.low,
    high: i.high,
  });
}

function appendPriceBtc(acc: ReturnType<typeof emptyBuckets>, i: FinancialRow) {
  if (!i?.price_btc) return;
  acc.price_btc.push({
    price_btc: i.price_btc,
    time: FormatUnixTime(i.time as number),
  });
}

function appendHighLow(acc: ReturnType<typeof emptyBuckets>, i: FinancialRow) {
  if (i?.high) acc.highs.push(i.high);
  if (i?.low) acc.lows.push(i.low);
}

function emptyBuckets() {
  return {
    market_dominance: [] as { market_dominance: unknown; time: string }[],
    volatility: [] as { volatility: unknown; time: string }[],
    volume: [] as { volumeTo: unknown; volumeFrom: unknown; time: string }[],
    highs: [] as unknown[],
    lows: [] as unknown[],
    closes: [] as any[],
    percent_change: [] as { percent_change: unknown; time: string }[],
    price_btc: [] as { price_btc: unknown; time: string }[],
  };
}

const rowProcessors = [
  appendMarketDominance,
  appendVolatility,
  appendVolume,
  appendPercentChange,
  appendCloses,
  appendPriceBtc,
  appendHighLow,
];

export const processFinancialHistory = (
  financialData: FinancialRow[] | null | undefined
) => {
  const filteredData = emptyBuckets();
  const rows = financialData ?? [];

  for (const i of rows) {
    for (const processRow of rowProcessors) {
      processRow(filteredData, i);
    }
  }

  return filteredData;
};
