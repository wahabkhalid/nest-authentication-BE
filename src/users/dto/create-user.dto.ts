import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { UserRole } from '../../user_role/entities/user-role.entity';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail({}, { message: 'email must be valid' })
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @ApiProperty()
  userRole: UserRole;

  @ApiProperty()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User Password',
    required: true,
  })
  @MinLength(6)
  password: string;
}
