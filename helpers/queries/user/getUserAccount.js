import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GET_USER($email: String!) {
    getUser(email: $email) {
      id
      email
      name
      username
      image
      createAt
      favorites {
        title
        symbol
        image
      }
    }
  }
`;
