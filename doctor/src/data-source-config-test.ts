import { DataSourceOptions } from 'typeorm';

const TestDataSource: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Pranav@2448',
  database: 'healthcare',
  synchronize: true, // Set this to false in production
  // entities: ['./entities/**/*.entity.ts'],
  entities: ['src/entities/*{.ts,.js}'], // always give the path from root of our project
  // logging: true, // this will log each and every query executed by typeorm
};

export { TestDataSource };
