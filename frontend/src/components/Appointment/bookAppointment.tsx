'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { format } from "date-fns";
import { ArrowLeft, CalendarIcon, Clock, User, Check, ArrowRight, Hourglass, Stethoscope, Phone, Shield, Mail } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Calendar } from "../ui/calendar";
import { Textarea } from "../ui/textarea";
import { useMutation, useQuery } from "@apollo/client/react";
import { GET_ALL_MEDECINS, GET_MEDECIN_BOOKED_SLOTS } from "@/src/graphql/queries";
import { GetAllMedecinsResponse } from "@/src/interfaces/staff";
import { GetMedecinBookedSlotsResponse } from "@/src/interfaces/appointment";
import { useCurrentUser } from "@/src/hooks/useCurrentUser";
import { CREATE_APPOINTMENT } from "@/src/graphql/mutations";


const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30"
];


export default function BookAppointment() {
  const router = useRouter();
  const { user } = useCurrentUser();
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [isBooking, setIsBooking] = useState(false);
  const [createAppointment] = useMutation(CREATE_APPOINTMENT);
const {
  data: medecinsData,
  loading: medecinsLoading,
  error: medecinsError
} = useQuery<GetAllMedecinsResponse>(GET_ALL_MEDECINS);
const patientKeycloakId = user?.id;

const doctors = medecinsData?.getAllMedecins || [];
const {
  data: bookedSlotsData
} = useQuery<GetMedecinBookedSlotsResponse>(GET_MEDECIN_BOOKED_SLOTS, {
  variables: { 
    medecinId: Number(selectedDoctor), 
    date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : null 
  },
  skip: !selectedDoctor || !selectedDate,
});

const bookedTimes =
  bookedSlotsData?.getMedecinBookedSlots?.map(slot => slot.time) ?? [];



  
  const formattedDoctors = doctors.map((d) => ({
  id: d.id,
  full_name: `${d.firstName} ${d.lastName}`,
  specialization: d.specialite || "Médecin",
  status: "active",
  phone: d.phoneNumber,
  email: d.email,
  bio:`${d.specialite ? d.specialite + " Specialist" : "General Practitioner"}`, 
}));
  const handleBookAppointment = async () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      toast.error("Please fill in all required information");
      return;
    }

    setIsBooking(true);
    
    try {
    const appointmentData = {
      patient_keycloak_id: patientKeycloakId,
      staff_id: selectedDoctor,
      doctor_name: formattedDoctors.find(d => d.id === selectedDoctor)?.full_name,
      appointment_date: format(selectedDate, "yyyy-MM-dd"),
      appointment_time: selectedTime,
      duration_minutes: 30,
      status: "scheduled",
      notes: notes || null,
      reference_number: `REF-${Date.now()}`
    };
    console.log("Appointment booked (local object):", appointmentData);

    await createAppointment({
      variables: {
        date: appointmentData.appointment_date,
        time: appointmentData.appointment_time,
        medecinId: Number(selectedDoctor),
        patientKeycloakId: patientKeycloakId,
      }
    });

      toast.success(
        <div className="flex flex-col gap-1">
          
            <span className="font-semibold">Appointment Confirmed!</span>
          </div>,
       
        { duration: 3000 }
      );
      
      setTimeout(() => {
        router.push("/appointmentListPatient");
      }, 2000);
      
    } catch (error: any) {
      toast.error(error.message || "Failed to book the appointment");
    } finally {
      setIsBooking(false);
    }
  };

  const selectedDoctorData = formattedDoctors.find(d => d.id === selectedDoctor);

  return (
    
      <div className="max-w-4xl mx-auto space-y-6">
       {/* Indicateur de progression */}
<div className="flex items-center justify-center gap-16 my-8">
  {[1, 2, 3].map((stepNumber, index) => (
    <div key={stepNumber} className="flex items-center">
      
      {/* Cercle */}
      <div
        className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-300 text-lg",
          step >= stepNumber
            ? "bg-primary text-primary-foreground shadow-md"
            : "bg-muted text-muted-foreground"
        )}
      >
        {stepNumber}
      </div>

      {/* Flèche rallongée */}
      {index < 2 && (
        <ArrowRight
          className={cn(
            "w-5 h-5 mx-12 transition-all duration-300",  
            step > stepNumber ? "text-primary" : "text-muted-foreground"
          )}
        />
      )}
    </div>
  ))}
