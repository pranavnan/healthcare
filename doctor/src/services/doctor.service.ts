import { inject, injectable } from 'inversify';
import { TYPES } from '../inversify/types';
import { IDoctorService } from '../interfaces/doctor/doctor.service.interface';
import { IDoctorRepository } from '../interfaces/doctor/doctor.repository.interface';
import { CreateDoctorDTO } from '../dtos/create-doctor-dto';
import { Doctor } from '../entities/doctor.entities';

@injectable()
export class DoctorService implements IDoctorService {
  constructor(
    @inject(TYPES.DoctorRepository)
    private doctorRepo: IDoctorRepository
  ) {}

  async createDoctor(dto: CreateDoctorDTO): Promise<Doctor> {
    const doctor = await this.doctorRepo.createAndSaveDoctor(dto);

    return doctor;
  }

  async getDoctors() {
    return await this.doctorRepo.getAllDoctors();
  }
}
