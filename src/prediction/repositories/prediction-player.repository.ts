import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PredictionPlayer } from '../entities/prediction_player.entity';
import { SortOrderType } from 'src/shared/types/sort-order.type';
import { HitterStatType } from 'src/player/types/hitter-stat.type';
import { IPredictionPlayerRepository } from '../interfaces/prediction-player.repository.interface';
import { HitterPredictionRankingRes } from '../dtos/hitter-prediction-ranking.res';
import { PitcherPredictionRankingRes } from '../dtos/pitcher-prediction-ranking.res';
import { PitcherStatType } from 'src/player/types/pitcher-stat.type';

@Injectable()
export class PredictionPlayerRepository extends Repository<PredictionPlayer> implements IPredictionPlayerRepository {
  constructor(private dataSource: DataSource) {
    super(PredictionPlayer, dataSource.createEntityManager());
  }

  async addPredictionPlayer(predictionPlayer: PredictionPlayer): Promise<PredictionPlayer> {
    return this.save(predictionPlayer);
  }

  async getPredictionPlayerByPredictionDate(predictionDate: string, userId: number): Promise<PredictionPlayer> {
    const date = new Date(predictionDate);
    return this.findOne({ where: { predictionDate: date, user: { id: userId } } });
  }

  async updatePredictionPlayer(
    userId: number,
    playerHitterStatId: number,
    playerPitcherStatId: number,
    predictionDate: string,
  ) {
    const date = new Date(predictionDate);
    await this.update(
      { user: { id: userId }, predictionDate: date },
      { playerHitterStat: { id: playerHitterStatId }, playerPitcherStat: { id: playerPitcherStatId } },
    );
  }

  async getPlayerPredictionPitcher(
    year: number,
    limit: number,
    offset: number,
    sortBy: PitcherStatType,
    sortOrder: SortOrderType,
    nickname: string,
    regulation: number,
  ): Promise<PitcherPredictionRankingRes[]> {
    const query = await this.createQueryBuilder('prp')
      .select('u.id', 'userId')
      .addSelect('u.nickname', 'nickname')
      .addSelect('SUM(tsp.win)', 'win')
      .addSelect('ROUND((SUM(tsp.er) * 9) / SUM(tsp.inning), 2)', 'era')
      .addSelect('SUM(tsp.save)', 'save')
      .addSelect('SUM(tsp.hold)', 'hold')
      .addSelect('SUM(tsp.strike_out)', 'strikeOut')
      .innerJoin('prp.user', 'u')
      .innerJoin('team_schedule', 'ts', 'prp.prediction_date = DATE(ts.start_date)')
      .innerJoin(
        'team_schedule_pitcher',
        'tsp',
        'tsp.player_pitcher_stat_id = prp.player_pitcher_stat_id AND tsp.team_schedule_id = ts.id',
      )
      .where(
        `
          ts.result IS NOT NULL
          AND YEAR(prp.prediction_date) = :year
          AND u.nickname LIKE :nickname 
        `,
        { year: year, nickname: '%' + (nickname ?? '') + '%' },
      )
      .groupBy('u.id')
      .having(
        `COUNT(DISTINCT prp.id) > 
        ((SELECT COUNT(*) FROM 123home.team_schedule WHERE YEAR(start_date) = :year and result IS NOT NULL) / 10) * :regulation`,
        { year: year, regulation: regulation },
      )
      .orderBy(`${sortBy}`, sortOrder)
      .skip(offset)
      .take(limit)
      .getRawMany();

    return plainToInstance(PitcherPredictionRankingRes, query, {
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
    });
  }

