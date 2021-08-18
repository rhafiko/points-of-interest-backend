import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,20})$/, {
    message: 'password is too weak',
  })
  password: string;
}
