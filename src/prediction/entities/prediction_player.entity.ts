import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { TeamScheduleHitter } from 'src/team/entities/team-schedule-hitter.entity';
import { TeamSchedulePitcher } from 'src/team/entities/team-schedule-pitcher.entity';

@Entity('prediction_player')
export class PredictionPlayer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.predictionPlayer, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => TeamScheduleHitter, (teamScheduleHitter) => teamScheduleHitter.predictionPlayer, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'team_schedule_hitter_id' })
  teamScheduleHitter: TeamScheduleHitter;

  @ManyToOne(() => TeamSchedulePitcher, (teamSchedulePitcher) => teamSchedulePitcher.predictionPlayer, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'team_schedule_pitcher_id' })
  teamSchedulePitcher: TeamSchedulePitcher;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;
}
