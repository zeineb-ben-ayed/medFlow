import {
  Mail,
  Phone,
  Calendar,
  MapPin,
  User,
  CheckCircle,
  XCircle,
  Stethoscope,
  Briefcase,
  Clock,
} from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Profile } from "@/src/interfaces/staff";

export const PersonalInfoSection = ({
  profileData,
}: {
  profileData: Profile;
}) => {
  const dob = profileData.dateNaissance
    ? format(new Date(profileData.dateNaissance), "MMMM d, yyyy")
    : "Not provided";
  // Base personal info
  const items = [
    {
      label: "Full Name",
      icon: <User className="h-5 w-5 text-primary" />,
      value: `${profileData.firstName || ""} ${
        profileData.lastName || ""
      }`.trim(),
    },
    {
      label: "Email",
      icon: <Mail className="h-5 w-5 text-primary" />,
      value: profileData.email,
    },
    {
      label: "Phone",
      icon: <Phone className="h-5 w-5 text-primary" />,
      value: profileData.phoneNumber,
    },
    {
      label: "Date of Birth",
      icon: <Calendar className="h-5 w-5 text-primary" />,
      value: dob,
    },
  ];

  // Role-specific info
  if (profileData.role === "medecin") {
    items.push(
      {
        label: "Speciality",
        icon: <Stethoscope className="h-5 w-5 text-primary" />,
        value: profileData.specialite || "Not provided",
      },
      {
        label: "Disponibility",
        icon: profileData.disponibilite ? (
          <CheckCircle className="h-5 w-5 text-primary" />
        ) : (
          <XCircle className="h-5 w-5 text-primary" />
        ),
        value: profileData.disponibilite ? "Available" : "Not Available",
      }
    );
  } else if (profileData.role === "receptionniste") {
    items.push(
      {
        label: "Position",
        icon: <Briefcase className="h-5 w-5 text-primary" />,
        value: profileData.poste || "Not provided",
      },
      {
        label: "Shift",
        icon: <Clock className="h-5 w-5 text-primary" />,
        value: profileData.horaires || "Not provided",
      }
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          Personal Information
        </CardTitle>
      </CardHeader>

      <CardContent className="grid md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="p-4 rounded-xl bg-secondary/20 flex gap-3"
          >
            <div className="p-2 bg-primary/10 rounded-lg flex items-center justify-center">
              {item.icon}
            </div>

            <div>
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p className="font-medium">{item.value || "Not provided"}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
