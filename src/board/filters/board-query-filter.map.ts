import { SelectQueryBuilder } from 'typeorm';
import { BoardFiterType } from '../types/board-filter.type';
import { Board } from '../entities/board.entity';
import { BoardType } from '../types/board.type';
import { FREE_STAR_BOARD_CONDITION, TEAM_STAR_BOARD_CONDITION } from '../constants/star-board-condition';

export const boardQueryFilterMap: Record<
  BoardFiterType,
  (query: SelectQueryBuilder<Board>, boardType: BoardType) => void
> = {
  none: () => {},
  like: (query, boardType) => {
    query.andWhere(
      (qb) => {
        const sub = qb.subQuery().select('COUNT(*)').from('board_like', 'bl').where('bl.board_id = b.id').getQuery();

        return `(${sub}) >= :likeCountCondition`;
      },
      {
        likeCountCondition:
          boardType === BoardType.free ? FREE_STAR_BOARD_CONDITION.like : TEAM_STAR_BOARD_CONDITION.like,
      },
    );
  },
  comment: (query, boardType) => {
    query.andWhere(
      (qb) => {
        const sub = qb.subQuery().select('COUNT(*)').from('board_comment', 'bc').where('bc.board_id = b.id').getQuery();

        return `(${sub}) >= :commentCountCondition`;
      },
      {
        commentCountCondition:
          boardType === BoardType.free ? FREE_STAR_BOARD_CONDITION.comment : TEAM_STAR_BOARD_CONDITION.comment,
      },
    );
  },
  view: (query, boardType) => {
    query.andWhere('b.views >= :viewsCondition', {
      viewsCondition: boardType === BoardType.free ? FREE_STAR_BOARD_CONDITION.view : TEAM_STAR_BOARD_CONDITION.view,
    });
  },
};
