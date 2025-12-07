"use client";

import { Calendar, Clock } from "lucide-react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { AppointmentByPatient } from "@/src/interfaces/appointment";
interface PatientAppointmentsListProps {
  appointments: AppointmentByPatient[];
}
export const PatientAppointmentsList = ({ appointments }:PatientAppointmentsListProps) => {
  if (!appointments || appointments.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-12">
        <Calendar className="w-14 h-14 mx-auto mb-4 text-muted-foreground/40" />
        <p className="text-lg font-semibold">No appointments found</p>
        <p className="text-sm mt-1">This patient has no recorded appointments with you.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map((apt) => {
        const formatted = new Date(apt.date);
        const d = formatted.toLocaleDateString("fr-FR");
        return (
          <Card
            key={apt.id}
            className="border-2 shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <CardContent className="p-5 flex items-center justify-between">
              {/* Date */}
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  
                  <p className="text-lg font-semibold">{d}</p>
                  <p className="text-sm text-muted-foreground">Appointment date</p>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary/40">
                <Clock className="w-4 h-4 text-primary" />
                <span className="font-medium">{apt.time}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
