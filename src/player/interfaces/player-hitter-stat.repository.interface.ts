import { PlayerHitterStat } from '../entities/player-hitter-stat.entity';

export interface IPlayerHitterStatRepository {
  getPlayerHitterStatById(playerHitterStatId: number): Promise<PlayerHitterStat>;
}
