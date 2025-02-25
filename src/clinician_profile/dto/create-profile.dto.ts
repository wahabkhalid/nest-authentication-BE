import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClinicianProfileDto {
  @ApiProperty({
    description: 'Name of the clinician.',
    example: 'Dr. John Smith',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Name of the clinician’s practice.',
    example: 'Healthy Minds Clinic',
  })
  @IsOptional()
  @IsString()
  practiceName?: string;

  @ApiProperty({
    description: 'License number of the clinician (optional).',
    example: 'AB1234567',
    required: false,
  })
  @IsOptional()
  @IsString()
  licenseNumber?: string;

  @ApiProperty({
    description: 'licenseState of clinician lisense.',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  licenseState: string;

  @ApiProperty({
    description: 'licenseCountry of clinician lisense.',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  licenseCountry: string;
}
