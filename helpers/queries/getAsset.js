import { gql } from "@apollo/client";

export default gql`
  query GET_ASSET($symbol: String!) {
    getAsset(symbol: $symbol) {
      id
      name
      symbol
      image {
        thumb
        small
      }
    }
  }
`;
