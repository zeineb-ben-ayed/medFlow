"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import { Patient } from "@/interfaces/patient";
import { Save, SquarePen } from "lucide-react";

type PatientFormProps = {
  mode: "create" | "edit";
  onSubmit: (data: Patient) => void;
  defaultValues?: Partial<Patient>;
};

export default function PatientForm({
  mode,
  onSubmit,
  defaultValues = {},
}: PatientFormProps) {
  const [formData, setFormData] = useState<Patient>({
    username: defaultValues.username || "",
    firstName: defaultValues.firstName || "",
    lastName: defaultValues.lastName || "",
    email: defaultValues.email || "",
    password: defaultValues.password || "Patient@123",
    phoneNumber: defaultValues.phoneNumber || "",
    dateNaissance: defaultValues.dateNaissance || "",
    historiqueMedical: defaultValues.historiqueMedical || "",
    gender: defaultValues.gender || "",
    bloodType: defaultValues.bloodType || "",
    address: defaultValues.address || "",
    emergencyName: defaultValues.emergencyName || "",
    emergencyPhone: defaultValues.emergencyPhone || "",
    allergies: defaultValues.allergies || "",
  });

  const update = (key: string, value: string) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <section className="space-y-7">
        <h3 className="text-xl font-semibold">Personal Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-3">
            <Label>Username *</Label>
            <Input
              name="username"
              value={formData.username}
              onChange={(e) => update("username", e.target.value)}
              placeholder="JohnDoe"
            />
          </div>
          <div className="flex flex-col space-y-3">
            <Label>First Name *</Label>
            <Input
              name="firstName"
              value={formData.firstName}
              onChange={(e) => update("firstName", e.target.value)}
              placeholder="John"
            />
          </div>
          <div className="flex flex-col space-y-3">
            <Label>Last Name *</Label>
            <Input
              name="lastName"
              value={formData.lastName}
              onChange={(e) => update("lastName", e.target.value)}
              placeholder="Doe"
            />
          </div>
          <div className="flex flex-col space-y-3">
            <Label>Date Of Birth</Label>
            <Input
              type="date"
              name="dateNaissance"
              value={formData.dateNaissance}
              onChange={(e) => update("dateNaissance", e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-3">
            <Label>Gender *</Label>
            <Select
              value={formData.gender}
              onValueChange={(v) => update("gender", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col space-y-3">
            <Label>Blood Type</Label>
            <Select
              value={formData.bloodType}
              onValueChange={(v) => update("bloodType", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select blood type" />
              </SelectTrigger>
              <SelectContent>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="space-y-7">
        <h3 className="text-xl font-semibold">Contact Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-3">
            <Label>Phone Number *</Label>
            <Input
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => update("phoneNumber", e.target.value)}
              placeholder="+1 234-567-8900"
            />
          </div>
          <div className="flex flex-col space-y-3">
            <Label>Email Address</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="patient@email.com"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <Label>Address</Label>
          <Textarea
            name="address"
            value={formData.address}
            onChange={(e) => update("address", e.target.value)}
            placeholder="123 Main Street, City, State, ZIP"
            rows={2}
          />
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="space-y-7">
        <h3 className="text-xl font-semibold">Emergency Contact</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-3">
            <Label>Emergency Contact Name</Label>
            <Input
              name="emergencyName"
              value={formData.emergencyName}
              onChange={(e) => update("emergencyName", e.target.value)}
              placeholder="Jane Doe"
            />
          </div>
          <div className="flex flex-col space-y-3">
            <Label>Emergency Contact Phone</Label>
            <Input
              name="emergencyPhone"
              value={formData.emergencyPhone}
              onChange={(e) => update("emergencyPhone", e.target.value)}
              placeholder="+1 234-567-8900"
            />
          </div>
        </div>
      </section>

      {/* Medical Information */}
      <section className="space-y-7">
        <h3 className="text-xl font-semibold">Medical Information</h3>
        <div className="flex flex-col space-y-3">
          <Label>Medical History</Label>
          <Textarea
            name="historiqueMedical"
            value={formData.historiqueMedical}
            onChange={(e) => update("historiqueMedical", e.target.value)}
            placeholder="Enter any relevant medical history..."
            rows={4}
          />
        </div>
        <div className="flex flex-col space-y-3">
          <Label>Allergies</Label>
          <Textarea
            name="allergies"
            value={formData.allergies}
            onChange={(e) => update("allergies", e.target.value)}
            placeholder="List any known allergies"
            rows={3}
          />
        </div>
      </section>

      {/* Submit Buttons */}
      <div className="flex gap-4 justify-end pt-4">
        <Button type="button" variant="outline" onClick={() => history.back()}>
          Cancel
        </Button>
        <Button type="submit" className="gap-2">
          {mode === "edit" ? (
            <SquarePen className="h-4 w-4" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {mode === "edit" ? "Edit Patient" : "Save Patient"}
        </Button>
      </div>
    </form>
  );
}
