import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import { Column, ChildEntity } from 'typeorm';

@ObjectType()
@ChildEntity()
export class Patient extends User {
  
  @Field()
  @Column({ type: 'date' })
  dateNaissance: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  historiqueMedical: string;
}