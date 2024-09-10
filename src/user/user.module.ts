import { Module } from '@nestjs/common';
import { UserController } from './adapter/in/controllers/user.controller';
import { SignUpService } from './application/services/sign-up.service';

@Module({
  controllers: [UserController],
  providers: [{ provide: 'ISignUpService', useClass: SignUpService }],
})
export class UserModule {}
