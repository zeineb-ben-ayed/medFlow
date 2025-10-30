import { Module } from '@nestjs/common';
import { MedecinService } from './medecin.service';
import { MedecinResolver } from './medecin.resolver';

@Module({
  providers: [MedecinService, MedecinResolver]
})
export class MedecinModule {}
