import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from './entities/news/news.entity';
import { CreateNewsDto } from './dto/create-news.dto';
import { User, Role } from '../users/entities/user/user.entity';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<News[]> {
    return this.newsRepository.find({ relations: ['author'] });
  }

  async findOne(id: number): Promise<News> {
    const news = await this.newsRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!news) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }
    return news;
  }

  async create(createNewsDto: CreateNewsDto, user: User): Promise<News> {
    if (user.role !== Role.CONTRIBUTOR) {
      throw new ForbiddenException(
        'Seuls les contributeurs peuvent publier des actualités.',
      );
    }

    const fullUser = await this.userRepository.findOne({
      where: { id: user.id },
    });
    if (!fullUser) {
      throw new NotFoundException('User not found');
    }

    const news = this.newsRepository.create({
      ...createNewsDto,
      author: fullUser,
    });
    return this.newsRepository.save(news);
  }
}
