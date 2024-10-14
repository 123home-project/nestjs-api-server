import { GoogleSignUpDto } from 'src/user/adepter/in/controllers/dto/sns-sign-up.dto';

export interface ISnsSignUpStrategy {
  signUp(signUpDto: GoogleSignUpDto);
}
