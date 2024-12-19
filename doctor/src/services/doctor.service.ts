import { inject, injectable } from 'inversify';
import { TYPES } from '../inversify/types';
import { IDoctorService } from '../interfaces/doctor/doctor.service.interface';
import { IDoctorRepository } from '../interfaces/doctor/doctor.repository.interface';

@injectable()
export class DoctorService implements IDoctorService {
  constructor(
    @inject(TYPES.DoctorRepository)
    private doctorRepo: IDoctorRepository
  ) {}

  async createDoctor() {
    console.log('Inside DoctorService');
  }

  async getDoctors() {
    return await this.doctorRepo.getAllDoctors();
  }
}
