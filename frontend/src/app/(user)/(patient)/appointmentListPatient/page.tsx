"use client"
import AppointmentsList from "@/src/components/Appointment/appointmentListPatient";
import PageBreadcrumb from "@/src/components/layout/PageBreadcrumb";
import { Button } from "@/src/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";


export default function BookAppointments() {
const router = useRouter();
 return (
    <>
      <PageBreadcrumb pageTitle="My Appointments" />

      <div className="w-full p-4 sm:p-6 lg:p-8 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="w-full space-y-6">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Left: Title + Description */}
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                My Appointments
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Here is the list of all your upcoming and past medical appointments.
              </p>
            </div>

            {/* Right: Button */}
            <div>
              <Button
                className="w-full sm:w-auto gap-2"
                onClick={() => router.push("/bookAppointment")}
              >
                <Plus className="h-4 w-4" />
                Book New Appointment
              </Button>
            </div>
          </div>

          {/* Appointments List */}
          <AppointmentsList />
        </div>
      </div>
    </>
  );
}
