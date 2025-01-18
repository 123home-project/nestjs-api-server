import { Module } from '@nestjs/common';
import { TeamController } from './controllers/team.controller';
import { TeamService } from './services/team.service';
import { TeamStatRepository } from './repositories/team-stat.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { TeamHistory } from './entities/team-history.entity';
import { TeamStat } from './entities/team-stat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team, TeamHistory, TeamStat])],
  controllers: [TeamController],
  providers: [
    { provide: 'ITeamService', useClass: TeamService },
    { provide: 'ITeamStatRepository', useClass: TeamStatRepository },
  ],
})
export class TeamModule {}
