import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import { Column, ChildEntity } from 'typeorm';

@ObjectType()
@ChildEntity()
export class Patient extends User {
  @Field({ nullable: true })
  @Column({ nullable: true })
  historiqueMedical: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  gender: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  bloodType?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  emergencyName?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  emergencyPhone?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  allergies?: string;
}