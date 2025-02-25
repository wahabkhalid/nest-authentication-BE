import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsNumber, IsOptional } from 'class-validator';

export class UpdateMiniatureDto {
  @ApiProperty({ description: 'Category ID of the miniature', required: false })
  @IsUUID()
  @IsOptional()
  categoryId?: string;

  @ApiProperty({
    description: 'URL where the miniature is located',
    required: false,
  })
  @IsString()
  @IsOptional()
  miniatureLocationUrl?: string;

  @ApiProperty({ description: 'Height of the miniature', required: false })
  @IsNumber()
  @IsOptional()
  height?: number;

  @ApiProperty({ description: 'Width of the miniature', required: false })
  @IsNumber()
  @IsOptional()
  width?: number;

  @ApiProperty({ description: 'Depth of the miniature', required: false })
  @IsNumber()
  @IsOptional()
  depth?: number;
}
