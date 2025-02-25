import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateTrayDto {
  @ApiProperty({
    description: 'ID of session',
    required: true,
  })
  @IsUUID()
  @Type(() => String)
  @IsNotEmpty()
  sessionId: string;

  @ApiProperty({
    description: 'Miniature Ids which will be added to patient tray',
    required: false,
    type: [String],
    default: [],
  })
  @IsNotEmpty()
  @IsOptional()
  @IsArray()
  @Type(() => String)
  @ArrayMinSize(0)
  @IsUUID(4, { each: true })
  @ArrayUnique()
  miniatureIds: string[];
}
