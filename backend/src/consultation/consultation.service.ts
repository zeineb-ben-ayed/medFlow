import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consultation } from './consultation.entity';
import { Patient } from 'src/patient/patient.entity';
import { CreateConsultationInput } from './dto/create-consultation.input';

@Injectable()
export class ConsultationService {
  constructor(
    @InjectRepository(Consultation)
    private consultationRepo: Repository<Consultation>,

    @InjectRepository(Patient)
    private patientRepo: Repository<Patient>,
  ) {}

  async create(data: CreateConsultationInput): Promise<Consultation> {
    const patient = await this.patientRepo.findOne({
      where: { id: data.patientId },
    });

    if (!patient) throw new Error('Patient not found');

    const consultation = this.consultationRepo.create({
      symptoms: data.symptoms,
      diagnosis: data.diagnosis,
      additionalNotes: data.additionalNotes,
      patient,
      prescription: data.medications || [],
    });

    return await this.consultationRepo.save(consultation);
  }
}
