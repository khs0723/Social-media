import { gql } from "@apollo/client";

const REGISTER_USER = gql`
  mutation register(
    $userName: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        userName: $userName
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      userName
      createdAt
      token
    }
  }
`;
// const REGISTER_USER = gql`
//   mutation register {
//     register(
//       registerInput: {
//         userName: $userName
//         email: $email
//         password: $password
//         confirmPassword: $confirmPassword
//       }
//     )
//   }
// `;

const LOGIN_USER = gql`
  mutation login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      id
      email
      userName
      createdAt
      token
    }
  }
`;

export { REGISTER_USER, LOGIN_USER };
