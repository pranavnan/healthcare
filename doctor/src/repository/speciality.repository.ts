import { inject } from 'inversify';
import { Speciality } from '../entities/speciality.entities';
import { ISpecialityRepository } from '../interfaces/speciality/speciality.repository.interface';
import { TYPES } from '../inversify/types';
import { Repository } from 'typeorm';
import { NotFoundError } from '@phntickets/booking';

export class SpecialityRepository implements ISpecialityRepository {
  constructor(
    @inject(TYPES.TypeORMSpeciality)
    private specialityRepo: Repository<Speciality>
  ) {}

  async findById(id: number): Promise<Speciality> {
    console.log({ id });
    const speciality = await this.specialityRepo.findOne({
      where: {
        id: id,
      },
    });
    if (!speciality) {
      throw new NotFoundError(`No speciality found for speciality_id ${id}`);
    }
    return speciality;
  }
}
