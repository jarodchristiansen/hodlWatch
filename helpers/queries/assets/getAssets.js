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
    }
  }
`;