</div>


        {/* Étape 1 : Sélection du médecin */}
        {step === 1 && (
          <Card className="medical-card p-6 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Choose a Doctor</h2>
                <p className="text-muted-foreground">Select a healthcare professional</p>
              </div>
            </div>
            
            <div className="grid gap-4">
              {formattedDoctors.map((doctor) => (
                <button
                  key={doctor.id}
                  onClick={() => setSelectedDoctor(doctor.id)}
                  className={cn(
                    "p-5 rounded-custom border-2 text-left transition-all duration-200",
                    "hover:shadow-lg hover:border-primary/50 hover:translate-y-[-2px]",
                    selectedDoctor === doctor.id
                      ? "border-primary bg-gradient-to-r from-primary/5 to-accent-light/30 shadow-md"
                      : "border-border"
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{doctor.full_name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="px-2 py-1 bg-accent-light text-primary rounded-full text-xs font-medium">
                              {doctor.specialization}
                            </span>
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                              Available
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                        {doctor.bio}
                      </p>
                      <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4 text-primary" />
                        <span >{doctor.phone}</span>
                        <Mail className="h-4 w-4 text-primary" />
                        <span> {doctor.email}</span>
                      </div>
                    </div>
                    {selectedDoctor === doctor.id && (
                      <div className="ml-4 p-2 rounded-full bg-primary text-primary-foreground">
                        <Check className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
            
            <div className="pt-4">
              <Button
                onClick={() => setStep(2)}
                disabled={!selectedDoctor}
                className={cn(
                  "w-full rounded-custom transition-all duration-300",
                  selectedDoctor 
                    ? "bg-primary hover:bg-primary-hover hover:shadow-lg" 
                    : "bg-muted text-muted-foreground"
                )}
              >
                {selectedDoctor ? "Continue" : "Select a Physician"}
              </Button>
            </div>
          </Card>
        )}

        {/* Étape 2 : Sélection de la date et de l'heure */}
        {step === 2 && (
          <Card className="medical-card p-6 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <CalendarIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Date & Time</h2>
                <p className="text-muted-foreground">Choose the appointment date and time</p>
              </div>
            </div>
            
            <div>
              <Label className="text-base font-medium">Select a Date</Label>
              <div className="flex justify-center mt-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return date < today || date.getDay() === 0; 
                  }}
                  className="rounded-custom border border-border bg-card p-4"
                  modifiers={{
                    today: new Date(),
                  }}
                  modifiersStyles={{
                    today: { 
                      border: '2px solid var(--color-primary)',
                      fontWeight: 'bold'
                    }
                  }}
                />
              </div>
            </div>

           {selectedDate && (
  <div>
    <Label className="flex items-center gap-2 text-base font-medium mb-4">
      <Clock className="h-5 w-5 text-primary" />
      Available Time Slots
    </Label>

    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {timeSlots.map((time) => {
        const isBooked = bookedTimes.includes(time);

        return (
          <button
            key={time}
            onClick={() => !isBooked && setSelectedTime(time)}
            disabled={isBooked}
            className={cn(
              "p-4 rounded-custom border text-center transition-all duration-200",
              isBooked
                ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                : "hover:shadow-md hover:border-primary/50 hover:translate-y-[-2px]",
              selectedTime === time && !isBooked
                ? "border-primary bg-primary text-primary-foreground shadow-md"
                : ""
            )}
          >
            <div className="font-semibold">{time}</div>
            <div className="text-xs mt-1 opacity-75">30 min</div>
          </button>
        );
      })}
    </div>
  </div>
)}


            <div className="flex gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setStep(1)} 
                className="flex-1 rounded-custom border-border hover:bg-accent-light transition-all duration-200"
              >
                 Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={!selectedDate || !selectedTime}
                className={cn(
                  "flex-1 rounded-custom transition-all duration-300",
                  selectedDate && selectedTime
                    ? "bg-primary hover:bg-primary-hover hover:shadow-lg"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {selectedDate && selectedTime ? "Review" : "Select Date & Time"}
              </Button>
            </div>
          </Card>
        )}

        {/* Étape 3 : Confirmation */}
        {step === 3 && (
          <Card className="medical-card p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold">Appointment Confirmation</h2>
              <p className="text-muted-foreground">Review the details before confirming</p>
            </div>
            
            <div className="space-y-6">
              {/* Résumé du rendez-vous */}
              <div className="p-5 bg-gradient-to-r from-primary/5 to-accent-light/20 rounded-custom space-y-4 border border-border">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-primary self-start translate-y-1" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{selectedDoctorData?.full_name}</h3>
                        <p className="text-sm text-muted-foreground">{selectedDoctorData?.specialization}</p>
                      </div>
                      <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                        Confirmed
                      </span>
                    </div>
                    <p className="text-sm mt-2">{selectedDoctorData?.bio}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Date :</span>
                      <span className=" font-semibold text-foreground">
                        {selectedDate && format(selectedDate, "EEEE dd MMMM yyyy")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Time :</span>
                      <span className="font-semibold text-foreground">{selectedTime}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Hourglass className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="font-medium">Duration :</span>
                      <span className=" font-semibold text-foreground">30 minutes</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Stethoscope className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="font-medium">Consultation Type :</span>
                      <span className="ml-2 font-semibold text-foreground">Consultation standard</span>
                    </div>
                  </div>
                </div>
              </div>

             

              {/* Informations patient */}
              <div className="p-4 bg-muted rounded-custom shadow-sm">
                <h4 className="font-semibold mb-3 text-lg">Your Information</h4>
                <div className="text-sm space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    <span className="font-medium">Patient :</span>
                    <span className="ml-1 font-semibold text-foreground">{user?.firstName} {user?.lastName}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="font-medium">Phone :</span>
                    <span className="ml-1 font-semibold text-foreground">{user?.phoneNumber || "Non renseigné"}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span className="font-medium">Insurance :</span>
                    <span className="ml-1 font-semibold text-foreground">Assurance Santé Plus</span>
                  </div>
                </div>
              </div>

            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setStep(2)} 
                className="flex-1 rounded-custom border-border hover:bg-accent-light transition-all duration-200"
                disabled={isBooking}
              >
                 Modify
              </Button>
              <Button 
                onClick={handleBookAppointment} 
                disabled={isBooking}
                className={cn(
                  "flex-1 rounded-custom transition-all duration-300",
                  isBooking 
                    ? "bg-primary/70" 
                    : "bg-primary hover:bg-primary-hover hover:shadow-lg"
                )}
              >
                {isBooking ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    <span>Confirming...</span>
                  </div>
                ) : (
                  "Confirm Appointment"
                )}
              </Button>
            </div>
          </Card>
        )}
      </div>
   
  );
}