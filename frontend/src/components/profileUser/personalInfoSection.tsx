import { Mail, Phone, Calendar, MapPin, User } from "lucide-react";
import { format } from "date-fns";
import { ProfileData } from "./profileOverviewCard";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export const PersonalInfoSection = ({
  profileData,
}: {
  profileData: ProfileData;
}) => {
  const dob = profileData.dateOfBirth
    ? format(new Date(profileData.dateOfBirth), "MMMM d, yyyy")
    : "Not provided";

  const items = [
    {
      label: "Full Name",
      icon: <User className="h-5 w-5" />,
      value: profileData.fullName,
    },
    {
      label: "Email",
      icon: <Mail className="h-5 w-5" />,
      value: profileData.email,
    },
    {
      label: "Phone",
      icon: <Phone className="h-5 w-5" />,
      value: profileData.phone,
    },
    {
      label: "Address",
      icon: <MapPin className="h-5 w-5" />,
      value: profileData.address,
    },
    {
      label: "Date of Birth",
      icon: <Calendar className="h-5 w-5" />,
      value: dob,
    },
  ];

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
            <div className="p-2 bg-primary/10 rounded-lg">{item.icon}</div>
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
