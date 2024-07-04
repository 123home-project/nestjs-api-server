import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './service/user.service';

@Module({
  controllers: [UserController],
  providers: [{ provide: 'IUserService', useClass: UserService }],
})
export class UserModule {}
