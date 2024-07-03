import { LoginDto } from "../dto/login.dto";

export interface IUserService {
  login(loginDto: LoginDto)
}