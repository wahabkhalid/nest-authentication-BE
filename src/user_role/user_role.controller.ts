import { Controller, Get } from '@nestjs/common';
import { UserRoleService } from './user_role.service';
import { UserRole } from './entities/user-role.entity';

@Controller('user-roles')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Get()
  getAllUserRoles(): Promise<UserRole[]> {
    return this.userRoleService.getAllUserRoles();
  }
}
