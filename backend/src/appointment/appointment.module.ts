import { Module } from '@nestjs/common';
import { AppointmentResolver } from './appointment.resolver';
import { AppointmentService } from './appointment.service';
import { Appointment } from './appointment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment,User])],
  providers: [AppointmentResolver, AppointmentService]
})
export class AppointmentModule {}
