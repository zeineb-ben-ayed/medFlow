import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Patient } from 'src/patient/patient.entity';
import { Receptionniste } from 'src/receptionniste/receptionniste.entity';
import { Medecin } from 'src/medecin/medecin.entity';
import { PatientModule } from 'src/patient/patient.module';
import { ReceptionnisteModule } from 'src/receptionniste/receptionniste.module';
import { MedecinModule } from 'src/medecin/medecin.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Patient,
      Medecin,
      Receptionniste,
    ]),
  ],
  providers: [AuthResolver, AuthService],
  exports: [AuthResolver, AuthService],
})
export class AuthModule {}