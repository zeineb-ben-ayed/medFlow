"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import PatientForm from "@/src/components/patient/patientForm";
import { Patient } from "@/src/interfaces/patient";
import { EDIT_PATIENT_MUTATION } from "@/src/graphql/mutations";
import { useMutation, useQuery } from "@apollo/client/react";
import { FIND_ALL_PATIENTS, GET_PATIENT } from "@/src/graphql/query";
import PageBreadcrumb from "@/src/components/layout/PageBreadcrumb";

export default function EditPatientPage() {
  const router = useRouter();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const { data, loading: fetching } = useQuery<
    { getPatientProfile: Patient },
    { id: number }
  >(GET_PATIENT, {
    variables: { id: Number(id) },
    skip: !id,
    fetchPolicy: "network-only",
  });

  const [updatePatient] = useMutation(EDIT_PATIENT_MUTATION, {
    refetchQueries: [{ query: FIND_ALL_PATIENTS }],
  });

  const [formData, setFormData] = useState<Patient | null>(null);

  useEffect(() => {
    console.log("data", data);
    if (data?.getPatientProfile) {
      setFormData(data.getPatientProfile);
    }
  }, [data]);

  const removeTypename = (obj: any) => {
    if (!obj) return obj;
    const newObj = { ...obj };
    delete newObj.__typename;
    return newObj;
  };

  const handleSubmit = async (formValues: Patient) => {
    try {
      setLoading(true);

      await updatePatient({
        variables: {
          input: {
            id: Number(id),
            ...removeTypename(formValues),
          },
        },
      });

      toast.success("Patient updated!");
      router.push("/patientList");
    } catch (error) {
      toast.error("Error updating patient");
    } finally {
      setLoading(false);
    }
  };

  if (fetching || !formData) {
    console.log("this", formData);
    return <p>Loading...</p>;
  }

  return (
    <>
      <PageBreadcrumb pageTitle="Edit Patient" />
      <div className="w-full p-4 sm:p-6 lg:p-8 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="w-full space-y-6">
          {/* Header Section */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Left: Title + Description */}
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                Edit Patient
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Update the patient's information below to keep their record
                accurate.
              </p>
            </div>
          </div>
          <PatientForm
            mode="edit"
            initialData={formData}
            onSubmit={handleSubmit}
          />
        </div>
        {loading && <p className="mt-2 text-gray-500">Updating...</p>}
      </div>
    </>
  );
}
