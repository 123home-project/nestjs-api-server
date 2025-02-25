import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { PlayerHitterStat } from './entities/player-hitter-stat.entity';
import { PlayerPitcherStat } from './entities/player-pitcher-stat.entity';
import { PlayerService } from './services/player.service';
import { PlayerRepository } from './repositories/player.repository';
import { PlayerController } from './controllers/player.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Player, PlayerHitterStat, PlayerPitcherStat])],
  controllers: [PlayerController],
  providers: [
    { provide: 'IPlayerService', useClass: PlayerService },
    { provide: 'IPlayerRepository', useClass: PlayerRepository },
  ],
})
export class PlayerModule {}
