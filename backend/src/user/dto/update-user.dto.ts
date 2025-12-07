import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUserDto {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field({ nullable: true })
  dateNaissance?: string;

  @Field({ nullable: true })
  specialite?: string;

  @Field({ nullable: true })
  disponibilite?: boolean;

  @Field({ nullable: true })
  poste?: string;

  @Field({ nullable: true })
  horaires?: string;

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
