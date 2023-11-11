// schema.js
import { mergeTypeDefs } from "@graphql-tools/merge";

import { assetTypeDefs } from "./assetTypes";
import { commonTypeDefs } from "./commonTypes";
import { financialMacroTypeDefs } from "./financialMacroTypes";
import { newsPostTypeDefs } from "./newsPostTypes";
import { queryMutationTypeDefs } from "./queryMutationTypes";
import { socialStatsTypeDefs } from "./socialStatsTypes";
import { userTypeDefs } from "./userTypes";

const typeDefs = mergeTypeDefs([
  commonTypeDefs,
  assetTypeDefs,
  userTypeDefs,
  newsPostTypeDefs,
  financialMacroTypeDefs,
  socialStatsTypeDefs,
  queryMutationTypeDefs,
]);

export default typeDefs;
