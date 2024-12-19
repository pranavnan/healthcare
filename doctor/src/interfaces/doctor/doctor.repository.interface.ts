import { Doctor } from '../../entities/doctor.entities';

export interface IDoctorRepository {
  getAllDoctors(): Promise<Doctor[]>;
}
