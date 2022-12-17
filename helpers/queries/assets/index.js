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
      description {
        en
      }
    }
  }
`;
