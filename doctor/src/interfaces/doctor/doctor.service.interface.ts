import { Doctor } from '../../entities/doctor.entities';
import { CreateDoctorDTO } from '../../dtos/create-doctor-dto';

export interface IDoctorService {
  createDoctor(dto: CreateDoctorDTO): Promise<Doctor>;
  getDoctors(): Promise<Doctor[]>;
}
