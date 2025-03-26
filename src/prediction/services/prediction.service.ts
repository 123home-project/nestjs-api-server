import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IPredictionService } from '../interfaces/prediction.service.interface';
import { MatchPredictionRankingReq } from '../dtos/match-prediction-ranking.req';
import { IPredictionMatchRepository } from '../interfaces/prediction-match.repository.interface';
import { MatchPredictionRankingRes } from '../dtos/match-prediction-ranking.res';
import { PredictMatchReq } from '../dtos/predict-match.req';
import { JwtAccessTokenReq } from 'src/auth/dtos/jwt-access-token.req';
import { PredictionMatch } from '../entities/prediction_match.entity';
import { IUserService } from 'src/user/interfaces/user.service.inteface';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/user/entities/user.entity';
import { TeamSchedule } from 'src/team/entities/team-schedule.entity';
import { ITeamService } from 'src/team/interfaces/team.service.interface';
import { UpdateMatchPredictionReq } from '../dtos/update-match-prediction.req';

@Injectable()
export class PredictionService implements IPredictionService {
  constructor(
    @Inject('IPredictionMatchRepository') private readonly predictionMatchRepository: IPredictionMatchRepository,
    @Inject('IUserService') private readonly userService: IUserService,
    @Inject('ITeamService') private readonly teamService: ITeamService,
  ) {}

  async getMatchPredictionRankings(
    matchPredictionRankingReq: MatchPredictionRankingReq,
  ): Promise<MatchPredictionRankingRes[]> {
    const { year, limit, offset, keyword } = matchPredictionRankingReq;

    return await this.predictionMatchRepository.getMatchPredictionRanking(year, limit, offset, keyword);
  }

  async predictMatch(accessTokenUser: JwtAccessTokenReq, predictMatchReq: PredictMatchReq) {
    const { userId } = accessTokenUser;
    const { teamScheduleId, prediction } = predictMatchReq;

    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new BadRequestException('존재하지 않는 유저입니다.', 'UserDoesNotExists');
    }

    const teamSchedule = await this.teamService.getTeamScheduleWithinDate(teamScheduleId);

    if (!teamSchedule) {
      throw new BadRequestException('예측할 수 없는 경기 일정입니다.', 'TeamScheduleDoesNotExists');
    }

    if (await this.predictionMatchRepository.getPredictionMatchByUserIdAndTeamScheduleId(userId, teamScheduleId)) {
      throw new BadRequestException('이미 오늘의 예측을 완료하였습니다.', 'AlreadyCompletedTodaysPrediciton');
    }

    const predictMatch = new PredictionMatch();

    predictMatch.user = plainToInstance(User, user);
    predictMatch.teamSchedule = plainToInstance(TeamSchedule, teamSchedule);
    predictMatch.prediction = prediction;

    await this.predictionMatchRepository.addPredictionMatch(predictMatch);
  }

  async updateMatchPrediction(accessTokenUser: JwtAccessTokenReq, updateMatchPredictionReq: UpdateMatchPredictionReq) {
    const { userId } = accessTokenUser;
    const { teamScheduleId, prediction } = updateMatchPredictionReq;

    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new BadRequestException('존재하지 않는 유저입니다.', 'UserDoesNotExists');
    }

    const teamSchedule = await this.teamService.getTeamScheduleWithinDate(teamScheduleId);

    if (!teamSchedule) {
      throw new BadRequestException('예측 수정 할 수 없는 경기 일정입니다.', 'TeamScheduleDoesNotExists');
    }

    await this.predictionMatchRepository.updateMatchPrediction(userId, teamScheduleId, prediction);
  }
}
