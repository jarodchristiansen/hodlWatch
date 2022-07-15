import { gql } from "@apollo/client";

export default gql`
  mutation RemoveProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;
