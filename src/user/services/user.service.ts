import { Inject, Injectable } from '@nestjs/common';
import { IUserService } from '../interfaces/user.service.inteface';
import { IUserRepository } from '../interfaces/user.repository.interface';
import { IUserAccountRepository } from '../interfaces/user-account.repository.interface';
import { snsAccountUserDto } from 'src/auth/dtos/sns-account-user.dto';
import { User } from '../entities/user.entity';
import { DEFAULT_USER_NICKNAME } from '../constants/nickname';
import { UserAccount } from '../entities/user-account.entity';
import { LocalRegisterDto } from 'src/auth/dtos/local-register.dto';
import { LoginPlatformType } from 'src/auth/types/LoginPlatformType';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    @Inject('IUserAccountRepository') private readonly userAccountRepository: IUserAccountRepository,
  ) {}

  async getUserById(userId: number) {
    return await this.userRepository.getUserById(userId);
  }

  async getUserAndAccountByAccountId(accountId: string) {
    return await this.userAccountRepository.getUserAndAccountByAccountId(accountId);
  }

  async addUserBySnsAccount(snsAccountUserDto: snsAccountUserDto) {
    const user = new User();
    user.email = snsAccountUserDto.email;
    user.name = snsAccountUserDto.name;
    user.nickname = DEFAULT_USER_NICKNAME;

    await this.userRepository.addUser(user);

    const userAccount = new UserAccount();
    userAccount.accountId = snsAccountUserDto.accountId;
    userAccount.platform = snsAccountUserDto.platform;
    userAccount.verify = snsAccountUserDto.verify;
    userAccount.user = user;

    return await this.userAccountRepository.addUserAccount(userAccount);
  }

  async addUserByLocal(localRegisterDto: LocalRegisterDto) {
    const user = new User();
    user.email = localRegisterDto.email;
    user.nickname = DEFAULT_USER_NICKNAME;

    await this.userRepository.addUser(user);

    const userAccount = new UserAccount();
    userAccount.accountId = localRegisterDto.email;
    userAccount.platform = LoginPlatformType.Normal;
    userAccount.verify = false;
    userAccount.user = user;
    userAccount.password = localRegisterDto.password;

    return await this.userAccountRepository.addUserAccount(userAccount);
  }

  async verifyUserAccountByUserId(userId: number) {
    await this.userAccountRepository.updateUserAccountVerifyByUserId(userId);
  }

  async getLocalUserByEmail(email: string) {
    return await this.userRepository.getLocalUserByEmail(email);
  }

  async resetUserAccountPasswordByUserId(userId: number, password: string) {
    await this.userAccountRepository.updateUserAccountPasswordByUserId(userId, password);
  }
}
