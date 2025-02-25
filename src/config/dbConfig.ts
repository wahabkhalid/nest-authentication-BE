import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { registerAs } from '@nestjs/config';
import { ENV } from './env';

export default registerAs(
  'dbconfig.dev',
  (): PostgresConnectionOptions => ENV.DB_CONFIG,
);
