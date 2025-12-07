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
