import { Module } from '@nestjs/common';
import { TeamController } from './controllers/team.controller';
import { TeamService } from './services/team.service';
import { TeamStatRepository } from './repositories/team-stat.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { TeamHistory } from './entities/team-history.entity';
import { TeamStat } from './entities/team-stat.entity';
import { TeamSchedule } from './entities/team-schedule.entity';
import { TeamScheduleHitter } from './entities/team-schedule-hitter.entity';
import { TeamSchedulePitcher } from './entities/team-schedule-pitcher.entity';
import { TeamScheduleRepository } from './repositories/team-schedule.repository';
import { TimeModule } from 'src/time/time.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Team, TeamHistory, TeamStat, TeamSchedule, TeamScheduleHitter, TeamSchedulePitcher]),
    TimeModule,
  ],
  controllers: [TeamController],
  providers: [
    { provide: 'ITeamService', useClass: TeamService },
    { provide: 'ITeamStatRepository', useClass: TeamStatRepository },
    { provide: 'ITeamScheduleRepository', useClass: TeamScheduleRepository },
  ],
  exports: [{ provide: 'ITeamService', useClass: TeamService }],
})
export class TeamModule {}
