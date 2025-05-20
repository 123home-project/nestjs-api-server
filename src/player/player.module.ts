import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { PlayerHitterStat } from './entities/player-hitter-stat.entity';
import { PlayerPitcherStat } from './entities/player-pitcher-stat.entity';
import { PlayerService } from './services/player.service';
import { PlayerRepository } from './repositories/player.repository';
import { PlayerController } from './controllers/player.controller';
import { PlayerHitterFirstTeam } from './entities/player-hitter-first-team.entity';
import { PlayerPitcherFirstTeam } from './entities/player-pitcher-first-team.entity';
import { PlayerHitterStatRepository } from './repositories/player-hitter-stat.repository';
import { PlayerPitcherStatRepository } from './repositories/player-pitcher-stat.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Player,
      PlayerHitterStat,
      PlayerPitcherStat,
      PlayerHitterFirstTeam,
      PlayerPitcherFirstTeam,
    ]),
  ],
  controllers: [PlayerController],
  providers: [
    { provide: 'IPlayerService', useClass: PlayerService },
    { provide: 'IPlayerRepository', useClass: PlayerRepository },
    { provide: 'IPlayerHitterStatRepository', useClass: PlayerHitterStatRepository },
    { provide: 'IPlayerPitcherStatRepository', useClass: PlayerPitcherStatRepository },
  ],
  exports: [{ provide: 'IPlayerService', useClass: PlayerService }],
})
export class PlayerModule {}
