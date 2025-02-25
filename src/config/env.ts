import * as dotenv from 'dotenv';
import { AllEntities } from '../all-entities';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

class EnvConfig {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    const path = process.env.ENV_FILE || '.env';
    dotenv.config({ path });
    this.envConfig = process.env;
  }

  get DB_CONFIG(): PostgresConnectionOptions {
    return {
      type: 'postgres',
      host: this.envConfig['DB_HOST'] || '127.0.0.1',
      port: +this.envConfig['DB_PORT'],
      username: this.envConfig['DB_USERNAME'],
      password: this.envConfig['DB_PASSWORD'],
      database: this.envConfig['DB_NAME'],
      entities: AllEntities,
      logging: false,
      synchronize: true,
      maxQueryExecutionTime: 30000,
      connectTimeoutMS: 30000,
      extra: {
        connectionLimit: 40,
      },
      ...(this.envConfig['NODE_ENV'] !== 'localhost' &&
        this.envConfig['NODE_ENV'] !== 'test' && {
          ssl: false,
        }),
    };
  }
  get JWT_SECRET(): string {
    return this.envConfig['JWT_SECRET'];
  }
  get BE_PORT(): number {
    return +this.envConfig['BE_PORT'];
  }
  get JWT_TOKEN_EXPIRATION_IN_HOURS(): number {
    return +this.envConfig['JWT_TOKEN_EXPIRATION_IN_HOURS'] || 1;
  }
  get ENABLE_SWAGGER(): boolean {
    return !!+this.envConfig['ENABLE_SWAGGER'];
  }
}
export const ENV = new EnvConfig();
