import { snsAccountUserDto } from 'src/auth/dtos/sns-account-user.dto';
import { UserAccount } from '../entities/user-account.entity';
import { User } from '../entities/user.entity';

export interface IUserService {
  getUserById(userId: number): Promise<User>;
  getUserAndAccountByAccountId(accountId: string): Promise<UserAccount>;
  addUserBySnsAccount(snsAccountUserDto: snsAccountUserDto);
}
