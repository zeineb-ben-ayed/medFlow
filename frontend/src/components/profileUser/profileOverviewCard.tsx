"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Mail, Phone, MapPin, Edit2, Lock } from "lucide-react";
import { Button } from "../ui/button";
import { UserRole } from "./profileHeader";

export interface ProfileData {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  address: string;
  avatar?: string;
  role: UserRole;
  // Professional fields
  specialty?: string;
  department?: string;
  licenseNumber?: string;
  workingHours?: string;
  clinicAssigned?: string;
  hireDate?: string;
  // Medical fields (patients)
  bloodType?: string;
  allergies?: string;
  chronicConditions?: string;
  emergencyContact?: string;
  emergencyContactPhone?: string;
  insuranceInfo?: string;
}

export const ProfileOverviewCard = ({
  profileData,
}: {
  profileData: ProfileData;
}) => {
  const initials = profileData.fullName
    .split(" ")
    .map((x) => x[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="rounded-2xl p-6 bg-card shadow">
      <div className="flex gap-6 flex-col md:flex-row items-start">
        <Avatar className="h-28 w-28 border-4 shadow">
          <AvatarImage src={profileData.avatar || ""} />
          <AvatarFallback className="text-xl">{initials}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <h2 className="text-3xl font-bold">{profileData.fullName}</h2>

          <div className="flex flex-wrap gap-4 mt-4 text-muted-foreground">
            {profileData.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                {profileData.email}
              </div>
            )}

            {profileData.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                {profileData.phone}
              </div>
            )}

            {profileData.address && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                {profileData.address}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button className="rounded-xl">
            <Edit2 className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>

          <Button variant="outline" className="rounded-xl">
            <Lock className="h-4 w-4 mr-2" />
            Change Password
          </Button>
        </div>
      </div>
    </div>
  );
};
