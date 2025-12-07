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

export const DELETE_USER = gql`
  mutation DeleteUser($id: Int!) {
    deleteUser(id: $id)
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

export const CREATE_CONSULTATION = gql`
  mutation CreateConsultation($data: CreateConsultationInput!) {
    createConsultation(data: $data) {
      id
      symptoms
      diagnosis
      additionalNotes
      patient {
        id
      }
      prescription {
        id
        name
        dosage
        frequency
        duration
      }
    }
  }
`;

export const REFRESH_MUTATION = gql`
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      access_token
      refresh_token
    }
  }
`;

export const DELETE_PATIENT = gql`
  mutation DeletePatient($id: Int!) {
    deletePatient(id: $id)
  }
`;

export const EDIT_PROFILE = gql`
  mutation EditProfile($updateData: UpdateUserDto!) {
    editProfile(updateData: $updateData) {
      id
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
      role
    }
  }
`;
export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;

export const CREATE_APPOINTMENT = gql`
  mutation CreateAppointment(
    $date: String!
    $time: String!
    $patientKeycloakId: String!
    $medecinId: Int!
  ) {
    createAppointment(
      data: {
        date: $date
        time: $time
        patientKeycloakId: $patientKeycloakId
        medecinId: $medecinId
      }
    ) {
      id
      date
      time
      status
      patient {
        firstName
        lastName
      }
      medecin {
        firstName
        lastName
      }
    }
  }
`;
