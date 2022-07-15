import User from "./models/user";

const CoinGecko = require("coingecko-api");

const Product = require("./models/product");
const Asset = require("./models/asset");
import { dateScalar } from "./scalars";

const resolvers = {
  Date: dateScalar,

  Query: {
    // products
    getUser: async (_, { email }) => {
      const user = await User.find({ email });

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
    getAssets: async (_, { offset, limit }) => {
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

    getAssetFinancialDetails: async (_, { symbol, time }) => {
      try {
        const data = await fetch(
          `https://api.lunarcrush.com/v2?data=assets&key=${process.env.LUNARCRUSH_KEY}&symbol=${symbol}&data_points=${time}&interval=day`
        ).then((response) => response.json());

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

        if (data?.data) {
          return data.data;
        } else {
          throw new Error("Asset not found");
        }
      } catch (err) {
        console.log(err);
      }
    },
  },

  Mutation: {
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
