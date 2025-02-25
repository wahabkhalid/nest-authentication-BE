import { ApiProperty } from '@nestjs/swagger';
import { Clinician } from '../../clinician_profile/entities/clinician-profile.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { UserRole } from '../../user_role/entities/user-role.entity';
import { Miniature } from '../../miniatures/entities/miniature.entity';
import { Patient } from 'src/patient/entities/patient.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ApiProperty({ required: false, type: Boolean })
  @Column({ nullable: true, default: false, name: 'is_profile_completed' })
  profileCompleted: boolean;

  @ManyToOne(() => UserRole, (userRole) => userRole.id)
  @JoinColumn({ name: 'role_id' })
  userRole: UserRole;

  @OneToOne(() => Clinician, (clinician) => clinician.user)
  clinician: Clinician;

  @OneToMany(() => Miniature, (miniature) => miniature.user)
  miniatures: Miniature[];

  @OneToOne(() => Patient, (patient) => patient.id)
  patient: Patient;
}
