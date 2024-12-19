import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Doctor } from './doctor.entities';
import { Location } from './location.entities';
import { Slot } from './slot.entities';

@Entity()
@Unique(['doctor', 'location']) // Ensures uniqueness of doctor-location pairs
export class DoctorLocation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Doctor, (doctor) => doctor.doctorLocations)
  doctor: Doctor;

  @ManyToOne(() => Location, (location) => location.doctorLocations)
  location: Location;

  @Column({ type: 'boolean' })
  is_primary: boolean;

  @Column({
    type: 'enum',
    enum: ['Active', 'Inactive', 'On Leave'],
    default: 'Active',
  })
  is_active: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // relations
  @OneToMany(() => Slot, (slot) => slot.doctorLocation)
  slot: Slot[];
}
