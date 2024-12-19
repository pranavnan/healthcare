import { inject, injectable } from 'inversify';
import { TYPES } from '../inversify/types';
import { IDoctorService } from '../interfaces/doctor/doctor.service.interface';
import { IDoctorRepository } from '../interfaces/doctor/doctor.repository.interface';

@injectable()
export class DoctorService implements IDoctorService {
  constructor(
    @inject(TYPES.DoctorRepositoryInterface)
    private doctorRepo: IDoctorRepository
  ) {}

  async createDoctor() {
    console.log('Inside DoctorService');
  }

  async getDoctors() {
    // throw new Error('hi there');
    console.log('hi there');
    return await this.doctorRepo.getAllDoctors();
  }
}
