import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  Unique,
} from 'typeorm';
import { User } from '../../../users/entities/user/user.entity';

@Entity()
@Unique(['date'])
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  adversary: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ nullable: true })
  score: string;

  @ManyToMany(() => User, (user) => user.matches)
  players: User[];
}
