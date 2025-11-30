import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePatientInput {
  @Field()
  username: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field({ nullable: true })
  dateNaissance?: string;

  @Field({ nullable: true })
  historiqueMedical?: string;

  @Field({ nullable: true })
  gender?: string;

  @Field({ nullable: true })
  bloodType?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  emergencyName?: string;

  @Field({ nullable: true })
  emergencyPhone?: string;

  @Field({ nullable: true })
  allergies?: string;
}
