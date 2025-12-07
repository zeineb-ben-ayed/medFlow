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
