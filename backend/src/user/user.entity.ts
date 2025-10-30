import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, TableInheritance } from 'typeorm';

@ObjectType()
@Entity('users')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  nom: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  motDePasse: string;

  @Field()
  @Column()
  role: string;

  
}
