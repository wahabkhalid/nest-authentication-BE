import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PatientTray } from '../../patient_tray/entities/create-tray.entity';

@Entity('session')
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ name: 'date', type: 'date' })
  date: Date;

  @ApiProperty()
  @Column({ name: 'time', type: 'timestamptz' })
  time: Date;

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'client_user_id' })
  patientUser: User;

  @OneToMany(() => PatientTray, (patientTray) => patientTray.session)
  patientTray: PatientTray[];
  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'clinician_user_id' })
  clinicianUser: User;
}
