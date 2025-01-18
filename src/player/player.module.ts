import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { PlayerHitterStat } from './entities/player-hitter-stat';
import { PlayerPitcherStat } from './entities/player-pitcher-stat';

@Module({
  imports: [TypeOrmModule.forFeature([Player, PlayerHitterStat, PlayerPitcherStat])],
  controllers: [],
  providers: [],
})
export class PlayerModule {}
