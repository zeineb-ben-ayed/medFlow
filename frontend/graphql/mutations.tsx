import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
  mutation Register(
    $username: String!
    $email: String!
    $password: String!
    $role: String!
    $dateNaissance: String!
    $firstName: String!
    $lastName: String!
  ) {
    register(
      username: $username
      email: $email
      password: $password
      role: $role
      dateNaissance: $dateNaissance
      firstName: $firstName
      lastName: $lastName
    )
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      access_token
      refresh_token
      expires_in
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: Int!) {
    deleteUser(id: $id)
  }
`;