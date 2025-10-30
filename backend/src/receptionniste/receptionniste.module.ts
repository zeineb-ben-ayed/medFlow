import { Module } from '@nestjs/common';
import { ReceptionnisteService } from './receptionniste.service';
import { ReceptionnisteResolver } from './receptionniste.resolver';

@Module({
  providers: [ReceptionnisteService, ReceptionnisteResolver]
})
export class ReceptionnisteModule {}
