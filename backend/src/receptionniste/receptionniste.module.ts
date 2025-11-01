import { Module } from '@nestjs/common';
import { ReceptionnisteService } from './receptionniste.service';
import { ReceptionnisteResolver } from './receptionniste.resolver';
import { Receptionniste } from './receptionniste.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Receptionniste])],
  providers: [ReceptionnisteService, ReceptionnisteResolver]
})
export class ReceptionnisteModule {}
