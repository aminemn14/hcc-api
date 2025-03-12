import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from './entities/news/news.entity';
import { User } from '../users/entities/user/user.entity';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([News, User]), AuthModule],
  providers: [NewsService],
  controllers: [NewsController],
})
export class NewsModule {}
