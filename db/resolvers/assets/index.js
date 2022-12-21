const CoinGecko = require("coingecko-api");

export const AssetResolver = {
  getAssets: async (_, { offset, limit, topListBy }) => {
    try {
      const CoinGeckoClient = new CoinGecko();
      let assets = await CoinGeckoClient.coins.all({
        page: offset,
        per_page: limit,
      });
      // const assets = await Asset.find({});
      return assets?.data;
    } catch (err) {
      console.log(err);
    }
  },

  getAsset: async (_, { symbol }) => {
    try {
      // const asset = await Asset.find({ symbol });
      const CoinGeckoClient = new CoinGecko();

      let assets = await CoinGeckoClient.coins.all();
      // const assets = await Asset.find({});

      return assets?.data.filter((e) =>
        e.symbol.toLowerCase().includes(symbol.toLowerCase())
      );
    } catch (err) {
      console.log(err);
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
      console.log(err);
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

      if (data?.priceData) {
        return data;
      } else {
        throw new Error("Asset not found");
      }
    } catch (err) {
      console.log(err);
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

      if (geckoProp) {
        let geckoData = await CoinGeckoClient.coins.fetch(geckoProp[0].id, {
          market_data: false,
          localization: false,
        });

        data = geckoData?.data;
      }

      // let zrx = "0xe41d2489571d322189246dafa5ebde1f4699f498";
      // let contract = await CoinGeckoClient.coins.fetchCoinContractInfo(zrx);

      // console.log({ contract });

      if (data) {
        return data;
      } else {
        throw new Error("Asset not found");
      }
    } catch (err) {
      console.log(err);
    }
  },
};
