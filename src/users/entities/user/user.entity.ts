import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { Match } from '../../../matches/entities/match/match.entity';
import { News } from '../../../news/entities/news/news.entity';
import * as bcrypt from 'bcrypt';

export enum Role {
  COACH = 'coach',
  CONTRIBUTOR = 'contributor',
  PLAYER = 'player',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'varchar',
    default: Role.PLAYER,
  })
  role: Role;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToMany(() => Match, (match) => match.players, { cascade: true })
  @JoinTable()
  matches: Match[];

  @OneToMany(() => News, (news) => news.author, { cascade: true })
  news: News[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
