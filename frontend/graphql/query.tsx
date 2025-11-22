import { gql } from "@apollo/client";

export const FIND_ALL_PATIENTS = gql`
  query {
    findAllPatients {
      id
      keycloak_id
      firstName
      lastName
      email
      role
      historiqueMedical
      gender
      phoneNumber
      dateNaissance
    }
  }
`;
