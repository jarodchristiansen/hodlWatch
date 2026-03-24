const CoinGecko = require("coingecko-api");
import Asset from "../../models/asset";
import btc_macros from "../../models/btc_macro";
const { mergeDbFallbackPatches } = require("./geckoMergePatches");

function escapeRegex(s) {
  return String(s || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Normalize whatever `coingecko-api` returns from `coins.list()` into an array of { id, symbol, name }. */
function normalizeCoinsListResponse(coinList) {
  if (Array.isArray(coinList)) return coinList;
  if (Array.isArray(coinList?.data)) return coinList.data;
  // Some versions wrap differently
  if (Array.isArray(coinList?.data?.data)) return coinList.data.data;
  if (coinList?.data && typeof coinList.data === "object" && !Array.isArray(coinList.data)) {
    const vals = Object.values(coinList.data);
    if (
      vals.length &&
      vals.every((x) => x && typeof x === "object" && typeof x.id === "string")
    ) {
      return vals;
    }
  }
  return [];
}

async function fetchCoinsListFromRest() {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/list?include_platform=false"
    );
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json) ? json : [];
  } catch {
    return [];
  }
}

async function searchCoinGeckoId(query) {
  const q = (query || "").toString().trim();
  if (!q) return null;
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(q)}`
    );
    if (!res.ok) return null;
    const json = await res.json();
    const coins = json?.coins;
    if (!Array.isArray(coins) || !coins.length) return null;
    return coins[0]?.id || null;
  } catch {
    return null;
  }
}

/**
 * Full coin payload from CoinGecko REST — includes genesis_date, community_score,
 * developer_score, liquidity_score, sentiment_votes_* (often omitted by `coingecko-api` npm fetch).
 */
async function fetchCoinGeckoCoinDetailRest(coinId) {
  if (!coinId) return null;
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${encodeURIComponent(
        coinId
      )}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=true&sparkline=false`
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json && typeof json === "object" ? json : null;
  } catch {
    return null;
  }
}

/** CoinGecko public coin detail responses often omit community/developer/liquidity scores; derive 0–100 proxies from nested data they still send. */
function asNumericScore(v) {
  if (typeof v === "number" && !Number.isNaN(v)) return v;
  if (typeof v === "string" && v.trim() !== "" && !Number.isNaN(Number(v))) {
    return Number(v);
  }
  return null;
}

function fillCoinGeckoScoresIfMissing(data) {
  if (!data || typeof data !== "object") return data;
  const md = data.market_data;
  const cd = data.community_data;
  const dd = data.developer_data;

  if (data.community_score == null) {
    const watch = asNumericScore(data.watchlist_portfolio_users) ?? 0;
    const reddit = asNumericScore(cd?.reddit_subscribers) ?? 0;
    const telegram = asNumericScore(cd?.telegram_channel_user_count) ?? 0;
    const active = asNumericScore(cd?.reddit_accounts_active_48h) ?? 0;
    const posts = asNumericScore(cd?.reddit_average_posts_48h) ?? 0;
    const comments = asNumericScore(cd?.reddit_average_comments_48h) ?? 0;
    const engagement = posts * 80 + comments;
    const composite =
      1 +
      watch / 100000 +
      reddit / 6000 +
      telegram / 2500 +
      active / 400 +
      engagement / 150;
    if (composite > 1) {
      data.community_score = Math.min(
        100,
        Math.round(24 * Math.log10(composite) * 10) / 10
      );
    }
  }

  if (data.developer_score == null && dd && typeof dd === "object") {
    const stars = asNumericScore(dd.stars) ?? 0;
    const forks = asNumericScore(dd.forks) ?? 0;
    const merged = asNumericScore(dd.pull_requests_merged) ?? 0;
    const contributors = asNumericScore(dd.pull_request_contributors) ?? 0;
    const commits = asNumericScore(dd.commit_count_4_weeks) ?? 0;
    const composite =
      1 +
      stars / 2000 +
      forks / 350 +
      merged / 700 +
      contributors / 45 +
      commits / 18;
    if (composite > 1) {
      data.developer_score = Math.min(
        100,
        Math.round(27 * Math.log10(composite) * 10) / 10
      );
    }
  }

  if (data.liquidity_score == null && md && typeof md === "object") {
    const vol = asNumericScore(md.total_volume?.usd);
    const mcap = asNumericScore(md.market_cap?.usd);
    if (vol != null && mcap != null && mcap > 0) {
      const turnover = vol / mcap;
      data.liquidity_score = Math.min(
        100,
        Math.round(turnover * 2500 * 10) / 10
      );
    } else if (vol != null && vol > 0) {
      data.liquidity_score = Math.min(
        100,
        Math.round(16 * Math.log10(vol / 1e6) * 10) / 10
      );
    }
  }

  return data;
}

