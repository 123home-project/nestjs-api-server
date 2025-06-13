import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
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
  @ApiBadRequestResponse({
    description: `
  - [DoesNotExistsBoard]존재하지 않는 게시글입니다
  - [DoesNotExistsTagUser]존재하지 않는 유저입니다
  - [DoesNotExistsParentComment]존재하지 않는 원댓글입니다
  - [CanNotWriteCommentInTheReply]대댓글에는 댓글을 작성할 수 없습니다
    `,
  })
  async writeBoardComment(
    @AccessTokenUser() accessTokenUser: JwtAccessTokenReq,
    @Body() writeBoardCommentReq: WriteBoardCommentReq,
  ) {
    return await this.boardService.writeBoardComment(accessTokenUser, writeBoardCommentReq);
  }

  @Patch('/comment/:boardCommentId')
  @UseGuards(AccessTokenAuthGuard)
  @ApiOkResponse({ description: '게시판 댓글 수정' })
  @ApiBadRequestResponse({
    description: `
  - [EmailAlreadyExists]이미 가입된 계정 이메일입니다
  - [DoesNotExistsBoardComment]존재하지 않는 댓글입니다
  - [DoesNotHavePermissionModifyBoardComment]해당 댓글을 수정할 권한이 존재하지 않습니다
  - [DoesNotExistsTagUser]존재하지 않는 유저입니다
    `,
  })
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
  @ApiBadRequestResponse({
    description: `
  - [DoesNotExistsBoardComment]존재하지 않는 댓글입니다
  - [DoesNotHavePermissionDeleteBoardComment]해당 댓글을 삭제할 권한이 존재하지 않습니다
    `,
  })
  async deleteBoardComment(
    @AccessTokenUser() accessTokenUser: JwtAccessTokenReq,
    @Param('boardCommentId') boardCommentId: number,
  ) {
    return await this.boardService.deleteBoardComment(accessTokenUser, boardCommentId);
  }

  @Post('/like')
  @UseGuards(AccessTokenAuthGuard)
  @ApiCreatedResponse({ description: '게시판 좋아요/싫어요' })
  @ApiBadRequestResponse({
    description: `
  - [DoesNotExistsBoard]존재하지 않는 게시글입니다
  - [CanNotMultipleLikeSameBoard]동일한 게시물에 여러번 좋아요/싫어요 체크가 불가능합니다
    `,
  })
  async likeBoard(@AccessTokenUser() accessTokenUser: JwtAccessTokenReq, @Body() likeBoardReq: LikeBoardReq) {
    return await this.boardService.likeBoard(accessTokenUser, likeBoardReq);
  }

  @Delete('/like')
  @UseGuards(AccessTokenAuthGuard)
  @ApiOkResponse({ description: '게시판 좋아요/싫어요 취소' })
  @ApiBadRequestResponse({
    description: `
  - [DoesNotExistsBoard]존재하지 않는 게시글입니다
  - [DoesNotExistsBoardLike]좋아요 이력이 존재하지 않습니다
    `,
  })
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
  @ApiBadRequestResponse({
    description: `
  - [DoesNotExistsBoardTag]존재하지 않는 게시판 태그입니다
    `,
  })
  async writeBoard(@AccessTokenUser() accessTokenUser: JwtAccessTokenReq, @Body() writeBoardReq: WriteBoardReq) {
    return await this.boardService.writeBoard(accessTokenUser, writeBoardReq);
  }

  @Patch('/:boardId')
  @UseGuards(AccessTokenAuthGuard)
  @ApiOkResponse({ description: '게시판 글 수정' })
  @ApiBadRequestResponse({
    description: `
  - [DoesNotExistsBoard]존재하지 않는 게시물입니다
  - [DoesNotHavePermission]해당 게시물을 수정할 권한이 존재하지 않습니다
  - [StarBoardCanNotBeModified]스타 게시물은 수정/삭제 할 수 없습니다
    `,
  })
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
  @ApiBadRequestResponse({
    description: `
  - [DoesNotExistsBoard]존재하지 않는 게시물입니다
  - [DoesNotHavePermissionModifyBoard]해당 게시물을 삭제할 권한이 존재하지 않습니다
  - [StarBoardCanNotBeModified]스타 게시물은 수정/삭제 할 수 없습니다
    `,
  })
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
  @ApiOkResponse({ description: '게시판 상세 보기', type: BoardRes })
  async getBoardById(@Param('boardId') boardId: number): Promise<BoardRes> {
    return await this.boardService.getBoardDetail(boardId);
  }
}
