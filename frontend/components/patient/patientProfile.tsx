"use client";

import { useState } from "react";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Heart,
  Droplet,
  AlertCircle,
  FileText,
  Calendar,
  Shield,
  Stethoscope
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InfoField } from "../Fields/infoFields";
import { PatientProfileType } from "@/interfaces/patient";

interface PatientProfileProps {
  patient: PatientProfileType;
  appointments?: { date: string; reason: string }[];
}

export const PatientProfile = ({ patient, appointments = [] }: PatientProfileProps) => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const safeString = (v?: string | null, fallback = "—"): string => (v ?? fallback);
  const safeNumberOrString = (v?: string | number | null, fallback = "—"): string | number =>
    v === null || v === undefined ? fallback : v;

  const generatePatientId = (id?: number | string) => {
    const n = typeof id === "number" ? id : Number(id ?? 0);
    return `PT-${String(isNaN(n) ? 0 : n).padStart(4, "0")}`;
  };

  const formatDateToLocale = (date?: string | null) => {
    if (!date) return "—";
    const d = new Date(date);
    if (isNaN(d.getTime())) return safeString(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const calculateAge = (birth?: string | null) => {
    if (!birth) return "—";
    const d = new Date(birth);
    if (isNaN(d.getTime())) return "—";
    const today = new Date();
    let age = today.getFullYear() - d.getFullYear();
    const m = today.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age--;
    return age;
  };

  const splitByComma = (str?: string | null) =>
    str ? str.split(",").map(s => s.trim()).filter(Boolean) : [];

  const patientId = generatePatientId(patient?.id);
  const age = calculateAge(patient?.dateNaissance);
  const stats = [
    { label: "Last Visit", value: "No visit recorded", icon: Calendar, color: "text-muted-foreground" },
    { label: "Age", value: `${age} years`, icon: User, color: "text-primary" },
    { label: "Insurance", value: "Medicare Advantage", icon: Shield, color: "text-accent-foreground" },
  ];
  const firstName = safeString(patient?.firstName, "Unknown");
  const lastName = safeString(patient?.lastName, "");
  const initials = `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/30 to-white p-6 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
  <div className="flex flex-col">
    <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
      Patient Profile
    </h1>
    <p className="text-muted-foreground text-sm sm:text-base mt-1">
      Complete medical and personal information
    </p>
  </div>
</div>


{/*HEADER CARD */}
<Card className="border-2 shadow-sm">
  <CardContent className="p-0">
    <div className="bg-gradient-to-br from-primary/5 to-secondary/20 p-6 md:p-8">
      <div className="flex flex-col lg:flex-row items-start gap-6">

        <div className="relative flex-shrink-0">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl border-4 border-background shadow-lg overflow-hidden bg-gradient-to-br from-primary/20 to-accent/30 flex items-center justify-center">
           <div className="bg-white/80 rounded-full w-16 h-16 flex items-center justify-center">
  <User className="w-10 h-10 text-[var(--color-primary)]" />
</div>

          </div>
        </div>
        <div className="flex-1 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              {patient.firstName} {patient.lastName}
            </h2>

            <div className="flex gap-2">
              {patient.bloodType && (
                <Badge variant="outline" className="border-primary text-primary">
                  {patient.bloodType}
                </Badge>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border">
                <div className="flex items-center gap-2">
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  <span className="text-xs font-medium text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
                <p className="text-sm font-bold text-foreground mt-1">{stat.value}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  </CardContent>
</Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="p-1.5 border-2 shadow-sm w-full lg:w-auto bg-background">
            <TabsTrigger value="overview" className="flex-1 lg:flex-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <User className="w-4 h-4 mr-2" /> Overview
            </TabsTrigger>
            <TabsTrigger value="medical" className="flex-1 lg:flex-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <FileText className="w-4 h-4 mr-2" /> Medical
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex-1 lg:flex-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Calendar className="w-4 h-4 mr-2" /> Appointments
            </TabsTrigger>
          </TabsList>

          {/* OVERVIEW */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              <Card className="border-2 shadow-sm hover:shadow-md transition-all lg:col-span-2">
                <CardHeader className="border-b-2 border-border pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center">
                      <User className="w-5 h-5 text-primary-foreground" />
                    </div>
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoField label="Patient ID" value={patientId} icon={User} />
                    <InfoField label="Date of Birth" value={formatDateToLocale(patient?.dateNaissance)} icon={Calendar} />
                    <InfoField label="Age" value={`${calculateAge(patient?.dateNaissance)} years`} icon={User} />
                    <InfoField label="Gender" value={safeString(patient?.gender)} icon={User} />
                    <InfoField label="Blood Type" value={safeString(patient?.bloodType)} icon={Droplet} />
                    <InfoField label="Assigned Doctor" value={"Not assigned"} icon={Stethoscope} />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 shadow-sm hover:shadow-md transition-all">
                <CardHeader className="border-b-2 border-border pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    Contact Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <InfoField label="Email" value={safeString(patient?.email)} icon={Mail} fullWidth />
                  <InfoField label="Phone" value={safeString(patient?.phoneNumber)} icon={Phone} fullWidth />
                  <InfoField label="Address" value={safeString(patient?.address)} icon={MapPin} fullWidth />
                </CardContent>
              </Card>

              <Card className="border-2 shadow-sm hover:shadow-md transition-all lg:col-span-3">
                <CardHeader className="border-b-2 border-border pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-white" />
                    </div>
                    Emergency Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-red-50 border-2 border-red-200 rounded-xl p-5">
                      <label className="text-sm font-semibold text-red-700 mb-2 flex items-center gap-2">Contact Name</label>
                      <div className="flex items-center gap-2">
                        <User className="w-5 h-5 text-red-600" />
                        <p className="text-foreground font-bold text-lg">{safeString(patient?.emergencyName)}</p>
                      </div>
                    </div>
                    <div className="bg-red-50 border-2 border-red-200 rounded-xl p-5">
                      <label className="text-sm font-semibold text-red-700 mb-2 flex items-center gap-2">Contact Phone</label>
                      <div className="flex items-center gap-2">
                        <Phone className="w-5 h-5 text-red-600" />
                        <p className="text-foreground font-bold text-lg">{safeString(patient?.emergencyPhone)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>
          </TabsContent>

          {/* TAB */}
          <TabsContent value="medical" className="space-y-6">
            <div className="space-y-6">

              <Card className="border-2 shadow-sm hover:shadow-md transition-all bg-card">
                <CardContent className="p-6">

                  <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-border">
                    <div className="p-3 rounded-xl bg-secondary">
                      <Heart className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold text-foreground">Medical History</h2>
                  </div>

                  <div className="space-y-3">
                    {splitByComma(patient?.historiqueMedical).length === 0 ? (
                      <div className="p-4 rounded-lg border bg-card">No medical history recorded.</div>
                    ) : (
                      splitByComma(patient?.historiqueMedical).map((condition, index) => (
                        <div
                          key={index}
                          className="group p-4 rounded-lg border bg-card hover:bg-muted transition-all duration-200"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3 flex-1">
                              <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-primary"></div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg mb-1 text-foreground">{condition}</h3>
                              </div>
                            </div>

                            <span className="text-xs px-3 py-1 rounded-full bg-accent text-accent-foreground font-medium">Recorded</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 shadow-sm hover:shadow-md transition-all bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-border">
                    <div className="p-3 rounded-xl bg-secondary">
                      <AlertCircle className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-semibold text-foreground">Allergies</h2>
                      <p className="text-sm mt-1 text-muted-foreground">Known allergic reactions</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {splitByComma(patient?.allergies).length === 0 ? (
                      <Badge variant="outline" className="px-3 py-2 text-sm rounded-full">No known allergies</Badge>
                    ) : (
                      splitByComma(patient?.allergies).map((allergy, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="px-3 py-2 text-sm rounded-full bg-accent text-accent-foreground border-accent flex items-center gap-2"
                        >
                          <AlertCircle className="w-3 h-3" />
                          {allergy}
                        </Badge>
                      ))
                    )}
                  </div>

                </CardContent>
              </Card>

            </div>
          </TabsContent>

          {/* APPOINTMENTS */}
          <TabsContent value="appointments">
            <Card className="border-2 shadow-sm">
              <CardHeader className="border-b-2 border-border">
                <CardTitle className="flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-primary" /> Upcoming Appointments
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center text-muted-foreground py-8">
                  {appointments.length === 0 ? (
                    <>
                      <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                      <p className="text-lg font-medium">No upcoming appointments</p>
                      <p className="text-sm">Schedule a new appointment to see it here</p>
                    </>
                  ) : (
                    appointments.map((a, i) => (
                      <div key={i} className="p-4 border rounded-lg mb-2">
                        <p><b>Date:</b> {formatDateToLocale(a.date)}</p>
                        <p><b>Reason:</b> {safeString(a.reason)}</p>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
};

export default PatientProfile;
