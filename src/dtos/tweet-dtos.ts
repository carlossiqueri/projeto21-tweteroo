import { IsNotEmpty, IsString } from '@nestjs/class-validator';

export class TweetDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  tweet: string;
}
