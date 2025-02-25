import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePatientDto {
  @ApiProperty({
    type: 'string',
    description: 'email of user',
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'must be a valid email' })
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @ApiProperty({
    type: 'string',
    description: 'Initials value',
    minLength: 1,
    maxLength: 4,
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 4)
  initials: string;
}
