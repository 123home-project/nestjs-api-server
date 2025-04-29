import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IBoardService } from '../interfaces/board.service.interface';
import { WriteBoardReq } from '../dtos/write-board.req';
import { JwtAccessTokenReq } from 'src/auth/dtos/jwt-access-token.req';
import { Board } from '../entities/board.entity';
import { IUserService } from 'src/user/interfaces/user.service.inteface';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/user/entities/user.entity';
import { IBoardRepository } from '../interfaces/board.repository.interface';
import { BoardTagRes } from '../dtos/board-tag.res';
import { BoardTag } from '../entities/board-tag.entity';
import { IBoardTagRepository } from '../interfaces/board-tag.repository.interface';
import { UpdateBoardReq } from '../dtos/update-board.req';
import { BoardRes } from '../dtos/board.res';
import { BoardType } from '../types/board.type';
import { FREE_STAR_BOARD_CONDITION, TEAM_STAR_BOARD_CONDITION } from '../constants/star-board-condition';
import { IBoardCommentRepository } from '../interfaces/board-comment.repository.interface';
import { IBoardLikeRepository } from '../interfaces/board-like.repository.interface';
import { WriteBoardCommentReq } from '../dtos/write-board-comment.req';
import { BoardComment } from '../entities/board-comment.entity';
import { BoardCommentRes } from '../dtos/board-comment.res';

@Injectable()
export class BoardService implements IBoardService {
  constructor(
    @Inject('IBoardRepository') private readonly boardRepository: IBoardRepository,
    @Inject('IBoardTagRepository') private readonly boardTagRepository: IBoardTagRepository,
    @Inject('IBoardCommentRepository') private readonly boardCommentRepository: IBoardCommentRepository,
    @Inject('IBoardLikeRepository') private readonly boardLikeRepository: IBoardLikeRepository,
    @Inject('IUserService') private readonly userService: IUserService,
  ) {}

  async writeBoard(accessTokenUser: JwtAccessTokenReq, writeBoardReq: WriteBoardReq) {
    const { userId } = accessTokenUser;
    const { boardTagId, title, contents, boardType } = writeBoardReq;

    const user = await this.userService.getUserById(userId);
    const boardTag = await this.getboardTagById(boardTagId);

    if (!boardTag) {
      throw new BadRequestException('존재하지 않는 게시판 태그입니다.', 'DoesNotExistsBoardTag');
    }

    const board = new Board();

    board.user = plainToInstance(User, user);
    board.boardTag = plainToInstance(BoardTag, boardTag);
    board.title = title;
    board.contents = contents;
    board.boardTypes = boardType;

    await this.boardRepository.addBoard(board);
  }

  async getboardTagById(boardTagId: number): Promise<BoardTagRes> {
    const boardTag = await this.boardTagRepository.getBoardTagById(boardTagId);

    return plainToInstance(BoardTagRes, boardTag, {
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
    });
  }

  async updateBoard(accessTokenUser: JwtAccessTokenReq, updateBoard: UpdateBoardReq, boardId: number) {
    const { userId } = accessTokenUser;
    const { boardTagId, title, contents } = updateBoard;

    const board = await this.getBoardById(boardId);

    if (!board) {
      throw new BadRequestException('존재하지 않는 게시물입니다.', 'DoesNotExistsBoard');
    }

    if (board.user.id !== userId) {
      throw new UnauthorizedException('해당 게시물을 수정할 권한이 존재하지 않습니다.', 'DoesNotHavePermission');
    }

    await this.checkBoardCanBeDeleted(board);

    await this.boardRepository.updateBoard(boardId, boardTagId, title, contents);
  }

  async checkBoardCanBeDeleted(board: BoardRes) {
    const boardCommentCount = await this.boardCommentRepository.countBoardCommentByBoardId(board.id);
    const boardLikeCount = await this.boardLikeRepository.countBoardLikeByBoardId(board.id);
    const boardViewCount = board.views;

    const { comment, like, view } =
      board.boardTypes === BoardType.free ? FREE_STAR_BOARD_CONDITION : TEAM_STAR_BOARD_CONDITION;

    if (boardCommentCount >= comment || boardLikeCount >= like || boardViewCount >= view) {
      throw new BadRequestException('스타 게시물은 수정/삭제 할 수 없습니다.', 'StarBoardCanNotBeModified');
    }
  }

  async deleteBoard(accessTokenUser: JwtAccessTokenReq, boardId: number) {
    const { userId } = accessTokenUser;

    const board = await this.getBoardById(boardId);

    if (!board) {
      throw new BadRequestException('존재하지 않는 게시물입니다.', 'DoesNotExistsBoard');
    }

    if (board.user.id !== userId) {
      throw new UnauthorizedException('해당 게시물을 삭제할 권한이 존재하지 않습니다.', 'DoesNotHavePermission');
    }

    await this.checkBoardCanBeDeleted(board);

    await this.boardRepository.softDeleteBoard(boardId);
  }

  async writeBoardComment(accessTokenUser: JwtAccessTokenReq, writeBoardCommentReq: WriteBoardCommentReq) {
    const { userId } = accessTokenUser;
    const { boardId, tagUserId, parentCommentId, comment } = writeBoardCommentReq;

    const user = await this.userService.getUserById(userId);
    const tagUser = await this.userService.getUserById(tagUserId);
    const board = await this.getBoardById(boardId);
    const parentComment = await this.getBoardCommentById(parentCommentId);

    if (!board) {
      throw new BadRequestException('존재하지 않는 게시글입니다.', 'DoesNotExistsBoard');
    }

    if (tagUserId && !tagUser) {
      throw new BadRequestException('존재하지 않는 유저입니다.', 'DoesNotExistsTagUser');
    }

    if (parentCommentId && !parentComment) {
      throw new BadRequestException('존재하지 않는 원댓글입니다.', 'DoesNotExistsParentComment');
    }

    if (parentCommentId && parentComment.parentComment) {
      throw new BadRequestException('대댓글에는 댓글을 작성할 수 없습니다.', 'CanNotWriteCommentInTheReply');
    }

    const boardComment = new BoardComment();

    boardComment.user = plainToInstance(User, user);
    boardComment.board = plainToInstance(Board, board);
    boardComment.tagUser = plainToInstance(User, tagUser);
    boardComment.parentComment = plainToInstance(BoardComment, parentComment);
    boardComment.comment = comment;

    await this.boardCommentRepository.addBoardComment(boardComment);
  }

  async getBoardById(boardId: number): Promise<BoardRes> {
    const board = await this.boardRepository.getBoardById(boardId);

    return plainToInstance(BoardRes, board, {
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
    });
  }

  async getBoardCommentById(boardId: number): Promise<BoardCommentRes> {
    const boardComment = await this.boardCommentRepository.getBoardCommentById(boardId);

    return plainToInstance(BoardCommentRes, boardComment, {
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
    });
  }
}
