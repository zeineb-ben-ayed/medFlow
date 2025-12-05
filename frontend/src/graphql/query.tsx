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
