import { SnsAccountUserReq } from 'src/auth/dtos/sns-account-user.req';
import { LocalRegisterReq } from 'src/auth/dtos/local-register.req';
import { UserDto } from '../dtos/user.dto';

export interface IUserService {
  getUserById(userId: number): Promise<UserDto>;
  getUserByAccountId(accountId: string): Promise<UserDto>;
  addUserBySnsAccount(snsAccountUserDto: SnsAccountUserReq);
  addUserByLocal(localRegisterDto: LocalRegisterReq): Promise<UserDto>;
  verifyUserAccountByUserId(userId: number);
  getLocalUserByEmail(email: string): Promise<UserDto>;
  resetUserAccountPasswordByUserId(userId: number, password: string);
}
