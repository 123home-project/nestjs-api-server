import { PlayerPitcherStat } from '../entities/player-pitcher-stat.entity';

export interface IPlayerPitcherStatRepository {
  getPlayerPitcherStatById(playerPitcherStatId: number): Promise<PlayerPitcherStat>;
}
