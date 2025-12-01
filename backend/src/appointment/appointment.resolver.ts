import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { AppointmentService } from './appointment.service';
import { Roles } from 'nest-keycloak-connect';
import { Appointment } from './appointment.entity';

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
    @Args('patientId') patientId: number,
    @Context() context,
  ) {
    const keycloakId = context.req.user.sub; 
    return this.service.getByPatientForMedecin(patientId, keycloakId);
  }
}
