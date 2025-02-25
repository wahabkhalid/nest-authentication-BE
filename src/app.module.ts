import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ENV } from './config/env';
import { ClinicianProfileModule } from './clinician_profile/clinician_profile.module';
import { UserRoleModule } from './user_role/user_role.module';
import { CategoryModule } from './category/category.module';
import { MiniaturesModule } from './miniatures/miniatures.module';
import { PatientModule } from './patient/patient.module';
import { SessionModule } from './session/session.module';
import { PatientTrayModule } from './patient_tray/patient_tray.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    UserRoleModule,
    TypeOrmModule.forRoot(ENV.DB_CONFIG),
    ClinicianProfileModule,
    UserRoleModule,
    CategoryModule,
    MiniaturesModule,
    PatientModule,
    SessionModule,
    PatientTrayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
