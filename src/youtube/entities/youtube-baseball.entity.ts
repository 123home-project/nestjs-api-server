import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity('youtube_baseball')
export class YoutubeBaseball {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.youtubeBaseball, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @Column({ type: 'text' })
  link: string;

  @Column({ length: 255, type: 'varchar', nullable: true })
  title?: string;

  @Column({ name: 'channel_name', length: 512, type: 'varchar', nullable: true })
  channelName?: string;

  @Column({ type: 'text', nullable: true })
  thumbnail?: string;

  @Column({ type: 'time', nullable: true })
  duration?: string;

  @Column({ name: 'youtube_id', length: 255, type: 'varchar', nullable: true })
  youtubeId?: string;

  @Column({ name: 'youtube_id', type: 'tinyint' })
  permission: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;
}
