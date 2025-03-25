import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
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
}
