import { snsAccountUserDto } from 'src/auth/dtos/sns-account-user.dto';
import { jwtRefreshTokenDto } from '../dtos/jwt-refresh-token.dto';

export interface IAuthService {
  snsLogin(snsAccountUser: snsAccountUserDto);
  convertRefreshToken(refreshToken: jwtRefreshTokenDto);
}
