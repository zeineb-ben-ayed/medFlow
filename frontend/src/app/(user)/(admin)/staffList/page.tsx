"use client";
import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Plus, Eye, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Search } from "@/src/components/Input/Search";
import { ReusableTable } from "@/src/components/table/reusableTable";
import { GET_ALL_STAFF } from "@/src/graphql/queries";
import { useMutation, useQuery } from "@apollo/client/react";
import { Staff } from "@/src/interfaces/staff";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import DeleteDialog from "@/src/components/ui/deleteDialog";
import { DELETE_USER, REGISTER_MUTATION } from "@/src/graphql/mutations";
import AddDialog from "@/src/components/ui/addDialog";
import { Input } from "@/src/components/ui/input";
import { DatePicker } from "@/src/components/ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Label } from "@/src/components/ui/label";
import PageBreadcrumb from "@/src/components/layout/PageBreadcrumb";
import { toast } from "sonner";
import { Column } from "@/src/interfaces/column";

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
    })) || [];

  const filteredStaff = staff.filter(
    (s) =>
      `${s.firstName} ${s.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      s.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (date: string | Date | undefined): string => {
    if (!date) return "—"; // handles undefined safely

    try {
      return new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return String(date);
    }
  };

  const columns: Column<Staff>[] = [
    {
      key: "fullName",
      label: "Full Name",
      render: (_, row) => `${row.firstName || ""} ${row.lastName || ""}`,
    },
    {
      key: "email",
      label: "Email",
    },
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
      key: "phoneNumber",
      label: "Phone",
      render: (value, row) => value || row.phoneNumber || "—",
    },
    {
      key: "dateNaissance",
      label: "Date of Birth",
      align: "center",
      render: (value, row) => formatDate(value || row.dateNaissance),
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
            className="cursor-pointer"
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
            className="cursor-pointer"
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData((prev) => ({ ...prev, dateNaissance: date || new Date() }));
  };

  const handleSubmit = () => {
    const extraData =
      role === "medecin"
        ? {
            specialite: formData.specialite,
            disponibilite: formData.disponibilite,
          }
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
    })
      .then(() => {
        setAddDialogOpen(false);
        toast.success("Staff member added successfully!");
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
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to add staff member");
      });
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Staff" />

      <div className="w-full p-4 sm:p-6 lg:p-8 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="w-full space-y-6">
          {/* Header Section */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Left: Title + Description */}
            <div className="space-y-1">
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
                    <Plus className="h-4 w-4" />
                    Add New Staff
                  </Button>
                }
              >
                <div className="grid gap-4">
                  <Label>Username</Label>
                  <Input
                    type="text"
                    name="username"
                    placeholder="JhonDeo"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />

                  <Label>First Name</Label>
                  <Input
                    type="text"
                    name="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />

                  <Label>Last Name</Label>
                  <Input
                    type="text"
                    name="lastName"
                    placeholder="Deo"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />

                  <Label>Email</Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="example@gmail.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />

                  <Label>Phone Number</Label>
                  <Input
                    type="text"
                    name="phoneNumber"
                    placeholder="+216 00 000 000"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />

                  <Label>Password</Label>
                  <Input
                    type="password"
                    name="password"
                    placeholder="*******"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />

                  <Label>Date Of Birth</Label>
                  <DatePicker
                    value={formData.dateNaissance}
                    onChange={handleDateChange}
                    maxDate={new Date()}
                  />

                  <Label>Role</Label>
                  <Select
                    value={role}
                    onValueChange={(value) => setRole(value as any)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sélectionner un rôle" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="medecin">Médecin</SelectItem>
                      <SelectItem value="receptionniste">
                        Réceptionniste
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  {role === "medecin" && (
                    <>
                      <Label>Speciality</Label>
                      <Input
                        type="text"
                        name="specialite"
                        placeholder="Speciality"
                        value={formData.specialite}
                        onChange={handleInputChange}
                      />

                      <Label>Disponibility</Label>
                      <Select
                        value={formData.disponibilite ? "true" : "false"}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            disponibilite: value === "true",
                          }))
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Disponibilité" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="true">Available</SelectItem>
                          <SelectItem value="false">Not Available</SelectItem>
                        </SelectContent>
                      </Select>
                    </>
                  )}

                  {role === "receptionniste" && (
                    <>
                      <Label>Poste</Label>
                      <Input
                        type="text"
                        name="poste"
                        placeholder="Poste"
                        value={formData.poste}
                        onChange={handleInputChange}
                      />

                      <Label>Shift</Label>
                      <Input
                        type="text"
                        name="horaires"
                        placeholder="shift"
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
                  <p>
                    <strong>Email:</strong> {selectedStaff.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {selectedStaff.phoneNumber}
                  </p>
                  <p>
                    <strong>Date of birth:</strong>{" "}
                    {formatDate(selectedStaff.dateNaissance)}
                  </p>

                  {selectedStaff.role === "medecin" && (
                    <>
                      <p>
                        <strong>Speciality:</strong>{" "}
                        {selectedStaff.specialite || "—"}
                      </p>
                      <p>
                        <strong>Disponibility:</strong>{" "}
                        {selectedStaff.disponibilite !== undefined
                          ? selectedStaff.disponibilite
                            ? "Disponible"
                            : "Non disponible"
                          : "—"}
                      </p>
                    </>
                  )}

                  {selectedStaff.role === "receptionniste" && (
                    <>
                      <p>
                        <strong>Position:</strong> {selectedStaff.poste || "—"}
                      </p>
                      <p>
                        <strong>Working Hours:</strong>{" "}
                        {selectedStaff.horaires || "—"}
                      </p>
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
    </>
  );
};

export default StaffList;
