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
    $phoneNumber: String!
    $extraData: ExtraDataInput
  ) {
    register(
      username: $username
      email: $email
      password: $password
      role: $role
      dateNaissance: $dateNaissance
      firstName: $firstName
      lastName: $lastName
      phoneNumber: $phoneNumber
      extraData: $extraData
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

export const ADD_PATIENT_MUTATION = gql`
  mutation AddPatient($input: CreatePatientInput!) {
    addPatient(input: $input) {
      id
      firstName
      lastName
      email
      phoneNumber
      dateNaissance
      historiqueMedical
      gender
      bloodType
      address
      emergencyName
      emergencyPhone
      allergies
      keycloak_id
    }
  }
`;
export const EDIT_PATIENT_MUTATION = gql`
  mutation EditPatient($input: CreatePatientInput!) {
    editPatient(input: $input) {
      id
      keycloak_id
      firstName
      lastName
      email
      phoneNumber
      dateNaissance
      historiqueMedical
      gender
      bloodType
      address
      emergencyName
      emergencyPhone
      allergies
    }
  }
`;
