import { gql } from "@apollo/client";

export default gql`
query {
    getProducts {
        description
        id
        name
        productionCapacity
        price
    }
}
`