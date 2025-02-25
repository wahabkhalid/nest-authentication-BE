import { PartialType } from '@nestjs/swagger';
import { CreateClinicianProfileDto } from './create-profile.dto';

export class UpdateClinicianProfileDto extends PartialType(
  CreateClinicianProfileDto,
) {}
