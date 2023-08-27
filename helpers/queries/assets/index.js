import { gql } from "@apollo/client";

export const GET_GECKO_DETAILS = gql`
  query getGeckoAssetDetails($name: String!, $time: Int) {
    getGeckoAssetDetails(name: $name, time: $time) {
      id
      symbol
      name
      block_time_in_minutes
      hashing_algorithm
      categories
      genesis_date
      sentiment_votes_up_percentage
      sentiment_votes_down_percentage
      market_cap_rank
      coingecko_rank
      coingecko_score
      developer_score
      community_score
      liquidity_score
      favorite_count
      description {
        en
      }
    }
  }
`;

export const GET_ASSET_SOCIALS = gql`
  query GetAssetSocials($symbol: String!) {
    getAssetSocialData(symbol: $symbol) {
      time
      comments
      posts
      followers
      points
      overview_page_views
      analysis_page_views
      markets_page_views
      charts_page_views
      trades_page_views
      forum_page_views
      influence_page_views
      total_page_views
      fb_likes
      fb_talking_about
      twitter_followers
      twitter_following
      twitter_lists
      twitter_favourites
      twitter_statuses
      reddit_subscribers
      reddit_active_users
      reddit_posts_per_hour
      reddit_posts_per_day
      reddit_comments_per_hour
      reddit_comments_per_day
      code_repo_stars
      code_repo_forks
      code_repo_subscribers
      code_repo_open_pull_issues
      code_repo_closed_pull_issues
      code_repo_open_issues
      code_repo_closed_issues
      code_repo_contributors
    }
  }
`;

export const GET_ASSET = gql`
  query GET_ASSET($symbol: String!, $type: String) {
    getAsset(symbol: $symbol, type: $type) {
      id
      name
      symbol
      image
    }
  }
`;

export const GET_DIFFICULTY_RIBBONS = gql`
  query GetDifficultyRibbons($symbol: String, $cut: Int) {
    getDifficultyRibbons(symbol: $symbol, cut: $cut) {
      t
      ma128
      ma14
      ma200
      ma25
      ma40
      ma60
      ma9
      ma90
    }
  }
`;

export const GET_ASSETS_V2 = gql`
  query GET_ASSETS($offset: Int, $limit: Int) {
    getAssets(offset: $offset, limit: $limit) {
      id
      name
      symbol
      image
    }
  }
`;

export const GET_ASSETS = gql`
  query GET_ASSETS($offset: Int, $limit: Int) {
    getAssets(offset: $offset, limit: $limit) {
      id
      name
      symbol
      image
      current_price
      market_cap
      market_cap_rank
      fully_diluted_valuation
      circulating_supply
      total_supply
      ath
      ath_change_percentage
      ath_date
      atl
      atl_change_percentage
      atl_date
    }
  }
`;
