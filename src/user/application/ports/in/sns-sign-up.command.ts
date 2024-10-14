import { GoogleSignUpDto } from 'src/user/adepter/in/controllers/dto/sns-sign-up.dto';
import { SnsSignUpPlatformType } from 'src/user/type/SnsSignUpPlatformType';

export class SignUpCommand {
  constructor(
    readonly platform: SnsSignUpPlatformType,
    readonly snsSignUpDto: GoogleSignUpDto,
  ) {}
}
