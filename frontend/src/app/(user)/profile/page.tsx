"use client";
import { PersonalInfoSection } from "@/src/components/profileUser/personalInfoSection";
import { ProfileHeader } from "@/src/components/profileUser/profileHeader";
import { ProfileOverviewCard } from "@/src/components/profileUser/profileOverviewCard";
import { Button } from "@/src/components/ui/button";
import { DatePicker } from "@/src/components/ui/date-picker";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Skeleton } from "@/src/components/ui/skeleton";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { Textarea } from "@/src/components/ui/textarea";
import { EDIT_PROFILE } from "@/src/graphql/mutations";
import { GET_PROFILE } from "@/src/graphql/query";
import { Profile } from "@/src/interfaces/staff";
import { useMutation, useQuery } from "@apollo/client/react";
import { Loader2, User } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProfileContent() {
  const { data, loading } = useQuery<{ getProfile: Profile }>(GET_PROFILE);
  const [editProfile, { loading: saving }] = useMutation(EDIT_PROFILE, {
    refetchQueries: [{ query: GET_PROFILE }],
  });
  const profile = data?.getProfile;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateNaissance: "",
    specialite: "",
    disponibilite: false,
    poste: "",
    horaires: "",
    role: "",
    historiqueMedical: "",
    gender: "",
    bloodType: "",
    address: "",
    emergencyName: "",
    emergencyPhone: "",
    allergies: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName ?? "",
        lastName: profile.lastName ?? "",
        email: profile.email ?? "",
        phoneNumber: profile.phoneNumber ?? "",
        dateNaissance: profile.dateNaissance ?? "",
        specialite: profile.specialite ?? "",
        disponibilite: profile.disponibilite ?? false,
        poste: profile.poste ?? "",
        horaires: profile.horaires ?? "",
        role: profile.role ?? "",
        historiqueMedical: profile.historiqueMedical ?? "",
        gender: profile.gender ?? "",
        bloodType: profile.bloodType ?? "",
        address: profile.address ?? "",
        emergencyName: profile.emergencyName ?? "",
        emergencyPhone: profile.emergencyPhone ?? "",
        allergies: profile.allergies ?? "",
      });
    }
  }, [profile]);

  const [open, setOpen] = useState(false);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      const updateData: any = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        dateNaissance: formData.dateNaissance,
      };

      if (formData.role === "medecin") {
        updateData.specialite = formData.specialite;
        updateData.disponibilite = formData.disponibilite;
      } else if (formData.role === "receptionniste") {
        updateData.poste = formData.poste;
        updateData.horaires = formData.horaires;
      } else if (formData.role === "patient") {
        updateData.historiqueMedical = formData.historiqueMedical;
        updateData.gender = formData.gender;
        updateData.bloodType = formData.bloodType;
        updateData.address = formData.address;
        updateData.emergencyName = formData.emergencyName;
        updateData.emergencyPhone = formData.emergencyPhone;
        updateData.allergies = formData.allergies;
      }

      await editProfile({
        variables: { updateData },
      });

      setOpen(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData((prev) => ({
      ...prev,
      dateNaissance: date ? date.toISOString() : "",
    }));
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-48" />
        <Skeleton className="h-64 w-full rounded-xl" />
        <div className="grid md:grid-cols-2 gap-6">
          <Skeleton className="h-48 rounded-xl" />
          <Skeleton className="h-48 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center flex-col py-20">
        <User className="h-16 w-16 text-muted-foreground" />
        <p className="text-lg text-muted-foreground mt-4">No profile found.</p>
      </div>
    );
  }

  return (
    <>
      <ProfileHeader role={profile.role} />

      <ProfileOverviewCard
        profileData={profile}
        onEditClick={() => setOpen(true)}
      />

      <Tabs defaultValue="personal" className="mt-6">
        <TabsList className="bg-secondary/40 rounded-xl p-1">
          <TabsTrigger value="personal">Personal</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <PersonalInfoSection profileData={profile} />
        </TabsContent>
      </Tabs>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-[20px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground">
              Edit Profile
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="personal" className="w-full mt-4">
            <TabsList className="w-full bg-secondary/50 p-1 rounded-[12px]">
              <TabsTrigger
                value="personal"
                className="flex-1 flex items-center gap-2 rounded-[10px] data-[state=active]:bg-card"
              >
                <User className="h-4 w-4" />
                Personal
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="mt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    className="rounded-[12px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    className="rounded-[12px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="rounded-[12px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      handleChange("phoneNumber", e.target.value)
                    }
                    className="rounded-[12px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateNaissance">Date of Birth</Label>
                  <DatePicker
                    value={
                      formData.dateNaissance
                        ? new Date(formData.dateNaissance)
                        : undefined
                    }
                    onChange={handleDateChange}
                    maxDate={new Date()}
                  />
                </div>
                {/* <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    className="rounded-[12px] resize-none"
                    rows={2}
                  />
                </div> */}
                {formData.role === "receptionniste" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="poste">Position</Label>
                      <Input
                        id="poste"
                        type="text"
                        value={formData.poste}
                        onChange={(e) => handleChange("poste", e.target.value)}
                        className="rounded-[12px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="horaires">Shift</Label>
                      <Input
                        id="horaires"
                        type="text"
                        value={formData.horaires}
                        onChange={(e) =>
                          handleChange("horaires", e.target.value)
                        }
                        className="rounded-[12px]"
                      />
                    </div>
                  </>
                )}
                {formData.role === "medecin" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="specialite">Speciality</Label>
                      <Input
                        id="specialite"
                        type="text"
                        value={formData.specialite}
                        onChange={(e) =>
                          handleChange("specialite", e.target.value)
                        }
                        className="rounded-[12px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialite">Disponibility</Label>

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
                          <SelectValue placeholder="Disponibility" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="true">Available</SelectItem>
                          <SelectItem value="false">Not Available</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
                {formData.role === "patient" && (
                  <>
                    {/* HistoriqueMedical */}
                    <div className="space-y-2 md:col-span-2">
                      <Label>Medical History</Label>
                      <Textarea
                        value={formData.historiqueMedical}
                        onChange={(e) => handleChange("historiqueMedical", e.target.value)}
                        className="rounded-[12px] resize-none"
                        rows={2}
                        placeholder="My medical History"
                      />
                    </div>
                    {/* Gender */}
                    <div className="space-y-2">
                      <Label>Gender</Label>
                      <Select
                        value={formData.gender}
                        onValueChange={(v) => handleChange("gender", v)}
                      >
                        <SelectTrigger className="rounded-[12px]">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Blood type */}
                    <div className="space-y-2">
                      <Label>Blood type</Label>
                      <Select
                        value={formData.bloodType}
                        onValueChange={(v) => handleChange("bloodType", v)}
                      >
                        <SelectTrigger className="rounded-[12px]">
                          <SelectValue placeholder="Select blood type" />
                        </SelectTrigger>
                        <SelectContent>
                          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bt) => (
                            <SelectItem key={bt} value={bt}>
                              {bt}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Address */}
                    <div className="space-y-2 md:col-span-2">
                      <Label>Address</Label>
                      <Textarea
                        value={formData.address}
                        onChange={(e) => handleChange("address", e.target.value)}
                        className="rounded-[12px] resize-none"
                        rows={2}
                        placeholder="Street, City, ZIP"
                      />
                    </div>

                    {/* Emergency contact name */}
                    <div className="space-y-2">
                      <Label>Emergency contact name</Label>
                      <Input
                        value={formData.emergencyName}
                        onChange={(e) => handleChange("emergencyName", e.target.value)}
                        className="rounded-[12px]"
                        placeholder="Contact full name"
                      />
                    </div>

                    {/* Emergency phone */}
                    <div className="space-y-2">
                      <Label>Emergency phone</Label>
                      <Input
                        value={formData.emergencyPhone}
                        onChange={(e) => handleChange("emergencyPhone", e.target.value)}
                        className="rounded-[12px]"
                        placeholder="+216 00 000 000"
                      />
                    </div>

                    {/* Allergies */}
                    <div className="space-y-2 md:col-span-2">
                      <Label>Allergies</Label>
                      <Textarea
                        value={formData.allergies}
                        onChange={(e) => handleChange("allergies", e.target.value)}
                        className="rounded-[12px] resize-none"
                        rows={2}
                        placeholder="List any allergies"
                      />
                    </div>
                  </>
                )}
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6 gap-3">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="rounded-[12px]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-[12px]"
            >
              {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
