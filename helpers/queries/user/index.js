import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GET_USER($email: String, $id: String) {
    getUser(email: $email, id: $id) {
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

export const GET_USER_HOLDINGS = gql`
  query getUserExchangeData($input: UserExchangeInput) {
    getUserExchangeData(input: $input) {
      balances {
        symbol
        balance
        ticker
        usd
      }
    }
  }
`;
