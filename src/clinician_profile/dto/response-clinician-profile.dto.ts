import { Expose, Exclude, Type } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ReponseUser } from './response-user.dto';

@Exclude()
export class ClinicianProfileResponseDto {
  @ApiProperty({ description: 'Id of the clinician' })
  @Expose()
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Name of the clinician' })
  @Expose()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Name of the practice' })
  @Expose()
  @IsString()
  practiceName: string;

  @ApiProperty({ description: 'Status of the clinician' })
  @Expose()
  @IsString()
  status: string;

  @ApiProperty({
    description: 'License number of the clinician',
    required: false,
  })
  @Expose()
  @IsString()
  licenseNumber?: string;

  @ApiProperty({ description: 'License state of the clinician' })
  @Expose()
  @IsString()
  licenseState: string;

  @ApiProperty({ description: 'License country of the clinician' })
  @Expose()
  @IsString()
  licenseCountry: string;

  @ApiProperty({ description: 'User associated with the clinician' })
  @Expose()
  @Type(() => ReponseUser)
  user: ReponseUser;
}
