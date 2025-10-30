import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthResponse } from './dto/auth-response.dto';
import axios from 'axios';

@Resolver()
export class AuthResolver {
    @Mutation(() => AuthResponse)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<AuthResponse> {
    const params = new URLSearchParams();
    params.append('client_id', 'nest-api');
    params.append(
      'client_secret',
      process.env.KEYCLOAK_CLIENT_SECRET || 'REPLACE_WITH_CLIENT_SECRET',
    );
    params.append('grant_type', 'password');
    params.append('username', username);
    params.append('password', password);

    const { data } = await axios.post(
      'http://localhost:8080/realms/medFlow/protocol/openid-connect/token',
      params.toString(),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    );

    return data;
  }
  @Query(() => String)
  hello() {
    return 'Hello World';
  }

}
