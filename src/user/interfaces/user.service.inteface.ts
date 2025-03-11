import { SnsAccountUserReq } from 'src/auth/dtos/sns-account-user.req';
import { LocalRegisterReq } from 'src/auth/dtos/local-register.req';
import { UserRes } from '../dtos/user.res';

export interface IUserService {
  getUserById(userId: number): Promise<UserRes>;
  getUserByAccountId(accountId: string): Promise<UserRes>;
  addUserBySnsAccount(snsAccountUserDto: SnsAccountUserReq);
  addUserByLocal(localRegisterDto: LocalRegisterReq): Promise<UserRes>;
  verifyUserAccountByUserId(userId: number);
  getLocalUserByEmail(email: string): Promise<UserRes>;
  resetUserAccountPasswordByUserId(userId: number, password: string);
}
