// below is working
import { DataSource } from 'typeorm';
import { AppDataSource } from '../data-source';

// let dataSource: DataSource;
beforeAll(async function () {
  // We are creating the dummy with the same credentials because we want to create a healthcare-test DB
  // const tempDataSource = new DataSource({
  //   type: 'mysql',
  //   host: 'localhost',
  //   port: 3306,
  //   username: 'root',
  //   password: 'Pranav@2448',
  //   database: 'mysql', // Default MySQL database
  // });

  // await tempDataSource.initialize();

  // // Create the healthcare-test database if it doesn't exist
  // await tempDataSource.query(
  //   `CREATE DATABASE IF NOT EXISTS \`healthcare-test\``
  // );
  // await tempDataSource.destroy();

  // await AppDataSource.initialize()
  //   .then()
  //   .catch((err) => console.log(err));
  await AppDataSource.initialize();
  await AppDataSource.query(
    `CREATE DATABASE IF NOT EXISTS \`healthcare-test\``
  )
}, 30_000);

beforeEach(async function () {
  await AppDataSource.dropDatabase();

  await AppDataSource.synchronize();
}, 30_000);

afterAll(async function () {
  await AppDataSource.query(`DROP DATABASE IF EXISTS \`healthcare-test\``);
  await AppDataSource.destroy();
}, 30_000);
