"use client";
import { useQuery } from "@apollo/client/react";
import { useParams } from "next/navigation";
<<<<<<< HEAD
import { GET_PATIENT, GET_PATIENT_APPOINTMENTS_FOR_ME } from "@/src/graphql/query";
import { PatientProfile } from "@/components/patient/patientProfile";
import { GetPatientData, GetPatientVars } from "@/src/interfaces/patient";
import { GetPatientAppointmentsData, GetPatientAppointmentsVars } from "@/src/interfaces/appointment";

export default function PatientDetailsPage() {
  const params = useParams();
  console.log("params:", params);
  const { id } = useParams();

   const patientId = Number(params.id);
 
  const {
    data: patientData,
    loading: patientLoading,
    error: patientError
  } = useQuery<GetPatientData, GetPatientVars>(GET_PATIENT, {
    variables: { id: Number(id) },
  });

  const {
    data: appointmentsData,
    loading: appointmentsLoading,
    error: appointmentsError,
  } = useQuery<GetPatientAppointmentsData, GetPatientAppointmentsVars>(GET_PATIENT_APPOINTMENTS_FOR_ME, {
    variables: { patientId },
  });


  if (patientLoading || appointmentsLoading) return <p>Loading...</p>;
  if (patientError) return <p>Error loading patient.</p>;
  if (appointmentsError) return <p>Error loading appointments.</p>;

  if (!patientData?.getPatientProfile)
    return <p>No patient found</p>;

  return (
    <div className="p-6">
      <PatientProfile
        patient={patientData.getPatientProfile}
        appointments={appointmentsData?.getPatientAppointmentsForMe || []}
      />
=======
import { GET_PATIENT } from "@/src/graphql/query";
import { PatientProfile } from "@/components/patient/patientProfile";
import { GetPatientData, GetPatientVars } from "@/src/interfaces/patient";


export default function PatientDetailsPage() {
  const { id } = useParams();

  const { data, loading, error } = useQuery<GetPatientData, GetPatientVars>(GET_PATIENT, {
    variables: { id: Number(id) }
  });

  const appointments: any[] = [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading patient.</p>;
  if (!data?.getPatientProfile) return <p>No patient found</p>;


  return (
    <div className="p-6">
      <PatientProfile patient={data.getPatientProfile} appointments={appointments} />
>>>>>>> a23e035820c5b81a223ebe19afbb460fe228e5aa
    </div>
  );
}
