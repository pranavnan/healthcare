import { Doctor } from '../../entities/doctor.entities';
import { CreateDoctorDTO } from '../../dtos/create-doctor-dto';

export interface IDoctorRepository {
  getAllDoctors(skip: number, take: number): Promise<Doctor[]>;
  createAndSaveDoctor(doctorData: CreateDoctorDTO): Promise<Doctor>;
  getDoctor(id: number): Promise<Doctor>;
  updateDoctor(id: number, dto: CreateDoctorDTO): Promise<Doctor>;
}
