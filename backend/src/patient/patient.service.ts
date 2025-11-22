import { Injectable, NotFoundException } from '@nestjs/common';
import { Patient } from './patient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PatientService {
    constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}
  
    async getPatientProfile(id: number): Promise<Patient> {
    const patient = await this.patientRepository.findOne({ where: { id } });

    if (!patient) {
      throw new NotFoundException(`Patient with id ${id} not found`);
    }

    return patient;
  }
}
