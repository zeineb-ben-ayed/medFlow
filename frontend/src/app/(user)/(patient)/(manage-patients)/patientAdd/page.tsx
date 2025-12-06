"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import PatientForm from "@/src/components/patient/patientForm";
import { Patient } from "@/src/interfaces/patient";
import { ADD_PATIENT_MUTATION } from "@/src/graphql/mutations";
import { useMutation } from "@apollo/client/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/src/components/ui/card";
import PageBreadcrumb from "@/src/components/layout/PageBreadcrumb";
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
    <>
      <PageBreadcrumb pageTitle="Add Patient" />
      <div className="w-full p-4 sm:p-6 lg:p-8 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="w-full space-y-6">
          {/* Header Section */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Left: Title + Description */}
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                Add New Patient
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Fill in the patient's information to create a new record
              </p>
            </div>
          </div>
          <PatientForm mode="create" onSubmit={handleSubmit} />
        </div>
        {loading && <p className="mt-2 text-gray-500">Submitting...</p>}
      </div>
    </>
  );
}
