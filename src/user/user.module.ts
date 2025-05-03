import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserAccount } from './entities/user-account.entity';
import { UserRepository } from './repositories/user.repository';
import { UserAccountRepository } from './repositories/user-account.repository';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserAccount])],
  controllers: [UserController],
  providers: [
    { provide: 'IUserService', useClass: UserService },
    { provide: 'IUserRepository', useClass: UserRepository },
    { provide: 'IUserAccountRepository', useClass: UserAccountRepository },
  ],
  exports: [{ provide: 'IUserService', useClass: UserService }],
})
export class UserModule {}
