import { Badge } from "../ui/badge";

const roleLabels: Record<UserRole, string> = {
  admin: "Administrator",
  doctor: "Doctor",
  receptionist: "Receptionist",
  patient: "Patient",
};
export type UserRole = "admin" | "doctor" | "receptionist" | "patient";

export const ProfileHeader = ({ role }: { role: UserRole }) => (
  <div className="mb-4">
    <div className="flex items-center gap-3">
      <h1 className="text-4xl font-bold">My Profile</h1>
      <Badge className="rounded-full px-3 py-1">{roleLabels[role]}</Badge>
    </div>
    <p className="text-muted-foreground">Manage your personal information</p>
  </div>
);
