import { AuthTokenRes } from '../dtos/auth-token.res';
import { SnsAccountUserReq } from '../dtos/sns-account-user.req';
import { JwtRefreshTokenReq } from '../dtos/jwt-refresh-token.req';
import { LocalRegisterReq } from '../dtos/local-register.req';
import { JwtAccessTokenReq } from '../dtos/jwt-access-token.req';
import { PasswordForgetReq } from '../dtos/password-forget.req';
import { PasswordResetReq } from '../dtos/password-reset.req';
import { UserRes } from 'src/user/dtos/user.res';

export interface IAuthService {
  snsLogin(snsAccountUser: SnsAccountUserReq): Promise<AuthTokenRes>;
  convertRefreshToken(refreshToken: JwtRefreshTokenReq): Promise<AuthTokenRes>;
  validateUserByLocalAccount(email: string, password: string): Promise<UserRes>;
  localLogin(userId: number): Promise<AuthTokenRes>;
  localRegister(localRegisterReq: LocalRegisterReq): Promise<AuthTokenRes>;
  verifyRegisterEmail(emailauthcode: string);
  resendVerifyEmail(accessTokenUser: JwtAccessTokenReq);
  sendPasswordResetEmail(passwordForgetReq: PasswordForgetReq);
  resetPassword(passwordResetReq: PasswordResetReq);
}
