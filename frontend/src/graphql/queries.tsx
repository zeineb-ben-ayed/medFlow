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

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    getCurrentUser {
      id
      username
      firstName
      lastName
      email
    }
  }
`;
