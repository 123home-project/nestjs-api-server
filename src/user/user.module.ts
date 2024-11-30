import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserAccount } from './entities/user-account.entity';
import { UserRepository } from './repositories/user.repository';
import { UserAccountRepository } from './repositories/user-account.repository';
import { UserService } from './services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserAccount])],
  providers: [
    { provide: 'IUserService', useClass: UserService },
    { provide: 'IUserRepository', useClass: UserRepository },
    { provide: 'IUserAccountRepository', useClass: UserAccountRepository },
  ],
  exports: [{ provide: 'IUserService', useClass: UserService }],
})
export class UserModule {}
