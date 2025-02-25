import { Injectable } from '@nestjs/common';
import { UserRole } from './entities/user-role.entity';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { userRoleEnums } from 'src/constants/enums';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
  ) {}

  getAllUserRoles() {
    return this.userRoleRepository.find({
      where: { key: Not(userRoleEnums.ADMIN) },
    });
  }
  getAUserByKey(key: string): Promise<UserRole> {
    return this.userRoleRepository.findOne({
      where: { key },
    });
  }
}
