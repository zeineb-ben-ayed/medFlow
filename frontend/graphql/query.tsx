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
export const GET_PATIENT_BY_ID = gql`
  query GetPatientById($id: Int!) {
    getPatientById(id: $id) {
      id
      username
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
