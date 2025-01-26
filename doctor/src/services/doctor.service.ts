import { inject, injectable } from 'inversify';
import { TYPES } from '../inversify/types';
import { IDoctorService } from '../interfaces/doctor/doctor.service.interface';
import { IDoctorRepository } from '../interfaces/doctor/doctor.repository.interface';
import { CreateDoctorDTO } from '../dtos/create-doctor-dto';
import { Doctor } from '../entities/doctor.entities';
import {
  allowedFields,
  hasAllowedFieldsForEntity,
} from '../utils/allowed-fields';
import { BadRequestError } from '@phntickets/booking';
import { filterField } from '../utils/filter-fields';

const entity = 'doctor';

@injectable()
export class DoctorService implements IDoctorService {
  constructor(
    @inject(TYPES.DoctorRepository)
    private doctorRepo: IDoctorRepository
  ) {}

  async createDoctor(dto: CreateDoctorDTO): Promise<Doctor> {
    return await this.doctorRepo.createAndSaveDoctor(dto);
  }

  async getDoctors(page: number, limit: number): Promise<Doctor[]> {
    const skip = (page - 1) * limit;
    return await this.doctorRepo.getAllDoctors(skip, limit);
  }

  async getDoctor(id: number): Promise<Doctor> {
    return await this.doctorRepo.getDoctor(id);
  }

  async updateDoctor(id: number, dto: CreateDoctorDTO): Promise<Doctor> {
    const hasPropertiesForUpdate = hasAllowedFieldsForEntity(entity, dto);

    if (!hasPropertiesForUpdate) {
      throw new BadRequestError('Invalid properties for update');
    }

    const filterUpdateFields = filterField(
      dto,
      allowedFields[entity]
    ) as CreateDoctorDTO;

    if (!Object.keys(filterUpdateFields).length) {
      throw new BadRequestError('No properties for update');
    }

    const updatedDoctor = await this.doctorRepo.updateDoctor(
      id,
      filterUpdateFields
    );

    return updatedDoctor;
  }
}
