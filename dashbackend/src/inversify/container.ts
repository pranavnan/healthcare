import { TYPES } from '@phntickets/booking';

import { AppDataSource } from '../data-source';
import { DataSource } from 'typeorm';
import { Container } from 'inversify';

const container = new Container();

container.bind<DataSource>(TYPES.DataSource).toConstantValue(AppDataSource);

export { container };
