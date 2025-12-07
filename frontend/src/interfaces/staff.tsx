export interface Staff {
  id: string;
  role: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  dateNaissance?: string;
  phoneNumber?: string;
  disponibilite?: boolean;
  poste?: string;
  horaires?: string;
  specialite?: string;
}

export type Profile = {
  id: number;
  role: "admin" | "medecin" | "receptionniste";
  firstName: string;
  lastName: string;
  email: string;
  specialite?: string;
  disponibilite?: boolean;
  poste?: string;
  horaires?: string;
  phoneNumber?: string;
  dateNaissance?: string;
};
export type GetAllMedecinsResponse = {
  getAllMedecins: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    specialite: string;
    disponibilite: string;
  }[];
};
