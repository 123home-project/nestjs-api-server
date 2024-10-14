import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ISnsSignUpService } from '../../../application/ports/in/sns-sign-up.service.interface';
import { SnsSignUpDto } from './dto/sns-sign-up.dto';
import { SignUpCommand } from 'src/user/application/ports/in/sns-sign-up.command';

@Controller('users')
export class UserController {
  constructor(@Inject('ISnsSignUpService') private readonly snsSignUpService: ISnsSignUpService) {}

  @Post('/sns-sign-up')
  snsSignUp(@Body() snsSignUpDto: SnsSignUpDto) {
    const command = new SignUpCommand(snsSignUpDto.platform, snsSignUpDto.snsSignUpDto);

    return this.snsSignUpService.snsSignUp(command);
  }
}
