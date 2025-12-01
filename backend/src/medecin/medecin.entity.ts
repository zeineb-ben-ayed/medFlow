import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import { Column, ChildEntity } from 'typeorm';

@ObjectType({ implements: () => User })
@ChildEntity()
export class Medecin extends User {
  @Field({ nullable: true })
  @Column()
  specialite: string;

  @Field({ nullable: true })
  @Column()
  disponibilite: boolean;
}