  async getPlayerPredictionHitter(
    year: number,
    limit: number,
    offset: number,
    sortBy: HitterStatType,
    sortOrder: SortOrderType,
    nickname: string,
    regulation: number,
  ): Promise<HitterPredictionRankingRes[]> {
    const query = await this.createQueryBuilder('prp')
      .select('u.id', 'userId')
      .addSelect('u.nickname', 'nickname')
      .addSelect('ROUND(SUM(tsh.hits) / SUM(tsh.ab), 3)', 'avg')
      .addSelect('SUM(tsh.homerun)', 'homerun')
      .addSelect('SUM(tsh.rbi)', 'rbi')
      .addSelect('SUM(tsh.sb)', 'sb')
      .addSelect(
        `
          ROUND(
            ((SUM(tsh.hits) + SUM(tsh.walks)) / (SUM(tsh.ab) + SUM(tsh.walks))) +
            (((SUM(tsh.homerun) * 3) + (SUM(tsh.triples) * 2) + SUM(tsh.doubles) + SUM(tsh.hits)) / SUM(tsh.ab)),
            3
          )
        `,
        'ops',
      )
      .innerJoin('prp.user', 'u')
      .innerJoin('team_schedule', 'ts', 'prp.prediction_date = DATE(ts.start_date)')
      .innerJoin(
        'team_schedule_hitter',
        'tsh',
        'tsh.player_hitter_stat_id = prp.player_hitter_stat_id AND tsh.team_schedule_id = ts.id',
      )
      .where(
        `
          ts.result IS NOT NULL
          AND YEAR(prp.prediction_date) = :year
          AND u.nickname LIKE :nickname 
        `,
        { year: year, nickname: '%' + (nickname ?? '') + '%' },
      )
      .groupBy('u.id')
      .having(
        `COUNT(prp.id) > 
        ((SELECT COUNT(*) FROM 123home.team_schedule WHERE YEAR(start_date) = :year and result IS NOT NULL) / 10) * :regulation`,
        { year: year, regulation: regulation },
      )
      .orderBy(`${sortBy}`, sortOrder)
      .skip(offset)
      .take(limit)
      .getRawMany();

    return plainToInstance(HitterPredictionRankingRes, query, {
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
    });
  }

  async getPlayerPredictionPitcherByUserId(userId: number, year: number): Promise<PitcherPredictionRankingRes> {
    const query = await this.createQueryBuilder('prp')
      .select('u.id', 'userId')
      .addSelect('u.nickname', 'nickname')
      .addSelect('SUM(tsp.win)', 'win')
      .addSelect('ROUND((SUM(tsp.er) * 9) / SUM(tsp.inning), 2)', 'era')
      .addSelect('SUM(tsp.save)', 'save')
      .addSelect('SUM(tsp.hold)', 'hold')
      .addSelect('SUM(tsp.strike_out)', 'strikeOut')
      .innerJoin('prp.user', 'u')
      .innerJoin('team_schedule', 'ts', 'prp.prediction_date = DATE(ts.start_date)')
      .innerJoin(
        'team_schedule_pitcher',
        'tsp',
        'tsp.player_pitcher_stat_id = prp.player_pitcher_stat_id AND tsp.team_schedule_id = ts.id',
      )
      .where(
        `
          prp.user_id = :userId
          AND YEAR(prp.prediction_date) = :year
        `,
        { userId, year },
      )
      .groupBy('u.id')
      .getRawOne();

    return plainToInstance(PitcherPredictionRankingRes, query, {
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
    });
  }

  async getPlayerPredictionHitterByUserId(userId: number, year: number): Promise<HitterPredictionRankingRes> {
    const query = await this.createQueryBuilder('prp')
      .select('u.id', 'userId')
      .addSelect('u.nickname', 'nickname')
      .addSelect('ROUND(SUM(tsh.hits) / SUM(tsh.ab), 3)', 'avg')
      .addSelect('SUM(tsh.homerun)', 'homerun')
      .addSelect('SUM(tsh.rbi)', 'rbi')
      .addSelect('SUM(tsh.sb)', 'sb')
      .addSelect(
        `
          ROUND(
            ((SUM(tsh.hits) + SUM(tsh.walks)) / (SUM(tsh.ab) + SUM(tsh.walks))) +
            (((SUM(tsh.homerun) * 3) + (SUM(tsh.triples) * 2) + SUM(tsh.doubles) + SUM(tsh.hits)) / SUM(tsh.ab)),
            3
          )
        `,
        'ops',
      )
      .innerJoin('prp.user', 'u')
      .innerJoin('team_schedule', 'ts', 'prp.prediction_date = DATE(ts.start_date)')
      .innerJoin(
        'team_schedule_hitter',
        'tsh',
        'tsh.player_hitter_stat_id = prp.player_hitter_stat_id AND tsh.team_schedule_id = ts.id',
      )
      .where(
        `
          prp.user_id = :userId
          AND YEAR(prp.prediction_date) = :year
        `,
        { year, userId },
      )
      .groupBy('u.id')
      .getRawOne();

    return plainToInstance(HitterPredictionRankingRes, query, {
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
    });
  }
}
