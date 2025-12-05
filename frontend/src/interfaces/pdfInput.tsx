import { Medication } from "./medication";
import { Patient } from "./patient";

export interface PrescriptionPdfInput {
  patient: Patient;
  symptoms: string;
  diagnosis: string;
  notes?: string;
  medications: Medication[];
  doctorName?: string;
}
