"use client";
import { PersonalInfoSection } from "@/src/components/profileUser/personalInfoSection";
import { ProfileHeader } from "@/src/components/profileUser/profileHeader";
import { ProfileOverviewCard } from "@/src/components/profileUser/profileOverviewCard";
import { Skeleton } from "@/src/components/ui/skeleton";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { GET_PROFILE } from "@/src/graphql/query";
import { Profile } from "@/src/interfaces/staff";
import { useQuery } from "@apollo/client/react";
import { User } from "lucide-react";

export default function ProfileContent() {
  const { data, loading } = useQuery<{ getProfile: Profile }>(GET_PROFILE);

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

  const profile = data?.getProfile;
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

      <ProfileOverviewCard profileData={profile} />

      <Tabs defaultValue="personal" className="mt-6">
        <TabsList className="bg-secondary/40 rounded-xl p-1">
          <TabsTrigger value="personal">Personal</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <PersonalInfoSection profileData={profile} />
        </TabsContent>
      </Tabs>
    </>
  );
}
