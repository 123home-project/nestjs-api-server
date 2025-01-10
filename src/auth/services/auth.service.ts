import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IAuthService } from '../interfaces/auth.service.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IUserService } from 'src/user/interfaces/user.service.inteface';
import { snsAccountUserDto } from '../dtos/sns-account-user.dto';
import { IRefreshTokenRepository } from '../interfaces/refresh-token.repository.interface';
import { RefreshToken } from '../entities/refresh-token.entity';
import { User } from 'src/user/entities/user.entity';
import { JwtRefreshTokenDto } from '../dtos/jwt-refresh-token.dto';
import { LocalRegisterDto } from '../dtos/local-register.dto';
import { IEmailService } from 'src/email/interfaces/email.service.inteface';
import { ICryptoService } from 'src/crypto/interfaces/crypto.service.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject('IUserService') private readonly userService: IUserService,
    @Inject('IRefreshTokenRepository') private readonly refreshTokenRepository: IRefreshTokenRepository,
    @Inject('IEmailService') private readonly emailService: IEmailService,
    @Inject('ICryptoService') private readonly cryptoService: ICryptoService,
  ) {}
  async snsLogin(snsAccountUser: snsAccountUserDto) {
    const userAccount = await this.validateUserBySnsAcccountUser(snsAccountUser);

    return await this.getAuthToken(userAccount.userId);
  }

  async convertRefreshToken(refreshToken: JwtRefreshTokenDto) {
    return await this.getAuthToken(refreshToken.userId);
  }

  async validateUserByLocalAccount(email: string, password: string) {
    const userAccount = await this.userService.getUserAndAccountByAccountId(email);

    if (!userAccount) {
      throw new UnauthorizedException('올바르지 않은 아이디 혹은 비밀번호');
    }

    const match = await this.cryptoService.passwordMatch(password, userAccount.password);

    if (!match) {
      throw new UnauthorizedException('올바르지 않은 아이디 혹은 비밀번호');
    }

    return userAccount;
  }

  localLogin(userId: number) {
    return this.getAuthToken(userId);
  }

  async localRegister(localRegisterDto: LocalRegisterDto) {
    localRegisterDto.password = await this.cryptoService.passwordEcrypt(localRegisterDto.password);
    const userAccount = await this.userService.addUserByLocal(localRegisterDto);
    const emailAuthToken = this.cryptoService.twoWayEncrypt(String(userAccount.user.id));
    await this.emailService.sendLocalRegisterVerifyEmail(localRegisterDto.email, emailAuthToken);

    return this.getAuthToken(userAccount.user.id);
  }

  private async validateUserBySnsAcccountUser(snsAccountUser: snsAccountUserDto) {
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
      verify: user.userAccount.verify,
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
