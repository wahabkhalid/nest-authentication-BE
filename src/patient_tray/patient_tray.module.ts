import { Module } from '@nestjs/common';
import { PatientTrayService } from './patient_tray.service';
import { PatientTrayController } from './patient_tray.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientTray } from './entities/create-tray.entity';
import { Miniature } from 'src/miniatures/entities/miniature.entity';
import { SessionModule } from '../session/session.module';
import { UsersModule } from '../users/users.module';
import { TrayMiniatures } from './entities/tray-miniatures.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { TrayViewHistory } from './entities/tray-view-history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PatientTray,
      Miniature,
      TrayMiniatures,
      Patient,
      TrayViewHistory,
    ]),
    SessionModule,
    UsersModule,
  ],
  controllers: [PatientTrayController],
  providers: [PatientTrayService],
  exports: [PatientTrayService, TypeOrmModule],
})
export class PatientTrayModule {}
