// queryMutationTypes.js
import { gql } from "apollo-server-micro";

export const queryMutationTypeDefs = gql`
  type Query {
    getAssets(offset: Int, limit: Int): [Asset]
    getAssetsByName(symbol: String, offset: Int, limit: Int): [Asset]
    getAssetSocialData(symbol: String!): [SocialStats]
    getAsset(symbol: String!, type: String): [Asset]
    getBTCMacros(symbol: String!): BTCMacros
    getAssetNews(symbol: String!): [NewsFeedEntries]
    getAssetPairs(symbol: String!): AssetPairResponse
    getAssetHistory(symbol: String!, time: Int): CryptoCompareHistory
    getGeckoAssetDetails(name: String!, time: Int): GeckoAssetDetails
    getAssetFinancialDetails(symbol: String!, time: Int): CryptoCompareHistory
    getUser(email: String, id: String): User
    getDifficultyRibbons(symbol: String, cut: Int): [DifficultyRibbonData]
    getNewsFeed: [NewsFeedEntries]
    getPost(slug: String): Post
    getPosts(filter: String): [Post]
    getAssetPriceData(
      tickers: [String]
      exchange_data: UserExchangeInput
    ): [PriceObject]
    getUserExchangeData(input: UserExchangeInput): Balance
    getCollectiveStats: DaysCollectiveStats
  }

  type Mutation {
    removeFavorite(input: FavoriteInput): User
    addFavorite(input: FavoriteInput): User
    updateUsername(input: UsernameInput): User
  }
`;
