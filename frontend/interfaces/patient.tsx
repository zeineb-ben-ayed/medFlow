export interface Patient {
  id: string;
  keycloak_id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateNaissance: string;
  gender: string;
  role: string;
  historiqueMedical?: string;
}

export interface FindAllPatientsData {
  findAllPatients: Patient[];
}
