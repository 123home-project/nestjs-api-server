import { Body, Controller, Inject, Post } from '@nestjs/common';
import { IUserService } from './interface/user.service.interface';
import { LoginDto } from './dto/login.dto';

@Controller('users')
export class UserController {
  constructor(@Inject('IUserService') private readonly userService: IUserService) {}

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }
}
