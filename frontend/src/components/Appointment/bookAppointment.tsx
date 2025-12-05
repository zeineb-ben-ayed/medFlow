'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { format } from "date-fns";
import { ArrowLeft, CalendarIcon, Clock, User, Check, ArrowRight } from "lucide-react";
import { cn } from "@/src/lib/utils";


const staticDoctors = [
  {
    id: "1",
    full_name: "Dr. Sarah Johnson",
    specialization: "Cardiologie",
    status: "active",
    avatar_url: null,
    email: "sarah.johnson@medflow.com",
    phone: "+1 (555) 123-4567",
    bio: "Spécialiste en cardiologie avec 10 ans d'expérience. Certifiée par l'American College of Cardiology."
  },
  {
    id: "2",
    full_name: "Dr. Michael Chen",
    specialization: "Dermatologie",
    status: "active",
    avatar_url: null,
    email: "michael.chen@medflow.com",
    phone: "+1 (555) 234-5678",
    bio: "Expert en dermatologie cosmétique et médicale. Diplômé de l'Université de Harvard."
  },
  {
    id: "3",
    full_name: "Dr. Maria Rodriguez",
    specialization: "Pédiatrie",
    status: "active",
    avatar_url: null,
    email: "maria.rodriguez@medflow.com",
    phone: "+1 (555) 345-6789",
    bio: "Pédiatre spécialisée dans les soins aux nouveau-nés et aux adolescents. 15 ans d'expérience."
  },
  {
    id: "4",
    full_name: "Dr. James Wilson",
    specialization: "Orthopédie",
    status: "active",
    avatar_url: null,
    email: "james.wilson@medflow.com",
    phone: "+1 (555) 456-7890",
    bio: "Chirurgien orthopédique spécialisé en chirurgie du genou et de la hanche."
  },
  {
    id: "5",
    full_name: "Dr. Lisa Thompson",
    specialization: "Gynécologie",
    status: "active",
    avatar_url: null,
    email: "lisa.thompson@medflow.com",
    phone: "+1 (555) 567-8901",
    bio: "Gynécologue-obstétricienne avec expertise en santé reproductive féminine."
  },
  {
    id: "6",
    full_name: "Dr. Robert Kim",
    specialization: "Neurologie",
    status: "active",
    avatar_url: null,
    email: "robert.kim@medflow.com",
    phone: "+1 (555) 678-9012",
    bio: "Neurologue spécialisé dans les troubles du mouvement et les maladies neurodégénératives."
  }
];

// Données statiques pour les créneaux horaires
const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30"
];

// Données statiques pour le patient (simulé)
const staticPatientRecord = {
  id: "patient-001",
  user_id: "user-001",
  full_name: "Jean Dupont",
  date_of_birth: "1985-04-15",
  gender: "Male",
  phone_number: "+1 (555) 987-6543",
  emergency_contact: "+1 (555) 876-5432",
  medical_history: "Aucun antécédent notable",
  allergies: "Pénicilline",
  blood_type: "O+",
  insurance_provider: "Assurance Santé Plus",
  policy_number: "POL-2024-001",
  created_at: "2024-01-15T10:00:00Z"
};

