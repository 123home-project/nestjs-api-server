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
import { MyMatchPredictionResultReq } from '../dtos/my-match-prediction-result.req';
import { MyMatchPredictionResultRes } from '../dtos/my-match-prediction-result.res';
import { MyMatchPredictionHistoryReq } from '../dtos/my-match-prediction-history.req';
import { MyMatchPredictionHistoryRes } from '../dtos/my-match-prediction-history.res';
import { IPredictionPlayerRepository } from '../interfaces/prediction-player.repository.interface';
import {
  USER_PREDICTION_HITTER_STAT_RANKING_LIST,
  USER_PREDICTION_PITCHER_STAT_RANKING_LIST,
} from '../constants/user-prediction-stat-list';
import { HITTER_STAT_CONDITION, PITCHER_STAT_CONDITION } from 'src/player/constants/player-stat-condition';
import { PlayerPredictionRankingReq } from '../dtos/player-prediction-ranking.req';
import { PredictionRankingProfileRes } from '../dtos/prediction-ranking-profile.res';
import { PlayerPredictionRankingRes } from '../dtos/player-prediction-ranking.res';
import { PredictPlayerReq } from '../dtos/predict-player.req';
import { PredictionPlayer } from '../entities/prediction_player.entity';
import { PlayerHitterStat } from 'src/player/entities/player-hitter-stat.entity';
import { PlayerPitcherStat } from 'src/player/entities/player-pitcher-stat.entity';
import { IPlayerService } from 'src/player/interfaces/player.service.interface';
import { UpdatePlayerPredictionReq } from '../dtos/update-player-prediction.req';

