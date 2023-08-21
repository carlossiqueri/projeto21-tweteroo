import { IsNotEmpty, IsString, IsUrl } from '@nestjs/class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl({},  {message: 'Required fields cannot be empty!'})
  avatar: string;
}
