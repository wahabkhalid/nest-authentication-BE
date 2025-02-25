import { ApiProperty } from '@nestjs/swagger';
import { Status } from '../../constants/enums';
import { User } from '../../users/entities/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('clinician')
export class Clinician {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ name: 'name' })
  name: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true, name: 'practice_name' })
  practiceName: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true, name: 'license_number' })
  licenseNumber: string;

  @ApiProperty({ required: false })
  @Column({ nullable: false, name: 'status', default: Status.PENDING })
  status: Status;

  @ApiProperty({ required: true })
  @Column({ nullable: false, name: 'license_state' })
  licenseState: string;

  @ApiProperty({ required: true })
  @Column({ nullable: false, name: 'license_country' })
  licenseCountry: string;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
