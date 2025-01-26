import { inject, injectable } from 'inversify';
import { TYPES } from '../inversify/types';
import { Repository } from 'typeorm';
import { Doctor } from '../entities/doctor.entities';
import { IDoctorRepository } from '../interfaces/doctor/doctor.repository.interface';
import { CreateDoctorDTO } from '../dtos/create-doctor-dto';
import { ISpecialityRepository } from '../interfaces/speciality/speciality.repository.interface';
import { NotFoundError } from '@phntickets/booking';

@injectable()
export class DoctorRepository implements IDoctorRepository {
  constructor(
    @inject(TYPES.TypeORMDoctorRepository)
    private doctorRepo: Repository<Doctor>,
    @inject(TYPES.SpecialityRepository)
    private specialityRepo: ISpecialityRepository
  ) {}

  // private methods

  private async saveDoctor(doctor: Doctor): Promise<Doctor> {
    return await this.doctorRepo.save(doctor);
  }

  private async checkSpeciality(specialityId: number) {
    const speciality = await this.specialityRepo.findById(specialityId);
    if (!speciality) {
      throw new NotFoundError(
        `No speciality found for speciality_id ${specialityId}`
      );
    }
    return speciality;
  }

  async getDoctor(id: number): Promise<Doctor> {
    const doctor = await this.doctorRepo.findOne({
      where: {
        id,
      },
    });
    if (!doctor) {
      throw new NotFoundError('Doctor not found');
    }
    return doctor;
  }

  async updateDoctor(id: number, dto: CreateDoctorDTO): Promise<Doctor> {
    // update the doctor with the given id
    const doctor = await this.doctorRepo.findOne({
      where: {
        id,
      },
    });

    if (!doctor) {
      throw new NotFoundError('Doctor not found');
    }

    if (dto.speciality_id) {
      const speciality = await this.checkSpeciality(dto.speciality_id);
      doctor.speciality = speciality;
    }

    // assign the incomming updated fields for doctor
    Object.assign(doctor, dto);

    return await this.saveDoctor(doctor);
  }

  async createAndSaveDoctor(doctorData: CreateDoctorDTO): Promise<Doctor> {
    const {
      speciality_id,
      bio,
      email,
      name,
      phone,
      profile_picture,
      qualification,
      years_of_experience,
    } = doctorData;

    const speciality = await this.checkSpeciality(speciality_id);

    const doctor = new Doctor();
    doctor.bio = bio;
    doctor.email = email;
    doctor.name = name;
    doctor.phone = phone;
    doctor.profile_picture = profile_picture;
    doctor.qualification = qualification;
    doctor.speciality = speciality;
    doctor.years_of_experience = years_of_experience;

    return await this.saveDoctor(doctor);
  }

  async getAllDoctors(skip: number, take: number): Promise<Doctor[]> {
    return await this.doctorRepo.find({
      skip,
      take,
    });
  }
}
