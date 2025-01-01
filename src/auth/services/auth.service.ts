import { Inject, Injectable } from '@nestjs/common';
import { IAuthService } from '../interfaces/auth.service.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IUserService } from 'src/user/interfaces/user.service.inteface';
import { snsAccountUserDto } from '../dtos/sns-account-user.dto';
import { IRefreshTokenRepository } from '../interfaces/refresh-token.repository.interface';
import { RefreshToken } from '../entities/refresh-token.entity';
import { User } from 'src/user/entities/user.entity';
import { jwtRefreshTokenDto } from '../dtos/jwt-refresh-token.dto';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject('IUserService') private readonly userService: IUserService,
    @Inject('IRefreshTokenRepository') private readonly refreshTokenRepository: IRefreshTokenRepository,
  ) {}
  async snsLogin(snsAccountUser: snsAccountUserDto) {
    const userAccount = await this.verifyValidateUserBySnsAcccountUser(snsAccountUser);

    return await this.getAuthToken(userAccount.userId);
  }

  async convertRefreshToken(refreshToken: jwtRefreshTokenDto) {
    return await this.getAuthToken(refreshToken.userId);
  }

  private async verifyValidateUserBySnsAcccountUser(snsAccountUser: snsAccountUserDto) {
    const userAccount = await this.userService.getUserAndAccountByAccountId(snsAccountUser.accountId);

    if (!userAccount) {
      return await this.userService.addUserBySnsAccount(snsAccountUser);
    }

    return userAccount;
  }

  private async getAuthToken(userId: number) {
    const user = await this.userService.getUserById(userId);

    const accessTokenPayload = {
      userId: user.id,
      nickname: user.nickname,
      registerDate: user.createdAt,
      platform: user.userAccount.platform,
    };

    const refreshTokenPayload = {
      userId: user.id,
      platform: user.userAccount.platform,
    };

    const authToken = {
      refreshToken: this.jwtService.sign(refreshTokenPayload, {
        expiresIn: this.configService.get('jwt.refreshTokenExpires'),
      }),
      accessToken: this.jwtService.sign(accessTokenPayload, {
        expiresIn: this.configService.get('jwt.accessTokenExpires'),
      }),
    };

    await this.addRefreshToken(authToken.refreshToken, user);

    return authToken;
  }

  async addRefreshToken(refreshToken: string, user: User) {
    const refreshTokenEntity = new RefreshToken();
    refreshTokenEntity.token = refreshToken;
    refreshTokenEntity.user = user;

    await this.refreshTokenRepository.addRefreshToken(refreshTokenEntity);
  }
}
