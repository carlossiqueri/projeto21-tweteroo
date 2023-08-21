import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UserDto } from './dtos/user-dtos';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('sign-up')
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
}
