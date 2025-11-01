import { Module } from '@nestjs/common';
import { KeycloakConnectModule, TokenValidation } from 'nest-keycloak-connect';

@Module({
  imports: [
    KeycloakConnectModule.register({
      authServerUrl: 'http://localhost:8080/',
      realm: 'medFlow',
      clientId: 'nest-api',
      secret: process.env.KEYCLOAK_CLIENT_SECRET||'',
      tokenValidation: TokenValidation.ONLINE,
    }),
  ],
  exports: [KeycloakConnectModule],
})
export class KeycloakModule {}