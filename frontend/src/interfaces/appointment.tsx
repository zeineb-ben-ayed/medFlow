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
export interface GetMedecinBookedSlotsResponse {
  getMedecinBookedSlots: {
    id: number;
    time: string;
  }[];
}
export interface Medecin {
  id: number;
  specialite: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export interface AppointmentFromQuery {
  id: number;
  date: string;
  time: string;
  medecin: Medecin;
}

export interface AppointmentEnriched {
  id: number;
  doctor: {
    name: string;
    specialty: string;
    phone: string;
    email: string;
  };
  date: string;
  time: string;
  duration: string;
  realStatus: 'completed' | 'scheduled';
}

export interface QueryData {
  getAppointmentsByPatientId: AppointmentFromQuery[];
}
