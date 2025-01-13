import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
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
import { JwtAccessTokenDto } from '../dtos/jwt-access-token.dto';
import { PasswordForgetDto } from '../dtos/password-forget.dto';
import { PasswordResetDto } from '../dtos/password-reset.dto';

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
    if (await this.userService.getLocalUserByEmail(localRegisterDto.email)) {
      throw new BadRequestException('이미 가입된 계정 이메일입니다.', 'EmailAlreadyExists');
    }

    localRegisterDto.password = await this.cryptoService.passwordEcrypt(localRegisterDto.password);
    const userAccount = await this.userService.addUserByLocal(localRegisterDto);

    const emailAuthCode = await this.createEmailSecretToken(userAccount.user.id);
    await this.emailService.sendLocalRegisterVerifyEmail(localRegisterDto.email, emailAuthCode);
    return this.getAuthToken(userAccount.user.id);
  }

  async verifyRegisterEmail(emailauthtoken: string) {
    const emailAuthTokenJson = JSON.parse(this.cryptoService.twoWayDecrypt(emailauthtoken));

    if (emailAuthTokenJson.expire < Number(new Date())) {
      throw new UnauthorizedException('인증 시간이 초과되었습니다.', 'VerifyTimeOut');
    }

    await this.userService.verifyUserAccountByUserId(emailAuthTokenJson.userId);
  }

  async addRefreshToken(refreshToken: string, user: User) {
    const refreshTokenEntity = new RefreshToken();
    refreshTokenEntity.token = refreshToken;
    refreshTokenEntity.user = user;

    await this.refreshTokenRepository.addRefreshToken(refreshTokenEntity);
  }

  async resendVerifyEmail(accessTokenUser: JwtAccessTokenDto) {
    const user = await this.userService.getUserById(accessTokenUser.userId);
    const emailAuthCode = await this.createEmailSecretToken(accessTokenUser.userId);
    await this.emailService.sendLocalRegisterVerifyEmail(user.email, emailAuthCode);
  }

  async sendPasswordResetEmail(passwordForgetDto: PasswordForgetDto) {
    const user = await this.userService.getLocalUserByEmail(passwordForgetDto.email);
    const emailAuthCode = await this.createEmailSecretToken(user.id);
    await this.emailService.sendResetPasswordEmail(user.email, emailAuthCode);
  }

  async resetPassword(passwordResetDto: PasswordResetDto) {
    const { emailAuthCode, password } = passwordResetDto;
    const emailAuthTokenJson = JSON.parse(this.cryptoService.twoWayDecrypt(emailAuthCode));

    if (emailAuthTokenJson.expire < Number(new Date())) {
      throw new UnauthorizedException('인증 시간이 초과되었습니다.', 'VerifyTimeOut');
    }
    const passwordEcrypt = await this.cryptoService.passwordEcrypt(password);
    await this.userService.resetUserAccountPasswordByUserId(emailAuthTokenJson.userId, passwordEcrypt);
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

  private async createEmailSecretToken(userId: number) {
    const nowtime = new Date();
    const emailAuthTokenJson = {
      userId: userId,
      expire: nowtime.setMinutes(nowtime.getMinutes() + 30),
    };

    return this.cryptoService.twoWayEncrypt(JSON.stringify(emailAuthTokenJson));
  }
}
