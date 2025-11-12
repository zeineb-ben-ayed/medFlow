import { Global, Module } from '@nestjs/common';
import {
  KeycloakConnectModule,
  PolicyEnforcementMode,
  TokenValidation,
} from 'nest-keycloak-connect';
import { KeycloakAdminService } from './keycloak-admin.service';
@Global()
@Module({
  imports: [
    KeycloakConnectModule.register({
      authServerUrl: 'http://localhost:8080/',
      realm: 'medFlow',
      clientId: 'nest-api',
      secret: 'lesqS4bzVgytRxd4UU0bAStzcYRmN2Z8',
      tokenValidation: TokenValidation.ONLINE,
    }),
  ],
  providers: [KeycloakAdminService],
  exports: [KeycloakConnectModule, KeycloakAdminService],
})
export class KeycloakModule {}
