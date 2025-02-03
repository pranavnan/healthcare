import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { DoctorLocation } from './doctor-location.entities';
import { DayOfWeek } from '@phntickets/booking';
import { Appointment } from './appointment.entities';

@Entity()
export class Slot {
  @PrimaryColumn()
  id: number;

  @ManyToOne(() => DoctorLocation, (docLoc) => docLoc.slot)
  doctorLocation: DoctorLocation;

  @Column({ type: 'time' })
  start_time: Date;

  @Column({ type: 'time' })
  end_time: Date;

  @Column({ type: 'enum', enum: DayOfWeek })
  day_of_week: DayOfWeek;

  @Column({ type: 'boolean', default: true })
  is_available: boolean;

  // relation
  @OneToMany(() => Appointment, (appointment) => appointment.slot)
  appointment: Appointment;
}
