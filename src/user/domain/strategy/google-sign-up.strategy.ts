import { Injectable } from '@nestjs/common';
import { ISnsSignUpStrategy } from './interfaces/sns-sign-up.strategy.interface';
import { GoogleSignUpDto } from 'src/user/adepter/in/controllers/dto/sns-sign-up.dto';

@Injectable()
export class GoogleSignUpStrategy implements ISnsSignUpStrategy {
  signUp(snsSignUpDto: GoogleSignUpDto) {
    console.log(snsSignUpDto);
  }
}
