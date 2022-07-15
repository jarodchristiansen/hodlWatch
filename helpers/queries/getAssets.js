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

export default gql`
  query GET_ASSETS($offset: Int, $limit: Int) {
    getAssets(offset: $offset, limit: $limit) {
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
