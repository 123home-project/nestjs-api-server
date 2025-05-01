import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Board } from '../entities/board.entity';
import { IBoardRepository } from '../interfaces/board.repository.interface';
import { BoardFiterType } from '../types/board-filter.type';
import { BoardType } from '../types/board.type';
import { boardQueryFilterMap } from '../filters/board-query-filter.map';

@Injectable()
export class BoardRepository extends Repository<Board> implements IBoardRepository {
  constructor(private dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  async addBoard(board: Board) {
    await this.save(board);
  }

  async getBoardById(boardId: number): Promise<Board> {
    if (!boardId) {
      return null;
    }

    return this.findOne({ where: { id: boardId }, relations: ['user', 'boardTag'] });
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

  async getBoards(
    boardFilterType: BoardFiterType,
    boardTagId: number,
    keyword: string,
    boardType: BoardType,
    offset: number,
    limit: number,
  ): Promise<Board[]> {
    const query = await this.createQueryBuilder('b')
      .innerJoinAndSelect('b.user', 'u')
      .innerJoinAndSelect('b.boardTag', 'bt');

    if (boardTagId) {
      await query.where('bt.id = :boardTagId', { boardTagId });
    }

    const applyFilter = boardQueryFilterMap[boardFilterType];
    applyFilter(query, boardType);

    await query.andWhere('b.title LIKE :keyword OR b.contents LIKE :keyword', {
      keyword: '%' + (keyword ?? '') + '%',
    });
    await query.orderBy('b.createdAt', 'DESC').skip(offset).take(limit);

    return await query.getMany();
  }
}
