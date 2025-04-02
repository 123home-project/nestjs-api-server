import { SortOrderType } from 'src/shared/types/sort-order.type';
import { Player } from '../entities/player.entity';
import { HitterStatType } from '../types/hitter-stat.type';
import { PitcherStatType } from '../types/pitcher-stat.type';

export interface IPlayerRepository {
  getPlayerHitterStat(
    sortBy: HitterStatType,
    sortOrder: SortOrderType,
    limit: number,
    regulation: number,
    year: number,
    offset: number,
  ): Promise<Player[]>;

  getPlayerPitcherStat(
    sortBy: PitcherStatType,
    sortOrder: SortOrderType,
    limit: number,
    regulation: number,
    year: number,
    offset: number,
  ): Promise<Player[]>;
  getPlayerPitcherFirstTeam(): Promise<Player[]>;
}
