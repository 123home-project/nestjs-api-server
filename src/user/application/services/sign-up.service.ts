import { Injectable } from '@nestjs/common';
import { ISignUpService } from '../ports/in/sign-up.service.interface';
import { SignUpCommand } from '../ports/in/sign-up.command';

@Injectable()
export class SignUpService implements ISignUpService {
  async signUp(command: SignUpCommand) {
    const { platform, id, pw } = command;
  }
}
