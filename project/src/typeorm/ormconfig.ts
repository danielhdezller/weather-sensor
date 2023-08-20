import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const jestDataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST_TEST,
  port: +process.env.DB_PORT_TEST,
  username: process.env.DB_USER_TEST,
  password: process.env.DB_PASSWORD_TEST,
  database: process.env.DB_DATABASE_TEST,
  synchronize: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
};

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/typeorm/migrations/**/*.js'],
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
