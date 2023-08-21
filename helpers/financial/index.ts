import { FormatUnixTime } from "../formatters/time";

export const processFinancialHistory = (financialData) => {
  let market_dominance = [];
  let volatility = [];
  let volume = [];
  let highs = [];
  let lows = [];
  let closes = [];
  let percent_change = [];
  let price_btc = [];

  for (let i of financialData) {
    if (i?.market_dominance) {
      market_dominance.push({
        market_dominance: i.market_dominance,
        time: FormatUnixTime(i.time),
      });
    }
    if (i?.volatility) {
      volatility.push({
        volatility: i.volatility,
        time: FormatUnixTime(i.time),
      });
    }
    if (i.volumeto && i.volumefrom) {
      volume.push({
        volumeTo: i.volumeto,
        volumeFrom: i.volumefrom,
        time: FormatUnixTime(i.time),
      });
    }
    if (i?.percent_change_24h) {
      percent_change.push({
        percent_change: i.percent_change_24h,
        time: FormatUnixTime(i.time),
      });
    }
    if (i?.close) {
      closes.push({
        close: i.close,
        time: FormatUnixTime(i.time),
        low: i.low,
        high: i.high,
      });
    }
    if (i?.price_btc) {
      price_btc.push({
        price_btc: i.price_btc,
        time: FormatUnixTime(i.time),
      });
    }
    if (i?.high) {
      highs.push(i.high);
    }
    if (i?.low) {
      lows.push(i.low);
    }
  }

  let filteredData = {
    market_dominance,
    volatility,
    volume,
    highs,
    lows,
    closes,
    percent_change,
    price_btc,
  };

  return filteredData;
};
