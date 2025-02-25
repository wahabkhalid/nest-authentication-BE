import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicianProfileModule } from '../clinician_profile/clinician_profile.module';
import { PatientModule } from '../patient/patient.module';
import { Session } from './entities/create-session.entity';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Session]),
    ClinicianProfileModule,
    PatientModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [SessionController],
  providers: [SessionService],
  exports: [SessionService, TypeOrmModule],
})
export class SessionModule {}
