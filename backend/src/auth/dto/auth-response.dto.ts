import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AuthResponse {
  @Field()
  access_token: string;

  @Field()
  refresh_token: string;

  @Field()
  expires_in: number;

  @Field({ nullable: true })
  id_token?: string;
}