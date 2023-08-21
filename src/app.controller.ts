import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UserDto } from './dtos/user-dtos';
import { TweetDto } from './dtos/tweet-dtos';
import { get } from 'http';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  // users related
  @Post('/sign-up')
  @HttpCode(HttpStatus.OK)
  postUser(@Body() body: UserDto) {
    try {
      return this.appService.postUser(body);
    } catch (error) {
      throw new HttpException(
        'User already exist or is invalid',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Get('/users')
  getUsers() {
    return this.appService.getUsers();
  }

  // tweets related
  @Post('/tweets')
  postTweet(@Body() body: TweetDto) {
    try {
      const newTweet = this.appService.postTweet(body);
      if (!newTweet)
        throw new HttpException(
          'Something went wrong!',
          HttpStatus.UNAUTHORIZED,
        );

      return newTweet;
    } catch (error) {
      throw new HttpException('Something went wrong!', HttpStatus.UNAUTHORIZED);
    }
  }

  @Get('/tweets')
  getAllTweet(@Query('page') page: number) {
    try {
      if (page && (isNaN(page) || page <= 1))
        throw new HttpException(
          'Something went wrong!',
          HttpStatus.BAD_REQUEST,
        );

      return this.appService.getAllTweet(page);
    } catch (error) {
      throw new HttpException('Something went wrong!', HttpStatus.BAD_REQUEST);
    }
  }

  // tweets by username
  @Get('/tweets/:username')
  getTweetsByUsername(@Param('username') username: string){
    try {
      return this.appService.getTweetsByUsername(username);
    } catch (error) {
      throw new HttpException('Something went wrong!', HttpStatus.BAD_REQUEST);
    }
  }
}
