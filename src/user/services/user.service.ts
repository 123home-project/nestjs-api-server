import { Inject, Injectable } from '@nestjs/common';
import { IUserService } from '../interfaces/user.service.inteface';
import { IUserRepository } from '../interfaces/user.repository.interface';
import { IUserAccountRepository } from '../interfaces/user-account.repository.interface';
import { User } from '../entities/user.entity';
import { DEFAULT_USER_NICKNAME } from '../constants/nickname';
import { UserAccount } from '../entities/user-account.entity';
import { LocalRegisterReq } from 'src/auth/dtos/local-register.req';
import { LoginPlatformType } from 'src/auth/types/login-platform.type';
import { UserDto } from '../dtos/user.dto';
import { plainToInstance } from 'class-transformer';
import { SnsAccountUserReq } from 'src/auth/dtos/sns-account-user.req';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    @Inject('IUserAccountRepository') private readonly userAccountRepository: IUserAccountRepository,
  ) {}

  async getUserById(userId: number): Promise<UserDto> {
    const user = await this.userRepository.getUserById(userId);
    return plainToInstance(UserDto, user, {
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
    });
  }

  async getUserByAccountId(accountId: string): Promise<UserDto> {
    const user = await this.userRepository.getUserByAccountId(accountId);
    return plainToInstance(UserDto, user, {
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
    });
  }

  async addUserBySnsAccount(snsAccountUserReq: SnsAccountUserReq): Promise<UserDto> {
    const user = new User();
    user.email = snsAccountUserReq.email;
    user.name = snsAccountUserReq.name;
    user.nickname = DEFAULT_USER_NICKNAME;

    await this.userRepository.addUser(user);

    const userAccount = new UserAccount();
    userAccount.accountId = snsAccountUserReq.accountId;
    userAccount.platform = snsAccountUserReq.platform;
    userAccount.verify = snsAccountUserReq.verify;
    userAccount.user = user;

    await this.userAccountRepository.addUserAccount(userAccount);

    return plainToInstance(UserDto, user, {
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
    });
  }

  async addUserByLocal(localRegisterReq: LocalRegisterReq): Promise<UserDto> {
    const user = new User();
    user.email = localRegisterReq.email;
    user.nickname = DEFAULT_USER_NICKNAME;

    await this.userRepository.addUser(user);

    const userAccount = new UserAccount();
    userAccount.accountId = localRegisterReq.email;
    userAccount.platform = LoginPlatformType.Normal;
    userAccount.verify = false;
    userAccount.user = user;
    userAccount.password = localRegisterReq.password;

    await this.userAccountRepository.addUserAccount(userAccount);

    return plainToInstance(UserDto, user, {
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
    });
  }

  async verifyUserAccountByUserId(userId: number) {
    await this.userAccountRepository.updateUserAccountVerifyByUserId(userId);
  }

  async getLocalUserByEmail(email: string): Promise<UserDto> {
    const user = await this.userRepository.getLocalUserByEmail(email);
    return plainToInstance(UserDto, user, {
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
    });
  }

  async resetUserAccountPasswordByUserId(userId: number, password: string) {
    await this.userAccountRepository.updateUserAccountPasswordByUserId(userId, password);
  }
}
