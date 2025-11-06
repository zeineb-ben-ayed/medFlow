import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import { Column, ChildEntity } from 'typeorm';

@ObjectType()
@ChildEntity()
export class Medecin extends User {
  @Field()
  @Column()
  specialite: string;

  @Field({ nullable: true })
  @Column()
  disponibilite: boolean;
}