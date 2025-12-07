import { gql } from "@apollo/client";

export const GET_ALL_STAFF = gql`
  query GetAllStaff {
    getAllStaff {
      id
      role
      firstName
      lastName
      email
      phoneNumber
      dateNaissance
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
export const GET_ALL_MEDECINS = gql`
  query GetAllMedecins {
    getAllMedecins {
      id
      firstName
      lastName
      email
      phoneNumber
      specialite
      disponibilite
    }
  }
`;
export const GET_MEDECIN_BOOKED_SLOTS = gql`
  query GetMedecinBookedSlots($medecinId: Int!, $date: String!) {
    getMedecinBookedSlots(medecinId: $medecinId, date: $date) {
      id
      time
    }
  }
`;
export const GET_APPOINTMENTS = gql`
  query getAppointmentsByPatientId($patientKeycloakId: String!) {
    getAppointmentsByPatientId(patientKeycloakId: $patientKeycloakId) {
      id
      date
      time
      medecin {
        id
        specialite
        firstName
        lastName
        email
        phoneNumber
}
        }
}
`;
export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    getCurrentUser {
      id
      username
      firstName
      lastName
      email
      roles
    }
  }
`;