function buildDetailsFromDbAsset(dbAsset, fallbackToken) {
  if (!dbAsset) return null;
  const sym = (dbAsset.symbol || fallbackToken || "").toString();
  const img = dbAsset.image;
  const image =
    img && typeof img === "string"
      ? { large: img, small: img, thumb: img }
      : null;

  const hasPrice = typeof dbAsset.current_price === "number";
  const hasChg =
    typeof dbAsset.price_change_percentage_24h === "number";

  return {
    id: sym ? sym.toLowerCase() : String(fallbackToken || "").toLowerCase(),
    name: dbAsset.name || dbAsset.title || sym || fallbackToken,
    symbol: sym || fallbackToken,
    image,
    market_cap_rank:
      typeof dbAsset.market_cap_rank === "number"
        ? dbAsset.market_cap_rank
        : null,
    market_data: {
      current_price: hasPrice ? { usd: dbAsset.current_price } : null,
      price_change_percentage_24h: hasChg
        ? dbAsset.price_change_percentage_24h
        : null,
    },
    description: dbAsset.description
      ? { en: String(dbAsset.description) }
      : null,
  };
}

async function findDbAssetByNameOrSymbol(raw) {
  let dbAsset = await Asset.findOne({
    name: new RegExp(`^${escapeRegex(raw)}$`, "i"),
  }).catch(() => null);

  if (!dbAsset) {
    dbAsset = await Asset.findOne({
      symbol: new RegExp(`^${escapeRegex(raw)}$`, "i"),
    }).catch(() => null);
  }
  return dbAsset;
}

async function resolveGeckoIdForRaw(raw, list) {
  const q = raw.toLowerCase();
  const qSym = q.replace(/[^a-z0-9]/g, "");

  const byId = list.find((c) => (c?.id || "").toLowerCase() === q);
  const byName = list.find((c) => (c?.name || "").toLowerCase() === q);
  const bySymbolExact = list.find(
    (c) => (c?.symbol || "").toLowerCase() === q
  );
  const bySymbolLoose =
    bySymbolExact ||
    list.find(
      (c) =>
        (c?.symbol || "").toLowerCase().replace(/[^a-z0-9]/g, "") === qSym
    );

  let resolvedId = (byId || byName || bySymbolLoose)?.id;

  if (!resolvedId) {
    resolvedId = await searchCoinGeckoId(raw);
  }

  return resolvedId;
}

async function loadCoinGeckoDetailForId(resolvedId, CoinGeckoClient) {
  let data = {};
  const restCoin = await fetchCoinGeckoCoinDetailRest(resolvedId);
  if (restCoin) {
    data = restCoin;
  } else {
    const geckoData = await CoinGeckoClient.coins.fetch(resolvedId, {
      market_data: true,
      localization: false,
    });
    const payload = geckoData?.data ?? geckoData;
    if (payload && typeof payload === "object") {
      data = payload;
    }
  }
  return data;
}

