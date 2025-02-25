import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category')
export class Category {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ name: 'label' })
  label: string;

  @ApiProperty()
  @Column({ name: 'key', unique: true })
  key: string;
  @Column({ name: 'url', nullable: true })
  url: string;
}
