import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { ClinicianPatient } from './entities/clinician-patient.entity';
import { UsersModule } from 'src/users/users.module';
import { UserRoleModule } from 'src/user_role/user_role.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patient, ClinicianPatient]),
    UsersModule,
    UserRoleModule,
  ],
  controllers: [PatientController],
  providers: [PatientService],
  exports: [PatientService, TypeOrmModule],
})
export class PatientModule {}
