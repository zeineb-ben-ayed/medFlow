import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Patient } from 'src/patient/patient.entity';
import { Medication } from 'src/medication/medication.entity';

@ObjectType()
@Entity('consultations')
export class Consultation {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  symptoms: string;

  @Field()
  @Column()
  diagnosis: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  additionalNotes?: string;

  @Field(() => Patient)
  @ManyToOne(() => Patient, { eager: true })
  patient: Patient;

  @Field(() => [Medication], { nullable: true })
  @OneToMany(() => Medication, (m) => m.consultation, { cascade: true })
  prescription?: Medication[];
}
