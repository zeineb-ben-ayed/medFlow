import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import { Column, ChildEntity } from 'typeorm';

@ObjectType()
@ChildEntity()
export class Receptionniste extends User {
  @Field()
  @Column()
  poste: string;
  
  @Field({ nullable: true })
  @Column({ nullable: true })
  horaires: string;
}