import { gql } from "@apollo/client";

// export default gql`
//   query GET_ASSETS {
//     getAssets {
//       id
//       name
//       symbol
//       image {
//         thumb
//         small
//       }
//     }
//   }
// `;

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
