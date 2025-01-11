import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserAccount } from '../entities/user-account.entity';
import { IUserAccountRepository } from '../interfaces/user-account.repository.interface';

@Injectable()
export class UserAccountRepository extends Repository<UserAccount> implements IUserAccountRepository {
  constructor(private dataSource: DataSource) {
    super(UserAccount, dataSource.createEntityManager());
  }

  async getUserAndAccountByAccountId(accountId: string): Promise<UserAccount> {
    return await this.findOne({
      where: {
        accountId: accountId,
      },
      relations: {
        user: true,
      },
    });
  }

  async addUserAccount(userAccount: UserAccount): Promise<UserAccount> {
    return await this.save(userAccount);
  }

  async updateUserAccountVerifyByUserId(userId: number) {
    await this.update({ user: { id: userId } }, { verify: true });
  }
}
