import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ISignUpService } from '../../../application/ports/in/sign-up.service.interface';
import { LoginDto } from './dto/login.dto';
import { SignUpCommand } from 'src/user/application/ports/in/sign-up.command';

@Controller('users')
export class UserController {
  constructor(@Inject('IUserService') private readonly loginService: ISignUpService) {}

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    const command = new SignUpCommand(loginDto.platform, loginDto.id, loginDto.pw);

    return this.loginService.signUp(command);
  }
}
