import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TeamSchedule } from 'src/team/entities/team-schedule.entity';
import { GameResultType } from 'src/team/types/game-result.type';
import { User } from 'src/user/entities/user.entity';

@Entity('prediction_match')
export class PredictionMatch {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.predictionMatch, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => TeamSchedule, (teamSchedule) => teamSchedule.predictionMatch, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'team_schedule_id' })
  teamSchedule: TeamSchedule;

  @Column({ type: 'varchar', length: 10, nullable: true })
  prediction: GameResultType;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;
}
