import { gql } from "apollo-server-micro";

const typeDefs = gql`
  scalar Date

  # Products
  type Product {
    id: ID
    name: String
    productionCapacity: Int
    price: Float
    description: String
  }

  input ProductInput {
    name: String!
    productionCapacity: Int!
    price: Float!
    description: String
  }

  type ImageParts {
    thumb: String
    small: String
    large: String
  }

  type Asset {
    id: ID
    symbol: String
    name: String
    block_time_in_minutes: String
    image: ImageParts
  }

  type LunarAssetDetails {
    asset_id: Int
    time: Int
    open: Float
    close: Float
    high: Float
    low: Float
    volume: Float
    market_cap: Float
    price_score: Float
    correlation_rank: Float
    galaxy_score: Float
    volatility: Float
    alt_rank: Float
    alt_rank_30d: Float
    alt_rank_hour_average: Float
    market_cap_rank: Float
    percent_change_24h_rank: Float
    volume_24h_rank: Float
    price_btc: Float
    market_cap_global: Float
    market_dominance: Float
    percent_change_24h: Float
  }

  type GeckoHistory {
    time: Float
    high: Float
    low: Float
    open: Float
    volumefrom: Float
    volumeto: Float
    close: Float
    conversionType: String
    conversionSymbol: String
  }

  type AssetFinancialDetails {
    symbol: String
    id: ID
    name: String
    price: Float
    price_btc: Float
    market_cap: Float
    percent_change_24h: Float
    percent_change_7d: Float
    percent_change_30d: Float
    volume_24h: Float
    max_supply: Float
    categories: String
    timeSeries: [LunarAssetDetails]
  }

  type User {
    id: ID
    email: String
    name: String
    username: String
    image: String
    createAt: Date
  }

  type DifficultyRibbonData {
    t: Float
    ma128: Float
    ma14: Float
    ma200: Float
    ma25: Float
    ma40: Float
    ma60: Float
    ma9: Float
    ma90: Float
  }

  type Query {
    getProducts: [Product]
    getProduct(id: ID!): Product
    getAssets(offset: Int, limit: Int): [Asset]
    getAsset(symbol: String!): [Asset]
    getAssetFinancialDetails(symbol: String!, time: Int): [GeckoHistory]
    getUser: User
    getDifficultyRibbons(symbol: String, cut: Int): [DifficultyRibbonData]
  }

  type Mutation {
    #Products
    newProduct(input: ProductInput): Product
    updateProduct(id: ID!, input: ProductInput): Product
    deleteProduct(id: ID!): String
  }
`;

module.exports = typeDefs;
