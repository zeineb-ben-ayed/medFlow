"use client";

import { useState } from "react";
import { Calendar } from "@/src/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import {
  Clock,
  Calendar as CalendarIcon,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/src/lib/utils";

type ViewMode = "day" | "week" | "month";

interface Appointment {
  id: string;
  date: string;
  time: string;
  patientName: string;
  doctorName: string;
  duration: number;
  reason: string;
  status: "scheduled" | "completed" | "cancelled";
  type: "consultation" | "follow-up" | "emergency";
}

const mockAppointments: Appointment[] = [
  {
    id: "1",
    date: "2025-11-27",
    time: "09:00",
    patientName: "Sarah Johnson",
    doctorName: "Dr. Smith",
    duration: 30,
    reason: "Annual checkup",
    status: "scheduled",
    type: "consultation",
  },
  {
    id: "2",
    date: "2025-11-27",
    time: "10:30",
    patientName: "Michael Brown",
    doctorName: "Dr. Adams",
    duration: 45,
    reason: "Follow-up consultation",
    status: "scheduled",
    type: "follow-up",
  },
  {
    id: "3",
    date: "2025-11-26",
    time: "14:00",
    patientName: "Emily Davis",
    doctorName: "Dr. Smith",
    duration: 30,
    reason: "Prescription renewal",
    status: "completed",
    type: "consultation",
  },
];

const timeSlots = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
];

const AppointmentsPage = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [viewMode] = useState<ViewMode>("day");
  const [appointments] = useState<Appointment[]>(mockAppointments);

  const getStatusColor = (status: Appointment["status"]) => {
    switch (status) {
      case "scheduled":
        return "bg-info/20 text-info border-info/30";
      case "completed":
        return "bg-success/20 text-success border-success/30";
      case "cancelled":
        return "bg-destructive/20 text-destructive border-destructive/30";
    }
  };

  const appointmentsForSelectedDate = appointments.filter(
    (apt) => apt.date === format(date, "yyyy-MM-dd")
  );

  const scheduledCount = appointmentsForSelectedDate.filter(
    (a) => a.status === "scheduled"
  ).length;
  const completedCount = appointmentsForSelectedDate.filter(
    (a) => a.status === "completed"
  ).length;
  const availableSlots = timeSlots.length - scheduledCount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/30 via-background to-accent-light/20">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Appointment Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage appointments and scheduling
            </p>
          </div>
        </div>

        {/* Navigation */}
        <Card className="medical-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    const newDate = new Date(date);
                    newDate.setDate(date.getDate() - 1);
                    setDate(newDate);
                  }}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="text-base font-semibold min-w-[200px] text-center">
                  {format(date, "EEEE, MMMM d, yyyy")}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    const newDate = new Date(date);
                    newDate.setDate(date.getDate() + 1);
                    setDate(newDate);
                  }}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setDate(new Date())}
                  className="ml-2"
                >
                  Today
                </Button>
              </div>

              <div className="flex gap-2">
                <div className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm">
                  Daily Schedule
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Daily Schedule */}
          <Card className="lg:col-span-2 medical-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-primary" />
                Daily Schedule
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-2">
                {timeSlots.map((time) => {
                  const appointment = appointmentsForSelectedDate.find(
                    (apt) => apt.time === time && apt.status === "scheduled"
                  );

                  return (
                    <div
                      key={time}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-xl border-2 transition-all",
                        appointment
                          ? "bg-primary/5 border-primary/20 hover:border-primary/40"
                          : "bg-card border-border/50 hover:border-border"
                      )}
                    >
                      <div className="w-20 text-sm font-medium text-muted-foreground">
                        {time}
                      </div>

                      {appointment ? (
                        <div className="flex-1 flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-primary" />
                              <span className="font-semibold">
                                {appointment.patientName}
                              </span>
                            </div>

                            <div className="text-sm text-muted-foreground flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {appointment.duration} min
                              </span>
                            </div>
                          </div>

                          <Badge
                            variant="outline"
                            className={getStatusColor(appointment.status)}
                          >
                            {appointment.status}
                          </Badge>
                        </div>
                      ) : (
                        <div className="flex-1 text-sm text-muted-foreground font-medium">
                          Available
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Select Date */}
            <Card className="medical-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                  Select Date
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="bg-background p-4 rounded-xl border flex justify-center">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => newDate && setDate(newDate)}
                    className="rounded-md"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Summary */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Today's Summary
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Appointment statistics
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-info/10 border border-info/20">
                  <span className="text-sm font-semibold">Scheduled</span>
                  <span className="text-2xl font-bold text-info">
                    {scheduledCount}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-success/10 border border-success/20">
                  <span className="text-sm font-semibold">Completed</span>
                  <span className="text-2xl font-bold text-success">
                    {completedCount}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-warning/10 border border-warning/20">
                  <span className="text-sm font-semibold">Available Slots</span>
                  <span className="text-2xl font-bold text-warning">
                    {availableSlots}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;
