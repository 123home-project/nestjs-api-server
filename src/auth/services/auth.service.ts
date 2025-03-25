import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IAuthService } from '../interfaces/auth.service.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IUserService } from 'src/user/interfaces/user.service.inteface';
import { SnsAccountUserReq } from '../dtos/sns-account-user.req';
import { IRefreshTokenRepository } from '../interfaces/refresh-token.repository.interface';
import { RefreshToken } from '../entities/refresh-token.entity';
import { User } from 'src/user/entities/user.entity';
import { IEmailService } from 'src/email/interfaces/email.service.inteface';
import { ICryptoService } from 'src/crypto/interfaces/crypto.service.interface';
import { AuthTokenRes } from '../dtos/auth-token.res';
import { plainToInstance } from 'class-transformer';
import { UserRes } from 'src/user/dtos/user.res';
import { JwtRefreshTokenReq } from '../dtos/jwt-refresh-token.req';
import { LocalRegisterReq } from '../dtos/local-register.req';
import { JwtAccessTokenReq } from '../dtos/jwt-access-token.req';
import { PasswordForgetReq } from '../dtos/password-forget.req';
import { PasswordResetReq } from '../dtos/password-reset.req';

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
  async snsLogin(snsAccountUser: SnsAccountUserReq): Promise<AuthTokenRes> {
    const user = await this.validateUserBySnsAcccountUser(snsAccountUser);

    return await this.getAuthToken(user.id);
  }

  async convertRefreshToken(refreshToken: JwtRefreshTokenReq): Promise<AuthTokenRes> {
    return await this.getAuthToken(refreshToken.userId);
  }

  async validateUserByLocalAccount(email: string, password: string): Promise<UserRes> {
    const user = await this.userService.getUserByAccountId(email);

    if (!user) {
      throw new UnauthorizedException('올바르지 않은 아이디 혹은 비밀번호');
    }

    const match = await this.cryptoService.passwordMatch(password, user.userAccount.password);

    if (!match) {
      throw new UnauthorizedException('올바르지 않은 아이디 혹은 비밀번호');
    }

    return plainToInstance(UserRes, user, {
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
    });
  }

  localLogin(userId: number): Promise<AuthTokenRes> {
    return this.getAuthToken(userId);
  }

  async localRegister(localRegisterReq: LocalRegisterReq): Promise<AuthTokenRes> {
    if (await this.userService.getLocalUserByEmail(localRegisterReq.email)) {
      throw new BadRequestException('이미 가입된 계정 이메일입니다.', 'EmailAlreadyExists');
    }

    localRegisterReq.password = await this.cryptoService.passwordEcrypt(localRegisterReq.password);
    const user = await this.userService.addUserByLocal(localRegisterReq);

    const emailAuthCode = this.createEmailSecretToken(user.id);
    await this.emailService.sendLocalRegisterVerifyEmail(localRegisterReq.email, emailAuthCode);
    return this.getAuthToken(user.id);
  }

  async verifyRegisterEmail(emailauthtoken: string) {
    const emailAuthTokenJson = JSON.parse(this.cryptoService.twoWayDecrypt(emailauthtoken));

    if (emailAuthTokenJson.expire < Number(new Date())) {
      throw new UnauthorizedException('인증 시간이 초과되었습니다.', 'VerifyTimeOut');
    }

    await this.userService.verifyUserAccountByUserId(emailAuthTokenJson.userId);
  }

  async addRefreshToken(refreshToken: string, user: UserRes) {
    const refreshTokenEntity = new RefreshToken();
    refreshTokenEntity.token = refreshToken;
    refreshTokenEntity.user = plainToInstance(User, user);

    await this.refreshTokenRepository.addRefreshToken(refreshTokenEntity);
  }

  async resendVerifyEmail(accessTokenUser: JwtAccessTokenReq) {
    const user = await this.userService.getUserById(accessTokenUser.userId);
    const emailAuthCode = this.createEmailSecretToken(accessTokenUser.userId);
    await this.emailService.sendLocalRegisterVerifyEmail(user.email, emailAuthCode);
  }

  async sendPasswordResetEmail(passwordForgetReq: PasswordForgetReq) {
    const user = await this.userService.getLocalUserByEmail(passwordForgetReq.email);
    const emailAuthCode = this.createEmailSecretToken(user.id);
    await this.emailService.sendResetPasswordEmail(user.email, emailAuthCode);
  }

  async resetPassword(passwordResetReq: PasswordResetReq) {
    const { emailAuthCode, password } = passwordResetReq;
    const emailAuthTokenJson = JSON.parse(this.cryptoService.twoWayDecrypt(emailAuthCode));

    if (emailAuthTokenJson.expire < Number(new Date())) {
      throw new UnauthorizedException('인증 시간이 초과되었습니다.', 'VerifyTimeOut');
    }
    const passwordEcrypt = await this.cryptoService.passwordEcrypt(password);
    await this.userService.resetUserAccountPasswordByUserId(emailAuthTokenJson.userId, passwordEcrypt);
  }

  private async validateUserBySnsAcccountUser(snsAccountUser: SnsAccountUserReq): Promise<UserRes> {
    const user = await this.userService.getUserByAccountId(snsAccountUser.accountId);
    if (!user) {
      return await this.userService.addUserBySnsAccount(snsAccountUser);
    }

    return plainToInstance(UserRes, user, {
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
    });
  }

  private async getAuthToken(userId: number): Promise<AuthTokenRes> {
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

    return plainToInstance(AuthTokenRes, authToken, {
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
    });
  }

  private createEmailSecretToken(userId: number): string {
    const nowtime = new Date();
    const emailAuthTokenJson = {
      userId: userId,
      expire: nowtime.setMinutes(nowtime.getMinutes() + 30),
    };

    return this.cryptoService.twoWayEncrypt(JSON.stringify(emailAuthTokenJson));
  }
}
