import { gql } from "@apollo/client";

export const FIND_ALL_PATIENTS = gql`
  query FindAllPatients {
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

export const GET_PATIENT = gql`
  query GetPatient($id: Int!) {
    getPatientProfile(id: $id) {
      id
      firstName
      lastName
      email
      phoneNumber
      dateNaissance
      gender
      bloodType
      address
      emergencyName
      emergencyPhone
      allergies
      historiqueMedical
    }
  }
`;

export const GET_PROFILE = gql`
  query GetProfile {
    getProfile {
      id
      role
      firstName
      lastName
      email
      dateNaissance
      phoneNumber
      ... on Medecin {
        specialite
        disponibilite
      }

      ... on Receptionniste {
        poste
        horaires
      }
    }
  }
`;

export const GET_MY_MEDECIN_APPOINTMENTS = gql`
  query GetMyMedecinAppointments {
    getMyMedecinAppointments {
      id
      date
      time
      patient {
        id
        firstName
        lastName
      }
    }
  }
`;

export const GET_PATIENT_APPOINTMENTS_FOR_ME = gql`
  query GetPatientAppointmentsForMe($patientId: Int!) {
    getPatientAppointmentsForMe(patientId: $patientId) {
      id
      date
      time
    }
  }
`;
