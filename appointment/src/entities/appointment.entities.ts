import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Slot } from './slot.entities';
import { AppointmentStatus } from '../utils/appointment-status-enum';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: 'varchar', length: 15 })
  usernumber: string;

  @Column({ type: 'enum', enum: Object.values(AppointmentStatus) })
  status: string;

  @Column({ type: 'date' })
  appointmentDate: Date;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;

  // relations
  @ManyToOne(() => Slot, (slot) => slot.appointment)
  slot: Slot;
}
