import { Team } from '../entities/team.entity';

export interface ITeamRepository {
  getTeam(): Promise<Team[]>;
}
