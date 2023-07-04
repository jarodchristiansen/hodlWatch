import { gql } from "@apollo/client/core";

export const GET_NEWS_FEED = gql`
  query GetNewsFeed {
    getNewsFeed {
      guid
      body
      published_on
      imageurl
      title
      url
      tags
      lang
      source
      source_info {
        name
        img
      }
      downvotes
      upvotes
    }
  }
`;

export const GET_ASSET_NEWS = gql`
  query GetAssetNews($symbol: String!) {
    getAssetNews(symbol: $symbol) {
      guid
      body
      published_on
      imageurl
      title
      url
      tags
      lang
      source
      source_info {
        name
        img
      }
      downvotes
      upvotes
    }
  }
`;
