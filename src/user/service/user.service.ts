import { Injectable } from '@nestjs/common';
import { IUserService } from '../interface/user.service.interface';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class UserService implements IUserService {
  async login(loginDto: LoginDto) {
    console.log(loginDto);
  }
}
