import { UserAccount } from '../entities/user-account.entity';

export interface IUserAccountRepository {
  addUserAccount(userAccount: UserAccount): Promise<UserAccount>;
  updateUserAccountVerifyByUserId(userId: number);
  updateUserAccountPasswordByUserId(userId: number, password: string);
}
