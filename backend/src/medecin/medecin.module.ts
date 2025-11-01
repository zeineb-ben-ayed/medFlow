import { Module } from '@nestjs/common';
import { MedecinService } from './medecin.service';
import { MedecinResolver } from './medecin.resolver';
import { Medecin } from './medecin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Medecin])],
  providers: [MedecinService, MedecinResolver]
})
export class MedecinModule {}
