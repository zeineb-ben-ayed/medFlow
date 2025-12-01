import { Field, ObjectType, ID } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Patient } from 'src/patient/patient.entity';
import { Medecin } from 'src/medecin/medecin.entity';

@ObjectType()
@Entity()
export class Appointment {
  
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  date: string; 

  @Field()
  @Column()
  time: string;

  @Field()
  @Column({ default: 'PENDING' })
  status: string; 

  @Field(() => Patient)
  @ManyToOne(() => Patient, { eager: true })
  patient: Patient;

  @Field(() => Medecin)
  @ManyToOne(() => Medecin, { eager: true })
  medecin: Medecin;
}