export const AssetResolver = {
  getAssets: async (_, { offset, limit, topListBy }) => {
    try {
      // const CoinGeckoClient = new CoinGecko();
      // const client = new CoinGeckoClient({
      //   timeout: 10000,
      //   autoRetry: false,
      // });

      // let assets = await client.coinMarket({
      //   vs_currency: "USD",
      //   page: offset,
      //   per_page: limit,
      //   order: "market_cap_desc",
      // });

      // console.log({ assets });

      // const assetsByPageNumber = assets?.splice(offset - 1, limit);

      const assets = await Asset.find({})
        .limit(offset * limit)
        .sort("-market_cap");

      return assets;
    } catch (err) {
      throw new Error(err, "In getAssets resolver");
    }
  },

  getAsset: async (_, { symbol, type }) => {
    try {
      if (!type || type === "Crypto") {
        // Prefer DB-backed search so the UI receives the same rich asset shape
        // used by `getAssets` (current_price, market_cap_rank, etc).
        const q = (symbol || "").trim();
        if (!q) return [];

        const rx = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
        const results = await Asset.find({
          $or: [{ symbol: rx }, { name: rx }],
        })
          .limit(50)
          .sort("-market_cap");

        return results;
      } else if (type === "TradFI") {
        const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${process.env.ALPHA_VANTAGE}`;

        const data = await fetch(url).then((response) => response.json());

        const { bestMatches } = data;

        const formattedData = bestMatches?.map((match) => {
          return {
            id: match["1. symbol"],
            symbol: match["1. symbol"],
            name: match["2. name"],
          };
        });

        return formattedData;
      }
    } catch (err) {
      throw new Error(err);
    }
  },

  getDifficultyRibbons: async (_, { symbol, cut }) => {
    const data = await fetch(
      `https://api.glassnode.com/v1/metrics/indicators/difficulty_ribbon?a=${symbol}&api_key=${process.env.GLASSNODE_KEY}`
    ).then((response) => response.json());

    const addressCount = await fetch(
      `https://api.glassnode.com/v1/metrics/addresses/active_count?a=${symbol}&api_key=${process.env.GLASSNODE_KEY}`
    ).then((response) => response.json());

    let ribbonData = [];

    for (let i of data.slice(-cut)) {
      ribbonData.push({
        t: i.t,
        ma9: i.o.ma9,
        ma14: i.o.ma14,
        ma25: i.o.ma25,
        ma40: i.o.ma40,
        ma60: i.o.ma60,
        ma90: i.o.ma90,
        ma128: i.o.ma128,
        ma200: i.o.ma200,
      });
    }

    // let formattedData = {
    //   ribbonData,
    //   addressCount
    // }

    return ribbonData;
  },
  getBTCMacros: async (_, { symbol }) => {
    const data = {};

    let results = await btc_macros.find({}).catch((err) => new Error(err));

    let responses = [];

    for (let i of results) {
      if (typeof i.rolling_sharpe !== "number")
        i.rolling_sharpe = parseFloat(0);

      if (typeof i.returns !== "number") i.returns = parseFloat(1.1);

      if (typeof i.norm_returns !== "number") i.norm_returns = parseFloat(1.1);

      responses.push({
        time: i.time,
        high: i.high,
        low: i.low,
        open: i.open,
        volumefrom: i.volumefrom,
        volumeto: i.volumeto,
        close: i.close,
        totalvolume: i.totalvolume,
        VWAP: i.VWAP,
        TWAP: i.TWAP,
        norm_returns: i.norm_returns,
        returns: i.returns,
        rolling_sharpe: i.rolling_sharpe,
      });
    }

    data.macro_data = responses;

    return data;
  },
  getAssetSocialData: async (_, { symbol }) => {
    // ABSTRACT THIS LOGIC OUT FOR COINLIST AND CACHE IT ON SERVER TO REDUCE REQUESTS
    try {
      const response = await fetch(
        "https://min-api.cryptocompare.com/data/all/coinlist"
      ).then((response) => response.json());

      const coins = response.Data;

      // Find the coin object by symbol
      const coin = Object.values(coins).find(
        (c) => c.Symbol.toUpperCase() === symbol.toUpperCase()
      );

      if (coin) {
        const coinId = coin.Id;
        // return coinId;
        if (coinId) {
          let socialData = await fetch(
            `https://min-api.cryptocompare.com/data/social/coin/histo/day?coinId=${coinId}&api_key=${process.env.CRYPTO_COMPARE_KEY}`
          ).then((response) => response.json());

          return socialData.Data;
        }
      } else {
        throw new Error("Coin not found");
      }
    } catch (error) {
      console.error("Error retrieving coinId:", error);
    }
  },
  getAssetNews: async (_, { symbol }) => {
    const data = {};
    let newsData = await fetch(
      `https://min-api.cryptocompare.com/data/v2/news/?lang=EN&categories=${symbol.toUpperCase()}`
    ).then((response) => response.json());

    data.newsData = newsData.Data;

    return data.newsData;
  },
  getAssetPairs: async (_, { symbol }) => {
    const data = {};

    let pairData = await fetch(
      `https://min-api.cryptocompare.com/data/top/volumes?tsym=${symbol.toUpperCase()}`
    ).then((response) => response.json());

    data.pairData = pairData.Data;

    return data;
  },
  getAssetFinancialDetails: async (_, { symbol, time }) => {
    try {
      const data = {};

      let priceData = await fetch(
        `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${symbol.toUpperCase()}&tsym=USD&limit=${time}`
      ).then((response) => response.json());

      data.priceData = priceData.Data.Data;

      if (symbol.toUpperCase() === "BTC" || symbol.toUpperCase() === "ETH") {
        let blockchainData = await fetch(
          `https://min-api.cryptocompare.com/data/blockchain/histo/day?fsym=${symbol}&limit=${time}&api_key=${process.env.CRYPTO_COMPARE_KEY}`
        ).then((response) => response.json());

        data.blockchainData = blockchainData.Data.Data;
      }

      if (data?.priceData) {
        return data;
      } else {
        throw new Error("Asset not found");
      }
    } catch (err) {
      throw new Error(err);
    }
  },

  getAssetHistory: async (_, { symbol, time }) => {
    try {
      const data = {};

      let priceData = await fetch(
        `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${symbol.toUpperCase()}&tsym=USD&limit=${time}`
      ).then((response) => response.json());

      data.priceData = priceData.Data.Data;

      if (symbol.toUpperCase() === "BTC" || symbol.toUpperCase() === "ETH") {
        let blockchainData = await fetch(
          `https://min-api.cryptocompare.com/data/blockchain/histo/day?fsym=${symbol}&limit=${time}&api_key=${process.env.CRYPTO_COMPARE_KEY}`
        ).then((response) => response.json());

        // let indicatorData = await fetch(
        //   `https://min-api.cryptocompare.com/data/tradingsignals/intotheblock/latest?fsym=BTC&api_key=${process.env.CRYPTO_COMPARE_KEY}`
        // ).then((response) => response.json());

        data.blockchainData = blockchainData.Data.Data;
      }

      // if (results.length === 1) {
      //   data.priceData = results[0]?.Data?.Data;
      //   // data.blockchainData = results[1]?.Data;
      // } else if (results.length === 2) {
      //   data.priceData = results[0]?.Data?.Data;
      //   data.blockchainData = results[1]?.Data?.Data;
      // }

      if (data?.priceData) {
        return data;
      } else {
        throw new Error("Asset not found");
      }
    } catch (err) {
      throw new Error(err);
    }
  },

  getGeckoAssetDetails: async (_, { name, time }) => {
    try {
      const raw = (name || "").toString().trim();
      if (!raw) throw new Error("Asset not found");

      const dbAsset = await findDbAssetByNameOrSymbol(raw);

      const CoinGeckoClient = new CoinGecko();
      let coinList = await CoinGeckoClient.coins.list();
      let list = normalizeCoinsListResponse(coinList);

      if (!list.length) {
        list = await fetchCoinsListFromRest();
      }

      const resolvedId = await resolveGeckoIdForRaw(raw, list);

      let data = {};
      if (resolvedId) {
        data = await loadCoinGeckoDetailForId(resolvedId, CoinGeckoClient);
      }

      const dbFallback = buildDetailsFromDbAsset(dbAsset, raw);

      if (dbFallback) {
        if (!data || typeof data !== "object" || !data.id) {
          data = { ...dbFallback };
        } else {
          mergeDbFallbackPatches(data, dbFallback);
        }
      }

      fillCoinGeckoScoresIfMissing(data);

      data.favorite_count = dbAsset?.favorite_count;

      if (
        !data ||
        typeof data !== "object" ||
        (!data.id && !data.name && !data.symbol)
      ) {
        throw new Error("Asset not found");
      }

      return data;
    } catch (err) {
      throw new Error(err);
    }
  },
};
