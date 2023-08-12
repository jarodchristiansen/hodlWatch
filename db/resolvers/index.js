import { AssetResolver } from "./assets";
import { CollectiveResolver } from "./collective";
import { NewsFeedResolver } from "./newsfeed";
import { PostResolver } from "./posts";
import { UserResolver } from "./user";

const Product = require("../models/product");

import { dateScalar } from "../scalars";

const resolvers = {
  Date: dateScalar,

  Query: {
    ...PostResolver,
    ...NewsFeedResolver,
    ...UserResolver.queries,
    ...AssetResolver,
    ...CollectiveResolver,
  },

  Mutation: {
    ...UserResolver.mutations,
  },
};

module.exports = resolvers;
