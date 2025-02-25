import { Controller, Delete, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  AuthenticatedUser,
  AuthenticatedUserType,
} from '../auth/decorator/authenticated-user';
import { JwtBasicGuard } from '../auth/guard/jwt-basic.guard';

@UseGuards(JwtBasicGuard)
@ApiBearerAuth()
@Controller('users')
@ApiTags('User')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get user',
    description: 'user fetched successfully',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'user fetched successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'user not found',
  })
  @Get('')
  async findOne(
    @AuthenticatedUser() authUser: AuthenticatedUserType,
  ): Promise<object> {
    const data = await this.userService.findOne(authUser.id);
    return data;
  }

  @ApiOperation({
    description: 'user deleted',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'user deleted',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'user not found',
  })
  @Delete()
  async deleteUser(
    @AuthenticatedUser() authUser: AuthenticatedUserType,
  ): Promise<{ message: string }> {
    await this.userService.deleteUser(authUser.id);
    return { message: 'user deleted' };
  }
}