@Injectable()
export class PredictionService implements IPredictionService {
  constructor(
    @Inject('IPredictionMatchRepository') private readonly predictionMatchRepository: IPredictionMatchRepository,
    @Inject('IPredictionPlayerRepository') private readonly predictionPlayerRepository: IPredictionPlayerRepository,
    @Inject('IUserService') private readonly userService: IUserService,
    @Inject('ITeamService') private readonly teamService: ITeamService,
    @Inject('IPlayerService') private readonly playerService: IPlayerService,
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

  async getMyMatchPredictionResult(
    accessTokenUser: JwtAccessTokenReq,
    myMatchPredictionResultReq: MyMatchPredictionResultReq,
  ): Promise<MyMatchPredictionResultRes> {
    const { userId } = accessTokenUser;
    const { year } = myMatchPredictionResultReq;

    const predictionMatch = await this.predictionMatchRepository.getmyMatchPredictionResultByUserId(userId, year);

    if (!predictionMatch) {
      return plainToInstance(MyMatchPredictionResultRes, {
        userId: userId,
        tryCount: 0,
        correctCount: 0,
        correctPercent: 0,
      });
    }

    return predictionMatch;
  }

  async getMyMatchPredictionHistory(
    accessTokenUser: JwtAccessTokenReq,
    myMatchPredictionHistoryReq: MyMatchPredictionHistoryReq,
  ): Promise<MyMatchPredictionHistoryRes[]> {
    const { userId } = accessTokenUser;
    const { year } = myMatchPredictionHistoryReq;

    const predictionMatch = await this.predictionMatchRepository.getPredictionMatchByUserId(userId, year);
    const results = predictionMatch.map((prm) => {
      return {
        predictionMatchId: prm.id,
        userId: prm.user.id,
        teamScheduleId: prm.teamSchedule.id,
        prediction: prm.prediction,
        startDate: prm.teamSchedule.startDate,
        result: prm.teamSchedule.result,
        homeTeam: {
          id: prm.teamSchedule.homeTeam.id,
          name: prm.teamSchedule.homeTeam.name,
          logo: prm.teamSchedule.homeTeam.logo,
          score: prm.teamSchedule.homeTeamScore,
        },
        awayTeam: {
          teamId: prm.teamSchedule.awayTeam.id,
          name: prm.teamSchedule.awayTeam.name,
          logo: prm.teamSchedule.awayTeam.logo,
          score: prm.teamSchedule.awayTeamScore,
        },
      };
    });

    return plainToInstance(MyMatchPredictionHistoryRes, results, {
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
    });
  }

  async getPlayerPredictionRankings(
    playerPredictionRankingReq: PlayerPredictionRankingReq,
  ): Promise<PlayerPredictionRankingRes> {
    const { year, limit, offset } = playerPredictionRankingReq;
    const playerPredictionRanking = { pitcher: {}, hitter: {} };

    for (const hitterPrediction of USER_PREDICTION_HITTER_STAT_RANKING_LIST) {
      const predictionHitter = await this.predictionPlayerRepository.getHitterPredictionRanking(
        year,
        limit,
        offset,
        hitterPrediction,
        HITTER_STAT_CONDITION[hitterPrediction].sortOrder,
        HITTER_STAT_CONDITION[hitterPrediction].regulation ? 1 : 0,
      );

      const result = predictionHitter.map((hitter) => {
        return plainToInstance(PredictionRankingProfileRes, {
          userId: hitter.userId,
          nickname: hitter.nickname,
          stat: hitter[hitterPrediction],
        });
      });

      playerPredictionRanking.hitter[hitterPrediction] = result;
    }

    for (const pitcherPrediction of USER_PREDICTION_PITCHER_STAT_RANKING_LIST) {
      const predictionPitcher = await this.predictionPlayerRepository.getPitcherPredictionRanking(
        year,
        limit,
        offset,
        pitcherPrediction,
        PITCHER_STAT_CONDITION[pitcherPrediction].sortOrder,
        PITCHER_STAT_CONDITION[pitcherPrediction].regulation ? 1 : 0,
      );

      const result = predictionPitcher.map((pitcher) => {
        return plainToInstance(PredictionRankingProfileRes, {
          userId: pitcher.userId,
          nickname: pitcher.nickname,
          stat: pitcher[pitcherPrediction],
        });
      });

      playerPredictionRanking.pitcher[pitcherPrediction] = result;
    }

    return plainToInstance(PlayerPredictionRankingRes, playerPredictionRanking, {
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
    });
  }

  async predictPlayer(accessTokenUser: JwtAccessTokenReq, predictPlayerReq: PredictPlayerReq) {
    const { userId } = accessTokenUser;
    const { playerHitterStatId, playerPitcherStatId, predictionDate } = predictPlayerReq;

    const teamSchedule = await this.teamService.getTeamScheduleByDate(predictionDate);

    if (!teamSchedule) {
      throw new BadRequestException('현재 해당 날짜에 선수 예측이 불가능합니다.', 'TeamScheduleDoesNotExists');
    }

    if (await this.predictionPlayerRepository.getPredictionPlayerByPredictionDate(predictionDate, userId)) {
      throw new BadRequestException('이미 해당 날짜의 예측을 완료하셨습니다.', 'PredictPlayerAlreadyCompleted');
    }

    const predictionPlayer = new PredictionPlayer();

    const user = await this.userService.getUserById(userId);
    const playerHitterStat = await this.playerService.getPlayerHitterStatById(playerHitterStatId);
    const playerPitcherStat = await this.playerService.getPlayerPitcherStatById(playerPitcherStatId);

    predictionPlayer.user = plainToInstance(User, user);
    predictionPlayer.playerHitterStat = plainToInstance(PlayerHitterStat, playerHitterStat);
    predictionPlayer.playerPitcherStat = plainToInstance(PlayerPitcherStat, playerPitcherStat);
    predictionPlayer.predictionDate = new Date(predictionDate);

    await this.predictionPlayerRepository.addPredictionPlayer(predictionPlayer);
  }

  async updatePlayerPrediction(
    accessTokenUser: JwtAccessTokenReq,
    updatePlayerPredictionReq: UpdatePlayerPredictionReq,
  ) {
    const { userId } = accessTokenUser;
    const { playerHitterStatId, playerPitcherStatId, predictionDate } = updatePlayerPredictionReq;

    const teamSchedule = await this.teamService.getTeamScheduleByDate(predictionDate);

    if (!teamSchedule) {
      throw new BadRequestException('현재 해당 날짜에 선수 예측이 불가능합니다.', 'TeamScheduleDoesNotExists');
    }

    if (!(await this.predictionPlayerRepository.getPredictionPlayerByPredictionDate(predictionDate, userId))) {
      throw new BadRequestException('해당 날짜의 예측이 존재하지 않습니다.', 'PredictPlayerNotCompleted');
    }

    await this.predictionPlayerRepository.updatePredictionPlayer(
      userId,
      playerHitterStatId,
      playerPitcherStatId,
      predictionDate,
    );
  }
}
