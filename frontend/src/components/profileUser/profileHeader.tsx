import { Badge } from "../ui/badge";
const roleLabels: Record<string, string> = {
  medecin: "Doctor",
  receptionniste: "Receptionist",
  admin: "Admin",
};
export const ProfileHeader = ({ role }: { role: string }) => (
  <div className="mb-4">
    <div className="flex items-center gap-3">
      <h1 className="text-4xl font-bold">My Profile</h1>
      <Badge className="rounded-full px-3 py-1">
        {roleLabels[role] ?? role}
      </Badge>
    </div>
    <p className="text-muted-foreground">Manage your personal information</p>
  </div>
);
