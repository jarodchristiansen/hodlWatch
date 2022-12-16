import { gql } from "@apollo/client";

// export const CREATE_USER = gql`
//   mutation CreateUser($input: UserInput) {
//     createUser(input: $input) {
//       createAt
//       email
//       id
//       image
//       name
//       username
//     }
//   }
// `;

// Condense the below 2 mutations into 1 query/resolver
export const REMOVE_FAVORITE = gql`
  mutation removeFavorite($input: FavoriteInput) {
    removeFavorite(input: $input) {
      email
      id
      name
      username
      favorites {
        title
        symbol
        image
      }
    }
  }
`;

export const ADD_FAVORITE = gql`
  mutation addFavorite($input: FavoriteInput) {
    addFavorite(input: $input) {
      email
      id
      name
      username
      favorites {
        title
        symbol
        image
      }
    }
  }
`;

export const UPDATE_USERNAME = gql`
  mutation updateUsername($input: UsernameInput) {
    updateUsername(input: $input) {
      createAt
      email
      id
      image
      name
      username
    }
  }
`;
