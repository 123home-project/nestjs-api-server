import { snsAccountUserDto } from 'src/auth/dtos/sns-account-user.dto';
import { JwtRefreshTokenDto } from '../dtos/jwt-refresh-token.dto';
import { LocalRegisterDto } from '../dtos/local-register.dto';
import { JwtAccessTokenDto } from '../dtos/jwt-access-token.dto';
import { PasswordForgetDto } from '../dtos/password-forget.dto';
import { PasswordResetDto } from '../dtos/password-reset.dto';

export interface IAuthService {
  snsLogin(snsAccountUser: snsAccountUserDto);
  convertRefreshToken(refreshToken: JwtRefreshTokenDto);
  validateUserByLocalAccount(email: string, password: string);
  localLogin(userId: number);
  localRegister(localRegisterDto: LocalRegisterDto);
  verifyRegisterEmail(emailauthcode: string);
  resendVerifyEmail(accessTokenUser: JwtAccessTokenDto);
  sendPasswordResetEmail(passwordForgetDto: PasswordForgetDto);
  resetPassword(passwordResetDto: PasswordResetDto);
}
