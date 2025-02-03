import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import { Slot } from './slot.entities';

const uniqueFields = ['doctorId', 'locationId'];

@Entity()
@Unique('UQ_doctor_location', uniqueFields) // Ensures uniqueness of doctor-location pairs
// @Index('IDX_doctor_location', uniqueFields)
export class DoctorLocation {
  // doctorLocationId
  @PrimaryColumn()
  id: number;

  // doctorId
  // @Index()
  @Column()
  doctorId: number;

  // locationId
  // @Index()
  @Column()
  locationId: number;

  @Column({ type: 'varchar', length: 100 })
  doctorName: string;

  @Column({ type: 'varchar', length: 100 })
  locationName: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @OneToMany(() => Slot, (slot) => slot.doctorLocation)
  slot: Slot;
}
