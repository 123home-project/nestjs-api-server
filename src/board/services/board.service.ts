import { BadRequestException, Inject, Injectable } from '@nestjs/common';
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

@Injectable()
export class BoardService implements IBoardService {
  constructor(
    @Inject('IBoardRepository') private readonly boardRepository: IBoardRepository,
    @Inject('IBoardTagRepository') private readonly boardTagRepository: IBoardTagRepository,
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
}
