import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './entities/match/match.entity';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { User, Role } from '../users/entities/user/user.entity';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match)
    private matchesRepository: Repository<Match>,
  ) {}

  async findAll(): Promise<Match[]> {
    return this.matchesRepository.find({ relations: ['players'] });
  }

  async findOne(id: number): Promise<Match> {
    const match = await this.matchesRepository.findOne({
      where: { id },
      relations: ['players'],
    });
    if (!match) {
      throw new NotFoundException(`Match with ID ${id} not found`);
    }
    return match;
  }

  async create(createMatchDto: CreateMatchDto, user: User): Promise<Match> {
    if (user.role !== Role.COACH) {
      throw new ForbiddenException(
        'Seuls les coachs peuvent saisir des matchs.',
      );
    }

    // Conversion de la date si nécessaire
    const matchDate = new Date(createMatchDto.date);
    const existingMatch = await this.matchesRepository.findOne({
      where: { date: matchDate },
    });
    if (existingMatch) {
      throw new BadRequestException('Un match existe déjà à cette date.');
    }

    const match = this.matchesRepository.create({
      ...createMatchDto,
      date: matchDate,
    });
    return this.matchesRepository.save(match);
  }

  async update(
    id: number,
    updateMatchDto: UpdateMatchDto,
    user: User,
  ): Promise<Match> {
    if (user.role !== Role.COACH) {
      throw new ForbiddenException(
        'Seuls les coachs peuvent modifier les matchs.',
      );
    }

    const match = await this.matchesRepository.findOne({
      where: { id },
      relations: ['players'],
    });
    if (!match) {
      throw new NotFoundException(`Match with ID ${id} not found`);
    }

    if (updateMatchDto.date) {
      const newDate = new Date(updateMatchDto.date);
      const existingMatch = await this.matchesRepository.findOne({
        where: { date: newDate },
      });
      if (existingMatch && existingMatch.id !== id) {
        throw new BadRequestException('Un match existe déjà à cette date.');
      }
      match.date = newDate;
    }

    if (updateMatchDto.adversary !== undefined) {
      match.adversary = updateMatchDto.adversary;
    }

    if (updateMatchDto.score !== undefined) {
      match.score = updateMatchDto.score;
    }

    return this.matchesRepository.save(match);
  }

  async enrollPlayer(matchId: number, user: User): Promise<Match> {
    if (user.role !== Role.PLAYER) {
      throw new ForbiddenException(
        "Seuls les joueurs peuvent s'inscrire aux matchs.",
      );
    }

    const match = await this.matchesRepository.findOne({
      where: { id: matchId },
      relations: ['players'],
    });
    if (!match) {
      throw new NotFoundException(`Match with ID ${matchId} not found`);
    }

    if (match.players.some((player) => player.id === user.id)) {
      throw new BadRequestException('Vous êtes déjà inscrit à ce match.');
    }

    match.players.push(user);
    return this.matchesRepository.save(match);
  }

  async unenrollPlayer(matchId: number, user: User): Promise<Match> {
    if (user.role !== Role.PLAYER) {
      throw new ForbiddenException(
        'Seuls les joueurs peuvent se désinscrire des matchs.',
      );
    }

    const match = await this.matchesRepository.findOne({
      where: { id: matchId },
      relations: ['players'],
    });
    if (!match) {
      throw new NotFoundException(`Match with ID ${matchId} not found`);
    }

    match.players = match.players.filter((player) => player.id !== user.id);
    return this.matchesRepository.save(match);
  }
}
