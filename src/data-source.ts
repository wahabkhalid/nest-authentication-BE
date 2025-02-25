import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { AllEntities } from './all-entities';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || '127.0.0.1',
  port: +process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: AllEntities,
  synchronize: true,
  logging: false,

  seeds: ['src/database/seeds/**/*{.ts,.js}'],
  seedTracking: false,
};

export const dataSource = new DataSource(options);
