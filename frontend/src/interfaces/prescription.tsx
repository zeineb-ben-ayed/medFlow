import { Medication } from "./medication";

export interface PrescriptionData {
  patientName: string;
  patientId: string;
  date: string;
  physician: string;
  medications: Medication[];
  additionalInstructions: string;
}
