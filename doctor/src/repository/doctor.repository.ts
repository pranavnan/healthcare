import { inject, injectable } from 'inversify';
import { TYPES } from '../inversify/types';
import { Repository } from 'typeorm';
import { Doctor } from '../entities/doctor.entities';
import { IDoctorRepository } from '../interfaces/doctor/doctor.repository.interface';

@injectable()
export class DoctorRepository implements IDoctorRepository {
  constructor(
    @inject(TYPES.TypeORMDoctorRepository)
    private doctorRepo: Repository<Doctor> // private doctorRepo: Repository<Doctor>
  ) {}

  async getAllDoctors() {
    return await this.doctorRepo.find();
  }
}
