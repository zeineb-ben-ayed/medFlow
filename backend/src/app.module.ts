import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { MedecinModule } from './medecin/medecin.module';
import { PatientModule } from './patient/patient.module';
import { ReceptionnisteModule } from './receptionniste/receptionniste.module';
import { AuthGuard, KeycloakConnectModule, ResourceGuard, RoleGuard } from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';
import { KeycloakModule } from './keycloak/keycloak.module';
import { AuthResolver } from './auth/auth.resolver';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { Receptionniste } from './receptionniste/receptionniste.entity';
import { Medecin } from './medecin/medecin.entity';
import { AppointmentModule } from './appointment/appointment.module';

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground:true,
      sortSchema: true,
      context: ({ req, res }) => ({ req, res }),
      buildSchemaOptions: {
        orphanedTypes: [Medecin, Receptionniste],
  },
    }),
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root', 
      database: 'medFlow',
      autoLoadEntities: true,
      synchronize: true, 
    }),

    UserModule,

    MedecinModule,

    PatientModule,

    ReceptionnisteModule,
    
    KeycloakModule,

    AuthModule,

    AppointmentModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: ResourceGuard },
    { provide: APP_GUARD, useClass: RoleGuard },
    AuthResolver,],
})
export class AppModule {}
