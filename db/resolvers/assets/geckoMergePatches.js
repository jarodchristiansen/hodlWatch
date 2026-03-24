/**
 * When CoinGecko returned a payload but fields are sparse, fill gaps from DB asset shape.
 * Mutates `data` in place (same as previous resolver behavior).
 */
function mergeDbFallbackPatches(data, dbFallback) {
  if (
    (!data.market_data?.current_price ||
      typeof data.market_data.current_price.usd !== "number") &&
    typeof dbFallback.market_data?.current_price?.usd === "number"
  ) {
    data.market_data = data.market_data || {};
    data.market_data.current_price =
      data.market_data.current_price || dbFallback.market_data.current_price;
  }
  if (
    data.market_data &&
    (data.market_data.price_change_percentage_24h === undefined ||
      data.market_data.price_change_percentage_24h === null) &&
    typeof dbFallback.market_data?.price_change_percentage_24h === "number"
  ) {
    data.market_data.price_change_percentage_24h =
      dbFallback.market_data.price_change_percentage_24h;
  }
  const hasImg =
    data.image && (data.image.large || data.image.small || data.image.thumb);
  if (!hasImg && dbFallback.image?.large) {
    data.image = dbFallback.image;
  }
  if (!data.name && dbFallback.name) data.name = dbFallback.name;
  if (!data.symbol && dbFallback.symbol) data.symbol = dbFallback.symbol;
  if (
    (data.market_cap_rank === undefined || data.market_cap_rank === null) &&
    dbFallback.market_cap_rank != null
  ) {
    data.market_cap_rank = dbFallback.market_cap_rank;
  }
  if (!data.description?.en && dbFallback.description?.en) {
    data.description = dbFallback.description;
  }
}

module.exports = { mergeDbFallbackPatches };
