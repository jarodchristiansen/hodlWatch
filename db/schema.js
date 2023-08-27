import { gql } from "apollo-server-micro";

const typeDefs = gql`
  scalar Date

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
    image: String
    favorite_count: Float
    current_price: Float
    market_cap: Float
    market_cap_rank: Float
    fully_diluted_valuation: Float
    circulating_supply: Float
    total_supply: Float
    ath: Float
    ath_change_percentage: Float
    ath_date: Date
    atl: Float
    atl_change_percentage: Float
    atl_date: Date
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
    alt_rank_3Floatd: Float
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
    percent_change_3Floatd: Float
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

  input UsernameInput {
    username: String!
    email: String
  }

  type FavoritesData {
    title: String
    symbol: String
    image: String
  }

  input FavoritesDataInput {
    title: String
    symbol: String
    image: String
  }

  type DifficultyRibbonData {
    t: Float
    ma128: Float
    ma14: Float
    ma2FloatFloat: Float
    ma25: Float
    ma4Float: Float
    ma6Float: Float
    ma9: Float
    ma9Float: Float
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

  type AssetPairResponse {
    pairData: [AssetPairs24Hours]
  }

  type AssetPairs24Hours {
    SYMBOL: String
    SUPPLY: Float
    MKTCAPPENALTY: Float
    FULLNAME: String
    NAME: String
    ID: String
    VOLUME24HOURTO: Float
  }

  enum CategoryType {
    BTC
    BUSINESS
    EXCHANGE
    ICO
  }

  type Post {
    section: String
    category: String
    publish_date: Date
    slug: String
    header_image: String
    post_title: String
    post_content: String
    description: String
  }

  input PostInput {
    section: String
    category: String
    publish_date: Date
    slug: String
    header_image: String
    post_title: String
    post_content: String
    description: String
  }

  input UserExchangeInput {
    public_key: String
    private_key: String
  }

  type Balance {
    balances: [BalancesObject]
  }

  type BalancesObject {
    symbol: String
    balance: Float
    ticker: String
    usd: Float
  }

  type PriceObject {
    symbol: String
    info: Float
  }

  type GeckoAssetDetails {
    id: String
    symbol: String
    name: String
    block_time_in_minutes: Float
    hashing_algorithm: String
    categories: [String]
    genesis_date: String
    sentiment_votes_up_percentage: Float
    sentiment_votes_down_percentage: Float
    market_cap_rank: Float
    coingecko_rank: Float
    coingecko_score: Float
    developer_score: Float
    community_score: Float
    liquidity_score: Float
    public_interest_score: Float
    description: AssetGeckoDescription
    community_data: GeckoCommunityData
    devloper_data: GeckoDeveloperData
    favorite_count: Float
  }

  type AssetGeckoDescription {
    en: String
  }

  type GeckoCommunityData {
    twitter_followers: Float
    reddit_average_posts_48h: Float
    reddit_average_comments_48h: Float
    reddit_subscribers: Float
    reddit_accounts_active_48h: Float
    telegram_channel_user_count: Float
  }

  type GeckoDeveloperData {
    forks: Float
    stars: Float
    subscribers: Float
    pull_requests_merged: Float
    pull_request_contributors: Float
    code_additions_deletions_4_weeks: CodeAdditionType
    commit_count_4_weeks: Float
  }

  type CodeAdditionType {
    additions: Float
    deletions: Float
  }

  input FavoriteInput {
    asset: FavoritesDataInput
    email: String
  }

  type DaysCollectiveStats {
    user_count: Float
    asset_count: Float
    followed_assets: Float
    top_assets: [TopAsset]
    date: Date
  }

  type TopAsset {
    id: String
    symbol: String
    name: String
    favorite_count: Float
  }

  type BTCMacros {
    macro_data: [MacroData]
  }

  type MacroData {
    time: Float
    high: Float
    low: Float
    open: Float
    volumefrom: Float
    volumeto: Float
    close: Float
    totalvolume: Float
    VWAP: Float
    TWAP: Float
    norm_returns: Float
    returns: Float
    rolling_sharpe: Float
  }

  type SocialStats {
    time: Float
    comments: Float
    posts: Float
    followers: Float
    points: Float
    overview_page_views: Float
    analysis_page_views: Float
    markets_page_views: Float
    charts_page_views: Float
    trades_page_views: Float
    forum_page_views: Float
    influence_page_views: Float
    total_page_views: Float
    fb_likes: Float
    fb_talking_about: Float
    twitter_followers: Float
    twitter_following: Float
    twitter_lists: Float
    twitter_favourites: Float
    twitter_statuses: Float
    reddit_subscribers: Float
    reddit_active_users: Float
    reddit_posts_per_hour: Float
    reddit_posts_per_day: Float
    reddit_comments_per_hour: Float
    reddit_comments_per_day: Float
    code_repo_stars: Float
    code_repo_forks: Float
    code_repo_subscribers: Float
    code_repo_open_pull_issues: Float
    code_repo_closed_pull_issues: Float
    code_repo_open_issues: Float
    code_repo_closed_issues: Float
    code_repo_contributors: Float
  }

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

module.exports = typeDefs;
