import { DataSourceOptions } from 'typeorm';

const MainDataSource: DataSourceOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: true, // Set this to false in production
  // entities: ['./entities/**/*.entity.ts'],
  entities: ['src/entities/*{.ts,.js}'], // always give the path from root of our project
  logging: true, // this will log each and every query executed by typeorm
};
console.log(MainDataSource);
// const MainDataSource: DataSourceOptions = {
//   type: "mysql",
//   host: process.env.MYSQL_HOST,
//   port: Number(process.env.MYSQL_PORT),
//   username: process.env.MYSQL_USER,
//   password: process.env.MYSQL_ROOT_PASSWORD,
//   database: process.env.MYSQL_DATABASE,
//   synchronize: true, // Set this to false in production
//   // entities: ['./entities/**/*.entity.ts'],
//   entities: ["src/entities/*{.ts,.js}"], // always give the path from root of our project
//   // logging: true, // this will log each and every query executed by typeorm
// };

export { MainDataSource };
