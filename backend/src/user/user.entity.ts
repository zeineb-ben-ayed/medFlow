import { ObjectType, Field, ID, InterfaceType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, TableInheritance } from 'typeorm';

@InterfaceType()
@Entity('users')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  keycloak_id: string;

  @Field()
  @Column()
  role: string; 

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  dateNaissance?: string;
}
