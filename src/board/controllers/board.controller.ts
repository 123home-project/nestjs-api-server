import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { IBoardService } from '../interfaces/board.service.interface';
import { WriteBoardReq } from '../dtos/write-board.req';
import { AccessTokenAuthGuard } from 'src/auth/guards/jwt-access-token.auth.guard';
import { AccessTokenUser } from 'src/auth/decorators/access-token.decorator';
import { JwtAccessTokenReq } from 'src/auth/dtos/jwt-access-token.req';
import { UpdateBoardReq } from '../dtos/update-board.req';
import { WriteBoardCommentReq } from '../dtos/write-board-comment.req';
import { UpdateBoardCommentReq } from '../dtos/update-board-comment.req';
import { LikeBoardReq } from '../dtos/like-board.req';
import { LikeCancelBoardReq } from '../dtos/like-cancel-board.req';
import { BoardListReq } from '../dtos/board-list.req';
import { BoardListRes } from '../dtos/board-list.res';
import { BoardTagReq } from '../dtos/board-tag.req';
import { BoardTagRes } from '../dtos/board-tag.res';
import { BoardRes } from '../dtos/board.res';
import { PopularBoardListReq } from '../dtos/popular-board-list';

@Controller('board')
export class BoardController {
  constructor(@Inject('IBoardService') private readonly boardService: IBoardService) {}

  @Post('/comment')
  @UseGuards(AccessTokenAuthGuard)
  @ApiCreatedResponse({ description: '게시판 댓글 쓰기' })
  async writeBoardComment(
    @AccessTokenUser() accessTokenUser: JwtAccessTokenReq,
    @Body() writeBoardCommentReq: WriteBoardCommentReq,
  ) {
    return await this.boardService.writeBoardComment(accessTokenUser, writeBoardCommentReq);
  }

  @Patch('/comment/:boardCommentId')
  @UseGuards(AccessTokenAuthGuard)
  @ApiOkResponse({ description: '게시판 댓글 수정' })
  async updateBoardComment(
    @AccessTokenUser() accessTokenUser: JwtAccessTokenReq,
    @Body() updateBoardCommentReq: UpdateBoardCommentReq,
    @Param('boardCommentId') boardCommentId: number,
  ) {
    return await this.boardService.updateBoardComment(accessTokenUser, updateBoardCommentReq, boardCommentId);
  }

  @Delete('/comment/:boardCommentId')
  @UseGuards(AccessTokenAuthGuard)
  @ApiOkResponse({ description: '게시판 댓글 삭제' })
  async deleteBoardComment(
    @AccessTokenUser() accessTokenUser: JwtAccessTokenReq,
    @Param('boardCommentId') boardCommentId: number,
  ) {
    return await this.boardService.deleteBoardComment(accessTokenUser, boardCommentId);
  }

  @Post('/like')
  @UseGuards(AccessTokenAuthGuard)
  @ApiCreatedResponse({ description: '게시판 좋아요/싫어요' })
  async likeBoard(@AccessTokenUser() accessTokenUser: JwtAccessTokenReq, @Body() likeBoardReq: LikeBoardReq) {
    return await this.boardService.likeBoard(accessTokenUser, likeBoardReq);
  }

  @Delete('/like')
  @UseGuards(AccessTokenAuthGuard)
  @ApiOkResponse({ description: '게시판 좋아요/싫어요 취소' })
  async likeCancelBoard(
    @AccessTokenUser() accessTokenUser: JwtAccessTokenReq,
    @Body() likeCancelBoardReq: LikeCancelBoardReq,
  ) {
    return await this.boardService.likeCancelBoard(accessTokenUser, likeCancelBoardReq);
  }

  @Get('/')
  @ApiOkResponse({ description: '게시판 리스트 최신순', type: [BoardListRes] })
  async getBoardList(@Query() boardListReq: BoardListReq): Promise<BoardListRes[]> {
    return await this.boardService.getBoardList(boardListReq);
  }

  @Post('/')
  @UseGuards(AccessTokenAuthGuard)
  @ApiCreatedResponse({ description: '게시판 글 작성' })
  async writeBoard(@AccessTokenUser() accessTokenUser: JwtAccessTokenReq, @Body() writeBoardReq: WriteBoardReq) {
    return await this.boardService.writeBoard(accessTokenUser, writeBoardReq);
  }

  @Patch('/:boardId')
  @UseGuards(AccessTokenAuthGuard)
  @ApiOkResponse({ description: '게시판 글 수정' })
  async updateBoard(
    @AccessTokenUser() accessTokenUser: JwtAccessTokenReq,
    @Body() updateBoardReq: UpdateBoardReq,
    @Param('boardId') boardId: number,
  ) {
    return await this.boardService.updateBoard(accessTokenUser, updateBoardReq, boardId);
  }

  @Delete('/:boardId')
  @UseGuards(AccessTokenAuthGuard)
  @ApiOkResponse({ description: '게시판 글 삭제' })
  async deleteBoard(@AccessTokenUser() accessTokenUser: JwtAccessTokenReq, @Param('boardId') boardId: number) {
    return await this.boardService.deleteBoard(accessTokenUser, boardId);
  }

  @Get('/tag')
  @ApiOkResponse({ description: '게시판 태그', type: [BoardTagRes] })
  async getBoardTag(@Query() boardTagReq: BoardTagReq): Promise<BoardTagRes[]> {
    return await this.boardService.getBoardTag(boardTagReq);
  }

  @Get('/popular')
  @ApiOkResponse({ description: '게시판 인기글', type: [BoardListRes] })
  async getPopularBoardList(@Query() popularBoardListReq: PopularBoardListReq): Promise<BoardListRes[]> {
    return await this.boardService.getPopularBoardList(popularBoardListReq);
  }

  @Get('/:boardId')
  @ApiOkResponse({ description: '게시판 보기', type: BoardRes })
  async getBoardById(@Param('boardId') boardId: number): Promise<BoardRes> {
    return await this.boardService.getBoardDetail(boardId);
  }
}
