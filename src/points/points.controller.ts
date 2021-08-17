import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiQuery } from '@nestjs/swagger';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreatePointDto } from './dto/create-point.dto';
import { GetPointsFilterDto } from './dto/get-points-filter.dto';
import { UpdatePointDto } from './dto/update-point.dto';
import { Point } from './point.entity';
import { PointsService } from './points.service';

@Controller('points')
@UseGuards(AuthGuard())
export class PointsController {
  constructor(private pointsService: PointsService) {}

  @Get()
  getPoints(
    @Query()
    filterDto: GetPointsFilterDto,
    @GetUser() user: User,
  ): Promise<Point[]> {
    return this.pointsService.getPoints(filterDto, user);
  }

  @Get(':id')
  getPointById(@Param('id') id: string, @GetUser() user: User): Promise<Point> {
    return this.pointsService.getPointById(id, user);
  }

  @Post()
  createPoint(
    @Body()
    createPointDto: CreatePointDto,
    @GetUser() user: User,
  ): Promise<Point> {
    return this.pointsService.createPoint(createPointDto, user);
  }

  @Delete(':id')
  deletePoint(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.pointsService.deletePoint(id, user);
  }

  @Patch(':id')
  updatePoint(
    @Param('id') id: string,
    @Body() updatePointDto: UpdatePointDto,
    @GetUser() user: User,
  ): Promise<Point> {
    const { title } = updatePointDto;
    return this.pointsService.updatePoint(id, title, user);
  }
}
