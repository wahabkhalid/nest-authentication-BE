import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { MainSeeder } from './main.seeder';
import dbConfig from '../config/dbConfig';

const options: DataSourceOptions & SeederOptions = {
  ...dbConfig(),
  synchronize: false, // Change this to false

  seeds: [MainSeeder],
};

const datasource = new DataSource(options);
datasource.initialize().then(async () => {
  try {
    await runSeeders(datasource);
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    process.exit();
  }
});
