import { Container } from 'inversify';
import { DoctorService } from '../services/doctor.service';
import { TYPES } from './types';
import { DataSource, Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { Doctor } from '../entities/doctor.entities';
import { DoctorRepository } from '../repository/doctor.repository';
import { IDoctorService } from '../interfaces/doctor/doctor.service.interface';
import { IDoctorRepository } from '../interfaces/doctor/doctor.repository.interface';

const container = new Container();

container.bind<DataSource>(TYPES.DataSource).toConstantValue(AppDataSource);

export { container };
