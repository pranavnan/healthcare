import { Doctor } from '../../entities/doctor.entities';

export interface IDoctorService {
  createDoctor(): Promise<void>;
  getDoctors(): Promise<Doctor[]>;
}
