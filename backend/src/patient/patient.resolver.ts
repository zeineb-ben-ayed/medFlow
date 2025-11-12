import { Query, Resolver } from '@nestjs/graphql';
import { PatientService } from './patient.service';
import { Patient } from './patient.entity';
import { Roles } from 'nest-keycloak-connect';
@Resolver()
export class PatientResolver {
  constructor(private readonly patientService: PatientService) {}

  @Query(() => [Patient])
  @Roles({ roles: ['realm:receptionniste'] })
  async findAllPatients(): Promise<Patient[]> {
    return this.patientService.findAll();
  }
}
