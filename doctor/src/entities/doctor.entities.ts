import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Speciality } from './speciality.entities';
import { DoctorLocation } from './doctor-location.entities';
import { Slot } from './slot.entities';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ManyToOne(() => Speciality, { onDelete: 'NO ACTION', eager: true })
  @JoinColumn()
  speciality: Speciality;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  qualification: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  profile_picture: string;

  @Column({ type: 'int' })
  years_of_experience: number;

  @Column({ type: 'text' })
  bio: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // relations
  @OneToMany(() => DoctorLocation, (docLocation) => docLocation.doctor)
  doctorLocations: DoctorLocation[];

  // @OneToMany(() => Slot, (slot) => slot.doctor)
  // slot: Slot[];
}
