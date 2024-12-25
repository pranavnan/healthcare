import { DataSource, Repository } from 'typeorm';
import { IDoctorRepository } from '../../interfaces/doctor/doctor.repository.interface';
import { IDoctorService } from '../../interfaces/doctor/doctor.service.interface';
import { DoctorRepository } from '../../repository/doctor.repository';
import { DoctorService } from '../../services/doctor.service';
import { container } from '../container';
import { TYPES } from '../types';
import { Doctor } from '../../entities/doctor.entities';

container.bind<IDoctorService>(TYPES.DoctorService).to(DoctorService);
container.bind<IDoctorRepository>(TYPES.DoctorRepository).to(DoctorRepository);
// container.bind<DataSource>(TYPES.DataSource).toConstantValue(AppDataSource);
container
  .bind<Repository<Doctor>>(TYPES.TypeORMDoctorRepository)
  .toDynamicValue((context) => {
    const dataSource = context.container.get<DataSource>(TYPES.DataSource);
    return dataSource.getRepository(Doctor);
  });
