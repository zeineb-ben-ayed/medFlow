import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AppointmentService } from './appointment.service';
import { Roles } from 'nest-keycloak-connect';
import { Appointment } from './appointment.entity';
import { CreateAppointmentInput } from './dto/inputAppointment';

@Resolver()
export class AppointmentResolver {
    constructor(private readonly service: AppointmentService) {}

  @Roles({ roles: ['realm:patient'] })
  @Query(() => [Appointment])
  async getMyAppointments(@Context() context) {
    const keycloakId = context.req.user.sub; 
    return this.service.getByPatient(keycloakId);
  }

  @Roles({ roles: ['realm:medecin'] })
  @Query(() => [Appointment])
  async getMyMedecinAppointments(@Context() context) {
    const keycloakId = context.req.user.sub; 
    return this.service.getMedecinAppointments(keycloakId);
  }

  @Roles({ roles: ['realm:medecin'] })
  @Query(() => [Appointment])
  async getPatientAppointmentsForMe(
    @Args('patientId',{ type: () => Int }) patientId: number,
    @Context() context,
  ) {
    const keycloakId = context.req.user.sub; 
    return this.service.getByPatientForMedecin(patientId, keycloakId);
  }
@Roles({ roles: ['realm:patient'] })
@Mutation(() => Appointment)
async createAppointment(
  @Args('data') data: CreateAppointmentInput,
) {
  return this.service.createAppointment(data);
}

@Query(() => [Appointment])
async getMedecinBookedSlots(
  @Args('medecinId', { type: () => Int }) medecinId: number,
  @Args('date') date: string,
) {
  return this.service.getMedecinBookedSlots(medecinId, date);
}
@Roles({ roles: ['realm:patient'] })
@Query(() => [Appointment]) 
async getAppointmentsByPatientId(
@Args('patientId', { type: () => Int }) patientId: number
 ) { 
  return this.service.getAppointmentsByPatientId(patientId);
 }
}
