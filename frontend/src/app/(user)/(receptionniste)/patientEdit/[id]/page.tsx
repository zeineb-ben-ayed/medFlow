"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
<<<<<<<< HEAD:frontend/src/app/(user)/(receptionniste)/patientEdit/[id]/page.tsx
import PatientForm from "@/components/patient/patientForm";
========
import PatientForm from "@/src/components/patient/patientForm";
>>>>>>>> debca883138e8d7c5948a0ebc1e1fb71cd76c81d:frontend/src/app/(user)/(patient)/(manage-patients)/patientEdit/[id]/page.tsx
import { Patient } from "@/src/interfaces/patient";
import {
  ADD_PATIENT_MUTATION,
  EDIT_PATIENT_MUTATION,
} from "@/src/graphql/mutations";
import { useMutation, useQuery } from "@apollo/client/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
<<<<<<<< HEAD:frontend/src/app/(user)/(receptionniste)/patientEdit/[id]/page.tsx
} from "@/components/ui/card";
========
} from "@/src/components/ui/card";
>>>>>>>> debca883138e8d7c5948a0ebc1e1fb71cd76c81d:frontend/src/app/(user)/(patient)/(manage-patients)/patientEdit/[id]/page.tsx
import { GET_PATIENT } from "@/src/graphql/query";

export default function EditPatientPage() {
  const router = useRouter();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const { data, loading: fetching } = useQuery<
    { getPatientById: Patient },
    { id: number }
  >(GET_PATIENT, {
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
