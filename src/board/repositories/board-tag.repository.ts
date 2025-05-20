import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BoardTag } from '../entities/board-tag.entity';
import { IBoardTagRepository } from '../interfaces/board-tag.repository.interface';
import { BoardType } from '../types/board.type';

@Injectable()
export class BoardTagRepository extends Repository<BoardTag> implements IBoardTagRepository {
  constructor(private dataSource: DataSource) {
    super(BoardTag, dataSource.createEntityManager());
  }

  async getBoardTagById(boardTagId: number): Promise<BoardTag> {
    return await this.findOne({ where: { id: boardTagId } });
  }

  async getBoardTagByBoardType(boardType: BoardType): Promise<BoardTag[]> {
    return await this.find({ where: { tagType: boardType } });
  }
}
