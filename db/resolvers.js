import User from "./models/user";
import Post from "./models/post";

const CoinGecko = require("coingecko-api");

const Product = require("./models/product");
const Asset = require("./models/asset");
import { dateScalar } from "./scalars";

const resolvers = {
  Date: dateScalar,

  Query: {
    getPosts: async (_, { filter }) => {
      try {
        let posts = await Post.find({ section: filter });

        return posts;
      } catch (err) {
        console.log("ERROR IN TRY CATCH GET POSTS");
      }
    },
    getPost: async (_, { slug }) => {
      try {
        let post = await Post.findOne({ slug });

        return post;
      } catch (err) {
        console.log("ERROR IN TRY CATCH GET POSTS");
      }
    },
    getNewsFeed: async (_, {}) => {
      try {
        let newsData = await fetch(
          `https://min-api.cryptocompare.com/data/v2/news/?lang=EN`
        ).then((response) => response.json());

        if (newsData.Data) {
          return newsData.Data;
        }
      } catch (err) {
        console.log({ err }, "No news feed found");
      }
    },
    // products
    getUser: async (_, { email }) => {
      const user = await User.find({ email }).then((res) => res[0].toObject());

      if (user?.favorites) {
        for (let i of user.favorites) {
          i.id = user.favorites.indexOf(i);
        }
      }

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    },
    getProducts: async () => {
      try {
        const products = await Product.find({});

        return products;
      } catch (err) {
        console.log(err);
      }
    },
    getProduct: async (_, { id }) => {
      const product = await Product.findById(id);

      if (!product) {
        throw new Error("Product not found");
      }

      return product;
    },
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
        // const data = await fetch(
        //   `https://api.lunarcrush.com/v2?data=assets&key=688o9wuzvzst3uybpg6eh&symbol=btc&data_points=365&interval=day`
        // ).then((response) => response.json());

        // console.log({data})
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

        // const data = await fetch(
        //   `https://api.coingecko.com/api/v3/coins/${symbol}/ohlc/vs_currency=usd&days=${time}`
        // ).then((response) => response.json());

        // console.log({data})
        // const asset = await Asset.find({ symbol });

        // let assets = await CoinGeckoClient.coins.all();
        // // const assets = await Asset.find({});

        // return assets?.data.filter((e) =>
        //   e.symbol.toLowerCase().includes(symbol.toLowerCase())
        // );

        // let glassnode;
        // await Promise.all([
        //   fetch(
        //     `https://api.glassnode.com/v1/metrics/indicators/difficulty_ribbon?a=${symbol}&api_key=${process.env.GLASSNODE_KEY}`
        //   ).then((resp) => resp.json()),
        //   // fetch(
        //   //   `https://api.glassnode.com/v1/metrics/indicators/sopr?a=${symbol}&api_key=${process.env.GLASSNODE_KEY}`
        //   // ).then((resp) => resp.json()),
        //   // // fetch(
        //   // //   `https://api.glassnode.com/v1/metrics/indicators/stock_to_flow_ratio?a=${symbol}&api_key=${process.env.GLASSNODE_KEY}`
        //   // // ).then((resp) => resp.json()),
        //   // fetch(
        //   //   `https://api.glassnode.com/v1/metrics/indicators/pi_cycle_top?a=${symbol}&api_key=${process.env.GLASSNODE_KEY}`
        //   // ).then((resp) => resp.json()),
        // ]).then((result) => {
        //   glassnode = result;
        // });

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
        // const data = await fetch(
        //   `https://api.lunarcrush.com/v2?data=assets&key=688o9wuzvzst3uybpg6eh&symbol=btc&data_points=365&interval=day`
        // ).then((response) => response.json());

        // console.log({data})
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

          // console.log("IN GET ASSET HISTORY RESOLVER", { indicatorData });

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
  },

  Mutation: {
    updateUsername: async (_, { input }) => {
      const { username, email } = input;

      try {
        let user = await User.findOne({ email });

        let inputMatch = await User.findOne({ username: username });

        inputMatch && new Error("User name already exists");

        if (user && !inputMatch) {
          user.username = username;
          await user.save();
          return user;
        }
      } catch (err) {
        console.log("Error in updating username!", { err });
      }
    },

    // products
    newProduct: async (_, { input }) => {
      try {
        const product = new Product(input);

        const result = await product.save();

        return result;
      } catch (err) {
        console.log(err);
      }
    },

    updateProduct: async (_, { id, input }) => {
      let product = await Product.findById(id);

      if (!product) {
        throw new Error("Product not found");
      }

      product = await Product.findOneAndUpdate({ _id: id }, input, {
        new: true,
      });

      return product;
    },

    deleteProduct: async (_, { id }) => {
      const product = await Product.findById(id);

      if (!product) {
        throw new Error("Producto no encontrado");
      }

      await Product.findOneAndDelete({ _id: id });

      return "Producto eliminado";
    },
  },
};

module.exports = resolvers;
