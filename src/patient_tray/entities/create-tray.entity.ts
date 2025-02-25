import { Session } from '../../session/entities/create-session.entity';
import { Patient } from '../../patient/entities/patient.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TrayMiniatures } from './tray-miniatures.entity';

@Entity()
export class PatientTray {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Patient, (patient) => patient.id)
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @OneToOne(() => Session, (session) => session.patientTray)
  @JoinColumn({ name: 'session_id' })
  session: Session;

  @OneToMany(
    () => TrayMiniatures,
    (trayMiniatures) => trayMiniatures.patientTray,
  )
  trayMiniatures: TrayMiniatures[];
}
