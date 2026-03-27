import { gql } from "@apollo/client";

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
