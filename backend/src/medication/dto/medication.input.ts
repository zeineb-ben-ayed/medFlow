import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MedicationInput {
  @Field()
  name: string;

  @Field()
  dosage: string;

  @Field()
  frequency: string;

  @Field()
  duration: string;
}
