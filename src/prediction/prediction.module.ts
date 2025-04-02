import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PredictionMatch } from './entities/prediction_match.entity';
import { PredictionPlayer } from './entities/prediction_player.entity';
import { PredictionController } from './controllers/prediction.controller';
import { PredictionService } from './services/prediction.service';
import { PredictionMatchRepository } from './repositories/prediction-match.repository';
import { UserModule } from 'src/user/user.module';
import { TeamModule } from 'src/team/team.module';
import { PredictionPlayerRepository } from './repositories/prediction-player.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PredictionMatch, PredictionPlayer]), UserModule, TeamModule],
  controllers: [PredictionController],
  providers: [
    { provide: 'IPredictionService', useClass: PredictionService },
    { provide: 'IPredictionMatchRepository', useClass: PredictionMatchRepository },
    { provide: 'IPredictionPlayerRepository', useClass: PredictionPlayerRepository },
  ],
})
export class PredictionModule {}
