import { DataSource } from 'typeorm';
import { TestDataSource } from './data-source-config-test';
import { MainDataSource } from './data-source-config';

const isTest = process.env.NODE_ENV === 'test';
const dataSource = isTest ? TestDataSource : MainDataSource;

const AppDataSource = new DataSource(dataSource);

export { AppDataSource };
