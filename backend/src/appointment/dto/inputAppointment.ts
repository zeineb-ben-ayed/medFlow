import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateAppointmentInput {
  @Field()
  date: string;

  @Field()
  time: string;

  @Field()
  patientKeycloakId: string;

  @Field(() => Int)
  medecinId: number;
}
