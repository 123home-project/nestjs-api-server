import { Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { IAuthService } from '../interfaces/auth.service.interface';

export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(@Inject('IAuthService') private readonly authService: IAuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<number> {
    const user = await this.authService.validateUserByLocalAccount(email, password);

    return user.id;
  }
}
