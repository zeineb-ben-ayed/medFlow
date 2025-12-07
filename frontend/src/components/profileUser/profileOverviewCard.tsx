"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Mail,
  Phone,
  MapPin,
  Edit2,
  Lock,
  Clock,
  Hash,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { Button } from "../ui/button";
import { Profile } from "@/src/interfaces/staff";

export const ProfileOverviewCard = ({
  profileData,
}: {
  profileData: Profile;
}) => {
  const initials = `${profileData.firstName[0] || ""}${
    profileData.lastName[0] || ""
  }`.toUpperCase();
  const generateId = (id?: number | string, role?: string) => {
    const n = typeof id === "number" ? id : Number(id ?? 0);
    const prefix =
      role === "medecin" ? "MD" : role === "receptionniste" ? "RCP" : "PT";
    return `${prefix}-${String(isNaN(n) ? 0 : n).padStart(4, "0")}`;
  };

  return (
    <div className="rounded-2xl p-6 bg-card shadow">
      <div className="flex gap-6 flex-col md:flex-row items-start">
        <Avatar className="h-28 w-28 rounded-full bg-primary flex items-center justify-center border-4 shadow">
          <AvatarFallback className="text-3xl font-semibold text-white">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold">
            {`${profileData.firstName} ${profileData.lastName}`}
          </h2>

          <div className="flex flex-col gap-4 mt-4 text-muted-foreground">
            {/* Row 1: RPPS + Email */}
            <div className="flex flex-wrap items-center gap-6">
              {profileData.role === "medecin" && (
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-primary" />
                  <span>
                    RPPS: {generateId(profileData.id, profileData.role)}
                  </span>
                </div>
              )}
              {profileData.role === "receptionniste" && (
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-primary" />
                  <span>
                    Employee ID: {generateId(profileData.id, profileData.role)}
                  </span>
                </div>
              )}

              {profileData.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>{profileData.email}</span>
                </div>
              )}
            </div>

            {/* Row 2: Professional Card + Experience */}
            <div className="flex flex-wrap items-center gap-6">
              {profileData.role === "medecin" && (
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <span>Professional Card: A123456</span>
                </div>
              )}
              {profileData.role === "medecin" && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>7 years of experience</span>
                </div>
              )}
              {profileData.role === "receptionniste" && (
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <span>3 years of service</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button className="rounded-xl">
            <Edit2 className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
};
