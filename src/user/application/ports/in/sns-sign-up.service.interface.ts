import { SignUpCommand } from './sns-sign-up.command';

export interface ISnsSignUpService {
  snsSignUp(command: SignUpCommand);
}
