import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Board } from '../entities/board.entity';
import { IBoardRepository } from '../interfaces/board.repository.interface';

@Injectable()
export class BoardRepository extends Repository<Board> implements IBoardRepository {
  constructor(private dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  async addBoard(board: Board) {
    await this.save(board);
  }

  async getBoardById(boardId: number): Promise<Board> {
    return this.findOne({ where: { id: boardId }, relations: ['user'] });
  }

  async updateBoard(boardId: number, boardTagId: number, title: string, contents: string) {
    const whereCondition: any = {};

    if (boardTagId) whereCondition.boardTag = { id: boardTagId };
    if (title) whereCondition.title = title;
    if (contents) whereCondition.contents = contents;

    await this.update({ id: boardId }, whereCondition);
  }

  async softDeleteBoard(boardId: number) {
    await this.softDelete(boardId);
  }
}
