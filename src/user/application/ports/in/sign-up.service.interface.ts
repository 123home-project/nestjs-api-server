import { SignUpCommand } from './sign-up.command';

export interface ISignUpService {
  signUp(command: SignUpCommand);
}
