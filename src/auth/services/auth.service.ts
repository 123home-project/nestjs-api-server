import { Inject, Injectable } from '@nestjs/common';
import { IAuthService } from '../interfaces/auth.service.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IUserService } from 'src/user/interfaces/user.service.inteface';
import { snsAccountUserDto } from '../dtos/sns-account-user.dto';
import { UserAccount } from 'src/user/entities/user-account.entity';
import { IRefreshTokenRepository } from '../interfaces/refresh-token.repository.interface';
import { RefreshToken } from '../entities/refresh-token.entity';
import { User } from 'src/user/entities/user.entity';

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

    return await this.getAuthToken(userAccount);
  }

  async verifyValidateUserBySnsAcccountUser(snsAccountUser: snsAccountUserDto) {
    const userAccount = await this.userService.getUserAndAccountByAccountId(snsAccountUser.accountId);

    if (!userAccount) {
      return await this.userService.addUserBySnsAccount(snsAccountUser);
    }

    return userAccount;
  }

  async getAuthToken(userAccount: UserAccount) {
    const accessTokenPayload = {
      userId: userAccount.user.id,
      nickname: userAccount.user.nickname,
      registerDate: userAccount.user.createdAt,
      platform: userAccount.platform,
    };

    const refreshTokenPayload = {
      userId: userAccount.id,
      platform: userAccount.platform,
    };

    const authToken = {
      refreshToken: this.jwtService.sign(refreshTokenPayload, {
        expiresIn: this.configService.get('jwt.refreshTokenExpires'),
      }),
      accessToken: this.jwtService.sign(accessTokenPayload, {
        expiresIn: this.configService.get('jwt.accessTokenExpires'),
      }),
    };

    await this.addRefreshToken(authToken.refreshToken, userAccount.user);

    return authToken;
  }

  async addRefreshToken(refreshToken: string, user: User) {
    const refreshTokenEntity = new RefreshToken();
    refreshTokenEntity.token = refreshToken;
    refreshTokenEntity.user = user;

    await this.refreshTokenRepository.addRefreshToken(refreshTokenEntity);
  }
}
