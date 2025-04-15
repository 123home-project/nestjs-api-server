import { Injectable } from '@nestjs/common';
import { Between, DataSource, Repository } from 'typeorm';
import { TeamSchedule } from '../entities/team-schedule.entity';
import { ITeamScheduleRepository } from '../interfaces/team-schedule.repository.interface';

@Injectable()
export class TeamScheduleRepository extends Repository<TeamSchedule> implements ITeamScheduleRepository {
  constructor(private dataSource: DataSource) {
    super(TeamSchedule, dataSource.createEntityManager());
  }

  async getTeamMatchSchedule(year: number): Promise<TeamSchedule[]> {
    return await this.createQueryBuilder('ts')
      .innerJoinAndSelect('ts.homeTeam', 'ht')
      .innerJoinAndSelect('ts.awayTeam', 'at')
      .where('YEAR(ts.start_date) = :year', { year })
      .orderBy('ts.start_date', 'ASC')
      .getMany();
  }

  async getTeamScheduleByIdWithinDate(teamScheduleId: number): Promise<TeamSchedule> {
    const now = new Date();
    const after24 = new Date();
    after24.setHours(now.getHours() + 24);

    return await this.findOne({
      where: {
        id: teamScheduleId,
        startDate: Between(now, after24),
      },
    });
  }

  async getTeamScheduleByDateWithinDate(predictionDate: string): Promise<TeamSchedule> {
    const now = new Date();
    const after24 = new Date();
    after24.setHours(now.getHours() + 24);
    console.log(now, after24, predictionDate);

    return await this.createQueryBuilder('ts')
      .select([
        'ts.id',
        'ts.home_team_id',
        'ts.away_team_id',
        'MIN(ts.start_date) AS start_date',
        'ts.home_team_score',
        'ts.away_team_score',
        'ts.result',
        'ts.created_at',
        'ts.updated_at',
      ])
      .where('DATE(ts.start_date) = :predictionDate', { predictionDate })
      .groupBy('DATE(ts.start_date)')
      .having('start_date BETWEEN :now AND :after24', { now, after24 })
      .getOne();
  }
}
