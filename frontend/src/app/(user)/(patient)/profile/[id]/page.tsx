"use client";
import { useQuery } from "@apollo/client/react";
import { useParams } from "next/navigation";
import { GET_PATIENT } from "@/src/graphql/query";
import { PatientProfile } from "@/src/components/patient/patientProfile";
import { GetPatientData, GetPatientVars } from "@/src/interfaces/patient";
import PageBreadcrumb from "@/src/components/layout/PageBreadcrumb";

export default function PatientDetailsPage() {
  const { id } = useParams();

  const { data, loading, error } = useQuery<GetPatientData, GetPatientVars>(
    GET_PATIENT,
    {
      variables: { id: Number(id) },
    }
  );

  const appointments: any[] = [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading patient.</p>;
  if (!data?.getPatientProfile) return <p>No patient found</p>;

  return (
    <>
      <PageBreadcrumb pageTitle="Patient Profile" />
      <PatientProfile
        patient={data.getPatientProfile}
        appointments={appointments}
      />
    </>
  );
}
