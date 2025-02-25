import { Module } from '@nestjs/common';
import { ClinicianProfileService } from './clinician_profile.service';
import { ClinicianProfileController } from './clinician_profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clinician } from './entities/clinician-profile.entity';
import { User } from '../users/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Clinician, User])],
  controllers: [ClinicianProfileController],
  providers: [ClinicianProfileService],
  exports: [ClinicianProfileService, TypeOrmModule],
})
export class ClinicianProfileModule {}
