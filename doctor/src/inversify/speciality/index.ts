import { DataSource, Repository } from 'typeorm';
import { ISpecialityRepository } from '../../interfaces/speciality/speciality.repository.interface';
import { SpecialityRepository } from '../../repository/speciality.repository';
import { container } from '../container';
import { TYPES } from '../types';
import { Speciality } from '../../entities/speciality.entities';

container
  .bind<ISpecialityRepository>(TYPES.SpecialityRepository)
  .to(SpecialityRepository);

container
  .bind<Repository<Speciality>>(TYPES.TypeORMSpeciality)
  .toDynamicValue((context) => {
    const dataSource = context.container.get<DataSource>(TYPES.DataSource);
    return dataSource.getRepository(Speciality);
  });
