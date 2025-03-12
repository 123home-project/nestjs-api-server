import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PredictionVictory } from './entities/prediction_victory.entity';
import { PredictionPlayer } from './entities/prediction_player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PredictionVictory, PredictionPlayer])],
  controllers: [],
  providers: [],
})
export class PredictionModule {}
