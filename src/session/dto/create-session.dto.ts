import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateSessionDto {
  @ApiProperty({
    description: 'Email of the patient',
    example: 'patient@example.com',
  })
  @IsEmail({}, { message: 'must be a valid email' })
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  patientEmail: string;

  @ApiProperty({
    description: 'TimeStamp of the session in UTC format',
    example: '2024-12-20T12:00:00Z',
  })
  @IsDateString()
  @IsNotEmpty()
  startTime: string;

  @ApiProperty({
    description: 'Optional ID of the patient',
    example: '12345',
    required: false,
  })
  @IsString()
  @IsOptional()
  patientId?: string;

  @ApiProperty({
    description: 'Optional intials of the patient',
    example: 'Ab',
    required: false,
  })
  @IsString()
  @Length(1, 4)
  initials: string;
}
