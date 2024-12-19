// import 'reflect-metadata';

import { DataSource } from 'typeorm';
import { TestDataSource } from './data-source-config-test';
import { MainDataSource } from './data-source-config';

process.env.NODE_ENV = 'test';
const isTest = process.env.NODE_ENV === 'test';
console.log({ isTest });
const dataSource = isTest ? TestDataSource : MainDataSource;

const AppDataSource = new DataSource(dataSource);

export { AppDataSource };
