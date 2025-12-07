'use client';
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client/react';
import { Calendar, Clock, User, Phone, Mail, FileText, MapPin } from 'lucide-react';
import { Badge } from '@/src/components/ui/badge';
import { Card, CardContent } from '@/src/components/ui/card';
import { AppointmentEnriched, AppointmentFromQuery, QueryData } from '@/src/interfaces/appointment';
import { GET_APPOINTMENTS } from '@/src/graphql/queries';



interface AppointmentsListProps {
  patientId: number;
}

const AppointmentsList = ({ patientId }: AppointmentsListProps) => {
  const [appointments, setAppointments] = useState<AppointmentEnriched[]>([]);
  patientId=4; 
  const { data, loading, error } = useQuery<QueryData>(GET_APPOINTMENTS, {
    variables: { patientId },
  });

  const getAppointmentStatus = (date: string, time: string): 'completed' | 'scheduled' => {
    const appointmentDateTime = new Date(`${date}T${time}`);
    return appointmentDateTime < new Date() ? 'completed' : 'scheduled';
  };

  useEffect(() => {
    if (data?.getAppointmentsByPatientId) {
      const enriched: AppointmentEnriched[] = data.getAppointmentsByPatientId.map((apt: AppointmentFromQuery) => ({
        id: apt.id,
        doctor: {
          name: `${apt.medecin.firstName} ${apt.medecin.lastName}`,
          specialty: apt.medecin.specialite,
          phone: apt.medecin.phoneNumber,
          email: apt.medecin.email,
        },
        date: apt.date,
        time: apt.time,
        duration: '30 min',       
        realStatus: getAppointmentStatus(apt.date, apt.time),
      }));
      setAppointments(enriched);
    }
  }, [data]);

  const getStatusBadge = (status: 'completed' | 'scheduled') => {
    switch (status) {
      case 'completed':
        return <Badge variant="secondary">Terminé</Badge>;
      case 'scheduled':
        return <Badge className="bg-green-100 text-green-800">Programmé</Badge>;
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error.message}</div>;

  return (
    <div className="p-8 space-y-4">
      {appointments.map(appointment => (
        <Card key={appointment.id} className="relative">
          <div className="absolute top-4 right-4">{getStatusBadge(appointment.realStatus)}</div>
          <CardContent className="p-6 flex flex-col lg:flex-row gap-6">
            <div className="flex items-start gap-4 flex-1">
              <User size={28} className="text-primary" />
              <div>
                <h3 className="font-semibold text-lg mb-2">{appointment.doctor.name}</h3>
                <div className="flex gap-2 mb-3">
                  <Badge variant="secondary">{appointment.doctor.specialty}</Badge>
                  <Badge className="bg-green-100 text-green-800">Disponible</Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                 Médecin {appointment.doctor.specialty}

                </div>
                <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2"><Phone size={16} className="text-primary" /> {appointment.doctor.phone}</div>
                  <div className="flex items-center gap-2"><Mail size={16} className="text-primary" /> {appointment.doctor.email}</div>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                <Calendar size={20} className="text-primary" />
                {new Date(appointment.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
              <div className="flex items-center gap-3">
                <Clock size={20} className="text-primary" />
                {appointment.time} • {appointment.duration}
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-primary" />
                Présentiel
              </div>
              <div className="flex items-center gap-3">
                <FileText size={20} className="text-primary" />
                Consultation
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AppointmentsList;
