import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  Put,
} from '@nestjs/common';
import { MatchesService } from './matches.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role, User } from '../users/entities/user/user.entity';

@Controller('matches')
export class MatchesController {
  constructor(private matchesService: MatchesService) {}

  @Get()
  findAll() {
    return this.matchesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.matchesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.COACH)
  @Post()
  create(
    @Body() createMatchDto: CreateMatchDto,
    @Request() req: Express.Request,
  ) {
    return this.matchesService.create(createMatchDto, req.user as User);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.COACH)
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateMatchDto: UpdateMatchDto,
    @Request() req: Express.Request,
  ) {
    return this.matchesService.update(id, updateMatchDto, req.user as User);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.PLAYER)
  @Post(':id/enroll')
  enroll(@Param('id') id: number, @Request() req: Express.Request) {
    return this.matchesService.enrollPlayer(id, req.user as User);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.PLAYER)
  @Post(':id/unenroll')
  unenroll(@Param('id') id: number, @Request() req: Express.Request) {
    return this.matchesService.unenrollPlayer(id, req.user as User);
  }
}
