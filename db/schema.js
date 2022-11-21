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

  type CryptoCompareHistory {
    priceData: [PriceDetails]
    blockchainData: [BlockchainDataDetails]
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

  type PriceDetails {
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

  type BlockchainDataDetails {
    symbol: String
    time: Int
    zero_balance_addresses_all_time: Float
    unique_addresses_all_time: Float
    new_addresses: Float
    active_addresses: Float
    transaction_count: Float
    transaction_count_all_time: Float
    large_transaction_count: Float
    average_transaction_value: Float
    block_height: Float
    hashrate: Float
    difficulty: Float
    block_time: Float
    block_size: Float
    current_supply: Float
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
    favorites: [FavoritesData]
  }

  type FavoritesData {
    title: String
    symbol: String
    image: String
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

  type NewsFeedEntries {
    id: String
    guid: String
    published_on: Float
    imageurl: String
    title: String
    url: String
    body: String
    tags: String
    lang: String
    upvotes: String
    downvotes: String
    categories: CategoryType
    source_info: SourceInfo
    source: String
  }

  type SourceInfo {
    name: String
    img: String
    lang: String
  }

  enum CategoryType {
    BTC
    BUSINESS
    EXCHANGE
    ICO
  }

  type Query {
    getProducts: [Product]
    getProduct(id: ID!): Product
    getAssets(offset: Int, limit: Int): [Asset]
    getAsset(symbol: String!): [Asset]
    getAssetHistory(symbol: String!, time: Int): CryptoCompareHistory
    getAssetFinancialDetails(symbol: String!, time: Int): CryptoCompareHistory
    getUser(email: String): User
    getDifficultyRibbons(symbol: String, cut: Int): [DifficultyRibbonData]
    getNewsFeed: [NewsFeedEntries]
  }

  type Mutation {
    #Products
    newProduct(input: ProductInput): Product
    updateProduct(id: ID!, input: ProductInput): Product
    deleteProduct(id: ID!): String
  }
`;

module.exports = typeDefs;
