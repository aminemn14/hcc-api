import { Exclude, Expose } from 'class-transformer';
import { Role } from '../entities/user/user.entity';
import { Match } from '../../matches/entities/match/match.entity';
import { News } from '../../news/entities/news/news.entity';

@Exclude()
export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  role: Role;

  @Expose()
  createdAt: Date;

  @Expose()
  matches: Match[];

  @Expose()
  news: News[];

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
