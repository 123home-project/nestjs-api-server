import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PredictionMatch } from './entities/prediction_match.entity';
import { PredictionPlayer } from './entities/prediction_player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PredictionMatch, PredictionPlayer])],
  controllers: [],
  providers: [],
})
export class PredictionModule {}