export default function BookAppointment() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [isBooking, setIsBooking] = useState(false);

  const handleBookAppointment = async () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      toast.error("Veuillez remplir toutes les informations requises");
      return;
    }

    setIsBooking(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const appointmentData = {
        patient_id: staticPatientRecord.id,
        staff_id: selectedDoctor,
        doctor_name: staticDoctors.find(d => d.id === selectedDoctor)?.full_name,
        appointment_date: format(selectedDate, "yyyy-MM-dd"),
        appointment_time: selectedTime,
        duration_minutes: 30,
        status: "scheduled",
        notes: notes || null,
        reference_number: `REF-${Date.now()}`
      };

      console.log("Appointment booked:", appointmentData);
      
      toast.success(
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5" />
            <span className="font-semibold">Rendez-vous confirmé !</span>
          </div>
          <span className="text-sm">Votre référence : {appointmentData.reference_number}</span>
        </div>,
        { duration: 5000 }
      );
      
      // Redirection après succès
      setTimeout(() => {
        router.push("/patient/appointments");
      }, 2000);
      
    } catch (error: any) {
      toast.error(error.message || "Échec de la réservation du rendez-vous");
    } finally {
      setIsBooking(false);
    }
  };

  const selectedDoctorData = staticDoctors.find(d => d.id === selectedDoctor);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* En-tête */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => router.back()}
            className="rounded-custom hover:bg-accent-light transition-all duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Prendre un Rendez-vous</h1>
            <p className="text-muted-foreground mt-1">Étape {step} sur 3</p>
          </div>
        </div>
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
                <h2 className="text-2xl font-semibold">Choisir un Médecin</h2>
                <p className="text-muted-foreground">Sélectionnez un professionnel de santé</p>
              </div>
            </div>
            
            <div className="grid gap-4">
              {staticDoctors.map((doctor) => (
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
                              Disponible
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                        {doctor.bio}
                      </p>
                      <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                        <span>📞 {doctor.phone}</span>
                        <span>✉️ {doctor.email}</span>
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
                {selectedDoctor ? "Continuer" : "Sélectionnez un médecin"}
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
                <h2 className="text-2xl font-semibold">Date et Heure</h2>
                <p className="text-muted-foreground">Choisissez la date et l'heure du rendez-vous</p>
              </div>
            </div>
            
            <div>
              <Label className="text-base font-medium">Sélectionnez une date</Label>
              <div className="flex justify-center mt-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return date < today || date.getDay() === 0; // Désactiver les dimanches
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
                  Créneaux horaires disponibles
                </Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={cn(
                        "p-4 rounded-custom border text-center transition-all duration-200",
                        "hover:shadow-md hover:border-primary/50 hover:translate-y-[-2px]",
                        selectedTime === time
                          ? "border-primary bg-primary text-primary-foreground shadow-md"
                          : "border-border hover:bg-accent-light"
                      )}
                    >
                      <div className="font-semibold">{time}</div>
                      <div className="text-xs mt-1 opacity-75">30 min</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setStep(1)} 
                className="flex-1 rounded-custom border-border hover:bg-accent-light transition-all duration-200"
              >
                ← Retour
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
                {selectedDate && selectedTime ? "Vérifier" : "Sélectionnez date & heure"}
              </Button>
            </div>
          </Card>
        )}

        {/* Étape 3 : Confirmation */}
        {step === 3 && (
          <Card className="medical-card p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold">Confirmation du Rendez-vous</h2>
              <p className="text-muted-foreground">Vérifiez les détails avant de confirmer</p>
            </div>
            
            <div className="space-y-6">
              {/* Résumé du rendez-vous */}
              <div className="p-5 bg-gradient-to-r from-primary/5 to-accent-light/20 rounded-custom space-y-4 border border-border">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{selectedDoctorData?.full_name}</h3>
                        <p className="text-sm text-muted-foreground">{selectedDoctorData?.specialization}</p>
                      </div>
                      <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                        Confirmé
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
                      <span className="ml-auto font-semibold text-foreground">
                        {selectedDate && format(selectedDate, "EEEE dd MMMM yyyy")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Heure :</span>
                      <span className="ml-auto font-semibold text-foreground">{selectedTime}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">Durée :</span>
                      <span className="ml-2 font-semibold text-foreground">30 minutes</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Type de consultation :</span>
                      <span className="ml-2 font-semibold text-foreground">Consultation standard</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes supplémentaires */}
              <div>
                <Label htmlFor="notes" className="text-base font-medium mb-2">
                  Notes supplémentaires (optionnel)
                </Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Décrivez vos symptômes, vos préoccupations ou toute information pertinente pour le médecin..."
                  className="rounded-custom border-border focus-visible:ring-primary min-h-[100px] resize-none"
                  rows={4}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Ces informations seront partagées avec votre médecin avant la consultation.
                </p>
              </div>

              {/* Informations patient */}
              <div className="p-4 bg-muted rounded-custom">
                <h4 className="font-semibold mb-2">Vos informations</h4>
                <div className="text-sm space-y-1">
                  <p><span className="font-medium">Patient :</span> {staticPatientRecord.full_name}</p>
                  <p><span className="font-medium">Téléphone :</span> {staticPatientRecord.phone_number}</p>
                  <p><span className="font-medium">Assurance :</span> {staticPatientRecord.insurance_provider}</p>
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
                ← Modifier
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
                    <span>Confirmation en cours...</span>
                  </div>
                ) : (
                  "Confirmer le rendez-vous"
                )}
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}