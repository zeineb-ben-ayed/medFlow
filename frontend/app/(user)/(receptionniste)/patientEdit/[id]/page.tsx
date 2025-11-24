"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import PatientForm from "@/components/patient/patientForm";
import { Patient } from "@/interfaces/patient";
import {
  ADD_PATIENT_MUTATION,
  EDIT_PATIENT_MUTATION,
} from "@/graphql/mutations";
import { useMutation, useQuery } from "@apollo/client/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { GET_PATIENT_BY_ID } from "@/graphql/query";

export default function EditPatientPage() {
  const router = useRouter();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const { data, loading: fetching } = useQuery<
    { getPatientById: Patient },
    { id: number }
  >(GET_PATIENT_BY_ID, {
    variables: { id: Number(id) },
    skip: !id,
    fetchPolicy: "network-only",
  });

  const [updatePatient] = useMutation(EDIT_PATIENT_MUTATION);

  const [formData, setFormData] = useState<Patient | null>(null);

  useEffect(() => {
    if (data?.getPatientById) {
      setFormData(data.getPatientById);
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
    <Card className="max-w-3xl mx-auto p-6">
      <CardHeader className="pb-4">
        <CardTitle className="text-3xl font-semibold">Edit Patient</CardTitle>
        <CardDescription>
          Update the patient's information below to keep their record accurate.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PatientForm
          mode="edit"
          initialData={formData}
          onSubmit={handleSubmit}
        />
      </CardContent>
    </Card>
  );
}
