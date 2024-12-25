import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DoctorLocation } from './doctor-location.entities';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'varchar', length: 100 })
  city: string;

  @Column({ type: 'varchar', length: 100 })
  state: string;

  @Column({ type: 'varchar', length: 10 })
  postal_code: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: true })
  longitude: number;

  @Column({
    type: 'enum',
    enum: ['Clinic', 'Hospital', 'Telehealth'],
    default: 'Hospital',
  })
  type: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // relations
  @OneToMany(() => DoctorLocation, (docLocation) => docLocation.location)
  doctorLocations?: DoctorLocation[];

  // @OneToMany(() => Slot, (slot) => slot.location)
  // slot: Slot[];
}
