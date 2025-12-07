import BookAppointment from "@/src/components/Appointment/bookAppointment";
import PageBreadcrumb from "@/src/components/layout/PageBreadcrumb";


export default function BookAppointments() {
  return (
    <>
    <PageBreadcrumb pageTitle="Book Appointment" />
      
      <div className="w-full p-4 sm:p-6 lg:p-8 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-full space-y-6">
                {/* Header Section */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  {/* Left: Title + Description */}
                  <div className="space-y-1">
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                      Book a Medical Appointment
                    </h1>
                    <p className="text-muted-foreground text-sm sm:text-base">
                      Select your doctor and preferred date to schedule your appointment
                    </p>
                  </div>
                </div>
                <BookAppointment/>
              
              </div>
              
            </div>
  </>
  );
}
