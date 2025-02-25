import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PatientTray } from './create-tray.entity';
import { Miniature } from 'src/miniatures/entities/miniature.entity';

@Entity()
export class TrayMiniatures {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => PatientTray, (patientTray) => patientTray.id)
  @JoinColumn({ name: 'patientTray_id' })
  patientTray: PatientTray;

  @ManyToOne(() => Miniature, (miniature) => miniature.id)
  @JoinColumn({ name: 'miniature_id' })
  miniature: Miniature; // ✅ Remove the array notation
}
