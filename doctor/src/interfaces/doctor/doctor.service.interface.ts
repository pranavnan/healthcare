import { Doctor } from '../../entities/doctor.entities';
import { CreateDoctorDTO } from '../../dtos/create-doctor-dto';

export interface IDoctorService {
  /**
   * This method creates a doctor
   * @param dto CreateDoctorDTO
   * @returns Promise<Doctor> with created doctor
   */
  createDoctor(dto: CreateDoctorDTO): Promise<Doctor>;
  getDoctors(page: number, limit: number): Promise<Doctor[]>;
  getDoctor(id: number): Promise<Doctor>;
  updateDoctor(id: number, dto: CreateDoctorDTO): Promise<Doctor>;
}
