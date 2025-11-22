"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import PatientForm from "@/components/patient/patientForm";
import { Patient } from "@/interfaces/patient";
import { ADD_PATIENT_MUTATION } from "@/graphql/mutations";
import { useMutation } from "@apollo/client/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
export default function CreatePatientPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [addPatient] = useMutation(ADD_PATIENT_MUTATION);

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "Patient@123",
    phoneNumber: "",
    dateNaissance: "",
    historiqueMedical: "",
    gender: "",
    bloodType: "",
    address: "",
    emergencyName: "",
    emergencyPhone: "",
    allergies: "",
  });

  const handleSubmit = async (data: Patient) => {
    try {
      await addPatient({
        variables: { input: data },
      });

      toast.success("Patient created!");
      router.push("/patientList");
    } catch (error) {
      toast.error("Error creating patient");
    }
  };

  return (
    <Card className="max-w-3xl mx-auto p-6">
      <CardHeader className="pb-4">
        <CardTitle className="text-3xl font-semibold">
          Add New Patient
        </CardTitle>
        <CardDescription>
          Fill in the patient's information to create a new record
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PatientForm mode="create" onSubmit={handleSubmit} />
      </CardContent>

      {loading && <p className="mt-2 text-gray-500">Submitting...</p>}
    </Card>
  );
}
