import { IsNotEmpty, IsString, IsUrl } from '@nestjs/class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl({},  {message: 'All fields are required!'})
  avatar: string;
}
