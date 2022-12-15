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
