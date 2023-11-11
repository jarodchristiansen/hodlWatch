// socialStatsTypes.js
import { gql } from "apollo-server-micro";

export const socialStatsTypeDefs = gql`
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

  type DaysCollectiveStats {
    user_count: Float
    asset_count: Float
    followed_assets: Float
    top_assets: [TopAsset]
    date: Date
  }
`;
