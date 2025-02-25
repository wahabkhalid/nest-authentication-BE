import { Expose, Exclude } from 'class-transformer';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ReponseUser {
  @ApiProperty()
  @Expose()
  @IsString()
  email: string;
}
