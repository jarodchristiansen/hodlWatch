import { PostResolver } from "./posts";
import { NewsFeedResolver } from "./newsfeed";
import { UserResolver } from "./user";
import { AssetResolver } from "./assets";

const Product = require("../models/product");

import { dateScalar } from "../scalars";

const resolvers = {
  Date: dateScalar,

  Query: {
    ...PostResolver,
    ...NewsFeedResolver,
    ...UserResolver.queries,
    ...AssetResolver,

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
  },

  Mutation: {
    ...UserResolver.mutations,
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
