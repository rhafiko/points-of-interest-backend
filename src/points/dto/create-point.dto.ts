import { IsLatitude, IsLongitude, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreatePointDto {
  @ApiProperty()
  @IsLatitude({ message: 'Latitude must be a latitude string or number' })
  lat: string;

  @ApiProperty()
  @IsLongitude({ message: 'Longitude must be a longitude string or number' })
  lng: string;

  @ApiProperty()
  @MinLength(4, {
    message: 'Place Name must be longer than or equal to 4 characters',
  })
  @MaxLength(80, {
    message: 'Place Name must be shorter than or equal to 40 characters',
  })
  title: string;
}
