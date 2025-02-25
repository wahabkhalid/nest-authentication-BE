import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsNumber } from 'class-validator';

export class CreateMiniatureDto {
  @ApiProperty({ description: 'Category ID to which the miniature belongs' })
  @IsUUID()
  categoryId: string;

  @ApiProperty({ description: 'URL where the miniature is located' })
  @IsString()
  miniatureLocationUrl: string;

  @ApiProperty({ description: 'Height of the miniature' })
  @IsNumber()
  height: number;

  @ApiProperty({ description: 'Width of the miniature' })
  @IsNumber()
  width: number;

  @ApiProperty({ description: 'Depth of the miniature' })
  @IsNumber()
  depth: number;
}
