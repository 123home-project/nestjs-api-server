import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Team } from '../entities/team.entity';
import { ITeamRepository } from '../interfaces/team.repository.interface';

@Injectable()
export class TeamRepository extends Repository<Team> implements ITeamRepository {
  constructor(private dataSource: DataSource) {
    super(Team, dataSource.createEntityManager());
  }

  async getTeam(): Promise<Team[]> {
    return this.find();
  }
}
