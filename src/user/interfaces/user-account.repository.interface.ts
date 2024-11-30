import { UserAccount } from '../entities/user-account.entity';

export interface IUserAccountRepository {
  getUserAndAccountByAccountId(accountId: string): Promise<UserAccount>;
  addUserAccount(userAccount: UserAccount): Promise<UserAccount>;
}
