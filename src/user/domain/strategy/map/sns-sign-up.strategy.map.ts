import { Injectable } from '@nestjs/common';
import { ISnsSignUpStrategy } from '../interfaces/sns-sign-up.strategy.interface';
import { SnsSignUpPlatformType } from 'src/user/type/SnsSignUpPlatformType';
import { GoogleSignUpStrategy } from '../google-sign-up.strategy';

@Injectable()
export class SignUpStrategyMap {
  private readonly strategy: Record<SnsSignUpPlatformType, ISnsSignUpStrategy>;

  constructor(private readonly googleSignUpStrategy: GoogleSignUpStrategy) {
    this.strategy = {
      [SnsSignUpPlatformType.Google]: googleSignUpStrategy,
    };
  }

  getStrategy(platform: SnsSignUpPlatformType) {
    return this.strategy[platform];
  }
}
