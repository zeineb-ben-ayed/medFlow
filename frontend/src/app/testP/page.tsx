import AppointmentsPage from "@/components/Appointment/appointmentForDoctor";
import BookAppointment from "@/components/Appointment/bookAppointment";

export default function AppointmentsTestPage() {
  return (
    <main className="min-h-screen bg-background p-6">
      {/*<AppointmentsPage />*/}
      <BookAppointment/>
    </main>
  );
}
