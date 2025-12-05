import { Module } from '@nestjs/common';
import { MedicationService } from './medication.service';
import { MedicationResolver } from './medication.resolver';
import { Medication } from './medication.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Medication])],
  providers: [MedicationService, MedicationResolver],
})
export class MedicationModule {}
