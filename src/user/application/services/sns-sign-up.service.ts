import { Injectable } from '@nestjs/common';
import { ISnsSignUpService } from '../ports/in/sns-sign-up.service.interface';
import { SignUpCommand } from '../ports/in/sns-sign-up.command';
import { SignUpStrategyMap } from 'src/user/domain/strategy/map/sns-sign-up.strategy.map';

@Injectable()
export class SnsSignUpService implements ISnsSignUpService {
  constructor(private signUpStrategyMap?: SignUpStrategyMap) {}
  async snsSignUp(command: SignUpCommand) {
    const { platform, snsSignUpDto } = command;
    const signUpStrategy = this.signUpStrategyMap.getStrategy(platform);
    signUpStrategy.signUp(snsSignUpDto);
  }
}
