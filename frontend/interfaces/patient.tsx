export interface Patient {
  id?: string;
  keycloak_id?: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  dateNaissance: string;
  gender: string;
  role?: string;
  historiqueMedical?: string;
  bloodType?: string;
  address?: string;
  emergencyName?: string;
  emergencyPhone?: string;
  allergies?: string;
}

export interface FindAllPatientsData {
  findAllPatients: Patient[];
}

export type AddPatientResponse = {
  addPatient: {
    id: string;
    keycloak_id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dateNaissance: string;
    gender: string;
    historiqueMedical: string;
  };
};

export type AddPatientVariables = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  dateNaissance: string;
  historiqueMedical?: string;
  gender: string;
};
export interface PatientProfileType {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string | null;
  dateNaissance?: string;
  gender?: string;
  bloodType?: string;
  address?: string;
  emergencyName?: string;
  emergencyPhone?: string;
  allergies?: string;
  historiqueMedical?: string;
}
export interface GetPatientData {
  getPatientProfile: PatientProfileType;
}

export interface GetPatientVars {
  id: number;
}