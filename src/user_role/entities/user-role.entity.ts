import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ref_user_role')
export class UserRole {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ name: 'label' })
  label: string;

  @ApiProperty()
  @Column({ name: 'key', unique: true })
  key: string;
}
