import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Player } from './player.entity';
import { Team } from 'src/team/entities/team.entity';

@Entity('player_first_team')
export class PlayerFirstTeam {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Team, (team) => team.playerHitterStat, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @ManyToOne(() => Player, (player) => player.playerPitcherStat, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'player_id' })
  player: Player;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;
}
