import { Container } from 'inversify';
import { DoctorController } from '../controllers/doctor.controller';
import { DoctorService } from '../services/doctor.service';
import { TYPES } from './types';
import { DataSource, Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { Doctor } from '../entities/doctor.entities';
import { DoctorRepository } from '../repository/doctor.repository';
import { IDoctorService } from '../interfaces/doctor/doctor.service.interface';
import { IDoctorRepository } from '../interfaces/doctor/doctor.repository.interface';

const container = new Container();

container.bind<IDoctorService>(TYPES.DoctorService).to(DoctorService);
container.bind<IDoctorRepository>(TYPES.DoctorRepository).to(DoctorRepository);
container.bind<DataSource>(TYPES.DataSource).toConstantValue(AppDataSource);
container
  .bind<Repository<Doctor>>(TYPES.TypeORMDoctorRepository)
  .toDynamicValue((context) => {
    const dataSource = context.container.get<DataSource>(TYPES.DataSource);
    return dataSource.getRepository(Doctor);
  });
// Configure your bindings in the container

// Step 2: Configure inversify
// Create an Inversify Container
// The container holds all your service bindings and ensures instances are injected where needed.

// Define Identifiers
// Use symbols or constants to define the services.

// Bind the DoctorService
// container.bind<DoctorService>(TYPES.DoctorService).to(DoctorService);

// Bind the DoctorController
// container.bind<DoctorController>(TYPES.DoctorController).to(DoctorController);

// Step 1: Bind the DataSource
// container.bind<DataSource>(TYPES.DataSource).toConstantValue(AppDataSource);
// container
//   .bind<DoctorRepository>(TYPES.DoctorRepository)
//   // .toConstantValue(AppDataSource.getRepository(Doctor))
//   .toDynamicValue((context) => {
//     const dataSource = context.container.get<DataSource>(TYPES.DataSource);
//     return new DoctorRepository(dataSource.getRepository(Doctor));
//   });

export { container };
