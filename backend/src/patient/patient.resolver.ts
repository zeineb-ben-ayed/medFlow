import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { PatientService } from './patient.service';
import { Roles } from 'nest-keycloak-connect';
import { Patient } from './patient.entity';

@Resolver()
export class PatientResolver {
    constructor(private patientService: PatientService) {}

@Query(() => Patient)
@Roles({ roles: ['realm:medecin'] })
async getPatientProfile(
  @Args('id', { type: () => Int }) id: number,
): Promise<Patient> {
  return this.patientService.getPatientProfile(id);
}
}
