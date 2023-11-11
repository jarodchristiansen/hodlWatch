// commonTypes.js
import { gql } from "apollo-server-micro";

export const commonTypeDefs = gql`
  scalar Date

  type ImageParts {
    thumb: String
    small: String
    large: String
  }
`;
