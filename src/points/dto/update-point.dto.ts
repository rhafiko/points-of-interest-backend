import { MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdatePointDto {
  @ApiProperty()
  @MinLength(4, {
    message: 'Place Name must be longer than or equal to 4 characters',
  })
  @MaxLength(80, {
    message: 'Place Name must be shorter than or equal to 40 characters',
  })
  title: string;
}
