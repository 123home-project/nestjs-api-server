import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PredictionMatch } from '../entities/prediction_match.entity';
import { IPredictionMatchRepository } from '../interfaces/prediction-match.repository.interface';
import { MatchPredictionRankingRes } from '../dtos/match-prediction-ranking.res';
import { plainToInstance } from 'class-transformer';
import { GameResultType } from 'src/team/types/game-result.type';

@Injectable()
export class PredictionMatchRepository extends Repository<PredictionMatch> implements IPredictionMatchRepository {
  constructor(private dataSource: DataSource) {
    super(PredictionMatch, dataSource.createEntityManager());
  }

  async getMatchPredictionRanking(
    year: number,
    limit: number,
    offset: number,
    keyword: string,
  ): Promise<MatchPredictionRankingRes[]> {
    const query = await this.createQueryBuilder('prm')
      .select('u.id', 'userId')
      .addSelect('u.nickname', 'nickname')
      .addSelect('COUNT(*)', 'tryCount')
      .addSelect('SUM(IF(prm.prediction = ts.result, 1, 0))', 'correctCount')
      .addSelect('ROUND(SUM(IF(prm.prediction = ts.result, 1, 0))  / COUNT(*) * 100)', 'correctPercent')
      .innerJoin('prm.user', 'u')
      .innerJoin('prm.teamSchedule', 'ts')
      .where(
        `
          ts.result IS NOT NULL
          AND YEAR(ts.start_date) = :year
          AND u.nickname LIKE :keyword
        `,
        { year: year, keyword: '%' + (keyword ?? '') + '%' },
      )
      .groupBy('u.id')
      .orderBy('correctCount', 'DESC')
      .addOrderBy('correctPercent', 'DESC')
      .skip(offset)
      .take(limit)
      .getRawMany();

    return plainToInstance(MatchPredictionRankingRes, query, {
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
    });
  }

  async addPredictionMatch(predictionMatch: PredictionMatch): Promise<PredictionMatch> {
    return await this.save(predictionMatch);
  }

  async getPredictionMatchByUserIdAndTeamScheduleId(userId: number, teamScheduleId: number): Promise<PredictionMatch> {
    return await this.findOne({ where: { user: { id: userId }, teamSchedule: { id: teamScheduleId } } });
  }

  async updateMatchPrediction(userId: number, teamScheduleId: number, prediction: GameResultType) {
    await this.update({ user: { id: userId }, teamSchedule: { id: teamScheduleId } }, { prediction: prediction });
  }
}
