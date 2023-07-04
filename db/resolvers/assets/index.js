const CoinGecko = require("coingecko-api");
import Asset from "../../models/asset";
import btc_macros from "../../models/btc_macro";

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

  getAsset: async (_, { symbol }) => {
    try {
      const asset = await Asset.find({ symbol });
      const CoinGeckoClient = new CoinGecko();

      let assets = await CoinGeckoClient.coins.all();
      // const assets = await Asset.find({});

      return assets?.data.filter((e) =>
        e.symbol.toLowerCase().includes(symbol.toLowerCase())
      );
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
      let data = {};

      // // How to get details on contracts from erc-20
      const CoinGeckoClient = new CoinGecko();

      let coinList = await CoinGeckoClient.coins.list();

      let geckoProp = coinList?.data?.filter(
        (asset) => name.toLowerCase() === asset.name.toLowerCase()
      );

      let dbAsset = await Asset.findOne({ name }).catch(
        (err) => new Error(err)
      );

      if (!dbAsset) {
        dbAsset = await Asset.findOne({ symbol: name }).catch(
          (err) => new Error(err)
        );
      }

      if (geckoProp) {
        let geckoData = await CoinGeckoClient.coins.fetch(geckoProp[0].id, {
          market_data: false,
          localization: false,
        });

        data = geckoData?.data;
      }

      data.favorite_count = dbAsset?.favorite_count;

      // let zrx = "0xe41d2489571d322189246dafa5ebde1f4699f498";
      // let contract = await CoinGeckoClient.coins.fetchCoinContractInfo(zrx);

      if (data) {
        return data;
      } else {
        throw new Error("Asset not found");
      }
    } catch (err) {
      throw new Error(err);
    }
  },
};
