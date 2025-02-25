import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { UserRoleSeeder } from './seeders/user_role.seeder';
import { UserRole } from '../user_role/entities/user-role.entity';
import { Category } from '../category/entities/category.entity';
import { CategorySeeder } from './seeders/category.seeder';

export class MainSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const userRoleRepository = dataSource.getRepository(UserRole);
    const existingRoles = await userRoleRepository.find({
      where: [{ key: 'admin' }, { key: 'patient' }, { key: 'clinician' }],
    });

    console.log('existingRoles', existingRoles);
    if (existingRoles?.length === 0) {
      console.log('Seeding user roles...');
      const roles = UserRoleSeeder.getData();
      await userRoleRepository.save(roles);
      console.log('User roles seeded successfully.');
    } else {
      console.log('User roles already exist. Skipping seeding.');
    }

    const categoryRepository = dataSource.getRepository(Category);
    const existingCategories = await categoryRepository.find();

    console.log('existingCategories', existingCategories);
    if (existingCategories?.length === 0) {
      console.log('Seeding categories...');
      const categories = CategorySeeder.getData();
      await categoryRepository.save(categories);
      console.log('Categories seeded successfully.');
    } else {
      console.log('Categories already exist. Skipping seeding.');
    }
  }
}
