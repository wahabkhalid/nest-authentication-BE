import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Patient } from './patient.entity';
import { Clinician } from '../../clinician_profile/entities/clinician-profile.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('clinician_patient')
export class ClinicianPatient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Patient, (patient) => patient.id)
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @ManyToOne(() => Clinician, (clinician) => clinician.id)
  @JoinColumn({ name: 'clinician_id' })
  clinician: Clinician;

  @ApiProperty()
  @Column({ name: 'initials', nullable: true })
  initials: string;
}
