import { DataSourceOptions } from 'typeorm';

const TestDataSource: DataSourceOptions = {
  type: 'mysql',
  // host: 'localhost',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '',
  database: 'testdb',
  synchronize: true, // Set this to false in production
  // entities: ['./entities/**/*.entity.ts'],
  entities: ['src/entities/*{.ts,.js}'], // always give the path from root of our project
  // logging: true, // this will log each and every query executed by typeorm
};
export { TestDataSource };
