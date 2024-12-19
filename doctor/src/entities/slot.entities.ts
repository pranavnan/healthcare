import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DoctorLocation } from './doctor-location.entities';
import { DayOfWeek } from '@phntickets/booking';

@Entity()
export class Slot {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => Doctor, (doctor) => doctor.slot, { onDelete: 'CASCADE' })
  // doctor: Doctor;

  // @ManyToOne(() => Location, (location) => location.slot, {
  //   onDelete: 'CASCADE',
  // })
  // location: Location;

  @ManyToOne(() => DoctorLocation, (docLoc) => docLoc.slot)
  doctorLocation: DoctorLocation;

  @Column({ type: 'time' })
  start_time: Date;

  @Column({ type: 'time' })
  end_time: Date;

  @Column({ type: 'boolean', default: true })
  is_available: boolean;

  @Column({ type: 'enum', enum: DayOfWeek })
  day_of_week: DayOfWeek;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
