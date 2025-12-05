import { Field, InputType, Int } from '@nestjs/graphql';
import { MedicationInput } from 'src/medication/dto/medication.input';

@InputType()
export class CreateConsultationInput {
  @Field(() => Int)
  patientId: number;

  @Field()
  symptoms: string;

  @Field()
  diagnosis: string;

  @Field({ nullable: true })
  additionalNotes?: string;

  @Field(() => [MedicationInput], { nullable: true })
  medications?: MedicationInput[];
}
