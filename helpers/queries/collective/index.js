import { gql } from "@apollo/client";

export const GET_COLLECTIVE_STATS = gql`
  query GET_COLLECTIVE_STATS {
    getCollectiveStats {
      user_count
      asset_count
      followed_assets
      top_assets {
        favorite_count
        id
        name
        symbol
      }
      date
    }
  }
`;
