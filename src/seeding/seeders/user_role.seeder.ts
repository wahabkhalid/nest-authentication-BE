import { UserRole } from '../../user_role/entities/user-role.entity';
import { ISeeder } from '../../types/seeder.type';
export const UserRoleSeeder: ISeeder<UserRole> = {
  getData: (): Partial<UserRole>[] => {
    return [
      {
        id: '28f6e9d8-c0b4-4b70-9212-65dfece8a093',
        label: 'Admin',
        key: 'admin',
      },
      {
        id: '05fe2ba4-4b71-41dd-b2dc-83d67a57a807',
        label: 'Mental Health Professional',
        key: 'clinician',
      },
      {
        id: 'e94e4c18-929a-41e9-b73d-761a0dbc971c',
        label: 'Patient',
        key: 'patient',
      },
    ];
  },
};
