import { snsAccountUserDto } from 'src/auth/dtos/sns-account-user.dto';
import { JwtRefreshTokenDto } from '../dtos/jwt-refresh-token.dto';
import { LocalRegisterDto } from '../dtos/local-register.dto';

export interface IAuthService {
  snsLogin(snsAccountUser: snsAccountUserDto);
  convertRefreshToken(refreshToken: JwtRefreshTokenDto);
  validateUserByLocalAccount(email: string, password: string);
  localLogin(userId: number);
  localRegister(localRegisterDto: LocalRegisterDto);
}
