import { RefreshToken } from '../entities/refresh-token.entity';

export interface IRefreshTokenRepository {
  addRefreshToken(refreshToken: RefreshToken);
}
