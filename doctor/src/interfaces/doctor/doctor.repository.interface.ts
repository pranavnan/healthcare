import { Doctor } from '../../entities/doctor.entities';
import {CreateDoctorDTO} from "../../dtos/create-doctor-dto";

export interface IDoctorRepository {
  getAllDoctors(): Promise<Doctor[]>;
  createAndSaveDoctor(doctorData: CreateDoctorDTO): Promise<Doctor>;
  getDoctor(): Promise<Doctor>;
  updateDoctor(): Promise<Doctor>;
}
