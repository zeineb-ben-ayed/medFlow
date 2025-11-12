"use client";
import { useState } from "react";
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
import { Column, ReusableTable } from "@/components/table/reusableTable";
import { useRouter } from "next/navigation";
import { Search } from "@/components/Input/Search";

const PatientList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // Mock data
  const patients = [
    {
      id: "1",
      name: "Sarah Johnson",
      age: 34,
      gender: "Female",
      phone: "+1 234-567-8901",
      email: "sarah.j@email.com",
      lastVisit: "2024-03-15",
      status: "Active",
    },
    {
      id: "2",
      name: "Michael Chen",
      age: 45,
      gender: "Male",
      phone: "+1 234-567-8902",
      email: "m.chen@email.com",
      lastVisit: "2024-03-10",
      status: "Active",
    },
    {
      id: "3",
      name: "Emma Williams",
      age: 28,
      gender: "Female",
      phone: "+1 234-567-8903",
      email: "emma.w@email.com",
      lastVisit: "2024-02-28",
      status: "Inactive",
    },
  ];

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const router = useRouter();

  const columns: Column<(typeof patients)[0]>[] = [
    { key: "name", label: "Patient Name" },
    { key: "age", label: "Age", align: "center" },
    { key: "gender", label: "Gender", align: "center" },
    {
      key: "contact",
      label: "Contact",
      render: (_, row) => (
        <div className="flex flex-col gap-1 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Phone className="h-3 w-3" />
            {row.phone}
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Mail className="h-3 w-3" />
            {row.email}
          </div>
        </div>
      ),
    },
    { key: "lastVisit", label: "Last Visit" },
    {
      key: "status",
      label: "Status",
      render: (value) => (
        <Badge variant={value === "Active" ? "default" : "secondary"}>
          {value}
        </Badge>
      ),
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
            <Trash className="h-4 w-4" />
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
            <Button className="w-full md:w-auto gap-2">
              <Plus className="h-4 w-4" />
              Add New Patient
            </Button>
          </div>
        </div>

        {/* Patient Table */}
        <ReusableTable columns={columns} data={patients} />
      </div>
    </div>
  );
};

export default PatientList;
