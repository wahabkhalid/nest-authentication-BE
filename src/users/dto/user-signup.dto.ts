// src/auth/dto/signup.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsUUID, MinLength } from 'class-validator';

export class SignupDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail({}, { message: 'please provide a valid email' })
  @Transform(({ value }) => value.toLowerCase())
  @IsEmail()
  @ApiProperty({
    description: 'Email for user',
    required: true,
  })
  email: string;

  @ApiProperty({
    description: 'ID of user role',
    required: true,
  })
  @IsUUID()
  @Type(() => String)
  @IsNotEmpty()
  roleId: string;

  @ApiProperty()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User Password',
    required: true,
  })
  @MinLength(6)
  password: string;
}
