import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PatientService } from './patient.service';
import { Patient } from './patient.entity';
import { Roles } from 'nest-keycloak-connect';
import { CreatePatientInput } from './dto/patient.input';
@Resolver()
export class PatientResolver {
  constructor(private readonly patientService: PatientService) {}

  @Query(() => [Patient])
  @Roles({ roles: ['realm:receptionniste', 'realm:medecin'] })
  async findAllPatients(): Promise<Patient[]> {
    return this.patientService.findAll();
  }

  @Mutation(() => Patient)
  @Roles({ roles: ['realm:receptionniste'] })
  async addPatient(@Args('input') input: CreatePatientInput): Promise<Patient> {
    return this.patientService.create(input);
  }

  @Mutation(() => Patient)
  @Roles({ roles: ['realm:receptionniste'] })
  async editPatient(
    @Args('input') input: CreatePatientInput,
  ): Promise<Patient> {
    return this.patientService.update(input);
  }

  @Query(() => Patient)
  @Roles({ roles: ['realm:receptionniste'] })
  async getPatientById(@Args('id', { type: () => Int }) id: number) {
    return this.patientService.findById(id);
  }
  @Query(() => Patient)
  @Roles({ roles: ['realm:medecin'] })
  async getPatientProfile(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Patient> {
    return this.patientService.getPatientProfile(id);
  }
}
