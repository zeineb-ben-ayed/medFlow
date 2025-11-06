import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ExtraDataInput {
  @Field({ nullable: true })
  historiqueMedical?: string;

  @Field({ nullable: true })
  specialite?: string;

  @Field({ nullable: true })
  disponibilite?: boolean;

  @Field({ nullable: true })
  poste?: string;

  @Field({ nullable: true })
  horaires?: string;
}