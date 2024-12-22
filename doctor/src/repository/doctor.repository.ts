import { inject, injectable } from 'inversify';
import { TYPES } from '../inversify/types';
import { Repository } from 'typeorm';
import { Doctor } from '../entities/doctor.entities';
import { IDoctorRepository } from '../interfaces/doctor/doctor.repository.interface';
import { CreateDoctorDTO } from '../dtos/create-doctor-dto';
import { ISpecialityRepository } from '../interfaces/speciality/speciality.repository.interface';
import { localLog } from '../utils/localLog';

@injectable()
export class DoctorRepository implements IDoctorRepository {
  constructor(
    @inject(TYPES.TypeORMDoctorRepository)
    private doctorRepo: Repository<Doctor>,
    @inject(TYPES.SpecialityRepository)
    private specialityRepo: ISpecialityRepository
  ) {}

  getDoctor(): Promise<Doctor> {
    throw new Error('Method not implemented.');
  }
  updateDoctor(): Promise<Doctor> {
    throw new Error('Method not implemented.');
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

    const speciality = await this.specialityRepo.findById(speciality_id);

    const doctor = new Doctor();
    doctor.bio = bio;
    doctor.email = email;
    doctor.name = name;
    doctor.phone = phone;
    doctor.profile_picture = profile_picture;
    doctor.qualification = qualification;
    doctor.speciality = speciality;
    doctor.years_of_experience = years_of_experience;

    await this.doctorRepo.save(doctor);
    return doctor;
  }

  async getAllDoctors() {
    return await this.doctorRepo.find();
  }
}
