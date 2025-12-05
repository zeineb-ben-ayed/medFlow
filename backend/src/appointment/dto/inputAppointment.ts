import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateAppointmentInput {
  @Field()
  date: string;

  @Field()
  time: string;

  @Field(() => Int)
  patientId: number;

  @Field(() => Int)
  medecinId: number;
}
