import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class AppointmentService {
     constructor(
    @InjectRepository(Appointment)
    private repo: Repository<Appointment>,
    @InjectRepository(User)
    private userRepo:Repository<User>
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

    return this.repo.find({
      where: { medecin: { id: medecin.id } },
      order: { date: 'ASC', time: 'ASC' },
      relations: ['patient'],
    });
  }
}
