"use client";

import { useEffect, useState } from "react";
import { Calendar } from "@/src/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Clock, Calendar as CalendarIcon, User, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/src/lib/utils";
import { GET_MY_MEDECIN_APPOINTMENTS } from "@/src/graphql/query";
import { useQuery } from "@apollo/client/react";
import { Appointment, GetMyMedecinAppointmentsResponse } from "@/src/interfaces/appointment";


const timeSlots = [
  "08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30",
  "12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30",
  "16:00","16:30","17:00","17:30"
];

const computeStatus = (date: string, time: string): "scheduled" | "completed" => {
  const [h, m] = time.split(":").map(Number);
  const d = new Date(date);
  d.setHours(h, m, 0, 0);
  return d < new Date() ? "completed" : "scheduled";
};

const AppointmentsPage = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const { data, loading, error } = useQuery<GetMyMedecinAppointmentsResponse>(GET_MY_MEDECIN_APPOINTMENTS);

  // Load data
  useEffect(() => {
    if (!data) return;
    const formatted = data.getMyMedecinAppointments.map((apt: any) => ({
      id: apt.id,
      date: apt.date,
      time: apt.time,
      status: computeStatus(apt.date, apt.time),
      patientName: `${apt.patient.firstName} ${apt.patient.lastName}`,
      doctorName: "You",
      duration: 30,
      reason: "Consultation",
      type: "consultation",
    }));
    setAppointments(formatted);
  }, [data]);

  // Update status every second
  useEffect(() => {
    const interval = setInterval(() => {
      setAppointments(prev =>
        prev.map(apt => ({
          ...apt,
          status: computeStatus(apt.date, apt.time)
        }))
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error loading appointments</p>;

  const appointmentsForSelectedDate = appointments.filter(
    (apt) => apt.date === format(date, "yyyy-MM-dd")
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-info/20 text-info border-info/30";
      case "completed":
        return "bg-success/20 text-success border-success/30";
      default:
        return "bg-muted/20 text-muted border-muted";
    }
  };

  const scheduledCount = appointmentsForSelectedDate.filter((a) => a.status === "scheduled").length;
  const completedCount = appointmentsForSelectedDate.filter((a) => a.status === "completed").length;
  const availableSlots = timeSlots.length - scheduledCount;

  return (
    <div className="min-h-screen p-6">      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">       
        {/* Daily Schedule */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Daily Schedule</CardTitle>
          </CardHeader>

          <CardContent>
            {timeSlots.map((time) => {
              const apt = appointmentsForSelectedDate.find(a => a.time === time);

              return (
                <div
                  key={time}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-xl border transition-all",
                    apt ? "bg-primary/5 border-primary/20" : "bg-card border-border/30"
                  )}
                >
                  <div className="w-20">{time}</div>

                  {apt ? (
                    <div className="flex-1 flex items-center justify-between">
                      <div>
                        <div className="font-semibold flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {apt.patientName}
                        </div>

                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          {apt.duration} min
                        </div>
                      </div>

                      <Badge variant="outline" className={getStatusColor(apt.status)}>
                        {apt.status}
                      </Badge>
                    </div>
                  ) : (
                    <div className="flex-1 text-muted-foreground">Available</div>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Calendar & Summary */}
        <div className="space-y-4">

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

          <Card className="medical-card">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Today's Summary</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Appointment statistics
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-info/10 border border-info/20">
                  <span className="text-sm font-semibold">Scheduled</span>
                  <span className="text-2xl font-bold text-info">{scheduledCount}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-success/10 border border-success/20">
                  <span className="text-sm font-semibold">Completed</span>
                  <span className="text-2xl font-bold text-success">{completedCount}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-warning/10 border border-warning/20">
                  <span className="text-sm font-semibold">Available Slots</span>
                  <span className="text-2xl font-bold text-warning">{availableSlots}</span>
                </div>
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;
