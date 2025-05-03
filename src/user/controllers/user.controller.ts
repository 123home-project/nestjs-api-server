import { Body, Controller, Inject, Patch, UseGuards } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { IUserService } from '../interfaces/user.service.inteface';
import { UpdateUserProfileReq } from '../dtos/update-user-profile.req';
import { AccessTokenAuthGuard } from 'src/auth/guards/jwt-access-token.auth.guard';
import { AccessTokenUser } from 'src/auth/decorators/access-token.decorator';
import { JwtAccessTokenReq } from 'src/auth/dtos/jwt-access-token.req';

@Controller('user')
export class UserController {
  constructor(@Inject('IUserService') private readonly userService: IUserService) {}

  @Patch('/profile')
  @UseGuards(AccessTokenAuthGuard)
  @ApiOkResponse({ description: '유저 프로필 수정' })
  async updateUserProfile(
    @AccessTokenUser() accessTokenUser: JwtAccessTokenReq,
    @Body() updateUserProfileReq: UpdateUserProfileReq,
  ) {
    return await this.userService.updateUserProfile(accessTokenUser, updateUserProfileReq);
  }
}
