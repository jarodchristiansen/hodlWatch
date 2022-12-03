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
