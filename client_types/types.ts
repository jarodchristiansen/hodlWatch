import { gql } from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Date: { input: any; output: any };
};

export type Asset = {
  __typename?: "Asset";
  ath?: Maybe<Scalars["Float"]["output"]>;
  ath_change_percentage?: Maybe<Scalars["Float"]["output"]>;
  ath_date?: Maybe<Scalars["Date"]["output"]>;
  atl?: Maybe<Scalars["Float"]["output"]>;
  atl_change_percentage?: Maybe<Scalars["Float"]["output"]>;
  atl_date?: Maybe<Scalars["Date"]["output"]>;
  block_time_in_minutes?: Maybe<Scalars["String"]["output"]>;
  circulating_supply?: Maybe<Scalars["Float"]["output"]>;
  current_price?: Maybe<Scalars["Float"]["output"]>;
  favorite_count?: Maybe<Scalars["Float"]["output"]>;
  fully_diluted_valuation?: Maybe<Scalars["Float"]["output"]>;
  id?: Maybe<Scalars["ID"]["output"]>;
  image?: Maybe<Scalars["String"]["output"]>;
  market_cap?: Maybe<Scalars["Float"]["output"]>;
  market_cap_rank?: Maybe<Scalars["Float"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  symbol?: Maybe<Scalars["String"]["output"]>;
  total_supply?: Maybe<Scalars["Float"]["output"]>;
};

export type AssetFinancialDetails = {
  __typename?: "AssetFinancialDetails";
  categories?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["ID"]["output"]>;
  market_cap?: Maybe<Scalars["Float"]["output"]>;
  max_supply?: Maybe<Scalars["Float"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  percent_change_3Floatd?: Maybe<Scalars["Float"]["output"]>;
  percent_change_7d?: Maybe<Scalars["Float"]["output"]>;
  percent_change_24h?: Maybe<Scalars["Float"]["output"]>;
  price?: Maybe<Scalars["Float"]["output"]>;
  price_btc?: Maybe<Scalars["Float"]["output"]>;
  symbol?: Maybe<Scalars["String"]["output"]>;
  timeSeries?: Maybe<Array<Maybe<LunarAssetDetails>>>;
  volume_24h?: Maybe<Scalars["Float"]["output"]>;
};

export type AssetGeckoDescription = {
  __typename?: "AssetGeckoDescription";
  en?: Maybe<Scalars["String"]["output"]>;
};

export type AssetPairResponse = {
  __typename?: "AssetPairResponse";
  pairData?: Maybe<Array<Maybe<AssetPairs24Hours>>>;
};

export type AssetPairs24Hours = {
  __typename?: "AssetPairs24Hours";
  FULLNAME?: Maybe<Scalars["String"]["output"]>;
  ID?: Maybe<Scalars["String"]["output"]>;
  MKTCAPPENALTY?: Maybe<Scalars["Float"]["output"]>;
  NAME?: Maybe<Scalars["String"]["output"]>;
  SUPPLY?: Maybe<Scalars["Float"]["output"]>;
  SYMBOL?: Maybe<Scalars["String"]["output"]>;
  VOLUME24HOURTO?: Maybe<Scalars["Float"]["output"]>;
};

export type BtcMacros = {
  __typename?: "BTCMacros";
  macro_data?: Maybe<Array<Maybe<MacroData>>>;
};

export type Balance = {
  __typename?: "Balance";
  balances?: Maybe<Array<Maybe<BalancesObject>>>;
};

export type BalancesObject = {
  __typename?: "BalancesObject";
  balance?: Maybe<Scalars["Float"]["output"]>;
  symbol?: Maybe<Scalars["String"]["output"]>;
  ticker?: Maybe<Scalars["String"]["output"]>;
  usd?: Maybe<Scalars["Float"]["output"]>;
};

export type BlockchainDataDetails = {
  __typename?: "BlockchainDataDetails";
  active_addresses?: Maybe<Scalars["Float"]["output"]>;
  average_transaction_value?: Maybe<Scalars["Float"]["output"]>;
  block_height?: Maybe<Scalars["Float"]["output"]>;
  block_size?: Maybe<Scalars["Float"]["output"]>;
  block_time?: Maybe<Scalars["Float"]["output"]>;
  current_supply?: Maybe<Scalars["Float"]["output"]>;
  difficulty?: Maybe<Scalars["Float"]["output"]>;
  hashrate?: Maybe<Scalars["Float"]["output"]>;
  large_transaction_count?: Maybe<Scalars["Float"]["output"]>;
  new_addresses?: Maybe<Scalars["Float"]["output"]>;
  symbol?: Maybe<Scalars["String"]["output"]>;
  time?: Maybe<Scalars["Int"]["output"]>;
  transaction_count?: Maybe<Scalars["Float"]["output"]>;
  transaction_count_all_time?: Maybe<Scalars["Float"]["output"]>;
  unique_addresses_all_time?: Maybe<Scalars["Float"]["output"]>;
  zero_balance_addresses_all_time?: Maybe<Scalars["Float"]["output"]>;
};

export enum CategoryType {
  Btc = "BTC",
  Business = "BUSINESS",
  Exchange = "EXCHANGE",
  Ico = "ICO",
}

export type CodeAdditionType = {
  __typename?: "CodeAdditionType";
  additions?: Maybe<Scalars["Float"]["output"]>;
  deletions?: Maybe<Scalars["Float"]["output"]>;
};

export type CryptoCompareHistory = {
  __typename?: "CryptoCompareHistory";
  blockchainData?: Maybe<Array<Maybe<BlockchainDataDetails>>>;
  priceData?: Maybe<Array<Maybe<PriceDetails>>>;
};

export type DaysCollectiveStats = {
  __typename?: "DaysCollectiveStats";
  asset_count?: Maybe<Scalars["Float"]["output"]>;
  date?: Maybe<Scalars["Date"]["output"]>;
  followed_assets?: Maybe<Scalars["Float"]["output"]>;
  top_assets?: Maybe<Array<Maybe<TopAsset>>>;
  user_count?: Maybe<Scalars["Float"]["output"]>;
};

export type DifficultyRibbonData = {
  __typename?: "DifficultyRibbonData";
  ma2FloatFloat?: Maybe<Scalars["Float"]["output"]>;
  ma4Float?: Maybe<Scalars["Float"]["output"]>;
  ma6Float?: Maybe<Scalars["Float"]["output"]>;
  ma9?: Maybe<Scalars["Float"]["output"]>;
  ma9Float?: Maybe<Scalars["Float"]["output"]>;
  ma14?: Maybe<Scalars["Float"]["output"]>;
  ma25?: Maybe<Scalars["Float"]["output"]>;
  ma128?: Maybe<Scalars["Float"]["output"]>;
  t?: Maybe<Scalars["Float"]["output"]>;
};

export type FavoriteInput = {
  asset?: InputMaybe<FavoritesDataInput>;
  email?: InputMaybe<Scalars["String"]["input"]>;
};

export type FavoritesData = {
  __typename?: "FavoritesData";
  image?: Maybe<Scalars["String"]["output"]>;
  symbol?: Maybe<Scalars["String"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
};

export type FavoritesDataInput = {
  image?: InputMaybe<Scalars["String"]["input"]>;
  symbol?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type GeckoAssetDetails = {
  __typename?: "GeckoAssetDetails";
  block_time_in_minutes?: Maybe<Scalars["Float"]["output"]>;
  categories?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  coingecko_rank?: Maybe<Scalars["Float"]["output"]>;
  coingecko_score?: Maybe<Scalars["Float"]["output"]>;
  community_data?: Maybe<GeckoCommunityData>;
  community_score?: Maybe<Scalars["Float"]["output"]>;
  description?: Maybe<AssetGeckoDescription>;
  developer_score?: Maybe<Scalars["Float"]["output"]>;
  devloper_data?: Maybe<GeckoDeveloperData>;
  favorite_count?: Maybe<Scalars["Float"]["output"]>;
  genesis_date?: Maybe<Scalars["String"]["output"]>;
  hashing_algorithm?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  liquidity_score?: Maybe<Scalars["Float"]["output"]>;
  market_cap_rank?: Maybe<Scalars["Float"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  public_interest_score?: Maybe<Scalars["Float"]["output"]>;
  sentiment_votes_down_percentage?: Maybe<Scalars["Float"]["output"]>;
  sentiment_votes_up_percentage?: Maybe<Scalars["Float"]["output"]>;
  symbol?: Maybe<Scalars["String"]["output"]>;
};

export type GeckoCommunityData = {
  __typename?: "GeckoCommunityData";
  reddit_accounts_active_48h?: Maybe<Scalars["Float"]["output"]>;
  reddit_average_comments_48h?: Maybe<Scalars["Float"]["output"]>;
  reddit_average_posts_48h?: Maybe<Scalars["Float"]["output"]>;
  reddit_subscribers?: Maybe<Scalars["Float"]["output"]>;
  telegram_channel_user_count?: Maybe<Scalars["Float"]["output"]>;
  twitter_followers?: Maybe<Scalars["Float"]["output"]>;
};

export type GeckoDeveloperData = {
  __typename?: "GeckoDeveloperData";
  code_additions_deletions_4_weeks?: Maybe<CodeAdditionType>;
  commit_count_4_weeks?: Maybe<Scalars["Float"]["output"]>;
  forks?: Maybe<Scalars["Float"]["output"]>;
  pull_request_contributors?: Maybe<Scalars["Float"]["output"]>;
  pull_requests_merged?: Maybe<Scalars["Float"]["output"]>;
  stars?: Maybe<Scalars["Float"]["output"]>;
  subscribers?: Maybe<Scalars["Float"]["output"]>;
};

export type GeckoHistory = {
  __typename?: "GeckoHistory";
  close?: Maybe<Scalars["Float"]["output"]>;
  conversionSymbol?: Maybe<Scalars["String"]["output"]>;
  conversionType?: Maybe<Scalars["String"]["output"]>;
  high?: Maybe<Scalars["Float"]["output"]>;
  low?: Maybe<Scalars["Float"]["output"]>;
  open?: Maybe<Scalars["Float"]["output"]>;
  time?: Maybe<Scalars["Float"]["output"]>;
  volumefrom?: Maybe<Scalars["Float"]["output"]>;
  volumeto?: Maybe<Scalars["Float"]["output"]>;
};

export type ImageParts = {
  __typename?: "ImageParts";
  large?: Maybe<Scalars["String"]["output"]>;
  small?: Maybe<Scalars["String"]["output"]>;
  thumb?: Maybe<Scalars["String"]["output"]>;
};

export type LunarAssetDetails = {
  __typename?: "LunarAssetDetails";
  alt_rank?: Maybe<Scalars["Float"]["output"]>;
  alt_rank_3Floatd?: Maybe<Scalars["Float"]["output"]>;
  alt_rank_hour_average?: Maybe<Scalars["Float"]["output"]>;
  asset_id?: Maybe<Scalars["Int"]["output"]>;
  close?: Maybe<Scalars["Float"]["output"]>;
  correlation_rank?: Maybe<Scalars["Float"]["output"]>;
  galaxy_score?: Maybe<Scalars["Float"]["output"]>;
  high?: Maybe<Scalars["Float"]["output"]>;
  low?: Maybe<Scalars["Float"]["output"]>;
  market_cap?: Maybe<Scalars["Float"]["output"]>;
  market_cap_global?: Maybe<Scalars["Float"]["output"]>;
  market_cap_rank?: Maybe<Scalars["Float"]["output"]>;
  market_dominance?: Maybe<Scalars["Float"]["output"]>;
  open?: Maybe<Scalars["Float"]["output"]>;
  percent_change_24h?: Maybe<Scalars["Float"]["output"]>;
  percent_change_24h_rank?: Maybe<Scalars["Float"]["output"]>;
  price_btc?: Maybe<Scalars["Float"]["output"]>;
  price_score?: Maybe<Scalars["Float"]["output"]>;
  time?: Maybe<Scalars["Int"]["output"]>;
  volatility?: Maybe<Scalars["Float"]["output"]>;
  volume?: Maybe<Scalars["Float"]["output"]>;
  volume_24h_rank?: Maybe<Scalars["Float"]["output"]>;
};

export type MacroData = {
  __typename?: "MacroData";
  TWAP?: Maybe<Scalars["Float"]["output"]>;
  VWAP?: Maybe<Scalars["Float"]["output"]>;
  close?: Maybe<Scalars["Float"]["output"]>;
  high?: Maybe<Scalars["Float"]["output"]>;
  low?: Maybe<Scalars["Float"]["output"]>;
  norm_returns?: Maybe<Scalars["Float"]["output"]>;
  open?: Maybe<Scalars["Float"]["output"]>;
  returns?: Maybe<Scalars["Float"]["output"]>;
  rolling_sharpe?: Maybe<Scalars["Float"]["output"]>;
  time?: Maybe<Scalars["Float"]["output"]>;
  totalvolume?: Maybe<Scalars["Float"]["output"]>;
  volumefrom?: Maybe<Scalars["Float"]["output"]>;
  volumeto?: Maybe<Scalars["Float"]["output"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  addFavorite?: Maybe<User>;
  deleteProduct?: Maybe<Scalars["String"]["output"]>;
  newProduct?: Maybe<Product>;
  removeFavorite?: Maybe<User>;
  updateProduct?: Maybe<Product>;
  updateUsername?: Maybe<User>;
};

export type MutationAddFavoriteArgs = {
  input?: InputMaybe<FavoriteInput>;
};

export type MutationDeleteProductArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationNewProductArgs = {
  input?: InputMaybe<ProductInput>;
};

export type MutationRemoveFavoriteArgs = {
  input?: InputMaybe<FavoriteInput>;
};

export type MutationUpdateProductArgs = {
  id: Scalars["ID"]["input"];
  input?: InputMaybe<ProductInput>;
};

export type MutationUpdateUsernameArgs = {
  input?: InputMaybe<UsernameInput>;
};

export type NewsFeedEntries = {
  __typename?: "NewsFeedEntries";
  body?: Maybe<Scalars["String"]["output"]>;
  categories?: Maybe<CategoryType>;
  downvotes?: Maybe<Scalars["String"]["output"]>;
  guid?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  imageurl?: Maybe<Scalars["String"]["output"]>;
  lang?: Maybe<Scalars["String"]["output"]>;
  published_on?: Maybe<Scalars["Float"]["output"]>;
  source?: Maybe<Scalars["String"]["output"]>;
  source_info?: Maybe<SourceInfo>;
  tags?: Maybe<Scalars["String"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
  upvotes?: Maybe<Scalars["String"]["output"]>;
  url?: Maybe<Scalars["String"]["output"]>;
};

export type Post = {
  __typename?: "Post";
  category?: Maybe<Scalars["String"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  header_image?: Maybe<Scalars["String"]["output"]>;
  post_content?: Maybe<Scalars["String"]["output"]>;
  post_title?: Maybe<Scalars["String"]["output"]>;
  publish_date?: Maybe<Scalars["Date"]["output"]>;
  section?: Maybe<Scalars["String"]["output"]>;
  slug?: Maybe<Scalars["String"]["output"]>;
};

export type PostInput = {
  category?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  header_image?: InputMaybe<Scalars["String"]["input"]>;
  post_content?: InputMaybe<Scalars["String"]["input"]>;
  post_title?: InputMaybe<Scalars["String"]["input"]>;
  publish_date?: InputMaybe<Scalars["Date"]["input"]>;
  section?: InputMaybe<Scalars["String"]["input"]>;
  slug?: InputMaybe<Scalars["String"]["input"]>;
};

export type PriceDetails = {
  __typename?: "PriceDetails";
  close?: Maybe<Scalars["Float"]["output"]>;
  conversionSymbol?: Maybe<Scalars["String"]["output"]>;
  conversionType?: Maybe<Scalars["String"]["output"]>;
  high?: Maybe<Scalars["Float"]["output"]>;
  low?: Maybe<Scalars["Float"]["output"]>;
  open?: Maybe<Scalars["Float"]["output"]>;
  time?: Maybe<Scalars["Float"]["output"]>;
  volumefrom?: Maybe<Scalars["Float"]["output"]>;
  volumeto?: Maybe<Scalars["Float"]["output"]>;
};

export type PriceObject = {
  __typename?: "PriceObject";
  info?: Maybe<Scalars["Float"]["output"]>;
  symbol?: Maybe<Scalars["String"]["output"]>;
};

export type Product = {
  __typename?: "Product";
  description?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["ID"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  price?: Maybe<Scalars["Float"]["output"]>;
  productionCapacity?: Maybe<Scalars["Int"]["output"]>;
};

export type ProductInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
  price: Scalars["Float"]["input"];
  productionCapacity: Scalars["Int"]["input"];
};

export type Query = {
  __typename?: "Query";
  getAsset?: Maybe<Array<Maybe<Asset>>>;
  getAssetFinancialDetails?: Maybe<CryptoCompareHistory>;
  getAssetHistory?: Maybe<CryptoCompareHistory>;
  getAssetPairs?: Maybe<AssetPairResponse>;
  getAssetPriceData?: Maybe<Array<Maybe<PriceObject>>>;
  getAssets?: Maybe<Array<Maybe<Asset>>>;
  getBTCMacros?: Maybe<BtcMacros>;
  getCollectiveStats?: Maybe<DaysCollectiveStats>;
  getDifficultyRibbons?: Maybe<Array<Maybe<DifficultyRibbonData>>>;
  getGeckoAssetDetails?: Maybe<GeckoAssetDetails>;
  getNewsFeed?: Maybe<Array<Maybe<NewsFeedEntries>>>;
  getPost?: Maybe<Post>;
  getPosts?: Maybe<Array<Maybe<Post>>>;
  getProduct?: Maybe<Product>;
  getProducts?: Maybe<Array<Maybe<Product>>>;
  getUser?: Maybe<User>;
  getUserExchangeData?: Maybe<Balance>;
};

export type QueryGetAssetArgs = {
  symbol: Scalars["String"]["input"];
};

export type QueryGetAssetFinancialDetailsArgs = {
  symbol: Scalars["String"]["input"];
  time?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryGetAssetHistoryArgs = {
  symbol: Scalars["String"]["input"];
  time?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryGetAssetPairsArgs = {
  symbol: Scalars["String"]["input"];
};

export type QueryGetAssetPriceDataArgs = {
  exchange_data?: InputMaybe<UserExchangeInput>;
  tickers?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryGetAssetsArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryGetBtcMacrosArgs = {
  symbol: Scalars["String"]["input"];
};

export type QueryGetDifficultyRibbonsArgs = {
  cut?: InputMaybe<Scalars["Int"]["input"]>;
  symbol?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryGetGeckoAssetDetailsArgs = {
  name: Scalars["String"]["input"];
  time?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryGetPostArgs = {
  slug?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryGetPostsArgs = {
  filter?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryGetProductArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryGetUserArgs = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryGetUserExchangeDataArgs = {
  input?: InputMaybe<UserExchangeInput>;
};

export type SourceInfo = {
  __typename?: "SourceInfo";
  img?: Maybe<Scalars["String"]["output"]>;
  lang?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
};

export type TopAsset = {
  __typename?: "TopAsset";
  favorite_count?: Maybe<Scalars["Float"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  symbol?: Maybe<Scalars["String"]["output"]>;
};

export type User = {
  __typename?: "User";
  createAt?: Maybe<Scalars["Date"]["output"]>;
  email?: Maybe<Scalars["String"]["output"]>;
  favorites?: Maybe<Array<Maybe<FavoritesData>>>;
  id?: Maybe<Scalars["ID"]["output"]>;
  image?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  username?: Maybe<Scalars["String"]["output"]>;
};

export type UserExchangeInput = {
  private_key?: InputMaybe<Scalars["String"]["input"]>;
  public_key?: InputMaybe<Scalars["String"]["input"]>;
};

export type UsernameInput = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  username: Scalars["String"]["input"];
};
