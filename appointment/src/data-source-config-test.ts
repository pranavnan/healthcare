import { DataSourceOptions } from 'typeorm';

const TestDataSource: DataSourceOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_TEST_DATABASE,
  synchronize: true, //Set this to false in production
  entities: ['src/entities/*{.ts,.js}'], // always give the path from root of our project
  // logging: true,
};

export { TestDataSource };
