import { Module } from '@nestjs/common';
import { ConsultationService } from './consultation.service';
import { ConsultationResolver } from './consultation.resolver';
import { Consultation } from './consultation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from 'src/patient/patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Consultation, Patient])],
  providers: [ConsultationService, ConsultationResolver],
})
export class ConsultationModule {}
