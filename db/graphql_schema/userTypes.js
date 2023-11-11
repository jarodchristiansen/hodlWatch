// userTypes.js
import { gql } from "apollo-server-micro";

export const userTypeDefs = gql`
  type User {
    id: ID
    email: String
    name: String
    username: String
    image: String
    createAt: Date
    favorites: [FavoritesData]
  }

  input UsernameInput {
    username: String!
    email: String
  }

  type FavoritesData {
    title: String
    symbol: String
    image: String
  }

  input FavoritesDataInput {
    title: String
    symbol: String
    image: String
  }

  type CodeAdditionType {
    additions: Float
    deletions: Float
  }

  input FavoriteInput {
    asset: FavoritesDataInput
    email: String
  }

  input UserExchangeInput {
    public_key: String
    private_key: String
  }
`;
