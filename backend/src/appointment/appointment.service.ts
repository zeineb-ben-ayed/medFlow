import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { User } from 'src/user/user.entity';
import { KeycloakAdminService } from 'src/keycloak/keycloak-admin.service';
import { CreateAppointmentInput } from './dto/inputAppointment';
import { Patient } from 'src/patient/patient.entity';
import { Medecin } from 'src/medecin/medecin.entity';

@Injectable()
export class AppointmentService {
     constructor(
    @InjectRepository(Appointment)
    private repo: Repository<Appointment>,
    @InjectRepository(User)
    private userRepo:Repository<User>,
    private readonly keycloakAdmin: KeycloakAdminService,
    @InjectRepository(Patient)
    private patientRepo: Repository<Patient>,
    @InjectRepository(Medecin)
    private medecinRepo: Repository<Medecin>,

    
  ) {}

    async getByPatient(keycloakId: string) {
    const patient = await this.userRepo.findOne({ where: { keycloak_id: keycloakId } });
    if (!patient) throw new NotFoundException('Patient not found');
    return this.repo.find({
      where: { patient: { id: patient.id } },
      order: { date: 'ASC', time: 'ASC' },
      relations: ['medecin'],
    });
  }


  async getByPatientForMedecin(patientId: number, medecinKeycloakId: string) {
    const medecin = await this.userRepo.findOne({ where: { keycloak_id: medecinKeycloakId } });
    if (!medecin) throw new NotFoundException('Medecin not found');

    const patient = await this.userRepo.findOne({ where: { id: patientId } });
    if (!patient) throw new NotFoundException('Patient not found');

    return this.repo.find({
      where: {
        medecin: { id: medecin.id },
        patient: { id: patient.id },
      },
      order: { date: 'ASC', time: 'ASC' },
    });
  }

  async getMedecinAppointments(keycloakId: string) {
  const medecin = await this.userRepo.findOne({ where: { keycloak_id: keycloakId } });
  if (!medecin) throw new NotFoundException('Medecin not found');
  const appointments = await this.repo.find({
    where: { medecin: { id: medecin.id } },
    order: { date: 'ASC', time: 'ASC' },
    relations: ['patient'],
  });
  const enrichedAppointments = await Promise.all(
    appointments.map(async (apt) => {
      let patientProfile = apt.patient;

      if (apt.patient.keycloak_id) {
        try {
          const kcUser = await this.keycloakAdmin.getUserById(apt.patient.keycloak_id);
          patientProfile = {
            ...apt.patient,
            firstName: kcUser.firstName,
            lastName: kcUser.lastName,
            email: kcUser.email,
            phoneNumber: kcUser.attributes?.phoneNumber?.[0],
          };
        } catch (err) {
          console.error(`Could not fetch Keycloak user ${apt.patient.keycloak_id}:`, err.message);
        }
      }

      return {
        ...apt,
        patient: patientProfile,
      };
    })
  );

  return enrichedAppointments;
}
async createAppointment(data: CreateAppointmentInput) {
  const { date, time, patientKeycloakId, medecinId } = data;

  const patient = await this.patientRepo.findOne({ where: { keycloak_id: patientKeycloakId } });
  if (!patient) throw new Error("Patient not found");

  let enrichedPatient = patient;
  try {
    const kcPatient = await this.keycloakAdmin.getUserById(patient.keycloak_id);
    enrichedPatient = {
      ...patient,
      firstName: kcPatient.firstName,
      lastName: kcPatient.lastName,
      email: kcPatient.email,
      phoneNumber: kcPatient.attributes?.phoneNumber?.[0] || null,
      dateNaissance: kcPatient.attributes?.dateNaissance?.[0] || null
    };
  } catch (err) {
    console.error(`Could not fetch KC patient ${patient.keycloak_id}: ${err.message}`);
  }
  const medecin = await this.medecinRepo.findOne({ where: { id: medecinId } });
  if (!medecin) throw new Error("Medecin not found");

  let enrichedMedecin = medecin;
  try {
    const kcUser = await this.keycloakAdmin.getUserById(medecin.keycloak_id);
    enrichedMedecin = {
      ...medecin,
      firstName: kcUser.firstName,
      lastName: kcUser.lastName,
      email: kcUser.email,
      phoneNumber: kcUser.attributes?.phoneNumber?.[0] || null,
    };
  } catch (err) {
    console.error(`Could not fetch KC medecin ${medecin.keycloak_id}: ${err.message}`);
  }
  const appointment = this.repo.create({
    date,
    time,
    patient,  
    medecin,   
    status: "PENDING"
  });

  const saved = await this.repo.save(appointment);

  return {
    ...saved,
    patient: enrichedPatient,
    medecin: enrichedMedecin
  };
}


async getMedecinBookedSlots(medecinId: number, date: string) {
  const appointments = await this.repo.find({
    where: {
      medecin: { id: medecinId },
      date: date
    }
  });

  return appointments;
}
async getAppointmentsByPatientId(patientKeycloakId: string) {
 
  const patient = await this.patientRepo.findOne({ where: { keycloak_id: patientKeycloakId } });

  if (!patient) throw new NotFoundException("Patient not found");

  const appointments = await this.repo.find({
    where: { patient: { id: patient.id } },
    order: { date: 'ASC', time: 'ASC' },
    relations: ['medecin'], 
  });
  const enrichedAppointments = await Promise.all(
  appointments.map(async (apt) => {
    let medecinProfile = apt.medecin;

    if (apt.medecin?.keycloak_id) {
      try {
        const kcUser = await this.keycloakAdmin.getUserById(apt.medecin.keycloak_id);

        medecinProfile = {
          ...apt.medecin,
          firstName: kcUser.firstName,
          lastName: kcUser.lastName,
          email: kcUser.email,
          phoneNumber: kcUser.attributes.phoneNumber[0],

        };
      } catch (error) {
        console.error(`Error fetching Keycloak user ${apt.medecin.keycloak_id}:`, error.message);
      }
    }

    return {
      ...apt,
      medecin: medecinProfile,
    };
  })
);


  return enrichedAppointments;
}


}
