"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Eye, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Search } from "@/components/Input/Search";
import { Column, ReusableTable } from "@/components/table/reusableTable";
import { GET_ALL_STAFF } from "@/graphql/queries";
import { useMutation, useQuery } from "@apollo/client/react";
import { Staff } from "@/interfaces/staff";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import DeleteDialog from "@/components/ui/deleteDialog";
import { DELETE_USER, REGISTER_MUTATION } from "@/graphql/mutations";
import AddDialog from "@/components/ui/addDialog";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";


interface GetAllStaffResponse {
  getAllStaff: Staff[];
}

const StaffList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState<Staff | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [role, setRole] = useState<"medecin" | "receptionniste">("medecin");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dateNaissance: new Date(),
    phoneNumber: "",
    specialite: "",
    disponibilite: true,
    poste: "",
    horaires: "",
  });

  const { data, loading, error } = useQuery<GetAllStaffResponse>(GET_ALL_STAFF);

  const [deleteUser] = useMutation(DELETE_USER, {
    refetchQueries: ["GetAllStaff"],
    onError: (err) => console.error(err),
  });

  const [registerUser] = useMutation(REGISTER_MUTATION, {
    refetchQueries: ["GetAllStaff"],
    onError: (err) => console.error(err),
  });

  const staff: Staff[] =
    data?.getAllStaff?.map((user: any) => ({
      ...user,
      phone: "+216 50 000 000",
    })) || [];

  const filteredStaff = staff.filter(
    (s) =>
      `${s.firstName} ${s.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      s.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: Column<Staff>[] = [
    {
      key: "fullName",
      label: "Full Name",
      render: (_, row) => `${row.firstName || ""} ${row.lastName || ""}`,
    },
    { key: "email", label: "Email" },
    {
      key: "role",
      label: "Role",
      render: (value) => (
        <Badge
          variant={
            value === "medecin"
              ? "default"
              : value === "receptionniste"
                ? "secondary"
                : "outline"
          }
        >
          {value}
        </Badge>
      ),
    },
    {
      key: "phone",
      label: "Phone",
    },
    {
      key: "actions",
      label: "Actions",
      align: "end",
      render: (_, row) => (
        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedStaff(row);
              setOpen(true);
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setStaffToDelete(row);
              setDeleteDialogOpen(true);
            }}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-8 text-red-500">
        Error loading staff: {error.message}
      </p>
    );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData(prev => ({ ...prev, dateNaissance: date || new Date() }));
  };

  const handleSubmit = () => {
    const extraData =
      role === "medecin"
        ? { specialite: formData.specialite, disponibilite: formData.disponibilite }
        : { poste: formData.poste, horaires: formData.horaires };

    registerUser({
      variables: {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role,
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateNaissance: formData.dateNaissance
          ? formData.dateNaissance.toISOString().split("T")[0]
          : "",
        phoneNumber: formData.phoneNumber,
        extraData,
      },
    }).then(() => {
      setAddDialogOpen(false);
      setFormData({
        username: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        dateNaissance: new Date(),
        phoneNumber: "",
        specialite: "",
        disponibilite: true,
        poste: "",
        horaires: "",
      });
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/30 to-white p-6 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Staff Management
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base mt-1">
              Manage doctors and receptionists
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-4 w-full md:w-auto">
            <div className="w-full md:w-64 lg:w-80">
              <Search
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search staff by name or email..."
              />
            </div>

            <AddDialog
              open={addDialogOpen}
              onOpenChange={setAddDialogOpen}
              title="Add New Staff"
              description="Fill out the form to create a new staff member"
              onSubmit={handleSubmit}
              triggerButton={
                <Button className="w-full md:w-auto gap-2">
                  <Plus className="h-4 w-4" /> Add New Staff
                </Button>
              }
            >
              <div className="grid gap-4">

                {/* Username */}
                <Input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />

                {/* First Name */}
                <Input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />

                {/* Last Name */}
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />

                {/* Email */}
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />

                {/* Password */}
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />

                {/* Date of Birth */}
                <DatePicker
                  value={formData.dateNaissance}
                  onChange={handleDateChange}
                  minDate={new Date()}
                  maxDate={new Date("2099-12-31")}
                />

                {/* Role Selector */}
                <select
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  required
                >
                  <option value="medecin">Médecin</option>
                  <option value="receptionniste">Réceptionniste</option>
                </select>

                {/* CONDITIONAL FIELDS depending on role */}

                {role === "medecin" && (
                  <>
                    <Input
                      type="text"
                      name="specialite"
                      placeholder="Spécialité"

                      value={formData.specialite}
                      onChange={handleInputChange}
                    />

                    <select
                      name="disponibilite"

                      value={formData.disponibilite ? "true" : "false"}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          disponibilite: e.target.value === "true",
                        }))
                      }
                    >
                      <option value="true">Disponible</option>
                      <option value="false">Non disponible</option>
                    </select>
                  </>
                )}

                {role === "receptionniste" && (
                  <>
                    <Input
                      type="text"
                      name="poste"
                      placeholder="Poste"

                      value={formData.poste}
                      onChange={handleInputChange}
                    />

                    <Input
                      type="text"
                      name="horaires"
                      placeholder="Horaires"

                      value={formData.horaires}
                      onChange={handleInputChange}
                    />
                  </>
                )}
              </div>
            </AddDialog>

          </div>
        </div>

        <ReusableTable columns={columns} data={filteredStaff} />

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {selectedStaff?.firstName} {selectedStaff?.lastName}
                <Badge className="ml-2">{selectedStaff?.role}</Badge>
              </DialogTitle>
            </DialogHeader>

            {selectedStaff && (
              <div className="space-y-3 mt-4">
                <p><strong>Email:</strong> {selectedStaff.email}</p>
                <p><strong>Phone:</strong> {selectedStaff.phone}</p>

                {/* Doctor special fields */}
                {selectedStaff.role === "medecin" && (
                  <>
                    <p><strong>Speciality:</strong> {selectedStaff.specialite || "—"}</p>
                    <p><strong>Disponibility:</strong> {selectedStaff.disponibilite || "—"}</p>
                  </>
                )}

                {/* Receptionist special fields */}
                {selectedStaff.role === "receptionniste" && (
                  <>
                    <p><strong>Position:</strong> {selectedStaff.poste || "—"}</p>
                    <p><strong>Working Hours:</strong> {selectedStaff.horaires || "—"}</p>
                  </>
                )}
              </div>
            )}

            <DialogFooter>
              <Button onClick={() => setOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <DeleteDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={() => {
            if (staffToDelete) {
              deleteUser({ variables: { id: staffToDelete.id } });
              setStaffToDelete(null);
            }
          }}
          title="Delete Staff"
          description={`Are you sure you want to delete ${staffToDelete?.firstName} ${staffToDelete?.lastName}?`}
        />
      </div>
    </div>
  );
};

export default StaffList;