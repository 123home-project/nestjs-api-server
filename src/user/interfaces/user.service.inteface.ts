import { snsAccountUserDto } from 'src/auth/dtos/sns-account-user.dto';
import { UserAccount } from '../entities/user-account.entity';
import { User } from '../entities/user.entity';
import { LocalRegisterDto } from 'src/auth/dtos/local-register.dto';

export interface IUserService {
  getUserById(userId: number): Promise<User>;
  getUserAndAccountByAccountId(accountId: string): Promise<UserAccount>;
  addUserBySnsAccount(snsAccountUserDto: snsAccountUserDto);
  addUserByLocal(localRegisterDto: LocalRegisterDto);
  verifyUserAccountByUserId(userId: number);
  getLocalUserByEmail(email: string);
  resetUserAccountPasswordByUserId(userId: number, password: string);
}
