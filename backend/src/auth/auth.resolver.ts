import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthResponse } from './dto/auth-response.dto';
import axios from 'axios';
import { Public } from 'nest-keycloak-connect';
import { AuthService } from './auth.service';
import { ExtraDataInput } from './dto/extra-data-input.dto';
import { Context } from '@nestjs/graphql';
import { Response } from 'express';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }
  private keycloakUrl = 'http://localhost:8080';
  private realm = 'medFlow';
  private clientId = 'nest-api';
  private clientSecret = 'eg9sUSqP6w6WW9WwJB9yEvQDKWRCUoVi';
  @Public()
  @Mutation(() => AuthResponse)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
    @Context('res') res: Response,
  ): Promise<AuthResponse> {
    try {
      const params = new URLSearchParams();
      params.append('client_id', this.clientId);
      params.append('client_secret', this.clientSecret);
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

      // Store in secure HTTP-only cookies
      res.cookie('access_token', data.access_token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/',
      });

      res.cookie('refresh_token', data.refresh_token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/',
      });

      return data;
    } catch (error) {
      console.error('KEYCLOAK ERROR:', error.response?.data);
      throw error;
    }
  }

  @Public()
  @Mutation(() => AuthResponse)
  async refreshToken(@Args('refreshToken') refreshToken: string, @Context('res') res: Response): Promise<AuthResponse> {
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('client_id', this.clientId);
    params.append('client_secret', this.clientSecret);
    params.append('refresh_token', refreshToken);

    const { data } = await axios.post(
      `${this.keycloakUrl}/realms/${this.realm}/protocol/openid-connect/token`,
      params.toString(),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    res.cookie('access_token', data.access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
    });

    res.cookie('refresh_token', data.refresh_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
    });

    return data;
  }

  @Public()
  @Mutation(() => String)
  async register(
    @Args('username') username: string,
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('role') role: string,
    @Args('dateNaissance') dateNaissance: string,
    @Args('firstName') firstName: string,
    @Args('lastName') lastName: string,
    @Args('phoneNumber') phoneNumber: string,
    @Args('extraData', { nullable: true }) extraData?: ExtraDataInput,
  ): Promise<string> {
    return this.authService.register(
      username,
      email,
      password,
      role,
      dateNaissance,
      firstName,
      lastName,
      phoneNumber,
      extraData,
    );
  }
}
