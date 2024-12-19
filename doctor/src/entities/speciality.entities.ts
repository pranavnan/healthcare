import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Doctor } from './doctor.entities';

@Entity()
export class Speciality {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @OneToMany(() => Doctor, (doctor) => doctor.speciality)
  doctor: Doctor[];
}
