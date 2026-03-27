/**
 * When CoinGecko returned a payload but fields are sparse, fill gaps from DB asset shape.
 * Mutates `data` in place (same as previous resolver behavior).
 */

function patchCurrentPriceFromDb(data, dbFallback) {
  const missingUsd =
    !data.market_data?.current_price ||
    typeof data.market_data.current_price.usd !== "number";
  const dbUsd = dbFallback.market_data?.current_price?.usd;
  if (missingUsd && typeof dbUsd === "number") {
    data.market_data = data.market_data || {};
    data.market_data.current_price =
      data.market_data.current_price || dbFallback.market_data.current_price;
  }
}

function patchPriceChange24hFromDb(data, dbFallback) {
  if (!data.market_data) return;
  const missing =
    data.market_data.price_change_percentage_24h === undefined ||
    data.market_data.price_change_percentage_24h === null;
  const dbVal = dbFallback.market_data?.price_change_percentage_24h;
  if (missing && typeof dbVal === "number") {
    data.market_data.price_change_percentage_24h = dbVal;
  }
}

function patchImageFromDb(data, dbFallback) {
  const hasImg =
    data.image && (data.image.large || data.image.small || data.image.thumb);
  if (!hasImg && dbFallback.image?.large) {
    data.image = dbFallback.image;
  }
}

function patchCoreFieldsFromDb(data, dbFallback) {
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

function mergeDbFallbackPatches(data, dbFallback) {
  patchCurrentPriceFromDb(data, dbFallback);
  patchPriceChange24hFromDb(data, dbFallback);
  patchImageFromDb(data, dbFallback);
  patchCoreFieldsFromDb(data, dbFallback);
}

module.exports = { mergeDbFallbackPatches };
