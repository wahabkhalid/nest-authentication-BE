import { User } from 'src/users/entities/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tray_view_history')
export class TrayViewHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'session_id' })
  sessionId: string;

  @Column({ name: 'time', type: 'timestamptz', nullable: true })
  time: Date;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'viewed_by' })
  viewedBy: User;
}
