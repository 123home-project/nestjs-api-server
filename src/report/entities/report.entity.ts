import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { ReportType } from '../types/report.type';
import { ReportReply } from './report-reply.entity';

@Entity('report')
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.report, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'text' })
  contents: string;

  @Column({ name: 'notice_type', type: 'varchar' })
  reportType: ReportType;

  @OneToMany(() => ReportReply, (reportReply) => reportReply.report, { cascade: true })
  reportReply?: ReportReply[];

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;
}
