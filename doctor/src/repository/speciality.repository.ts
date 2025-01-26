import { inject } from 'inversify';
import { Speciality } from '../entities/speciality.entities';
import { ISpecialityRepository } from '../interfaces/speciality/speciality.repository.interface';
import { TYPES } from '../inversify/types';
import { Repository } from 'typeorm';

export class SpecialityRepository implements ISpecialityRepository {
  constructor(
    @inject(TYPES.TypeORMSpeciality)
    private specialityRepo: Repository<Speciality>
  ) {}

  async findById(id: number): Promise<Speciality | null> {
    console.log({ speciality_id: id });
    const speciality = await this.specialityRepo.findOne({
      where: {
        id: id,
      },
    });
    return speciality;
  }
}
