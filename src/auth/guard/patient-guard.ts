import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { userRoleEnums } from 'src/constants/enums';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class PatientGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    const fullUser = await this.userService.findFullUserByEmailAndRole(
      user.email,
      user?.roleId,
      {
        userRole: true,
      },
    );

    if (!fullUser) {
      throw new UnauthorizedException('user not found');
    }
    if (fullUser?.userRole.key !== userRoleEnums.PATIENT) {
      throw new UnauthorizedException(
        'You are not authorized to perform this action',
      );
    }

    return true;
  }
}
