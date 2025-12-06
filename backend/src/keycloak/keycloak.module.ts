import { Global, Module } from '@nestjs/common';
import { KeycloakConnectModule, TokenValidation } from 'nest-keycloak-connect';
import { KeycloakAdminService } from './keycloak-admin.service';

@Global()
@Module({
  imports: [
    KeycloakConnectModule.register({
      authServerUrl: 'http://localhost:8080/',
      realm: 'medFlow',
      clientId: 'nest-api',
      secret:
        process.env.KEYCLOAK_CLIENT_SECRET || 'eg9sUSqP6w6WW9WwJB9yEvQDKWRCUoVi',
      tokenValidation: TokenValidation.ONLINE,
    }),
  ],
  providers: [KeycloakAdminService],
  exports: [KeycloakConnectModule, KeycloakAdminService],
})
export class KeycloakModule { }
