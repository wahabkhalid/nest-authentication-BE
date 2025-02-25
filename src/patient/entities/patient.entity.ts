import { User } from '../../users/entities/users.entity';
import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClinicianPatient } from './clinician-patient.entity';

@Entity('patient')
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(
    () => ClinicianPatient,
    (clinicianPatient) => clinicianPatient.patient,
  )
  clinicianPatient: ClinicianPatient[];
}
