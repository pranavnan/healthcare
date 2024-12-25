import { Container } from 'inversify';
import { TYPES } from './types';
import { DataSource } from 'typeorm';
import { AppDataSource } from '../data-source';

const container = new Container();

container.bind<DataSource>(TYPES.DataSource).toConstantValue(AppDataSource);

export { container };
