
import AppointmentsPage from "@/src/components/Appointment/appointmentForDoctor";
import PageBreadcrumb from "@/src/components/layout/PageBreadcrumb";


export default function AppointmentsList() {
  return (
   
     <>
    <PageBreadcrumb pageTitle="My Appointments" />
      
      <div className="w-full p-4 sm:p-6 lg:p-8 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-full space-y-6">
                {/* Header Section */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  {/* Left: Title + Description */}
                  <div className="space-y-1">
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                      My Appointments
                    </h1>
                    <p className="text-muted-foreground text-sm sm:text-base">
                      View and manage all your scheduled appointments
                    </p>
                  </div>
                </div>
                <AppointmentsPage />
              </div>
              
            </div>
  </>
  );
}
