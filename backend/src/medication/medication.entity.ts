import { Field, ObjectType } from '@nestjs/graphql';
import { Consultation } from 'src/consultation/consultation.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@ObjectType()
@Entity('medications')
export class Medication {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  dosage: string;

  @Field()
  @Column()
  frequency: string;

  @Field()
  @Column()
  duration: string;

  @ManyToOne(() => Consultation, (c) => c.prescription, { onDelete: 'CASCADE' })
  consultation: Consultation;
}
