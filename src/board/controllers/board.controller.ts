import { Body, Controller, Inject, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { IBoardService } from '../interfaces/board.service.interface';
import { WriteBoardReq } from '../dtos/write-board.req';
import { AccessTokenAuthGuard } from 'src/auth/guards/jwt-access-token.auth.guard';
import { AccessTokenUser } from 'src/auth/decorators/access-token.decorator';
import { JwtAccessTokenReq } from 'src/auth/dtos/jwt-access-token.req';
import { UpdateBoardReq } from '../dtos/update-board.req';

@Controller('board')
export class BoardController {
  constructor(@Inject('IBoardService') private readonly boardService: IBoardService) {}

  @Post('/')
  @UseGuards(AccessTokenAuthGuard)
  @ApiCreatedResponse({ description: '게시판 글쓰기' })
  async writeBoard(@AccessTokenUser() accessTokenUser: JwtAccessTokenReq, @Body() writeBoardReq: WriteBoardReq) {
    return await this.boardService.writeBoard(accessTokenUser, writeBoardReq);
  }

  @Patch('/')
  @UseGuards(AccessTokenAuthGuard)
  @ApiCreatedResponse({ description: '게시판 글수정' })
  async updateBoard(@AccessTokenUser() accessTokenUser: JwtAccessTokenReq, @Body() updateBoardReq: UpdateBoardReq) {
    return await this.boardService.updateBoard(accessTokenUser, updateBoardReq);
  }
}
