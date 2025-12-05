"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, Plus, X, Download } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Textarea } from "@/src/components/ui/textarea";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Separator } from "@/src/components/ui/separator";
import { Badge } from "@/src/components/ui/badge";
import PageBreadcrumb from "@/src/components/layout/PageBreadcrumb";
import { FindAllPatientsData } from "@/src/interfaces/patient";
import { FIND_ALL_PATIENTS } from "@/src/graphql/query";
import { client } from "@/src/lib/apollo-client";
import { useMutation, useQuery } from "@apollo/client/react";
import { CREATE_CONSULTATION } from "@/src/graphql/mutations";
import { Medication } from "@/src/interfaces/medication";
import { pdf } from "@react-pdf/renderer";
import PrescriptionPDF from "@/src/components/PrescriptionPDF";

export async function downloadPrescriptionPDF(prescriptionData: any) {
  const blob = await pdf(<PrescriptionPDF {...prescriptionData} />).toBlob();

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;

  a.download = `prescription_${prescriptionData.patientName}_${new Date()
    .toISOString()
    .slice(0, 10)}.pdf`;

  a.click();
  URL.revokeObjectURL(url);
}

export default function ConsultationsPage() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfReady, setPdfReady] = useState(false);
  const { data } = useQuery<FindAllPatientsData>(FIND_ALL_PATIENTS, { client });

  const patients = data?.findAllPatients || [];

  const [createConsultation, { loading }] = useMutation(CREATE_CONSULTATION);

  const [patientId, setPatientId] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [notes, setNotes] = useState("");
  const [medications, setMedications] = useState<Medication[]>([]);
  const [currentMed, setCurrentMed] = useState<Medication>({
    name: "",
    dosage: "",
    frequency: "",
    duration: "",
  });

  const handleAddMedication = () => {
    if (!currentMed.name || !currentMed.dosage) {
      toast.error("Please fill in medication name and dosage");
      return;
    }

    setMedications([...medications, currentMed]);
    setCurrentMed({ name: "", dosage: "", frequency: "", duration: "" });

    toast.success("Medication added");
  };

  const handleRemoveMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  const handleSaveConsultation = async () => {
    if (!patientId) {
      toast.error("Please select a patient");
      return;
    }

    if (!symptoms.trim() || !diagnosis.trim()) {
      toast.error("Symptoms and diagnosis are required");
      return;
    }

    try {
      const { data } = await createConsultation({
        variables: {
          data: {
            patientId: Number(patientId),
            symptoms,
            diagnosis,
            additionalNotes: notes || null,
            medications: medications.map((m) => ({
              name: m.name,
              dosage: m.dosage,
              frequency: m.frequency,
              duration: m.duration,
            })),
          },
        },
      });

      toast.success("Consultation successfully recorded!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save consultation.");
    }
  };

  const buildPrescriptionData = () => {
    const selectedPatient = patients.find((p) => p.id === patientId);

    return {
      patientName: `${selectedPatient?.firstName} ${selectedPatient?.lastName}`,
      patientId: `MF-${selectedPatient?.id}`,
      date: new Date().toLocaleDateString(),
      physician: "Dr. Sarah Mitchell, MD",
      medications,
      additionalInstructions: notes || "—",
      symptoms,
      diagnosis,
    };
  };

  return (
    <>
      <PageBreadcrumb pageTitle="New Consultation" />
      <div className="w-full p-4 sm:p-6 lg:p-8 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="w-full space-y-6">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              New Consultation
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Record patient consultation and create prescription
            </p>
          </div>

          {/* Patient Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-3">
                <Label>Select Patient *</Label>
                <Select value={patientId} onValueChange={setPatientId}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select a patient..." />
                  </SelectTrigger>

                  <SelectContent className="max-h-80">
                    {patients.map((p) => (
                      <SelectItem key={p.id} value={p.id!}>
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium">
                            {p.firstName.charAt(0)}
                            {p.lastName.charAt(0)}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium">
                              {p.firstName} {p.lastName}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {p.email}
                            </span>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Consultation Form */}
          <Card>
            <CardHeader>
              <CardTitle>Consultation Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Symptoms */}
              <div className="flex flex-col space-y-3">
                <Label htmlFor="symptoms">Symptoms *</Label>
                <Textarea
                  id="symptoms"
                  rows={4}
                  placeholder="Describe the patient's symptoms..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                />
              </div>

              {/* Diagnosis */}
              <div className="flex flex-col space-y-3">
                <Label htmlFor="diagnosis">Diagnosis *</Label>
                <Textarea
                  id="diagnosis"
                  rows={3}
                  placeholder="Enter diagnosis..."
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                />
              </div>

              {/* Notes */}
              <div className="flex flex-col space-y-3">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  rows={3}
                  placeholder="Any additional observations..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Prescription Builder */}
          <Card>
            <CardHeader>
              <CardTitle>Prescription</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Add Medication */}
              <div className="space-y-4 p-4 border-2 border-dashed rounded-xl">
                <h3 className="font-semibold">Add Medication</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="flex flex-col space-y-3">
                    <Label>Medication Name</Label>
                    <Input
                      placeholder="e.g., Amoxicillin"
                      value={currentMed.name}
                      onChange={(e) =>
                        setCurrentMed({ ...currentMed, name: e.target.value })
                      }
                    />
                  </div>

                  {/* Dosage */}
                  <div className="flex flex-col space-y-3">
                    <Label>Dosage</Label>
                    <Input
                      placeholder="e.g., 500mg"
                      value={currentMed.dosage}
                      onChange={(e) =>
                        setCurrentMed({ ...currentMed, dosage: e.target.value })
                      }
                    />
                  </div>

                  {/* Frequency */}
                  <div className="flex flex-col space-y-3">
                    <Label>Frequency</Label>
                    <Select
                      value={currentMed.frequency}
                      onValueChange={(v) =>
                        setCurrentMed({ ...currentMed, frequency: v })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="once">Once daily</SelectItem>
                        <SelectItem value="twice">Twice daily</SelectItem>
                        <SelectItem value="thrice">
                          Three times daily
                        </SelectItem>
                        <SelectItem value="four">Four times daily</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Duration */}
                  <div className="flex flex-col space-y-3">
                    <Label>Duration</Label>
                    <Input
                      placeholder="e.g., 7 days"
                      value={currentMed.duration}
                      onChange={(e) =>
                        setCurrentMed({
                          ...currentMed,
                          duration: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <Button
                  onClick={handleAddMedication}
                  className="gap-2 w-full md:w-auto"
                >
                  <Plus className="h-4 w-4" />
                  Add Medication
                </Button>
              </div>

              {/* Medications List */}
              {medications.length > 0 && (
                <>
                  <Separator />

                  <div className="space-y-3">
                    <h3 className="font-semibold">Prescribed Medications</h3>

                    {medications.map((med, index) => (
                      <div
                        key={index}
                        className="flex items-start justify-between p-4 bg-accent/20 rounded-xl"
                      >
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-primary" />
                            <p className="font-medium">{med.name}</p>
                            <Badge variant="outline">{med.dosage}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {med.frequency} • {med.duration}
                          </p>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveMedication(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4">
            <Button
              size="lg"
              className="flex-1 gap-2"
              onClick={handleSaveConsultation}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Consultation"}
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="flex-1 gap-2"
              disabled={medications.length === 0}
              onClick={() => {
                if (!patientId) {
                  toast.error("Please select a patient first");
                  return;
                }
                setIsGenerating(true);
                setPdfReady(true);
                const pdfData = buildPrescriptionData();
                downloadPrescriptionPDF(pdfData);
              }}
            >
              <Download className="h-4 w-4" />
              {isGenerating ? "Generating..." : "Download PDF"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
