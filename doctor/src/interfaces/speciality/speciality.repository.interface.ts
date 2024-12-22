import { Speciality } from '../../entities/speciality.entities';

export interface ISpecialityRepository {
  findById(id: number): Promise<Speciality>;
}
