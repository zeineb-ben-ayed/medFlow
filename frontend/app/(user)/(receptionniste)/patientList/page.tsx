"use client";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Eye, Edit, Phone, Mail, Trash } from "lucide-react";
import { ReusableTable } from "@/components/table/reusableTable";
import { useRouter } from "next/navigation";
import { Search } from "@/components/Input/Search";
import { useQuery } from "@apollo/client/react";
import { FIND_ALL_PATIENTS } from "@/graphql/query";
import { client } from "@/lib/apollo-client";
import { FindAllPatientsData, Patient } from "@/interfaces/patient";
import { Column } from "@/interfaces/column";

const PatientList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { data, loading, error } = useQuery<FindAllPatientsData>(
    FIND_ALL_PATIENTS,
    { client }
  );

  const patients = data?.findAllPatients || [];

  const filteredPatients = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return patients;

    return patients.filter((p) => {
      const dateString = p.dateNaissance
        ? new Date(p.dateNaissance)
            .toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long", //  "November"
              year: "numeric",
            })
            .toLowerCase()
        : "";

      return [p.firstName, p.lastName, p.email, dateString]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(query));
    });
  }, [searchQuery, patients]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // const filteredPatients = patients.filter(
  //   (patient) =>
  //     patient.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     patient.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     patient.dateNaissance.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  const columns: Column<Patient>[] = [
    {
      key: "name",
      label: "Patient Name",
      render: (_, row) => `${row.firstName} ${row.lastName}`,
    },
    {
      key: "email",
      label: "Email",
      render: (_, row) => row.email,
    },
    {
      key: "contact",
      label: "Contact",
      render: (_, row) => (
        <div className="flex flex-col gap-1 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Phone className="h-3 w-3" />
            {row.phoneNumber}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4 shrink-0" />
            <span className="truncate">{row.email}</span>
          </div>
        </div>
      ),
    },
    {
      key: "dateNaissance",
      label: "Date of Birth",
      align: "center",
      render: (value, row) => {
        const date = value || row.dateNaissance;
        if (!date) return "—";
        try {
          // Format to readable date (e.g., 12 Nov 2025)
          return new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
        } catch {
          return date; // fallback if not parseable
        }
      },
    },
    {
      key: "gender",
      label: "Gender",
      align: "center",
      render: (value) => {
        const gender = value?.toLowerCase?.() || "unknown";
        const isFemale = gender === "female";
        return (
          <Badge variant={isFemale ? "default" : "secondary"}>
            {value || "N/A"}
          </Badge>
        );
      },
    },
    {
      key: "actions",
      label: "Actions",
      align: "end",
      render: (_, row) => (
        <div className="flex justify-end gap-2">
          <Button
            className="cursor-pointer"
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/patients/${row.id}`)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            className="cursor-pointer"
            size="sm"
            onClick={() => router.push(`/patients/${row.id}/edit`)}
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/30 to-white p-6 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Left title and  description */}
          <div className="flex flex-col">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Patient Management
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base mt-1">
              Manage patient records and information
            </p>
          </div>

          {/* Right search and  button */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-4 w-full md:w-auto">
            {/* Search bar */}
            <div className="w-full md:w-64 lg:w-80">
              <Search
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search patients by name or email..."
                className="w-full"
              />
            </div>

            {/* Add button */}
            <Button
              className="w-full md:w-auto gap-2"
              onClick={() => router.push("/patientAdd")}
            >
              <Plus className="h-4 w-4" />
              Add New Patient
            </Button>
          </div>
        </div>

        {/* Patient Table */}
        <ReusableTable columns={columns} data={filteredPatients} />
      </div>
    </div>
  );
};

export default PatientList;
