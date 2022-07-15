import { gql } from "@apollo/client";

export default gql`
  mutation AddProduct($input: ProductInput) {
    newProduct(input: $input) {
      id
      name
      productionCapacity
      price
    }
  }
`;
