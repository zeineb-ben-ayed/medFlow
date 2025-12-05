export interface Appointment {
  id: number;
  date: string;        
  time: string;        
  status: "scheduled" | "completed" | "cancelled";
  patientName: string;
  doctorName: string;
  duration: number;
  reason: string;
  type: string;
}
export interface GetMyMedecinAppointmentsResponse {
  getMyMedecinAppointments: {
    id: number;
    date: string;
    time: string;
    patient: {
      id: number;
      firstName: string;
      lastName: string;
    };
  }[];
}
export interface AppointmentByPatient {
  id: number;
  date: string;
  time: string;
}
export interface GetPatientAppointmentsData {
  getPatientAppointmentsForMe: AppointmentByPatient[];
}

export interface GetPatientAppointmentsVars {
  patientId: number;
}
