import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetPointsFilterDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  search?: string;
}
