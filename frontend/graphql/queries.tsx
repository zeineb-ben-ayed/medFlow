import { gql } from "@apollo/client";

export const GET_ALL_STAFF = gql`
  query GetAllStaff {
    getAllStaff {
      id
      role
      firstName
      lastName
      email
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
